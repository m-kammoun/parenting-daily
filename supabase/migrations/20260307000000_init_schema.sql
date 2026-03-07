-- ─────────────────────────────────────────
-- 1. AGE BUCKETS
-- Stable reference table for developmental stages
-- ─────────────────────────────────────────
CREATE TABLE age_buckets (
  id          SERIAL PRIMARY KEY,
  key         TEXT NOT NULL UNIQUE,   -- e.g. 'prenatal', '0-1', '1-3'
  label       TEXT NOT NULL,          -- e.g. 'Prenatal', '0–1 years'
  sort_order  INTEGER NOT NULL
);

INSERT INTO age_buckets (key, label, sort_order) VALUES
  ('prenatal', 'Prenatal',   1),
  ('0-1',      '0–1 years', 2),
  ('1-3',      '1–3 years', 3);

-- RLS: readable by all authenticated users, not writable by clients
ALTER TABLE age_buckets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "age_buckets: read only"
  ON age_buckets FOR SELECT
  USING (auth.role() = 'authenticated');


-- ─────────────────────────────────────────
-- 2. TOPICS
-- Internal metadata only — does not affect MVP behaviour
-- ─────────────────────────────────────────
CREATE TABLE topics (
  id         SERIAL PRIMARY KEY,
  key        TEXT NOT NULL UNIQUE,    -- e.g. 'sleep', 'feeding', 'behavior'
  label      TEXT NOT NULL,
  is_active  BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- RLS: no client access — internal metadata, managed via service role only
ALTER TABLE topics ENABLE ROW LEVEL SECURITY;


-- ─────────────────────────────────────────
-- 3. CONTENT
-- Core insight library — immutable once published
-- ─────────────────────────────────────────
CREATE TYPE content_status AS ENUM ('draft', 'published');

CREATE TABLE content (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sentence      TEXT NOT NULL,
  age_bucket_id INTEGER NOT NULL REFERENCES age_buckets(id),
  topic_id      INTEGER REFERENCES topics(id),  -- optional
  status        content_status NOT NULL DEFAULT 'draft',
  send_count    INTEGER NOT NULL DEFAULT 0,      -- incremented on each push send
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_content_age_bucket_id ON content(age_bucket_id);
CREATE INDEX idx_content_status        ON content(status);
CREATE INDEX idx_content_selection     ON content(age_bucket_id, status);

-- RLS: no client access — content is only read/written by edge functions via service role
ALTER TABLE content ENABLE ROW LEVEL SECURITY;


-- ─────────────────────────────────────────
-- 4. USERS
-- One row per authenticated user (extends auth.users).
-- id is a FK to auth.users — no separate UUID generation.
-- created_at is omitted: already available on auth.users.
-- ─────────────────────────────────────────
CREATE TABLE users (
  id                  UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  age_bucket_id       INTEGER NOT NULL REFERENCES age_buckets(id),
  timezone            TEXT NOT NULL DEFAULT 'UTC',
  platform            TEXT NOT NULL CHECK (platform IN ('ios', 'android')),
  push_token          TEXT,
  next_scheduled_send TIMESTAMPTZ,
  is_active           BOOLEAN NOT NULL DEFAULT true,
  app_version         TEXT,
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Auto-update updated_at on any row change
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- RLS: users can only read and write their own profile
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users: own row only"
  ON users FOR ALL
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);


-- ─────────────────────────────────────────
-- 5. USER CONTENT HISTORY
-- Records every content exposure for a user,
-- regardless of channel (push today, feed later).
-- Used by the scheduler to avoid early repetition.
-- A user CAN see the same content again after a long time.
-- ─────────────────────────────────────────
CREATE TABLE user_content_history (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content_id UUID NOT NULL REFERENCES content(id),
  seen_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_user_content_history_user_id      ON user_content_history(user_id);
CREATE INDEX idx_user_content_history_content_id   ON user_content_history(content_id);
CREATE INDEX idx_user_content_history_user_content ON user_content_history(user_id, content_id);

-- RLS: users can only read their own history
ALTER TABLE user_content_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "user_content_history: own rows only"
  ON user_content_history FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);


-- ─────────────────────────────────────────
-- 6. PUSH LOGS
-- Push-specific tracking: one row per notification sent.
-- opened_at is null until the user taps the notification.
-- ─────────────────────────────────────────
CREATE TABLE push_logs (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content_id UUID NOT NULL REFERENCES content(id),
  sent_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  opened_at  TIMESTAMPTZ           -- null = not opened yet
);

CREATE INDEX idx_push_logs_user_id ON push_logs(user_id);
CREATE INDEX idx_push_logs_sent_at ON push_logs(sent_at);

-- RLS: users can only read their own push logs
-- insert/update is done exclusively by edge functions (service role bypasses RLS)
ALTER TABLE push_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "push_logs: own rows read only"
  ON push_logs FOR SELECT
  USING (auth.uid() = user_id);

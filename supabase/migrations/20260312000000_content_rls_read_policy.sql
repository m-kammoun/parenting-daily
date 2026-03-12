-- Allow authenticated users to read published content.
-- Required so that the mobile app can resolve content rows when joining
-- push_logs with content (e.g. push_logs.content_id → content.sentence).
-- Insert/update/delete remain restricted to the service role (edge functions).

CREATE POLICY "content: readable by authenticated users"
  ON content FOR SELECT
  USING (auth.role() = 'authenticated');

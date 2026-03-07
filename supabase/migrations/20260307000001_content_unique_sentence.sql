-- Prevent duplicate sentences within the same age bucket.
-- This also enables safe upserts from the import-content script.
ALTER TABLE content
  ADD CONSTRAINT content_sentence_age_bucket_unique UNIQUE (sentence, age_bucket_id);

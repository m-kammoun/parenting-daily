/**
 * import-content.ts
 *
 * Reads YAML insight files from content/insights/ and inserts them
 * into the Supabase `content` table using the service role.
 *
 * Usage:
 *   SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... npx tsx supabase/scripts/import-content.ts
 *
 * Behaviour:
 *   - Inserts new sentences
 *   - Skips sentences that already exist for that age bucket (by text match)
 *   - Never deletes or modifies existing rows
 */

import * as fs from "fs";
import * as path from "path";
import * as yaml from "js-yaml";
import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";

// Load .env from supabase/
config({
  path: path.resolve(
    path.dirname(new URL(import.meta.url).pathname),
    "../.env",
  ),
});

// ─────────────────────────────────────────
// Config
// ─────────────────────────────────────────

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("❌  Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const INSIGHTS_DIR = path.resolve(
  path.dirname(new URL(import.meta.url).pathname),
  "../../content/insights",
);

// ─────────────────────────────────────────
// Types
// ─────────────────────────────────────────

interface InsightEntry {
  sentence: string;
  status: "draft" | "published";
}

// ─────────────────────────────────────────
// Main
// ─────────────────────────────────────────

async function main() {
  // 1. Fetch all age buckets once — derive bucket key from filename
  const { data: ageBuckets, error: bucketsError } = await supabase
    .from("age_buckets")
    .select("id, key");

  if (bucketsError || !ageBuckets) {
    console.error("❌  Failed to fetch age_buckets:", bucketsError?.message);
    process.exit(1);
  }

  const bucketKeyToId = Object.fromEntries(
    ageBuckets.map((b: { id: number; key: string }) => [b.key, b.id]),
  );

  // 2. Process each YAML file
  const files = fs.readdirSync(INSIGHTS_DIR).filter((f) => f.endsWith(".yaml"));

  if (files.length === 0) {
    console.warn("⚠️  No YAML files found in", INSIGHTS_DIR);
    return;
  }

  let totalInserted = 0;
  let totalSkipped = 0;

  for (const file of files) {
    const bucketKey = path.basename(file, ".yaml"); // "prenatal", "0-1", "1-3"
    const ageBucketId = bucketKeyToId[bucketKey];

    if (!ageBucketId) {
      console.warn(
        `⚠️  No age_bucket found for key "${bucketKey}" — skipping ${file}`,
      );
      continue;
    }

    const raw = fs.readFileSync(path.join(INSIGHTS_DIR, file), "utf8");
    const entries = yaml.load(raw) as InsightEntry[];

    if (!Array.isArray(entries) || entries.length === 0) {
      console.warn(`⚠️  No entries in ${file}, skipping`);
      continue;
    }

    console.log(
      `\n📂  ${file}  →  age_bucket "${bucketKey}" (id: ${ageBucketId})`,
    );

    // 3. Fetch existing sentences for this bucket to avoid duplicates
    const { data: existing } = await supabase
      .from("content")
      .select("sentence")
      .eq("age_bucket_id", ageBucketId);

    const existingSet = new Set(
      (existing ?? []).map((r: { sentence: string }) => r.sentence.trim()),
    );

    // 4. Insert only new entries
    for (const entry of entries) {
      const sentence = entry.sentence?.trim();

      if (!sentence) {
        console.warn("  ⚠️  Empty sentence, skipping.");
        continue;
      }

      if (existingSet.has(sentence)) {
        console.log(`  ⏭️  Already exists: "${sentence.slice(0, 70)}"`);
        totalSkipped++;
        continue;
      }

      const { error } = await supabase.from("content").insert({
        sentence,
        age_bucket_id: ageBucketId,
        topic_id: null,
        status: entry.status ?? "draft",
      });

      if (error) {
        console.error(
          `  ❌  Failed: "${sentence.slice(0, 70)}" — ${error.message}`,
        );
      } else {
        console.log(`  ✅  Inserted: "${sentence.slice(0, 70)}"`);
        existingSet.add(sentence); // guard against duplicates within the same file
        totalInserted++;
      }
    }
  }

  console.log(`\n─────────────────────────────────`);
  console.log(`✅  Inserted : ${totalInserted}`);
  console.log(`⏭️   Skipped  : ${totalSkipped}`);
  console.log(`─────────────────────────────────`);
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});

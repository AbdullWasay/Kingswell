/**
 * Upsert branding-related content into MongoDB (no full wipe).
 * Run: npx tsx scripts/sync-branding-content.ts
 */
import { readFile } from "fs/promises";
import path from "path";

const KEYS = ["site", "why-choose", "coverage-areas"] as const;

const FILE_MAP: Record<(typeof KEYS)[number], string> = {
  site: "site.json",
  "why-choose": "why-choose.json",
  "coverage-areas": "coverage-areas.json",
};

async function main() {
  const { config } = await import("dotenv");
  config({ path: path.join(process.cwd(), ".env.local") });

  const { getDb, CONTENT_COLLECTION } = await import("../src/lib/mongodb");
  const db = await getDb();
  const collection = db.collection(CONTENT_COLLECTION);
  const contentDir = path.join(process.cwd(), "content");

  for (const key of KEYS) {
    const raw = await readFile(path.join(contentDir, FILE_MAP[key]), "utf-8");
    const data = JSON.parse(raw);
    await collection.updateOne(
      { key },
      { $set: { key, data, updatedAt: new Date() } },
      { upsert: true }
    );
    console.log(`Synced: ${key}`);
  }

  console.log("Branding content sync complete.");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

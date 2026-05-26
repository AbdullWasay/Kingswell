/**
 * Sync testimonials from content/testimonials.json to MongoDB only.
 * Run: npm run sync:testimonials
 */
import { readFile } from "fs/promises";
import path from "path";

async function main() {
  const { config } = await import("dotenv");
  config({ path: path.join(process.cwd(), ".env.local") });

  const { getDb, CONTENT_COLLECTION } = await import("../src/lib/mongodb");
  const db = await getDb();
  const collection = db.collection(CONTENT_COLLECTION);

  const raw = await readFile(
    path.join(process.cwd(), "content", "testimonials.json"),
    "utf-8"
  );
  const data = JSON.parse(raw);

  await collection.updateOne(
    { key: "testimonials" },
    { $set: { key: "testimonials", data, updatedAt: new Date() } },
    { upsert: true }
  );

  console.log(`Synced ${data.length} testimonials to MongoDB.`);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

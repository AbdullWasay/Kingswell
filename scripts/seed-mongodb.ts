/**
 * Seed MongoDB from content/*.json
 * Run: npm run seed
 */
import { readFile } from "fs/promises";
import path from "path";

const CONTENT_KEYS = [
  "site",
  "properties",
  "testimonials",
  "team",
  "areas",
  "coverage-areas",
  "why-choose",
  "blog",
] as const;

type ContentKey = (typeof CONTENT_KEYS)[number];

const FILE_MAP: Record<ContentKey, string> = {
  site: "site.json",
  properties: "properties.json",
  testimonials: "testimonials.json",
  team: "team.json",
  areas: "areas.json",
  "coverage-areas": "coverage-areas.json",
  "why-choose": "why-choose.json",
  blog: "blog.json",
};

async function main() {
  const { config } = await import("dotenv");
  config({ path: path.join(process.cwd(), ".env.local") });

  const { getDb, CONTENT_COLLECTION } = await import("../src/lib/mongodb");
  const db = await getDb();
  const collection = db.collection(CONTENT_COLLECTION);

  await collection.deleteMany({});
  console.log("Cleared content collection.");

  const contentDir = path.join(process.cwd(), "content");

  for (const key of CONTENT_KEYS) {
    const raw = await readFile(path.join(contentDir, FILE_MAP[key]), "utf-8");
    await collection.insertOne({
      key,
      data: JSON.parse(raw),
      updatedAt: new Date(),
    });
    console.log(`Seeded: ${key}`);
  }

  console.log("MongoDB seed complete.");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

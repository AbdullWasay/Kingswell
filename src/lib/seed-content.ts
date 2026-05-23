import { readFile } from "fs/promises";
import path from "path";
import { getDb, CONTENT_COLLECTION } from "./mongodb";
import { CONTENT_KEYS, type ContentKey } from "./content-store";

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

export async function seedContentIfEmpty(): Promise<void> {
  const db = await getDb();
  const collection = db.collection(CONTENT_COLLECTION);

  const count = await collection.countDocuments();
  if (count > 0) return;

  const contentDir = path.join(process.cwd(), "content");

  for (const key of CONTENT_KEYS) {
    try {
      const filePath = path.join(contentDir, FILE_MAP[key]);
      const raw = await readFile(filePath, "utf-8");
      const data = JSON.parse(raw);

      await collection.insertOne({
        key,
        data,
        updatedAt: new Date(),
      });
    } catch (err) {
      console.error(`[Seed] Failed to seed ${key}:`, err);
    }
  }

  console.log("[Seed] MongoDB content collections seeded from content/*.json");
}

/**
 * Set let-agreed / sold listings to "available" in MongoDB
 * Run: npx tsx scripts/fix-property-status.ts
 */
import { config } from "dotenv";
import { resolve } from "path";
import type { Property } from "../src/lib/types";

config({ path: resolve(process.cwd(), ".env.local") });

async function main() {
  const { getDb, CONTENT_COLLECTION } = await import("../src/lib/mongodb");

  const db = await getDb();
  const collection = db.collection(CONTENT_COLLECTION);
  const doc = await collection.findOne({ key: "properties" });
  const properties = (doc?.data as Property[]) || [];

  const updated = properties.map((p) => {
    if (p.status === "let-agreed" || p.status === "sold") {
      console.log(`  ${p.title}: ${p.status} → available`);
      return { ...p, status: "available" as const };
    }
    return p;
  });

  await collection.updateOne(
    { key: "properties" },
    { $set: { data: updated, updatedAt: new Date() } }
  );

  console.log("Done. Public site shows available + under-offer only.");
  process.exit(0);
}

main().catch(console.error);

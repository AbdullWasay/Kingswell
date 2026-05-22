import { config } from "dotenv";
import { resolve } from "path";

config({ path: resolve(process.cwd(), ".env.local") });

async function main() {
  const { getDb, CONTENT_COLLECTION } = await import("../src/lib/mongodb");
  const db = await getDb();
  const doc = await db.collection(CONTENT_COLLECTION).findOne({ key: "properties" });
  const props = (doc?.data as { type: string; status: string; title: string }[]) || [];

  console.log("Total:", props.length);
  console.log("For sale:", props.filter((p) => p.type === "sale").length);
  console.log("To rent:", props.filter((p) => p.type === "let").length);
  console.log("---");
  props.forEach((p) => console.log(`  [${p.type}] ${p.status} — ${p.title}`));
  process.exit(0);
}

main().catch(console.error);

import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { revalidatePath, revalidateTag, unstable_noStore } from "next/cache";
import { getDb, CONTENT_COLLECTION } from "./mongodb";
import {
  isCloudinaryConfigured,
  uploadToCloudinary,
} from "./cloudinary";

export const CONTENT_KEYS = [
  "site",
  "properties",
  "testimonials",
  "team",
  "areas",
  "coverage-areas",
  "why-choose",
  "blog",
] as const;

export type ContentKey = (typeof CONTENT_KEYS)[number];

export const CONTENT_CACHE_TAG = "kingswell-content";

async function readFromMongo<T>(key: ContentKey): Promise<T | null> {
  const db = await getDb();
  const doc = await db
    .collection(CONTENT_COLLECTION)
    .findOne({ key }, { projection: { data: 1, _id: 0 } });
  if (!doc || doc.data === undefined || doc.data === null) return null;
  return doc.data as T;
}

async function writeToMongo<T>(key: ContentKey, data: T): Promise<void> {
  const db = await getDb();
  await db.collection(CONTENT_COLLECTION).updateOne(
    { key },
    { $set: { key, data, updatedAt: new Date() } },
    { upsert: true }
  );
}

function requireMongoUri(): void {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is required. Content is only loaded from MongoDB.");
  }
}

/** Read content exclusively from MongoDB — no JSON/file fallback */
export async function readContent<T>(key: ContentKey): Promise<T> {
  unstable_noStore();
  requireMongoUri();

  const data = await readFromMongo<T>(key);
  if (data === null) {
    throw new Error(
      `[Content] No "${key}" in MongoDB. Add via admin or run: npm run seed`
    );
  }
  return data;
}

export async function writeContent<T>(
  key: ContentKey,
  data: T
): Promise<void> {
  requireMongoUri();
  await writeToMongo(key, data);
  revalidateTag(CONTENT_CACHE_TAG);
  revalidateAll();
}

function revalidateAll(): void {
  const paths = [
    "/",
    "/about",
    "/blog",
    "/valuation",
    "/landlords",
    "/buyers",
    "/tenants",
    "/contact",
    "/properties/for-sale",
    "/properties/to-rent",
    "/areas/catford",
    "/areas/lee",
    "/areas/hither-green",
    "/areas/lewisham",
  ];
  paths.forEach((p) => revalidatePath(p, "layout"));
  paths.forEach((p) => revalidatePath(p));
}

export async function uploadImage(
  file: File,
  folder: string
): Promise<string> {
  if (isCloudinaryConfigured()) {
    return uploadToCloudinary(file, folder);
  }

  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const safeName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const uploadDir = path.join(process.cwd(), "public", "images", folder);
  await mkdir(uploadDir, { recursive: true });
  const buffer = Buffer.from(await file.arrayBuffer());
  const localPath = path.join(uploadDir, safeName);
  await writeFile(localPath, buffer);
  return `/images/${folder}/${safeName}`;
}

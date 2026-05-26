import { getDb } from "./mongodb";
import type { LeadFormType, LeadSubmission } from "./types";

export const LEADS_COLLECTION = "leads";

export async function saveLead(
  data: Omit<LeadSubmission, "id" | "receivedAt" | "source"> & {
    receivedAt?: string;
    source?: string;
  }
): Promise<LeadSubmission> {
  const lead: LeadSubmission = {
    id: `lead_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
    formType: data.formType,
    firstName: String(data.firstName || "").trim(),
    lastName: String(data.lastName || "").trim(),
    email: String(data.email || "").trim(),
    phone: String(data.phone || "").trim(),
    message: data.message ? String(data.message).trim() : undefined,
    address: data.address ? String(data.address).trim() : undefined,
    propertyType: data.propertyType
      ? String(data.propertyType).trim()
      : undefined,
    intent: data.intent ? String(data.intent).trim() : undefined,
    service: data.service ? String(data.service).trim() : undefined,
    propertyTitle: data.propertyTitle
      ? String(data.propertyTitle).trim()
      : undefined,
    receivedAt: data.receivedAt || new Date().toISOString(),
    source: data.source || "kingswell-website",
  };

  if (!process.env.MONGODB_URI) {
    console.warn("[Leads] MONGODB_URI not set — lead not saved to database");
    return lead;
  }

  const db = await getDb();
  await db.collection(LEADS_COLLECTION).insertOne(lead);
  return lead;
}

export async function getLeads(): Promise<LeadSubmission[]> {
  if (!process.env.MONGODB_URI) return [];

  const db = await getDb();
  const docs = await db
    .collection<LeadSubmission>(LEADS_COLLECTION)
    .find({})
    .sort({ receivedAt: -1 })
    .toArray();

  return docs.map(({ _id, ...rest }) => rest as LeadSubmission);
}

export async function getLeadCount(): Promise<number> {
  if (!process.env.MONGODB_URI) return 0;

  const db = await getDb();
  return db.collection(LEADS_COLLECTION).countDocuments();
}

export async function deleteLead(id: string): Promise<boolean> {
  if (!process.env.MONGODB_URI) return false;

  const db = await getDb();
  const result = await db.collection(LEADS_COLLECTION).deleteOne({ id });
  return result.deletedCount === 1;
}

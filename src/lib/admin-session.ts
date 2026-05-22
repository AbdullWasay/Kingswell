import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { AdminSession, defaultSession, sessionOptions } from "./auth";

export async function getAdminSession() {
  const cookieStore = await cookies();
  return getIronSession<AdminSession>(cookieStore, sessionOptions);
}

export async function requireAdmin() {
  const session = await getAdminSession();
  if (!session.isLoggedIn) {
    throw new Error("Unauthorized");
  }
  return session;
}

export { defaultSession };

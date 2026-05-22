import { SessionOptions } from "iron-session";

export interface AdminSession {
  isLoggedIn: boolean;
  email?: string;
}

export const defaultSession: AdminSession = {
  isLoggedIn: false,
};

export const sessionOptions: SessionOptions = {
  password:
    process.env.ADMIN_SESSION_SECRET ||
    "kingswell_dev_session_secret_min_32_chars",
  cookieName: "kingswell_admin_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 8,
    path: "/",
  },
};

export function validateAdminCredentials(
  email: string,
  password: string
): boolean {
  const expectedEmail = (
    process.env.ADMIN_EMAIL || "admin@kingswell.com"
  ).toLowerCase();
  const expectedPass = process.env.ADMIN_PASSWORD;

  if (!expectedPass) {
    console.warn("[Admin] ADMIN_PASSWORD not set");
    return false;
  }

  return (
    email.toLowerCase().trim() === expectedEmail &&
    password === expectedPass
  );
}

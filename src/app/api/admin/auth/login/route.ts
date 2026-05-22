import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import {
  AdminSession,
  sessionOptions,
  validateAdminCredentials,
} from "@/lib/auth";

export async function POST(request: NextRequest) {
  if (!process.env.ADMIN_SESSION_SECRET) {
    return NextResponse.json(
      { error: "ADMIN_SESSION_SECRET not configured" },
      { status: 500 }
    );
  }

  const body = await request.json();
  const email = body.email ?? body.username;
  const password = body.password;

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password required" },
      { status: 400 }
    );
  }

  if (!validateAdminCredentials(email, password)) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });
  const session = await getIronSession<AdminSession>(
    request,
    response,
    sessionOptions
  );
  session.isLoggedIn = true;
  session.email = email.toLowerCase().trim();
  await session.save();

  return response;
}

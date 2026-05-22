import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-session";
import {
  CONTENT_KEYS,
  readContent,
  writeContent,
  type ContentKey,
} from "@/lib/content-store";

function isValidKey(key: string): key is ContentKey {
  return CONTENT_KEYS.includes(key as ContentKey);
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  try {
    await requireAdmin();
    const { key } = await params;
    if (!isValidKey(key)) {
      return NextResponse.json({ error: "Invalid content key" }, { status: 400 });
    }
    const data = await readContent(key);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  try {
    await requireAdmin();
    const { key } = await params;
    if (!isValidKey(key)) {
      return NextResponse.json({ error: "Invalid content key" }, { status: 400 });
    }
    const data = await request.json();
    await writeContent(key, data);
    return NextResponse.json({ success: true });
  } catch (e) {
    if (e instanceof Error && e.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("[Admin content write]", e);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}

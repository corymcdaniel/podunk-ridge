import { NextResponse } from "next/server";
import { colonistsStore, DEFAULT_COLONISTS } from "@/lib/blobStores";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  const store = colonistsStore();
  const list = (await store.get("list", { type: "json" })) ?? DEFAULT_COLONISTS;
  return NextResponse.json(list);
}

export async function PUT(request) {
  const authed = await requireAdmin(request);
  if (!authed) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const list = await request.json().catch(() => null);
  if (!Array.isArray(list)) {
    return NextResponse.json({ error: "Body must be an array of colonists" }, { status: 400 });
  }

  const store = colonistsStore();
  await store.setJSON("list", list);
  return NextResponse.json({ ok: true });
}

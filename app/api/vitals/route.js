import { NextResponse } from "next/server";
import { metaStore, DEFAULT_VITALS } from "@/lib/blobStores";
import { requireAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const store = metaStore();
  const vitals = (await store.get("vitals", { type: "json" })) ?? DEFAULT_VITALS;
  return NextResponse.json(vitals);
}

export async function PUT(request) {
  const authed = await requireAdmin(request);
  if (!authed) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const vitals = await request.json().catch(() => null);
  if (!vitals || typeof vitals !== "object") {
    return NextResponse.json({ error: "Invalid vitals payload" }, { status: 400 });
  }

  const store = metaStore();
  await store.setJSON("vitals", vitals);
  return NextResponse.json({ ok: true });
}

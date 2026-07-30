import { NextResponse } from "next/server";
import { guestbookStore } from "@/lib/blobStores";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  const store = guestbookStore();
  const entries = (await store.get("entries", { type: "json" })) || [];
  return NextResponse.json(entries);
}

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const name = (body.name || "").trim();
  const message = (body.message || "").trim();

  if (!name || !message) {
    return NextResponse.json({ error: "Name and message are required" }, { status: 400 });
  }

  const entry = {
    id: `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`,
    name: name.slice(0, 60),
    message: message.slice(0, 500),
    date: new Date().toISOString(),
  };

  const store = guestbookStore();
  const entries = (await store.get("entries", { type: "json" })) || [];
  entries.unshift(entry);
  await store.setJSON("entries", entries);

  return NextResponse.json({ ok: true, entry });
}

export async function DELETE(request) {
  const authed = await requireAdmin(request);
  if (!authed) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await request.json().catch(() => ({}));
  const store = guestbookStore();
  const entries = (await store.get("entries", { type: "json" })) || [];
  await store.setJSON("entries", entries.filter((e) => e.id !== id));

  return NextResponse.json({ ok: true });
}

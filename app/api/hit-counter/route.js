import { NextResponse } from "next/server";
import { metaStore } from "@/lib/blobStores";

// Netlify Blobs is "last write wins" under concurrent writes, so under very
// heavy simultaneous traffic a handful of increments could race and be lost.
// For a personal colony blog that's a fine trade-off for zero infrastructure.

export const dynamic = "force-dynamic";

export async function GET() {
  const store = metaStore();
  const hits = (await store.get("hits", { type: "json" })) || 0;
  return NextResponse.json({ hits });
}

export async function POST() {
  const store = metaStore();
  const current = (await store.get("hits", { type: "json" })) || 0;
  const next = current + 1;
  await store.setJSON("hits", next);
  return NextResponse.json({ hits: next });
}

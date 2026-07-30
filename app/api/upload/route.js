import { NextResponse } from "next/server";
import { imagesStore } from "@/lib/blobStores";
import { requireAdmin } from "@/lib/auth";

const MAX_BYTES = 8 * 1024 * 1024; // 8MB

export async function POST(request) {
  const authed = await requireAdmin(request);
  if (!authed) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await request.formData().catch(() => null);
  const file = formData?.get("file");

  if (!file || typeof file === "string") {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "File too large (8MB max)" }, { status: 400 });
  }
  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "File must be an image" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
  const key = `${Date.now().toString(36)}-${safeName}`;

  const store = imagesStore();
  await store.set(key, bytes, { metadata: { contentType: file.type } });

  return NextResponse.json({ ok: true, key });
}

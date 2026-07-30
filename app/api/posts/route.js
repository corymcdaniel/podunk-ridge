import { NextResponse } from "next/server";
import { postsStore } from "@/lib/blobStores";
import { requireAdmin } from "@/lib/auth";

function slugify(title) {
  const base = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return `${base || "post"}-${Date.now().toString(36)}`;
}

export const dynamic = "force-dynamic";

export async function GET() {
  const store = postsStore();
  const index = (await store.get("index", { type: "json" })) || [];
  return NextResponse.json(index);
}

export async function POST(request) {
  const authed = await requireAdmin(request);
  if (!authed) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json().catch(() => ({}));
  const { title, day, mood, byline, content, scene, coverImageKey } = body;

  if (!title || !content) {
    return NextResponse.json({ error: "Title and content are required" }, { status: 400 });
  }

  const slug = slugify(title);
  const store = postsStore();
  const index = (await store.get("index", { type: "json" })) || [];

  const summary = {
    slug,
    title,
    day: day || "",
    mood: mood || "",
    byline: byline || "",
    scene: scene || "sunset",
    coverImageKey: coverImageKey || null,
    date: new Date().toISOString(),
    excerpt: content.slice(0, 160),
  };

  const updatedIndex = [summary, ...index.filter((p) => p.slug !== slug)];
  await store.setJSON("index", updatedIndex);
  await store.setJSON(`post:${slug}`, { ...summary, content });

  return NextResponse.json({ ok: true, slug });
}

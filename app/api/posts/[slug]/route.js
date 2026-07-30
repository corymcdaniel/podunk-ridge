import { NextResponse } from "next/server";
import { postsStore } from "@/lib/blobStores";
import { requireAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(request, { params }) {
  const store = postsStore();
  const post = await store.get(`post:${params.slug}`, { type: "json" });
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(post);
}

export async function PUT(request, { params }) {
  const authed = await requireAdmin(request);
  if (!authed) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const store = postsStore();
  const existing = await store.get(`post:${params.slug}`, { type: "json" });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const body = await request.json().catch(() => ({}));
  const merged = { ...existing, ...body, slug: params.slug };
  if (body.content) merged.excerpt = body.content.slice(0, 160);

  await store.setJSON(`post:${params.slug}`, merged);

  const index = (await store.get("index", { type: "json" })) || [];
  const newIndex = index.map((p) =>
    p.slug === params.slug
      ? {
          ...p,
          title: merged.title,
          day: merged.day,
          mood: merged.mood,
          byline: merged.byline,
          scene: merged.scene,
          coverImageKey: merged.coverImageKey,
          excerpt: merged.excerpt,
        }
      : p
  );
  await store.setJSON("index", newIndex);

  return NextResponse.json({ ok: true });
}

export async function DELETE(request, { params }) {
  const authed = await requireAdmin(request);
  if (!authed) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const store = postsStore();
  await store.delete(`post:${params.slug}`);

  const index = (await store.get("index", { type: "json" })) || [];
  await store.setJSON("index", index.filter((p) => p.slug !== params.slug));

  return NextResponse.json({ ok: true });
}

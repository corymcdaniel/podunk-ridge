import { notFound } from "next/navigation";
import { PostForm } from "@/components/PostForm";
import { postsStore } from "@/lib/blobStores";

export const dynamic = "force-dynamic";

async function getPost(slug) {
  const store = postsStore();
  return await store.get(`post:${slug}`, { type: "json" });
}

export default async function EditPostPage({ params }) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  return (
    <div>
      <h2 style={{ fontFamily: '"Courier New", monospace', color: "#f2e0b8" }}>Edit Entry</h2>
      <PostForm mode="edit" initialPost={post} />
    </div>
  );
}

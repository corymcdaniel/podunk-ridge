import Link from "next/link";
import { PostsAdminList } from "@/components/PostsAdminList";
import { postsStore } from "@/lib/blobStores";

export const dynamic = "force-dynamic";

async function getPosts() {
  const store = postsStore();
  return (await store.get("index", { type: "json" })) || [];
}

export default async function AdminPostsPage() {
  const posts = await getPosts();

  return (
    <div>
      <h2 style={{ fontFamily: '"Courier New", monospace', color: "#f2e0b8" }}>Entries</h2>
      <p><Link href="/admin/posts/new" className="pr-button" style={{ fontSize: 12, padding: "6px 12px" }}>+ New entry</Link></p>
      <PostsAdminList initialPosts={posts} />
    </div>
  );
}

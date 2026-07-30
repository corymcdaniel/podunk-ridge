import { notFound } from "next/navigation";
import { SiteChrome } from "@/components/SiteChrome";
import { PostHero } from "@/components/PostHero";
import { postsStore } from "@/lib/blobStores";

export const dynamic = "force-dynamic";

async function getPost(slug) {
  const store = postsStore();
  return await store.get(`post:${slug}`, { type: "json" });
}

export default async function PostPage({ params }) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  return (
    <SiteChrome>
      <div className="pr-post">
        <PostHero post={post} />
        <div className="pr-post-body">
          {post.byline ? <span className="pr-byline">{post.byline}</span> : null}
          {post.content.split("\n\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
        <div className="pr-post-footer">
          <span>mood: {post.mood || "unknown"}</span>
          <span>{post.day || ""}</span>
        </div>
      </div>
    </SiteChrome>
  );
}

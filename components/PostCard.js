import Link from "next/link";
import { PostHero } from "./PostHero";

export function PostCard({ post }) {
  return (
    <div className="pr-post">
      <Link href={`/post/${post.slug}`} style={{ display: "block" }}>
        <PostHero post={post} />
      </Link>
      <div className="pr-post-body">
        {post.byline ? <span className="pr-byline">{post.byline}</span> : null}
        <p>{post.excerpt}{post.excerpt?.length >= 160 ? "..." : ""}</p>
      </div>
      <div className="pr-post-footer">
        <span>mood: {post.mood || "unknown"}</span>
        <span><Link href={`/post/${post.slug}`}>read more &rarr;</Link></span>
      </div>
    </div>
  );
}

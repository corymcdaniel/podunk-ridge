import { SiteChrome } from "@/components/SiteChrome";
import { PostCard } from "@/components/PostCard";
import { postsStore } from "@/lib/blobStores";

export const dynamic = "force-dynamic";

async function getPosts() {
  const store = postsStore();
  return (await store.get("index", { type: "json" })) || [];
}

export default async function HomePage() {
  const posts = await getPosts();

  return (
    <SiteChrome>
      <div id="log">
        {posts.length === 0 ? (
          <div className="pr-post">
            <div className="pr-post-body">
              <p>No entries yet. Once you claim some land in-game, head to <code>/admin</code> and write the first one.</p>
            </div>
          </div>
        ) : (
          posts.map((post) => <PostCard key={post.slug} post={post} />)
        )}
      </div>
    </SiteChrome>
  );
}

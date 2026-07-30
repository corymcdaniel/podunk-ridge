import { SceneArt } from "./SceneArt";

export function PostHero({ post }) {
  return (
    <div className="pr-post-header">
      {post.coverImageKey ? (
        <img src={`/api/images/${post.coverImageKey}`} alt="" />
      ) : (
        <SceneArt scene={post.scene} />
      )}
      {post.day ? <div className="pr-post-meta-overlay">{post.day}</div> : null}
      <div className="pr-post-title-overlay">{post.title}</div>
    </div>
  );
}

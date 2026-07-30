"use client";

import Link from "next/link";
import { useState } from "react";

export function PostsAdminList({ initialPosts }) {
  const [posts, setPosts] = useState(initialPosts);
  const [error, setError] = useState("");

  async function handleDelete(slug) {
    if (!confirm("Delete this entry? This can't be undone.")) return;
    setError("");
    try {
      const res = await fetch(`/api/posts/${slug}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Delete failed");
      setPosts((prev) => prev.filter((p) => p.slug !== slug));
    } catch (err) {
      setError(err.message);
    }
  }

  if (posts.length === 0) {
    return <p>No entries yet. <Link href="/admin/posts/new">Write the first one.</Link></p>;
  }

  return (
    <>
      {error ? <div className="pr-error">{error}</div> : null}
      <table className="pr-admin-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Day</th>
            <th>Posted</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.slug}>
              <td><Link href={`/post/${post.slug}`}>{post.title}</Link></td>
              <td>{post.day}</td>
              <td>{new Date(post.date).toLocaleDateString()}</td>
              <td>
                <Link href={`/admin/posts/${post.slug}/edit`} className="pr-button" style={{ fontSize: 11, padding: "3px 8px", marginRight: 6 }}>
                  Edit
                </Link>
                <button
                  className="pr-button pr-button-danger"
                  style={{ fontSize: 11, padding: "3px 8px" }}
                  onClick={() => handleDelete(post.slug)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

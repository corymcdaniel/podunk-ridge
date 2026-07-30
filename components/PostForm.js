"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SceneArt, SCENE_OPTIONS } from "./SceneArt";

export function PostForm({ mode, initialPost }) {
  const router = useRouter();
  const [title, setTitle] = useState(initialPost?.title || "");
  const [day, setDay] = useState(initialPost?.day || "");
  const [mood, setMood] = useState(initialPost?.mood || "");
  const [byline, setByline] = useState(initialPost?.byline || "");
  const [content, setContent] = useState(initialPost?.content || "");
  const [scene, setScene] = useState(initialPost?.scene || "sunset");
  const [coverImageKey, setCoverImageKey] = useState(initialPost?.coverImageKey || null);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      setCoverImageKey(data.key);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const payload = { title, day, mood, byline, content, scene, coverImageKey };

    try {
      const url = mode === "create" ? "/api/posts" : `/api/posts/${initialPost.slug}`;
      const method = mode === "create" ? "POST" : "PUT";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");
      router.push("/admin/posts");
      router.refresh();
    } catch (err) {
      setError(err.message);
      setSubmitting(false);
    }
  }

  const previewPost = { title: title || "Untitled entry", day, scene, coverImageKey };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 640 }}>
      <div className="pr-field">
        <label htmlFor="pf-title">Title</label>
        <input id="pf-title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>

      <div style={{ display: "flex", gap: 12 }}>
        <div className="pr-field" style={{ flex: 1 }}>
          <label htmlFor="pf-day">Day / date label</label>
          <input id="pf-day" value={day} onChange={(e) => setDay(e.target.value)} placeholder="DAY 14" />
        </div>
        <div className="pr-field" style={{ flex: 1 }}>
          <label htmlFor="pf-mood">Mood</label>
          <input id="pf-mood" value={mood} onChange={(e) => setMood(e.target.value)} placeholder="cautiously optimistic" />
        </div>
      </div>

      <div className="pr-field">
        <label htmlFor="pf-byline">Byline</label>
        <input id="pf-byline" value={byline} onChange={(e) => setByline(e.target.value)} placeholder="posted by Cory :: 4:47pm" />
      </div>

      <div className="pr-field">
        <label htmlFor="pf-content">Entry (leave a blank line between paragraphs)</label>
        <textarea id="pf-content" value={content} onChange={(e) => setContent(e.target.value)} style={{ minHeight: 200 }} required />
      </div>

      <div className="pr-field">
        <label>Cover image</label>
        <p style={{ margin: "0 0 8px", fontSize: 12 }}>
          Upload a screenshot, or leave blank to use a generated scene instead.
        </p>
        <input type="file" accept="image/*" onChange={handleFileChange} disabled={uploading} />
        {uploading ? <p style={{ fontSize: 12 }}>Uploading...</p> : null}
        {coverImageKey ? (
          <p style={{ fontSize: 12 }}>
            Using uploaded image.{" "}
            <button type="button" className="pr-button" style={{ fontSize: 10, padding: "2px 6px" }} onClick={() => setCoverImageKey(null)}>
              Remove, use scene instead
            </button>
          </p>
        ) : null}
      </div>

      {!coverImageKey ? (
        <div className="pr-field">
          <label htmlFor="pf-scene">Generated scene</label>
          <select id="pf-scene" value={scene} onChange={(e) => setScene(e.target.value)}>
            {SCENE_OPTIONS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      ) : null}

      <div className="pr-field">
        <label>Preview</label>
        <div className="pr-post-header" style={{ height: 140 }}>
          {coverImageKey ? (
            <img src={`/api/images/${coverImageKey}`} alt="" />
          ) : (
            <SceneArt scene={scene} />
          )}
          <div className="pr-post-title-overlay">{previewPost.title}</div>
        </div>
      </div>

      {error ? <div className="pr-error">{error}</div> : null}

      <button type="submit" className="pr-button" disabled={submitting || uploading}>
        {submitting ? "Saving..." : mode === "create" ? "Publish entry" : "Save changes"}
      </button>
    </form>
  );
}

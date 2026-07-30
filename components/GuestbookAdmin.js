"use client";

import { useState } from "react";

export function GuestbookAdmin({ initialEntries }) {
  const [entries, setEntries] = useState(initialEntries);
  const [error, setError] = useState("");

  async function handleDelete(id) {
    if (!confirm("Delete this guestbook entry?")) return;
    setError("");
    try {
      const res = await fetch("/api/guestbook", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Delete failed");
      setEntries((prev) => prev.filter((e) => e.id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  if (entries.length === 0) return <p>No entries yet.</p>;

  return (
    <div>
      {error ? <div className="pr-error">{error}</div> : null}
      {entries.map((entry) => (
        <div key={entry.id} className="pr-guestbook-entry" style={{ maxWidth: 640 }}>
          <span className="pr-byline">{entry.name} :: {new Date(entry.date).toLocaleString()}</span>
          <p>{entry.message}</p>
          <button className="pr-button pr-button-danger" style={{ fontSize: 11 }} onClick={() => handleDelete(entry.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

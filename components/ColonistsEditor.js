"use client";

import { useState } from "react";

function newColonist() {
  return { id: `c${Date.now().toString(36)}`, name: "", role: "", bio: "", status: "healthy" };
}

export function ColonistsEditor({ initialColonists }) {
  const [colonists, setColonists] = useState(initialColonists);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  function updateField(id, field, value) {
    setColonists((prev) => prev.map((c) => (c.id === id ? { ...c, [field]: value } : c)));
  }

  function removeColonist(id) {
    setColonists((prev) => prev.filter((c) => c.id !== id));
  }

  function addColonist() {
    setColonists((prev) => [...prev, newColonist()]);
  }

  async function handleSave() {
    setStatus("saving");
    setError("");
    try {
      const res = await fetch("/api/colonists", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(colonists),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");
      setStatus("saved");
      setTimeout(() => setStatus("idle"), 1500);
    } catch (err) {
      setError(err.message);
      setStatus("error");
    }
  }

  return (
    <div>
      {colonists.map((c) => (
        <div key={c.id} className="pr-widget" style={{ maxWidth: 640 }}>
          <div style={{ display: "flex", gap: 12 }}>
            <div className="pr-field" style={{ flex: 1 }}>
              <label>Name</label>
              <input value={c.name} onChange={(e) => updateField(c.id, "name", e.target.value)} />
            </div>
            <div className="pr-field" style={{ flex: 1 }}>
              <label>Role</label>
              <input value={c.role} onChange={(e) => updateField(c.id, "role", e.target.value)} />
            </div>
            <div className="pr-field" style={{ flex: 1 }}>
              <label>Status</label>
              <input value={c.status} onChange={(e) => updateField(c.id, "status", e.target.value)} />
            </div>
          </div>
          <div className="pr-field">
            <label>Bio</label>
            <textarea value={c.bio} onChange={(e) => updateField(c.id, "bio", e.target.value)} style={{ minHeight: 50 }} />
          </div>
          <button type="button" className="pr-button pr-button-danger" style={{ fontSize: 11 }} onClick={() => removeColonist(c.id)}>
            Remove
          </button>
        </div>
      ))}

      <div style={{ marginTop: 16 }}>
        <button type="button" className="pr-button" onClick={addColonist} style={{ marginRight: 8 }}>
          + Add colonist
        </button>
        <button type="button" className="pr-button" onClick={handleSave} disabled={status === "saving"}>
          {status === "saving" ? "Saving..." : status === "saved" ? "Saved!" : "Save roster"}
        </button>
      </div>
      {error ? <div className="pr-error">{error}</div> : null}
    </div>
  );
}

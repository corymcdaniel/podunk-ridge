"use client";

import { useState } from "react";

export function VitalsForm({ initialVitals }) {
  const [vitals, setVitals] = useState(initialVitals);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  function update(field, value) {
    setVitals((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSave(e) {
    e.preventDefault();
    setStatus("saving");
    setError("");
    try {
      const res = await fetch("/api/vitals", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...vitals,
          population: Number(vitals.population) || 0,
          prisoners: Number(vitals.prisoners) || 0,
          wealth: Number(vitals.wealth) || 0,
          mood: Number(vitals.mood) || 0,
        }),
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
    <form onSubmit={handleSave} style={{ maxWidth: 480 }}>
      <div style={{ display: "flex", gap: 12 }}>
        <div className="pr-field" style={{ flex: 1 }}>
          <label>Population</label>
          <input type="number" value={vitals.population} onChange={(e) => update("population", e.target.value)} />
        </div>
        <div className="pr-field" style={{ flex: 1 }}>
          <label>Prisoners</label>
          <input type="number" value={vitals.prisoners} onChange={(e) => update("prisoners", e.target.value)} />
        </div>
      </div>
      <div style={{ display: "flex", gap: 12 }}>
        <div className="pr-field" style={{ flex: 1 }}>
          <label>Wealth (silver)</label>
          <input type="number" value={vitals.wealth} onChange={(e) => update("wealth", e.target.value)} />
        </div>
        <div className="pr-field" style={{ flex: 1 }}>
          <label>Avg mood %</label>
          <input type="number" value={vitals.mood} onChange={(e) => update("mood", e.target.value)} />
        </div>
      </div>
      <div className="pr-field">
        <label>Season / date label</label>
        <input value={vitals.season} onChange={(e) => update("season", e.target.value)} />
      </div>
      <div className="pr-field">
        <label>Last raid</label>
        <input value={vitals.lastRaid} onChange={(e) => update("lastRaid", e.target.value)} />
      </div>
      <div className="pr-field">
        <label>Status note</label>
        <input value={vitals.status} onChange={(e) => update("status", e.target.value)} placeholder="no active threats" />
      </div>
      {error ? <div className="pr-error">{error}</div> : null}
      <button type="submit" className="pr-button" disabled={status === "saving"}>
        {status === "saving" ? "Saving..." : status === "saved" ? "Saved!" : "Update ticker"}
      </button>
    </form>
  );
}

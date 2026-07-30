"use client";

import { useState } from "react";

export function GuestbookForm({ onEntryAdded }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle"); // idle | submitting | error
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");
    setError("");

    try {
      const res = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");

      setName("");
      setMessage("");
      setStatus("idle");
      onEntryAdded?.(data.entry);
    } catch (err) {
      setError(err.message);
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="pr-field">
        <label htmlFor="gb-name">Your name</label>
        <input id="gb-name" value={name} onChange={(e) => setName(e.target.value)} maxLength={60} required />
      </div>
      <div className="pr-field">
        <label htmlFor="gb-message">Leave a message</label>
        <textarea id="gb-message" value={message} onChange={(e) => setMessage(e.target.value)} maxLength={500} required />
      </div>
      {error ? <div className="pr-error">{error}</div> : null}
      <button type="submit" className="pr-button" disabled={status === "submitting"}>
        {status === "submitting" ? "Signing..." : "Sign the Guestbook"}
      </button>
    </form>
  );
}

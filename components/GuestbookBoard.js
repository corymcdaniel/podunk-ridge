"use client";

import { useState } from "react";
import { GuestbookForm } from "./GuestbookForm";

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
}

export function GuestbookBoard({ initialEntries }) {
  const [entries, setEntries] = useState(initialEntries);

  return (
    <>
      <div className="pr-post">
        <div className="pr-post-body">
          <h2 style={{ fontFamily: '"Courier New", monospace', color: "#f2e0b8" }}>Sign the Guestbook</h2>
          <GuestbookForm onEntryAdded={(entry) => setEntries((prev) => [entry, ...prev])} />
        </div>
      </div>

      <div className="pr-post">
        <div className="pr-post-body">
          <h2 style={{ fontFamily: '"Courier New", monospace', color: "#f2e0b8" }}>Entries</h2>
          {entries.length === 0 ? (
            <p>No one&apos;s signed yet. Be the first!</p>
          ) : (
            entries.map((entry) => (
              <div key={entry.id} className="pr-guestbook-entry">
                <span className="pr-byline">{entry.name} :: {formatDate(entry.date)}</span>
                <p>{entry.message}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

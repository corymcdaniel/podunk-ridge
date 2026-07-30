"use client";

import { useEffect, useRef, useState } from "react";

export function HitCounter() {
  const [hits, setHits] = useState(null);
  const firedRef = useRef(false);

  useEffect(() => {
    if (firedRef.current) return; // guards against double-fire in React strict mode
    firedRef.current = true;

    fetch("/api/hit-counter", { method: "POST" })
      .then((res) => res.json())
      .then((data) => setHits(data.hits))
      .catch(() => setHits(null));
  }, []);

  const display = hits === null ? "......" : String(hits).padStart(6, "0");

  return (
    <div className="pr-widget">
      <h3>Site Meter</h3>
      <div className="pr-counter">{display}</div>
      <p style={{ textAlign: "center" }}>you are visitor #{hits ?? "..."}</p>
    </div>
  );
}

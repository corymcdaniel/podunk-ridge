import { HitCounter } from "./HitCounter";

export function Sidebar({ vitals, colonists }) {
  return (
    <div className="pr-sidebar">
      <HitCounter />

      <div className="pr-widget">
        <h3>Colony Vitals</h3>
        <ul>
          <li>Pop: {vitals.population} / {vitals.prisoners} prisoners</li>
          <li>Wealth: {vitals.wealth?.toLocaleString?.() ?? vitals.wealth} slv</li>
          <li>Mood avg: {vitals.mood}%</li>
          <li>Season: {vitals.season}</li>
          <li>Last raid: {vitals.lastRaid}</li>
        </ul>
      </div>

      <div className="pr-widget">
        <h3>Dramatis Personae</h3>
        <ul>
          {colonists.slice(0, 6).map((c) => (
            <li key={c.id}>{c.name} - {c.role}</li>
          ))}
        </ul>
      </div>

      <div className="pr-underconstruction">
        &#128679; SOUTH&nbsp;WING&nbsp;UNDER&nbsp;CONSTRUCTION &#128679;
      </div>
      <br />

      <div className="pr-widget" style={{ textAlign: "center" }}>
        <h3>Webring</h3>
        <span className="pr-badge">&lt;- prev</span>
        <span className="pr-badge">RIMWORLD LOGS RING</span>
        <span className="pr-badge">next -&gt;</span>
      </div>
    </div>
  );
}

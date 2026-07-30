import Link from "next/link";
import { Sidebar } from "./Sidebar";
import { metaStore, colonistsStore, DEFAULT_VITALS, DEFAULT_COLONISTS } from "@/lib/blobStores";

async function getVitals() {
  const store = metaStore();
  return (await store.get("vitals", { type: "json" })) ?? DEFAULT_VITALS;
}

async function getColonists() {
  const store = colonistsStore();
  return (await store.get("list", { type: "json" })) ?? DEFAULT_COLONISTS;
}

export async function SiteChrome({ children }) {
  const [vitals, colonists] = await Promise.all([getVitals(), getColonists()]);

  return (
    <div className="pr-shell">
      <div className="pr-ticker">
        {/* eslint-disable-next-line jsx-a11y/no-marquee -- deliberate period-accurate touch */}
        <marquee behavior="scroll" scrollamount="4">
          *** COLONY STATUS: {vitals.population} colonists, {vitals.prisoners} prisoners, mood avg {vitals.mood}% ***
          {" "}WEALTH: {vitals.wealth?.toLocaleString?.() ?? vitals.wealth} silver ***
          {" "}LAST RAID: {vitals.lastRaid} *** {vitals.status} ***
          {" "}NOW PLAYING: a RimWorld colony log *** don&apos;t forget to sign the guestbook!!! ***
        </marquee>
      </div>

      <div className="pr-banner">
        <Link href="/">
          <h1><span className="pr-sparkle">&#9733;</span> PODUNK&nbsp;RIDGE <span className="pr-sparkle">&#9733;</span></h1>
        </Link>
        <div className="pr-subtitle">
          a survival colony log :: {vitals.season} :: <span className="pr-blink">NOW UPDATED WEEKLY!</span>
        </div>
      </div>

      <hr className="stars" />

      <table className="pr-navtable">
        <tbody>
          <tr>
            <td><Link href="/">HOME</Link></td>
            <td><Link href="/#log">COLONY&nbsp;LOG</Link></td>
            <td><Link href="/colonists">COLONISTS</Link></td>
            <td><Link href="/guestbook">GUESTBOOK</Link></td>
            <td><Link href="/admin">ADMIN</Link></td>
          </tr>
        </tbody>
      </table>

      <table className="pr-maintable">
        <tbody>
          <tr>
            <td className="pr-sidebar" style={{ padding: 0 }}>
              <div style={{ padding: 14 }}>
                <Sidebar vitals={vitals} colonists={colonists} />
              </div>
            </td>
            <td className="pr-content">{children}</td>
          </tr>
        </tbody>
      </table>

      <div className="pr-footer">
        &copy; Podunk Ridge Colony Log &mdash; all rights reserved (i.e. please don&apos;t raid my base)
        <div className="pr-browserbadges">
          <span>BEST VIEWED IN NETSCAPE 6</span>
          <span>800x600</span>
          <span>SIGNAL: 1 BAR, SOMEWHERE OUT PAST THE RIM</span>
        </div>
      </div>
    </div>
  );
}

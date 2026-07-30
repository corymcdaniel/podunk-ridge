import { SiteChrome } from "@/components/SiteChrome";
import { colonistsStore, DEFAULT_COLONISTS } from "@/lib/blobStores";

export const dynamic = "force-dynamic";

async function getColonists() {
  const store = colonistsStore();
  return (await store.get("list", { type: "json" })) ?? DEFAULT_COLONISTS;
}

export default async function ColonistsPage() {
  const colonists = await getColonists();

  return (
    <SiteChrome>
      <div className="pr-post">
        <div className="pr-post-body">
          <h2 style={{ fontFamily: '"Courier New", monospace', color: "#f2e0b8" }}>Dramatis Personae</h2>
          {colonists.map((c) => (
            <div key={c.id} style={{ marginBottom: 16, paddingBottom: 12, borderBottom: "1px dashed #4a3a28" }}>
              <span className="pr-byline">{c.name} &mdash; {c.role} &mdash; status: {c.status}</span>
              <p>{c.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </SiteChrome>
  );
}

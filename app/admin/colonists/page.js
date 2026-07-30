import { ColonistsEditor } from "@/components/ColonistsEditor";
import { colonistsStore, DEFAULT_COLONISTS } from "@/lib/blobStores";

export const dynamic = "force-dynamic";

async function getColonists() {
  const store = colonistsStore();
  return (await store.get("list", { type: "json" })) ?? DEFAULT_COLONISTS;
}

export default async function AdminColonistsPage() {
  const colonists = await getColonists();

  return (
    <div>
      <h2 style={{ fontFamily: '"Courier New", monospace', color: "#f2e0b8" }}>Colonist Roster</h2>
      <ColonistsEditor initialColonists={colonists} />
    </div>
  );
}

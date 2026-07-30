import { VitalsForm } from "@/components/VitalsForm";
import { metaStore, DEFAULT_VITALS } from "@/lib/blobStores";

export const dynamic = "force-dynamic";

async function getVitals() {
  const store = metaStore();
  return (await store.get("vitals", { type: "json" })) ?? DEFAULT_VITALS;
}

export default async function AdminVitalsPage() {
  const vitals = await getVitals();

  return (
    <div>
      <h2 style={{ fontFamily: '"Courier New", monospace', color: "#f2e0b8" }}>Colony Vitals</h2>
      <p style={{ maxWidth: 480 }}>
        This feeds the scrolling ticker at the top of the site and the
        &quot;Colony Vitals&quot; sidebar widget. Update it whenever things
        change in-game.
      </p>
      <VitalsForm initialVitals={vitals} />
    </div>
  );
}

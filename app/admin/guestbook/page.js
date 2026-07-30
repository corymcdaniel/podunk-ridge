import { GuestbookAdmin } from "@/components/GuestbookAdmin";
import { guestbookStore } from "@/lib/blobStores";

export const dynamic = "force-dynamic";

async function getEntries() {
  const store = guestbookStore();
  return (await store.get("entries", { type: "json" })) || [];
}

export default async function AdminGuestbookPage() {
  const entries = await getEntries();

  return (
    <div>
      <h2 style={{ fontFamily: '"Courier New", monospace', color: "#f2e0b8" }}>Guestbook Moderation</h2>
      <GuestbookAdmin initialEntries={entries} />
    </div>
  );
}

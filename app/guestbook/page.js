import { SiteChrome } from "@/components/SiteChrome";
import { GuestbookBoard } from "@/components/GuestbookBoard";
import { guestbookStore } from "@/lib/blobStores";

export const dynamic = "force-dynamic";

async function getEntries() {
  const store = guestbookStore();
  return (await store.get("entries", { type: "json" })) || [];
}

export default async function GuestbookPage() {
  const entries = await getEntries();

  return (
    <SiteChrome>
      <GuestbookBoard initialEntries={entries} />
    </SiteChrome>
  );
}

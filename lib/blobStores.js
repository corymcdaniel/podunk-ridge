import { getStore } from "@netlify/blobs";

// Each getStore() call opens (or creates, on first use) a site-wide store.
// No provisioning step needed - Netlify Blobs configures itself automatically
// both in production and under `netlify dev`.

export function postsStore() {
  return getStore("posts");
}

export function colonistsStore() {
  return getStore("colonists");
}

export function guestbookStore() {
  return getStore("guestbook");
}

export function metaStore() {
  return getStore("meta");
}

export function imagesStore() {
  return getStore("post-images");
}

export const DEFAULT_VITALS = {
  population: 6,
  prisoners: 2,
  wealth: 48200,
  mood: 61,
  season: "Fall, Year 1",
  lastRaid: "3 days ago",
  status: "no active threats",
};

export const DEFAULT_COLONISTS = [
  { id: "c1", name: "Aya", role: "Doctor", bio: "Keeps everyone stitched together, mostly by force of will.", status: "healthy" },
  { id: "c2", name: "Cole", role: "Miner", bio: "Has a complicated relationship with fire.", status: "healthy" },
  { id: "c3", name: "Ren", role: "Grower", bio: "Slow learner, fast forgiver.", status: "healthy" },
  { id: "c4", name: "Bram", role: "???", bio: "The one we don't fully trust yet.", status: "healthy" },
];

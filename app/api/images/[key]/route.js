import { imagesStore } from "@/lib/blobStores";

export const dynamic = "force-dynamic";

export async function GET(request, { params }) {
  const store = imagesStore();
  const result = await store.getWithMetadata(params.key, { type: "arrayBuffer" });

  if (!result || !result.data) {
    return new Response("Not found", { status: 404 });
  }

  const contentType = result.metadata?.contentType || "application/octet-stream";
  return new Response(result.data, {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}

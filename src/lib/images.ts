import { cache } from "react";
import { readdir } from "node:fs/promises";
import path from "node:path";

/**
 * Resolves the photos for a category at request/build time — never hardcoded.
 *
 * Source of truth:
 *   1. If ImageKit is configured (NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT +
 *      IMAGEKIT_PRIVATE_KEY), the folder `/{slug}` is listed via the ImageKit
 *      Media API and the optimized CDN URLs are used.
 *   2. Otherwise it falls back to reading /public/{slug} from disk, so the
 *      gallery works locally before anything is uploaded.
 */

export type GalleryImage = {
  /** Absolute ImageKit URL or local /public path. */
  src: string;
  width?: number;
  height?: number;
};

const IMAGE_EXT = /\.(jpe?g|png|webp|avif|gif)$/i;

const endpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT?.replace(
  /\/+$/,
  "",
);
const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
const imagekitEnabled = Boolean(endpoint && privateKey);

type ImageKitFile = {
  name: string;
  filePath: string;
  url: string;
  height?: number;
  width?: number;
  type: string;
};

async function listFromImageKit(slug: string): Promise<GalleryImage[]> {
  const params = new URLSearchParams({
    path: `/${slug}`,
    type: "file",
    limit: "1000",
    sort: "ASC_NAME",
  });
  const auth = Buffer.from(`${privateKey}:`).toString("base64");

  const res = await fetch(`https://api.imagekit.io/v1/files?${params}`, {
    headers: { Authorization: `Basic ${auth}` },
    // Cache the listing; re-checks every hour for new uploads.
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    console.error(
      `ImageKit list failed for "/${slug}": ${res.status} ${res.statusText}`,
    );
    return [];
  }

  const files = (await res.json()) as ImageKitFile[];
  return files
    .filter((f) => f.type === "file" && IMAGE_EXT.test(f.name))
    .map((f) => ({ src: f.url, width: f.width, height: f.height }));
}

async function listFromPublic(slug: string): Promise<GalleryImage[]> {
  const dir = path.join(process.cwd(), "public", slug);
  try {
    const entries = await readdir(dir);
    return entries
      .filter((name) => IMAGE_EXT.test(name))
      .sort((a, b) => a.localeCompare(b))
      .map((name) => ({ src: `/${slug}/${encodeURIComponent(name)}` }));
  } catch {
    return [];
  }
}

/** Photos for a single category. Deduped per render via React cache. */
export const listCategoryImages = cache(
  async (slug: string): Promise<GalleryImage[]> => {
    return imagekitEnabled ? listFromImageKit(slug) : listFromPublic(slug);
  },
);

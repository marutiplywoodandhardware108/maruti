"use client";

/**
 * Custom next/image loader.
 *
 * For ImageKit-served photos it builds a transformation URL so the resizing,
 * compression and modern-format (AVIF/WebP) conversion happen on ImageKit's
 * global CDN — the browser fetches the right-sized image in one hop, with no
 * extra Next.js optimizer round-trip. Any non-ImageKit src (e.g. the local
 * /public fallback or the logo) is passed through unchanged.
 */
const ENDPOINT = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT?.replace(
  /\/+$/,
  "",
);

export default function imageKitLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}): string {
  const isImageKit =
    src.includes("ik.imagekit.io") || (ENDPOINT && src.startsWith(ENDPOINT));

  if (!isImageKit) return src;

  // f-auto → AVIF/WebP when supported; c-at_max keeps the original aspect
  // ratio while never upscaling past the source.
  const tr = `tr=w-${width},q-${quality || 70},f-auto,c-at_max`;
  const [base, query] = src.split("?");
  return query ? `${base}?${query}&${tr}` : `${base}?${tr}`;
}

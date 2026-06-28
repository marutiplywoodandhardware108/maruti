import type { NextConfig } from "next";

/**
 * Allow next/image to load the optimized photos served by ImageKit.
 * The hostname is derived from NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT so it works
 * for both the default `ik.imagekit.io` domain and any custom domain.
 */
const remotePatterns: NonNullable<NextConfig["images"]>["remotePatterns"] = [
  { protocol: "https", hostname: "ik.imagekit.io", pathname: "/**" },
];

const endpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;
if (endpoint) {
  try {
    const { hostname } = new URL(endpoint);
    if (hostname && hostname !== "ik.imagekit.io") {
      remotePatterns.push({ protocol: "https", hostname, pathname: "/**" });
    }
  } catch {
    // Ignore a malformed endpoint — the default pattern still applies.
  }
}

const nextConfig: NextConfig = {
  images: {
    // Resize/optimize on the ImageKit CDN instead of the Next.js optimizer,
    // so the browser fetches the right-sized AVIF/WebP in a single hop.
    loader: "custom",
    loaderFile: "./src/lib/imagekit-loader.ts",
    remotePatterns,
  },
};

export default nextConfig;

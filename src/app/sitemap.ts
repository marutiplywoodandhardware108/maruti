import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { categories } from "@/lib/categories";
import { listCategoryImages } from "@/lib/images";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const home: MetadataRoute.Sitemap[number] = {
    url: site.url,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 1,
  };

  // Dedicated category pages, each with its product photos for image SEO.
  const categoryEntries = await Promise.all(
    categories.map(async (c) => {
      const images = await listCategoryImages(c.slug);
      return {
        url: `${site.url}/products/${c.slug}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.8,
        images: images.map((img) =>
          img.src.startsWith("http") ? img.src : `${site.url}${img.src}`,
        ),
      };
    }),
  );

  return [home, ...categoryEntries];
}

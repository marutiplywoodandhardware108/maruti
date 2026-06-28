import Image from "next/image";
import type { GalleryImage } from "@/lib/images";

/**
 * Responsive grid of product photos. Presentational + server-rendered.
 * Used both for the 3 highlighted photos on the homepage and the full
 * gallery on a category page.
 */
export function GalleryGrid({
  images,
  altPrefix,
  sizes = "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw",
  className = "grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4",
  priority = false,
}: {
  images: GalleryImage[];
  altPrefix: string;
  sizes?: string;
  className?: string;
  /** Eagerly load these images (use for the first above-the-fold row). */
  priority?: boolean;
}) {
  return (
    <ul className={className}>
      {images.map((image, i) => (
        <li
          key={image.src}
          className="group relative aspect-square overflow-hidden rounded-2xl border border-cream/10 bg-charcoal-800/70"
        >
          <Image
            src={image.src}
            alt={`${altPrefix} — design ${i + 1}`}
            fill
            sizes={sizes}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority={priority}
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        </li>
      ))}
    </ul>
  );
}

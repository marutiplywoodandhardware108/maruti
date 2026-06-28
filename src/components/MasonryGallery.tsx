"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Phone, X } from "lucide-react";
import { WhatsappIcon } from "@/components/icons/SocialIcons";
import type { GalleryImage } from "@/lib/images";
import { site } from "@/lib/site";

/**
 * Pinterest-style masonry gallery. Each photo keeps its original aspect ratio
 * (no cropping) and the columns pack tightly with a single consistent gutter.
 * Clicking a photo opens it full-size in a lightbox with Call + Message
 * (WhatsApp) actions.
 */
export function MasonryGallery({
  images,
  altPrefix,
}: {
  images: GalleryImage[];
  altPrefix: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const active = openIndex === null ? null : images[openIndex];

  const close = useCallback(() => setOpenIndex(null), []);

  // Close on Escape + lock background scroll while the lightbox is open.
  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIndex, close]);

  const telHref = `tel:${site.phoneHref}`;
  const waHref = `https://wa.me/${site.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
    `Hi, I'm interested in this ${altPrefix} design.`,
  )}`;

  return (
    <>
      <div className="columns-2 gap-3 sm:columns-3 sm:gap-4 lg:columns-4">
        {images.map((image, i) => {
          // ImageKit provides intrinsic dimensions; fall back to a square so the
          // local /public path still renders if dimensions are unavailable.
          const width = image.width ?? 1000;
          const height = image.height ?? 1000;
          return (
            <button
              key={image.src}
              type="button"
              onClick={() => setOpenIndex(i)}
              aria-label={`View ${altPrefix} design ${i + 1}`}
              className="group mb-3 block w-full cursor-zoom-in break-inside-avoid overflow-hidden rounded-2xl border border-cream/10 bg-charcoal-800/70 sm:mb-4"
            >
              <Image
                src={image.src}
                alt={`${altPrefix} — design ${i + 1}`}
                width={width}
                height={height}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="h-auto w-full transition-transform duration-500 group-hover:scale-105"
                // Eagerly load the first row (above the fold); lazy-load the rest.
                priority={i < 4}
                loading={i < 4 ? undefined : "lazy"}
              />
            </button>
          );
        })}
      </div>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${altPrefix} — design ${openIndex! + 1}`}
          className="fixed inset-0 z-100 flex flex-col bg-charcoal/95 backdrop-blur-sm"
          onClick={close}
        >
          {/* Close */}
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 bg-charcoal-800/80 text-cream transition-colors hover:border-gold/60 hover:text-gold"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Image */}
          <div className="flex flex-1 items-center justify-center overflow-auto p-4 sm:p-8">
            <Image
              src={active.src}
              alt={`${altPrefix} — design ${openIndex! + 1}`}
              width={active.width ?? 1200}
              height={active.height ?? 1200}
              sizes="(max-width: 1024px) 95vw, 80vw"
              className="h-auto max-h-[78vh] w-auto rounded-xl object-contain"
              priority
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          {/* Actions */}
          <div
            className="flex items-center justify-center gap-3 border-t border-cream/10 bg-charcoal/80 px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <a
              href={telHref}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-charcoal shadow-lg shadow-gold/20 transition-transform hover:-translate-y-0.5 sm:flex-none"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call
            </a>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-6 py-3 text-sm font-semibold text-gold transition-colors hover:bg-gold hover:text-charcoal sm:flex-none"
            >
              <WhatsappIcon className="h-4 w-4" />
              Message
            </a>
          </div>
        </div>
      )}
    </>
  );
}

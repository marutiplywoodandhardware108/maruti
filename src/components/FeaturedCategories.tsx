import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CategoryIcon } from "@/components/CategoryIcon";
import { GalleryGrid } from "@/components/GalleryGrid";
import { categories } from "@/lib/categories";
import { listCategoryImages } from "@/lib/images";

const HIGHLIGHT_COUNT = 3;

export async function FeaturedCategories() {
  // Resolve every category's photos in parallel, then drop empty categories.
  const sections = (
    await Promise.all(
      categories.map(async (category) => ({
        category,
        images: await listCategoryImages(category.slug),
      })),
    )
  ).filter((s) => s.images.length > 0);

  return (
    <section
      id="products"
      aria-labelledby="products-heading"
      className="relative scroll-mt-20 bg-charcoal py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
            Our Range
          </p>
          <h2
            id="products-heading"
            className="mt-3 text-3xl font-bold text-cream sm:text-4xl"
          >
            Hardware for Every Home &amp; Project
          </h2>
          <div className="rule-gold mx-auto mt-6 w-40" />
        </div>

        {/* Categories */}
        <div className="mt-16 space-y-20">
          {sections.map(({ category, images }, sectionIndex) => (
            <div key={category.slug} id={category.slug} className="scroll-mt-24">
              {/* Category heading */}
              <div className="flex flex-col gap-4 border-b border-cream/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-gold/30 bg-gold/10 text-gold">
                    <CategoryIcon name={category.icon} className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="font-serif text-2xl font-semibold text-cream">
                      {category.name}
                    </h3>
                    <p className="mt-1 max-w-xl text-sm text-cream-muted">
                      {category.blurb}
                    </p>
                  </div>
                </div>

                <Link
                  href={`/products/${category.slug}`}
                  className="group inline-flex shrink-0 items-center gap-1.5 self-start rounded-full border border-cream/20 px-4 py-2 text-sm font-semibold text-cream transition-colors hover:border-gold/60 hover:text-gold sm:self-auto"
                >
                  View all {images.length}
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
              </div>

              {/* 3 highlighted photos */}
              <div className="mt-8">
                <GalleryGrid
                  images={images.slice(0, HIGHLIGHT_COUNT)}
                  altPrefix={category.name}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 360px"
                  className="grid grid-cols-1 gap-6 sm:grid-cols-3"
                  priority={sectionIndex === 0}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

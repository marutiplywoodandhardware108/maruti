import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CategoryIcon } from "@/components/CategoryIcon";
import { MasonryGallery } from "@/components/MasonryGallery";
import { categories, getCategory } from "@/lib/categories";
import { listCategoryImages } from "@/lib/images";
import { site } from "@/lib/site";
import {
  BreadcrumbJsonLd,
  CategoryCollectionJsonLd,
} from "@/components/JsonLd";

// Only the known categories are valid routes; anything else 404s.
export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};

  const images = await listCategoryImages(category.slug);
  const ogImage = images[0]?.src ?? "/images/logo.jpeg";
  const url = `${site.url}/products/${category.slug}`;

  return {
    title: category.name,
    description: category.blurb,
    keywords: [
      category.name,
      `${category.name} in ${site.address.city}`,
      `buy ${category.name.toLowerCase()}`,
      ...site.areaServed.map((a) => `${category.name} ${a}`),
      site.name,
    ],
    alternates: { canonical: `/products/${category.slug}` },
    openGraph: {
      type: "website",
      title: `${category.name} | ${site.name}`,
      description: category.blurb,
      url,
      siteName: site.name,
      images: [{ url: ogImage, alt: `${category.name} — ${site.name}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${category.name} | ${site.name}`,
      description: category.blurb,
      images: [ogImage],
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const images = await listCategoryImages(category.slug);

  return (
    <>
      <BreadcrumbJsonLd category={category} />
      <CategoryCollectionJsonLd category={category} images={images} />

      <Navbar />
      <main className="flex-1">
        <section className="relative bg-charcoal bg-grain py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Link
              href="/#products"
              className="group inline-flex items-center gap-1.5 text-sm font-semibold text-cream-muted transition-colors hover:text-gold"
            >
              <ArrowLeft
                className="h-4 w-4 transition-transform group-hover:-translate-x-0.5"
                aria-hidden="true"
              />
              All categories
            </Link>

            <div className="mt-8 flex items-center gap-4">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-gold/30 bg-gold/10 text-gold">
                <CategoryIcon name={category.icon} className="h-7 w-7" />
              </span>
              <div>
                <h1 className="font-serif text-3xl font-bold text-cream sm:text-4xl">
                  {category.name}
                </h1>
                <p className="mt-1 text-sm text-gold/80">
                  {images.length} {images.length === 1 ? "design" : "designs"}
                </p>
              </div>
            </div>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-cream-muted">
              {category.blurb}
            </p>
            <div className="rule-gold mt-8 w-40" />

            {/* Full gallery */}
            {images.length > 0 ? (
              <div className="mt-12">
                <MasonryGallery images={images} altPrefix={category.name} />
              </div>
            ) : (
              <p className="mt-12 rounded-2xl border border-cream/10 bg-charcoal-800/70 px-6 py-12 text-center text-cream-muted">
                Photos for this category are coming soon. Please{" "}
                <Link href="/#contact" className="text-gold hover:underline">
                  contact us
                </Link>{" "}
                for the latest range.
              </p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

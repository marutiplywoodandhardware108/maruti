import { site } from "@/lib/site";
import { categories, type Category } from "@/lib/categories";
import type { GalleryImage } from "@/lib/images";

/** Renders a JSON-LD <script> with the given object. */
function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Structured data is static + trusted, so this is safe.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * LocalBusiness (HardwareStore) markup — helps Google show the shop in
 * local results, maps and the knowledge panel. Rendered site-wide.
 */
export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "HardwareStore",
    "@id": `${site.url}/#store`,
    name: site.name,
    legalName: site.legalName,
    description: site.description,
    url: site.url,
    image: [`${site.url}/images/logo.jpeg`, `${site.url}/images/hero.jpeg`],
    logo: `${site.url}/images/logo.jpeg`,
    telephone: site.phones.map((p) => p.tel),
    email: site.email,
    priceRange: site.priceRange,
    currenciesAccepted: "INR",
    paymentAccepted: "Cash, UPI, Card",
    areaServed: site.areaServed.map((name) => ({
      "@type": "AdministrativeArea",
      name,
    })),
    hasMap: `https://www.google.com/maps/search/?api=1&query=${site.geo.latitude},${site.geo.longitude}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: `${site.address.locality}, ${site.address.city}`,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    openingHoursSpecification: site.openingHours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    sameAs: Object.values(site.socials),
  };
  return <JsonLd data={data} />;
}

/** WebSite markup with potential sitelinks search box. */
export function WebSiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    description: site.description,
    publisher: { "@id": `${site.url}/#store` },
    inLanguage: "en-IN",
  };
  return <JsonLd data={data} />;
}

/**
 * ItemList of the catalogue categories — gives search engines a structured
 * view of what the shop sells and links each to its dedicated page.
 */
export function CatalogueJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${site.name} — Product Range`,
    itemListElement: categories.map((category, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: category.name,
      url: `${site.url}/products/${category.slug}`,
    })),
  };
  return <JsonLd data={data} />;
}

/** Breadcrumb trail for a category page: Home › Products › Category. */
export function BreadcrumbJsonLd({ category }: { category: Category }) {
  const crumbs = [
    { name: "Home", url: site.url },
    { name: "Products", url: `${site.url}/#products` },
    { name: category.name, url: `${site.url}/products/${category.slug}` },
  ];
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: c.url,
    })),
  };
  return <JsonLd data={data} />;
}

/**
 * CollectionPage + image gallery markup for a single category — lets search
 * engines understand the page as a curated set of product photos.
 */
export function CategoryCollectionJsonLd({
  category,
  images,
}: {
  category: Category;
  images: GalleryImage[];
}) {
  const url = `${site.url}/products/${category.slug}`;
  const data = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${url}#webpage`,
    url,
    name: `${category.name} — ${site.name}`,
    description: category.blurb,
    isPartOf: { "@id": `${site.url}/#website` },
    about: { "@type": "Product", name: category.name, category: category.name },
    ...(images[0] ? { primaryImageOfPage: images[0].src } : {}),
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: images.length,
      itemListElement: images.map((img, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "ImageObject",
          contentUrl: img.src,
          ...(img.width ? { width: img.width } : {}),
          ...(img.height ? { height: img.height } : {}),
          caption: `${category.name} — design ${i + 1}`,
          representativeOfPage: i === 0,
        },
      })),
    },
  };
  return <JsonLd data={data} />;
}

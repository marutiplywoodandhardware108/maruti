# Maruti Plywood & Hardware — Website

An elegant, fully SEO‑friendly website for **Maruti Plywood & Hardware**, a plywood
and furniture/door hardware shop (door handles, cabinet knobs, door closers, lock
kits, door knobs, hinges, plywood & laminates).

## Tech stack

- **Next.js 16** (App Router) — server-rendered HTML for great SEO
- **React 19 + TypeScript**
- **Tailwind CSS v4** (CSS-first theme in `src/app/globals.css`)
- **lucide-react** for icons
- Fonts via `next/font`: **Playfair Display** (elegant serif headings) + **Inter** (body)

## Theme

Colours are derived from the brand logo — deep charcoal background, metallic gold,
walnut wood and brushed silver. All tokens live in the `@theme` block in
[`src/app/globals.css`](src/app/globals.css).

## SEO features

- Per-page metadata via the Next.js **Metadata API** (title template, description,
  keywords, canonical, Open Graph, Twitter cards) in [`src/app/layout.tsx`](src/app/layout.tsx)
- **JSON-LD structured data**: `HardwareStore` (LocalBusiness), `WebSite`, and an
  `ItemList` of every product — see [`src/components/JsonLd.tsx`](src/components/JsonLd.tsx)
- Auto-generated **`sitemap.xml`**, **`robots.txt`** and **web manifest**
  (`src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/manifest.ts`)
- Semantic HTML (`header`/`nav`/`main`/`section`/`article`/`footer`), one `<h1>`,
  descriptive `alt` text, accessible focus styles and `prefers-reduced-motion` support

## Getting started

```bash
npm install      # already done
npm run dev      # start dev server at http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
```

## Page structure (homepage)

`src/app/page.tsx` composes:

1. **Navbar** — `src/components/Navbar.tsx`
2. **Hero** — `src/components/Hero.tsx`
3. **Featured Product Categories** — `src/components/FeaturedCategories.tsx`
   (each category renders its products via `ProductCard` + `ProductImage`)
4. **Why Us / About / Contact** — supporting, SEO-rich sections
5. **Footer** — `src/components/Footer.tsx`

## ⚠️ Placeholders to replace before going live

All content below uses placeholder values — update them:

- **Business details** in [`src/lib/site.ts`](src/lib/site.ts): live domain `url`,
  `phone`, `whatsapp`, `email`, full `address`, `geo` (lat/long), opening hours and
  social links. The domain is used for canonical URLs, the sitemap and Open Graph.
- **Products** in [`src/lib/products.ts`](src/lib/products.ts): names, descriptions,
  specs and prices. Each product has an `image` field (currently `null` → shows a
  styled placeholder). Drop real photos into `public/images/products/` and set
  `image: "/images/products/your-photo.jpg"`.
- **Favicon**: still the default Next.js icon at `src/app/favicon.ico` — replace with
  one generated from the logo.

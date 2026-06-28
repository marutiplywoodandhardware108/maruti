import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Truck, Star } from "lucide-react";

// Served from ImageKit (optimized) when configured, else the local fallback.
const endpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT?.replace(
  /\/+$/,
  "",
);
const heroSrc = endpoint ? `${endpoint}/hero.jpeg` : "/images/hero.jpeg";

export function Hero() {
  return (
    <section
      className="relative isolate overflow-hidden bg-charcoal bg-grain"
      aria-labelledby="hero-heading"
    >
      {/* Background photo + dark overlay for text legibility */}
      <Image
        src={heroSrc}
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-charcoal/60 via-charcoal/45 to-charcoal/90"
      />

      {/* decorative roof-line motif from the logo */}
      <svg
        className="pointer-events-none absolute -top-10 left-1/2 hidden h-[420px] w-[820px] -translate-x-1/2 opacity-[0.05] md:block"
        viewBox="0 0 820 420"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M60 320 L410 70 L760 320"
          stroke="currentColor"
          strokeWidth="3"
          className="text-gold"
        />
        <rect
          x="380"
          y="120"
          width="60"
          height="60"
          stroke="currentColor"
          strokeWidth="2"
          className="text-gold"
        />
      </svg>

      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
        <div className="mx-auto max-w-3xl text-center">
          <p className="reveal mb-5 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-gold">
            <Star className="h-3.5 w-3.5 fill-gold" aria-hidden="true" />
            Complete Hardware &amp; Plywood Store
          </p>

          <h1
            id="hero-heading"
            className="reveal text-balance text-4xl font-bold leading-[1.1] text-cream sm:text-5xl lg:text-6xl"
            style={{ animationDelay: "80ms" }}
          >
            Everything in <span className="text-gold-gradient">Hardware</span> &amp;
            Plywood, Under One Roof
          </h1>

          <p
            className="reveal mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-cream-muted sm:text-lg"
            style={{ animationDelay: "160ms" }}
          >
            From fittings and locks to tools, bath fittings and premium plywood —
            quality you can trust for every home and project.
          </p>

          <div
            className="reveal mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
            style={{ animationDelay: "240ms" }}
          >
            <Link
              href="/#products"
              className="group inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-charcoal shadow-lg shadow-gold/20 transition-transform hover:-translate-y-0.5"
            >
              Explore Our Products
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 rounded-full border border-cream/20 px-7 py-3.5 text-sm font-semibold text-cream transition-colors hover:border-gold/60 hover:text-gold"
            >
              Visit the Store
            </Link>
          </div>
        </div>

        {/* trust row */}
        <ul
          className="reveal mx-auto mt-16 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3"
          style={{ animationDelay: "320ms" }}
        >
          {[
            { icon: ShieldCheck, label: "Genuine, branded products" },
            { icon: Star, label: "Premium finishes & quality" },
            { icon: Truck, label: "Fast local delivery" },
          ].map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="flex items-center justify-center gap-3 rounded-xl border border-cream/10 bg-charcoal-800/60 px-4 py-4 text-sm text-cream-muted"
            >
              <Icon className="h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
              {label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

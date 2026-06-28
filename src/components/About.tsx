import Image from "next/image";
import { site } from "@/lib/site";

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="scroll-mt-20 bg-charcoal py-20 sm:py-24"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="relative mx-auto w-full max-w-md">
          <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-gold/20 via-wood/10 to-transparent blur-xl" />
          <Image
            src="/images/logo.jpeg"
            alt={`${site.name} brand logo`}
            width={560}
            height={560}
            className="relative w-full rounded-3xl ring-1 ring-gold/20"
          />
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
            About Us
          </p>
          <h2
            id="about-heading"
            className="mt-3 text-3xl font-bold text-cream sm:text-4xl"
          >
            Your Neighbourhood Plywood &amp; Hardware Experts
          </h2>
          <div className="rule-gold mt-6 w-40" />

          <div className="mt-6 text-base leading-relaxed text-cream-muted">
            <p>
              At <strong className="text-cream">{site.name}</strong>, we stock a
              complete range of hardware — fittings, locks, fasteners, tools and
              bath fittings — alongside dependable plywood and laminates. From
              homeowners to carpenters and builders, walk in and our team will
              help you find exactly what your project needs.
            </p>
          </div>

          <dl className="mt-8 grid grid-cols-3 gap-4">
            {[
              { k: "1000+", v: "Hardware products" },
              { k: "All", v: "Plywood grades" },
              { k: "Expert", v: "In-store guidance" },
            ].map((s) => (
              <div
                key={s.v}
                className="rounded-xl border border-cream/10 bg-charcoal-800/60 p-4 text-center"
              >
                <dt className="font-serif text-2xl font-bold text-gold">
                  {s.k}
                </dt>
                <dd className="mt-1 text-xs text-cream-muted">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

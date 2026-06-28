import { Award, Boxes, Store, Headset } from "lucide-react";

const points = [
  {
    icon: Award,
    title: "Genuine Quality",
    text: "Only branded, tested hardware and graded plywood — built to last.",
  },
  {
    icon: Boxes,
    title: "Complete Range",
    text: "Fittings, locks, tools, bath fittings, plywood and laminates, all in one place.",
  },
  {
    icon: Store,
    title: "One-Stop Store",
    text: "Everything your home or project needs, sourced under a single roof.",
  },
  {
    icon: Headset,
    title: "Expert Guidance",
    text: "Friendly advice to help you choose the right fit, finish and function.",
  },
];

export function WhyUs() {
  return (
    <section
      id="why-us"
      aria-labelledby="why-us-heading"
      className="scroll-mt-20 border-y border-cream/10 bg-charcoal-800/40 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
            Why Choose Us
          </p>
          <h2
            id="why-us-heading"
            className="mt-3 text-3xl font-bold text-cream sm:text-4xl"
          >
            The Maruti Difference
          </h2>
          <div className="rule-gold mx-auto mt-6 w-40" />
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {points.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-2xl border border-cream/10 bg-charcoal-800/70 p-6 transition-colors hover:border-gold/40"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 text-gold">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-serif text-xl font-semibold text-cream">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-cream-muted">
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

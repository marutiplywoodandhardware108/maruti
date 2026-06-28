import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import {
  FacebookIcon,
  InstagramIcon,
  YoutubeIcon,
} from "@/components/icons/SocialIcons";
import { navLinks, site } from "@/lib/site";
import { categories } from "@/lib/categories";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gold/15 bg-charcoal">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/images/logo.jpeg"
                alt={`${site.name} logo`}
                width={48}
                height={48}
                className="h-11 w-11 rounded-md ring-1 ring-gold/30"
              />
              <span className="flex flex-col leading-none">
                <span className="font-serif text-lg font-semibold text-cream">
                  Maruti
                </span>
                <span className="text-[0.62rem] font-medium uppercase tracking-[0.25em] text-gold">
                  Plywood &amp; Hardware
                </span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream-muted">
              {site.tagline}. Quality hardware, plywood and laminates for every
              home and project.
            </p>
            <div className="mt-5 flex gap-3">
              <Social href={site.socials.facebook} label="Facebook">
                <FacebookIcon className="h-4 w-4" />
              </Social>
              <Social href={site.socials.instagram} label="Instagram">
                <InstagramIcon className="h-4 w-4" />
              </Social>
              <Social href={site.socials.youtube} label="YouTube">
                <YoutubeIcon className="h-4 w-4" />
              </Social>
            </div>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer" className="lg:col-span-1">
            <h2 className="font-serif text-base font-semibold text-cream">
              Quick Links
            </h2>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream-muted transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Categories */}
          <nav aria-label="Product categories" className="lg:col-span-1">
            <h2 className="font-serif text-base font-semibold text-cream">
              Our Products
            </h2>
            <ul className="mt-4 space-y-2.5">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/products/${c.slug}`}
                    className="text-sm text-cream-muted transition-colors hover:text-gold"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="lg:col-span-1">
            <h2 className="font-serif text-base font-semibold text-cream">
              Get in Touch
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-cream-muted">
              <li className="flex gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                <span>
                  {site.address.street}, {site.address.locality},{" "}
                  {site.address.region} - {site.address.postalCode}
                </span>
              </li>
              <li className="flex gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                <span className="flex flex-col gap-0.5">
                  {site.phones.map((p) => (
                    <a
                      key={p.tel}
                      href={`tel:${p.tel}`}
                      className="hover:text-gold"
                    >
                      {p.display}
                    </a>
                  ))}
                </span>
              </li>
              <li className="flex gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                <a href={`mailto:${site.email}`} className="hover:text-gold">
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-cream/10 pt-6 text-center text-xs text-cream-muted sm:flex-row sm:text-left">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p>
            Door &amp; furniture fittings · Locks · Door closers · Fasteners &amp;
            tools · Bath fittings · Plywood &amp; laminates
          </p>
        </div>
      </div>
    </footer>
  );
}

function Social({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/15 text-cream-muted transition-colors hover:border-gold hover:text-gold"
    >
      {children}
    </a>
  );
}

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";
import { navLinks, site } from "@/lib/site";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-charcoal/90 backdrop-blur-md border-b border-gold/20 shadow-lg shadow-black/30"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8"
      >
        {/* Brand */}
        <Link
          href="/"
          className="group flex items-center gap-3"
          aria-label={`${site.name} — home`}
        >
          <Image
            src="/images/logo.jpeg"
            alt={`${site.name} logo`}
            width={48}
            height={48}
            priority
            className="h-11 w-11 rounded-md ring-1 ring-gold/30 object-cover"
          />
          <span className="flex flex-col leading-none">
            <span className="font-serif text-lg font-semibold tracking-wide text-cream">
              Maruti
            </span>
            <span className="text-[0.62rem] font-medium uppercase tracking-[0.25em] text-gold">
              Plywood &amp; Hardware
            </span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="relative text-sm font-medium text-cream-muted transition-colors hover:text-gold after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-gold after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-2">
          <a
            href={`tel:${site.phoneHref}`}
            className="hidden items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-2 text-sm font-medium text-gold transition-colors hover:bg-gold hover:text-charcoal sm:inline-flex"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            <span>Call Now</span>
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center justify-center rounded-md p-2 text-cream hover:text-gold lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          id="mobile-menu"
          className="lg:hidden border-t border-gold/15 bg-charcoal/95 backdrop-blur-md"
        >
          <ul className="space-y-1 px-4 py-4 sm:px-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-3 text-base font-medium text-cream-muted hover:bg-charcoal-700 hover:text-gold"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <a
                href={`tel:${site.phoneHref}`}
                className="flex items-center justify-center gap-2 rounded-full bg-gold px-4 py-3 text-base font-semibold text-charcoal"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                Call {site.phone}
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

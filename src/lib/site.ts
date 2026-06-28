/**
 * Central site configuration.
 * Replace the placeholder contact details with the shop's real information.
 */
export const site = {
  name: "Maruti Plywood & Hardware",
  shortName: "Maruti Plywood",
  legalName: "Maruti Plywood & Hardware",
  tagline: "Complete Hardware & Plywood Store",
  description:
    "Maruti Plywood & Hardware is your one-stop store for a complete range of hardware — door & furniture fittings, locks, fasteners, tools and bath fittings — alongside premium plywood, laminates and veneers.",
  // ⚠️ PLACEHOLDER DOMAIN — set this to the real domain before going live.
  // Drives canonical URLs, sitemap, robots, and Open Graph / social tags.
  url: "https://www.marutiplywoodhardware.com",
  locale: "en_IN",
  // Rough price band for LocalBusiness structured data.
  priceRange: "₹₹",
  // Towns/areas the shop serves — used for local SEO.
  areaServed: ["Mandar", "Reodar", "Sirohi", "Raniwada", "Rajasthan"],
  // All published phone numbers. The first is treated as primary (used for
  // the WhatsApp chat + the "Call Now" buttons).
  phones: [
    { display: "+91 96104 15949", tel: "+919610415949" },
    { display: "+91 99839 22108", tel: "+919983922108" },
  ],
  // Convenience aliases for the primary number.
  phone: "+91 96104 15949",
  phoneHref: "+919610415949",
  whatsapp: "919610415949",
  email: "marutiplywoodandhardware108@gmail.com",
  address: {
    street: "Teen Batti, Raniwada Road",
    locality: "Mandar, Teh. Reodar",
    city: "Mandar",
    region: "Rajasthan",
    postalCode: "307513",
    country: "IN",
  },
  geo: {
    latitude: 24.558513,
    longitude: 72.383028,
  },
  // Open all 7 days, 09:30–20:00.
  openingHours: [
    {
      days: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "09:30",
      closes: "20:00",
    },
  ],
  openingHoursText: "Open daily · 9:30 AM – 8:00 PM",
  socials: {
    facebook: "https://facebook.com/",
    instagram: "https://instagram.com/",
    youtube: "https://youtube.com/",
  },
} as const;

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/#products" },
  { label: "Why Us", href: "/#why-us" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
] as const;

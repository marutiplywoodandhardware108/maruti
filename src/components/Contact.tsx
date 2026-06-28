import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { WhatsappIcon } from "@/components/icons/SocialIcons";
import { site } from "@/lib/site";

const waLink = `https://wa.me/${site.whatsapp.replace(/[^0-9]/g, "")}`;
const geoQuery = `${site.geo.latitude},${site.geo.longitude}`;
const directionsLink = `https://www.google.com/maps/dir/?api=1&destination=${geoQuery}`;
const mapEmbed = `https://www.google.com/maps?q=${geoQuery}&z=16&output=embed`;

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="scroll-mt-20 border-t border-cream/10 bg-charcoal-800/40 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
            Visit / Contact
          </p>
          <h2
            id="contact-heading"
            className="mt-3 text-3xl font-bold text-cream sm:text-4xl"
          >
            Come See Us, or Get in Touch
          </h2>
          <div className="rule-gold mx-auto mt-6 w-40" />
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {/* Details */}
          <div className="space-y-5">
            <ContactRow icon={MapPin} label="Address">
              <address className="not-italic">
                {site.address.street}, {site.address.locality}
                <br />
                {site.address.region} - {site.address.postalCode}
              </address>
              <a
                href={directionsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-block text-sm font-semibold text-gold hover:text-gold-light"
              >
                Get directions →
              </a>
            </ContactRow>

            <ContactRow icon={Phone} label="Phone">
              <div className="flex flex-col gap-0.5">
                {site.phones.map((p) => (
                  <a
                    key={p.tel}
                    href={`tel:${p.tel}`}
                    className="hover:text-gold"
                  >
                    {p.display}
                  </a>
                ))}
              </div>
            </ContactRow>

            <ContactRow icon={Mail} label="Email">
              <a href={`mailto:${site.email}`} className="hover:text-gold">
                {site.email}
              </a>
            </ContactRow>

            <ContactRow icon={Clock} label="Opening Hours">
              Open all 7 days
              <br />
              9:30 AM – 8:00 PM
            </ContactRow>

            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-charcoal shadow-lg shadow-gold/20 transition-transform hover:-translate-y-0.5"
            >
              <WhatsappIcon className="h-4 w-4" />
              Chat on WhatsApp
            </a>
          </div>

          {/* Map */}
          <div className="overflow-hidden rounded-2xl border border-cream/10 ring-1 ring-gold/10">
            <iframe
              title={`Map to ${site.name}`}
              src={mapEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full min-h-80 w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4 rounded-2xl border border-cream/10 bg-charcoal-800/70 p-5">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold">
        <Icon className="h-5 w-5" aria-hidden={true} />
      </span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-gold/80">
          {label}
        </p>
        <div className="mt-1 text-sm leading-relaxed text-cream-muted">
          {children}
        </div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { Camera, MapPin, Phone, Send } from "lucide-react";
import { navLinks } from "@/lib/content";
import { useLocations, useSite } from "@/components/content/ContentProvider";
import { useThemeFlags } from "@/hooks/useThemeId";

export function Footer() {
  const { isDesign2 } = useThemeFlags();
  const site = useSite();
  const locations = useLocations();

  return (
    <footer
      className={`site-footer border-t border-[var(--line)] ${
        isDesign2 ? "" : "bg-card"
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-20">
        <div className="grid gap-10 sm:gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <p className="font-serif text-2xl font-medium sm:text-3xl md:text-4xl">
              {site.name}
            </p>
            <p className="mt-3 max-w-sm text-muted">{site.tagline}</p>
          </div>

          <div>
            <p className="mb-4 text-xs font-medium tracking-widest text-accent uppercase">
              Навигация
            </p>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs font-medium tracking-widest text-accent uppercase">
              Контакты
            </p>
            <ul className="space-y-4 text-sm text-muted">
              {locations.map((location) => (
                <li key={location.id} className="flex items-start gap-2">
                  <MapPin size={16} className="mt-0.5 shrink-0 text-accent" />
                  <div>
                    <p className="font-medium text-foreground">{location.label}</p>
                    <p>{location.fullAddress}</p>
                    {location.mapUrl && (
                      <a
                        href={location.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 inline-block text-accent hover:text-foreground"
                      >
                        На карте
                      </a>
                    )}
                  </div>
                </li>
              ))}
              <li className="flex items-center gap-2">
                <Phone size={16} className="shrink-0 text-accent" />
                <a href={site.phoneHref} className="hover:text-foreground">
                  {site.phone}
                </a>
              </li>
              <li className="text-sm">{site.payment}</li>
            </ul>
            <div className="mt-6 flex flex-col gap-2 text-sm">
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted transition-colors hover:text-foreground"
              >
                {site.social.instagramHandle}
              </a>
              <a
                href={site.social.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted transition-colors hover:text-foreground"
              >
                {site.social.telegramHandle}
              </a>
            </div>
            <div className="mt-6 flex gap-3">
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-control)] border border-[var(--line)] transition-colors hover:border-accent hover:text-accent"
                aria-label="Instagram"
              >
                <Camera size={18} />
              </a>
              <a
                href={site.social.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-control)] border border-[var(--line)] transition-colors hover:border-accent hover:text-accent"
                aria-label="Telegram"
              >
                <Send size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-[var(--line)] pt-6 text-xs text-muted sm:mt-16 sm:pt-8 md:flex-row md:items-center md:justify-between">
          <p suppressHydrationWarning>
            © {new Date().getFullYear()} {site.name}. Все права защищены.
          </p>
          <p>УНП {site.unp}</p>
          <p>{site.hours}</p>
        </div>
      </div>
    </footer>
  );
}

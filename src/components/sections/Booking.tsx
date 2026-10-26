"use client";

import { Camera, Phone, Send } from "lucide-react";
import { bookingInfo, site } from "@/lib/content";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { RevealText } from "@/components/ui/RevealText";
import { Button } from "@/components/ui/Button";
import { useIsDesign2 } from "@/hooks/useThemeId";

const contactChannels = [
  {
    id: "instagram",
    label: "Instagram",
    handle: site.social.instagramHandle,
    href: site.social.instagram,
    description: "Напишите в Direct — отвечу и подберём время",
    icon: Camera,
  },
  {
    id: "telegram",
    label: "Telegram",
    handle: site.social.telegramHandle,
    href: site.social.telegram,
    description: "Удобно для быстрой переписки и записи",
    icon: Send,
  },
] as const;

export function Booking() {
  const isDesign2 = useIsDesign2();

  return (
    <section
      id="booking"
      className={`py-24 md:py-32 ${isDesign2 ? "bg-transparent" : "bg-card"}`}
      aria-labelledby="booking-heading"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-start">
          <RevealText>
            <div className={isDesign2 ? "glass-panel p-6 sm:p-8" : ""}>
              <SectionLabel>Запись</SectionLabel>
              <h2
                id="booking-heading"
                className="font-serif text-4xl font-medium md:text-5xl"
              >
                Напишите мне
              </h2>
              <p className="mt-6 max-w-md text-muted">
                Запись через Instagram или Telegram. Выберите удобный способ —
                обсудим услугу, кабинет и время сеанса.
              </p>

              <div
                className={`mt-8 space-y-4 p-6 text-sm text-muted ${
                  isDesign2
                    ? "rounded-[var(--radius-card)] border border-white/15 bg-white/5"
                    : "rounded-[var(--radius-card)] border border-[var(--line)] bg-background"
                }`}
              >
                <p>
                  <span className="font-medium text-foreground">Оплата: </span>
                  {site.payment}.
                </p>
                <p>{bookingInfo.reminder}</p>
                <p className="text-foreground/80">{bookingInfo.confirmation}</p>
              </div>

              <a
                href={site.phoneHref}
                className="mt-8 inline-flex items-center gap-2 text-accent transition-colors hover:text-foreground"
              >
                <Phone size={18} />
                {site.phone}
              </a>
            </div>
          </RevealText>

          <RevealText delay={0.15}>
            <div className="space-y-4">
              {contactChannels.map((channel) => {
                const Icon = channel.icon;

                return (
                  <a
                    key={channel.id}
                    href={channel.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex items-start gap-5 p-6 transition-all duration-300 hover:-translate-y-0.5 ${
                      isDesign2
                        ? "glass-panel hover:border-white/30"
                        : "rounded-[var(--radius-card)] border border-[var(--line)] bg-background hover:border-accent/40"
                    }`}
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--radius-control)] bg-accent-light text-accent transition-colors group-hover:bg-accent group-hover:text-background">
                      <Icon size={22} />
                    </div>
                    <div>
                      <p className="font-medium">{channel.label}</p>
                      <p className="mt-1 text-accent">{channel.handle}</p>
                      <p className="mt-2 text-sm text-muted">
                        {channel.description}
                      </p>
                    </div>
                  </a>
                );
              })}

              <div className="flex flex-wrap gap-4 pt-2">
                <Button
                  onClick={() => window.open(site.social.instagram, "_blank")}
                >
                  Написать в Instagram
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.open(site.social.telegram, "_blank")}
                >
                  Написать в Telegram
                </Button>
              </div>
            </div>
          </RevealText>
        </div>
      </div>
    </section>
  );
}

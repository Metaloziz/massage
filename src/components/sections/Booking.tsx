"use client";

import { Camera, Phone, Send } from "lucide-react";
import { bookingInfo, site } from "@/lib/content";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { RevealText } from "@/components/ui/RevealText";
import { Button } from "@/components/ui/Button";
import { useThemeFlags } from "@/hooks/useThemeId";

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
  const { isDesign2 } = useThemeFlags();
  const introPanel = isDesign2 ? "soft-panel p-6 sm:p-8" : "";
  const channelCard = isDesign2
    ? "soft-panel"
    : "rounded-[var(--radius-card)] border border-[var(--line)] bg-background hover:border-accent/40";
  const noteBox = isDesign2
    ? "rounded-[var(--radius-card)] border border-[var(--line)] bg-[rgba(42,50,40,0.04)]"
    : "rounded-[var(--radius-card)] border border-[var(--line)] bg-background";

  return (
    <section
      id="booking"
      className={`py-16 md:py-28 ${
        isDesign2 ? "bg-transparent" : "bg-card"
      }`}
      aria-labelledby="booking-heading"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
          <RevealText>
            <div className={introPanel}>
              <SectionLabel>Запись</SectionLabel>
              <h2
                id="booking-heading"
                className="font-serif text-3xl font-medium sm:text-4xl md:text-5xl"
              >
                Напишите мне
              </h2>
              <p className="mt-5 max-w-md text-muted sm:mt-6">
                Запись через Instagram или Telegram. Выберите удобный способ —
                обсудим услугу, кабинет и время сеанса.
              </p>

              <div className={`mt-6 space-y-3 p-5 text-sm text-muted sm:mt-8 sm:space-y-4 sm:p-6 ${noteBox}`}>
                <p>
                  <span className="font-medium text-foreground">Оплата: </span>
                  {site.payment}.
                </p>
                <p>{bookingInfo.reminder}</p>
                <p className="text-foreground/80">{bookingInfo.confirmation}</p>
              </div>

              <a
                href={site.phoneHref}
                className="mt-6 inline-flex items-center gap-2 text-accent transition-colors hover:text-foreground sm:mt-8"
              >
                <Phone size={18} />
                {site.phone}
              </a>
            </div>
          </RevealText>

          <RevealText delay={0.15}>
            <div className="space-y-3 sm:space-y-4">
              {contactChannels.map((channel) => {
                const Icon = channel.icon;

                return (
                  <a
                    key={channel.id}
                    href={channel.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex items-start gap-4 p-5 transition-all duration-300 hover:-translate-y-0.5 sm:gap-5 sm:p-6 ${channelCard}`}
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--radius-control)] bg-accent-light text-accent transition-colors group-hover:bg-accent group-hover:text-background sm:h-12 sm:w-12">
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

              <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap sm:gap-4">
                <Button
                  className="w-full sm:w-auto"
                  onClick={() => window.open(site.social.instagram, "_blank")}
                >
                  Написать в Instagram
                </Button>
                <Button
                  variant="outline"
                  className="w-full sm:w-auto"
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

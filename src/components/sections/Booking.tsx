"use client";

import { Camera, Phone, Send } from "lucide-react";
import { bookingInfo, site } from "@/lib/content";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { RevealText } from "@/components/ui/RevealText";
import { Button } from "@/components/ui/Button";

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
  return (
    <section
      id="booking"
      className="bg-card py-24 md:py-32"
      aria-labelledby="booking-heading"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-start">
          <RevealText>
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

            <div className="mt-8 space-y-4 rounded-2xl border border-border bg-background p-6 text-sm text-muted">
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
                    className="group flex items-start gap-5 rounded-2xl border border-border bg-background p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent-light text-accent transition-colors group-hover:bg-accent group-hover:text-background">
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

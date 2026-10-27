"use client";

import { locations, services } from "@/lib/content";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { RevealText } from "@/components/ui/RevealText";
import { Button } from "@/components/ui/Button";
import { useBooking } from "@/components/booking/BookingProvider";
import { useThemeFlags } from "@/hooks/useThemeId";

const locationById = Object.fromEntries(
  locations.map((location) => [location.id, location]),
);

export function HomeServiceCards() {
  const { isDesign2 } = useThemeFlags();
  const { openSessionBooking } = useBooking();
  const card = isDesign2
    ? "soft-panel"
    : "rounded-[var(--radius-card)] border border-[var(--line)] bg-background";

  return (
    <section
      id="where-to-book"
      className={`py-16 md:py-28 ${
        isDesign2 ? "" : "bg-card"
      }`}
      aria-labelledby="where-to-book-heading"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <RevealText className="mb-8 max-w-xl md:mb-12">
          <SectionLabel>Куда записаться</SectionLabel>
          <h2
            id="where-to-book-heading"
            className="font-serif text-3xl font-medium sm:text-4xl md:text-5xl"
          >
            Выберите формат сеанса
          </h2>
        </RevealText>

        <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
          {services.map((service, index) => (
            <RevealText key={service.id} delay={index * 0.08}>
              <article className={`flex h-full flex-col p-6 sm:p-8 ${card}`}>
                <h3 className="font-serif text-xl font-medium sm:text-2xl md:text-3xl">
                  {service.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted sm:mt-4 md:text-base">
                  {service.shortDescription}
                </p>

                <div className="mt-5 space-y-3 border-t border-[var(--line)] pt-5 sm:mt-6 sm:pt-6">
                  {service.pricing.map((tier) => (
                    <div key={tier.locationId}>
                      <p className="text-xs font-medium text-muted">
                        {locationById[tier.locationId].fullAddress}
                      </p>
                      <p className="mt-1 text-sm font-medium text-accent">
                        {tier.items.join(" · ")}
                      </p>
                    </div>
                  ))}
                </div>

                <Button
                  className="mt-6 w-full sm:mt-8"
                  onClick={() => openSessionBooking(service.id)}
                >
                  {service.ctaLabel}
                </Button>
              </article>
            </RevealText>
          ))}
        </div>
      </div>
    </section>
  );
}

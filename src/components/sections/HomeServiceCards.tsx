"use client";

import { locations, services, site } from "@/lib/content";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { RevealText } from "@/components/ui/RevealText";
import { Button } from "@/components/ui/Button";
import { useIsDesign2 } from "@/hooks/useThemeId";

const locationById = Object.fromEntries(
  locations.map((location) => [location.id, location]),
);

export function HomeServiceCards() {
  const isDesign2 = useIsDesign2();

  return (
    <section
      id="where-to-book"
      className={`py-20 md:py-28 ${isDesign2 ? "bg-transparent" : "bg-card"}`}
      aria-labelledby="where-to-book-heading"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <RevealText className="mb-12 max-w-xl">
          <SectionLabel>Куда записаться</SectionLabel>
          <h2
            id="where-to-book-heading"
            className="font-serif text-4xl font-medium md:text-5xl"
          >
            Выберите формат сеанса
          </h2>
        </RevealText>

        <div className="grid gap-6 md:grid-cols-2">
          {services.map((service, index) => (
            <RevealText key={service.id} delay={index * 0.08}>
              <article
                className={`flex h-full flex-col p-8 ${
                  isDesign2
                    ? "glass-panel"
                    : "rounded-[var(--radius-card)] border border-[var(--line)] bg-background"
                }`}
              >
                <h3 className="font-serif text-2xl font-medium md:text-3xl">
                  {service.title}
                </h3>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted md:text-base">
                  {service.shortDescription}
                </p>

                <div
                  className={`mt-6 space-y-3 border-t pt-6 ${
                    isDesign2 ? "border-white/15" : "border-[var(--line)]"
                  }`}
                >
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

                <Button href={site.phoneHref} className="mt-8 w-full">
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

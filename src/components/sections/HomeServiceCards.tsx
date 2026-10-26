"use client";

import { locations, services, site } from "@/lib/content";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { RevealText } from "@/components/ui/RevealText";
import { Button } from "@/components/ui/Button";

const locationById = Object.fromEntries(
  locations.map((location) => [location.id, location]),
);

export function HomeServiceCards() {
  return (
    <section
      id="where-to-book"
      className="bg-card py-20 md:py-28"
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
              <article className="flex h-full flex-col rounded-3xl border border-border bg-background p-8">
                <h3 className="font-serif text-2xl font-medium md:text-3xl">
                  {service.title}
                </h3>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted md:text-base">
                  {service.shortDescription}
                </p>

                <div className="mt-6 space-y-3 border-t border-border pt-6">
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

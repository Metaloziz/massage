"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { locations, services } from "@/lib/content";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { RevealText } from "@/components/ui/RevealText";
import { useReducedMotion, useMounted } from "@/hooks/useReducedMotion";
import { useThemeFlags } from "@/hooks/useThemeId";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const locationById = Object.fromEntries(
  locations.map((location) => [location.id, location]),
);

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const mounted = useMounted();
  const { isDesign2 } = useThemeFlags();
  const card = isDesign2
    ? "soft-panel"
    : "rounded-[var(--radius-card)] border border-[var(--line)] bg-background hover:border-accent/40";
  const divider = "border-[var(--line)]";

  useGSAP(
    () => {
      if (!mounted || reducedMotion || !sectionRef.current) return;

      ScrollTrigger.batch(".service-card", {
        onEnter: (batch) =>
          gsap.fromTo(
            batch,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.12,
              ease: "power3.out",
            },
          ),
        start: "top 85%",
        once: true,
      });
    },
    { scope: sectionRef, dependencies: [mounted, reducedMotion] },
  );

  return (
    <section
      id="services"
      ref={sectionRef}
      className={`py-16 md:py-28 ${
        isDesign2 ? "bg-transparent" : "bg-card"
      }`}
      aria-labelledby="services-heading"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <RevealText className="mb-10 max-w-xl md:mb-16">
          <SectionLabel>Услуги</SectionLabel>
          <h2
            id="services-heading"
            className="font-serif text-3xl font-medium sm:text-4xl md:text-5xl"
          >
            Подберём технику под ваше состояние
          </h2>
          <p className="mt-4 text-muted">
            Стоимость зависит от кабинета — уточняйте при записи.
          </p>
        </RevealText>

        <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
          {services.map((service) => (
            <article
              key={service.id}
              className={`service-card group p-6 transition-all duration-300 hover:-translate-y-1 sm:p-8 ${card}`}
            >
              <h3 className="font-serif text-xl font-medium sm:text-2xl">
                {service.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted sm:mt-4">
                {service.shortDescription}
              </p>

              <div className={`mt-5 space-y-4 border-t pt-5 sm:mt-6 sm:pt-6 ${divider}`}>
                {service.pricing.map((tier) => (
                  <div key={tier.locationId}>
                    <p className="text-sm font-medium text-foreground">
                      {locationById[tier.locationId].fullAddress}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {tier.items.map((price) => (
                        <span
                          key={price}
                          className="rounded-[var(--radius-control)] bg-accent-light px-3 py-1 text-sm font-medium text-accent"
                        >
                          {price}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

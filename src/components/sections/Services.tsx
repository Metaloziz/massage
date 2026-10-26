"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { locations, services } from "@/lib/content";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { RevealText } from "@/components/ui/RevealText";
import { useReducedMotion, useMounted } from "@/hooks/useReducedMotion";
import { useIsDesign2 } from "@/hooks/useThemeId";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const locationById = Object.fromEntries(
  locations.map((location) => [location.id, location]),
);

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const mounted = useMounted();
  const isDesign2 = useIsDesign2();

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
      className={`py-24 md:py-32 ${isDesign2 ? "bg-transparent" : "bg-card"}`}
      aria-labelledby="services-heading"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <RevealText className="mb-16 max-w-xl">
          <SectionLabel>Услуги</SectionLabel>
          <h2
            id="services-heading"
            className="font-serif text-4xl font-medium md:text-5xl"
          >
            Подберём технику под ваше состояние
          </h2>
          <p className="mt-4 text-muted">
            Стоимость зависит от кабинета — уточняйте при записи.
          </p>
        </RevealText>

        <div className="grid gap-6 md:grid-cols-2">
          {services.map((service) => (
            <article
              key={service.id}
              className={`service-card group p-8 transition-all duration-300 hover:-translate-y-1 ${
                isDesign2
                  ? "glass-panel hover:border-white/30"
                  : "rounded-[var(--radius-card)] border border-[var(--line)] bg-background hover:border-accent/40"
              }`}
            >
              <h3 className="font-serif text-2xl font-medium">{service.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                {service.shortDescription}
              </p>

              <div
                className={`mt-6 space-y-4 border-t pt-6 ${
                  isDesign2 ? "border-white/15" : "border-[var(--line)]"
                }`}
              >
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

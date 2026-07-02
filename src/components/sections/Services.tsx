"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { services } from "@/lib/content";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { RevealText } from "@/components/ui/RevealText";
import { useReducedMotion, useMounted } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const mounted = useMounted();

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
      className="bg-card py-24 md:py-32"
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
              className="service-card group rounded-2xl border border-border bg-background p-8 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5"
            >
              <h3 className="font-serif text-2xl font-medium">{service.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                {service.description}
              </p>

              <div className="mt-6 space-y-4 border-t border-border pt-6">
                {service.pricing.map((tier) => (
                  <div key={tier.location}>
                    <p className="text-sm font-medium text-foreground">
                      {tier.location}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {tier.items.map((price) => (
                        <span
                          key={price}
                          className="rounded-full bg-accent-light px-3 py-1 text-sm font-medium text-accent"
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

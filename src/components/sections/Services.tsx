"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Clock } from "lucide-react";
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
          gsap.from(batch, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
          }),
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
        </RevealText>

        <div className="grid gap-6 md:grid-cols-2">
          {services.map((service) => (
            <article
              key={service.id}
              className="service-card group rounded-2xl border border-border bg-background p-8 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5"
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <h3 className="font-serif text-2xl font-medium">{service.title}</h3>
                <span className="shrink-0 rounded-full bg-accent-light px-3 py-1 text-sm font-medium text-accent">
                  {service.price}
                </span>
              </div>
              <p className="mb-6 text-sm leading-relaxed text-muted">
                {service.description}
              </p>
              <div className="flex items-center gap-2 text-sm text-muted">
                <Clock size={16} className="text-accent" />
                {service.duration}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

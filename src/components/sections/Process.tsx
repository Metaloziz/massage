"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { processSteps } from "@/lib/content";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { RevealText } from "@/components/ui/RevealText";
import { useReducedMotion, useMounted } from "@/hooks/useReducedMotion";
import { useIsDesign2 } from "@/hooks/useThemeId";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const mounted = useMounted();
  const isDesign2 = useIsDesign2();
  const stepClass = isDesign2
    ? "rounded-[var(--radius-control)] border border-white/20 bg-[var(--glass)] backdrop-blur-md font-serif text-xl text-accent"
    : "rounded-[var(--radius-control)] border border-[var(--line)] bg-background font-serif text-xl text-accent shadow-[0_0_0_1px_var(--line)]";

  useGSAP(
    () => {
      if (!mounted || reducedMotion || !lineRef.current || !sectionRef.current) return;

      gsap.from(lineRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.2,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

      ScrollTrigger.batch(".process-step", {
        onEnter: (batch) =>
          gsap.from(batch, {
            y: 30,
            opacity: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: "power3.out",
          }),
        start: "top 80%",
        once: true,
      });
    },
    { scope: sectionRef, dependencies: [mounted, reducedMotion] },
  );

  return (
    <section
      id="process"
      ref={sectionRef}
      className="py-24 md:py-32"
      aria-labelledby="process-heading"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <RevealText className="mb-16 max-w-xl">
          <SectionLabel>Процесс</SectionLabel>
          <h2
            id="process-heading"
            className="font-serif text-4xl font-medium md:text-5xl"
          >
            Как проходит сеанс
          </h2>
        </RevealText>

        <div className="relative hidden md:block">
          <div className="absolute top-8 right-0 left-0 h-px bg-[var(--line)]" />
          <div
            ref={lineRef}
            className="absolute top-8 left-0 h-px w-full origin-left bg-accent"
          />
          <div className="grid grid-cols-3 gap-8">
            {processSteps.map((step) => (
              <article key={step.step} className="process-step relative pt-16">
                <span
                  className={`absolute top-0 left-0 flex h-16 w-16 items-center justify-center ${stepClass}`}
                >
                  {step.step}
                </span>
                <h3 className="mb-3 font-serif text-2xl font-medium">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="relative space-y-0 md:hidden">
          {processSteps.map((step, index) => (
            <article key={step.step} className="process-step relative flex gap-6 pb-12">
              {index < processSteps.length - 1 && (
                <div className="absolute top-16 bottom-0 left-8 w-px bg-[var(--line)]" />
              )}
              <span
                className={`relative z-10 flex h-16 w-16 shrink-0 items-center justify-center ${stepClass}`}
              >
                  {step.step}
                </span>
              <div className="pt-3">
                <h3 className="mb-2 font-serif text-xl font-medium">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted">
                  {step.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { philosophy, site } from "@/lib/content";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { RevealText } from "@/components/ui/RevealText";
import { useReducedMotion, useMounted } from "@/hooks/useReducedMotion";
import { useIsDesign2 } from "@/hooks/useThemeId";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const mounted = useMounted();
  const isDesign2 = useIsDesign2();

  useGSAP(
    () => {
      if (!mounted || reducedMotion || !decorRef.current || !sectionRef.current) return;

      gsap.to(decorRef.current, {
        y: -60,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    },
    { scope: sectionRef, dependencies: [mounted, reducedMotion] },
  );

  return (
    <section
      id="philosophy"
      ref={sectionRef}
      className="relative overflow-hidden py-24 md:py-32"
      aria-labelledby="philosophy-heading"
    >
      <div
        ref={decorRef}
        className="pointer-events-none absolute top-20 right-0 h-64 w-64 rounded-full bg-accent-light/60 blur-3xl md:h-96 md:w-96"
        aria-hidden
      />

      <div
        className={`relative mx-auto max-w-7xl px-5 md:px-8 ${
          isDesign2 ? "glass-panel p-6 sm:p-8 md:p-10" : ""
        }`}
      >
        <RevealText>
          <SectionLabel>Философия</SectionLabel>
        </RevealText>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <RevealText delay={0.1}>
            <blockquote>
              <p
                id="philosophy-heading"
                className="font-serif text-3xl leading-snug font-medium md:text-4xl lg:text-5xl"
              >
                &ldquo;{philosophy.quote}&rdquo;
              </p>
            </blockquote>
          </RevealText>

          <RevealText delay={0.2}>
            <div className="flex flex-col justify-center">
              <p className="text-base leading-relaxed text-muted md:text-lg">
                {philosophy.text}
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div
                  className={`h-px flex-1 ${
                    isDesign2 ? "bg-white/20" : "bg-border"
                  }`}
                />
                <span className="text-sm text-accent">{site.name}</span>
              </div>
            </div>
          </RevealText>
        </div>
      </div>
    </section>
  );
}

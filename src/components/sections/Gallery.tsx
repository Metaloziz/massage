"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { galleryImages } from "@/lib/content";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { RevealText } from "@/components/ui/RevealText";
import { useIsMobile, useMounted, useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const spanClasses = {
  normal: "row-span-1",
  tall: "row-span-2",
  wide: "md:col-span-2",
} as const;

export function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const mounted = useMounted();

  useGSAP(
    () => {
      if (!mounted || reducedMotion || isMobile || !sectionRef.current) return;

      const items = sectionRef.current.querySelectorAll(".gallery-item");
      items.forEach((item, index) => {
        const speed = index % 2 === 0 ? -30 : -50;
        gsap.to(item, {
          y: speed,
          ease: "none",
          scrollTrigger: {
            trigger: item,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    },
    { scope: sectionRef, dependencies: [mounted, reducedMotion, isMobile] },
  );

  useGSAP(
    () => {
      if (!mounted || reducedMotion || !sectionRef.current) return;

      ScrollTrigger.batch(".gallery-item", {
        onEnter: (batch) =>
          gsap.from(batch, {
            scale: 0.95,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
          }),
        start: "top 90%",
        once: true,
      });

      ScrollTrigger.refresh();
    },
    { scope: sectionRef, dependencies: [mounted, reducedMotion] },
  );

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="bg-card py-24 md:py-32"
      aria-labelledby="gallery-heading"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <RevealText className="mb-16 max-w-xl">
          <SectionLabel>Атмосфера</SectionLabel>
          <h2
            id="gallery-heading"
            className="font-serif text-4xl font-medium md:text-5xl"
          >
            Пространство для отдыха
          </h2>
        </RevealText>

        <div className="grid auto-rows-[200px] grid-cols-1 gap-4 sm:auto-rows-[180px] sm:grid-cols-2 md:auto-rows-[220px] lg:grid-cols-3">
          {galleryImages.map((image) => (
            <div
              key={image.id}
              className={`gallery-item relative overflow-hidden rounded-2xl ${spanClasses[image.span]}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                loading="lazy"
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                onLoad={() => ScrollTrigger.refresh()}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

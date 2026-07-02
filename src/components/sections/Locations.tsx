"use client";

import { useRef } from "react";
import Image from "next/image";
import { ExternalLink, MapPin } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { locations } from "@/lib/content";
import { assetPath } from "@/lib/assetPath";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { RevealText } from "@/components/ui/RevealText";
import { useMounted, useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const minskLocation = locations.find((location) => location.id === "minsk");
const minskImages =
  minskLocation && "images" in minskLocation ? minskLocation.images : null;

export function Locations() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const mounted = useMounted();

  useGSAP(
    () => {
      if (!mounted || reducedMotion || !sectionRef.current) return;

      gsap.from(".location-card", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });
    },
    { scope: sectionRef, dependencies: [mounted, reducedMotion] },
  );

  return (
    <section
      id="locations"
      ref={sectionRef}
      className="py-24 md:py-32"
      aria-labelledby="locations-heading"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <RevealText className="mb-16 max-w-2xl">
          <SectionLabel>Кабинеты</SectionLabel>
          <h2
            id="locations-heading"
            className="font-serif text-4xl font-medium md:text-5xl"
          >
            Два пространства для вашего комфорта
          </h2>
          <p className="mt-6 text-lg text-muted">
            Два кабинета — выбирайте тот, который удобнее по расположению.
          </p>
        </RevealText>

        <div className="grid gap-6 md:grid-cols-2">
          {locations.map((location) => {
            const images = "images" in location ? location.images : null;

            return (
              <article
                key={location.id}
                className={`location-card relative flex flex-col overflow-hidden rounded-3xl border transition-shadow ${
                  location.available
                    ? "border-accent/30 bg-card shadow-sm"
                    : "border-border bg-card/60"
                }`}
              >
                {images?.cabinet[0] && (
                  <div className="relative aspect-[16/10] w-full">
                    <Image
                      src={assetPath(images.cabinet[0].src)}
                      alt={images.cabinet[0].alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                )}

                <div className="flex flex-col p-8 md:p-10">
                  {!location.available && (
                    <span className="absolute top-6 right-6 rounded-full bg-accent-light px-3 py-1 text-xs font-medium tracking-wide text-accent uppercase">
                      Скоро
                    </span>
                  )}

                  <p className="text-xs font-medium tracking-[0.2em] text-accent uppercase">
                    {location.label}
                  </p>

                  <h3 className="mt-3 font-serif text-2xl font-medium md:text-3xl">
                    {location.name}
                  </h3>

                  <div className="mt-6 flex items-start gap-3 text-muted">
                    <MapPin size={18} className="mt-1 shrink-0 text-accent" />
                    <div>
                      <p className="font-medium text-foreground">{location.city}</p>
                      <p>{location.district}</p>
                      <p className="mt-1">{location.address}</p>
                    </div>
                  </div>

                  <p className="mt-6 text-sm text-muted">{location.hours}</p>

                  {"directions" in location && location.directions && (
                    <p className="mt-4 text-sm leading-relaxed text-muted">
                      {location.directions}
                    </p>
                  )}

                  {location.mapUrl ? (
                    <a
                      href={location.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-foreground"
                    >
                      Открыть на {location.mapLabel}
                      <ExternalLink size={14} />
                    </a>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>

        {minskImages && (
          <RevealText className="mt-16">
            <h3 className="font-serif text-2xl font-medium md:text-3xl">
              Как найти кабинет на ул. Тепличная
            </h3>
            <p className="mt-4 max-w-2xl text-muted">
              Здание с розово-белым фасадом на ул. Тепличная, 1. Вход — по
              лестнице к стеклянной двери.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {minskImages.directions.map((image) => (
                <div
                  key={image.src}
                  className="relative aspect-[4/3] overflow-hidden rounded-2xl"
                >
                  <Image
                    src={assetPath(image.src)}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
              ))}
            </div>
          </RevealText>
        )}
      </div>
    </section>
  );
}

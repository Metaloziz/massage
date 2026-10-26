"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ExternalLink, MapPin, X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { locations } from "@/lib/content";
import { assetPath } from "@/lib/assetPath";
import { lockBodyScroll } from "@/lib/scrollLock";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { RevealText } from "@/components/ui/RevealText";
import { useMounted, useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type GalleryImage = {
  src: string;
  alt: string;
};

const minskLocation = locations.find((location) => location.id === "minsk");
const minskImages =
  minskLocation && "images" in minskLocation ? minskLocation.images : null;

function ImageLightbox({
  images,
  index,
  onClose,
  onChange,
}: {
  images: readonly GalleryImage[];
  index: number;
  onClose: () => void;
  onChange: (index: number) => void;
}) {
  const current = images[index];
  const hasMany = images.length > 1;

  useEffect(() => {
    const unlock = lockBodyScroll();
    return unlock;
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (!hasMany) return;
      if (event.key === "ArrowLeft") {
        onChange((index - 1 + images.length) % images.length);
      }
      if (event.key === "ArrowRight") {
        onChange((index + 1) % images.length);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [hasMany, images.length, index, onChange, onClose]);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Галерея кабинета"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
        aria-label="Закрыть"
      >
        <X size={22} />
      </button>

      {hasMany && (
        <>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onChange((index - 1 + images.length) % images.length);
            }}
            className="absolute left-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:left-6"
            aria-label="Предыдущее фото"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onChange((index + 1) % images.length);
            }}
            className="absolute right-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:right-6"
            aria-label="Следующее фото"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      <div
        className="relative max-h-[85dvh] w-full max-w-4xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-black/40 md:aspect-[16/10]">
          <Image
            src={assetPath(current.src)}
            alt={current.alt}
            fill
            className="object-contain"
            sizes="(max-width: 896px) 100vw, 896px"
            priority
          />
        </div>
        {hasMany && (
          <p className="mt-4 text-center text-sm text-white/80">
            {index + 1} / {images.length}
          </p>
        )}
      </div>
    </div>
  );
}

export function Locations() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const mounted = useMounted();
  const [lightbox, setLightbox] = useState<{
    images: readonly GalleryImage[];
    index: number;
  } | null>(null);

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
            const preview = images?.cabinet[0];
            const gallery = images?.cabinet ?? [];

            return (
              <article
                key={location.id}
                className={`location-card relative flex flex-col overflow-hidden rounded-3xl border transition-shadow ${
                  location.available
                    ? "border-accent/30 bg-card shadow-sm"
                    : "border-border bg-card/60"
                }`}
              >
                {preview && (
                  <button
                    type="button"
                    onClick={() =>
                      setLightbox({ images: gallery, index: 0 })
                    }
                    className="group relative aspect-[16/10] w-full cursor-zoom-in overflow-hidden text-left"
                    aria-label={
                      gallery.length > 1
                        ? `Открыть фото кабинета, ${gallery.length} фото`
                        : "Открыть фото кабинета"
                    }
                  >
                    <Image
                      src={assetPath(preview.src)}
                      alt={preview.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    {gallery.length > 1 && (
                      <span className="absolute right-3 bottom-3 rounded-full bg-black/55 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                        {gallery.length} фото
                      </span>
                    )}
                  </button>
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
              {minskImages.directions.map((image, index) => (
                <button
                  key={image.src}
                  type="button"
                  onClick={() =>
                    setLightbox({
                      images: minskImages.directions,
                      index,
                    })
                  }
                  className="relative aspect-[4/3] cursor-zoom-in overflow-hidden rounded-2xl"
                  aria-label={`Открыть фото: ${image.alt}`}
                >
                  <Image
                    src={assetPath(image.src)}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </button>
              ))}
            </div>
          </RevealText>
        )}
      </div>

      {lightbox && (
        <ImageLightbox
          images={lightbox.images}
          index={lightbox.index}
          onClose={() => setLightbox(null)}
          onChange={(index) =>
            setLightbox((current) =>
              current ? { ...current, index } : current,
            )
          }
        />
      )}
    </section>
  );
}

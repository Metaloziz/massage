"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  heroDirections,
  heroHighlights,
  heroImage,
  heroImageMobileWebp,
  heroImageWebp,
  site,
} from "@/lib/content";
import { assetPath } from "@/lib/assetPath";
import { Button } from "@/components/ui/Button";
import { useBooking } from "@/components/booking/BookingProvider";
import { useReducedMotion, useMounted } from "@/hooks/useReducedMotion";
import { useThemeFlags } from "@/hooks/useThemeId";

gsap.registerPlugin(useGSAP);

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const mounted = useMounted();
  const { isDesign1, isDesign2 } = useThemeFlags();
  const { openSessionBooking, openTrainingBooking } = useBooking();

  useGSAP(
    () => {
      if (!mounted || reducedMotion) return;

      gsap.fromTo(
        ".hero-reveal",
        { y: 16 },
        {
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          clearProps: "transform",
        },
      );
    },
    { scope: containerRef, dependencies: [mounted, reducedMotion] },
  );

  const designAttr = isDesign2 ? "2" : "1";

  return (
    <section
      id="hero"
      ref={containerRef}
      className={`relative flex min-h-[100dvh] items-end overflow-hidden md:items-center ${
        isDesign2 ? "bg-transparent" : "bg-[var(--hero-surface)]"
      }`}
      aria-labelledby="hero-heading"
      data-design={designAttr}
    >
      {/* Design1 mobile specialist photo — LCP candidate */}
      {isDesign1 && (
        <>
          <picture className="absolute inset-0 md:hidden">
            <source
              srcSet={assetPath(heroImageMobileWebp)}
              type="image/webp"
            />
            <img
              src={assetPath(heroImage)}
              alt={`${site.brandDisplay} — кинезиомассаж и обучение`}
              className="h-full w-full object-cover object-center"
              width={800}
              height={1200}
              fetchPriority="high"
              decoding="async"
            />
          </picture>
          <div
            className="absolute inset-0 md:hidden"
            style={{ background: "var(--hero-overlay)" }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 hidden md:block"
            style={{
              background:
                "radial-gradient(ellipse 80% 70% at 20% 50%, rgba(255,252,248,0.08), transparent 55%), var(--hero-surface)",
            }}
            aria-hidden
          />
        </>
      )}

      {isDesign2 && (
        <div
          className="pointer-events-none absolute inset-0 md:hidden"
          style={{ background: "var(--hero-overlay)" }}
          aria-hidden
        />
      )}

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-end gap-10 px-5 pb-10 pt-28 md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] md:items-center md:gap-12 md:px-8 md:pb-16 md:pt-28 lg:gap-16">
        <div
          className={`flex min-w-0 flex-col ${
            isDesign2
              ? "soft-panel max-w-2xl overflow-hidden p-6 sm:p-8 md:p-10"
              : ""
          }`}
        >
          <div className="hero-reveal mb-8">
            <p
              className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm tracking-[0.14em] uppercase md:text-base"
              style={{ color: "var(--hero-muted)" }}
            >
              {heroDirections.map((item, index) => (
                <span key={item.href} className="inline-flex items-center gap-2">
                  {index > 0 && <span aria-hidden>·</span>}
                  <Link
                    href={item.href}
                    className="underline-offset-4 transition-opacity hover:opacity-80 hover:underline"
                    style={{ color: "var(--hero-text)" }}
                  >
                    {item.label}
                  </Link>
                </span>
              ))}
            </p>
          </div>

          <div className="hero-reveal max-w-3xl">
            <h1
              id="hero-heading"
              className="font-serif text-4xl leading-[1.1] font-medium tracking-tight md:text-5xl lg:text-6xl xl:text-7xl"
              style={{ color: "var(--hero-text)" }}
            >
              {site.slogan}
            </h1>
          </div>

          <div className="hero-reveal mt-8 flex w-full max-w-md flex-col gap-3 sm:flex-row">
            <Button
              className={
                isDesign1
                  ? "w-full !border-transparent !bg-[var(--hero-text)] !text-[var(--hero-cta-fg)] !shadow-[0_1px_0_rgba(255,255,255,0.35)_inset,0_10px_28px_rgba(0,0,0,0.22)] hover:!bg-[var(--hero-text)]/92"
                  : "w-full"
              }
              onClick={() => openSessionBooking()}
            >
              Записаться на сеанс
            </Button>
            <Button
              variant="outline"
              className={
                isDesign1
                  ? "w-full !border-[var(--hero-text)]/70 !bg-white/5 !text-[var(--hero-text)] hover:!border-[var(--hero-text)] hover:!bg-white/12 hover:!text-[var(--hero-text)]"
                  : "w-full"
              }
              onClick={() => openTrainingBooking()}
            >
              Записаться на обучение
            </Button>
          </div>

          <div
            className={`hero-reveal mt-12 grid gap-6 border-t pt-8 ${
              isDesign2
                ? "grid-cols-1 border-[var(--line)]"
                : "border-white/20 sm:grid-cols-3"
            }`}
          >
            {heroHighlights.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="group block min-w-0 transition-opacity hover:opacity-85"
              >
                <p
                  className={`font-serif font-medium ${
                    isDesign2
                      ? "text-xl leading-snug md:text-2xl"
                      : "text-2xl md:text-3xl"
                  }`}
                  style={{ color: "var(--hero-text)" }}
                >
                  {item.title}
                </p>
                <p
                  className="mt-2 text-sm leading-relaxed md:text-base"
                  style={{ color: "var(--hero-muted)" }}
                >
                  {item.subtitle}
                </p>
              </Link>
            ))}
          </div>
        </div>

        <div className="hero-reveal relative mx-auto hidden w-full max-w-lg md:block lg:max-w-xl">
          <div className={isDesign2 ? "soft-panel overflow-hidden p-2" : ""}>
            <picture>
              <source srcSet={assetPath(heroImageWebp)} type="image/webp" />
              <Image
                src={assetPath(heroImage)}
                alt={`${site.brandDisplay} — кинезиомассаж и обучение`}
                width={571}
                height={1024}
                priority
                className={`h-auto w-full ${
                  isDesign2
                    ? "rounded-[calc(var(--radius-card)-0.35rem)]"
                    : "rounded-[1.75rem]"
                }`}
                sizes="(max-width: 1280px) 42vw, 560px"
              />
            </picture>
          </div>
        </div>
      </div>
    </section>
  );
}

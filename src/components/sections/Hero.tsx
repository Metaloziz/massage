"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  heroDirections,
  heroHighlights,
  heroImage,
  site,
} from "@/lib/content";
import { assetPath } from "@/lib/assetPath";
import { Button } from "@/components/ui/Button";
import { useReducedMotion, useMounted } from "@/hooks/useReducedMotion";
import { useIsDesign2 } from "@/hooks/useThemeId";

gsap.registerPlugin(useGSAP);

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const mounted = useMounted();
  const isDesign2 = useIsDesign2();
  const [overlayReady, setOverlayReady] = useState(false);

  useEffect(() => {
    if (!mounted) return;
    if (reducedMotion) {
      setOverlayReady(true);
      return;
    }
    const timer = window.setTimeout(() => setOverlayReady(true), 1000);
    return () => window.clearTimeout(timer);
  }, [mounted, reducedMotion]);

  useGSAP(
    () => {
      if (!mounted || reducedMotion || !overlayReady) return;

      gsap.fromTo(
        ".hero-reveal",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
        },
      );
    },
    { scope: containerRef, dependencies: [mounted, reducedMotion, overlayReady] },
  );

  return (
    <section
      id="hero"
      ref={containerRef}
      className={`relative flex min-h-[100dvh] items-end overflow-hidden md:items-center ${
        isDesign2 ? "bg-transparent" : "bg-[var(--hero-surface)]"
      }`}
      aria-labelledby="hero-heading"
      data-design={isDesign2 ? "2" : "1"}
    >
      {/* Mobile: full-bleed photo (design1) / soft specialist under glass (design2 keeps atmosphere) */}
      {!isDesign2 && (
        <>
          <Image
            src={assetPath(heroImage)}
            alt={`${site.brandDisplay} — кинезиомассаж и обучение`}
            fill
            priority
            className={`object-cover object-center transition-[filter,transform] duration-1000 ease-out md:hidden ${
              overlayReady ? "scale-[1.02] blur-[2px]" : "scale-100 blur-0"
            }`}
            sizes="100vw"
          />
          <div
            className={`absolute inset-0 transition-opacity duration-1000 md:hidden ${
              overlayReady ? "opacity-100" : "opacity-0"
            }`}
            style={{ background: "var(--hero-overlay)" }}
            aria-hidden
          />
        </>
      )}

      {/* Desktop surface — design1 only */}
      {!isDesign2 && (
        <div
          className="pointer-events-none absolute inset-0 hidden md:block"
          style={{
            background:
              "radial-gradient(ellipse 80% 70% at 20% 50%, rgba(255,252,248,0.08), transparent 55%), var(--hero-surface)",
          }}
          aria-hidden
        />
      )}

      {isDesign2 && (
        <div
          className="pointer-events-none absolute inset-0 md:hidden"
          style={{ background: "var(--hero-overlay)" }}
          aria-hidden
        />
      )}

      <div
        className={`relative z-10 mx-auto grid w-full max-w-7xl items-end gap-10 px-5 pb-10 pt-28 md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] md:items-center md:gap-12 md:px-8 md:pb-16 md:pt-28 lg:gap-16 ${
          overlayReady || reducedMotion ? "" : "pointer-events-none"
        }`}
      >
        <div
          className={`flex flex-col ${
            isDesign2
              ? "glass-panel p-6 sm:p-8 md:p-10"
              : ""
          }`}
        >
          <div
            className={`hero-reveal mb-8 ${overlayReady ? "opacity-100" : "opacity-0"}`}
          >
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
              className={`font-serif text-4xl leading-[1.1] font-medium tracking-tight md:text-5xl lg:text-6xl xl:text-7xl ${
                overlayReady ? "opacity-100" : "opacity-0"
              }`}
              style={{ color: "var(--hero-text)" }}
            >
              {site.slogan}
            </h1>
          </div>

          <div
            className={`hero-reveal mt-8 flex w-full max-w-md flex-col gap-3 sm:flex-row ${
              overlayReady ? "opacity-100" : "opacity-0"
            }`}
          >
            <Button
              href={site.phoneHref}
              className={
                isDesign2
                  ? "w-full !border-transparent !bg-[var(--hero-text)] !text-[var(--hero-cta-fg)] !shadow-none hover:!bg-[var(--hero-text)]/90"
                  : "w-full !border-transparent !bg-[var(--hero-text)] !text-[var(--hero-cta-fg)] !shadow-[0_1px_0_rgba(255,255,255,0.35)_inset,0_10px_28px_rgba(0,0,0,0.22)] hover:!bg-[var(--hero-text)]/92"
              }
            >
              Записаться на сеанс
            </Button>
            <Button
              href={site.phoneHref}
              variant="outline"
              className={
                isDesign2
                  ? "w-full !border-white/35 !bg-transparent !text-[var(--hero-text)] hover:!border-white/60 hover:!bg-white/10 hover:!text-[var(--hero-text)]"
                  : "w-full !border-[var(--hero-text)]/70 !bg-white/5 !text-[var(--hero-text)] hover:!border-[var(--hero-text)] hover:!bg-white/12 hover:!text-[var(--hero-text)]"
              }
            >
              Записаться на обучение
            </Button>
          </div>

          <div
            className={`hero-reveal mt-12 grid gap-6 border-t pt-8 sm:grid-cols-3 ${
              overlayReady ? "opacity-100" : "opacity-0"
            } ${isDesign2 ? "border-white/15" : "border-white/20"}`}
          >
            {heroHighlights.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="group block transition-opacity hover:opacity-85"
              >
                <p
                  className="font-serif text-2xl font-medium md:text-3xl"
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

        <div
          className={`hero-reveal relative mx-auto hidden w-full max-w-lg md:block lg:max-w-xl ${
            overlayReady ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className={
              isDesign2
                ? "glass-panel overflow-hidden p-2"
                : ""
            }
          >
            <Image
              src={assetPath(heroImage)}
              alt={`${site.brandDisplay} — кинезиомассаж и обучение`}
              width={571}
              height={1024}
              priority
              className={`h-auto w-full ${
                isDesign2 ? "rounded-[calc(var(--radius-card)-0.35rem)]" : "rounded-[1.75rem]"
              }`}
              sizes="(max-width: 1280px) 42vw, 560px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

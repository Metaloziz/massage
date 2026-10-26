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
import { useBooking } from "@/components/booking/BookingProvider";
import { useReducedMotion, useMounted } from "@/hooks/useReducedMotion";

gsap.registerPlugin(useGSAP);

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const mounted = useMounted();
  const { openSessionBooking, openTrainingBooking } = useBooking();
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
      className="relative flex min-h-[100dvh] items-end overflow-hidden bg-[#1f1b18]"
      aria-labelledby="hero-heading"
    >
      <Image
        src={assetPath(heroImage)}
        alt={`${site.brandDisplay} — кинезиомассаж и обучение`}
        fill
        priority
        className={`object-cover object-center transition-[filter,transform] duration-1000 ease-out md:object-top ${
          overlayReady ? "scale-[1.02] blur-[2px]" : "scale-100 blur-0"
        }`}
        sizes="100vw"
      />
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          overlayReady ? "opacity-100" : "opacity-0"
        }`}
        style={{ background: "var(--hero-overlay)" }}
        aria-hidden
      />

      <div
        className={`relative z-10 mx-auto flex w-full max-w-7xl flex-col px-5 pb-10 pt-28 md:px-8 md:pb-14 ${
          overlayReady || reducedMotion ? "" : "pointer-events-none"
        }`}
      >
        <div
          className={`hero-reveal mb-8 ${overlayReady ? "opacity-100" : "opacity-0"}`}
        >
          <p
            className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm uppercase tracking-[0.14em] md:text-base"
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
            className={`font-serif text-4xl leading-[1.1] font-medium tracking-tight md:text-6xl lg:text-7xl ${
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
            className="w-full bg-[var(--hero-text)] text-[#2a2420] hover:opacity-90"
            onClick={() => openSessionBooking()}
          >
            Записаться на сеанс
          </Button>
          <Button
            variant="outline"
            className="w-full border-[var(--hero-text)] text-[var(--hero-text)] hover:border-[var(--hero-text)] hover:bg-white/10 hover:text-[var(--hero-text)]"
            onClick={openTrainingBooking}
          >
            Записаться на обучение
          </Button>
        </div>

        <div
          className={`hero-reveal mt-12 grid gap-6 border-t border-white/20 pt-8 sm:grid-cols-3 ${
            overlayReady ? "opacity-100" : "opacity-0"
          }`}
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
    </section>
  );
}

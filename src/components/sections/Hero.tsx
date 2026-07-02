"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowDown } from "lucide-react";
import { heroImage, heroVideo, site } from "@/lib/content";
import { assetPath } from "@/lib/assetPath";
import { Button } from "@/components/ui/Button";
import { scrollToElement } from "@/components/layout/SmoothScroll";
import { useIsMobile, useMounted, useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(useGSAP);

const AmbientBlob = dynamic(
  () =>
    import("@/components/three/AmbientBlob").then((mod) => mod.AmbientBlob),
  { ssr: false },
);

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const mounted = useMounted();

  const showBlob = mounted && !reducedMotion && !isMobile;
  const showVideo = mounted && !reducedMotion;

  useGSAP(
    () => {
      if (!mounted || reducedMotion) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-label", { y: 20, opacity: 0, duration: 0.8 })
        .from(".hero-title", { y: 40, opacity: 0, duration: 1 }, "-=0.5")
        .from(".hero-subtitle", { y: 30, opacity: 0, duration: 0.8 }, "-=0.6")
        .from(".hero-cta", { y: 20, opacity: 0, duration: 0.6 }, "-=0.4")
        .from(".hero-image", { scale: 1.05, opacity: 0, duration: 1.2 }, "-=0.8");
    },
    { scope: containerRef, dependencies: [mounted, reducedMotion] },
  );

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative flex min-h-screen items-center overflow-hidden pt-20"
      aria-labelledby="hero-heading"
    >
      {showBlob && <AmbientBlob />}

      <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 py-16 md:px-8 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-24">
        <div className="flex flex-col justify-center">
          <p className="hero-label mb-4 text-xs font-medium tracking-[0.2em] text-accent uppercase">
            {site.regionLabel}
          </p>
          <h1
            id="hero-heading"
            className="hero-title font-serif text-5xl leading-[1.1] font-medium tracking-tight md:text-6xl lg:text-7xl"
          >
            {site.name}
          </h1>
          <p className="hero-subtitle mt-4 text-lg text-muted md:text-xl">
            {site.tagline}
          </p>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted">
            {site.description}
          </p>
          <div className="hero-cta mt-10 flex flex-wrap items-center gap-4">
            <Button onClick={() => scrollToElement("#booking")}>
              Записаться
            </Button>
            <Button variant="outline" onClick={() => scrollToElement("#services")}>
              Услуги
            </Button>
          </div>
          <p className="mt-8 text-sm text-muted">{site.experience}</p>
        </div>

        <div className="hero-image relative aspect-[4/5] w-full max-w-lg justify-self-center overflow-hidden rounded-3xl lg:max-w-none">
          {showVideo ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              poster={assetPath(heroImage)}
              className="absolute inset-0 h-full w-full object-cover"
              aria-label={`${site.name} — видео кабинета`}
            >
              <source src={assetPath(heroVideo)} type="video/mp4" />
            </video>
          ) : (
            <Image
              src={assetPath(heroImage)}
              alt={`${site.name} — массажный кабинет`}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/10 to-transparent" />
        </div>
      </div>

      <button
        type="button"
        onClick={() => scrollToElement("#philosophy")}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 animate-bounce text-muted transition-colors hover:text-accent md:flex"
        aria-label="Прокрутить вниз"
      >
        <ArrowDown size={24} />
      </button>
    </section>
  );
}

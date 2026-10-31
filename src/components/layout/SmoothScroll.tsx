"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reducedMotion = useReducedMotion();
  const lenisRef = useRef<{ destroy: () => void } | null>(null);

  useEffect(() => {
    if (reducedMotion) return;

    // Mobile: keep native scroll — Lenis costs main-thread for little gain.
    const isCoarse =
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 767px), (hover: none)").matches;
    if (isCoarse) return;

    let cancelled = false;
    let removeTicker: (() => void) | undefined;

    const start = async () => {
      const [{ default: Lenis }, gsapMod, stMod] = await Promise.all([
        import("lenis"),
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;

      const gsap = gsapMod.default;
      const { ScrollTrigger } = stMod;
      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      lenisRef.current = lenis;
      lenis.on("scroll", ScrollTrigger.update);

      const tickerCallback = (time: number) => {
        lenis.raf(time * 1000);
      };

      gsap.ticker.add(tickerCallback);
      gsap.ticker.lagSmoothing(0);

      removeTicker = () => {
        gsap.ticker.remove(tickerCallback);
        lenis.destroy();
        lenisRef.current = null;
      };
    };

    let idleId: number | undefined;
    let timeoutId: number | undefined;

    if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(
        () => {
          void start();
        },
        { timeout: 2000 },
      );
    } else {
      timeoutId = window.setTimeout(() => {
        void start();
      }, 1);
    }

    return () => {
      cancelled = true;
      if (idleId !== undefined && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
      }
      removeTicker?.();
    };
  }, [reducedMotion]);

  return <>{children}</>;
}

export function scrollToElement(selector: string) {
  const element = document.querySelector(selector);
  if (!element) return;

  element.scrollIntoView({ behavior: "smooth", block: "start" });
}

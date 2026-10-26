"use client";

import Image from "next/image";
import { assetPath } from "@/lib/assetPath";
import { useIsDesign2 } from "@/hooks/useThemeId";

const ATMOSPHERE_SRC = "/atmosphere/leaves.png";

/** Full-site nature backdrop for Дизайн 2. */
export function ThemeAtmosphere() {
  const isDesign2 = useIsDesign2();

  if (!isDesign2) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <Image
        src={assetPath(ATMOSPHERE_SRC)}
        alt=""
        fill
        priority
        className="object-cover object-center scale-105"
        sizes="100vw"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(8,14,12,0.55) 0%, rgba(8,14,12,0.35) 35%, rgba(8,14,12,0.62) 70%, rgba(8,14,12,0.88) 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(180,200,160,0.12), transparent 55%)",
        }}
      />
    </div>
  );
}

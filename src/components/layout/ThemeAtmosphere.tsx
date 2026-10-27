"use client";

import Image from "next/image";
import { assetPath } from "@/lib/assetPath";
import { getBackdrop } from "@/design/themes";
import { useBackdropId, useIsDesign2 } from "@/hooks/useThemeId";

/** Fixed Soft Earth backdrop — image or solid color from settings. */
export function ThemeAtmosphere() {
  const isDesign2 = useIsDesign2();
  const backdropId = useBackdropId();

  if (!isDesign2) return null;

  const backdrop = getBackdrop(backdropId);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      {backdrop.kind === "image" ? (
        <Image
          src={assetPath(backdrop.value)}
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{ background: backdrop.value }}
        />
      )}
      <div
        className="absolute inset-0"
        style={{
          background:
            backdrop.kind === "image"
              ? "linear-gradient(180deg, rgba(12,28,22,0.35) 0%, rgba(12,28,22,0.22) 40%, rgba(12,28,22,0.45) 100%)"
              : "linear-gradient(180deg, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.06) 50%, rgba(0,0,0,0.18) 100%)",
        }}
      />
    </div>
  );
}

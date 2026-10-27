"use client";

import Image from "next/image";
import { assetPath } from "@/lib/assetPath";
import { useThemeFlags } from "@/hooks/useThemeId";

const DESIGN2_SRC = "/atmosphere/leaves.png";
const DESIGN3_SRC = "/atmosphere/design3-leaves.jpg";

/** Fixed backdrop: design2 glass forest / design3 dense leaves. */
export function ThemeAtmosphere() {
  const { isDesign2, isDesign3 } = useThemeFlags();

  if (!isDesign2 && !isDesign3) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <Image
        src={assetPath(isDesign3 ? DESIGN3_SRC : DESIGN2_SRC)}
        alt=""
        fill
        priority
        className={
          isDesign3
            ? "object-cover object-center"
            : "object-cover object-center scale-105"
        }
        sizes="100vw"
      />
      {isDesign2 ? (
        <>
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
        </>
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(12,28,22,0.35) 0%, rgba(12,28,22,0.22) 40%, rgba(12,28,22,0.45) 100%)",
          }}
        />
      )}
    </div>
  );
}

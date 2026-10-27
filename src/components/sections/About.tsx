"use client";

import Image from "next/image";
import { about } from "@/lib/content";
import { assetPath } from "@/lib/assetPath";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { RevealText } from "@/components/ui/RevealText";
import { useThemeFlags } from "@/hooks/useThemeId";

export function About() {
  const { isDesign2, isDesign3 } = useThemeFlags();
  const panel = isDesign2
    ? "glass-panel p-6 sm:p-8 md:p-10"
    : isDesign3
      ? "soft-panel p-6 sm:p-8 md:p-10"
      : "";
  const photoFrame = isDesign2
    ? "glass-panel p-2"
    : isDesign3
      ? "soft-panel p-2"
      : "rounded-[var(--radius-card)] border border-[var(--line)] bg-card";

  return (
    <section
      id="about"
      className={`scroll-mt-24 py-16 md:py-28 ${isDesign2 ? "bg-transparent" : ""}`}
      aria-labelledby="about-heading"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:px-8 lg:grid-cols-2 lg:gap-20">
        <div className={panel}>
          <RevealText>
            <SectionLabel>{about.title}</SectionLabel>
          </RevealText>
          <RevealText delay={0.1}>
            <h2
              id="about-heading"
              className="mt-4 font-serif text-3xl leading-snug font-medium md:text-4xl lg:text-5xl"
            >
              {about.name}
            </h2>
            <p className="mt-3 text-base text-muted md:text-lg">{about.role}</p>
          </RevealText>
          <RevealText delay={0.2}>
            <div className="mt-8 space-y-5 text-base leading-relaxed text-muted md:text-lg">
              {about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </RevealText>
        </div>

        <RevealText delay={0.15}>
          <div className={`relative aspect-[4/5] overflow-hidden ${photoFrame}`}>
            <div
              className={`relative h-full w-full overflow-hidden ${
                isDesign2 || isDesign3
                  ? "rounded-[calc(var(--radius-card)-0.35rem)]"
                  : ""
              }`}
            >
              <Image
                src={assetPath(about.photo)}
                alt={`${about.name} — ${about.role}`}
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </RevealText>
      </div>
    </section>
  );
}

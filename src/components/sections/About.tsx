"use client";

import Image from "next/image";
import { about } from "@/lib/content";
import { assetPath } from "@/lib/assetPath";
import { RevealText } from "@/components/ui/RevealText";
import { useThemeFlags } from "@/hooks/useThemeId";

export function About() {
  const { isDesign2 } = useThemeFlags();
  const panel = isDesign2 ? "soft-panel p-6 sm:p-8 md:p-10" : "";
  const photoFrame = isDesign2
    ? "soft-panel p-2"
    : "rounded-[var(--radius-card)] border border-[var(--line)] bg-card";

  return (
    <section
      id="about"
      className={`scroll-mt-24 py-16 md:py-28 ${isDesign2 ? "bg-transparent" : ""}`}
      aria-labelledby="about-heading"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-8 px-5 md:gap-10 md:px-8">
        <RevealText>
          <h2
            id="about-heading"
            className="font-serif text-3xl leading-snug font-medium sm:text-4xl md:text-5xl"
          >
            {about.name}
          </h2>
          <p className="mt-3 text-base text-muted md:text-lg">{about.role}</p>
        </RevealText>

        <RevealText delay={0.1}>
          <div
            className={`relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden ${photoFrame}`}
          >
            <div
              className={`relative h-full w-full overflow-hidden ${
                isDesign2 ? "rounded-[calc(var(--radius-card)-0.35rem)]" : ""
              }`}
            >
              <Image
                src={assetPath(about.photo)}
                alt={`${about.name} — ${about.role}`}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 28rem"
              />
            </div>
          </div>
        </RevealText>

        <RevealText delay={0.15}>
          <div className={panel || undefined}>
            <div className="space-y-5 text-base leading-relaxed text-muted md:text-lg">
              {about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </RevealText>
      </div>
    </section>
  );
}

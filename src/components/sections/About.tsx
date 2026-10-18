"use client";

import Image from "next/image";
import { about, site } from "@/lib/content";
import { assetPath } from "@/lib/assetPath";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { RevealText } from "@/components/ui/RevealText";

export function About() {
  return (
    <section
      id="about"
      className="scroll-mt-24 py-24 md:py-32"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:px-8 lg:grid-cols-2 lg:gap-20">
        <RevealText>
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-card">
            <Image
              src={assetPath(about.photo)}
              alt={`${site.name} — ${about.title}`}
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </RevealText>

        <div>
          <RevealText>
            <SectionLabel>{about.title}</SectionLabel>
          </RevealText>
          <RevealText delay={0.1}>
            <h2
              id="about-heading"
              className="mt-4 font-serif text-3xl leading-snug font-medium md:text-4xl lg:text-5xl"
            >
              &ldquo;{about.quote}&rdquo;
            </h2>
          </RevealText>
          <RevealText delay={0.2}>
            <p className="mt-8 text-base leading-relaxed text-muted md:text-lg">
              {about.text}
            </p>
            <div className="mt-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-border" />
              <span className="text-sm text-accent">{site.name}</span>
            </div>
          </RevealText>
        </div>
      </div>
    </section>
  );
}

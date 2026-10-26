"use client";

import Image from "next/image";
import { about } from "@/lib/content";
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
        <div>
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
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-card">
            <Image
              src={assetPath(about.photo)}
              alt={`${about.name} — ${about.role}`}
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </RevealText>
      </div>
    </section>
  );
}

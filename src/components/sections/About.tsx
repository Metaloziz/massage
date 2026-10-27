"use client";

import Image from "next/image";
import { about, schoolYasnost } from "@/lib/content";
import { assetPath } from "@/lib/assetPath";
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

            {schoolYasnost.blurb && (
              <div
                className={`mt-8 space-y-4 border-t pt-8 ${
                  isDesign2 ? "border-white/15" : "border-[var(--line)]"
                }`}
              >
                <h3 className="font-serif text-xl font-medium sm:text-2xl">
                  {schoolYasnost.title}
                </h3>
                <p className="text-base leading-relaxed text-muted md:text-lg">
                  {schoolYasnost.blurb}
                </p>
                <p className="text-base leading-relaxed text-muted md:text-lg">
                  Более подробную информацию о школе можно получить, перейдя по
                  ссылке ниже.
                </p>
                {schoolYasnost.website && (
                  <a
                    href={schoolYasnost.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex text-accent underline-offset-4 transition-colors hover:text-foreground hover:underline"
                  >
                    {schoolYasnost.websiteLabel}
                  </a>
                )}
              </div>
            )}
          </div>
        </RevealText>
      </div>
    </section>
  );
}

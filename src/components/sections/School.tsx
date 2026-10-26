"use client";

import Image from "next/image";
import Link from "next/link";
import { schoolYasnost } from "@/lib/content";
import { assetPath } from "@/lib/assetPath";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { RevealText } from "@/components/ui/RevealText";
import { useIsDesign2 } from "@/hooks/useThemeId";

export function School() {
  const isDesign2 = useIsDesign2();
  const hasLinks = Boolean(schoolYasnost.website || schoolYasnost.instagram);

  return (
    <section
      id="school"
      className={`scroll-mt-24 py-24 md:py-32 ${
        isDesign2
          ? "border-t border-white/10 bg-transparent"
          : "border-t border-[var(--line)] bg-card/40"
      }`}
      aria-labelledby="school-heading"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:px-8 lg:grid-cols-2 lg:gap-20">
        <div>
          <RevealText>
            <SectionLabel>Школа массажа</SectionLabel>
          </RevealText>

          <RevealText delay={0.1} className="mt-6">
            <div
              className={`relative aspect-[4/3] overflow-hidden ${
                isDesign2
                  ? "glass-panel p-2"
                  : "rounded-[var(--radius-card)] border border-[var(--line)] bg-background"
              }`}
            >
              <div
                className={`relative h-full w-full overflow-hidden ${
                  isDesign2
                    ? "rounded-[calc(var(--radius-card)-0.35rem)]"
                    : ""
                }`}
              >
                <Image
                  src={assetPath(schoolYasnost.photo)}
                  alt={schoolYasnost.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </RevealText>
        </div>

        <div className={isDesign2 ? "glass-panel p-6 sm:p-8 md:p-10" : ""}>
          <RevealText delay={0.15}>
            <h2
              id="school-heading"
              className="font-serif text-3xl font-medium md:text-4xl lg:text-5xl"
            >
              {schoolYasnost.title}
            </h2>
          </RevealText>

          <RevealText delay={0.2}>
            {schoolYasnost.blurb ? (
              <p className="mt-6 text-base leading-relaxed text-muted md:text-lg">
                {schoolYasnost.blurb}
              </p>
            ) : (
              <p className="mt-6 text-base leading-relaxed text-muted md:text-lg">
                Информация о школе появится здесь.
              </p>
            )}
          </RevealText>

          <RevealText delay={0.3}>
            <div className="mt-8 flex flex-wrap gap-3">
              {schoolYasnost.website && (
                <a
                  href={schoolYasnost.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center rounded-[var(--radius-control)] border border-[var(--line)] px-6 py-3 text-sm font-medium tracking-[0.02em] transition-all hover:border-accent hover:bg-accent/10"
                >
                  Сайт школы
                </a>
              )}
              {schoolYasnost.instagram && (
                <a
                  href={schoolYasnost.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center rounded-[var(--radius-control)] border border-[var(--line)] px-6 py-3 text-sm font-medium tracking-[0.02em] transition-all hover:border-accent hover:bg-accent/10"
                >
                  Instagram
                </a>
              )}
              <Link
                href="/education"
                className={`inline-flex min-h-12 items-center justify-center rounded-[var(--radius-control)] px-6 py-3 text-sm font-medium tracking-[0.02em] transition-all ${
                  hasLinks
                    ? "border border-[var(--line)] hover:border-accent hover:bg-accent/10"
                    : "border border-transparent bg-foreground text-background hover:bg-foreground/90"
                }`}
              >
                Подробнее об обучении
              </Link>
            </div>
          </RevealText>
        </div>
      </div>
    </section>
  );
}

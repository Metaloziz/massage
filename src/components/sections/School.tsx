"use client";

import Image from "next/image";
import Link from "next/link";
import { schoolYasnost } from "@/lib/content";
import { assetPath } from "@/lib/assetPath";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { RevealText } from "@/components/ui/RevealText";

export function School() {
  const hasLinks = Boolean(schoolYasnost.website || schoolYasnost.instagram);

  return (
    <section
      id="school"
      className="scroll-mt-24 border-t border-border bg-card/40 py-24 md:py-32"
      aria-labelledby="school-heading"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:px-8 lg:grid-cols-2 lg:gap-20">
        <div>
          <RevealText>
            <SectionLabel>Школа массажа</SectionLabel>
          </RevealText>

          <RevealText delay={0.1} className="mt-6">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-background">
              <Image
                src={assetPath(schoolYasnost.photo)}
                alt={schoolYasnost.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </RevealText>
        </div>

        <div>
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
                  className="inline-flex min-h-12 items-center justify-center rounded-xl border border-foreground/25 px-6 py-3 text-sm font-medium tracking-[0.02em] transition-all hover:border-foreground/50 hover:bg-foreground/[0.04]"
                >
                  Сайт школы
                </a>
              )}
              {schoolYasnost.instagram && (
                <a
                  href={schoolYasnost.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center rounded-xl border border-foreground/25 px-6 py-3 text-sm font-medium tracking-[0.02em] transition-all hover:border-foreground/50 hover:bg-foreground/[0.04]"
                >
                  Instagram
                </a>
              )}
              <Link
                href="/education"
                className={`inline-flex min-h-12 items-center justify-center rounded-xl px-6 py-3 text-sm font-medium tracking-[0.02em] transition-all ${
                  hasLinks
                    ? "border border-foreground/25 hover:border-foreground/50 hover:bg-foreground/[0.04]"
                    : "border border-transparent bg-foreground text-background shadow-[0_1px_0_rgba(255,255,255,0.12)_inset,0_8px_20px_rgba(42,36,32,0.12)] hover:bg-foreground/90"
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

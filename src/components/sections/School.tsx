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
        <div className="order-2 lg:order-1">
          <RevealText>
            <SectionLabel>Школа массажа</SectionLabel>
          </RevealText>
          <RevealText delay={0.1}>
            <h2
              id="school-heading"
              className="mt-4 font-serif text-3xl font-medium md:text-4xl lg:text-5xl"
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
                  className="inline-flex min-h-11 items-center justify-center rounded-full border border-border px-7 py-3 text-sm font-medium transition-all hover:border-accent hover:text-accent"
                >
                  Сайт школы
                </a>
              )}
              {schoolYasnost.instagram && (
                <a
                  href={schoolYasnost.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center justify-center rounded-full border border-border px-7 py-3 text-sm font-medium transition-all hover:border-accent hover:text-accent"
                >
                  Instagram
                </a>
              )}
              <Link
                href="/education"
                className={`inline-flex min-h-11 items-center justify-center rounded-full px-7 py-3 text-sm font-medium transition-all ${
                  hasLinks
                    ? "border border-border hover:border-accent hover:text-accent"
                    : "bg-foreground text-background hover:opacity-85"
                }`}
              >
                Подробнее об обучении
              </Link>
            </div>
          </RevealText>
        </div>

        <RevealText className="order-1 lg:order-2">
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
    </section>
  );
}

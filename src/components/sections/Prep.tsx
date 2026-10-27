"use client";

import { prep } from "@/lib/content";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { RevealText } from "@/components/ui/RevealText";
import { useThemeFlags } from "@/hooks/useThemeId";

export function Prep() {
  const { isDesign2, isDesign3 } = useThemeFlags();
  const card = isDesign2
    ? "glass-panel"
    : isDesign3
      ? "soft-panel"
      : "rounded-[var(--radius-card)] border border-[var(--line)] bg-card";

  return (
    <section
      id="prep"
      className={`py-16 md:py-28 ${isDesign2 ? "bg-transparent" : ""}`}
      aria-labelledby="prep-heading"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <RevealText className="mb-8 max-w-xl md:mb-12">
          <SectionLabel>Подготовка</SectionLabel>
          <h2
            id="prep-heading"
            className="font-serif text-3xl font-medium sm:text-4xl md:text-5xl"
          >
            {prep.title}
          </h2>
        </RevealText>

        <div className="grid gap-8 md:grid-cols-2">
          <RevealText>
            <div className={`h-full p-6 sm:p-8 ${card}`}>
              <h3 className="font-serif text-xl font-medium sm:text-2xl">
                {prep.beforeSession.title}
              </h3>
              <ul className="mt-5 space-y-3 sm:mt-6">
                {prep.beforeSession.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm leading-relaxed text-muted"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </RevealText>

          <RevealText delay={0.1}>
            <div className={`h-full p-6 sm:p-8 ${card}`}>
              <h3 className="font-serif text-xl font-medium sm:text-2xl">
                {prep.whatToBring.title}
              </h3>
              <ul className="mt-5 space-y-4 sm:mt-6">
                {prep.whatToBring.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm leading-relaxed text-muted"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </RevealText>
        </div>
      </div>
    </section>
  );
}

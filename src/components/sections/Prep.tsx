"use client";

import { prep } from "@/lib/content";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { RevealText } from "@/components/ui/RevealText";
import { useIsDesign2 } from "@/hooks/useThemeId";

export function Prep() {
  const isDesign2 = useIsDesign2();

  return (
    <section
      id="prep"
      className={`py-20 md:py-28 ${isDesign2 ? "bg-transparent" : ""}`}
      aria-labelledby="prep-heading"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <RevealText className="mb-12 max-w-xl">
          <SectionLabel>Подготовка</SectionLabel>
          <h2
            id="prep-heading"
            className="font-serif text-4xl font-medium md:text-5xl"
          >
            {prep.title}
          </h2>
        </RevealText>

        <div className="grid gap-8 md:grid-cols-2">
          <RevealText>
            <div
              className={`h-full p-8 ${
                isDesign2
                  ? "glass-panel"
                  : "rounded-[var(--radius-card)] border border-[var(--line)] bg-card"
              }`}
            >
              <h3 className="font-serif text-2xl font-medium">
                {prep.beforeSession.title}
              </h3>
              <ul className="mt-6 space-y-3">
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
            <div
              className={`h-full p-8 ${
                isDesign2
                  ? "glass-panel"
                  : "rounded-[var(--radius-card)] border border-[var(--line)] bg-card"
              }`}
            >
              <h3 className="font-serif text-2xl font-medium">
                {prep.whatToBring.title}
              </h3>
              <ul className="mt-6 space-y-4">
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

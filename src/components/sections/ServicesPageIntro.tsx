"use client";

import Link from "next/link";
import { useThemeFlags } from "@/hooks/useThemeId";

export function ServicesPageIntro() {
  const { isDesign2 } = useThemeFlags();
  const panel = isDesign2 ? "soft-panel p-6 sm:p-8 md:p-10" : "";

  return (
    <section
      className={`border-b py-16 md:py-24 ${
        isDesign2
          ? "border-[var(--line)] bg-transparent"
          : "border-[var(--line)] bg-card"
      }`}
    >
      <div className={`mx-auto max-w-3xl px-5 md:px-8 ${panel}`}>
        <p className="text-xs font-medium tracking-[0.2em] text-accent uppercase">
          Услуги
        </p>
        <h1 className="mt-4 font-serif text-4xl font-medium md:text-6xl">
          Кинезиомассаж и общеоздоровительный массаж
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted">
          Два разных формата работы с телом. Выберите тот, что подходит вашему
          запросу — или сравните оба ниже.
        </p>
        <div className="mt-8 flex flex-wrap gap-4 text-sm">
          <Link
            href="#kinesio"
            className="ui-btn ui-btn--outline rounded-[var(--radius-control)] border border-[var(--line)] px-4 py-2 transition-colors hover:border-accent hover:text-accent"
          >
            Кинезиомассаж
          </Link>
          <Link
            href="#wellness"
            className="ui-btn ui-btn--outline rounded-[var(--radius-control)] border border-[var(--line)] px-4 py-2 transition-colors hover:border-accent hover:text-accent"
          >
            Общеоздоровительный
          </Link>
        </div>
      </div>
    </section>
  );
}

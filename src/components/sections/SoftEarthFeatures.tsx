"use client";

import { BookOpen, Leaf, MapPin, Sparkles } from "lucide-react";
import { useIsDesign2 } from "@/hooks/useThemeId";
import { RevealText } from "@/components/ui/RevealText";

const features = [
  {
    id: "experience",
    title: "8+ лет",
    text: "Практика массажа и работы с телом",
    icon: Sparkles,
  },
  {
    id: "school",
    title: "Обучение",
    text: "Программы школы массажа «Ясность»",
    icon: BookOpen,
  },
  {
    id: "kinesio",
    title: "Кинезиомассаж",
    text: "Лечим причину, а не только симптом",
    icon: Leaf,
  },
  {
    id: "places",
    title: "Два кабинета",
    text: "Минск и Молодечно — удобно добраться",
    icon: MapPin,
  },
] as const;

/** Полоса с иконками — только Soft Earth (дизайн 2). */
export function SoftEarthFeatures() {
  const isDesign2 = useIsDesign2();
  if (!isDesign2) return null;

  return (
    <section className="px-5 py-8 md:px-8 md:py-14" aria-label="Ключевые особенности">
      <RevealText>
        <div className="mx-auto max-w-7xl rounded-[var(--radius-card)] bg-[#2f5648] px-5 py-8 text-[#f3f0e6] shadow-[var(--shadow-tile-strong)] sm:px-6 sm:py-10 md:px-10 md:py-12">
          <div className="grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4">
            {features.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.id} className="text-left">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 sm:h-14 sm:w-14">
                    <Icon size={20} strokeWidth={1.6} />
                  </div>
                  <h3 className="mt-3 font-serif text-lg font-semibold tracking-tight sm:mt-4 sm:text-xl">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/75 sm:mt-2">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </RevealText>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { ExternalLink, Star } from "lucide-react";
import { googleReviews, reviewSources, testimonials, yandexReviews } from "@/lib/content";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { RevealText } from "@/components/ui/RevealText";
import { useReducedMotion, useMounted } from "@/hooks/useReducedMotion";
import { useThemeFlags } from "@/hooks/useThemeId";

function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`Рейтинг ${rating} из 5`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          size={16}
          className={
            index < Math.round(rating)
              ? "fill-accent text-accent"
              : "fill-border text-border"
          }
        />
      ))}
    </div>
  );
}

function SourceRating({
  rating,
  count,
  label,
}: {
  rating: number;
  count: number;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <RatingStars rating={rating} />
      <p className="text-sm text-muted">
        {rating} · {count} {count === 1 ? "оценка" : count < 5 ? "оценки" : "оценок"} на {label}
      </p>
    </div>
  );
}

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const reducedMotion = useReducedMotion();
  const mounted = useMounted();
  const { isDesign2, isDesign3 } = useThemeFlags();

  const goToSlide = (index: number) => {
    setActiveIndex(index);
  };

  const startAutoplay = () => {
    if (reducedMotion) return;

    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
  };

  const stopAutoplay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    if (!mounted || reducedMotion) return;

    startAutoplay();
    return stopAutoplay;
  }, [mounted, reducedMotion]);

  const active = testimonials[activeIndex];
  const activeSource = reviewSources[active.source];

  return (
    <section
      id="testimonials"
      className={`py-16 md:py-28 ${
        isDesign2 ? "bg-transparent" : isDesign3 ? "" : "bg-card"
      }`}
      aria-labelledby="testimonials-heading"
      onMouseEnter={stopAutoplay}
      onMouseLeave={startAutoplay}
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <RevealText className="mb-10 text-center md:mb-16">
          <SectionLabel>Отзывы</SectionLabel>
          <h2
            id="testimonials-heading"
            className="font-serif text-3xl font-medium sm:text-4xl md:text-5xl"
          >
            Слова клиентов
          </h2>
          <div className="mx-auto mt-6 flex flex-col items-center justify-center gap-5 sm:mt-8 sm:flex-row sm:gap-12">
            <SourceRating
              rating={yandexReviews.rating}
              count={yandexReviews.count}
              label={yandexReviews.label}
            />
            <div
              className={`hidden h-12 w-px sm:block ${
                isDesign2 ? "bg-white/20" : "bg-[var(--line)]"
              }`}
              aria-hidden="true"
            />
            <SourceRating
              rating={googleReviews.rating}
              count={googleReviews.count}
              label={googleReviews.label}
            />
          </div>
        </RevealText>

        <div
          className={`mx-auto max-w-3xl text-center ${
            isDesign2
              ? "glass-panel px-6 py-10 sm:px-10"
              : isDesign3
                ? "soft-panel px-6 py-10 sm:px-10"
                : ""
          }`}
        >
          <div key={active.id}>
            <blockquote>
              <p className="font-serif text-2xl leading-relaxed font-medium md:text-3xl">
                &ldquo;{active.text}&rdquo;
              </p>
            </blockquote>
            <div className="mt-8">
              <p className="font-medium">{active.author}</p>
              <p className="mt-1 text-sm text-muted">
                {active.date} · {activeSource.label}
              </p>
            </div>
          </div>

          <div
            className="mt-10 flex items-center justify-center gap-3"
            role="tablist"
            aria-label="Выбор отзыва"
          >
            {testimonials.map((item, index) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={index === activeIndex}
                aria-label={`Отзыв ${index + 1}`}
                onClick={() => goToSlide(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "w-8 bg-accent"
                    : "w-2.5 bg-border hover:bg-accent/50"
                }`}
              />
            ))}
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-6">
            <a
              href={yandexReviews.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-accent transition-colors hover:text-foreground"
            >
              Все отзывы на Яндекс Картах
              <ExternalLink size={14} />
            </a>
            <span className="hidden text-muted sm:inline" aria-hidden="true">
              ·
            </span>
            <a
              href={googleReviews.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-accent transition-colors hover:text-foreground"
            >
              Все отзывы на Google Картах
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

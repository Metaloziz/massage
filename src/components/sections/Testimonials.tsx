"use client";

import { useRef, useState } from "react";
import { ExternalLink, Star } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { googleReviews, reviewSources, testimonials, yandexReviews } from "@/lib/content";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { RevealText } from "@/components/ui/RevealText";
import { useReducedMotion, useMounted } from "@/hooks/useReducedMotion";

gsap.registerPlugin(useGSAP);

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
  const contentRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const reducedMotion = useReducedMotion();
  const mounted = useMounted();

  const goToSlide = (index: number) => {
    if (!contentRef.current || reducedMotion) {
      setActiveIndex(index);
      return;
    }

    gsap.to(contentRef.current, {
      opacity: 0,
      y: 10,
      duration: 0.3,
      onComplete: () => {
        setActiveIndex(index);
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
        );
      },
    });
  };

  useGSAP(
    () => {
      if (!mounted || reducedMotion) return;

      const startAutoplay = () => {
        intervalRef.current = setInterval(() => {
          setActiveIndex((prev) => {
            const next = (prev + 1) % testimonials.length;
            if (contentRef.current) {
              gsap.fromTo(
                contentRef.current,
                { opacity: 0.6 },
                { opacity: 1, duration: 0.5 },
              );
            }
            return next;
          });
        }, 6000);
      };

      startAutoplay();
      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    },
    { dependencies: [mounted, reducedMotion] },
  );

  const current = testimonials[activeIndex];
  const currentSource = reviewSources[current.source];

  return (
    <section
      id="testimonials"
      className="bg-card py-24 md:py-32"
      aria-labelledby="testimonials-heading"
      onMouseEnter={() => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }}
      onMouseLeave={() => {
        if (reducedMotion) return;
        intervalRef.current = setInterval(() => {
          setActiveIndex((prev) => (prev + 1) % testimonials.length);
        }, 6000);
      }}
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <RevealText className="mb-16 text-center">
          <SectionLabel>Отзывы</SectionLabel>
          <h2
            id="testimonials-heading"
            className="font-serif text-4xl font-medium md:text-5xl"
          >
            Слова клиентов
          </h2>
          <div className="mx-auto mt-8 flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-12">
            <SourceRating
              rating={yandexReviews.rating}
              count={yandexReviews.count}
              label={yandexReviews.label}
            />
            <div className="hidden h-12 w-px bg-border sm:block" aria-hidden="true" />
            <SourceRating
              rating={googleReviews.rating}
              count={googleReviews.count}
              label={googleReviews.label}
            />
          </div>
        </RevealText>

        <div className="mx-auto max-w-3xl text-center">
          <div ref={contentRef} className="min-h-[220px]">
            <blockquote>
              <p className="font-serif text-2xl leading-relaxed font-medium md:text-3xl">
                &ldquo;{current.text}&rdquo;
              </p>
            </blockquote>
            <footer className="mt-8">
              <cite className="not-italic">
                <span className="block font-medium">{current.author}</span>
                <span className="mt-1 block text-sm text-muted">
                  {current.date} · {currentSource.label}
                </span>
              </cite>
            </footer>
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

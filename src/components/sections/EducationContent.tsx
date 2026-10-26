"use client";

import Image from "next/image";
import { education } from "@/lib/content";
import { assetPath } from "@/lib/assetPath";
import { useBooking } from "@/components/booking/BookingProvider";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function EducationContent() {
  const { openTrainingBooking } = useBooking();

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <SectionLabel>Обучение</SectionLabel>
        <h1 className="mt-4 font-serif text-4xl font-medium md:text-6xl">
          {education.title}
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted">
          {education.invite}
        </p>

        <div className="mt-10 overflow-hidden rounded-3xl border border-border bg-card">
          <Image
            src={assetPath(education.programPhoto.src)}
            alt={education.programPhoto.alt}
            width={education.programPhoto.width}
            height={education.programPhoto.height}
            className="h-auto w-full"
            sizes="(max-width: 768px) 100vw, 48rem"
            priority
          />
        </div>

        <div className="mt-10 space-y-6 rounded-3xl border border-border bg-card p-6 md:p-8">
          <p className="text-sm leading-relaxed text-muted">
            {education.schoolLabel}{" "}
            <span className="font-medium text-accent">{education.school}</span>
          </p>

          <dl className="grid gap-5 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-medium tracking-widest text-accent uppercase">
                Время проведения
              </dt>
              <dd className="mt-2 font-medium">{education.schedule}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium tracking-widest text-accent uppercase">
                Даты
              </dt>
              <dd className="mt-2 font-medium">
                Старт: {education.startDate}
                <br />
                Окончание: {education.endDate}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium tracking-widest text-accent uppercase">
                Стоимость
              </dt>
              <dd className="mt-2 font-medium">{education.price}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium tracking-widest text-accent uppercase">
                Место проведения
              </dt>
              <dd className="mt-2 font-medium">{education.place}</dd>
            </div>
          </dl>

          <div>
            <p className="text-xs font-medium tracking-widest text-accent uppercase">
              Курс включает
            </p>
            <ul className="mt-4 space-y-3">
              {education.includes.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-sm leading-relaxed text-muted md:text-base"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Button className="mt-10 w-full sm:w-auto" onClick={openTrainingBooking}>
          {education.ctaLabel}
        </Button>
      </div>
    </section>
  );
}

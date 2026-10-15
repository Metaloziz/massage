import type { Metadata } from "next";
import Link from "next/link";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { site } from "@/lib/content";
import { absoluteUrl, ogImageUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: `Услуги — ${site.name}`,
  description:
    "Кинезиомассаж и общеоздоровительный массаж в Минске и Молодечно. Диагностика, техники, длительность сеансов и цены.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: `Услуги — ${site.name}`,
    description:
      "Кинезиомассаж и общеоздоровительный массаж: для кого подходит, что входит в сеанс и сколько стоит.",
    url: absoluteUrl("/services"),
    images: [{ url: ogImageUrl, alt: `${site.name} — услуги` }],
  },
};

export default function ServicesPage() {
  return (
    <main className="pt-20">
      <section className="border-b border-border bg-card py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
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
              className="rounded-full border border-border px-4 py-2 transition-colors hover:border-accent hover:text-accent"
            >
              Кинезиомассаж
            </Link>
            <Link
              href="#wellness"
              className="rounded-full border border-border px-4 py-2 transition-colors hover:border-accent hover:text-accent"
            >
              Общеоздоровительный
            </Link>
          </div>
        </div>
      </section>

      <ServiceDetail serviceId="kinesio" />
      <ServiceDetail serviceId="wellness" />
    </main>
  );
}

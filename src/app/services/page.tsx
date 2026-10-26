import type { Metadata } from "next";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { ServicesPageIntro } from "@/components/sections/ServicesPageIntro";
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
      <ServicesPageIntro />
      <ServiceDetail serviceId="kinesio" />
      <ServiceDetail serviceId="wellness" />
    </main>
  );
}

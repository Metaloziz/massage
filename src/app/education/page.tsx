import type { Metadata } from "next";
import { EducationContent } from "@/components/sections/EducationContent";
import { education, site } from "@/lib/content";
import { absoluteUrl, ogImageUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: `Обучение — ${site.name}`,
  description: `${education.invite} Старт ${education.startDate}, стоимость ${education.price}.`,
  alternates: {
    canonical: "/education",
  },
  openGraph: {
    title: `Обучение — ${site.name}`,
    description: `${education.invite} ${education.schedule}. Стоимость ${education.price}.`,
    url: absoluteUrl("/education"),
    images: [{ url: ogImageUrl, alt: `${site.name} — обучение` }],
  },
};

export default function EducationPage() {
  return (
    <main className="pt-20">
      <EducationContent />
    </main>
  );
}

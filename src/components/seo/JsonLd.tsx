import {
  googleReviews,
  locations,
  services,
  site,
  yandexReviews,
} from "@/lib/content";
import { siteUrl } from "@/lib/seo";

const tyurliLocation = locations.find((location) => location.id === "tyurli");
const minskLocation = locations.find((location) => location.id === "minsk");
const locationById = Object.fromEntries(
  locations.map((location) => [location.id, location]),
);

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.title,
  telephone: site.phone,
  url: siteUrl,
  sameAs: [
    site.social.instagram,
    site.social.telegram,
    yandexReviews.url,
    googleReviews.url,
  ],
  areaServed: ["Минск", "Молодечно", "Минская область"],
};

const minskBusinessSchema = minskLocation
  ? {
      "@context": "https://schema.org",
      "@type": "HealthAndBeautyBusiness",
      name: `${minskLocation.name} — ${site.name}`,
      description: site.description,
      telephone: site.phone,
      url: siteUrl,
      address: {
        "@type": "PostalAddress",
        streetAddress: "ул. Тепличная, 1",
        addressLocality: "Минск",
        addressCountry: "BY",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 53.920126,
        longitude: 27.6420763,
      },
      areaServed: "Минск",
      sameAs: [googleReviews.url],
    }
  : null;

const tyurliBusinessSchema = tyurliLocation
  ? {
      "@context": "https://schema.org",
      "@type": "HealthAndBeautyBusiness",
      name: `${tyurliLocation.name} — ${site.name}`,
      description: site.description,
      telephone: site.phone,
      url: siteUrl,
      address: {
        "@type": "PostalAddress",
        streetAddress: "ул. Южная, 6",
        addressLocality: "Тюрли",
        addressRegion: "Минская область",
        addressCountry: "BY",
      },
      areaServed: ["Молодечно", "Минская область"],
      sameAs: [yandexReviews.url],
    }
  : null;

const serviceSchemas = services.map((service) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: service.title,
  description: service.description,
  provider: {
    "@type": "Person",
    name: site.name,
  },
  areaServed: ["Минск", "Молодечно"],
  offers: service.pricing.flatMap((tier) =>
    tier.items.map((price) => ({
      "@type": "Offer",
      description: `${locationById[tier.locationId].fullAddress} — ${price}`,
      priceCurrency: "BYN",
    })),
  ),
}));

const schemas = [
  personSchema,
  minskBusinessSchema,
  tyurliBusinessSchema,
  ...serviceSchemas,
].filter(Boolean);

export function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
    />
  );
}

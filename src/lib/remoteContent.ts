import {
  education as defaultEducation,
  locations as defaultLocations,
  services as defaultServices,
  site as defaultSite,
  type SessionServiceId,
} from "@/lib/content";
import { formatDisplayDate, formatEducationPrice } from "@/lib/formatDisplay";

export type SiteData = {
  name: string;
  givenName: string;
  brandLatin: string;
  brandDisplay: string;
  title: string;
  tagline: string;
  slogan: string;
  description: string;
  experience: string;
  regionLabel: string;
  metaLine: string;
  phone: string;
  phoneHref: string;
  phoneDigits: string;
  hours: string;
  payment: string;
  unp: string;
  social: {
    instagram: string;
    instagramHandle: string;
    telegram: string;
    telegramHandle: string;
    whatsapp: string;
    viber: string;
  };
};

export type ServicePricingTier = {
  locationId: string;
  items: string[];
};

export type ServiceData = {
  id: SessionServiceId;
  title: string;
  shortDescription: string;
  ctaLabel: string;
  accent: "session" | "wellness";
  definition: string;
  tagline: string;
  beforeSession: readonly string[];
  forWhom: readonly string[];
  duration: readonly string[];
  includes: readonly string[];
  afterSession: readonly string[];
  pros: readonly string[];
  cons: readonly string[];
  pricing: ServicePricingTier[];
};

export type EducationData = {
  title: string;
  invite: string;
  school: string;
  schoolLabel: string;
  schedule: string;
  startDate: string;
  endDate: string;
  price: string;
  place: string;
  includes: readonly string[];
  programPhoto: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  courseOptions: readonly { id: string; label: string }[];
  startDates: readonly { id: string; label: string }[];
  ctaLabel: string;
};

export type LocationData = {
  id: string;
  label: string;
  name: string;
  city: string;
  district: string;
  seoArea?: string;
  address: string;
  fullAddress: string;
  directions?: string;
  howToFind: {
    city: string;
    addressLine: string;
    text: string;
  };
  mapUrl: string;
  mapLabel: string;
  hours: string;
  available: boolean;
  images: {
    cabinet: readonly { src: string; alt: string }[];
    directions: readonly { src: string; alt: string }[];
  };
};

export type ContentBundle = {
  site: SiteData;
  services: ServiceData[];
  education: EducationData;
  locations: LocationData[];
};

export type RemoteSitePayload = {
  phone?: string;
  phoneHref?: string;
  phoneDigits?: string;
  hours?: string;
  payment?: string;
  unp?: string;
  social?: Partial<SiteData["social"]>;
};

export type RemoteServicePayload = {
  id: string;
  title?: string;
  shortDescription?: string;
  ctaLabel?: string;
};

export type RemotePricingRow = {
  serviceId: string;
  locationId: string;
  price: string;
};

export type RemoteEducationPayload = {
  schedule?: string;
  startDate?: string;
  endDate?: string;
  price?: string;
  place?: string;
  ctaLabel?: string;
};

export type RemoteLocationPayload = {
  id: string;
  address?: string;
  fullAddress?: string;
  mapUrl?: string;
  hours?: string;
  available?: boolean;
};

export type RemoteContentPayload = {
  ok: boolean;
  site?: RemoteSitePayload;
  services?: RemoteServicePayload[];
  pricing?: RemotePricingRow[];
  education?: RemoteEducationPayload;
  locations?: RemoteLocationPayload[];
  updatedAt?: string;
  error?: string;
};

function cloneSite(): SiteData {
  return {
    ...defaultSite,
    social: { ...defaultSite.social },
  };
}

function cloneServices(): ServiceData[] {
  return defaultServices.map((service) => ({
    ...service,
    pricing: service.pricing.map((tier) => ({
      locationId: tier.locationId,
      items: [...tier.items],
    })),
  }));
}

function cloneEducation(): EducationData {
  return {
    ...defaultEducation,
    courseOptions: [...defaultEducation.courseOptions],
    startDates: [...defaultEducation.startDates],
    includes: [...defaultEducation.includes],
    programPhoto: { ...defaultEducation.programPhoto },
  };
}

function cloneLocations(): LocationData[] {
  return defaultLocations.map((location) => ({
    ...location,
    howToFind: { ...location.howToFind },
    images: {
      cabinet: [...location.images.cabinet],
      directions: [...location.images.directions],
    },
  }));
}

export function getDefaultContent(): ContentBundle {
  return {
    site: cloneSite(),
    services: cloneServices(),
    education: cloneEducation(),
    locations: cloneLocations(),
  };
}

function pickNonEmpty(value: string | undefined, fallback: string): string {
  const trimmed = value?.trim();
  return trimmed ? trimmed : fallback;
}

function groupPricing(
  rows: RemotePricingRow[],
): Map<string, ServicePricingTier[]> {
  const byService = new Map<string, Map<string, string[]>>();

  for (const row of rows) {
    const serviceId = row.serviceId.trim();
    const locationId = row.locationId.trim();
    const price = row.price.trim();
    if (!serviceId || !locationId || !price) continue;

    let byLocation = byService.get(serviceId);
    if (!byLocation) {
      byLocation = new Map();
      byService.set(serviceId, byLocation);
    }

    const items = byLocation.get(locationId) ?? [];
    items.push(price);
    byLocation.set(locationId, items);
  }

  const result = new Map<string, ServicePricingTier[]>();
  for (const [serviceId, byLocation] of byService) {
    result.set(
      serviceId,
      [...byLocation.entries()].map(([locationId, items]) => ({
        locationId,
        items,
      })),
    );
  }
  return result;
}

export function mergeRemoteContent(
  base: ContentBundle,
  remote: RemoteContentPayload,
): ContentBundle {
  const next: ContentBundle = {
    site: { ...base.site, social: { ...base.site.social } },
    services: base.services.map((service) => ({
      ...service,
      pricing: service.pricing.map((tier) => ({
        locationId: tier.locationId,
        items: [...tier.items],
      })),
    })),
    education: {
      ...base.education,
      courseOptions: [...base.education.courseOptions],
      startDates: [...base.education.startDates],
      includes: [...base.education.includes],
      programPhoto: { ...base.education.programPhoto },
    },
    locations: base.locations.map((location) => ({
      ...location,
      howToFind: { ...location.howToFind },
      images: {
        cabinet: [...location.images.cabinet],
        directions: [...location.images.directions],
      },
    })),
  };

  if (remote.site) {
    const s = remote.site;
    next.site.phone = pickNonEmpty(s.phone, next.site.phone);
    next.site.phoneHref = pickNonEmpty(s.phoneHref, next.site.phoneHref);
    next.site.phoneDigits = pickNonEmpty(s.phoneDigits, next.site.phoneDigits);
    next.site.hours = pickNonEmpty(s.hours, next.site.hours);
    next.site.payment = pickNonEmpty(s.payment, next.site.payment);
    next.site.unp = pickNonEmpty(s.unp, next.site.unp);
    if (s.social) {
      next.site.social = {
        instagram: pickNonEmpty(s.social.instagram, next.site.social.instagram),
        instagramHandle: pickNonEmpty(
          s.social.instagramHandle,
          next.site.social.instagramHandle,
        ),
        telegram: pickNonEmpty(s.social.telegram, next.site.social.telegram),
        telegramHandle: pickNonEmpty(
          s.social.telegramHandle,
          next.site.social.telegramHandle,
        ),
        whatsapp: pickNonEmpty(s.social.whatsapp, next.site.social.whatsapp),
        viber: pickNonEmpty(s.social.viber, next.site.social.viber),
      };
    }
  }

  if (remote.services?.length) {
    const byId = new Map(remote.services.map((item) => [item.id, item]));
    next.services = next.services.map((service) => {
      const remoteService = byId.get(service.id);
      if (!remoteService) return service;
      return {
        ...service,
        title: pickNonEmpty(remoteService.title, service.title),
        shortDescription: pickNonEmpty(
          remoteService.shortDescription,
          service.shortDescription,
        ),
        ctaLabel: pickNonEmpty(remoteService.ctaLabel, service.ctaLabel),
      };
    });
  }

  if (remote.pricing?.length) {
    const pricingByService = groupPricing(remote.pricing);
    next.services = next.services.map((service) => {
      const tiers = pricingByService.get(service.id);
      if (!tiers?.length) return service;
      return { ...service, pricing: tiers };
    });
  }

  if (remote.education) {
    const e = remote.education;
    const startDate = formatDisplayDate(
      pickNonEmpty(e.startDate, next.education.startDate),
    );
    const endDate = formatDisplayDate(
      pickNonEmpty(e.endDate, next.education.endDate),
    );
    next.education = {
      ...next.education,
      schedule: pickNonEmpty(e.schedule, next.education.schedule),
      startDate,
      endDate,
      price: formatEducationPrice(
        pickNonEmpty(e.price, next.education.price),
      ),
      place: pickNonEmpty(e.place, next.education.place),
      ctaLabel: pickNonEmpty(e.ctaLabel, next.education.ctaLabel),
      startDates: e.startDate?.trim()
        ? [{ id: "remote-start", label: startDate }]
        : next.education.startDates,
    };
  }

  if (remote.locations?.length) {
    const byId = new Map(remote.locations.map((item) => [item.id, item]));
    next.locations = next.locations.map((location) => {
      const remoteLocation = byId.get(location.id);
      if (!remoteLocation) return location;
      return {
        ...location,
        address: pickNonEmpty(remoteLocation.address, location.address),
        fullAddress: pickNonEmpty(
          remoteLocation.fullAddress,
          location.fullAddress,
        ),
        mapUrl: pickNonEmpty(remoteLocation.mapUrl, location.mapUrl),
        hours: pickNonEmpty(remoteLocation.hours, location.hours),
        available:
          typeof remoteLocation.available === "boolean"
            ? remoteLocation.available
            : location.available,
      };
    });
  }

  return next;
}

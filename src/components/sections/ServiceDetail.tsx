"use client";

import { locations, type SessionServiceId, services, site } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";

const locationById = Object.fromEntries(
  locations.map((location) => [location.id, location]),
);

function BulletList({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-4 space-y-3">
      {items.map((item) => (
        <li
          key={item}
          className="flex gap-3 text-sm leading-relaxed text-muted md:text-base"
        >
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
          {item}
        </li>
      ))}
    </ul>
  );
}

function DetailBlock({
  title,
  items,
}: {
  title: string;
  items: readonly string[];
}) {
  return (
    <div className="mt-10">
      <h3 className="font-serif text-xl font-medium md:text-2xl">{title}</h3>
      <BulletList items={items} />
    </div>
  );
}

export function ServiceDetail({ serviceId }: { serviceId: SessionServiceId }) {
  const service = services.find((item) => item.id === serviceId);

  if (!service) return null;

  return (
    <article
      id={service.id}
      className="border-b border-border py-16 last:border-b-0 md:py-24"
    >
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <SectionLabel>
          {service.id === "kinesio" ? "Кинезиомассаж" : "Общеоздоровительный"}
        </SectionLabel>
        <h2 className="mt-4 font-serif text-4xl font-medium md:text-5xl">
          {service.title}
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-muted">
          {service.definition}
        </p>
        <p className="mt-4 font-medium text-foreground">{service.tagline}</p>

        <DetailBlock title="Перед сеансом" items={service.beforeSession} />
        <DetailBlock title="Для кого подходит" items={service.forWhom} />
        <DetailBlock
          title="Продолжительность и количество"
          items={service.duration}
        />
        <DetailBlock title="Что входит" items={service.includes} />
        <DetailBlock title="Что вы получаете после" items={service.afterSession} />
        <DetailBlock title="Плюсы" items={service.pros} />
        <DetailBlock title="Минусы" items={service.cons} />

        <div className="mt-10 rounded-3xl border border-border bg-card p-6 md:p-8">
          <h3 className="font-serif text-xl font-medium">Стоимость</h3>
          <p className="mt-2 text-sm text-muted">
            Стоимость зависит от кабинета и длительности — уточняйте при записи.
          </p>
          <div className="mt-6 space-y-4">
            {service.pricing.map((tier) => (
              <div key={tier.locationId}>
                <p className="text-sm font-medium">
                  {locationById[tier.locationId].fullAddress}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {tier.items.map((price) => (
                    <span
                      key={price}
                      className="rounded-full bg-accent-light px-3 py-1 text-sm font-medium text-accent"
                    >
                      {price}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <Button href={site.phoneHref} className="mt-8 w-full sm:w-auto">
          {service.ctaLabel}
        </Button>
      </div>
    </article>
  );
}

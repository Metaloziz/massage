"use client";

import { useState, useEffect, type FormEvent } from "react";
import { CheckCircle } from "lucide-react";
import { services, site } from "@/lib/content";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { RevealText } from "@/components/ui/RevealText";

type FormData = {
  name: string;
  phone: string;
  service: string;
  date: string;
  comment: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const initialForm: FormData = {
  name: "",
  phone: "",
  service: "",
  date: "",
  comment: "",
};

function validateForm(data: FormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.name.trim()) {
    errors.name = "Введите имя";
  } else if (data.name.trim().length < 2) {
    errors.name = "Имя слишком короткое";
  }

  const phoneDigits = data.phone.replace(/\D/g, "");
  if (!phoneDigits) {
    errors.phone = "Введите номер телефона";
  } else if (phoneDigits.length < 12) {
    errors.phone = "Введите корректный номер (+375...)";
  }

  if (!data.service) {
    errors.service = "Выберите услугу";
  }

  if (!data.date) {
    errors.date = "Выберите дату";
  }

  return errors;
}

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "");

  if (!digits.startsWith("375")) {
    const rest = digits.slice(0, 9);
    if (rest.length === 0) return "+375 ";
    if (rest.length <= 2) return `+375 (${rest}`;
    if (rest.length <= 5) return `+375 (${rest.slice(0, 2)}) ${rest.slice(2)}`;
    if (rest.length <= 7)
      return `+375 (${rest.slice(0, 2)}) ${rest.slice(2, 5)}-${rest.slice(5)}`;
    return `+375 (${rest.slice(0, 2)}) ${rest.slice(2, 5)}-${rest.slice(5, 7)}-${rest.slice(7, 9)}`;
  }

  const local = digits.slice(3, 12);
  if (local.length === 0) return "+375 ";
  if (local.length <= 2) return `+375 (${local}`;
  if (local.length <= 5) return `+375 (${local.slice(0, 2)}) ${local.slice(2)}`;
  if (local.length <= 7)
    return `+375 (${local.slice(0, 2)}) ${local.slice(2, 5)}-${local.slice(5)}`;
  return `+375 (${local.slice(0, 2)}) ${local.slice(2, 5)}-${local.slice(5, 7)}-${local.slice(7, 9)}`;
}

export function Booking() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [today, setToday] = useState("");

  useEffect(() => {
    setToday(new Date().toISOString().split("T")[0]);
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateForm(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setSubmitted(true);
  };

  const handleChange = (field: keyof FormData, value: string) => {
    const nextValue = field === "phone" ? formatPhone(value) : value;
    setForm((prev) => ({ ...prev, [field]: nextValue }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  if (submitted) {
    return (
      <section
        id="booking"
        className="bg-card py-24 md:py-32"
        aria-labelledby="booking-heading"
      >
        <div className="mx-auto max-w-xl px-5 text-center md:px-8">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent-light text-accent">
            <CheckCircle size={32} />
          </div>
          <h2 className="font-serif text-3xl font-medium md:text-4xl">
            Заявка отправлена
          </h2>
          <p className="mt-4 text-muted">
            Спасибо, {form.name}! Я свяжусь с вами в ближайшее время для
            подтверждения записи.
          </p>
          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setForm(initialForm);
            }}
            className="mt-8 text-sm text-accent underline-offset-4 hover:underline"
          >
            Отправить ещё одну заявку
          </button>
        </div>
      </section>
    );
  }

  return (
    <section
      id="booking"
      className="bg-card py-24 md:py-32"
      aria-labelledby="booking-heading"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-16 lg:grid-cols-2">
          <RevealText>
            <SectionLabel>Запись</SectionLabel>
            <h2
              id="booking-heading"
              className="font-serif text-4xl font-medium md:text-5xl"
            >
              Запишитесь на сеанс
            </h2>
            <p className="mt-6 max-w-md text-muted">
              Оставьте заявку — я перезвоню в течение нескольких часов, чтобы
              подтвердить время и ответить на вопросы.
            </p>
            <div className="mt-8 space-y-2 text-sm text-muted">
              <p>{site.address}</p>
              <p>{site.hours}</p>
              <a href={site.phoneHref} className="block text-accent hover:underline">
                {site.phone}
              </a>
            </div>
          </RevealText>

          <RevealText delay={0.15}>
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-border bg-background p-6 md:p-8"
              noValidate
            >
              <div className="space-y-5">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium">
                    Имя
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className="w-full rounded-xl border border-border bg-card px-4 py-3 text-base outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
                    placeholder="Ваше имя"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-1.5 text-sm text-red-600">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="mb-2 block text-sm font-medium">
                    Телефон
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className="w-full rounded-xl border border-border bg-card px-4 py-3 text-base outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
                    placeholder="+375 (29) 123-45-67"
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                  />
                  {errors.phone && (
                    <p id="phone-error" className="mt-1.5 text-sm text-red-600">
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="service" className="mb-2 block text-sm font-medium">
                    Услуга
                  </label>
                  <select
                    id="service"
                    value={form.service}
                    onChange={(e) => handleChange("service", e.target.value)}
                    className="w-full rounded-xl border border-border bg-card px-4 py-3 text-base outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
                    aria-invalid={!!errors.service}
                    aria-describedby={errors.service ? "service-error" : undefined}
                  >
                    <option value="">Выберите услугу</option>
                    {services.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.title} — {service.price}
                      </option>
                    ))}
                  </select>
                  {errors.service && (
                    <p id="service-error" className="mt-1.5 text-sm text-red-600">
                      {errors.service}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="date" className="mb-2 block text-sm font-medium">
                    Желаемая дата
                  </label>
                  <input
                    id="date"
                    type="date"
                    min={today || undefined}
                    value={form.date}
                    onChange={(e) => handleChange("date", e.target.value)}
                    className="w-full rounded-xl border border-border bg-card px-4 py-3 text-base outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
                    aria-invalid={!!errors.date}
                    aria-describedby={errors.date ? "date-error" : undefined}
                  />
                  {errors.date && (
                    <p id="date-error" className="mt-1.5 text-sm text-red-600">
                      {errors.date}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="comment" className="mb-2 block text-sm font-medium">
                    Комментарий <span className="text-muted">(необязательно)</span>
                  </label>
                  <textarea
                    id="comment"
                    rows={3}
                    value={form.comment}
                    onChange={(e) => handleChange("comment", e.target.value)}
                    className="w-full resize-none rounded-xl border border-border bg-card px-4 py-3 text-base outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
                    placeholder="Расскажите о ваших пожеланиях..."
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mt-8 w-full rounded-full bg-foreground py-4 text-base font-medium text-background transition-opacity hover:opacity-85"
              >
                Отправить заявку
              </button>
            </form>
          </RevealText>
        </div>
      </div>
    </section>
  );
}

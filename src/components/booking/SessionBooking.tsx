"use client";

import { useEffect, useMemo, useState } from "react";
import { MessageCircle, Phone, Send } from "lucide-react";
import {
  bookingChannels,
  buildChannelHref,
  getServiceById,
  sessionBookingMessage,
  services,
  site,
  type BookingChannelId,
  type SessionServiceId,
} from "@/lib/content";
import { sessionSchedule } from "@/data/schedule";
import { BookingModal } from "@/components/booking/BookingModal";
import { Button } from "@/components/ui/Button";

type SessionBookingProps = {
  open: boolean;
  initialServiceId?: SessionServiceId;
  onClose: () => void;
};

const channelIcons = {
  telegram: Send,
  whatsapp: MessageCircle,
  viber: MessageCircle,
  phone: Phone,
} as const;

function todayIsoDate() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

export function SessionBooking({
  open,
  initialServiceId,
  onClose,
}: SessionBookingProps) {
  const [channelId, setChannelId] = useState<BookingChannelId | null>(null);
  const [serviceId, setServiceId] = useState<SessionServiceId | null>(
    initialServiceId ?? null,
  );
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const minDate = useMemo(() => todayIsoDate(), []);

  useEffect(() => {
    if (!open) return;
    setChannelId(null);
    setServiceId(initialServiceId ?? null);
    setPreferredDate("");
    setPreferredTime(null);
    setCopied(false);
  }, [open, initialServiceId]);

  const step = !channelId ? 1 : !serviceId ? 2 : 3;
  const selectedService = serviceId ? getServiceById(serviceId) : undefined;
  const canOpenChannel = Boolean(preferredDate && preferredTime);
  const message =
    serviceId && preferredDate && preferredTime
      ? sessionBookingMessage(serviceId, {
          date: preferredDate,
          time: preferredTime,
        })
      : serviceId
        ? "Выберите удобные дату и время — текст сообщения появится здесь."
        : "";

  const handleOpenChannel = async () => {
    if (!channelId || !serviceId || !preferredDate || !preferredTime) return;

    const finalMessage = sessionBookingMessage(serviceId, {
      date: preferredDate,
      time: preferredTime,
    });
    const href = buildChannelHref(channelId, finalMessage);

    if (channelId === "viber") {
      try {
        await navigator.clipboard.writeText(finalMessage);
        setCopied(true);
      } catch {
        setCopied(false);
      }
    }

    window.open(href, "_blank", "noopener,noreferrer");
  };

  return (
    <BookingModal open={open} title="Записаться на сеанс" onClose={onClose}>
      <p className="mb-6 text-sm text-muted">
        Шаг {step} из 3
        {selectedService ? ` · ${selectedService.title}` : ""}
      </p>

      {!channelId && (
        <div className="space-y-3">
          <p className="mb-4 text-sm text-muted">
            Выберите удобный способ связи
          </p>
          {bookingChannels.map((channel) => {
            const Icon = channelIcons[channel.id];
            const className =
              "flex w-full items-center gap-4 rounded-2xl border border-border bg-card px-5 py-4 text-left transition-all hover:border-accent/40 hover:shadow-md";

            if (channel.id === "phone") {
              return (
                <a
                  key={channel.id}
                  href={site.phoneHref}
                  className={className}
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-light text-accent">
                    <Icon size={20} />
                  </span>
                  <span className="font-medium">{channel.label}</span>
                </a>
              );
            }

            return (
              <button
                key={channel.id}
                type="button"
                onClick={() => setChannelId(channel.id)}
                className={className}
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-light text-accent">
                  <Icon size={20} />
                </span>
                <span className="font-medium">{channel.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {channelId && !serviceId && (
        <div className="space-y-3">
          <p className="mb-4 text-sm text-muted">Выберите услугу</p>
          {services.map((service) => (
            <button
              key={service.id}
              type="button"
              onClick={() => setServiceId(service.id)}
              className="w-full rounded-2xl border border-border bg-card px-5 py-4 text-left transition-all hover:border-accent/40 hover:shadow-md"
            >
              <p className="font-medium">{service.title}</p>
              <p className="mt-2 text-sm text-muted">
                {service.shortDescription}
              </p>
            </button>
          ))}
          <Button
            variant="ghost"
            className="mt-2 w-full"
            onClick={() => setChannelId(null)}
          >
            Назад
          </Button>
        </div>
      )}

      {channelId && serviceId && (
        <div className="space-y-5">
          <label className="block space-y-2">
            <span className="text-sm font-medium">Удобная дата</span>
            <input
              type="date"
              min={minDate}
              value={preferredDate}
              onChange={(event) => setPreferredDate(event.target.value)}
              className="w-full rounded-2xl border border-border bg-card px-4 py-3 outline-none transition-colors focus:border-accent"
            />
          </label>

          <div className="space-y-2">
            <span className="text-sm font-medium">Удобное время</span>
            <div className="grid grid-cols-3 gap-2">
              {sessionSchedule.timeSlots.map((slot) => {
                const selected = preferredTime === slot.label;
                return (
                  <button
                    key={slot.id}
                    type="button"
                    onClick={() => setPreferredTime(slot.label)}
                    className={`rounded-2xl border px-3 py-3 text-sm font-medium transition-all ${
                      selected
                        ? "border-accent bg-accent-light text-foreground"
                        : "border-border bg-card hover:border-accent/40"
                    }`}
                  >
                    {slot.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5">
            <p className="text-xs font-medium tracking-widest text-accent uppercase">
              Текст сообщения
            </p>
            <p className="mt-3 text-sm leading-relaxed whitespace-pre-wrap">
              {message}
            </p>
          </div>

          {channelId === "viber" && (
            <p className="text-sm text-muted">
              {copied
                ? "Текст скопирован — вставьте его в чат Viber."
                : "Откроется Viber. При необходимости скопируйте текст выше вручную."}
            </p>
          )}

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              className="flex-1"
              disabled={!canOpenChannel}
              onClick={handleOpenChannel}
            >
              Открыть мессенджер
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => {
                if (initialServiceId) {
                  setChannelId(null);
                } else {
                  setServiceId(null);
                }
              }}
            >
              Назад
            </Button>
          </div>
        </div>
      )}
    </BookingModal>
  );
}

"use client";

import { useEffect, useState } from "react";
import { MessageCircle, Phone, Send } from "lucide-react";
import {
  bookingChannels,
  buildChannelHref,
  getServiceById,
  sessionBookingMessage,
  services,
  type BookingChannelId,
  type SessionServiceId,
} from "@/lib/content";
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

export function SessionBooking({
  open,
  initialServiceId,
  onClose,
}: SessionBookingProps) {
  const [channelId, setChannelId] = useState<BookingChannelId | null>(null);
  const [serviceId, setServiceId] = useState<SessionServiceId | null>(
    initialServiceId ?? null,
  );
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!open) return;
    setChannelId(null);
    setServiceId(initialServiceId ?? null);
    setCopied(false);
  }, [open, initialServiceId]);

  const step = !channelId ? 1 : !serviceId ? 2 : 3;
  const selectedService = serviceId ? getServiceById(serviceId) : undefined;
  const message = serviceId ? sessionBookingMessage(serviceId) : "";

  const handleOpenChannel = async () => {
    if (!channelId || !serviceId) return;

    const href = buildChannelHref(channelId, message);

    if (channelId === "viber") {
      try {
        await navigator.clipboard.writeText(message);
        setCopied(true);
      } catch {
        setCopied(false);
      }
    }

    if (channelId === "phone") {
      window.location.href = href;
      return;
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
            return (
              <button
                key={channel.id}
                type="button"
                onClick={() => setChannelId(channel.id)}
                className="flex w-full items-center gap-4 rounded-2xl border border-border bg-card px-5 py-4 text-left transition-all hover:border-accent/40 hover:shadow-md"
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
          <Button variant="ghost" className="mt-2 w-full" onClick={() => setChannelId(null)}>
            Назад
          </Button>
        </div>
      )}

      {channelId && serviceId && (
        <div className="space-y-5">
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

          {channelId === "phone" && (
            <p className="text-sm text-muted">
              При звонке укажите услугу: {selectedService?.title}.
            </p>
          )}

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button className="flex-1" onClick={handleOpenChannel}>
              {channelId === "phone" ? "Позвонить" : "Открыть мессенджер"}
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

"use client";

import { Phone, Send } from "lucide-react";
import {
  bookingChannels,
  buildChannelHref,
  type BookingChannelId,
} from "@/lib/content";
import { BookingModal } from "@/components/booking/BookingModal";
import { useSite } from "@/components/content/ContentProvider";
import { useThemeFlags } from "@/hooks/useThemeId";
import { ViberIcon, WhatsAppIcon } from "@/components/icons/BrandIcons";

const channelIcons = {
  telegram: Send,
  whatsapp: WhatsAppIcon,
  viber: ViberIcon,
  phone: Phone,
} as const;

type ChannelPickerProps = {
  open: boolean;
  title: string;
  message?: string;
  onClose: () => void;
};

export function ChannelPicker({
  open,
  title,
  message,
  onClose,
}: ChannelPickerProps) {
  const { isDesign2 } = useThemeFlags();
  const site = useSite();

  const handleChannel = async (channelId: BookingChannelId) => {
    const href = buildChannelHref(channelId, message, site);

    if (channelId === "viber" && message) {
      try {
        await navigator.clipboard.writeText(message);
      } catch {
        /* clipboard may be denied */
      }
    }

    if (channelId === "phone") {
      window.location.assign(href);
    } else {
      window.open(href, "_blank", "noopener,noreferrer");
    }

    onClose();
  };

  const itemClass = isDesign2
    ? "border-[var(--line)] bg-[rgba(42,50,40,0.05)] hover:border-accent/50"
    : "border-border bg-card hover:border-accent/40 hover:shadow-md";

  return (
    <BookingModal open={open} title={title} onClose={onClose}>
      <p className="mb-4 text-sm text-muted">Выберите удобный способ связи</p>
      <div className="space-y-3">
        {bookingChannels.map((channel) => {
          const Icon = channelIcons[channel.id];
          return (
            <button
              key={channel.id}
              type="button"
              onClick={() => handleChannel(channel.id)}
              className={`flex w-full items-center gap-4 rounded-[var(--radius-card)] border px-5 py-4 text-left transition-all ${itemClass}`}
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-[var(--radius-control)] bg-accent-light text-accent">
                <Icon size={20} />
              </span>
              <span className="font-medium">{channel.label}</span>
            </button>
          );
        })}
      </div>
    </BookingModal>
  );
}

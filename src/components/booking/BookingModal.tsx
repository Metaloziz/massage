"use client";

import { useEffect, type ReactNode } from "react";
import { X } from "lucide-react";
import { lockBodyScroll } from "@/lib/scrollLock";
import { useThemeFlags } from "@/hooks/useThemeId";

type BookingModalProps = {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
};

export function BookingModal({
  open,
  title,
  onClose,
  children,
}: BookingModalProps) {
  const { isDesign2, isDesign3 } = useThemeFlags();

  useEffect(() => {
    if (!open) return;

    const unlock = lockBodyScroll();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      unlock();
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  const panel = isDesign2
    ? "border-white/15 bg-[var(--glass)] backdrop-blur-xl"
    : isDesign3
      ? "border-[rgba(42,50,40,0.12)] bg-[#ebe4d2] text-[#2a3228]"
      : "border-border bg-background";

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-foreground/40 p-0 sm:items-center sm:p-6"
      role="presentation"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-modal-title"
        data-lenis-prevent
        className={`max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-t-3xl border p-6 shadow-2xl sm:rounded-3xl sm:p-8 ${panel}`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <h2
            id="booking-modal-title"
            className="font-serif text-2xl font-medium md:text-3xl"
          >
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--line)] text-muted transition-colors hover:text-foreground"
            aria-label="Закрыть"
          >
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

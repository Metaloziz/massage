"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { SessionServiceId } from "@/lib/content";
import { getServiceById } from "@/lib/content";
import { ChannelPicker } from "@/components/booking/ChannelPicker";

type BookingKind = "session" | "training" | "generic";

type BookingContextValue = {
  openSessionBooking: (serviceId?: SessionServiceId) => void;
  openTrainingBooking: () => void;
  openBooking: () => void;
};

const BookingContext = createContext<BookingContextValue | null>(null);

function sessionMessage(serviceId?: SessionServiceId) {
  if (serviceId) {
    const service = getServiceById(serviceId);
    return `Здравствуйте! Хочу записаться на ${service?.title ?? "сеанс массажа"}.`;
  }
  return "Здравствуйте! Хочу записаться на сеанс массажа.";
}

export function BookingProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [kind, setKind] = useState<BookingKind>("generic");
  const [serviceId, setServiceId] = useState<SessionServiceId | undefined>();

  const close = useCallback(() => {
    setOpen(false);
    setServiceId(undefined);
  }, []);

  const openSessionBooking = useCallback((id?: SessionServiceId) => {
    setKind("session");
    setServiceId(id);
    setOpen(true);
  }, []);

  const openTrainingBooking = useCallback(() => {
    setKind("training");
    setServiceId(undefined);
    setOpen(true);
  }, []);

  const openBooking = useCallback(() => {
    setKind("generic");
    setServiceId(undefined);
    setOpen(true);
  }, []);

  const value = useMemo(
    () => ({ openSessionBooking, openTrainingBooking, openBooking }),
    [openSessionBooking, openTrainingBooking, openBooking],
  );

  const title =
    kind === "training"
      ? "Записаться на обучение"
      : kind === "session"
        ? "Записаться на сеанс"
        : "Записаться";

  const message =
    kind === "training"
      ? "Здравствуйте! Хочу записаться на обучение массажу."
      : kind === "session"
        ? sessionMessage(serviceId)
        : "Здравствуйте! Хочу записаться.";

  return (
    <BookingContext.Provider value={value}>
      {children}
      <ChannelPicker
        open={open}
        title={title}
        message={message}
        onClose={close}
      />
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within BookingProvider");
  }
  return context;
}

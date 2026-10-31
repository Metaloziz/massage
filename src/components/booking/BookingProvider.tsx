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
import { ChannelPicker } from "@/components/booking/ChannelPicker";
import { useContent } from "@/components/content/ContentProvider";

type BookingKind = "session" | "training" | "generic";

type BookingContextValue = {
  openSessionBooking: (serviceId?: SessionServiceId) => void;
  openTrainingBooking: () => void;
  openBooking: () => void;
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const { getServiceById } = useContent();
  const [open, setOpen] = useState(false);
  const [kind, setKind] = useState<BookingKind>("generic");
  const [serviceId, setServiceId] = useState<SessionServiceId | undefined>();

  const sessionMessage = useCallback(
    (id?: SessionServiceId) => {
      if (id) {
        const service = getServiceById(id);
        return `Здравствуйте! Хочу записаться на ${service?.title ?? "сеанс массажа"}.`;
      }
      return "Здравствуйте! Хочу записаться на сеанс массажа.";
    },
    [getServiceById],
  );

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

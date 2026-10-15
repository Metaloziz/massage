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
import { SessionBooking } from "@/components/booking/SessionBooking";
import { TrainingBooking } from "@/components/booking/TrainingBooking";

type BookingContextValue = {
  openSessionBooking: (serviceId?: SessionServiceId) => void;
  openTrainingBooking: () => void;
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [sessionOpen, setSessionOpen] = useState(false);
  const [sessionServiceId, setSessionServiceId] = useState<
    SessionServiceId | undefined
  >();
  const [trainingOpen, setTrainingOpen] = useState(false);

  const openSessionBooking = useCallback((serviceId?: SessionServiceId) => {
    setSessionServiceId(serviceId);
    setSessionOpen(true);
  }, []);

  const openTrainingBooking = useCallback(() => {
    setTrainingOpen(true);
  }, []);

  const value = useMemo(
    () => ({ openSessionBooking, openTrainingBooking }),
    [openSessionBooking, openTrainingBooking],
  );

  return (
    <BookingContext.Provider value={value}>
      {children}
      <SessionBooking
        open={sessionOpen}
        initialServiceId={sessionServiceId}
        onClose={() => {
          setSessionOpen(false);
          setSessionServiceId(undefined);
        }}
      />
      <TrainingBooking
        open={trainingOpen}
        onClose={() => setTrainingOpen(false)}
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

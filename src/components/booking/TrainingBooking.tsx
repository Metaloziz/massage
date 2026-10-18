"use client";

import { useEffect, useState, type FormEvent } from "react";
import { bookingInfo, education } from "@/lib/content";
import {
  formatTrainingGroupLabel,
  getTrainingGroupById,
  trainingGroups,
} from "@/data/schedule";
import { BookingModal } from "@/components/booking/BookingModal";
import { Button } from "@/components/ui/Button";

type TrainingBookingProps = {
  open: boolean;
  onClose: () => void;
};

type Step = "course" | "date" | "form" | "success";

export function TrainingBooking({ open, onClose }: TrainingBookingProps) {
  const [step, setStep] = useState<Step>("course");
  const [courseId, setCourseId] = useState<string | null>(null);
  const [dateId, setDateId] = useState<string | null>(null);
  const [groupId, setGroupId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (!open) return;
    setStep("course");
    setCourseId(null);
    setDateId(null);
    setGroupId(null);
    setName("");
    setPhone("");
  }, [open]);

  const selectedGroup = groupId ? getTrainingGroupById(groupId) : undefined;

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!name.trim() || !phone.trim() || !groupId) return;
    setStep("success");
  };

  const stepLabel =
    step === "course"
      ? "1 из 3"
      : step === "date"
        ? "2 из 3"
        : step === "form"
          ? "3 из 3"
          : null;

  return (
    <BookingModal open={open} title="Записаться на обучение" onClose={onClose}>
      {stepLabel && (
        <p className="mb-6 text-sm text-muted">Шаг {stepLabel}</p>
      )}

      {step === "course" && (
        <div className="space-y-3">
          <p className="mb-4 text-sm text-muted">Выберите вид обучения</p>
          {education.courseOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => {
                setCourseId(option.id);
                setStep("date");
              }}
              className="w-full rounded-2xl border border-border bg-card px-5 py-4 text-left font-medium transition-all hover:border-accent/40 hover:shadow-md"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}

      {step === "date" && (
        <div className="space-y-3">
          <p className="mb-4 text-sm text-muted">Выберите дату старта</p>
          {education.startDates.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => {
                setDateId(option.id);
                setStep("form");
              }}
              className="w-full rounded-2xl border border-border bg-card px-5 py-4 text-left font-medium transition-all hover:border-accent/40 hover:shadow-md"
            >
              {option.label}
            </button>
          ))}
          <Button
            variant="ghost"
            className="mt-2 w-full"
            onClick={() => setStep("course")}
          >
            Назад
          </Button>
        </div>
      )}

      {step === "form" && (
        <form className="space-y-4" onSubmit={handleSubmit}>
          <p className="text-sm text-muted">
            {education.courseOptions.find((item) => item.id === courseId)?.label}
            {" · "}
            {education.startDates.find((item) => item.id === dateId)?.label}
          </p>

          <label className="block space-y-2">
            <span className="text-sm font-medium">Имя</span>
            <input
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full rounded-2xl border border-border bg-card px-4 py-3 outline-none transition-colors focus:border-accent"
              autoComplete="name"
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-medium">Телефон</span>
            <input
              required
              type="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              className="w-full rounded-2xl border border-border bg-card px-4 py-3 outline-none transition-colors focus:border-accent"
              autoComplete="tel"
              placeholder="+375"
            />
          </label>

          <div className="space-y-2">
            <span className="text-sm font-medium">Группа</span>
            <div className="space-y-2">
              {trainingGroups.map((group) => {
                const selected = groupId === group.id;
                return (
                  <button
                    key={group.id}
                    type="button"
                    onClick={() => setGroupId(group.id)}
                    className={`w-full rounded-2xl border px-5 py-4 text-left transition-all ${
                      selected
                        ? "border-accent bg-accent-light"
                        : "border-border bg-card hover:border-accent/40"
                    }`}
                  >
                    <span className="font-medium">
                      {formatTrainingGroupLabel(group)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <Button type="submit" className="flex-1" disabled={!groupId}>
              Записаться
            </Button>
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => setStep("date")}
            >
              Назад
            </Button>
          </div>

          <p className="text-center text-sm text-muted">
            {bookingInfo.trainingNote}
          </p>
        </form>
      )}

      {step === "success" && (
        <div className="space-y-5 text-center">
          <p className="font-serif text-2xl font-medium">Заявка принята</p>
          <p className="text-muted">{bookingInfo.trainingNote}</p>
          {selectedGroup && (
            <p className="text-sm text-muted">
              {formatTrainingGroupLabel(selectedGroup)}
            </p>
          )}
          <Button className="w-full" onClick={onClose}>
            Закрыть
          </Button>
        </div>
      )}
    </BookingModal>
  );
}

/** Расписание и события — фронтовые данные (позже: Excel → этот модуль). */

export const sessionSchedule = {
  timeSlots: [
    { id: "10-00", label: "10:00" },
    { id: "11-00", label: "11:00" },
    { id: "12-00", label: "12:00" },
    { id: "14-00", label: "14:00" },
    { id: "15-00", label: "15:00" },
    { id: "16-00", label: "16:00" },
    { id: "17-00", label: "17:00" },
    { id: "18-00", label: "18:00" },
    { id: "19-00", label: "19:00" },
  ],
} as const;

export const trainingGroups = [
  {
    id: "weekend-morning",
    label: "Группа выходного дня утренняя",
  },
  {
    id: "weekday-evening",
    label: "Группа вечерняя по будням",
    timeRange: "17:30–20:30",
  },
  {
    id: "weekday-morning",
    label: "Утренняя по будням",
    timeRange: "9:00–12:00",
  },
] as const;

export type TrainingGroupId = (typeof trainingGroups)[number]["id"];

export function getTrainingGroupById(id: string) {
  return trainingGroups.find((group) => group.id === id);
}

export function formatTrainingGroupLabel(
  group: (typeof trainingGroups)[number],
): string {
  if ("timeRange" in group && group.timeRange) {
    return `${group.label} · ${group.timeRange}`;
  }
  return group.label;
}

import type { Session, Course } from "./course-data"

export interface SelectedSession {
  course: Course
  session: Session
}

export interface TimetableSlot {
  day: string
  hour: number
  sessions: SelectedSession[]
}

export interface ClashInfo {
  day: string
  hour: number
  sessions: SelectedSession[]
}

export type DayName = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday"

export const DAYS: DayName[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
export const HOURS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const

export const HOUR_LABELS: Record<number, string> = {
  1: "8:00 AM",
  2: "9:00 AM",
  3: "10:00 AM",
  4: "11:00 AM",
  5: "12:00 PM",
  6: "2:00 PM",
  7: "3:00 PM",
  8: "4:00 PM",
  9: "5:00 PM",
  10: "6:00 PM",
}

export const DAY_SHORT: Record<string, DayName> = {
  M: "Monday",
  T: "Tuesday",
  W: "Wednesday",
  Th: "Thursday",
  F: "Friday",
  S: "Saturday",
}

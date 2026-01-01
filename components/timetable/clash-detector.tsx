"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle, CheckCircle } from "lucide-react"
import type { Course, Session } from "@/lib/course-data"
import { DAY_SHORT } from "@/lib/timetable-types"

interface SelectedSession {
  course: Course
  session: Session
}

interface ClashInfo {
  day: string
  hour: number
  sessions: SelectedSession[]
}

interface ClashDetectorProps {
  selectedSessions: SelectedSession[]
}

function parseSessionSlots(session: Session): { day: string; hour: number }[] {
  const result: { day: string; hour: number }[] = []
  if (session.days === "TBA" || session.days === "-" || session.days === "Various") return result

  const dayTokens = session.days.split(" ").filter(Boolean)
  const hourStr = session.hours

  if (hourStr.includes(",")) {
    const hourParts = hourStr.split(",")
    dayTokens.forEach((dayToken, idx) => {
      const dayName = DAY_SHORT[dayToken]
      if (dayName) {
        const h = Number.parseInt(hourParts[idx] || hourParts[0])
        result.push({ day: dayName, hour: h })
      }
    })
  } else if (hourStr.includes("-")) {
    const [start, end] = hourStr.split("-").map(Number)
    dayTokens.forEach((dayToken) => {
      const dayName = DAY_SHORT[dayToken]
      if (dayName) {
        for (let h = start; h <= end; h++) {
          result.push({ day: dayName, hour: h })
        }
      }
    })
  } else {
    const hour = Number.parseInt(hourStr)
    dayTokens.forEach((dayToken) => {
      const dayName = DAY_SHORT[dayToken]
      if (dayName) {
        result.push({ day: dayName, hour })
      }
    })
  }

  return result
}

export function ClashDetector({ selectedSessions }: ClashDetectorProps) {
  // Build slot map
  const slotMap: Record<string, SelectedSession[]> = {}

  selectedSessions.forEach((selected) => {
    const slots = parseSessionSlots(selected.session)
    slots.forEach(({ day, hour }) => {
      const key = `${day}-${hour}`
      if (!slotMap[key]) slotMap[key] = []
      slotMap[key].push(selected)
    })
  })

  // Find clashes
  const clashes: ClashInfo[] = []
  Object.entries(slotMap).forEach(([key, sessions]) => {
    if (sessions.length > 1) {
      const [day, hourStr] = key.split("-")
      clashes.push({ day, hour: Number.parseInt(hourStr), sessions })
    }
  })

  if (clashes.length === 0) {
    return (
      <Alert className="border-green-500/30 bg-green-500/10">
        <CheckCircle className="h-4 w-4 text-green-500" />
        <AlertTitle className="text-green-400">No Clashes Detected</AlertTitle>
        <AlertDescription className="text-green-300/80">
          Your current selection has no time conflicts. Your timetable is valid!
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <Alert variant="destructive" className="border-red-500/30 bg-red-500/10">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Time Clash Detected ({clashes.length})</AlertTitle>
      <AlertDescription className="mt-2 space-y-2">
        {clashes.map((clash, idx) => (
          <div key={idx} className="text-sm">
            <span className="font-medium">
              {clash.day} Hour {clash.hour}:
            </span>{" "}
            {clash.sessions.map((s) => `${s.course.name} (${s.session.section})`).join(" vs ")}
          </div>
        ))}
      </AlertDescription>
    </Alert>
  )
}

export function getClashingSessions(selectedSessions: SelectedSession[]): Set<string> {
  const slotMap: Record<string, SelectedSession[]> = {}
  const clashing = new Set<string>()

  selectedSessions.forEach((selected) => {
    const slots = parseSessionSlots(selected.session)
    slots.forEach(({ day, hour }) => {
      const key = `${day}-${hour}`
      if (!slotMap[key]) slotMap[key] = []
      slotMap[key].push(selected)
    })
  })

  Object.values(slotMap).forEach((sessions) => {
    if (sessions.length > 1) {
      sessions.forEach((s) => {
        clashing.add(`${s.course.id}-${s.session.type}-${s.session.section}`)
      })
    }
  })

  return clashing
}

"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DAYS, HOURS, HOUR_LABELS, DAY_SHORT, type DayName } from "@/lib/timetable-types"
import type { Course, Session } from "@/lib/course-data"
import { getRemarkColor } from "@/lib/course-data"

interface SelectedSession {
  course: Course
  session: Session
}

interface TimetableGridProps {
  selectedSessions: SelectedSession[]
}

interface SlotInfo {
  sessions: SelectedSession[]
  isLabContinuation?: boolean
  labSpanStart?: number
}

function parseSessionSlots(session: Session): { day: DayName; hours: number[] }[] {
  const result: { day: DayName; hours: number[] }[] = []
  if (session.days === "TBA" || session.days === "-" || session.days === "Various") return result

  const dayTokens = session.days.split(" ").filter(Boolean)
  const hourStr = session.hours

  // Handle comma-separated hours for different days
  if (hourStr.includes(",")) {
    const hourParts = hourStr.split(",")
    dayTokens.forEach((dayToken, idx) => {
      const dayName = DAY_SHORT[dayToken]
      if (dayName) {
        const h = Number.parseInt(hourParts[idx] || hourParts[0])
        result.push({ day: dayName, hours: [h] })
      }
    })
  }
  // Handle hour ranges (e.g., "1-2" for labs)
  else if (hourStr.includes("-")) {
    const [start, end] = hourStr.split("-").map(Number)
    const hours = Array.from({ length: end - start + 1 }, (_, i) => start + i)
    dayTokens.forEach((dayToken) => {
      const dayName = DAY_SHORT[dayToken]
      if (dayName) {
        result.push({ day: dayName, hours })
      }
    })
  }
  // Single hour for all days
  else {
    const hour = Number.parseInt(hourStr)
    dayTokens.forEach((dayToken) => {
      const dayName = DAY_SHORT[dayToken]
      if (dayName) {
        result.push({ day: dayName, hours: [hour] })
      }
    })
  }

  return result
}

const courseCodeMap: Record<string, string> = {
  "Fundamentals of Chemistry": "CHEM F110",
  "Electrical Sciences": "EEE F111",
  "Oscillation And Waves": "PHY F111",
  "Intro to Bio Science": "BIO F110",
  "Computer Programming": "CS F111",
  "Technical Report Writing": "BITS F112",
  "Linear Algebra and Complex Variable": "MATH F112",
  "Probability And Statistics": "MATH F113",
  "Innovation And Design Thinking": "GS F232",
}

export function TimetableGrid({ selectedSessions }: TimetableGridProps) {
  const grid: Record<DayName, Record<number, SlotInfo>> = {
    Monday: {},
    Tuesday: {},
    Wednesday: {},
    Thursday: {},
    Friday: {},
    Saturday: {},
  }

  // Track lab spans for merging
  const labSpans: Map<string, { day: DayName; startHour: number; endHour: number; session: SelectedSession }> =
    new Map()

  selectedSessions.forEach((selected) => {
    const slots = parseSessionSlots(selected.session)
    slots.forEach(({ day, hours }) => {
      // If this is a lab with multiple hours, track it as a span
      if (selected.session.type === "lab" && hours.length > 1) {
        const spanKey = `${selected.course.id}-${selected.session.section}-${day}`
        labSpans.set(spanKey, { day, startHour: hours[0], endHour: hours[hours.length - 1], session: selected })
      }

      hours.forEach((hour, idx) => {
        if (!grid[day][hour]) grid[day][hour] = { sessions: [] }

        // For labs, only add to first hour of span (we'll render it merged)
        if (selected.session.type === "lab" && hours.length > 1) {
          if (idx === 0) {
            grid[day][hour].sessions.push(selected)
            grid[day][hour].labSpanStart = hours.length
          } else {
            // Mark continuation hours
            grid[day][hour].isLabContinuation = true
            grid[day][hour].sessions.push(selected)
          }
        } else {
          grid[day][hour].sessions.push(selected)
        }
      })
    })
  })

  const getTypeColor = (type: string) => {
    switch (type) {
      case "lecture":
        return "bg-blue-500/20 border-blue-500/40 text-blue-200"
      case "tutorial":
        return "bg-emerald-500/20 border-emerald-500/40 text-emerald-200"
      case "lab":
        return "bg-purple-500/20 border-purple-500/40 text-purple-200"
      default:
        return "bg-muted"
    }
  }

  const getShortName = (name: string) => {
    const abbrevs: Record<string, string> = {
      "Fundamentals of Chemistry": "Chem",
      "Electrical Sciences": "ES",
      "Oscillation And Waves": "OAW",
      "Intro to Bio Science": "Bio",
      "Computer Programming": "CP",
      "Technical Report Writing": "TRW",
      "Linear Algebra and Complex Variable": "LACV",
      "Probability And Statistics": "P&S",
      "Innovation And Design Thinking": "IDT",
    }
    return abbrevs[name] || name.slice(0, 4)
  }

  return (
    <Card className="overflow-hidden hover-glow">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          Your Timetable
          {selectedSessions.length > 0 && (
            <Badge variant="outline" className="animate-pulse-glow">
              {selectedSessions.length} sessions
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[800px]">
            <thead>
              <tr>
                <th className="p-2 text-xs font-medium text-muted-foreground border-b border-border bg-muted/30 w-20">
                  Time
                </th>
                {DAYS.map((day) => (
                  <th
                    key={day}
                    className="p-2 text-xs font-medium text-muted-foreground border-b border-border bg-muted/30"
                  >
                    {day.slice(0, 3)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {HOURS.map((hour, rowIdx) => (
                <tr key={hour} className="table-row-animate" style={{ animationDelay: `${rowIdx * 0.03}s` }}>
                  <td className="p-2 text-xs text-muted-foreground border-b border-r border-border bg-muted/20 whitespace-nowrap">
                    {HOUR_LABELS[hour]}
                  </td>
                  {DAYS.map((day) => {
                    const slotInfo = grid[day][hour] || { sessions: [] }
                    const sessions = slotInfo.sessions || []

                    if (slotInfo.isLabContinuation) {
                      // Check if the lab started in the previous hour - if so, skip this cell
                      const prevSlot = grid[day][hour - 1]
                      if (prevSlot?.labSpanStart) {
                        return null // This will be covered by rowSpan
                      }
                    }

                    // Check for actual display sessions (non-continuation)
                    const displaySessions = sessions.filter((s, idx) => {
                      if (s.session.type === "lab") {
                        const slots = parseSessionSlots(s.session)
                        const daySlot = slots.find((sl) => sl.day === day)
                        if (daySlot && daySlot.hours.length > 1 && daySlot.hours[0] === hour) {
                          return true // First hour of lab span
                        }
                        if (daySlot && daySlot.hours.length === 1) {
                          return true // Single hour lab
                        }
                        return false
                      }
                      return true
                    })

                    const hasClash = displaySessions.length > 1

                    let rowSpan = 1
                    displaySessions.forEach((s) => {
                      if (s.session.type === "lab") {
                        const slots = parseSessionSlots(s.session)
                        const daySlot = slots.find((sl) => sl.day === day)
                        if (daySlot && daySlot.hours.length > 1 && daySlot.hours[0] === hour) {
                          rowSpan = Math.max(rowSpan, daySlot.hours.length)
                        }
                      }
                    })

                    return (
                      <td
                        key={`${day}-${hour}`}
                        rowSpan={rowSpan > 1 ? rowSpan : undefined}
                        className={`p-1 border-b border-border min-h-[60px] align-top transition-colors ${hasClash ? "bg-red-500/10" : ""} ${rowSpan > 1 ? "align-middle" : ""}`}
                      >
                        {displaySessions.map((selected, idx) => (
                          <div
                            key={`${selected.course.id}-${selected.session.section}-${idx}`}
                            className={`p-1.5 rounded text-xs mb-1 border ${getTypeColor(selected.session.type)} animate-scale-in hover:scale-105 transition-transform cursor-default ${rowSpan > 1 ? "h-full flex flex-col justify-center" : ""}`}
                          >
                            <div className="font-semibold">{getShortName(selected.course.name)}</div>
                            <div className="text-[9px] opacity-70 font-mono">
                              {courseCodeMap[selected.course.name] || selected.course.code}
                            </div>
                            <div className="text-[10px] opacity-80">
                              {selected.session.section} • {selected.session.room}
                            </div>
                            <div className={`text-[10px] ${getRemarkColor(selected.session.remarks)}`}>
                              {selected.session.instructor.split(" ")[0]}
                            </div>
                          </div>
                        ))}
                        {hasClash && (
                          <Badge variant="destructive" className="text-[10px] w-full justify-center animate-wiggle">
                            CLASH
                          </Badge>
                        )}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

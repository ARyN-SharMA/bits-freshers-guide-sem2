"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Star, AlertTriangle, CheckCircle2 } from "lucide-react"
import type { Course, Session } from "@/lib/course-data"
import { getRemarkColor, getRemarkBg } from "@/lib/course-data"

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

interface CourseSelectorProps {
  course: Course
  selectedLecture: Session | null
  selectedTutorial: Session | null
  selectedLab: Session | null
  onSelectLecture: (session: Session | null) => void
  onSelectTutorial: (session: Session | null) => void
  onSelectLab: (session: Session | null) => void
  clashingSessions: Set<string>
}

function getRatingCategory(rating: number, remarks: string): { label: string; priority: number } {
  if (remarks === "God") return { label: "God Tier", priority: 1 }
  if (remarks === "Demi-God") return { label: "Demi-God", priority: 2 }
  if (remarks === "Highly Recommended" || remarks === "Best") return { label: "Highly Recommended", priority: 3 }
  if (
    remarks === "Recommended" ||
    remarks === "Better" ||
    remarks === "Good" ||
    remarks === "Preferred" ||
    remarks === "Lenient grading" ||
    remarks === "Prefer RS-led" ||
    remarks === "Better for lectures"
  )
    return { label: "Recommended", priority: 4 }
  if (remarks === "Decent" || remarks === "Mediocre") return { label: "Decent", priority: 5 }
  if (remarks === "Unknown" || remarks === "Both same" || remarks === "New (1 credit)" || remarks === "TBA")
    return { label: "Unknown Rating", priority: 6 }
  if (remarks === "Avoid" || remarks === "Avoid (PUMA)") return { label: "Avoid", priority: 7 }
  if (
    remarks === "Absolutely Avoid" ||
    remarks === "Avoid at any cost" ||
    remarks === "Horrendous" ||
    remarks === "Strict"
  )
    return { label: "Avoid at all costs", priority: 8 }
  return { label: "Unknown Rating", priority: 6 }
}

function sortSessionsByRating(sessions: Session[]): Session[] {
  return [...sessions].sort((a, b) => {
    const catA = getRatingCategory(a.rating, a.remarks)
    const catB = getRatingCategory(b.rating, b.remarks)
    if (catA.priority !== catB.priority) return catA.priority - catB.priority
    return b.rating - a.rating
  })
}

function formatTiming(session: Session): string {
  const dayMap: Record<string, string> = {
    M: "Mon",
    T: "Tue",
    W: "Wed",
    Th: "Thu",
    F: "Fri",
    S: "Sat",
  }
  const days = session.days
    .split(" ")
    .map((d) => dayMap[d] || d)
    .join(", ")
  return `${days} | Hr ${session.hours} | ${session.room}`
}

function SessionSelect({
  label,
  sessions,
  selected,
  onSelect,
  courseId,
  clashingSessions,
}: {
  label: string
  sessions: Session[]
  selected: Session | null
  onSelect: (session: Session | null) => void
  courseId: string
  clashingSessions: Set<string>
}) {
  if (sessions.length === 0) return null

  const sortedSessions = sortSessionsByRating(sessions)

  return (
    <div className="space-y-2">
      <Label className="text-xs uppercase tracking-wider text-muted-foreground">{label}</Label>
      <Select
        value={selected?.section || "none"}
        onValueChange={(value) => {
          if (value === "none") {
            onSelect(null)
          } else {
            const session = sessions.find((s) => s.section === value)
            if (session) onSelect(session)
          }
        }}
      >
        <SelectTrigger className="w-full bg-background">
          <SelectValue placeholder={`Select ${label}`} />
        </SelectTrigger>
        <SelectContent className="max-h-[400px]">
          <SelectItem value="none">
            <span className="text-muted-foreground">Not selected</span>
          </SelectItem>
          {(() => {
            let lastCategory = ""
            return sortedSessions.map((session) => {
              const sessionKey = `${courseId}-${session.type}-${session.section}`
              const hasClash = clashingSessions.has(sessionKey)
              const category = getRatingCategory(session.rating, session.remarks)

              const showCategoryHeader = category.label !== lastCategory
              lastCategory = category.label

              return (
                <div key={session.section}>
                  {showCategoryHeader && (
                    <div
                      className={`px-2 py-1.5 text-xs font-semibold uppercase tracking-wider mt-1 ${
                        category.priority <= 3
                          ? "text-green-400"
                          : category.priority <= 5
                            ? "text-blue-400"
                            : category.priority === 6
                              ? "text-muted-foreground"
                              : "text-orange-400"
                      }`}
                    >
                      {category.label}
                    </div>
                  )}
                  <SelectItem value={session.section}>
                    <div className="flex flex-col gap-0.5">
                      <div className="flex items-center gap-2">
                        {hasClash && <AlertTriangle className="h-3 w-3 text-red-500 flex-shrink-0" />}
                        <span className="font-mono text-xs">{session.section}</span>
                        <span className="text-muted-foreground">-</span>
                        <span className="truncate max-w-[120px]">{session.instructor}</span>
                        <span className={`text-xs ${getRemarkColor(session.remarks)}`}>({session.rating}/10)</span>
                      </div>
                      <div className="text-[10px] text-muted-foreground pl-0">{formatTiming(session)}</div>
                    </div>
                  </SelectItem>
                </div>
              )
            })
          })()}
        </SelectContent>
      </Select>
      {selected && (
        <div className={`p-3 rounded-lg border text-sm ${getRemarkBg(selected.remarks)} animate-scale-in`}>
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="font-medium">{selected.instructor}</div>
              <div className="text-xs text-muted-foreground">
                {selected.days} | Hr {selected.hours} | Room {selected.room}
              </div>
              <Badge variant="outline" className={`text-xs ${getRemarkColor(selected.remarks)}`}>
                {selected.remarks}
              </Badge>
            </div>
            <div className="flex items-center gap-1 text-amber-400">
              <Star className="h-4 w-4 fill-current" />
              <span className="font-bold">{selected.rating}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export function CourseSelector({
  course,
  selectedLecture,
  selectedTutorial,
  selectedLab,
  onSelectLecture,
  onSelectTutorial,
  onSelectLab,
  clashingSessions,
}: CourseSelectorProps) {
  const hasAllRequired =
    (course.lectures.length === 0 || selectedLecture) &&
    (course.tutorials.length === 0 || selectedTutorial) &&
    (course.labs.length === 0 || selectedLab)

  return (
    <Card className={`transition-all hover-lift ${hasAllRequired ? "border-green-500/30" : "border-border"}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <CardTitle className="text-lg">{course.name}</CardTitle>
            <p className="text-xs text-muted-foreground font-mono mt-0.5">
              {courseCodeMap[course.name] || course.code}
            </p>
            <Badge
              variant="outline"
              className={`mt-1 ${
                course.group === "common"
                  ? "border-purple-500/60 text-purple-300"
                  : course.group === "A"
                    ? "border-blue-500/60 text-blue-300"
                    : "border-emerald-500/60 text-emerald-300"
              }`}
            >
              {course.group === "common" ? "Common" : `Group ${course.group}`}
            </Badge>
          </div>
          {hasAllRequired && <CheckCircle2 className="h-5 w-5 text-green-500 animate-scale-in" />}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <SessionSelect
          label="Lecture"
          sessions={course.lectures}
          selected={selectedLecture}
          onSelect={onSelectLecture}
          courseId={course.id}
          clashingSessions={clashingSessions}
        />
        <SessionSelect
          label="Tutorial"
          sessions={course.tutorials}
          selected={selectedTutorial}
          onSelect={onSelectTutorial}
          courseId={course.id}
          clashingSessions={clashingSessions}
        />
        <SessionSelect
          label="Lab"
          sessions={course.labs}
          selected={selectedLab}
          onSelect={onSelectLab}
          courseId={course.id}
          clashingSessions={clashingSessions}
        />
      </CardContent>
    </Card>
  )
}

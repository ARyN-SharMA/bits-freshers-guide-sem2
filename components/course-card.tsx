"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getRemarkColor, getRemarkBg, type Session, type Course } from "@/lib/course-data"
import { Star, Clock, MapPin, User } from "lucide-react"

interface CourseCardProps {
  course: Course
}

function SessionTable({ sessions, title }: { sessions: Session[]; title: string }) {
  if (sessions.length === 0) return null

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">{title}</h4>
      <div className="space-y-2">
        {sessions.map((session, index) => (
          <div key={`${session.section}-${index}`} className={`p-3 rounded-lg border ${getRemarkBg(session.remarks)}`}>
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="font-mono text-xs">
                    {session.section}
                  </Badge>
                  <span className={`text-sm font-medium ${getRemarkColor(session.remarks)}`}>{session.remarks}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-foreground">
                  <User className="h-3 w-3" />
                  {session.instructor}
                </div>
                <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {session.days} | Hr {session.hours}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {session.room}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-amber-400">
                <Star className="h-4 w-4 fill-current" />
                <span className="font-bold">{session.rating}/10</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl text-foreground">{course.name}</CardTitle>
        <Badge
          variant="secondary"
          className={
            course.group === "common"
              ? "bg-purple-500/20 text-purple-300 w-fit"
              : course.group === "A"
                ? "bg-blue-500/20 text-blue-300 w-fit"
                : "bg-emerald-500/20 text-emerald-300 w-fit"
          }
        >
          {course.group === "common" ? "Common Course" : `Group ${course.group}`}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <SessionTable sessions={course.lectures} title="Lectures" />
        <SessionTable sessions={course.tutorials} title="Tutorials" />
        <SessionTable sessions={course.labs} title="Labs" />
      </CardContent>
    </Card>
  )
}

"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getRemarkColor, getRemarkOutline, type Session, type Course } from "@/lib/course-data"
import { Star, ChevronDown, ChevronUp } from "lucide-react"

interface CourseTableProps {
  course: Course
  index: number
}

function SessionTable({ sessions, title }: { sessions: Session[]; title: string }) {

  if (sessions.length === 0) return null



  return (

    <div className="space-y-3">

      <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">

        <span className="h-1 w-1 rounded-full bg-primary animate-pulse" />

        {title}

      </h4>

      <div className="overflow-x-auto rounded-lg border border-border">

        <Table>

          <TableHeader>

            <TableRow className="bg-muted/30">

              <TableHead className="w-[80px] font-semibold">Section</TableHead>

              <TableHead className="font-semibold">Instructor</TableHead>

              <TableHead className="font-semibold">Timing</TableHead>

              <TableHead className="w-[80px] text-center font-semibold">Rating</TableHead>

              <TableHead className="font-semibold">Remarks</TableHead>

            </TableRow>

          </TableHeader>

          <TableBody>

            {sessions.map((session, idx) => (

              <TableRow

                key={`${session.section}-${idx}`}

                 className={`table-row-animate border-l-2 ${getRemarkOutline(session.remarks)}`}


                style={{ animationDelay: `${idx * 0.05}s` }}

              >

                <TableCell className="font-mono font-medium">{session.section}</TableCell>

                <TableCell className="font-medium">{session.instructor}</TableCell>

                <TableCell className="text-muted-foreground">

                  <span className="inline-flex items-center gap-1">

                    {session.days} | Hr {session.hours}

                    <span className="text-xs opacity-60">({session.room})</span>

                  </span>

                </TableCell>

                <TableCell className="text-center">

                  <span className="inline-flex items-center gap-1 text-amber-400">

                    <span className={`text-sm font-bold ${getRemarkColor(session.remarks)}`}>{session.rating}</span>

                  </span>

                </TableCell>

                <TableCell>

                  <span className={`text-sm font-medium ${getRemarkColor(session.remarks)}`}>{session.remarks}</span>

                </TableCell>

              </TableRow>

            ))}

          </TableBody>

        </Table>

      </div>

    </div>

  )

}

export function CourseTable({ course, index }: CourseTableProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  const glowClass =
    course.group === "common"
      ? "hover:border-purple-500 hover:shadow-[0_0_15px_rgba(168,85,247,0.5)]" // Neon Purple
      : course.group === "A"
        ? "hover:border-blue-500 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]" // Neon Blue
        : "hover:border-emerald-500 hover:shadow-[0_0_15px_rgba(16,185,129,0.5)]" // Neon Green (Emerald)

  return (
    <Card
      className={`card-entrance overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:scale-[1.01] ${glowClass}`}
      style={{ animationDelay: `${index * 0.1}s` }}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <CardHeader
        className="pb-4 cursor-pointer transition-colors hover:bg-muted/10"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <CardTitle className="text-xl text-foreground flex items-center gap-2">
              <span className="animate-bounce-subtle" style={{ animationDelay: `${index * 0.2}s` }}>
                {course.name}
              </span>
            </CardTitle>
            <Badge
              variant="outline"
              className={`w-fit transition-all ${
                course.group === "common"
                  ? "border-purple-500/60 text-purple-300"
                  : course.group === "A"
                    ? "border-blue-500/60 text-blue-300"
                    : "border-emerald-500/60 text-emerald-300"
              }`}
            >
              {course.group === "common" ? "Common Course" : `Group ${course.group}`}
            </Badge>
          </div>
          <div className="p-2 rounded-full hover:bg-muted/30 transition-colors">
            {isExpanded ? (
              <ChevronUp className="h-5 w-5 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            )}
          </div>
        </div>
      </CardHeader>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <CardContent className="space-y-6 pt-0">
          <SessionTable sessions={course.lectures} title="Lectures" />
          <SessionTable sessions={course.tutorials} title="Tutorials" />
          <SessionTable sessions={course.labs} title="Labs" />
        </CardContent>
      </div>
    </Card>
  )
}

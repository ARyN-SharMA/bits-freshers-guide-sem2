"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CourseSelector } from "@/components/timetable/course-selector"
import { TimetableGrid } from "@/components/timetable/timetable-grid"
import { ClashDetector, getClashingSessions } from "@/components/timetable/clash-detector"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getCoursesByGroup, type Course, type Session } from "@/lib/course-data"
import { Calendar, RotateCcw, Sparkles } from "lucide-react"

interface CourseSelections {
  lecture: Session | null
  tutorial: Session | null
  lab: Session | null
}

export default function TimetablePage() {
  const [selectedGroup, setSelectedGroup] = useState<"A" | "B">("A")
  const [selections, setSelections] = useState<Record<string, CourseSelections>>({})

  const courses = useMemo(() => getCoursesByGroup(selectedGroup), [selectedGroup])

  const handleGroupChange = (group: "A" | "B") => {
    setSelectedGroup(group)
    setSelections({})
  }

  const handleSelectSession = (courseId: string, type: "lecture" | "tutorial" | "lab", session: Session | null) => {
    setSelections((prev) => ({
      ...prev,
      [courseId]: {
        lecture: prev[courseId]?.lecture || null,
        tutorial: prev[courseId]?.tutorial || null,
        lab: prev[courseId]?.lab || null,
        [type]: session,
      },
    }))
  }

  const selectedSessions = useMemo(() => {
    const result: { course: Course; session: Session }[] = []
    courses.forEach((course) => {
      const sel = selections[course.id]
      if (sel?.lecture) result.push({ course, session: sel.lecture })
      if (sel?.tutorial) result.push({ course, session: sel.tutorial })
      if (sel?.lab) result.push({ course, session: sel.lab })
    })
    return result
  }, [courses, selections])

  const clashingSessions = useMemo(() => getClashingSessions(selectedSessions), [selectedSessions])

  const completedCourses = courses.filter((course) => {
    const sel = selections[course.id]
    return (
      (course.lectures.length === 0 || sel?.lecture) &&
      (course.tutorials.length === 0 || sel?.tutorial) &&
      (course.labs.length === 0 || sel?.lab)
    )
  }).length

  const handleReset = () => {
    setSelections({})
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 py-8">
        <div className="container px-4">
          {/* Page Header with animations */}
          <div className="mb-8 space-y-4 animate-slide-up">
            <div className="flex items-center gap-3">
              <Calendar className="h-8 w-8 text-purple-400 animate-bounce-subtle" />
              <div>
                <h1 className="text-3xl font-bold gradient-text flex items-center gap-2">
                  Timetable Generator
                  <Sparkles className="h-6 w-6 text-purple-400 animate-glow-pulse" />
                </h1>
                <p className="text-muted-foreground">
                  Select your courses and professors to build your perfect schedule
                </p>
              </div>
            </div>

            {/* Group Selection with animation */}
            <Card className="card-entrance hover-glow">
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Select Your Group</Label>
                    <RadioGroup
                      value={selectedGroup}
                      onValueChange={(v) => handleGroupChange(v as "A" | "B")}
                      className="flex gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="A" id="group-a" />
                        <Label htmlFor="group-a" className="cursor-pointer transition-colors hover:text-foreground">
                          Group A <span className="text-muted-foreground text-xs">(Single Degree)</span>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="B" id="group-b" />
                        <Label htmlFor="group-b" className="cursor-pointer transition-colors hover:text-foreground">
                          Group B <span className="text-muted-foreground text-xs">(Dual/Chemical/Civil/Manu.)</span>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="px-3 py-1 animate-pulse-glow">
                      {completedCourses}/{courses.length} Courses Selected
                    </Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleReset}
                      className="gap-2 bg-transparent hover:rotate-180 transition-transform duration-500"
                    >
                      <RotateCcw className="h-4 w-4" />
                      Reset
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Course Selectors with staggered animations */}
            <div className="space-y-6 animate-slide-in-left">
              <h2 className="text-xl font-semibold">Select Sections</h2>
              <div className="space-y-4">
                {courses.map((course, index) => (
                  <div key={course.id} className="card-entrance" style={{ animationDelay: `${index * 0.1}s` }}>
                    <CourseSelector
                      course={course}
                      selectedLecture={selections[course.id]?.lecture || null}
                      selectedTutorial={selections[course.id]?.tutorial || null}
                      selectedLab={selections[course.id]?.lab || null}
                      onSelectLecture={(s) => handleSelectSession(course.id, "lecture", s)}
                      onSelectTutorial={(s) => handleSelectSession(course.id, "tutorial", s)}
                      onSelectLab={(s) => handleSelectSession(course.id, "lab", s)}
                      clashingSessions={clashingSessions}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Timetable Preview with animations */}
            <div className="space-y-6 animate-slide-in-right">
              <h2 className="text-xl font-semibold">Preview</h2>

              {/* Clash Detection */}
              <ClashDetector selectedSessions={selectedSessions} />

              {/* Timetable Grid */}
              <div className="card-entrance stagger-2">
                <TimetableGrid selectedSessions={selectedSessions} />
              </div>

              {/* Legend */}
              <Card className="card-entrance stagger-3">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Legend</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-2 hover:scale-105 transition-transform">
                      <div className="w-4 h-4 rounded bg-blue-500/20 border border-blue-500/40" />
                      <span className="text-xs text-muted-foreground">Lecture</span>
                    </div>
                    <div className="flex items-center gap-2 hover:scale-105 transition-transform">
                      <div className="w-4 h-4 rounded bg-emerald-500/20 border border-emerald-500/40" />
                      <span className="text-xs text-muted-foreground">Tutorial</span>
                    </div>
                    <div className="flex items-center gap-2 hover:scale-105 transition-transform">
                      <div className="w-4 h-4 rounded bg-purple-500/20 border border-purple-500/40" />
                      <span className="text-xs text-muted-foreground">Lab</span>
                    </div>
                    <div className="flex items-center gap-2 hover:scale-105 transition-transform">
                      <div className="w-4 h-4 rounded bg-red-500/20 border border-red-500/40" />
                      <span className="text-xs text-muted-foreground">Clash</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

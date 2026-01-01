import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CourseTable } from "@/components/course-table"
import { getCoursesByGroup } from "@/lib/course-data"
import { Badge } from "@/components/ui/badge"

export default function GroupAPage() {
  const courses = getCoursesByGroup("A")

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 py-8">
        <div className="container px-4">
          <div className="mb-8 space-y-2 animate-slide-up">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold gradient-text">Group A Courses</h1>
              <Badge variant="outline" className="border-blue-500/60 text-blue-300 animate-pulse-glow">
                Single Degree
              </Badge>
            </div>
            <p className="text-muted-foreground animate-fade-in stagger-2">
              Complete course breakdown with instructor insights and recommendations for single degree students.
            </p>
          </div>

          <div className="space-y-6">
            {courses.map((course, index) => (
              <CourseTable key={course.id} course={course} index={index} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CourseTable } from "@/components/course-table"
import { getCoursesByGroup } from "@/lib/course-data"
import { Badge } from "@/components/ui/badge"

export default function GroupBPage() {
  const courses = getCoursesByGroup("B")

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 py-8">
        <div className="container px-4">
          <div className="mb-8 space-y-2 animate-slide-up">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold gradient-text">Group B Courses</h1>
              <Badge variant="outline" className="border-emerald-500/60 text-emerald-300 animate-pulse-glow">
                Dual Degree / Chemical / Manu. / Civil
              </Badge>
            </div>
            <p className="text-muted-foreground animate-fade-in stagger-2">
              Specialized recommendations tailored for dual degree, Chemical, Civil, and Manufacturing students.
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

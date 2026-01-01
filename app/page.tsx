import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowRight, Calendar, BookOpen, Users, AlertTriangle, Sparkles, Info, Lightbulb, Clock } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section with animations */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl animate-float" />
            <div
              className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-float"
              style={{ animationDelay: "1s" }}
            />
          </div>
          <div className="container px-4 relative">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm animate-bounce-subtle">
                <Sparkles className="h-4 w-4 animate-glow-pulse" />
                II Semester 2025-26
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground text-balance animate-slide-up">
                <span className="gradient-text">{"The Fresher's Guide"}</span>
              </h1>
              <p className="text-lg text-muted-foreground text-pretty animate-slide-up stagger-1">
                Your complete roadmap to conquering second-semester courses at{" "}
                <span className="text-foreground font-semibold">B.I.T.S. Pilani</span>
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-4 animate-slide-up stagger-2">
                <Link href="/timetable">
                  <Button size="lg" className="gap-2 hover-lift animate-shimmer text-white">
                    <Calendar className="h-5 w-5" />
                    Generate Timetable
                  </Button>
                </Link>
                <Link href="/group-a">
                  <Button size="lg" variant="outline" className="gap-2 bg-transparent hover-lift">
                    View Courses
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Warning Banner */}
        <section className="py-4 bg-amber-500/10 border-y border-amber-500/30 animate-fade-in">
          <div className="container px-4">
            <div className="flex items-center justify-center gap-2 text-amber-500 text-sm text-center">
              <AlertTriangle className="h-4 w-4 flex-shrink-0 animate-wiggle" />
              <span>
                This guide is based on the tentative timetable. Always verify with the official registration portal.
              </span>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="container px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link href="/group-a" className="group">
                <Card className="h-full transition-all hover:border-blue-500/50 hover:bg-blue-500/5 hover-lift card-entrance">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-2 group-hover:animate-bounce-subtle">
                      <BookOpen className="h-6 w-6 text-blue-400" />
                    </div>
                    <CardTitle className="flex items-center gap-2">
                      Group A
                      <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                    </CardTitle>
                    <CardDescription>Single Degree Students</CardDescription>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    Fundamentals of Chemistry, Electrical Sciences, Oscillation And Waves + Common Courses
                  </CardContent>
                </Card>
              </Link>

              <Link href="/group-b" className="group">
                <Card className="h-full transition-all hover:border-emerald-500/50 hover:bg-emerald-500/5 hover-lift card-entrance stagger-1">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-2 group-hover:animate-bounce-subtle">
                      <Users className="h-6 w-6 text-emerald-400" />
                    </div>
                    <CardTitle className="flex items-center gap-2">
                      Group B
                      <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                    </CardTitle>
                    <CardDescription>Dual Degree, Chemical, Manu., Civil</CardDescription>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    Intro to Bio Science, Computer Programming, Technical Report Writing + Common Courses
                  </CardContent>
                </Card>
              </Link>

              <Link href="/timetable" className="group md:col-span-2 lg:col-span-1">
                <Card className="h-full transition-all hover:border-purple-500/50 hover:bg-purple-500/5 hover-lift card-entrance stagger-2">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-2 group-hover:animate-bounce-subtle">
                      <Calendar className="h-6 w-6 text-purple-400" />
                    </div>
                    <CardTitle className="flex items-center gap-2">
                      Timetable Generator
                      <Sparkles className="h-4 w-4 text-purple-400 animate-glow-pulse" />
                    </CardTitle>
                    <CardDescription>Build Your Perfect Schedule</CardDescription>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    Select your courses, pick professors, detect clashes, and generate a beautiful timetable instantly.
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>

        {/* Timetable Generation Info Section */}
        <section className="py-16 border-t border-border">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="text-center space-y-2 animate-slide-up">
                <h2 className="text-2xl font-bold gradient-text">Timetable Generation Guide</h2>
                <p className="text-muted-foreground">Strategic approach to building your perfect schedule</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="hover-lift card-entrance">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <span className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                        1
                      </span>
                      Select Your Group
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    Choose Group A (Single Degree) or Group B (Dual Degree, Chemical, Manufacturing, Civil) based on
                    your branch. This determines your core science courses.
                  </CardContent>
                </Card>

                <Card className="hover-lift card-entrance stagger-1">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <span className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                        2
                      </span>
                      Pick Lectures First
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    Start with lecture sections as they have fewer options and set the foundation for your schedule.
                    Prioritize instructors with higher ratings.
                  </CardContent>
                </Card>

                <Card className="hover-lift card-entrance stagger-2">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <span className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                        3
                      </span>
                      Match Tutorials
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    Select tutorials that {"don't"} clash with your lectures. The same instructor for lecture and
                    tutorial often provides better continuity.
                  </CardContent>
                </Card>

                <Card className="hover-lift card-entrance stagger-3">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <span className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                        4
                      </span>
                      Fill in Labs
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    Labs are 2-hour blocks. Prefer Research Scholar-led labs for lenient grading. Avoid back-to-back
                    labs if possible.
                  </CardContent>
                </Card>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <Card className="border-orange-500/30 hover-lift card-entrance stagger-4">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-full bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                        <Calendar className="h-5 w-5 text-orange-400" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-semibold">Avoid Saturday Labs</h3>
                        <p className="text-sm text-muted-foreground">
                          Try to avoid scheduling labs on Saturday as it makes it difficult to arrange trips and travel
                          back home for the weekend. Keep your Saturdays free when possible.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-blue-500/30 hover-lift card-entrance stagger-4">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                        <Clock className="h-5 w-5 text-blue-400" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-semibold">Avoid Morning Slots</h3>
                        <p className="text-sm text-muted-foreground">
                          The cold weather during morning hours in Pilani can make early classes challenging. If
                          possible, prefer afternoon slots for better attendance and alertness.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-primary/30 hover-lift card-entrance stagger-5 mt-6">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Lightbulb className="h-5 w-5 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold">Pro Tip: Clash Detection</h3>
                      <p className="text-sm text-muted-foreground">
                        Our timetable generator automatically detects time slot clashes. A red warning icon appears next
                        to conflicting sections. Always resolve clashes before finalizing your registration.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* The Fundamental Premise Section */}
        <section className="py-16 bg-muted/20">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="text-center space-y-2 animate-slide-up">
                <h2 className="text-2xl font-bold gradient-text">The Fundamental Premise</h2>
                <p className="text-muted-foreground">Understanding timetable creation at BITS</p>
              </div>

              <Card className="hover-lift card-entrance">
                <CardContent className="pt-6 space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    A timetable is more than a scheduling grid. {"It's"} the foundation upon which your academic
                    performance, understanding, and engagement rest for an entire semester. Choosing the right
                    instructor can transform a difficult subject into an intellectual adventure; choosing poorly can
                    make even an easy course feel like a slog.
                  </p>
                  <p className="text-foreground font-medium">
                    Institutional knowledge is rare and valuable. This guide consolidates that knowledge.
                  </p>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-3 gap-4">
                <Card className="hover-lift card-entrance stagger-1">
                  <CardHeader className="pb-2">
                    <div className="h-10 w-10 rounded-lg bg-amber-500/10 flex items-center justify-center mb-2">
                      <Info className="h-5 w-5 text-amber-400" />
                    </div>
                    <CardTitle className="text-base">TBA Sections</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    {"'To Be Announced'"} sections offer scheduling flexibility but lack instructor certainty. Choose
                    strategically based on timing needs.
                  </CardContent>
                </Card>

                <Card className="hover-lift card-entrance stagger-2">
                  <CardHeader className="pb-2">
                    <div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center mb-2">
                      <Lightbulb className="h-5 w-5 text-green-400" />
                    </div>
                    <CardTitle className="text-base">Research Scholar Labs</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    In laboratory sections, prefer RS-led slots when possible. They tend to be more lenient in grading
                    and conducting vivas.
                  </CardContent>
                </Card>

                <Card className="hover-lift card-entrance stagger-3">
                  <CardHeader className="pb-2">
                    <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-2">
                      <Clock className="h-5 w-5 text-blue-400" />
                    </div>
                    <CardTitle className="text-base">Last-Minute Changes</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    The official timetable may have last-minute changes. Use this guide as a 90% solution and stay
                    adaptable.
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Rating Legend Section */}
        <section className="py-16">
          <div className="container px-4">
            <h2 className="text-2xl font-bold text-center mb-8 animate-slide-up">Rating Legend</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
              {[
                { label: "God", color: "text-yellow-400 border-yellow-400/60" },
                { label: "Demi-God", color: "text-amber-400 border-amber-400/60" },
                { label: "Highly Rec.", color: "text-emerald-400 border-emerald-400/60" },
                { label: "Recommended", color: "text-green-400 border-green-400/60" },
                { label: "Decent", color: "text-blue-400 border-blue-400/60" },
                { label: "Unknown", color: "text-muted-foreground border-border" },
                { label: "Avoid", color: "text-orange-400 border-orange-400/60" },
                { label: "Horrendous", color: "text-red-400 border-red-400/60" },
              ].map((item, index) => (
                <div
                  key={item.label}
                  className={`px-3 py-2 rounded-lg text-center text-sm font-medium border-2 bg-transparent hover-lift card-entrance ${item.color}`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, MessageCircle, Bug, Lightbulb } from "lucide-react"

const contributors = [
  { name: "Aryan Sharma", email: "f20241065@pilani.bits-pilani.ac.in" },
  { name: "Divyam Dangayach", email: "f20241254@pilani.bits-pilani.ac.in" },
  { name: "Hitesh Tiwari", email: "f20240944@pilani.bits-pilani.ac.in" },
  { name: "Brind Akabari", email: "f20240651@pilani.bits-pilani.ac.in" },
  { name: "Tushar Raghwani", email: "f20240976@pilani.bits-pilani.ac.in" },
  { name: "Anshul Ailani", email: "f20240647@pilani.bits-pilani.ac.in" },
]

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl animate-float" />
            <div
              className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-float"
              style={{ animationDelay: "1s" }}
            />
          </div>
          <div className="container px-4 relative">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm animate-bounce-subtle">
                <Mail className="h-4 w-4" />
                Get In Touch
              </div>
              <h1 className="text-4xl font-bold animate-slide-up">
                <span className="gradient-text">Contact Us</span>
              </h1>
              <p className="text-lg text-muted-foreground animate-slide-up stagger-1">
                Have questions, suggestions, or found an error? Reach out to any of our contributors.
              </p>
            </div>
          </div>
        </section>

        {/* Contributors Grid */}
        <section className="py-12">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-center mb-8 animate-slide-up">Contributors</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {contributors.map((contributor, index) => (
                  <a key={contributor.email} href={`mailto:${contributor.email}`} className="block">
                    <Card
                      className="h-full transition-all hover:border-primary/50 hover:bg-primary/5 hover-lift card-entrance cursor-pointer"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                            {contributor.name.charAt(0)}
                          </div>
                          {contributor.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-xs text-muted-foreground font-mono break-all">{contributor.email}</p>
                      </CardContent>
                    </Card>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* What to Contact Us About */}
        <section className="py-12 bg-muted/20">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-center mb-8 animate-slide-up">How Can We Help?</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card className="hover-lift card-entrance">
                  <CardHeader className="pb-2">
                    <div className="h-10 w-10 rounded-lg bg-red-500/10 flex items-center justify-center mb-2">
                      <Bug className="h-5 w-5 text-red-400" />
                    </div>
                    <CardTitle className="text-base">Report Errors</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    Found incorrect information about a course, instructor, or timing? Let us know so we can fix it.
                  </CardContent>
                </Card>

                <Card className="hover-lift card-entrance stagger-1">
                  <CardHeader className="pb-2">
                    <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-2">
                      <Lightbulb className="h-5 w-5 text-blue-400" />
                    </div>
                    <CardTitle className="text-base">Suggest Features</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    Have ideas for improving this guide? We welcome suggestions for new features and improvements.
                  </CardContent>
                </Card>

                <Card className="hover-lift card-entrance stagger-2">
                  <CardHeader className="pb-2">
                    <div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center mb-2">
                      <MessageCircle className="h-5 w-5 text-green-400" />
                    </div>
                    <CardTitle className="text-base">Share Experiences</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    Had a great (or terrible) experience with an instructor? Share your feedback to help future
                    freshers.
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

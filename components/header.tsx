"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Calendar, BookOpen, Menu, X, Mail } from "lucide-react"
import { useState } from "react"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/group-a", label: "Group A" },
  { href: "/group-b", label: "Group B" },
  { href: "/timetable", label: "Timetable Generator", icon: Calendar },
  { href: "/contact", label: "Contact Us", icon: Mail },
]

export function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 animate-slide-up">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 group">
          <BookOpen className="h-6 w-6 text-primary group-hover:animate-wiggle transition-transform" />
          <span className="font-bold text-lg gradient-text">BITS Guide</span>
          <span className="text-xs text-muted-foreground hidden sm:inline animate-fade-in">II Sem 2025-26</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link, index) => (
            <Link key={link.href} href={link.href}>
              <Button
                variant={pathname === link.href ? "secondary" : "ghost"}
                size="sm"
                className={`gap-2 transition-all hover:scale-105 animate-fade-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {link.icon && <link.icon className="h-4 w-4" />}
                {link.label}
              </Button>
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden hover:rotate-180 transition-transform duration-300"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Navigation with animation */}
      <div
        className={`md:hidden border-t border-border bg-background overflow-hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <nav className="p-4 space-y-2">
          {navLinks.map((link, index) => (
            <Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)}>
              <Button
                variant={pathname === link.href ? "secondary" : "ghost"}
                className={`w-full justify-start gap-2 animate-slide-in-left`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {link.icon && <link.icon className="h-4 w-4" />}
                {link.label}
              </Button>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}

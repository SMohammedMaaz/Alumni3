"use client"

import { useEffect, useRef, useState } from "react"
import { Star, Clock, MessageSquare, ChevronRight } from "lucide-react"

const mentors = [
  {
    name: "Dr. Meera Krishnan",
    role: "VP of Engineering",
    company: "Flipkart",
    expertise: ["System Design", "Leadership", "Cloud Architecture"],
    sessions: 45,
    rating: 4.9,
    avatar: "MK",
    bgColor: "bg-primary",
  },
  {
    name: "Vikram Joshi",
    role: "Principal Data Scientist",
    company: "Infosys",
    expertise: ["Machine Learning", "AI Strategy", "Python"],
    sessions: 32,
    rating: 4.8,
    avatar: "VJ",
    bgColor: "bg-secondary",
  },
  {
    name: "Lakshmi Iyer",
    role: "Tech Lead",
    company: "Adobe",
    expertise: ["Frontend", "React", "UI/UX"],
    sessions: 28,
    rating: 4.7,
    avatar: "LI",
    bgColor: "bg-accent",
  },
  {
    name: "Aditya Rao",
    role: "Startup Founder",
    company: "TechVenture Labs",
    expertise: ["Entrepreneurship", "Product Strategy", "Fundraising"],
    sessions: 51,
    rating: 4.9,
    avatar: "AR",
    bgColor: "bg-[#f59e0b]",
  },
]

export function MentorshipSection() {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="mentorship" className="relative z-10 bg-muted py-24">
      <div ref={ref} className="mx-auto max-w-7xl px-6">
        <div className={`mb-16 text-center transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-secondary">
            Mentorship Program
          </p>
          <h2 className="mb-4 text-balance text-4xl font-bold text-foreground md:text-5xl">
            Learn from the Best in Industry
          </h2>
          <p className="mx-auto max-w-2xl text-pretty text-muted-foreground">
            Connect with experienced alumni mentors who are ready to guide you in your career, academics, and personal growth.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {mentors.map((mentor, i) => (
            <div
              key={mentor.name}
              className={`group overflow-hidden rounded-2xl border border-border bg-background p-6 shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-1 ${isVisible ? "animate-slide-up" : "opacity-0"}`}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="mb-4 flex items-start gap-4">
                <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${mentor.bgColor} text-base font-bold text-primary-foreground`}>
                  {mentor.avatar}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-foreground">{mentor.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {mentor.role} at {mentor.company}
                  </p>
                  <div className="mt-2 flex items-center gap-3">
                    <span className="flex items-center gap-1 text-xs font-medium text-[#f59e0b]">
                      <Star className="h-3 w-3 fill-current" />
                      {mentor.rating}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {mentor.sessions} sessions
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-5 flex flex-wrap gap-2">
                {mentor.expertise.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg bg-primary/8 px-3 py-1 text-xs font-medium text-primary"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="flex gap-3">
                <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 shadow-sm hover:shadow-md">
                  <MessageSquare className="h-4 w-4" />
                  Request Session
                </button>
                <button className="flex items-center justify-center rounded-xl border border-border px-4 py-2.5 text-sm text-muted-foreground transition-all hover:border-primary hover:text-primary hover:bg-primary/5">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button className="rounded-xl border border-primary/20 bg-primary/5 px-8 py-3 text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-primary-foreground">
            View All Mentors
          </button>
        </div>
      </div>
    </section>
  )
}

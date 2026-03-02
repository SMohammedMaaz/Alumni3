"use client"

import { useEffect, useRef, useState } from "react"
import { Heart, BookOpen, Cpu, Trophy, ArrowRight } from "lucide-react"

const causes = [
  {
    icon: BookOpen,
    title: "Student Scholarships",
    description: "Help deserving students pursue their engineering dreams with financial support.",
    raised: 12500000,
    goal: 20000000,
    color: "#3730a3",
  },
  {
    icon: Cpu,
    title: "Lab Infrastructure",
    description: "Upgrade computing labs, IoT equipment, and research facilities for students.",
    raised: 8000000,
    goal: 15000000,
    color: "#ec4899",
  },
  {
    icon: Trophy,
    title: "Sports & Cultural Fund",
    description: "Support student participation in inter-college sports and cultural competitions.",
    raised: 3500000,
    goal: 5000000,
    color: "#f59e0b",
  },
]

function formatCurrency(amount: number) {
  if (amount >= 10000000) return `${(amount / 10000000).toFixed(1)} Cr`
  if (amount >= 100000) return `${(amount / 100000).toFixed(1)} L`
  return `${(amount / 1000).toFixed(0)}K`
}

export function DonationsSection() {
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
    <section id="donations" className="relative z-10 bg-muted py-24">
      <div ref={ref} className="mx-auto max-w-7xl px-6">
        <div className={`mb-16 text-center transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-secondary">
            Give Back
          </p>
          <h2 className="mb-4 text-balance text-4xl font-bold text-foreground md:text-5xl">
            Support Your Alma Mater
          </h2>
          <p className="mx-auto max-w-2xl text-pretty text-muted-foreground">
            Your contributions help build a brighter future for current and incoming students at VVIET.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {causes.map((cause, i) => {
            const percentage = Math.round((cause.raised / cause.goal) * 100)
            return (
              <div
                key={cause.title}
                className={`group overflow-hidden rounded-2xl border border-border bg-background p-6 shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-1 ${isVisible ? "animate-slide-up" : "opacity-0"}`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div
                  className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{ background: `${cause.color}12` }}
                >
                  <cause.icon className="h-6 w-6" style={{ color: cause.color }} />
                </div>
                <h3 className="mb-2 text-lg font-bold text-foreground">{cause.title}</h3>
                <p className="mb-4 text-sm text-muted-foreground leading-relaxed">{cause.description}</p>

                {/* Progress bar */}
                <div className="mb-2 h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: isVisible ? `${percentage}%` : "0%",
                      background: cause.color,
                    }}
                  />
                </div>
                <div className="mb-4 flex items-center justify-between text-xs">
                  <span className="font-semibold" style={{ color: cause.color }}>
                    {formatCurrency(cause.raised)} raised
                  </span>
                  <span className="text-muted-foreground">Goal: {formatCurrency(cause.goal)}</span>
                </div>

                <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 shadow-sm hover:shadow-md">
                  <Heart className="h-4 w-4" />
                  Contribute Now
                </button>
              </div>
            )
          })}
        </div>

        <div className={`mt-12 flex flex-col items-center gap-4 rounded-2xl border border-primary/20 bg-primary/5 p-8 text-center transition-all duration-700 delay-300 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
          <h3 className="text-xl font-bold text-foreground">Want to make a larger contribution?</h3>
          <p className="max-w-lg text-sm text-muted-foreground">
            Contact us for corporate sponsorships, endowed scholarships, or naming opportunities for campus facilities.
          </p>
          <button className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md">
            Contact Alumni Office
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  )
}

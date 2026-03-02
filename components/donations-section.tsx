"use client"

import { useEffect, useRef, useState } from "react"
import { Heart, ArrowRight } from "lucide-react"

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

        {/* Empty state - no hardcoded data */}
        <div className="flex flex-col items-center justify-center py-12">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-background">
            <Heart className="h-8 w-8 text-muted-foreground" />
          </div>
          <p className="mb-2 text-lg font-semibold text-foreground">No active campaigns yet</p>
          <p className="max-w-md text-center text-sm text-muted-foreground">
            Donation campaigns and fundraising initiatives will be listed here once they are launched.
          </p>
        </div>

        <div className={`mt-12 flex flex-col items-center gap-4 rounded-2xl border border-primary/20 bg-primary/5 p-8 text-center transition-all duration-700 delay-300 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
          <h3 className="text-xl font-bold text-foreground">Want to make a contribution?</h3>
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

"use client"

import { useEffect, useRef, useState } from "react"
import { Award } from "lucide-react"

export function SuccessStories() {
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
    <section id="stories" className="relative z-10 bg-background py-24">
      <div ref={ref} className="mx-auto max-w-7xl px-6">
        <div className={`mb-16 text-center transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-secondary">
            Success Stories
          </p>
          <h2 className="mb-4 text-balance text-4xl font-bold text-foreground md:text-5xl">
            Alumni Making a Global Impact
          </h2>
          <p className="mx-auto max-w-2xl text-pretty text-muted-foreground">
            Celebrating the remarkable achievements of our alumni who are shaping industries and inspiring future generations.
          </p>
        </div>

        {/* Empty state - no hardcoded data */}
        <div className="flex flex-col items-center justify-center py-20">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <Award className="h-8 w-8 text-muted-foreground" />
          </div>
          <p className="mb-2 text-lg font-semibold text-foreground">No success stories yet</p>
          <p className="max-w-md text-center text-sm text-muted-foreground">
            Success stories will be featured here as alumni share their achievements and career journeys.
          </p>
        </div>
      </div>
    </section>
  )
}

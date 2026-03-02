"use client"

import { useEffect, useRef, useState } from "react"
import { ImageIcon } from "lucide-react"

export function GallerySection() {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.05 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="gallery" className="relative z-10 bg-background py-24">
      <div ref={ref} className="mx-auto max-w-7xl px-6">
        <div className={`mb-12 text-center transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-secondary">
            Photo Gallery
          </p>
          <h2 className="mb-4 text-balance text-4xl font-bold text-foreground md:text-5xl">
            Campus Memories
          </h2>
        </div>

        {/* Empty state - no hardcoded data */}
        <div className="flex flex-col items-center justify-center py-20">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <ImageIcon className="h-8 w-8 text-muted-foreground" />
          </div>
          <p className="mb-2 text-lg font-semibold text-foreground">No photos yet</p>
          <p className="max-w-md text-center text-sm text-muted-foreground">
            Campus photos and event galleries will be showcased here once they are uploaded.
          </p>
        </div>
      </div>
    </section>
  )
}

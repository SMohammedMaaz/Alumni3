"use client"

import { useEffect, useRef, useState } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

const galleryImages = [
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/campus%20pic-UgwoAr2O9DGuRQ8EEC0bu6lfmuIIW2.png",
    alt: "VVIET Campus Aerial View",
    category: "Campus",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/campus%20pic-UgwoAr2O9DGuRQ8EEC0bu6lfmuIIW2.png",
    alt: "Annual Reunion 2025",
    category: "Reunion",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/campus%20pic-UgwoAr2O9DGuRQ8EEC0bu6lfmuIIW2.png",
    alt: "Convocation Ceremony",
    category: "Events",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/campus%20pic-UgwoAr2O9DGuRQ8EEC0bu6lfmuIIW2.png",
    alt: "Tech Fest 2025",
    category: "Events",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/campus%20pic-UgwoAr2O9DGuRQ8EEC0bu6lfmuIIW2.png",
    alt: "Sports Day",
    category: "Sports",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/campus%20pic-UgwoAr2O9DGuRQ8EEC0bu6lfmuIIW2.png",
    alt: "Cultural Night",
    category: "Cultural",
  },
]

const categories = ["All", "Campus", "Reunion", "Events", "Sports", "Cultural"]

export function GallerySection() {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [activeCategory, setActiveCategory] = useState("All")
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.05 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const filtered = activeCategory === "All"
    ? galleryImages
    : galleryImages.filter((img) => img.category === activeCategory)

  const handlePrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex(lightboxIndex === 0 ? filtered.length - 1 : lightboxIndex - 1)
    }
  }

  const handleNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex(lightboxIndex === filtered.length - 1 ? 0 : lightboxIndex + 1)
    }
  }

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

        {/* Category filters */}
        <div className={`mb-10 flex flex-wrap items-center justify-center gap-2 transition-all duration-700 delay-100 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((image, i) => (
            <button
              key={`${image.alt}-${i}`}
              onClick={() => setLightboxIndex(i)}
              className={`group relative overflow-hidden rounded-2xl aspect-video cursor-pointer transition-all duration-500 hover:shadow-xl ${isVisible ? "animate-pop-in" : "opacity-0"}`}
              style={{ animationDelay: `${i * 80}ms` }}
              aria-label={`View ${image.alt}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                crossOrigin="anonymous"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#1a1a2e]/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute bottom-0 left-0 right-0 translate-y-full p-4 transition-transform duration-300 group-hover:translate-y-0">
                <span className="inline-block rounded-lg bg-primary/90 px-3 py-1 text-xs font-semibold text-primary-foreground">
                  {image.category}
                </span>
                <p className="mt-1 text-sm font-semibold text-primary-foreground">{image.alt}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[#1a1a2e]/90 p-4"
          onClick={() => setLightboxIndex(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-4 right-4 rounded-full bg-primary-foreground/10 p-2 text-primary-foreground transition-colors hover:bg-primary-foreground/20"
            aria-label="Close lightbox"
          >
            <X className="h-6 w-6" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); handlePrev() }}
            className="absolute left-4 rounded-full bg-primary-foreground/10 p-2 text-primary-foreground transition-colors hover:bg-primary-foreground/20"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); handleNext() }}
            className="absolute right-4 rounded-full bg-primary-foreground/10 p-2 text-primary-foreground transition-colors hover:bg-primary-foreground/20"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          <div className="max-h-[80vh] max-w-[90vw]" onClick={(e) => e.stopPropagation()}>
            <img
              src={filtered[lightboxIndex].src}
              alt={filtered[lightboxIndex].alt}
              className="max-h-[80vh] rounded-xl object-contain"
              crossOrigin="anonymous"
            />
            <p className="mt-3 text-center text-sm font-medium text-primary-foreground">
              {filtered[lightboxIndex].alt}
            </p>
          </div>
        </div>
      )}
    </section>
  )
}

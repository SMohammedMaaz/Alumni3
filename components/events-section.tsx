"use client"

import { useEffect, useRef, useState } from "react"
import { Calendar, MapPin, Users, ArrowRight } from "lucide-react"

const upcomingEvents = [
  { title: "Annual Alumni Reunion 2026", date: "April 15, 2026", location: "VVIET Main Campus", attendees: 500, type: "Reunion", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/campus%20pic-UgwoAr2O9DGuRQ8EEC0bu6lfmuIIW2.png", featured: true },
  { title: "Tech Talk: AI in Healthcare", date: "March 22, 2026", location: "Virtual", attendees: 200, type: "Webinar", featured: false },
  { title: "Startup Networking Mixer", date: "April 5, 2026", location: "Bangalore Chapter", attendees: 80, type: "Networking", featured: false },
  { title: "Workshop: Cloud Architecture", date: "May 10, 2026", location: "Virtual", attendees: 150, type: "Workshop", featured: false },
]

const typeColors: Record<string, string> = {
  Reunion: "bg-primary/10 text-primary",
  Webinar: "bg-secondary/10 text-secondary",
  Networking: "bg-[#06b6d4]/10 text-[#06b6d4]",
  Workshop: "bg-[#f59e0b]/10 text-[#f59e0b]",
}

export function EventsSection() {
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
    <section id="events" className="relative z-10 bg-muted py-24">
      <div ref={ref} className="mx-auto max-w-7xl px-6">
        <div className={`mb-16 text-center transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-secondary">Events & Reunions</p>
          <h2 className="mb-4 text-balance text-4xl font-bold text-foreground md:text-5xl">Stay Engaged with Upcoming Events</h2>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {upcomingEvents.filter((e) => e.featured).map((event) => (
            <div key={event.title} className={`group relative overflow-hidden rounded-2xl border border-border bg-background shadow-sm transition-all duration-500 hover:shadow-xl lg:row-span-2 ${isVisible ? "animate-slide-up" : "opacity-0"}`}>
              <div className="relative h-56 overflow-hidden">
                <img src={event.image} alt={event.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" crossOrigin="anonymous" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e]/80 via-transparent to-transparent" />
                <span className={`absolute top-4 left-4 rounded-lg px-3 py-1 text-xs font-semibold ${typeColors[event.type]}`}>{event.type}</span>
              </div>
              <div className="p-6">
                <h3 className="mb-3 text-2xl font-bold text-foreground">{event.title}</h3>
                <div className="mb-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4 text-primary" />{event.date}</span>
                  <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-secondary" />{event.location}</span>
                  <span className="flex items-center gap-1.5"><Users className="h-4 w-4 text-accent" />{event.attendees}+ attending</span>
                </div>
                <button className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md">Register Now<ArrowRight className="h-4 w-4" /></button>
              </div>
            </div>
          ))}

          <div className="flex flex-col gap-4">
            {upcomingEvents.filter((e) => !e.featured).map((event, i) => (
              <div key={event.title} className={`group flex items-center gap-5 rounded-2xl border border-border bg-background p-5 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-primary/20 ${isVisible ? "animate-slide-up" : "opacity-0"}`} style={{ animationDelay: `${(i + 1) * 100}ms` }}>
                <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-xl bg-primary/8">
                  <span className="text-xs font-medium text-primary">{event.date.split(" ")[0]}</span>
                  <span className="text-lg font-bold text-primary">{event.date.split(" ")[1].replace(",", "")}</span>
                </div>
                <div className="flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <span className={`rounded-md px-2 py-0.5 text-xs font-semibold ${typeColors[event.type]}`}>{event.type}</span>
                  </div>
                  <h3 className="font-bold text-foreground">{event.title}</h3>
                  <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{event.location}</span>
                    <span className="flex items-center gap-1"><Users className="h-3 w-3" />{event.attendees}+</span>
                  </div>
                </div>
                <button className="shrink-0 rounded-xl border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-primary-foreground">Register</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

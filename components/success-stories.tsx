"use client"

import { useEffect, useRef, useState } from "react"
import { Award, Quote } from "lucide-react"

const stories = [
  {
    name: "Deepika Kulkarni",
    batch: "2015",
    dept: "Computer Science",
    achievement: "Founded a $50M AI startup that is revolutionizing healthcare diagnostics across South Asia.",
    role: "CEO & Founder",
    company: "MedAI Labs",
    avatar: "DK",
    bgColor: "bg-primary",
    quote: "VVIET gave me the foundation and the network to dream big. The mentors here shaped my entrepreneurial spirit.",
  },
  {
    name: "Suresh Babu",
    batch: "2012",
    dept: "Mechanical",
    achievement: "Led the engineering team that designed critical components for India's Mars Orbiter Mission.",
    role: "Senior Scientist",
    company: "ISRO",
    avatar: "SB",
    bgColor: "bg-secondary",
    quote: "The practical approach at VVIET prepared me for real-world engineering challenges at the highest level.",
  },
  {
    name: "Fatima Sheikh",
    batch: "2018",
    dept: "Electronics & Communication",
    achievement: "Holds 12 patents in semiconductor design and leads chip architecture at a leading global firm.",
    role: "Principal Architect",
    company: "Intel",
    avatar: "FS",
    bgColor: "bg-accent",
    quote: "The rigorous curriculum and supportive faculty at VVIET were instrumental in my career trajectory.",
  },
  {
    name: "Rajesh Patel",
    batch: "2016",
    dept: "Information Science",
    achievement: "Built open-source tools used by 2M+ developers worldwide and recognized as a Google Developer Expert.",
    role: "Staff Engineer",
    company: "GitHub",
    avatar: "RP",
    bgColor: "bg-[#f59e0b]",
    quote: "VVIET instilled in me a passion for open source and community-driven development.",
  },
]

function StoryCard({ story, index }: { story: (typeof stories)[0]; index: number }) {
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
    <div
      ref={ref}
      className={`group relative overflow-hidden rounded-2xl border border-border bg-background p-6 shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-1 ${
        isVisible ? "animate-slide-up" : "opacity-0"
      }`}
      style={{ animationDelay: `${index * 120}ms` }}
    >
      <Quote className="absolute top-4 right-4 h-8 w-8 text-muted/80" />

      <div className="mb-4 flex items-center gap-4">
        <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${story.bgColor} text-base font-bold text-primary-foreground`}>
          {story.avatar}
        </div>
        <div>
          <h3 className="font-bold text-foreground">{story.name}</h3>
          <p className="text-sm text-muted-foreground">{story.role}, {story.company}</p>
          <p className="text-xs text-muted-foreground">{story.dept} &middot; Batch of {story.batch}</p>
        </div>
      </div>

      <div className="mb-4 flex items-start gap-2 rounded-xl bg-primary/5 p-4">
        <Award className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
        <p className="text-sm font-medium leading-relaxed text-foreground">{story.achievement}</p>
      </div>

      <p className="text-sm italic leading-relaxed text-muted-foreground">
        &ldquo;{story.quote}&rdquo;
      </p>
    </div>
  )
}

export function SuccessStories() {
  return (
    <section id="stories" className="relative z-10 bg-background py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
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

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {stories.map((story, i) => (
            <StoryCard key={story.name} story={story} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

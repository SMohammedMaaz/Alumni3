"use client"

import { useEffect, useRef, useState } from "react"
import {
  Users,
  UserCheck,
  Briefcase,
  CalendarDays,
  Trophy,
  Heart,
  BookOpen,
  MessageSquare,
  ImageIcon,
  X,
} from "lucide-react"

const features = [
  {
    icon: Users,
    title: "Alumni Directory",
    description: "Search and connect with thousands of alumni across industries, companies, and locations worldwide.",
    details: "Our comprehensive directory allows you to filter by batch year, department, company, location, and more. Every profile is verified through institutional records to ensure authenticity.",
    color: "#3730a3",
  },
  {
    icon: UserCheck,
    title: "Mentorship Network",
    description: "Find experienced mentors or become one. Guide the next generation through structured programs.",
    details: "Book 1-on-1 sessions with senior alumni, join group mentorship cohorts, and access a library of career guidance resources. Our AI matching system pairs mentees with ideal mentors.",
    color: "#4f46e5",
  },
  {
    icon: Briefcase,
    title: "Job & Internship Portal",
    description: "Exclusive job postings, internship opportunities, and referrals shared by fellow alumni at top companies.",
    details: "Get priority referrals from alumni at FAANG, startups, and MNCs. Post job openings from your company to directly recruit talented VVIET graduates.",
    color: "#e11d73",
  },
  {
    icon: CalendarDays,
    title: "Events & Reunions",
    description: "Stay updated on alumni meetups, reunions, webinars, and networking events happening near you.",
    details: "From annual campus reunions to city-wise meetups, tech talks, and cultural events. Register, RSVP, and connect with attendees before, during, and after events.",
    color: "#06b6d4",
  },
  {
    icon: Trophy,
    title: "Success Stories",
    description: "Celebrate the achievements of fellow alumni. Get inspired by their journeys and accomplishments.",
    details: "Read in-depth profiles of alumni who have made it big in their fields. From startup founders to space scientists, VVIET alumni are everywhere.",
    color: "#f59e0b",
  },
  {
    icon: Heart,
    title: "Donations & Scholarships",
    description: "Give back to your alma mater. Contribute to scholarships, infrastructure, and student welfare programs.",
    details: "Support deserving students with scholarships, fund lab upgrades, or sponsor events. Every contribution is tracked transparently with impact reports.",
    color: "#ef4444",
  },
  {
    icon: BookOpen,
    title: "Knowledge Hub",
    description: "Access a curated library of resources, study materials, and industry insights shared by alumni.",
    details: "From interview prep guides to technical blog posts, research papers, and recorded webinars. Learn from the collective wisdom of the VVIET community.",
    color: "#8b5cf6",
  },
  {
    icon: MessageSquare,
    title: "Discussion Forum",
    description: "Engage in meaningful discussions on technology, career advice, campus memories, and more.",
    details: "Topic-based threads, Q&A sections, and dedicated channels for each department. Get your questions answered by experienced professionals.",
    color: "#10b981",
  },
  {
    icon: ImageIcon,
    title: "Photo Gallery",
    description: "Relive campus memories through photos from events, reunions, and campus life across the years.",
    details: "Browse a rich photo gallery organized by year, event, and department. Upload your own photos and tag fellow alumni in cherished memories.",
    color: "#f97316",
  },
]

function FeatureCard({ feature, index }: { feature: (typeof features)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [showPopup, setShowPopup] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <div
        ref={ref}
        onClick={() => setShowPopup(true)}
        onKeyDown={(e) => e.key === "Enter" && setShowPopup(true)}
        tabIndex={0}
        role="button"
        aria-label={`Learn more about ${feature.title}`}
        className={`feature-card group relative cursor-pointer overflow-hidden rounded-2xl border border-border bg-background p-6 shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-2 hover:border-transparent ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
        style={{ transitionDelay: `${index * 80}ms` }}
      >
        {/* Hover color bar at top */}
        <div
          className="absolute top-0 left-0 right-0 h-1 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
          style={{ background: feature.color }}
        />

        {/* Floating shimmer effect on hover */}
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

        <div
          className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
          style={{ background: `${feature.color}12` }}
        >
          <feature.icon className="h-6 w-6" style={{ color: feature.color }} />
        </div>
        <h3 className="mb-2 text-lg font-bold text-foreground">{feature.title}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
        <p className="mt-3 text-xs font-semibold uppercase tracking-wider transition-all duration-300 group-hover:tracking-[0.2em]" style={{ color: feature.color }}>
          Click to learn more
        </p>
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 auth-overlay"
          onClick={() => setShowPopup(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-background shadow-2xl animate-pop-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top color bar */}
            <div className="h-1 w-full" style={{ background: feature.color }} />

            <div className="p-8">
              <button
                onClick={() => setShowPopup(false)}
                className="absolute top-5 right-5 rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
              <div
                className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl"
                style={{ background: `${feature.color}12` }}
              >
                <feature.icon className="h-7 w-7" style={{ color: feature.color }} />
              </div>
              <h3 className="mb-2 text-2xl font-bold text-foreground">{feature.title}</h3>
              <p className="mb-4 leading-relaxed text-muted-foreground">{feature.description}</p>
              <p className="text-sm leading-relaxed text-foreground/80">{feature.details}</p>
              <button
                onClick={() => setShowPopup(false)}
                className="mt-6 rounded-xl px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90"
                style={{ background: feature.color }}
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export function FeaturesSection() {
  return (
    <section id="features" className="relative z-10 bg-muted py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-secondary">
            Platform Features
          </p>
          <h2 className="mb-4 text-balance text-4xl font-bold text-foreground md:text-5xl">
            Everything You Need to Stay Connected
          </h2>
          <p className="mx-auto max-w-2xl text-pretty text-muted-foreground">
            A comprehensive platform designed to foster meaningful connections between alumni, students, and the institution.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

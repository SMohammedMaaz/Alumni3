"use client"

import { useEffect, useRef, useState } from "react"
import { MapPin, Clock, ExternalLink, Tag } from "lucide-react"

const jobs = [
  { title: "Senior Frontend Developer", company: "Google", location: "Bangalore, India", type: "Full-time", posted: "2 days ago", tags: ["React", "TypeScript", "Next.js"], referral: true, internship: false, companyInitial: "G", companyColor: "bg-[#4285f4]" },
  { title: "Data Engineering Intern", company: "Amazon", location: "Hyderabad, India", type: "Internship", posted: "1 day ago", tags: ["Python", "AWS", "Spark"], referral: false, internship: true, companyInitial: "A", companyColor: "bg-[#ff9900]" },
  { title: "Product Manager", company: "Microsoft", location: "Pune, India", type: "Full-time", posted: "3 days ago", tags: ["Agile", "Strategy", "Analytics"], referral: true, internship: false, companyInitial: "M", companyColor: "bg-[#00a4ef]" },
  { title: "ML Research Engineer", company: "Meta", location: "Remote", type: "Full-time", posted: "5 days ago", tags: ["PyTorch", "NLP", "Computer Vision"], referral: false, internship: false, companyInitial: "M", companyColor: "bg-[#1877f2]" },
  { title: "DevOps Engineer", company: "Flipkart", location: "Bangalore, India", type: "Full-time", posted: "1 week ago", tags: ["Kubernetes", "Docker", "CI/CD"], referral: true, internship: false, companyInitial: "F", companyColor: "bg-[#2874f0]" },
  { title: "UI/UX Design Intern", company: "Adobe", location: "Noida, India", type: "Internship", posted: "4 days ago", tags: ["Figma", "Prototyping", "Research"], referral: false, internship: true, companyInitial: "A", companyColor: "bg-[#ff0000]" },
]

export function JobsSection() {
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
    <section id="jobs" className="relative z-10 bg-background py-24">
      <div ref={ref} className="mx-auto max-w-7xl px-6">
        <div className={`mb-16 text-center transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-secondary">Career Opportunities</p>
          <h2 className="mb-4 text-balance text-4xl font-bold text-foreground md:text-5xl">Jobs & Internships from Alumni</h2>
          <p className="mx-auto max-w-2xl text-pretty text-muted-foreground">Exclusive opportunities shared by alumni at top companies. Get referrals and fast-track your career.</p>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job, i) => (
            <div key={`${job.title}-${job.company}`} className={`group flex flex-col rounded-2xl border border-border bg-background p-6 shadow-sm transition-all duration-500 hover:shadow-lg hover:-translate-y-1 hover:border-primary/20 ${isVisible ? "animate-slide-up" : "opacity-0"}`} style={{ animationDelay: `${i * 80}ms` }}>
              <div className="mb-4 flex items-start gap-3">
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${job.companyColor} text-sm font-bold text-white`}>{job.companyInitial}</div>
                <div className="flex-1">
                  <h3 className="font-bold text-foreground">{job.title}</h3>
                  <p className="text-sm text-muted-foreground">{job.company}</p>
                </div>
              </div>
              <div className="mb-4 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{job.location}</span>
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{job.posted}</span>
              </div>
              <div className="mb-4 flex flex-wrap gap-2">
                {job.tags.map((tag) => <span key={tag} className="rounded-lg bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">{tag}</span>)}
              </div>
              <div className="mb-4 flex gap-2">
                {job.referral && <span className="flex items-center gap-1 rounded-lg bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary"><Tag className="h-3 w-3" />Referral Available</span>}
                {job.internship && <span className="rounded-lg bg-secondary/10 px-2.5 py-1 text-xs font-semibold text-secondary">Internship</span>}
              </div>
              <button className="mt-auto flex items-center justify-center gap-2 rounded-xl border border-primary/20 bg-primary/5 py-2.5 text-sm font-medium text-primary transition-all hover:bg-primary hover:text-primary-foreground"><ExternalLink className="h-4 w-4" />Apply Now</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

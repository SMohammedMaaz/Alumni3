"use client"

import { useState, useEffect, useRef } from "react"
import { Search, MapPin, Building2, GraduationCap, MessageCircle, CheckCircle2 } from "lucide-react"

const departments = [
  "All Departments", "Computer Science", "Information Science",
  "Electronics & Communication", "Electrical & Electronics",
  "Mechanical", "Civil", "MCA", "MBA",
]
const years = ["All Years", "2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017"]

const alumni = [
  { name: "Priya Sharma", role: "Senior Software Engineer", company: "Google", year: "2019", dept: "Computer Science", location: "Bangalore", avatar: "PS", verified: true },
  { name: "Rahul Mehta", role: "Product Manager", company: "Microsoft", year: "2020", dept: "Information Science", location: "Hyderabad", avatar: "RM", verified: true },
  { name: "Ananya Reddy", role: "Data Scientist", company: "Amazon", year: "2021", dept: "Electronics & Communication", location: "Chennai", avatar: "AR", verified: true },
  { name: "Karthik Nair", role: "Civil Engineer", company: "L&T Construction", year: "2022", dept: "Civil", location: "Mumbai", avatar: "KN", verified: false },
  { name: "Sneha Patil", role: "ML Engineer", company: "Meta", year: "2020", dept: "Computer Science", location: "San Francisco", avatar: "SP", verified: true },
  { name: "Arjun Desai", role: "Mechanical Designer", company: "Tesla", year: "2019", dept: "Mechanical", location: "Austin", avatar: "AD", verified: true },
]

const avatarColors = ["bg-primary", "bg-secondary", "bg-accent", "bg-[#06b6d4]", "bg-[#8b5cf6]", "bg-[#10b981]"]

export function DirectorySection() {
  const [search, setSearch] = useState("")
  const [dept, setDept] = useState("All Departments")
  const [year, setYear] = useState("All Years")
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

  const filtered = alumni.filter((a) => {
    const matchSearch = a.name.toLowerCase().includes(search.toLowerCase()) || a.company.toLowerCase().includes(search.toLowerCase()) || a.role.toLowerCase().includes(search.toLowerCase())
    const matchDept = dept === "All Departments" || a.dept === dept
    const matchYear = year === "All Years" || a.year === year
    return matchSearch && matchDept && matchYear
  })

  return (
    <section id="directory" className="relative z-10 py-24 bg-background">
      <div ref={ref} className="mx-auto max-w-7xl px-6">
        <div className={`mb-16 text-center transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-secondary">Alumni Directory</p>
          <h2 className="mb-4 text-balance text-4xl font-bold text-foreground md:text-5xl">Find & Connect with Fellow Alumni</h2>
        </div>

        <div className={`mb-10 flex flex-col gap-4 rounded-2xl border border-border bg-muted p-6 md:flex-row transition-all duration-700 delay-200 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input type="text" placeholder="Search by name, role, or company..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full rounded-xl border border-border bg-background py-3 pl-10 pr-4 text-sm text-foreground placeholder-muted-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20" />
          </div>
          <select value={dept} onChange={(e) => setDept(e.target.value)} aria-label="Filter by department" className="rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20">
            {departments.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
          <select value={year} onChange={(e) => setYear(e.target.value)} aria-label="Filter by year" className="rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20">
            {years.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((person, i) => (
            <div key={person.name} className={`group overflow-hidden rounded-2xl border border-border bg-background p-6 shadow-sm transition-all duration-500 hover:shadow-lg hover:-translate-y-1 hover:border-primary/20 ${isVisible ? "animate-slide-up" : "opacity-0"}`} style={{ animationDelay: `${i * 80}ms` }}>
              <div className="mb-4 flex items-center gap-4">
                <div className={`flex h-12 w-12 items-center justify-center rounded-full ${avatarColors[i % avatarColors.length]} text-sm font-bold text-primary-foreground`}>{person.avatar}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-semibold text-foreground">{person.name}</h3>
                    {person.verified && <CheckCircle2 className="h-4 w-4 text-primary" />}
                  </div>
                  <p className="text-sm text-muted-foreground">{person.role}</p>
                </div>
              </div>
              <div className="mb-4 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-xs text-muted-foreground"><Building2 className="h-3.5 w-3.5 text-primary" />{person.company}</div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground"><MapPin className="h-3.5 w-3.5 text-secondary" />{person.location}</div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground"><GraduationCap className="h-3.5 w-3.5 text-accent" />{person.dept} &middot; Class of {person.year}</div>
              </div>
              <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-primary/20 bg-primary/5 py-2.5 text-sm font-medium text-primary transition-all hover:bg-primary hover:text-primary-foreground">
                <MessageCircle className="h-4 w-4" />Connect
              </button>
            </div>
          ))}
        </div>
        {filtered.length === 0 && <div className="py-16 text-center"><p className="text-muted-foreground">No alumni found matching your criteria.</p></div>}
      </div>
    </section>
  )
}

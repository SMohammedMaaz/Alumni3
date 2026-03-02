"use client"

import { useState, useEffect, useRef } from "react"
import { Eye, Target, MapPin, Calendar, ShieldCheck } from "lucide-react"

function FlipCard({
  front,
  back,
  icon: Icon,
  color,
}: {
  front: { title: string; subtitle: string }
  back: { content: string[] | string }
  icon: React.ElementType
  color: string
}) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      className={`flip-card cursor-pointer ${flipped ? "flipped" : ""}`}
      onClick={() => setFlipped(!flipped)}
      onKeyDown={(e) => e.key === "Enter" && setFlipped(!flipped)}
      tabIndex={0}
      role="button"
      aria-label={`${front.title} - click to flip`}
    >
      <div className="flip-card-inner relative h-[340px] w-full">
        {/* Front */}
        <div
          className="flip-card-front absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-border p-8 shadow-lg transition-shadow hover:shadow-xl"
          style={{ background: `linear-gradient(135deg, ${color}08, ${color}15)` }}
        >
          <div
            className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl"
            style={{ background: `${color}15` }}
          >
            <Icon className="h-8 w-8" style={{ color }} />
          </div>
          <h3 className="mb-2 text-2xl font-bold text-foreground">{front.title}</h3>
          <p className="text-sm text-muted-foreground">{front.subtitle}</p>
          <p className="mt-4 text-xs font-medium uppercase tracking-widest" style={{ color }}>
            Click to read
          </p>
        </div>

        {/* Back */}
        <div
          className="flip-card-back absolute inset-0 flex flex-col justify-center rounded-2xl p-8 text-primary-foreground shadow-lg"
          style={{ background: `linear-gradient(135deg, ${color}, ${color}dd)` }}
        >
          <h3 className="mb-4 text-xl font-bold">{front.title}</h3>
          {Array.isArray(back.content) ? (
            <ul className="flex flex-col gap-2.5">
              {back.content.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm leading-relaxed text-primary-foreground/90">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-foreground/60" />
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm leading-relaxed text-primary-foreground/90">{back.content}</p>
          )}
          <p className="mt-4 text-xs font-medium uppercase tracking-widest text-primary-foreground/60">
            Click to flip back
          </p>
        </div>
      </div>
    </div>
  )
}

export function AboutSection() {
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
    <section id="about" className="relative z-10 py-24 bg-background overflow-hidden">
      <div ref={ref} className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className={`mb-16 text-center transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-secondary">
            About VVIET
          </p>
          <h2 className="mb-4 text-balance text-4xl font-bold text-foreground md:text-5xl">
            Overview of the Institute
          </h2>
        </div>

        {/* About Content */}
        <div className={`mb-20 grid grid-cols-1 gap-12 lg:grid-cols-2 transition-all duration-700 delay-200 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
          <div className="flex flex-col justify-center">
            <h3 className="mb-4 text-2xl font-bold text-foreground">
              About <span className="text-primary">VVIET</span>
            </h3>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Vidya Vikas Institute of Engineering & Technology (V.V.I.E.T) was started in 1997</strong>, in pursuit of developing science & technology through teaching, research and development. We deliver best-quality education and training to mould the technophiles into highly professional world-class engineers.
            </p>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              VVIET is recognized by the Government of Karnataka as well as the All India Council of Technical Education (AICTE), New Delhi, affiliated to the Visvesvaraya Technological University (VTU), Belgaum and governed by Vidya Vikas Educational Trust.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We provide some of the best placement opportunities to our students and our students have found their place in top rated companies in the world.
            </p>

            {/* Quick facts */}
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                { icon: MapPin, label: "Mysuru, Karnataka", sub: "Location" },
                { icon: Calendar, label: "Est. 1997", sub: "Founded" },
                { icon: ShieldCheck, label: "AICTE & VTU", sub: "Recognized" },
              ].map((fact) => (
                <div key={fact.sub} className="flex items-center gap-3 rounded-xl bg-muted p-3">
                  <fact.icon className="h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">{fact.label}</p>
                    <p className="text-xs text-muted-foreground">{fact.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Campus Image */}
          <div className="relative overflow-hidden rounded-2xl shadow-xl">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/campus%20pic-UgwoAr2O9DGuRQ8EEC0bu6lfmuIIW2.png"
              alt="VVIET Campus"
              className="h-full w-full object-cover"
              crossOrigin="anonymous"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#1a1a2e]/80 to-transparent p-6">
              <p className="text-sm font-medium text-primary-foreground">
                VVIET Main Campus, Mysuru
              </p>
            </div>
          </div>
        </div>

        {/* Mission & Vision Flip Cards */}
        <div className={`grid grid-cols-1 gap-8 md:grid-cols-2 transition-all duration-700 delay-400 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
          <FlipCard
            icon={Target}
            color="#3730a3"
            front={{
              title: "Our Mission",
              subtitle: "Driving excellence in education & innovation",
            }}
            back={{
              content: [
                "To offer highest Professional and Academic Standards in terms of Personal growth and satisfaction.",
                "To provide a platform where independent learning and scientific study are encouraged.",
                "To encourage students to implement applications of Engineering with a focus on societal needs.",
                "To empower students with vast technical and life skills for top placements.",
                "To create a benchmark in Research, Education and Public Outreach.",
              ],
            }}
          />
          <FlipCard
            icon={Eye}
            color="#ec4899"
            front={{
              title: "Our Vision",
              subtitle: "Inspiring world-class creativity & excellence",
            }}
            back={{
              content:
                "Our vision is to provide learning opportunities, ensuring excellence in education, research and facilitate an inspiring world class environment to encourage creativity. The Institute is committed to disseminating knowledge, and through its ingenuity, bring this knowledge to bear on the world's great challenges. VVIET is dedicated to providing its students with an education that combines academic study and the excitement of discovery kindled by a diverse campus community.",
            }}
          />
        </div>
      </div>
    </section>
  )
}

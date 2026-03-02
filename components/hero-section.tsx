"use client"

import { useEffect, useState, useRef, useCallback, useMemo } from "react"
import { ArrowRight, Users, Briefcase, GraduationCap, Award, Sparkles } from "lucide-react"

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const duration = 2000
          const start = Date.now()
          const tick = () => {
            const elapsed = Date.now() - start
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * target))
            if (progress < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  )
}

/* Floating particles - generated client-side only to avoid hydration mismatch */
function FloatingParticles() {
  const [mounted, setMounted] = useState(false)
  const particles = useMemo(() => {
    if (typeof window === "undefined") return []
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      width: Math.random() * 4 + 2,
      height: Math.random() * 4 + 2,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 8,
      duration: Math.random() * 10 + 12,
    }))
  }, [])

  useEffect(() => { setMounted(true) }, [])

  if (!mounted) return null

  return (
    <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className="floating-particle absolute rounded-full bg-white/20"
          style={{
            width: `${p.width}px`,
            height: `${p.height}px`,
            left: `${p.left}%`,
            top: `${p.top}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  )
}

export function HeroSection({ onAuthOpen }: { onAuthOpen: () => void }) {
  const [visible, setVisible] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 12,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 12,
    })
  }, [])

  const stats = [
    { icon: Users, label: "Active Alumni", value: 15000, suffix: "+" },
    { icon: Briefcase, label: "Job Placements", value: 5200, suffix: "+" },
    { icon: GraduationCap, label: "Mentors Available", value: 1800, suffix: "+" },
    { icon: Award, label: "Years of Excellence", value: 28, suffix: "" },
  ]

  return (
    <section
      id="hero"
      className="relative flex h-dvh items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Full-screen background image with parallax */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/campus%20pic-UgwoAr2O9DGuRQ8EEC0bu6lfmuIIW2.png"
          alt="VVIET Campus aerial view"
          className="h-full w-full object-cover brightness-110 contrast-105 saturate-110 transition-transform duration-[1500ms] ease-out will-change-transform"
          crossOrigin="anonymous"
          loading="eager"
          style={{
            transform: `scale(1.05) translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)`,
          }}
        />
        {/* Cinematic overlay - lighter to let the campus photo stand out */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/15 to-black/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#3730a3]/8 via-transparent to-[#e11d73]/5" />
      </div>

      {/* Floating particles */}
      <FloatingParticles />

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-6 text-center">

        {/* Logo with glow */}
        <div
          className={`mb-6 transition-all duration-1000 delay-200 ${
            visible ? "translate-y-0 opacity-100 scale-100" : "translate-y-6 opacity-0 scale-75"
          }`}
        >
          <div className="relative">
            <div className="absolute -inset-4 rounded-full bg-white/10 blur-2xl animate-pulse-slow" />
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/college%20logo-OGBaj8rInj6iAS4KtgmdpE1n4QsByG.png"
              alt="VVIET Logo"
              className="relative h-24 w-24 drop-shadow-[0_4px_30px_rgba(255,255,255,0.2)] md:h-28 md:w-28"
            />
          </div>
        </div>

        {/* Institute name - BOLD, COLORFUL */}
        <div
          className={`mb-3 transition-all duration-1000 delay-400 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <h2 className="institute-name text-balance text-sm font-bold uppercase tracking-[0.18em] md:text-base lg:text-lg">
            <span className="bg-gradient-to-r from-[#f0c27f] via-[#ffffff] to-[#f0c27f] bg-clip-text text-transparent">
              Vidya Vikas Institute of Engineering & Technology
            </span>
          </h2>
        </div>

        {/* Title with accent line */}
        <div
          className={`mb-4 transition-all duration-1000 delay-500 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="mx-auto mb-4 h-[2px] w-16 bg-gradient-to-r from-transparent via-white/60 to-transparent" />
          <h1 className="text-balance text-3xl font-extrabold leading-[1.08] tracking-tight text-white drop-shadow-lg md:text-5xl lg:text-6xl">
            Alumni
            <span className="block bg-gradient-to-r from-white via-[#c7d2fe] to-white bg-clip-text text-transparent">
              Network
            </span>
          </h1>
        </div>

        {/* Subtitle */}
        <p
          className={`mx-auto mb-8 max-w-xl text-pretty text-base leading-relaxed text-white/75 transition-all duration-1000 delay-700 md:text-lg ${
            visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          Connecting generations of engineers for mentorship, career growth, and lasting impact.
          Join 15,000+ alumni building the future together.
        </p>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col items-center justify-center gap-3 transition-all duration-1000 delay-[900ms] sm:flex-row ${
            visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <button
            onClick={onAuthOpen}
            className="group relative flex items-center gap-2 overflow-hidden rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-[#3730a3] shadow-[0_8px_32px_rgba(255,255,255,0.2)] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(255,255,255,0.3)] hover:scale-[1.03]"
          >
            <Sparkles size={16} className="text-[#3730a3]" />
            Join the Network
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </button>

          <a
            href="#about"
            className="group flex items-center gap-2 rounded-xl border-2 border-white/30 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/60 hover:bg-white/10"
          >
            Explore
            <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>

        {/* Stats bar */}
        <div
          className={`mt-10 grid w-full max-w-2xl grid-cols-2 gap-3 transition-all duration-1000 delay-[1100ms] sm:grid-cols-4 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group flex flex-col items-center rounded-xl border border-white/10 bg-white/[0.07] px-3 py-4 backdrop-blur-lg transition-all duration-400 hover:bg-white/15 hover:border-white/25 hover:-translate-y-1"
            >
              <stat.icon className="mb-1.5 h-4 w-4 text-white/50 transition-colors group-hover:text-white/80" />
              <p className="text-xl font-bold tabular-nums text-white md:text-2xl">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-[10px] font-medium tracking-wide text-white/50">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={`absolute bottom-8 left-1/2 z-10 -translate-x-1/2 transition-all duration-1000 delay-[1400ms] ${visible ? "opacity-100" : "opacity-0"}`}>
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/40">Scroll</span>
          <div className="h-8 w-[1.5px] animate-scroll-line bg-gradient-to-b from-white/50 to-transparent" />
        </div>
      </div>
    </section>
  )
}

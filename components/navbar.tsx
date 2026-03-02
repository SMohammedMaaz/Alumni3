"use client"

import { useState, useEffect } from "react"
import { Menu, X, LogIn, LogOut, UserCircle } from "lucide-react"

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Features", href: "#features" },
  { label: "Directory", href: "#directory" },
  { label: "Mentorship", href: "#mentorship" },
  { label: "Jobs", href: "#jobs" },
  { label: "Events", href: "#events" },
  { label: "Stories", href: "#stories" },
  { label: "Gallery", href: "#gallery" },
]

interface NavbarProps {
  onAuthOpen: () => void
  isLoggedIn: boolean
  userName: string
  onLogout: () => void
}

export function Navbar({ onAuthOpen, isLoggedIn, userName, onLogout }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/95 shadow-md backdrop-blur-xl py-2"
          : "bg-gradient-to-b from-black/60 via-black/30 to-transparent py-4"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <a href="#hero" className="flex items-center gap-3 group">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/college%20logo-OGBaj8rInj6iAS4KtgmdpE1n4QsByG.png"
            alt="VVIET Logo"
            className="h-10 w-10 transition-transform duration-300 group-hover:scale-105"
            width={40}
            height={40}
          />
          <div className="flex flex-col">
            <span className={`text-lg font-bold tracking-tight transition-colors duration-300 ${scrolled ? "text-foreground" : "text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]"}`}>
              VVIET Alumni
            </span>
            <span className={`-mt-1 text-[10px] font-medium tracking-[0.2em] uppercase transition-colors duration-300 ${scrolled ? "text-muted-foreground" : "text-white/70 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]"}`}>
              Network
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`relative rounded-lg px-3 py-2 text-[13px] font-semibold transition-all duration-200 ${
                scrolled
                  ? "text-muted-foreground hover:text-foreground hover:bg-muted"
                  : "text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] hover:text-white hover:bg-white/15"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <div className={`flex items-center gap-2 rounded-lg px-3 py-2 ${scrolled ? "text-foreground" : "text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]"}`}>
                <UserCircle className="h-5 w-5" />
                <span className="text-sm font-medium">{userName}</span>
              </div>
              <button
                onClick={onLogout}
                className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all duration-300 ${
                  scrolled
                    ? "border border-border text-foreground hover:bg-muted"
                    : "border border-white/40 text-white hover:bg-white/15 drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]"
                }`}
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={onAuthOpen}
              className={`flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                scrolled
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "bg-white text-[#3730a3] shadow-lg hover:bg-white/95 hover:shadow-xl"
              }`}
            >
              <LogIn className="h-4 w-4" />
              Sign In
            </button>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`rounded-lg p-2 transition-colors lg:hidden ${
            scrolled ? "text-foreground hover:bg-muted" : "text-white hover:bg-white/15"
          }`}
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Divider line */}
      <div className="mx-auto mt-2 max-w-7xl">
        <div
          className={`mx-6 transition-all duration-500 ${
            scrolled
              ? "h-px bg-border"
              : "h-[2px] bg-gradient-to-r from-transparent via-white/40 to-transparent"
          }`}
        />
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="mx-4 mt-3 overflow-hidden rounded-2xl border border-border bg-background/98 p-2 shadow-2xl backdrop-blur-xl lg:hidden animate-fade-in">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block rounded-xl px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              {link.label}
            </a>
          ))}
          <div className="mx-2 mt-2 border-t border-border pt-3 pb-1">
            {isLoggedIn ? (
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 px-4 py-2 text-foreground">
                  <UserCircle className="h-5 w-5" />
                  <span className="text-sm font-medium">{userName}</span>
                </div>
                <button
                  onClick={() => { setMobileOpen(false); onLogout() }}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-border px-5 py-3 text-sm font-semibold text-foreground transition-all hover:bg-muted"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => { setMobileOpen(false); onAuthOpen() }}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90"
              >
                <LogIn className="h-4 w-4" />
                Sign In / Register
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

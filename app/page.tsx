"use client"

import { useState, useCallback } from "react"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { FeaturesSection } from "@/components/features-section"
import { DirectorySection } from "@/components/directory-section"
import { MentorshipSection } from "@/components/mentorship-section"
import { JobsSection } from "@/components/jobs-section"
import { EventsSection } from "@/components/events-section"
import { SuccessStories } from "@/components/success-stories"
import { DonationsSection } from "@/components/donations-section"
import { GallerySection } from "@/components/gallery-section"
import { AuthModal } from "@/components/auth-section"
import { Footer } from "@/components/footer"
import { Lock, LogIn } from "lucide-react"

export default function Home() {
  const [authOpen, setAuthOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState("")

  const handleAuthOpen = useCallback(() => setAuthOpen(true), [])
  const handleAuthClose = useCallback(() => setAuthOpen(false), [])

  const handleAuthSuccess = useCallback((name: string) => {
    setIsLoggedIn(true)
    setUserName(name)
    setAuthOpen(false)
  }, [])

  const handleLogout = useCallback(() => {
    setIsLoggedIn(false)
    setUserName("")
  }, [])

  return (
    <main className="relative min-h-screen bg-background">
      <Navbar
        onAuthOpen={handleAuthOpen}
        isLoggedIn={isLoggedIn}
        userName={userName}
        onLogout={handleLogout}
      />
      <HeroSection onAuthOpen={handleAuthOpen} />
      <AboutSection />
      <FeaturesSection />

      {/* Public sections - visible to all */}
      <SuccessStories />
      <EventsSection />
      <GallerySection />

      {/* Gated content - only visible after login */}
      {isLoggedIn ? (
        <>
          <DirectorySection />
          <MentorshipSection />
          <JobsSection />
          <DonationsSection />
        </>
      ) : (
        <section className="relative z-10 bg-muted py-24">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
              <Lock className="h-10 w-10 text-primary" />
            </div>
            <h2 className="mb-4 text-balance text-3xl font-bold text-foreground md:text-4xl">
              Unlock the Full Alumni Experience
            </h2>
            <p className="mb-8 mx-auto max-w-xl text-pretty text-muted-foreground leading-relaxed">
              Sign in or create your account to access the Alumni Directory, Mentorship Network, Job Portal,
              Donations, and much more.
            </p>
            <button
              onClick={handleAuthOpen}
              className="group inline-flex items-center gap-2.5 rounded-2xl bg-primary px-10 py-4 text-base font-bold text-primary-foreground shadow-lg transition-all duration-300 hover:bg-primary/90 hover:shadow-xl hover:scale-[1.02]"
            >
              <LogIn className="h-5 w-5" />
              Sign In to Continue
            </button>
          </div>
        </section>
      )}

      <Footer />
      <AuthModal
        isOpen={authOpen}
        onClose={handleAuthClose}
        onSuccess={handleAuthSuccess}
      />
    </main>
  )
}

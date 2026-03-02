"use client"

import { useState, useRef, useEffect } from "react"
import { Mail, Phone, Lock, User, ArrowRight, CheckCircle2, Shield, X, GraduationCap, Eye, EyeOff, Hash } from "lucide-react"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: (name: string) => void
}

export function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "register">("login")
  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("email")
  const [showPassword, setShowPassword] = useState(false)
  const [formState, setFormState] = useState<"idle" | "loading" | "success">("idle")
  const [error, setError] = useState("")
  const firstInputRef = useRef<HTMLInputElement>(null)

  // Form fields
  const [loginUsn, setLoginUsn] = useState("")
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPhone, setLoginPhone] = useState("")
  const [loginPassword, setLoginPassword] = useState("")

  const [regName, setRegName] = useState("")
  const [regUsn, setRegUsn] = useState("")
  const [regEmail, setRegEmail] = useState("")
  const [regBatch, setRegBatch] = useState("")
  const [regDept, setRegDept] = useState("")
  const [regPassword, setRegPassword] = useState("")

  // Focus first input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => firstInputRef.current?.focus(), 200)
    }
  }, [isOpen, mode])

  // Reset when closed
  useEffect(() => {
    if (!isOpen) {
      setFormState("idle")
      setError("")
      setShowPassword(false)
    }
  }, [isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Basic validation
    if (mode === "login") {
      if (!loginUsn.trim()) {
        setError("Please enter your USN")
        return
      }
      if (loginMethod === "email" && (!loginEmail.trim() || !loginPassword.trim())) {
        setError("Please fill in all fields")
        return
      }
      if (loginMethod === "phone" && !loginPhone.trim()) {
        setError("Please enter your phone number")
        return
      }
    } else {
      if (!regName.trim() || !regUsn.trim() || !regEmail.trim() || !regBatch.trim() || !regDept || !regPassword.trim()) {
        setError("Please fill in all fields")
        return
      }
      if (regPassword.length < 6) {
        setError("Password must be at least 6 characters")
        return
      }
    }

    setFormState("loading")
    // Simulate auth
    setTimeout(() => {
      setFormState("success")
      const name = mode === "login" ? (loginUsn || "Alumni") : regName
      setTimeout(() => {
        onSuccess(name)
        // Reset fields
        setLoginUsn(""); setLoginEmail(""); setLoginPhone(""); setLoginPassword("")
        setRegName(""); setRegUsn(""); setRegEmail(""); setRegBatch(""); setRegDept(""); setRegPassword("")
        setFormState("idle")
      }, 1200)
    }, 1200)
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 auth-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Authentication"
    >
      <div
        className="relative w-full max-w-md overflow-hidden rounded-2xl border border-border bg-background shadow-2xl animate-pop-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top accent line */}
        <div className="h-1 w-full bg-gradient-to-r from-primary via-accent to-secondary" />

        <div className="max-h-[85vh] overflow-y-auto p-8">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 z-10 rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Close authentication dialog"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Header */}
          <div className="mb-6 flex items-center gap-3">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/college%20logo-OGBaj8rInj6iAS4KtgmdpE1n4QsByG.png"
              alt="VVIET Logo"
              className="h-10 w-10"
              width={40}
              height={40}
            />
            <div>
              <h2 className="text-xl font-bold text-foreground">VVIET Alumni</h2>
              <p className="text-xs text-muted-foreground">
                {mode === "login" ? "Welcome back" : "Join the network"}
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-6 flex rounded-xl bg-muted p-1">
            <button
              type="button"
              onClick={() => { setMode("login"); setError("") }}
              className={`flex-1 rounded-lg py-2.5 text-sm font-semibold transition-all duration-200 ${
                mode === "login"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setMode("register"); setError("") }}
              className={`flex-1 rounded-lg py-2.5 text-sm font-semibold transition-all duration-200 ${
                mode === "register"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Register
            </button>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-4 rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm font-medium text-destructive animate-fade-in">
              {error}
            </div>
          )}

          {formState === "success" ? (
            <div className="flex flex-col items-center py-8 animate-pop-in">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#10b981]/10">
                <CheckCircle2 className="h-8 w-8 text-[#10b981]" />
              </div>
              <h3 className="mb-1 text-lg font-bold text-foreground">
                {mode === "login" ? "Welcome Back!" : "Account Created!"}
              </h3>
              <p className="text-sm text-muted-foreground">Taking you to the dashboard...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {mode === "login" ? (
                <>
                  {/* Login method toggle */}
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setLoginMethod("email")}
                      className={`flex flex-1 items-center justify-center gap-2 rounded-xl border py-2.5 text-sm font-medium transition-all duration-200 ${
                        loginMethod === "email"
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-border text-muted-foreground hover:border-primary/30"
                      }`}
                    >
                      <Mail className="h-4 w-4" />
                      Email
                    </button>
                    <button
                      type="button"
                      onClick={() => setLoginMethod("phone")}
                      className={`flex flex-1 items-center justify-center gap-2 rounded-xl border py-2.5 text-sm font-medium transition-all duration-200 ${
                        loginMethod === "phone"
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-border text-muted-foreground hover:border-primary/30"
                      }`}
                    >
                      <Phone className="h-4 w-4" />
                      Phone
                    </button>
                  </div>

                  {/* USN field for login */}
                  <div>
                    <label htmlFor="login-usn" className="mb-1.5 block text-sm font-medium text-foreground">
                      USN (University Seat Number)
                    </label>
                    <div className="relative">
                      <Hash className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <input
                        ref={firstInputRef}
                        id="login-usn"
                        type="text"
                        value={loginUsn}
                        onChange={(e) => setLoginUsn(e.target.value)}
                        placeholder="e.g. 4VV20CS001"
                        className="w-full rounded-xl border border-border bg-background py-3 pl-10 pr-4 text-sm text-foreground placeholder-muted-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </div>

                  {loginMethod === "email" ? (
                    <>
                      <div>
                        <label htmlFor="login-email" className="mb-1.5 block text-sm font-medium text-foreground">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <input
                            id="login-email"
                            type="email"
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                            placeholder="alumni@vviet.ac.in"
                            className="w-full rounded-xl border border-border bg-background py-3 pl-10 pr-4 text-sm text-foreground placeholder-muted-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="login-password" className="mb-1.5 block text-sm font-medium text-foreground">
                          Password
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <input
                            id="login-password"
                            type={showPassword ? "text" : "password"}
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                            placeholder="Enter your password"
                            className="w-full rounded-xl border border-border bg-background py-3 pl-10 pr-12 text-sm text-foreground placeholder-muted-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                        <div className="mt-1.5 text-right">
                          <button type="button" className="text-xs font-medium text-primary hover:underline">
                            Forgot password?
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <label htmlFor="login-phone" className="mb-1.5 block text-sm font-medium text-foreground">
                          Phone Number
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <input
                            id="login-phone"
                            type="tel"
                            value={loginPhone}
                            onChange={(e) => setLoginPhone(e.target.value)}
                            placeholder="+91 9876543210"
                            className="w-full rounded-xl border border-border bg-background py-3 pl-10 pr-4 text-sm text-foreground placeholder-muted-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        className="flex items-center justify-center gap-2 rounded-xl border border-primary bg-primary/5 py-3 text-sm font-semibold text-primary transition-all hover:bg-primary/10"
                      >
                        Send OTP
                      </button>
                      <div className="flex justify-center gap-3">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                          <input
                            key={i}
                            type="text"
                            maxLength={1}
                            aria-label={`OTP digit ${i}`}
                            className="h-12 w-10 rounded-lg border border-border bg-background text-center text-lg font-bold text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                          />
                        ))}
                      </div>
                    </>
                  )}
                </>
              ) : (
                <>
                  <div>
                    <label htmlFor="register-name" className="mb-1.5 block text-sm font-medium text-foreground">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <input
                        ref={mode === "register" ? firstInputRef : undefined}
                        id="register-name"
                        type="text"
                        value={regName}
                        onChange={(e) => setRegName(e.target.value)}
                        placeholder="Enter your full name"
                        className="w-full rounded-xl border border-border bg-background py-3 pl-10 pr-4 text-sm text-foreground placeholder-muted-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </div>

                  {/* USN field for registration */}
                  <div>
                    <label htmlFor="register-usn" className="mb-1.5 block text-sm font-medium text-foreground">
                      USN (University Seat Number)
                    </label>
                    <div className="relative">
                      <Hash className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <input
                        id="register-usn"
                        type="text"
                        value={regUsn}
                        onChange={(e) => setRegUsn(e.target.value)}
                        placeholder="e.g. 4VV20CS001"
                        className="w-full rounded-xl border border-border bg-background py-3 pl-10 pr-4 text-sm text-foreground placeholder-muted-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <p className="mt-1 text-[11px] text-muted-foreground">
                      Your VTU University Seat Number for alumni verification
                    </p>
                  </div>

                  <div>
                    <label htmlFor="register-email" className="mb-1.5 block text-sm font-medium text-foreground">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <input
                        id="register-email"
                        type="email"
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        placeholder="alumni@vviet.ac.in"
                        className="w-full rounded-xl border border-border bg-background py-3 pl-10 pr-4 text-sm text-foreground placeholder-muted-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="register-batch" className="mb-1.5 block text-sm font-medium text-foreground">
                        Batch Year
                      </label>
                      <div className="relative">
                        <GraduationCap className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <input
                          id="register-batch"
                          type="text"
                          value={regBatch}
                          onChange={(e) => setRegBatch(e.target.value)}
                          placeholder="e.g. 2020"
                          className="w-full rounded-xl border border-border bg-background py-3 pl-10 pr-4 text-sm text-foreground placeholder-muted-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="register-dept" className="mb-1.5 block text-sm font-medium text-foreground">
                        Department
                      </label>
                      <select
                        id="register-dept"
                        value={regDept}
                        onChange={(e) => setRegDept(e.target.value)}
                        className="w-full rounded-xl border border-border bg-background py-3 px-3 text-sm text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                      >
                        <option value="">Select</option>
                        <option>CSE</option>
                        <option>ISE</option>
                        <option>ECE</option>
                        <option>EEE</option>
                        <option>ME</option>
                        <option>CE</option>
                        <option>MCA</option>
                        <option>MBA</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="register-password" className="mb-1.5 block text-sm font-medium text-foreground">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <input
                        id="register-password"
                        type={showPassword ? "text" : "password"}
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        placeholder="Create a strong password"
                        className="w-full rounded-xl border border-border bg-background py-3 pl-10 pr-12 text-sm text-foreground placeholder-muted-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 rounded-xl border border-primary/10 bg-primary/5 p-3">
                    <Shield className="h-4 w-4 shrink-0 text-primary" />
                    <p className="text-xs text-muted-foreground">
                      Your alumni status will be verified using your USN through institutional records. You will receive a{" "}
                      <span className="inline-flex items-center gap-1 font-semibold text-primary">
                        <CheckCircle2 className="h-3 w-3" />
                        verified badge
                      </span>{" "}
                      upon confirmation.
                    </p>
                  </div>
                </>
              )}

              <button
                type="submit"
                disabled={formState === "loading"}
                className="flex items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-bold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md disabled:opacity-70"
              >
                {formState === "loading" ? (
                  <span className="flex items-center gap-2">
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Processing...
                  </span>
                ) : (
                  <>
                    {mode === "login" ? "Sign In" : "Create Account"}
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

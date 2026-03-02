import { Heart, MapPin, Phone, Mail } from "lucide-react"

const footerLinks = {
  Platform: ["Alumni Directory", "Mentorship", "Job Portal", "Events", "Success Stories", "Gallery"],
  Institution: ["About VVIET", "Departments", "Admissions", "Campus Life", "NAAC", "Contact"],
  Resources: ["Help Center", "Privacy Policy", "Terms of Service", "FAQs", "Blog", "Newsletter"],
  Connect: ["LinkedIn", "Twitter", "Instagram", "YouTube", "Facebook", "Alumni Office"],
}

export function Footer() {
  return (
    <footer className="relative z-10 bg-foreground text-background">
      {/* Top divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-6">
          {/* Brand */}
          <div className="col-span-2">
            <div className="mb-4 flex items-center gap-3">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/college%20logo-OGBaj8rInj6iAS4KtgmdpE1n4QsByG.png"
                alt="VVIET Logo"
                className="h-10 w-10"
                width={40}
                height={40}
              />
              <div>
                <span className="text-lg font-bold text-background">VVIET Alumni</span>
                <p className="text-[10px] uppercase tracking-[0.15em] text-background/40">Network</p>
              </div>
            </div>
            <p className="mb-6 max-w-xs text-sm leading-relaxed text-background/50">
              Building bridges between generations of engineers. Stay connected, give back, and grow together.
            </p>
            <div className="flex flex-col gap-2.5 text-xs text-background/40">
              <span className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 shrink-0" />
                #127-128, Mysuru - Bannur Road, Alanahally, Mysuru - 570 028
              </span>
              <span className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 shrink-0" />
                +91-821-2472734
              </span>
              <span className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 shrink-0" />
                info@vidyavikas.edu.in
              </span>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="mb-4 text-sm font-bold text-background">{title}</h3>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-background/40 transition-colors hover:text-background/80">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-background/10 pt-8 md:flex-row">
          <p className="text-xs text-background/30">
            2026 VVIET Alumni Network. Affiliated to VTU, Belgaum. Approved by AICTE, New Delhi.
          </p>
          <p className="flex items-center gap-1.5 text-xs text-background/30">
            Made with <Heart className="h-3 w-3 fill-secondary text-secondary" /> by VVIET Alumni Association
          </p>
        </div>
      </div>
    </footer>
  )
}

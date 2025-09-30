"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Instagram } from "lucide-react"

interface FooterProps {
  className?: string
}

const Footer: React.FC<FooterProps> = ({ className = "" }) => {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail("")
    }
  }

  return (
    <footer className={`bg-surface-1/20 backdrop-blur-sm border-t border-border/50 ${className}`}>
      <div className="container max-w-[1280px] mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Mobile First Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 mb-8 sm:mb-12">
          
          {/* Left - Automation */}
          <div className="space-y-6 sm:space-y-8">
            <div>
              <h3 className="text-lg font-heading font-semibold text-foreground mb-4 text-blue-400">
                Automation
              </h3>
              
              {/* Quick Links */}
              <div className="mb-4 sm:mb-6">
                <h4 className="text-sm font-medium text-foreground mb-3">Quick Links</h4>
                <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 text-sm">
                  <a href="/services" className="text-muted-foreground hover:text-blue-400 transition-colors duration-200 py-1">
                    Services
                  </a>
                  <a href="/cases" className="text-muted-foreground hover:text-blue-400 transition-colors duration-200 py-1">
                    Cases
                  </a>
                  <a href="/docs" className="text-muted-foreground hover:text-blue-400 transition-colors duration-200 py-1">
                    Docs
                  </a>
                </div>
              </div>

              {/* Contact */}
              <div className="mb-4 sm:mb-6">
                <h4 className="text-sm font-medium text-foreground mb-3">Contact</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <a 
                    href="mailto:ailumi333@gmail.com" 
                    className="hover:text-blue-400 transition-colors duration-200 block py-1"
                  >
                    ailumi333@gmail.com
                  </a>
                </div>
              </div>

              {/* Newsletter */}
              <div>
                <h4 className="text-sm font-medium text-foreground mb-3">Newsletter</h4>
                {isSubscribed ? (
                  <p className="text-sm text-emerald-500">Thanks for subscribing!</p>
                ) : (
                  <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2">
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email…"
                      className="flex-1 bg-surface-1/50 border-border/50 text-sm"
                      required
                    />
                    <Button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 whitespace-nowrap"
                    >
                      Send
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Right - Creative */}
          <div className="space-y-6 sm:space-y-8">
            <div>
              <h3 className="text-lg font-heading font-semibold text-foreground mb-4 text-emerald-400">
                Creative
              </h3>
              
              {/* Social Connect */}
              <div className="mb-4 sm:mb-6">
                <h4 className="text-sm font-medium text-foreground mb-3">Social</h4>
                <div className="flex gap-4">
                  <a
                    href="https://www.instagram.com/lumi.ai_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-emerald-400 transition-colors duration-200 p-2 -m-2"
                    aria-label="Follow us on Instagram"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Legal */}
              <div className="mb-4 sm:mb-6">
                <h4 className="text-sm font-medium text-foreground mb-3">Legal</h4>
                <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 text-sm">
                  <a href="/privacy" className="text-muted-foreground hover:text-emerald-400 transition-colors duration-200 py-1">
                    Privacy Policy
                  </a>
                  <a href="/terms" className="text-muted-foreground hover:text-emerald-400 transition-colors duration-200 py-1">
                    Terms of Service
                  </a>
                </div>
              </div>

              {/* Explore */}
              <div>
                <h4 className="text-sm font-medium text-foreground mb-3">Explore</h4>
                <div className="grid grid-cols-2 gap-2 sm:gap-4 text-sm">
                  <a href="/about" className="text-muted-foreground hover:text-emerald-400 transition-colors duration-200 py-1">
                    About
                  </a>
                  <a href="/blog" className="text-muted-foreground hover:text-emerald-400 transition-colors duration-200 py-1">
                    Blog
                  </a>
                  <a href="/careers" className="text-muted-foreground hover:text-emerald-400 transition-colors duration-200 py-1">
                    Careers
                  </a>
                  <a href="/contact" className="text-muted-foreground hover:text-emerald-400 transition-colors duration-200 py-1">
                    Contact
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Center - Divider */}
        <div className="w-px h-8 sm:h-12 bg-gradient-to-b from-blue-500 to-emerald-500 mx-auto mb-6 sm:mb-8 opacity-50" />

        {/* Center Bottom */}
        <div className="text-center space-y-3 sm:space-y-4">
          <p className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-foreground">
            Stillness is the move.
          </p>
          <p className="text-xs sm:text-sm text-muted-foreground">
            © 2024 LUMI AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
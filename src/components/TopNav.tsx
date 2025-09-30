"use client"

import React, { useState } from "react"
import { Menu, X, Globe, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface TopNavProps {
  className?: string
}

const TopNav: React.FC<TopNavProps> = ({ className = "" }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState("EN")

  const navItems = [
    { label: "Work", href: "/work" },
    { label: "Services", href: "/services" },
    { label: "Team", href: "/team" },
    { label: "Contact", href: "/contact" },
  ]

  const languages = ["EN", "ES", "FR"]

  return (
    <nav className={`w-full bg-background/80 backdrop-blur-md border-b border-border/50 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="flex flex-col">
              <h1 className="text-xl font-heading font-bold text-foreground">
                LUMI AI
              </h1>
              <p className="text-xs text-muted-foreground">
                Intelligent Solutions
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Nav Links */}
            <div className="flex items-center space-x-6">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200 ease-out relative group"
                  aria-label={`Navigate to ${item.label}`}
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-200 ease-out group-hover:w-full" />
                </a>
              ))}
            </div>

            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-primary transition-colors duration-200 ease-out"
                  aria-label="Select language"
                >
                  <Globe className="h-4 w-4 mr-2" />
                  {selectedLanguage}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-20">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang}
                    onClick={() => setSelectedLanguage(lang)}
                    className={`cursor-pointer ${selectedLanguage === lang ? 'bg-surface-2' : ''}`}
                  >
                    {lang}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Social Icons */}
            <div className="flex items-center space-x-2">
              <a
                href="https://www.instagram.com/lumi.ai_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-200 ease-out"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>

            {/* CTA Button */}
            <Button
              className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 ease-out font-medium px-4 py-2 rounded-full"
              aria-label="Contact us"
            >
              Contact
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <DropdownMenu open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-foreground hover:bg-surface-1 focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                  aria-label={isMobileMenuOpen ? "Close menu" : "Open main menu"}
                  aria-expanded={isMobileMenuOpen}
                >
                  {isMobileMenuOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 mt-2 bg-surface-1 border-border/50 shadow-lg"
              >
                {navItems.map((item) => (
                  <DropdownMenuItem key={item.label} asChild>
                    <a
                      href={item.href}
                      className="block px-4 py-2 text-sm text-foreground hover:bg-surface-2 hover:text-primary transition-colors duration-200 ease-out cursor-pointer"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  </DropdownMenuItem>
                ))}
                
                {/* Language Options */}
                <div className="px-4 py-2 border-t border-border/50">
                  <p className="text-xs text-muted-foreground mb-2">Language</p>
                  <div className="flex space-x-2">
                    {languages.map((lang) => (
                      <button
                        key={lang}
                        onClick={() => {
                          setSelectedLanguage(lang)
                          setIsMobileMenuOpen(false)
                        }}
                        className={`text-xs px-2 py-1 rounded transition-colors duration-200 ease-out ${
                          selectedLanguage === lang 
                            ? 'bg-primary text-primary-foreground' 
                            : 'text-muted-foreground hover:text-primary'
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Social Links */}
                <div className="px-4 py-2 border-t border-border/50">
                  <div className="flex space-x-4">
                    <a
                      href="https://www.instagram.com/lumi.ai_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors duration-200 ease-out"
                      aria-label="Follow us on Instagram"
                    >
                      <Instagram className="h-4 w-4" />
                    </a>
                  </div>
                </div>

                <DropdownMenuItem asChild>
                  <div className="px-4 py-2">
                    <Button
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 ease-out font-medium rounded-full"
                      onClick={() => setIsMobileMenuOpen(false)}
                      aria-label="Contact us"
                    >
                      Contact
                    </Button>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default TopNav
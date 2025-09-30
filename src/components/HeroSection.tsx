"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Sparkles, Zap, Target } from "lucide-react"

interface HeroSectionProps {
  className?: string
}

const HeroSection: React.FC<HeroSectionProps> = ({ className = "" }) => {
  const stats = [
    {
      icon: Zap,
      value: "340%",
      label: "Average ROI Increase"
    },
    {
      icon: Target,
      value: "48hrs",
      label: "to First Automation"
    },
    {
      icon: Sparkles,
      value: "50+",
      label: "Processes Automated"
    }
  ]

  return (
    <section className={`relative min-h-screen flex items-center justify-center py-12 px-4 sm:py-20 ${className}`}>
      <div className="text-center max-w-4xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 rounded-full bg-surface-1/50 border border-border/50 backdrop-blur-sm mb-6 sm:mb-8">
          <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
          <span className="text-xs sm:text-sm font-medium text-muted-foreground">
            Transforming Businesses with AI Since 2024
          </span>
        </div>

        {/* Headline - Better mobile scaling */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-foreground mb-4 sm:mb-6 tracking-wide leading-tight">
          LUMI AI
        </h1>

        {/* Subheading - Better mobile scaling */}
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-heading font-semibold text-muted-foreground mb-6 sm:mb-8 tracking-wide leading-tight px-4">
          Where Intelligent Systems Meet Cinematic Creativity
        </h2>

        {/* Value Proposition - Better mobile formatting */}
        <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed px-4">
          We don't just implement AI—we orchestrate digital transformations that increase efficiency by{" "}
          <span className="font-bold text-primary">340%</span> while elevating your brand story to cinematic heights.
        </p>

        {/* Key Stats - Mobile responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-12 max-w-xl mx-auto px-4">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <div
                key={index}
                className="bg-surface-1/30 backdrop-blur-sm border border-border/50 rounded-lg p-3 sm:p-4 text-center hover:bg-surface-1/50 transition-all duration-300 ease-out"
              >
                <IconComponent className="w-4 h-4 text-primary mx-auto mb-2" />
                <div className="text-base sm:text-lg font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground leading-tight">
                  {stat.label}
                </div>
              </div>
            )
          })}
        </div>

        {/* Calls to Action - Mobile stack with better spacing */}
        <div className="flex flex-col gap-3 sm:gap-4 justify-center items-center px-4 sm:flex-row">
          <Button
            className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 ease-out font-medium px-6 sm:px-8 py-3 rounded-full text-base sm:text-lg"
            aria-label="Explore Automation solutions"
          >
            Explore Automation
          </Button>
          <Button
            className="w-full sm:w-auto bg-emerald-600 text-white hover:bg-emerald-700 transition-all duration-300 ease-out font-medium px-6 sm:px-8 py-3 rounded-full text-base sm:text-lg"
            aria-label="Explore Creative solutions"
          >
            Explore Creative
          </Button>
          <Button
            variant="outline"
            className="w-full sm:w-auto border-border/50 text-muted-foreground hover:text-foreground hover:bg-surface-1/50 transition-all duration-300 ease-out font-medium px-6 sm:px-8 py-3 rounded-full text-base sm:text-lg"
            aria-label="Book Free Consultation"
          >
            Book Free Consultation
          </Button>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
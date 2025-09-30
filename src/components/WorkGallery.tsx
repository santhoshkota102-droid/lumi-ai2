"use client"

import React, { useState, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, Grid3X3, ChevronLeft, ChevronRight } from "lucide-react"
import useEmblaCarousel from 'embla-carousel-react'

interface CaseStudyProps {
  id: number
  title: string
  roi: string
  challenge: string
  solution: string
  results: string
  metrics: string[]
  category: "automation" | "creative"
}

const CaseStudyCard: React.FC<{ caseStudy: CaseStudyProps }> = ({ caseStudy }) => {
  return (
    <Card className="relative overflow-hidden bg-white hover:bg-white shadow-sm hover:shadow-md border border-border/50 transition-all duration-300 ease-out group min-w-0 flex-shrink-0 w-full sm:w-auto">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-500" />
            <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
              {caseStudy.roi}
            </Badge>
          </div>
          <Badge variant="outline" className="text-xs border-border/50">
            {caseStudy.category}
          </Badge>
        </div>
        
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
          {caseStudy.title}
        </h3>
        
        <div className="space-y-3 mb-4">
          <div>
            <span className="text-xs font-medium text-foreground">Challenge:</span>
            <p className="text-sm text-muted-foreground">{caseStudy.challenge}</p>
          </div>
          
          <div>
            <span className="text-xs font-medium text-foreground">Solution:</span>
            <p className="text-sm text-muted-foreground">{caseStudy.solution}</p>
          </div>
          
          <div>
            <span className="text-xs font-medium text-foreground">Results:</span>
            <p className="text-sm text-muted-foreground">{caseStudy.results}</p>
          </div>
        </div>
        
        <div className="space-y-2">
          <span className="text-xs font-medium text-foreground">Key Metrics:</span>
          <div className="flex flex-wrap gap-1">
            {caseStudy.metrics.map((metric, index) => (
              <Badge key={index} variant="outline" className="text-xs border-border/50">
                {metric}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface WorkGalleryProps {
  className?: string
}

const WorkGallery: React.FC<WorkGalleryProps> = ({ className = "" }) => {
  const [activeFilter, setActiveFilter] = useState<"all" | "automation" | "creative">("all")
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: false, 
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: true
  })

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const caseStudies: CaseStudyProps[] = [
    {
      id: 1,
      title: "Customer Support Voice agent",
      roi: "Response time −80%",
      challenge: "200+ daily support calls with 45-minute average wait times.",
      solution: "Vapi voice agent handling common inquiries with CRM integration and escalation.",
      results: "80% of calls resolved instantly; wait time reduced to under 2 minutes.",
      metrics: ["80% Instant Resolution", "−89% Wait Time", "94% Customer Satisfaction"],
      category: "automation"
    },
    {
      id: 2,
      title: "Brand Identity System for Tech Startup",
      roi: "Brand recall +340%",
      challenge: "Needed cohesive identity in competitive SaaS market.",
      solution: "Comprehensive brand system with logo, typography, colors.",
      results: "340% brand recall increase, 89% trust improvement.",
      metrics: ["+340% Brand Recall", "+89% Trust Score", "+156% Conversion Rate"],
      category: "creative"
    },
    {
      id: 3,
      title: "AI‑Powered Customer Service Bot",
      roi: "Response time −85%",
      challenge: "200+ daily inquiries; long wait times.",
      solution: "Intelligent chatbot with NLP and auto‑routing.",
      results: "Response time reduced from 6 hours to 54 minutes; 78% auto‑handled.",
      metrics: ["−85% Response Time", "78% Automation Rate", "+92% Satisfaction"],
      category: "automation"
    },
    {
      id: 4,
      title: "Motion Graphics Campaign",
      roi: "Engagement +420%",
      challenge: "Low social engagement; poor brand visibility.",
      solution: "Dynamic motion graphics with consistent visual language.",
      results: "420% engagement boost; 94% completion rates.",
      metrics: ["+420% Engagement", "94% Completion Rate", "+267% Reach"],
      category: "creative"
    },
    {
      id: 5,
      title: "Automate HR Onboarding",
      roi: "Onboarding time −60%",
      challenge: "New employee setup taking 2 weeks across 8 different systems.",
      solution: "HR systems, and equipment tracking.",
      results: "Complete onboarding automated in 3 days; zero manual account creation.",
      metrics: ["60% Faster Onboarding", "100% System Integration", "95% Employee Satisfaction"],
      category: "automation"
    },
    {
      id: 6,
      title: "Mailchimp E‑commerce Email Automation",
      roi: "Revenue per email +310%",
      challenge: "Generic email campaigns with 2% conversion rate and high unsubscribe rates.",
      solution: "Mailchimp behavioral triggers with abandoned cart, browse abandonment, and win-back series.",
      results: "Personalized email journeys increased revenue per email by 310% and retention by 67%.",
      metrics: ["+310% Revenue/Email", "+67% Customer Retention", "8.5% Conversion Rate"],
      category: "automation"
    }
  ]

  const filteredCaseStudies = activeFilter === "all" 
    ? caseStudies 
    : caseStudies.filter(study => study.category === activeFilter)

  return (
    <section className={`py-12 sm:py-20 ${className}`}>
      <div className="text-center mb-12 sm:mb-16 px-4">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Grid3X3 className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground">
            Case Studies
          </h2>
        </div>
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore our collection of transformative case studies and proven results.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="flex justify-center mb-8 sm:mb-12 px-4">
        <div className="bg-surface-1/30 backdrop-blur-sm border border-border/50 rounded-full p-1">
          <Button
            variant={activeFilter === "all" ? "default" : "ghost"}
            className={`rounded-full px-3 sm:px-4 py-2 text-sm transition-all duration-300 ease-out ${
              activeFilter === "all" 
                ? "bg-primary text-primary-foreground" 
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => setActiveFilter("all")}
          >
            All
          </Button>
          <Button
            variant={activeFilter === "automation" ? "default" : "ghost"}
            className={`rounded-full px-3 sm:px-4 py-2 text-sm transition-all duration-300 ease-out ${
              activeFilter === "automation" 
                ? "bg-primary text-primary-foreground" 
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => setActiveFilter("automation")}
          >
            Automation
          </Button>
          <Button
            variant={activeFilter === "creative" ? "default" : "ghost"}
            className={`rounded-full px-3 sm:px-4 py-2 text-sm transition-all duration-300 ease-out ${
              activeFilter === "creative" 
                ? "bg-emerald-600 text-white" 
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => setActiveFilter("creative")}
          >
            Creative
          </Button>
        </div>
      </div>

      {/* Mobile Carousel + Desktop Grid */}
      <div className="px-4">
        {/* Mobile Carousel (hidden on md+) */}
        <div className="block md:hidden relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4">
              {filteredCaseStudies.map((caseStudy) => (
                <div key={caseStudy.id} className="flex-none w-[85vw] max-w-sm">
                  <CaseStudyCard caseStudy={caseStudy} />
                </div>
              ))}
            </div>
          </div>
          
          {/* Carousel Controls */}
          <div className="flex justify-center gap-2 mt-6">
            <Button
              variant="outline"
              size="icon"
              onClick={scrollPrev}
              className="border-border/50 hover:bg-surface-1/50"
              aria-label="Previous case study"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={scrollNext}
              className="border-border/50 hover:bg-surface-1/50"
              aria-label="Next case study"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Desktop Grid (hidden on mobile) */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {filteredCaseStudies.map((caseStudy) => (
            <CaseStudyCard key={caseStudy.id} caseStudy={caseStudy} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default WorkGallery
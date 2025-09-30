"use client"

import React, { useState, useCallback, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bot, Zap, FileText, MessageCircle, Settings, Camera, Palette, Video, Film, Layout, ChevronLeft, ChevronRight, Eye, X, Shield } from "lucide-react"
import useEmblaCarousel from 'embla-carousel-react'
import Image from "next/image"

interface ExpertiseCardProps {
  title: string
  metric?: string
  description: string
  caseStudy: string
  tags: string[]
  size: "large" | "medium" | "small"
  icon: React.ElementType
  images?: string[]
  bgImage?: string
}

// Image Carousel Modal Component
const ImageCarouselModal: React.FC<{
  isOpen: boolean
  onClose: () => void
  images: string[]
  title: string
}> = ({ isOpen, onClose, images, title }) => {
  const [imagesLoaded, setImagesLoaded] = useState<Record<number, boolean>>({})
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true, 
    align: 'center',
    containScroll: 'trimSnaps'
  })

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const handleImageLoad = (index: number) => {
    setImagesLoaded(prev => ({ ...prev, [index]: true }))
  }

  // Handle ESC key press
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }
    
    if (isOpen) {
      document.addEventListener('keydown', handleEsc)
      document.body.style.overflow = 'hidden' // Prevent background scroll
    }
    
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-4xl mx-4 bg-surface-1/95 backdrop-blur-md border border-border/50 rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border/50">
          <h3 className="text-xl font-heading font-semibold text-foreground">
            {title} Portfolio
          </h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Image Carousel */}
        <div className="relative p-6">
          <div className="overflow-hidden rounded-lg" ref={emblaRef}>
            <div className="flex">
              {images.map((image, index) => (
                <div key={index} className="flex-none w-full h-64 sm:h-80 md:h-96 relative">
                  {/* Loading skeleton */}
                  {!imagesLoaded[index] && (
                    <div className="absolute inset-0 bg-surface-2/50 animate-pulse rounded-lg flex items-center justify-center">
                      <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                    </div>
                  )}
                  <Image
                    src={image}
                    alt={`${title} example ${index + 1}`}
                    fill
                    className={`object-contain rounded-lg transition-opacity duration-300 ${
                      imagesLoaded[index] ? 'opacity-100' : 'opacity-0'
                    }`}
                    sizes="(max-width: 768px) 90vw, (max-width: 1200px) 80vw, 70vw"
                    priority={index === 0}
                    onLoad={() => handleImageLoad(index)}
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation Controls */}
          <div className="absolute inset-y-0 left-2 flex items-center">
            <Button
              variant="secondary"
              size="icon"
              onClick={scrollPrev}
              className="w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 border-0 text-white shadow-lg"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="absolute inset-y-0 right-2 flex items-center">
            <Button
              variant="secondary"
              size="icon"
              onClick={scrollNext}
              className="w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 border-0 text-white shadow-lg"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        {/* Footer with image counter */}
        <div className="flex items-center justify-center p-4 border-t border-border/50">
          <p className="text-sm text-muted-foreground">
            {images.length} images • Use arrow keys or click arrows to navigate
          </p>
        </div>
      </div>
    </div>
  )
}

const ExpertiseCard: React.FC<ExpertiseCardProps> = ({
  title,
  metric,
  description,
  caseStudy,
  tags,
  size,
  icon: IconComponent,
  images,
  bgImage
}) => {
  const [showModal, setShowModal] = useState(false)

  const openModal = () => {
    if (images && images.length > 0) {
      setShowModal(true)
    }
  }

  const closeModal = () => {
    setShowModal(false)
  }

  const sizeClasses = {
    large: "md:col-span-2 md:row-span-2",
    medium: "md:col-span-1 md:row-span-2",
    small: "md:col-span-1 md:row-span-1"
  }
  const sizeHeights = {
    large: "min-h-80",
    medium: "min-h-72",
    small: "min-h-56"
  }

  return (
    <>
      <Card className={`relative overflow-hidden bg-white hover:bg-white shadow-sm hover:shadow-md border border-border/50 transition-all duration-300 ease-out group min-w-0 flex-shrink-0 w-full ${sizeClasses[size]} ${sizeHeights[size]}`}>
        {bgImage && (
          <div className="absolute inset-0" aria-hidden>
            <Image src={bgImage} alt="" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover object-center opacity-60 group-hover:opacity-70 transition-opacity duration-300 scale-105 group-hover:scale-110 will-change-transform ease-out" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          </div>
        )}
        <CardContent className="relative z-10 p-6 h-full flex flex-col">
          <div className="flex items-start justify-between mb-4">
            <IconComponent className={`w-6 h-6 flex-shrink-0 ${bgImage ? 'text-black' : 'text-primary'}`} />
            {metric && (
              <Badge variant="secondary" className={`${bgImage ? 'bg-black/10 text-black border-black/20' : 'bg-primary/10 text-primary border-primary/20'}`}>
                {metric}
              </Badge>
            )}
          </div>
          
          <h3 className={`text-lg font-heading font-semibold mb-3 group-hover:text-primary transition-colors duration-300 ${bgImage ? 'text-black' : 'text-foreground'}`}>
            {title}
          </h3>
          
          {/* View Portfolio Button (only show if images exist) */}
          {images && images.length > 0 && (
            <div className="mb-4">
              <Button
                variant="outline"
                size="sm"
                onClick={openModal}
                className={`${bgImage ? 'border-black/30 text-black hover:bg-black/10 hover:border-black/50' : 'border-primary/20 text-primary hover:bg-primary/10 hover:border-primary/40'} transition-all duration-300`}
              >
                <Eye className="w-4 h-4 mr-2" />
                View Portfolio ({images.length})
              </Button>
            </div>
          )}
          
          <p className={`text-sm mb-4 flex-grow ${bgImage ? 'text-black/80' : 'text-muted-foreground'}`}>
            {description}
          </p>
          
          <div className="space-y-3">
            <p className={`${bgImage ? 'text-black/70' : 'text-muted-foreground'} text-xs`}>
              <span className={`font-medium ${bgImage ? 'text-black' : 'text-foreground'}`}>Case Study:</span> {caseStudy}
            </p>
            
            <div className="flex flex-wrap gap-1">
              {tags.map((tag, index) => (
                <Badge key={index} variant="outline" className={`text-xs ${bgImage ? 'border-black/30 text-black/80' : 'border-border/50'}`}>
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Image Carousel Modal */}
      {images && images.length > 0 && (
        <ImageCarouselModal
          isOpen={showModal}
          onClose={closeModal}
          images={images}
          title={title}
        />
      )}
    </>
  )
}

interface AboutSectionProps {
  className?: string
}

const AboutSection: React.FC<AboutSectionProps> = ({ className = "" }) => {
  const [activeTab, setActiveTab] = useState<"automation" | "creative" | "film">("automation")
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

  const automationCards: ExpertiseCardProps[] = [
    {
      title: "Voice AI Agents",
      metric: "95% customer satisfaction",
      description: "Conversational AI that handles complex customer interactions.",
      caseStudy: "Healthcare provider, 60% reduced wait times.",
      tags: ["AI", "Automation", "Architecture"],
      size: "large",
      icon: Bot
    },
    {
      title: "Lead Generation Systems",
      metric: "300% ROI increase",
      description: "Automated prospecting and qualification pipelines.",
      caseStudy: "Tripled qualified leads for B2B SaaS.",
      tags: ["AI", "Automation", "Architecture"],
      size: "medium",
      icon: Zap
    },
    {
      title: "Content Operations",
      description: "Streamlined content creation and distribution workflows.",
      caseStudy: "70% production time reduction.",
      tags: ["AI", "Automation", "Architecture"],
      size: "medium",
      icon: FileText
    },
    {
      title: "Customer Support Bots",
      metric: "85% auto-resolved",
      description: "AI-powered support that resolves issues instantly.",
      caseStudy: "85% tickets handled without human intervention.",
      tags: ["AI", "Automation"],
      size: "small",
      icon: MessageCircle
    },
    {
      title: "Internal Tools",
      description: "Custom automation solutions for operational efficiency.",
      caseStudy: "80% manual process reduction.",
      tags: ["Automation", "Tools"],
      size: "small",
      icon: Settings
    }
  ]

  const creativeCards: ExpertiseCardProps[] = [
    {
      title: "Product Photography",
      metric: "40% conversion boost",
      description: "High-impact visuals that drive conversions.",
      caseStudy: "E‑commerce conversion increase through strategic lighting.",
      tags: ["Photography", "E-commerce"],
      size: "large",
      icon: Camera,
      images: [
        "https://ijvvidutcnvpmgetiagk.supabase.co/storage/v1/object/public/product%20photography/5e576c3e-71d4-471d-8d2a-d8d236a5c136.png",
        "https://ijvvidutcnvpmgetiagk.supabase.co/storage/v1/object/public/product%20photography/e16367d0-97a0-497a-adc7-42dc40e1e562.png",
        "https://ijvvidutcnvpmgetiagk.supabase.co/storage/v1/object/public/product%20photography/Generated%20Image%20August%2029,%202025%20-%206_47PM.jpeg",
        "https://ijvvidutcnvpmgetiagk.supabase.co/storage/v1/object/public/product%20photography/Generated%20Image%20August%2029,%202025%20-%206_51PM.jpeg",
        "https://ijvvidutcnvpmgetiagk.supabase.co/storage/v1/object/public/product%20photography/jimeng-2025-06-02-958-Create%20an%20ultra-realistic%20promotional%20image%20in%20portrait%20orientation%20featuring%20....jpeg",
        "https://ijvvidutcnvpmgetiagk.supabase.co/storage/v1/object/public/product%20photography/My%20ChatGPT%20image%20(1).png",
        "https://ijvvidutcnvpmgetiagk.supabase.co/storage/v1/object/public/product%20photography/My%20ChatGPT%20image%20(2).png"
      ]
    },
    {
      title: "Fashion Frames",
      description: "Editorial-style shoots that capture brand essence.",
      caseStudy: "Enhanced brand perception and social engagement.",
      tags: ["Fashion", "Editorial"],
      size: "medium",
      icon: Palette,
      images: [
        "https://ijvvidutcnvpmgetiagk.supabase.co/storage/v1/object/public/fashion%20photography/7b565a1c-f5c7-4f5c-ab69-6eb6c767fcf1%20(1).png",
        "https://ijvvidutcnvpmgetiagk.supabase.co/storage/v1/object/public/fashion%20photography/88aa52e2-1276-4127-92b4-e52b36c1fb3b.png",
        "https://ijvvidutcnvpmgetiagk.supabase.co/storage/v1/object/public/fashion%20photography/9472316c-fc57-4fc5-8e09-70e0fb054db7.png",
        "https://ijvvidutcnvpmgetiagk.supabase.co/storage/v1/object/public/fashion%20photography/Generated%20Image%20September%2002,%202025%20-%201_20PM.jpeg",
        "https://ijvvidutcnvpmgetiagk.supabase.co/storage/v1/object/public/fashion%20photography/Generated%20Image%20September%2002,%202025%20-%202_29PM.jpeg",
        "https://ijvvidutcnvpmgetiagk.supabase.co/storage/v1/object/public/fashion%20photography/Generated%20Image%20September%2002,%202025%20-%202_40PM.jpeg",
        "https://ijvvidutcnvpmgetiagk.supabase.co/storage/v1/object/public/fashion%20photography/Generated%20Image%20September%2003,%202025%20-%2010_54PM.jpeg",
        "https://ijvvidutcnvpmgetiagk.supabase.co/storage/v1/object/public/fashion%20photography/jimeng-2025-05-18-420-A%20portrait%20of%20a%20rugged%20South%20Asian%20man%20in%20his%20early%2030s,%20medium%20build,%20medium%20....jpeg",
        "https://ijvvidutcnvpmgetiagk.supabase.co/storage/v1/object/public/fashion%20photography/WhatsApp%20Image%202025-08-30%20at%2011.19.48_470010e4.jpg"
      ]
    },
    {
      title: "Ad Mockups",
      description: "Compelling visuals for digital advertising campaigns.",
      caseStudy: "65% click-through rate improvement.",
      tags: ["Advertising", "Digital"],
      size: "medium",
      icon: Layout,
      images: [
        "https://ijvvidutcnvpmgetiagk.supabase.co/storage/v1/object/public/ad%20mockups/4c0b07ea-fca0-4fca-bbad-9fba2bf9b272.png",
        "https://ijvvidutcnvpmgetiagk.supabase.co/storage/v1/object/public/ad%20mockups/6a64a2e2-7fda-47fd-bb5e-d3b5b17f0f7c%20(1).png",
        "https://ijvvidutcnvpmgetiagk.supabase.co/storage/v1/object/public/ad%20mockups/Generated%20Image%20September%2003,%202025%20-%204_14PM.jpeg",
        "https://ijvvidutcnvpmgetiagk.supabase.co/storage/v1/object/public/ad%20mockups/Generated%20Image%20September%2006,%202025%20-%205_36PM.jpeg",
        "https://ijvvidutcnvpmgetiagk.supabase.co/storage/v1/object/public/ad%20mockups/Generated%20Image%20September%2006,%202025%20-%205_44PM.jpeg",
        "https://ijvvidutcnvpmgetiagk.supabase.co/storage/v1/object/public/ad%20mockups/Generated%20Image%20September%2006,%202025%20-%206_11PM.jpeg",
        "https://ijvvidutcnvpmgetiagk.supabase.co/storage/v1/object/public/ad%20mockups/Generated%20Image%20September%2006,%202025%20-%206_13PM.jpeg",
        "https://ijvvidutcnvpmgetiagk.supabase.co/storage/v1/object/public/ad%20mockups/Generated%20Image%20September%2006,%202025%20-%206_17PM.jpeg"
      ]
    },
    {
      title: "Film Shots",
      description: "Cinematic storytelling for brand narratives.",
      caseStudy: "Increased brand awareness and emotional connection.",
      tags: ["Film", "Storytelling"],
      size: "small",
      icon: Video
    }
  ]

  const filmCards: ExpertiseCardProps[] = [
    {
      title: "Voice clone",
      metric: "Ultra‑natural",
      description: "Clone voices for multilingual film dubbing and AI narration.",
      caseStudy: "Localized 12 videos in 5 languages in 48h.",
      tags: ["Gen AI", "Voice", "Dubbing"],
      size: "large",
      icon: MessageCircle
    },
    {
      title: "face swap",
      metric: "Frame‑accurate",
      description: "Photoreal face swaps with ethical guardrails.",
      caseStudy: "Seamless talent replacement for 6 scenes.",
      tags: ["Face", "VFX"],
      size: "medium",
      icon: Settings
    },
    {
      title: "consistent face output's",
      metric: "Shot‑to‑shot",
      description: "Character‑locked generations across scenes and days.",
      caseStudy: "Series character continuity maintained.",
      tags: ["Gen AI", "Continuity"],
      size: "medium",
      icon: Layout
    },
    {
      title: "Story board",
      metric: "Pre‑viz",
      description: "AI boards from script beats with lenses and blocking.",
      caseStudy: "Halved pre‑prod time.",
      tags: ["Boards", "Pre‑viz"],
      size: "small",
      icon: Film
    },
    {
      title: "Camera POV",
      metric: "Lens‑aware",
      description: "Simulate lenses, moves, and rigs before shoot.",
      caseStudy: "Picked the right lens package.",
      tags: ["Camera", "Lenses"],
      size: "small",
      icon: Camera
    }
  ]

  const currentCards =
    activeTab === "automation"
      ? automationCards
      : activeTab === "creative"
      ? creativeCards
      : filmCards

  return (
    <section className={`py-12 sm:py-20 ${className}`}>
      <div className="text-center mb-12 sm:mb-16 px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
          Our Expertise
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
          We combine cutting-edge automation with creative excellence to deliver transformative solutions for your business.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center mb-4 sm:mb-6 px-4">
        <div className="bg-surface-1/30 backdrop-blur-sm border border-border/50 rounded-full p-1 flex gap-1">
          <Button
            variant={activeTab === "automation" ? "default" : "ghost"}
            className={`rounded-full px-4 sm:px-6 py-2 transition-all duration-300 ease-out ${
              activeTab === "automation" 
                ? "bg-primary text-primary-foreground" 
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => setActiveTab("automation")}
          >
            Automation
          </Button>
          <Button
            variant={activeTab === "creative" ? "default" : "ghost"}
            className={`rounded-full px-4 sm:px-6 py-2 transition-all duration-300 ease-out ${
              activeTab === "creative" 
                ? "bg-emerald-600 text-white" 
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => setActiveTab("creative")}
          >
            Creative
          </Button>
          <Button
            variant={activeTab === "film" ? "default" : "ghost"}
            className={`rounded-full px-4 sm:px-6 py-2 transition-all duration-300 ease-out ${
              activeTab === "film" 
                ? "bg-black text-white" 
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => setActiveTab("film")}
          >
            GEN AI FILM
          </Button>
        </div>
      </div>

      <div className="px-4">
        {/* Mobile Carousel (hidden on md+) */}
        <div className="block md:hidden relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4">
              {currentCards.map((card, index) => (
                <div key={`${activeTab}-${index}`} className="flex-none w-[85vw] max-w-sm">
                  <ExpertiseCard {...card} />
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
              aria-label="Previous expertise card"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={scrollNext}
              className="border-border/50 hover:bg-surface-1/50"
              aria-label="Next expertise card"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Desktop Bento Grid (hidden on mobile) */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {currentCards.map((card, index) => (
            <ExpertiseCard key={`${activeTab}-${index}`} {...card} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default AboutSection
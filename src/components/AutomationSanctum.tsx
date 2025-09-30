"use client"

import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, MessageCircle, Brain, Shuffle, Database, Zap } from "lucide-react"

interface AutomationSanctumProps {
  className?: string
}

const AutomationSanctum: React.FC<AutomationSanctumProps> = ({ className = "" }) => {
  const services = [
    {
      name: "Google Drive",
      icon: FileText,
      position: { x: 10, y: 20 }
    },
    {
      name: "Notion", 
      icon: Database,
      position: { x: 25, y: 15 }
    },
    {
      name: "WhatsApp",
      icon: MessageCircle,
      position: { x: 40, y: 25 }
    },
    {
      name: "AI",
      icon: Brain,
      position: { x: 55, y: 10 }
    },
    {
      name: "Zapier",
      icon: Shuffle,
      position: { x: 70, y: 20 }
    },
    {
      name: "Docs",
      icon: FileText,
      position: { x: 85, y: 15 }
    },
    {
      name: "Messenger",
      icon: MessageCircle,
      position: { x: 60, y: 30 }
    }
  ]

  return (
    <section className={`py-20 ${className}`}>
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
          The future is both intelligent and beautiful — LUMI AI unites logic & art.
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Watch our animated beam flow through your ecosystem — Google Drive, Notion, WhatsApp, AI, Zapier, Docs, and Messenger — connecting data, workflows, and stories into one luminous system.
        </p>
      </div>

      {/* Ecosystem Visualization */}
      <div className="relative max-w-4xl mx-auto">
        <Card className="relative overflow-hidden bg-white hover:bg-white shadow-sm hover:shadow-md border border-border/50 transition-all duration-300 ease-out">
          <CardContent className="p-12">
            <div className="relative h-64 w-full">
              {/* Animated beam paths */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 40">
                {/* Main connecting beam */}
                <path
                  d="M5 20 Q30 10 55 20 Q80 30 95 20"
                  fill="none"
                  stroke="url(#beamGradient)"
                  strokeWidth="0.5"
                  className="animate-pulse"
                />
                
                {/* Secondary connecting lines */}
                <path
                  d="M25 15 Q40 25 55 10"
                  fill="none"
                  stroke="url(#beamGradient)"
                  strokeWidth="0.3"
                  className="animate-pulse"
                  style={{ animationDelay: "0.5s" }}
                />
                
                <path
                  d="M40 25 Q55 15 70 20"
                  fill="none"
                  stroke="url(#beamGradient)"
                  strokeWidth="0.3"
                  className="animate-pulse"
                  style={{ animationDelay: "1s" }}
                />

                <defs>
                  <linearGradient id="beamGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.2" />
                    <stop offset="50%" stopColor="rgb(16, 185, 129)" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="rgb(59, 130, 246)" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Service nodes */}
              {services.map((service, index) => {
                const IconComponent = service.icon
                return (
                  <div
                    key={service.name}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                    style={{
                      left: `${service.position.x}%`,
                      top: `${service.position.y * 2.5}%`
                    }}
                  >
                    <div className="relative">
                      {/* Glow effect */}
                      <div className="absolute inset-0 bg-primary/20 rounded-full blur-md scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Node */}
                      <div className="relative bg-surface-1/50 backdrop-blur-sm border border-border/50 rounded-full p-3 group-hover:bg-surface-1/80 transition-all duration-300 group-hover:scale-110">
                        <IconComponent className="w-5 h-5 text-primary group-hover:text-primary/80 transition-colors duration-300" />
                      </div>
                      
                      {/* Label */}
                      <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-surface-1/90 backdrop-blur-sm border border-border/50 rounded px-2 py-1 text-xs text-black whitespace-nowrap">
                          {service.name}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}

              {/* Central hub */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-emerald-500/20 rounded-full blur-xl scale-150 animate-pulse" />
                  <div className="relative bg-gradient-to-r from-blue-600 to-emerald-600 rounded-full p-4">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export default AutomationSanctum
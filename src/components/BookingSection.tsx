"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, Zap, Palette, Layers, Check } from "lucide-react"
import { toast } from "sonner"

interface FormData {
  fullName: string
  email: string
  whatsapp: string
  businessGoals: string
  serviceType: string
}

interface BookingSectionProps {
  className?: string
}

const BookingSection: React.FC<BookingSectionProps> = ({ className = "" }) => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    whatsapp: "",
    businessGoals: "",
    serviceType: "",
  })
  
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string>("")

  const services = [
    {
      id: "automation",
      title: "Automation",
      description: "Process automation & workflow optimization",
      icon: Zap,
      color: "text-blue-400"
    },
    {
      id: "visual",
      title: "Visual",
      description: "AI visuals, 3D design & creative solutions",
      icon: Palette,
      color: "text-purple-400"
    },
    {
      id: "both",
      title: "Both",
      description: "Complete automation + visual transformation",
      icon: Layers,
      color: "text-emerald-400"
    }
  ]

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    // Full Name validation - must be at least 2 characters
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Please enter your full name."
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Full name must be at least 2 characters long."
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Please enter a valid email address."
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address."
    }

    // WhatsApp validation - must match server-side validation exactly
    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = "Please enter your WhatsApp number."
    } else {
      // Only remove spaces like server-side does
      const cleanPhone = formData.whatsapp.replace(/\s+/g, '')
      // Must match server regex exactly: optional +, first digit 1-9, then 0-15 more digits
      if (!/^[\+]?[1-9][\d]{0,15}$/.test(cleanPhone)) {
        newErrors.whatsapp = "Please enter a valid WhatsApp number (must start with 1-9, not 0)."
      }
    }

    // Business Goals validation - must be at least 10 characters
    if (!formData.businessGoals.trim()) {
      newErrors.businessGoals = "Tell us about your goals and challenges."
    } else if (formData.businessGoals.trim().length < 10) {
      newErrors.businessGoals = "Please provide at least 10 characters describing your goals and challenges."
    }

    // Service Type validation - must be selected
    if (!formData.serviceType) {
      newErrors.serviceType = "Please select a service type."
    } else if (formData.serviceType.length < 2) {
      newErrors.serviceType = "Please select a valid service type."
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Add console logging for debugging
    console.log('Form submission started', formData)
    
    if (!validateForm()) {
      console.log('Form validation failed', errors)
      // Remove toast.error - inline field errors already show validation issues
      return
    }

    setIsSubmitting(true)
    setSubmitError("")
    
    try {
      console.log('Sending request to API...')
      
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      console.log('API response status:', response.status)
      
      const result = await response.json()
      console.log('API response data:', result)

      if (!response.ok) {
        if (result.errors && Array.isArray(result.errors)) {
          throw new Error(`Validation errors: ${result.errors.join(', ')}`)
        }
        throw new Error(result.message || `HTTP error! status: ${response.status}`)
      }

      if (result.success) {
        console.log('Form submitted successfully, showing success state')
        setIsSubmitted(true)
        // Remove toast.success - success state card already shows confirmation
      } else {
        throw new Error(result.message || 'Form submission failed')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitError(
        error instanceof Error 
          ? error.message 
          : 'An unexpected error occurred. Please try again.'
      )
      // Remove toast.error - inline error message already shows submission errors
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleServiceSelect = (serviceId: string) => {
    setFormData(prev => ({ ...prev, serviceType: serviceId }))
    // Clear service type error when user selects a service
    if (errors.serviceType) {
      setErrors(prev => ({ ...prev, serviceType: "" }))
    }
  }

  if (isSubmitted) {
    return (
      <section className={`py-20 ${className}`}>
        <div className="max-w-2xl mx-auto text-center">
          <Card className="bg-white shadow-sm hover:shadow-md border border-border/50 transition-shadow">
            <CardContent className="p-8">
              <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-6" />
              <h3 className="text-2xl font-heading font-bold text-foreground mb-4">
                Mission Brief Received
              </h3>
              <p className="text-muted-foreground">
                Your information has been successfully saved to our system. We'll review your brief and reach out with next steps within 24 hours. Expect a discovery call invite and a tailored roadmap outline.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    )
  }

  return (
    <section className={`py-20 ${className}`}>
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
          Get Started
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Ready to launch your AI transformation? Submit your project brief and let's build the future together.
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card className="bg-white shadow-sm hover:shadow-md border border-border/50 transition-shadow">
          <CardHeader>
            <CardTitle className="text-xl font-heading font-semibold text-foreground">
              Mission Brief Form
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {submitError && (
                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  {submitError}
                </div>
              )}

              <div>
                <Label htmlFor="fullName" className="text-sm font-medium text-foreground">
                  Full Name *
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                  className={`mt-1 ${errors.fullName ? 'border-red-500' : ''}`}
                  placeholder="Enter your full name"
                  disabled={isSubmitting}
                />
                {errors.fullName && (
                  <p className="text-sm text-red-500 mt-1">{errors.fullName}</p>
                )}
              </div>

              <div>
                <Label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className={`mt-1 ${errors.email ? 'border-red-500' : ''}`}
                  placeholder="Enter your email address"
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <Label htmlFor="whatsapp" className="text-sm font-medium text-foreground">
                  WhatsApp *
                </Label>
                <Input
                  id="whatsapp"
                  type="tel"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData(prev => ({ ...prev, whatsapp: e.target.value }))}
                  className={`mt-1 ${errors.whatsapp ? 'border-red-500' : ''}`}
                  placeholder="Enter your WhatsApp number (e.g., +1234567890, cannot start with 0)"
                  disabled={isSubmitting}
                />
                {errors.whatsapp && (
                  <p className="text-sm text-red-500 mt-1">{errors.whatsapp}</p>
                )}
              </div>

              <div>
                <Label htmlFor="businessGoals" className="text-sm font-medium text-foreground">
                  Business Goals & Challenges * (minimum 10 characters)
                </Label>
                <Textarea
                  id="businessGoals"
                  value={formData.businessGoals}
                  onChange={(e) => setFormData(prev => ({ ...prev, businessGoals: e.target.value }))}
                  className={`mt-1 min-h-[120px] ${errors.businessGoals ? 'border-red-500' : ''}`}
                  placeholder="Tell us about your goals and challenges... (at least 10 characters)"
                  disabled={isSubmitting}
                />
                <div className="flex justify-between mt-1">
                  <div>
                    {errors.businessGoals && (
                      <p className="text-sm text-red-500">{errors.businessGoals}</p>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {formData.businessGoals.length}/10 characters minimum
                  </p>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-foreground">
                  Choose Your Service *
                </Label>
                <div className="mt-3 space-y-3">
                  {services.map((service) => {
                    const Icon = service.icon
                    const isSelected = formData.serviceType === service.id
                    return (
                      <div
                        key={service.id}
                        onClick={() => !isSubmitting && handleServiceSelect(service.id)}
                        className={`relative flex items-center p-4 rounded-lg border cursor-pointer transition-all duration-300 ${
                          isSelected 
                            ? 'border-primary/50 bg-primary/5' 
                            : 'border-border/50 hover:border-border/70 hover:bg-surface-1/50'
                        } ${errors.serviceType ? 'border-red-500' : ''} ${
                          isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      >
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 mr-4 transition-all duration-300 ${
                          isSelected 
                            ? 'border-primary bg-primary text-primary-foreground' 
                            : 'border-border/50'
                        }`}>
                          {isSelected ? (
                            <Check className="w-5 h-5" />
                          ) : (
                            <Icon className={`w-5 h-5 ${service.color}`} />
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground mb-1">{service.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {service.description}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
                {errors.serviceType && (
                  <p className="text-sm text-red-500 mt-2">{errors.serviceType}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 ease-out font-medium py-3 rounded-full text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Submitting..." : "Submit Mission Brief"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export default BookingSection
"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TestimonialProps {
  id: number;
  name: string;
  role: string;
  company: string;
  quote: string;
  roi: string;
  caseStudy: string;
  results: string;
}

interface TestimonialsStripProps {
  autoScrollInterval?: number;
  showControls?: boolean;
  className?: string;
}

const TestimonialsStrip: React.FC<TestimonialsStripProps> = ({
  autoScrollInterval = 6000,
  showControls = true,
  className = "",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials: TestimonialProps[] = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "VP of Marketing",
      company: "TechFlow Industries",
      quote: "Transformed our entire customer acquisition strategy with data‑driven insights that increased our conversion rate by 340% in just 6 months. The team's expertise in behavioral analytics was game‑changing.",
      roi: "+340% CVR",
      caseStudy: "Complete funnel overhaul using behavioral analytics.",
      results: "340% conversion increase; 65% CAC reduction; $2.4M additional Q1 revenue."
    },
    {
      id: 2,
      name: "Michael Torres",
      role: "CEO",
      company: "GrowthLab Solutions",
      quote: "ROI exceeded expectations by 250%. The strategic approach to marketing automation and lead scoring revolutionized how we engage with prospects throughout the entire customer journey.",
      roi: "+250% ROI",
      caseStudy: "Advanced marketing automation workflows and predictive lead scoring.",
      results: "250% ROI improvement; 85% qualified lead increase; 45% sales cycle reduction."
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      role: "Head of Growth",
      company: "Innovate Digital",
      quote: "Generated $1.2M in additional revenue within the first quarter. Their deep understanding of customer psychology and conversion optimization is unmatched.",
      roi: "$1.2M Revenue",
      caseStudy: "Growth strategy focused on customer psychology and CRO.",
      results: "$1.2M additional quarterly revenue; 190% AOV increase; 78% retention improvement."
    }
  ];

  useEffect(() => {
    if (autoScrollInterval > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        )
      }, autoScrollInterval)
      
      return () => clearInterval(interval)
    }
  }, [autoScrollInterval, testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    )
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    )
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className={`py-20 ${className}`}>
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
          Client Success Stories
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Testimonials and transformative ROI metrics from our trusted partners.
        </p>
      </div>

      {/* Main Testimonial Display */}
      <div className="max-w-4xl mx-auto mb-12">
        <Card className="bg-white shadow-sm hover:shadow-md border border-border/50 transition-shadow">
          <CardContent className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 text-lg px-3 py-1">
                  {currentTestimonial.roi}
                </Badge>
              </div>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>

            <blockquote className="text-lg md:text-xl text-foreground mb-6 leading-relaxed">
              "{currentTestimonial.quote}"
            </blockquote>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-foreground">
                  {currentTestimonial.name}
                </div>
                <div className="text-sm text-muted-foreground">
                  {currentTestimonial.role}, {currentTestimonial.company}
                </div>
              </div>

              {showControls && (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={prevTestimonial}
                    className="border-border/50 hover:bg-surface-1/50"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={nextTestimonial}
                    className="border-border/50 hover:bg-surface-1/50"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>

            {/* Case Study Details */}
            <div className="mt-6 pt-6 border-t border-border/50 space-y-3">
              <div>
                <span className="text-xs font-medium text-foreground">Case Study:</span>
                <p className="text-sm text-muted-foreground">{currentTestimonial.caseStudy}</p>
              </div>
              <div>
                <span className="text-xs font-medium text-foreground">Results:</span>
                <p className="text-sm text-muted-foreground">{currentTestimonial.results}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Testimonial Indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? "bg-primary scale-125" 
                  : "bg-border/50 hover:bg-border"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsStrip;
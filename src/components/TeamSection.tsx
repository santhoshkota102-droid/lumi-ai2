"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback } from 'react';

interface TeamMember {
  name: string;
  role: string;
  department: "Innovation Team" | "Foundation Team" | "Leadership Team" | "Creative Team";
  imageUrl: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Maneesh Bommakanti",
    role: "Product Engineer & Founder",
    department: "Leadership Team",
    imageUrl: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/1756448128162-7i35e60q7vt.png"
  },
  {
    name: "Anjudeep Veerla",
    role: "Head & Director",
    department: "Innovation Team",
    imageUrl: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/1756448261255-vk44qiymks.jpg"
  },
  {
    name: "Santhosh Kota",
    role: "Team Lead",
    department: "Innovation Team",
    imageUrl: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/1756448265028-m0t55s7ydc.png"
  },
  {
    name: "Vikas Chary",
    role: "AI Visual & 3D Director",
    department: "Creative Team",
    imageUrl: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/1756448334079-2ejlw02bnvn.png"
  }
];

interface TeamCardProps {
  member: TeamMember;
}

function TeamCard({ member }: TeamCardProps) {
  const departmentColors = {
    "Innovation Team": {
      badge: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      accent: "text-blue-400"
    },
    "Foundation Team": {
      badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      accent: "text-emerald-400"
    },
    "Leadership Team": {
      badge: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      accent: "text-purple-400"
    },
    "Creative Team": {
      badge: "bg-orange-500/10 text-orange-400 border-orange-500/20",
      accent: "text-orange-400"
    }
  };

  const colors = departmentColors[member.department];

  return (
    <Card className="group bg-white shadow-sm hover:shadow-md border border-border/50 transition-all duration-300 hover:scale-[1.02] h-full min-w-0 flex-shrink-0 w-full">
      <CardHeader className="pb-2 text-center">
        <div className="flex flex-col items-center">
          {/* Profile Image */}
          <div className="w-20 h-20 mb-3 rounded-full overflow-hidden border-2 border-border/20 group-hover:border-border/40 transition-colors">
            <Image
              src={member.imageUrl}
              alt={member.name}
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          </div>
          
          <CardTitle className="text-lg font-heading text-foreground mb-1">
            {member.name}
          </CardTitle>
          <p className={`text-sm font-medium ${colors.accent} mb-2`}>
            {member.role}
          </p>
          <Badge 
            variant="outline" 
            className={`text-xs ${colors.badge}`}
          >
            {member.department}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        {/* Removed bio, tags, and expandable section */}
      </CardContent>
    </Card>
  );
}

interface TeamSectionProps {
  className?: string;
}

export default function TeamSection({ className = "" }: TeamSectionProps) {
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

  return (
    <section className={`py-12 sm:py-20 ${className}`}>
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
            Our Team
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Meet the expert minds behind your AI transformation journey
          </p>
        </div>

        {/* Mobile Carousel (hidden on lg+) */}
        <div className="block lg:hidden relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4">
              {teamMembers.map((member) => (
                <div key={member.name} className="flex-none w-[280px] sm:w-[320px]">
                  <TeamCard member={member} />
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
              aria-label="Previous team member"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={scrollNext}
              className="border-border/50 hover:bg-surface-1/50"
              aria-label="Next team member"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Desktop Grid - Four team members in one row (hidden on mobile) */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-4">
          {teamMembers.map((member) => (
            <TeamCard key={member.name} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}
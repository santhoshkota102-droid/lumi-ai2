import TopNav from '@/components/TopNav'
import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import WorkGallery from '@/components/WorkGallery'
import AutomationSanctum from '@/components/AutomationSanctum'
import TeamSection from '@/components/TeamSection'
import TestimonialsStrip from '@/components/TestimonialsStrip'
import BookingSection from '@/components/BookingSection'
import Footer from '@/components/Footer'
import { TrustedPartners } from '@/components/TrustedPartners'
import { ScrollRevealSection } from '@/components/ScrollRevealSection'
import InteractiveBackground from '@/components/InteractiveBackground'

export default function HomePage() {
  return (
    <>
      {/* Main content container */}
      <div className="relative min-h-screen">
        {/* Modern background layer: elegant gradients with subtle radial glow */}
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-white via-[var(--surface-2)] to-white" />
          <div className="absolute inset-0 bg-[radial-gradient(800px_400px_at_50%_-100px,theme(colors.primary)/0.20,transparent_60%)]" />
          <InteractiveBackground spotlightIntensity={0.25} parallaxStrength={0.6} />
        </div>
        
        {/* 1280px max container with 12-column grid system */}
        <div className="container max-w-[1280px] mx-auto px-6">
          {/* Header - pinned at top of content flow */}
          <TopNav className="relative z-10" />
          
          {/* Hero - first major viewport */}
          <ScrollRevealSection className="relative z-10" variant="fade-up" once parallax parallaxIntensity={28}>
            <HeroSection />
          </ScrollRevealSection>
          
          {/* Our Expertise - tabbed bento grid with automation and creative tabs */}
          <ScrollRevealSection className="relative z-10 py-20" variant="fade-up" once>
            <AboutSection />
          </ScrollRevealSection>
          
          {/* Case Studies - proof of work with filterable grid */}
          <ScrollRevealSection className="relative z-10 py-20" variant="fade-up" once>
            <WorkGallery />
          </ScrollRevealSection>
          
          {/* The Bridge Spiral - connection point visualization */}
          <ScrollRevealSection className="relative z-10 py-20" variant="fade-up" once>
            <AutomationSanctum />
          </ScrollRevealSection>
          
          {/* Team - constellation network of expert minds */}
          <ScrollRevealSection className="relative z-10 py-20" variant="fade-up" once>
            <TeamSection />
          </ScrollRevealSection>
          
          {/* Testimonials - orbit carousel of client success stories */}
          <ScrollRevealSection className="relative z-10 py-20" variant="fade-up" once>
            <TestimonialsStrip 
              autoScrollInterval={6000}
              showControls={true}
            />
          </ScrollRevealSection>
          
          {/* Trusted Partners - logo showcase */}
          <ScrollRevealSection className="relative z-10" variant="fade-up" once>
            <TrustedPartners />
          </ScrollRevealSection>
          
          {/* Command Center - lead capture with mission brief form */}
          <ScrollRevealSection className="relative z-10 py-20" variant="fade-up" once>
            <BookingSection />
          </ScrollRevealSection>
        </div>
        
        {/* Footer - split cosmic design */}
        <Footer />
      </div>
    </>
  )
}
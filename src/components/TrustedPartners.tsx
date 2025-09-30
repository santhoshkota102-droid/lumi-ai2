import React from 'react';
import Image from 'next/image';

interface TrustedPartnersProps {
  className?: string;
}

const partners = [
  {
    id: 1,
    name: "VYAS School",
    imageUrl: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/1756557176096-2dab9s9o3i3.jpg",
    alt: "VYAS School Logo"
  },
  {
    id: 2,
    name: "Secret AI",
    imageUrl: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/1756557150461-wmmuy79x7ui.png",
    alt: "Secret AI Logo"
  },
  {
    id: 3,
    name: "Snap Captions",
    imageUrl: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/1756557152684-iekam11c83e.png",
    alt: "Snap Captions Logo"
  },
  {
    id: 4,
    name: "Profile Mountain",
    imageUrl: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/1756557151422-6bhxqwz1x75.png",
    alt: "Profile Mountain Logo"
  }
];

export const TrustedPartners: React.FC<TrustedPartnersProps> = ({ className = "" }) => {
  return (
    <section className={`w-full py-20 ${className}`}>
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Trusted Partners
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Collaborating with industry leaders to deliver exceptional results
          </p>
        </div>

        {/* Scrolling Partners Container */}
        <div className="relative overflow-hidden">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
          
          {/* Scrolling Strip */}
          <div className="w-full overflow-hidden group">
            <div className="flex animate-scroll hover:pause-animation">
              {/* First set of logos */}
              {partners.map((partner) => (
                <div
                  key={`first-${partner.id}`}
                  className="flex-shrink-0 mx-8"
                >
                  <div className="relative w-32 h-20 md:w-36 md:h-24 lg:w-40 lg:h-28 bg-card/40 backdrop-blur-sm border border-border rounded-lg p-4 transition-all duration-300 hover:bg-card/60 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 hover:scale-105 grayscale-[0.8] opacity-80 hover:grayscale-0 hover:opacity-100">
                    <Image
                      src={partner.imageUrl}
                      alt={partner.alt}
                      fill
                      className="object-contain p-2 transition-opacity duration-300"
                      sizes="(max-width: 768px) 128px, (max-width: 1024px) 144px, 160px"
                      priority
                    />
                  </div>
                </div>
              ))}
              
              {/* Duplicate set for seamless loop */}
              {partners.map((partner) => (
                <div
                  key={`second-${partner.id}`}
                  className="flex-shrink-0 mx-8"
                >
                  <div className="relative w-32 h-20 md:w-36 md:h-24 lg:w-40 lg:h-28 bg-card/40 backdrop-blur-sm border border-border rounded-lg p-4 transition-all duration-300 hover:bg-card/60 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 hover:scale-105 grayscale-[0.8] opacity-80 hover:grayscale-0 hover:opacity-100">
                    <Image
                      src={partner.imageUrl}
                      alt={partner.alt}
                      fill
                      className="object-contain p-2 transition-opacity duration-300"
                      sizes="(max-width: 768px) 128px, (max-width: 1024px) 144px, 160px"
                      priority
                    />
                  </div>
                </div>
              ))}
              
              {/* Third set for extra smoothness */}
              {partners.map((partner) => (
                <div
                  key={`third-${partner.id}`}
                  className="flex-shrink-0 mx-8"
                >
                  <div className="relative w-32 h-20 md:w-36 md:h-24 lg:w-40 lg:h-28 bg-card/40 backdrop-blur-sm border border-border rounded-lg p-4 transition-all duration-300 hover:bg-card/60 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 hover:scale-105 grayscale-[0.8] opacity-80 hover:grayscale-0 hover:opacity-100">
                    <Image
                      src={partner.imageUrl}
                      alt={partner.alt}
                      fill
                      className="object-contain p-2 transition-opacity duration-300"
                      sizes="(max-width: 768px) 128px, (max-width: 1024px) 144px, 160px"
                      priority
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
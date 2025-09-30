"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollRevealSectionProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  variant?: "fade" | "fade-up" | "fade-down" | "slide-left" | "slide-right";
  once?: boolean;
  amount?: number;
  parallax?: boolean;
  parallaxIntensity?: number;
}

const variants = {
  fade: {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  },
  "fade-up": {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0 },
  },
  "fade-down": {
    hidden: { opacity: 0, y: -24 },
    show: { opacity: 1, y: 0 },
  },
  "slide-left": {
    hidden: { opacity: 0, x: 24 },
    show: { opacity: 1, x: 0 },
  },
  "slide-right": {
    hidden: { opacity: 0, x: -24 },
    show: { opacity: 1, x: 0 },
  },
};

export const ScrollRevealSection = ({
  children,
  className = "",
  variant = "fade-up",
  once = false,
  amount = 0.2,
  parallax = false,
  parallaxIntensity = 24,
}: ScrollRevealSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [parallaxIntensity, -parallaxIntensity]
  );

  const content = (
    <>
      {parallax ? (
        <motion.div style={{ y }}>{children}</motion.div>
      ) : (
        children
      )}
    </>
  );

  return (
    <motion.section
      ref={ref}
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      variants={variants[variant]}
    >
      {content}
    </motion.section>
  );
};
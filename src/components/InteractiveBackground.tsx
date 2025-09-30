"use client"

import { useEffect, useRef, useState } from 'react'

interface InteractiveBackgroundProps {
  spotlightIntensity?: number
  parallaxStrength?: number
}

interface Dot {
  x: number
  y: number
  opacity: number
  radius: number
  targetOpacity: number
  targetRadius: number
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  opacity: number
  size: number
  isAccent: boolean
}

export default function InteractiveBackground({
  spotlightIntensity = 0.3,
  parallaxStrength = 0.5
}: InteractiveBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number>()
  const mouseRef = useRef({ x: 0, y: 0 })
  const dotsRef = useRef<Dot[]>([])
  const particlesRef = useRef<Particle[]>([])
  const timeRef = useRef(0)
  const [isDebugMode, setIsDebugMode] = useState(false)

  // Grid configuration
  const gridSpacing = 40
  const baseRadius = 1.2
  const maxRadius = 4
  const interactionRadius = 120
  const fadeSpeed = 0.08

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.scale(dpr, dpr)
      
      initializeDots()
      initializeParticles()
    }

    const initializeDots = () => {
      const dots: Dot[] = []
      const cols = Math.ceil(window.innerWidth / gridSpacing) + 2
      const rows = Math.ceil(window.innerHeight / gridSpacing) + 2
      
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          dots.push({
            x: i * gridSpacing - gridSpacing,
            y: j * gridSpacing - gridSpacing,
            opacity: 0.15,
            radius: baseRadius,
            targetOpacity: 0.15,
            targetRadius: baseRadius
          })
        }
      }
      
      dotsRef.current = dots
    }

    const initializeParticles = () => {
      const particles: Particle[] = []
      const particleCount = Math.min(50, Math.floor(window.innerWidth / 30))
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          opacity: Math.random() * 0.3 + 0.1,
          size: Math.random() * 2 + 0.5,
          isAccent: Math.random() < 0.1
        })
      }
      
      particlesRef.current = particles
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    const generateNoise = (ctx: CanvasRenderingContext2D) => {
      const width = canvas.width / (window.devicePixelRatio || 1)
      const height = canvas.height / (window.devicePixelRatio || 1)
      
      // Ensure dimensions are valid before creating image data
      if (!width || !height || width <= 0 || height <= 0) {
        return null
      }
      
      const imageData = ctx.createImageData(width, height)
      const data = imageData.data
      
      for (let i = 0; i < data.length; i += 4) {
        const noise = Math.random() * 10
        data[i] = noise     // R
        data[i + 1] = noise // G
        data[i + 2] = noise // B
        data[i + 3] = 5     // A
      }
      
      return imageData
    }

    const animate = () => {
      // Ensure canvas dimensions are valid before animating
      const width = window.innerWidth
      const height = window.innerHeight
      
      if (!width || !height || width <= 0 || height <= 0) {
        animationFrameRef.current = requestAnimationFrame(animate)
        return
      }
      
      ctx.clearRect(0, 0, width, height)

      timeRef.current += 0.016

      // Render noise layer
      const noiseImageData = generateNoise(ctx)
      if (noiseImageData) {
        ctx.globalAlpha = 0.02
        ctx.putImageData(noiseImageData, 0, 0)
        ctx.globalAlpha = 1
      }

      // Render spotlight
      const spotlightX = width / 2 + Math.sin(timeRef.current * 0.3) * 20 * parallaxStrength
      const spotlightY = height / 3 + Math.cos(timeRef.current * 0.2) * 15 * parallaxStrength
      
      const gradient = ctx.createRadialGradient(
        spotlightX, spotlightY, 0,
        spotlightX, spotlightY, width * 0.6
      )
      gradient.addColorStop(0, `rgba(46, 211, 183, ${spotlightIntensity * 0.05})`)
      gradient.addColorStop(0.3, `rgba(46, 211, 183, ${spotlightIntensity * 0.02})`)
      gradient.addColorStop(1, 'rgba(46, 211, 183, 0)')
      
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)

      // Update and render dust particles
      particlesRef.current.forEach(particle => {
        particle.x += particle.vx
        particle.y += particle.vy
        
        if (particle.x < 0) particle.x = width
        if (particle.x > width) particle.x = 0
        if (particle.y < 0) particle.y = height
        if (particle.y > height) particle.y = 0
        
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        
        if (particle.isAccent) {
          ctx.fillStyle = `rgba(0, 255, 140, ${particle.opacity * 0.6})`
          ctx.shadowColor = '#00FF8C'
          ctx.shadowBlur = 8
        } else {
          ctx.fillStyle = `rgba(233, 238, 236, ${particle.opacity * 0.3})`
          ctx.shadowBlur = 0
        }
        
        ctx.fill()
        ctx.shadowBlur = 0
      })

      // Update and render interactive dots
      dotsRef.current.forEach(dot => {
        const dx = mouseRef.current.x - dot.x
        const dy = mouseRef.current.y - dot.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < interactionRadius) {
          const factor = 1 - distance / interactionRadius
          dot.targetOpacity = Math.min(1, 0.15 + factor * 0.8)
          dot.targetRadius = baseRadius + factor * (maxRadius - baseRadius)
        } else {
          dot.targetOpacity = 0.15
          dot.targetRadius = baseRadius
        }
        
        dot.opacity += (dot.targetOpacity - dot.opacity) * fadeSpeed
        dot.radius += (dot.targetRadius - dot.radius) * fadeSpeed
        
        ctx.beginPath()
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2)
        
        if (dot.opacity > 0.5) {
          ctx.fillStyle = `rgba(0, 255, 140, ${dot.opacity})`
          ctx.shadowColor = '#00FF8C'
          ctx.shadowBlur = 6
        } else {
          ctx.fillStyle = `rgba(233, 238, 236, ${dot.opacity})`
          ctx.shadowBlur = 0
        }
        
        ctx.fill()
        ctx.shadowBlur = 0
      })

      // Debug grid lines
      if (isDebugMode) {
        ctx.strokeStyle = 'rgba(255, 0, 0, 0.3)'
        ctx.lineWidth = 0.5
        
        for (let x = 0; x < width; x += gridSpacing) {
          ctx.beginPath()
          ctx.moveTo(x, 0)
          ctx.lineTo(x, height)
          ctx.stroke()
        }
        
        for (let y = 0; y < height; y += gridSpacing) {
          ctx.beginPath()
          ctx.moveTo(0, y)
          ctx.lineTo(width, y)
          ctx.stroke()
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'd' && e.ctrlKey && e.shiftKey) {
        setIsDebugMode(prev => !prev)
        e.preventDefault()
      }
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('keydown', handleKeyDown)
    
    animate()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('keydown', handleKeyDown)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [spotlightIntensity, parallaxStrength, isDebugMode])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
    />
  )
}
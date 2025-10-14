"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export default function GeologyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Particle system for sand particles
    class SandParticle {
      x: number
      y: number
      size: number
      speedY: number
      opacity: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 1.5 + 0.5
        this.speedY = Math.random() * 0.3 + 0.1
        this.opacity = Math.random() * 0.3 + 0.1
      }

      update() {
        this.y += this.speedY
        if (this.y > canvas.height) {
          this.y = -10
          this.x = Math.random() * canvas.width
        }
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = `rgba(139, 94, 60, ${this.opacity})`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Create sand particles
    const sandParticles: SandParticle[] = []
    for (let i = 0; i < 80; i++) {
      sandParticles.push(new SandParticle())
    }

    // Strata lines
    const strataLines = [
      { y: canvas.height * 0.25, amplitude: 5, frequency: 0.002, phase: 0 },
      { y: canvas.height * 0.45, amplitude: 8, frequency: 0.0015, phase: Math.PI / 3 },
      { y: canvas.height * 0.65, amplitude: 6, frequency: 0.0025, phase: Math.PI / 2 },
      { y: canvas.height * 0.85, amplitude: 7, frequency: 0.002, phase: Math.PI },
    ]

    let animationFrame = 0

    // Animation loop
    const animate = () => {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw strata lines (subtle wavy horizontal lines)
      ctx.strokeStyle = "rgba(139, 94, 60, 0.08)"
      ctx.lineWidth = 1.5
      strataLines.forEach((line) => {
        ctx.beginPath()
        for (let x = 0; x < canvas.width; x += 5) {
          const y = line.y + Math.sin(x * line.frequency + animationFrame * 0.001 + line.phase) * line.amplitude
          if (x === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }
        ctx.stroke()
      })

      // Update and draw sand particles
      sandParticles.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      animationFrame++
      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <div className="absolute inset-0 w-full h-full" style={{ zIndex: -1 }}>
      {/* Base background with subtle gradient */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background: "linear-gradient(to bottom, #f9f9f9 0%, #f5f5f5 50%, #f2f2f2 100%)",
        }}
      />

      {/* Animated canvas for particles and strata */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Crystal formations - SVG based */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {/* Crystal 1 - Top Left */}
        <motion.svg
          className="absolute"
          style={{
            top: "10%",
            left: "5%",
            width: "80px",
            height: "80px",
            opacity: 0.06,
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 40,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          viewBox="0 0 100 100"
        >
          <polygon points="50,10 80,40 50,90 20,40" fill="#8B5E3C" stroke="#8B5E3C" strokeWidth="1" />
          <polygon points="50,10 80,40 50,50" fill="#A0785A" opacity="0.7" />
          <polygon points="50,90 20,40 50,50" fill="#6B4E3C" opacity="0.7" />
        </motion.svg>

        {/* Crystal 2 - Top Right */}
        <motion.svg
          className="absolute"
          style={{
            top: "15%",
            right: "8%",
            width: "60px",
            height: "60px",
            opacity: 0.05,
          }}
          animate={{
            rotate: [360, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 35,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          viewBox="0 0 100 100"
        >
          <polygon points="50,5 90,35 70,85 30,85 10,35" fill="#8B5E3C" stroke="#8B5E3C" strokeWidth="1" />
          <polygon points="50,5 90,35 50,50" fill="#A0785A" opacity="0.7" />
        </motion.svg>

        {/* Crystal 3 - Bottom Left */}
        <motion.svg
          className="absolute"
          style={{
            bottom: "12%",
            left: "10%",
            width: "70px",
            height: "70px",
            opacity: 0.07,
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.12, 1],
          }}
          transition={{
            duration: 45,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          viewBox="0 0 100 100"
        >
          <polygon points="50,15 75,40 60,80 40,80 25,40" fill="#8B5E3C" stroke="#8B5E3C" strokeWidth="1" />
          <polygon points="50,15 75,40 50,45" fill="#A0785A" opacity="0.7" />
        </motion.svg>

        {/* Crystal 4 - Bottom Right */}
        <motion.svg
          className="absolute"
          style={{
            bottom: "20%",
            right: "12%",
            width: "90px",
            height: "90px",
            opacity: 0.05,
          }}
          animate={{
            rotate: [360, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 50,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          viewBox="0 0 100 100"
        >
          <polygon points="50,5 85,30 75,75 25,75 15,30" fill="#8B5E3C" stroke="#8B5E3C" strokeWidth="1" />
          <polygon points="50,5 85,30 50,40" fill="#A0785A" opacity="0.7" />
          <polygon points="50,75 25,75 50,40" fill="#6B4E3C" opacity="0.7" />
        </motion.svg>

        {/* Crystal 5 - Center Left */}
        <motion.svg
          className="absolute"
          style={{
            top: "50%",
            left: "15%",
            width: "55px",
            height: "55px",
            opacity: 0.06,
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 38,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          viewBox="0 0 100 100"
        >
          <polygon points="50,10 75,45 50,85 25,45" fill="#8B5E3C" stroke="#8B5E3C" strokeWidth="1" />
        </motion.svg>

        {/* Crystal 6 - Center Right */}
        <motion.svg
          className="absolute"
          style={{
            top: "55%",
            right: "18%",
            width: "65px",
            height: "65px",
            opacity: 0.05,
          }}
          animate={{
            rotate: [360, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 42,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          viewBox="0 0 100 100"
        >
          <polygon points="50,8 88,38 65,88 35,88 12,38" fill="#8B5E3C" stroke="#8B5E3C" strokeWidth="1" />
        </motion.svg>
      </div>

      {/* Floating rock shapes */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {/* Rock 1 */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: "120px",
            height: "100px",
            top: "25%",
            left: "20%",
            background: "rgba(139, 94, 60, 0.04)",
            borderRadius: "45% 55% 60% 40% / 50% 60% 40% 50%",
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        {/* Rock 2 */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: "90px",
            height: "80px",
            top: "60%",
            right: "25%",
            background: "rgba(139, 94, 60, 0.05)",
            borderRadius: "60% 40% 55% 45% / 45% 55% 45% 55%",
          }}
          animate={{
            y: [0, 15, 0],
            rotate: [0, -3, 0],
          }}
          transition={{
            duration: 18,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        {/* Rock 3 */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: "110px",
            height: "95px",
            bottom: "15%",
            left: "30%",
            background: "rgba(139, 94, 60, 0.03)",
            borderRadius: "50% 50% 45% 55% / 60% 40% 60% 40%",
          }}
          animate={{
            y: [0, -18, 0],
            rotate: [0, 4, 0],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        {/* Rock 4 */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: "75px",
            height: "70px",
            top: "35%",
            right: "15%",
            background: "rgba(139, 94, 60, 0.04)",
            borderRadius: "55% 45% 50% 50% / 50% 50% 50% 50%",
          }}
          animate={{
            y: [0, 12, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 16,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Additional decorative mineral dots */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={`mineral-dot-${i}`}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              background: `rgba(139, 94, 60, ${Math.random() * 0.15 + 0.05})`,
            }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </div>
  )
}

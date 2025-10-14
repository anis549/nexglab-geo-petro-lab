"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export default function AnimatedTechBackground() {
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

    // Particle/Node system for connected particles
    class Node {
      x: number
      y: number
      vx: number
      vy: number
      radius: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.vx = (Math.random() - 0.5) * 0.25
        this.vy = (Math.random() - 0.5) * 0.25
        this.radius = Math.random() * 1.5 + 0.5
      }

      update() {
        this.x += this.vx
        this.y += this.vy

        // Bounce off edges
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1

        // Keep within bounds
        this.x = Math.max(0, Math.min(canvas.width, this.x))
        this.y = Math.max(0, Math.min(canvas.height, this.y))
      }

      draw() {
        if (!ctx) return
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(180, 200, 220, 0.4)"
        ctx.fill()
      }
    }

    // Create nodes
    const nodes: Node[] = []
    const nodeCount = Math.min(40, Math.floor((canvas.width * canvas.height) / 20000))
    for (let i = 0; i < nodeCount; i++) {
      nodes.push(new Node())
    }

    // Animation loop
    const animate = () => {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw nodes
      nodes.forEach((node) => {
        node.update()
        node.draw()
      })

      // Draw connections between nearby nodes
      ctx.strokeStyle = "rgba(180, 200, 220, 0.12)"
      ctx.lineWidth = 0.5

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 120) {
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.stroke()
          }
        }
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden" style={{ zIndex: 0 }}>
      {/* Animated canvas for connected particles */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ opacity: 0.5 }} />

      {/* Floating geometric shapes - Very subtle */}
      <div className="absolute inset-0 w-full h-full">
        {/* Polygon 1 - Slow rotating hexagon */}
        <motion.svg
          className="absolute"
          style={{
            top: "20%",
            left: "15%",
            width: "60px",
            height: "60px",
          }}
          animate={{
            rotate: [0, 360],
            y: [0, -15, 0],
          }}
          transition={{
            duration: 35,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          viewBox="0 0 100 100"
        >
          <polygon
            points="50,5 93,27.5 93,72.5 50,95 7,72.5 7,27.5"
            fill="none"
            stroke="rgba(180, 200, 220, 0.15)"
            strokeWidth="1.5"
          />
        </motion.svg>

        {/* Polygon 2 - Pentagon */}
        <motion.svg
          className="absolute"
          style={{
            top: "65%",
            right: "12%",
            width: "50px",
            height: "50px",
          }}
          animate={{
            rotate: [360, 0],
            y: [0, 12, 0],
          }}
          transition={{
            duration: 40,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          viewBox="0 0 100 100"
        >
          <polygon
            points="50,5 95,40 75,95 25,95 5,40"
            fill="none"
            stroke="rgba(170, 190, 215, 0.12)"
            strokeWidth="1.5"
          />
        </motion.svg>

        {/* Triangle */}
        <motion.svg
          className="absolute"
          style={{
            bottom: "25%",
            left: "20%",
            width: "55px",
            height: "55px",
          }}
          animate={{
            rotate: [0, 120, 240, 360],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 32,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          viewBox="0 0 100 100"
        >
          <polygon points="50,10 90,90 10,90" fill="none" stroke="rgba(180, 200, 220, 0.13)" strokeWidth="1.5" />
        </motion.svg>

        {/* Circle outline 1 */}
        <motion.div
          className="absolute rounded-full border"
          style={{
            top: "40%",
            right: "18%",
            width: "70px",
            height: "70px",
            borderColor: "rgba(180, 200, 220, 0.1)",
            borderWidth: "1.5px",
          }}
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 28,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />

        {/* Circle outline 2 */}
        <motion.div
          className="absolute rounded-full border"
          style={{
            top: "15%",
            right: "25%",
            width: "45px",
            height: "45px",
            borderColor: "rgba(170, 190, 215, 0.08)",
            borderWidth: "1.5px",
          }}
          animate={{
            scale: [1, 1.12, 1],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 30,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />

        {/* Square 1 */}
        <motion.div
          className="absolute border"
          style={{
            top: "55%",
            left: "10%",
            width: "48px",
            height: "48px",
            borderColor: "rgba(180, 200, 220, 0.11)",
            borderWidth: "1.5px",
          }}
          animate={{
            rotate: [0, 90, 180, 270, 360],
            y: [0, -8, 0],
          }}
          transition={{
            duration: 26,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />

        {/* Square 2 */}
        <motion.div
          className="absolute border"
          style={{
            bottom: "35%",
            right: "8%",
            width: "40px",
            height: "40px",
            borderColor: "rgba(170, 190, 215, 0.09)",
            borderWidth: "1.5px",
          }}
          animate={{
            rotate: [360, 270, 180, 90, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 24,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </div>

      {/* Subtle gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, rgba(27, 27, 27, 0.4) 0%, rgba(27, 27, 27, 0.75) 60%, rgba(27, 27, 27, 0.95) 100%)",
          zIndex: 1,
        }}
      />
    </div>
  )
}

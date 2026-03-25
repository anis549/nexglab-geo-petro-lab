"use client"

import { useState, useRef, useEffect } from "react"
import type { RockSample } from "@/types/rocks"

interface Props {
  rock: RockSample
  mode?: "granulometry" | "texture"
}

export default function MagnifyingGlass({ rock, mode = "granulometry" }: Props) {
  const [zoom, setZoom] = useState(2)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height

    ctx.clearRect(0, 0, width, height)

    // 🎯 BASE COLOR
    const hex = rock.color || "#bfa37a"
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)

    ctx.fillStyle = `rgb(${r}, ${g}, ${b})`
    ctx.fillRect(0, 0, width, height)

    const random = (min: number, max: number) => Math.random() * (max - min) + min

    // 🎯 TEXTURE GENERATION
    switch (rock.type) {
      case "sandstone":
        for (let i = 0; i < 4000 * zoom; i++) {
          const x = random(0, width)
          const y = random(0, height)
          const size = random(0.5, 2) * zoom

          ctx.fillStyle = `rgba(${r + random(-20, 20)}, ${g + random(-20, 20)}, ${b + random(-20, 20)}, 0.7)`
          ctx.beginPath()
          ctx.arc(x, y, size, 0, Math.PI * 2)
          ctx.fill()
        }
        break

      case "limestone":
        for (let i = 0; i < 200 * zoom; i++) {
          const x = random(0, width)
          const y = random(0, height)
          const size = random(4, 12) * zoom

          ctx.fillStyle = `rgba(${r + random(-10, 10)}, ${g + random(-10, 10)}, ${b + random(-10, 10)}, 0.3)`
          ctx.beginPath()
          ctx.arc(x, y, size, 0, Math.PI * 2)
          ctx.fill()
        }

        if (rock.hasFossils) {
          for (let i = 0; i < 5; i++) {
            const x = random(0, width)
            const y = random(0, height)
            const size = random(10, 20) * zoom

            ctx.fillStyle = "rgba(255,255,255,0.2)"
            ctx.beginPath()
            ctx.arc(x, y, size, 0, Math.PI * 2)
            ctx.fill()
          }
        }
        break

      case "clay":
        for (let i = 0; i < 80; i++) {
          const x = random(0, width)
          const y = random(0, height)

          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.05)`
          ctx.beginPath()
          ctx.ellipse(x, y, random(20, 80), random(5, 20), random(0, Math.PI), 0, Math.PI * 2)
          ctx.fill()
        }
        break

      case "conglomerate":
        for (let i = 0; i < 20; i++) {
          const x = random(0, width)
          const y = random(0, height)
          const size = random(20, 40) * zoom

          ctx.fillStyle = `rgb(${random(100, 200)}, ${random(100, 200)}, ${random(100, 200)})`
          ctx.beginPath()
          ctx.arc(x, y, size, 0, Math.PI * 2)
          ctx.fill()
        }
        break

      case "breccia":
        for (let i = 0; i < 30; i++) {
          const x = random(0, width)
          const y = random(0, height)
          const size = random(15, 35) * zoom

          ctx.fillStyle = `rgb(${random(100, 200)}, ${random(100, 200)}, ${random(100, 200)})`
          ctx.beginPath()

          const sides = Math.floor(random(3, 6))
          for (let j = 0; j < sides; j++) {
            const angle = (j / sides) * Math.PI * 2
            const radius = size * random(0.7, 1.3)
            const px = x + Math.cos(angle) * radius
            const py = y + Math.sin(angle) * radius

            j === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py)
          }

          ctx.closePath()
          ctx.fill()
        }
        break
    }

    // 🎯 VIGNETTE EFFECT
    const gradient = ctx.createRadialGradient(
      width / 2,
      height / 2,
      width * 0.3,
      width / 2,
      height / 2,
      width / 2
    )

    gradient.addColorStop(0, "rgba(0,0,0,0)")
    gradient.addColorStop(1, "rgba(0,0,0,0.6)")

    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)
  }, [rock, zoom, mode])

  return (
    <div className="mt-6">
      <h3 className="text-sm font-semibold text-white/80 mb-4">
        🔬 Observation Microscopique
      </h3>

      {/* ZOOM */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setZoom((z) => Math.min(z + 0.5, 8))}
          className="px-3 py-1 text-xs rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 transition"
        >
          Zoom +
        </button>

        <button
          onClick={() => setZoom((z) => Math.max(z - 0.5, 1))}
          className="px-3 py-1 text-xs rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 transition"
        >
          Zoom -
        </button>
      </div>

      {/* MICROSCOPE */}
      <div className="flex justify-center">
        <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-black shadow-2xl">
          <canvas
            ref={canvasRef}
            width={256}
            height={256}
            className="w-full h-full"
          />
        </div>
      </div>

      <p className="text-center text-xs text-white/60 mt-3">
        Zoom: {zoom.toFixed(1)}x
      </p>
    </div>
  )
}
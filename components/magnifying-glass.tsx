"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import type { RockSample } from "@/types/rocks"
import { ZoomIn, ZoomOut } from "lucide-react"
import { getRockColor } from "./rock-materials"

interface MagnifyingGlassProps {
  rock: RockSample
  width?: number
  height?: number
}

export default function MagnifyingGlass({ rock, width = 300, height = 300 }: MagnifyingGlassProps) {
  const [zoom, setZoom] = useState(2)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Générer une texture procédurale basée sur le type de roche
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Effacer le canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Obtenir la couleur de base de la roche
    const baseColor = getRockColor(rock.color)

    // Convertir la couleur hexadécimale en RGB
    const r = Number.parseInt(baseColor.slice(1, 3), 16)
    const g = Number.parseInt(baseColor.slice(3, 5), 16)
    const b = Number.parseInt(baseColor.slice(5, 7), 16)

    // Générer une texture procédurale en fonction du type de roche
    generateProceduralTexture(ctx, canvas.width, canvas.height, rock.type, r, g, b)

    // Dessiner une grille pour l'effet loupe
    drawGrid(ctx, canvas.width, canvas.height, zoom)

    // Dessiner un cercle pour simuler l'effet de loupe
    ctx.beginPath()
    ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, 0, Math.PI * 2)
    ctx.strokeStyle = "#333"
    ctx.lineWidth = 2
    ctx.stroke()
  }, [rock.type, rock.color, zoom])

  // Dessiner une grille
  const drawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number, zoom: number) => {
    const gridSize = 20 * zoom

    ctx.beginPath()
    ctx.strokeStyle = "rgba(255, 255, 255, 0.2)"
    ctx.lineWidth = 1

    // Lignes horizontales
    for (let y = 0; y < height; y += gridSize) {
      ctx.moveTo(0, y)
      ctx.lineTo(width, y)
    }

    // Lignes verticales
    for (let x = 0; x < width; x += gridSize) {
      ctx.moveTo(x, 0)
      ctx.lineTo(x, height)
    }

    ctx.stroke()
  }

  // Générer une texture procédurale en fonction du type de roche
  const generateProceduralTexture = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    rockType: string,
    r: number,
    g: number,
    b: number,
  ) => {
    // Fonction pour générer un nombre aléatoire dans une plage
    const random = (min: number, max: number) => Math.random() * (max - min) + min

    // Remplir le fond avec la couleur de base
    ctx.fillStyle = `rgb(${r}, ${g}, ${b})`
    ctx.fillRect(0, 0, width, height)

    // Générer des caractéristiques en fonction du type de roche
    switch (rockType) {
      case "sandstone": // Grès
        // Petits grains de sable
        for (let i = 0; i < 5000; i++) {
          const x = random(0, width)
          const y = random(0, height)
          const size = random(1, 3) * zoom

          ctx.fillStyle = `rgba(${r - 20 + random(0, 40)}, ${g - 20 + random(0, 40)}, ${b - 20 + random(0, 40)}, 0.7)`
          ctx.beginPath()
          ctx.arc(x, y, size, 0, Math.PI * 2)
          ctx.fill()
        }
        break

      case "limestone": // Calcaire
        // Texture plus lisse avec quelques fossiles
        for (let i = 0; i < 100; i++) {
          const x = random(0, width)
          const y = random(0, height)
          const size = random(5, 15) * zoom

          ctx.fillStyle = `rgba(${r - 10 + random(0, 20)}, ${g - 10 + random(0, 20)}, ${b - 10 + random(0, 20)}, 0.3)`
          ctx.beginPath()
          ctx.arc(x, y, size, 0, Math.PI * 2)
          ctx.fill()
        }

        // Ajouter des fossiles si la roche en contient
        if (rock.hasFossils) {
          for (let i = 0; i < 5; i++) {
            const x = random(0, width)
            const y = random(0, height)
            const size = random(10, 20) * zoom

            ctx.fillStyle = "rgba(255, 255, 255, 0.2)"
            ctx.beginPath()
            ctx.arc(x, y, size, 0, Math.PI * 2)
            ctx.fill()
            ctx.strokeStyle = "rgba(255, 255, 255, 0.5)"
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
        break

      case "clay": // Argile
        // Texture très fine et lisse
        for (let i = 0; i < 50; i++) {
          const x = random(0, width)
          const y = random(0, height)
          const w = random(20, 100) * zoom
          const h = random(5, 20) * zoom

          ctx.fillStyle = `rgba(${r - 5 + random(0, 10)}, ${g - 5 + random(0, 10)}, ${b - 5 + random(0, 10)}, 0.1)`
          ctx.beginPath()
          ctx.ellipse(x, y, w, h, random(0, Math.PI), 0, Math.PI * 2)
          ctx.fill()
        }
        break

      case "conglomerate": // Conglomérat
        // Gros galets arrondis dans une matrice
        for (let i = 0; i < 20; i++) {
          const x = random(0, width)
          const y = random(0, height)
          const size = random(20, 40) * zoom

          ctx.fillStyle = `rgb(${random(100, 200)}, ${random(100, 200)}, ${random(100, 200)})`
          ctx.beginPath()
          ctx.arc(x, y, size, 0, Math.PI * 2)
          ctx.fill()

          ctx.strokeStyle = "rgba(0, 0, 0, 0.3)"
          ctx.lineWidth = 1
          ctx.stroke()
        }
        break

      case "breccia": // Brèche
        // Fragments anguleux
        for (let i = 0; i < 30; i++) {
          const x = random(0, width)
          const y = random(0, height)
          const size = random(15, 35) * zoom

          ctx.fillStyle = `rgb(${random(100, 200)}, ${random(100, 200)}, ${random(100, 200)})`
          ctx.beginPath()

          // Créer un polygone irrégulier
          const sides = Math.floor(random(3, 6))
          for (let j = 0; j < sides; j++) {
            const angle = (j / sides) * Math.PI * 2
            const radius = size * random(0.7, 1.3)
            const px = x + Math.cos(angle) * radius
            const py = y + Math.sin(angle) * radius

            if (j === 0) {
              ctx.moveTo(px, py)
            } else {
              ctx.lineTo(px, py)
            }
          }

          ctx.closePath()
          ctx.fill()

          ctx.strokeStyle = "rgba(0, 0, 0, 0.3)"
          ctx.lineWidth = 1
          ctx.stroke()
        }
        break

      default:
        // Texture générique pour les autres types
        for (let i = 0; i < 200; i++) {
          const x = random(0, width)
          const y = random(0, height)
          const size = random(2, 8) * zoom

          ctx.fillStyle = `rgba(${r - 30 + random(0, 60)}, ${g - 30 + random(0, 60)}, ${b - 30 + random(0, 60)}, 0.5)`
          ctx.beginPath()
          ctx.arc(x, y, size, 0, Math.PI * 2)
          ctx.fill()
        }
    }
  }

  // Gérer le zoom
  const handleZoomChange = (value: number[]) => {
    setZoom(value[0])
  }

  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <div className="relative">
          <canvas ref={canvasRef} width={width} height={height} className="border rounded-md" />

          <div className="mt-4 flex items-center space-x-2">
            <ZoomOut className="h-4 w-4 text-muted-foreground" />
            <Slider value={[zoom]} min={1} max={10} step={0.5} onValueChange={handleZoomChange} className="flex-1" />
            <ZoomIn className="h-4 w-4 text-muted-foreground" />
          </div>

          <div className="mt-2 text-center text-sm text-muted-foreground">Zoom: {zoom}x</div>
        </div>
      </CardContent>
    </Card>
  )
}

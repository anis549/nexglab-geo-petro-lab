"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { RockSample } from "@/types/rocks"
import { getRockColor } from "./rock-materials"
import { DivideIcon as StratificationIcon } from "lucide-react"

interface RockCrossSectionProps {
  rock: RockSample
  width?: number
  height?: number
}

export default function RockCrossSection({ rock, width = 400, height = 300 }: RockCrossSectionProps) {
  const [view, setView] = useState<"horizontal" | "vertical">("horizontal")
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Générer une coupe procédurale
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

    // Générer une coupe procédurale
    generateProceduralSection(ctx, canvas.width, canvas.height, rock, view, r, g, b)

    // Ajouter une échelle
    drawScale(ctx, canvas.width, canvas.height)

    // Ajouter des annotations si nécessaire
    if (rock.hasFossils) {
      drawFossilAnnotations(ctx, canvas.width, canvas.height, rock.type)
    }

    // Ajouter des annotations de stratification pour certains types de roches
    if (["sandstone", "limestone", "silt"].includes(rock.type)) {
      drawStratificationAnnotations(ctx, canvas.width, canvas.height, rock.type)
    }
  }, [rock, view])

  // Dessiner une échelle
  const drawScale = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const scaleWidth = 100
    const scaleHeight = 10
    const scaleX = 20
    const scaleY = height - 30

    // Dessiner la barre d'échelle
    ctx.fillStyle = "white"
    ctx.fillRect(scaleX - 1, scaleY - 1, scaleWidth + 2, scaleHeight + 2)

    ctx.fillStyle = "black"
    ctx.fillRect(scaleX, scaleY, scaleWidth, scaleHeight)

    // Ajouter le texte de l'échelle
    ctx.font = "12px Arial"
    ctx.fillStyle = "white"
    ctx.textAlign = "center"
    ctx.fillText("1 cm", scaleX + scaleWidth / 2, scaleY + scaleHeight + 15)
  }

  // Dessiner des annotations pour les fossiles
  const drawFossilAnnotations = (ctx: CanvasRenderingContext2D, width: number, height: number, rockType: string) => {
    // Positions des fossiles (simulées)
    const fossilPositions = getFossilPositions(rockType, width, height)

    ctx.strokeStyle = "#a13c2f" // Couleur fer oxydé
    ctx.lineWidth = 2

    fossilPositions.forEach((pos) => {
      // Dessiner un cercle autour du fossile
      ctx.beginPath()
      ctx.arc(pos.x, pos.y, 15, 0, Math.PI * 2)
      ctx.stroke()

      // Ajouter une ligne et un label
      ctx.beginPath()
      ctx.moveTo(pos.x + 15, pos.y)
      ctx.lineTo(pos.x + 50, pos.y - 20)
      ctx.stroke()

      // Ajouter le texte
      ctx.font = "12px Arial"
      ctx.fillStyle = "#a13c2f" // Couleur fer oxydé
      ctx.textAlign = "left"
      ctx.fillText("Fossile", pos.x + 55, pos.y - 20)
    })
  }

  // Dessiner des annotations pour les stratifications
  const drawStratificationAnnotations = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    rockType: string,
  ) => {
    // Positions des stratifications (simulées)
    const stratPositions = getStratificationPositions(rockType, width, height)

    ctx.strokeStyle = "#d4b48c" // Couleur strates rocheuses
    ctx.lineWidth = 1
    ctx.setLineDash([5, 3])

    stratPositions.forEach((pos) => {
      // Dessiner une ligne pour la stratification
      ctx.beginPath()
      ctx.moveTo(0, pos.y)
      ctx.lineTo(width, pos.y)
      ctx.stroke()

      // Ajouter un label
      ctx.font = "10px Arial"
      ctx.fillStyle = "#d4b48c" // Couleur strates rocheuses
      ctx.textAlign = "left"
      ctx.fillText("Strate", 5, pos.y - 5)
    })

    ctx.setLineDash([])
  }

  // Générer une coupe procédurale
  const generateProceduralSection = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    rock: RockSample,
    view: "horizontal" | "vertical",
    r: number,
    g: number,
    b: number,
  ) => {
    // Fonction pour générer un nombre aléatoire dans une plage
    const random = (min: number, max: number) => Math.random() * (max - min) + min

    // Remplir le fond avec la couleur de base
    ctx.fillStyle = `rgb(${r}, ${g}, ${b})`
    ctx.fillRect(0, 0, width, height)

    // Générer des strates si c'est une coupe verticale
    if (view === "vertical" && ["sandstone", "limestone", "silt"].includes(rock.type)) {
      const numLayers = Math.floor(random(3, 7))
      const layerHeight = height / numLayers

      for (let i = 0; i < numLayers; i++) {
        const layerY = i * layerHeight
        const layerColor = `rgb(${r - 20 + random(0, 40)}, ${g - 20 + random(0, 40)}, ${b - 20 + random(0, 40)})`

        ctx.fillStyle = layerColor
        ctx.fillRect(0, layerY, width, layerHeight)

        // Ajouter des détails à la strate
        ctx.fillStyle = `rgba(0, 0, 0, 0.1)`
        for (let j = 0; j < 50; j++) {
          const x = random(0, width)
          const y = layerY + random(0, layerHeight)
          const size = random(2, 5)

          ctx.beginPath()
          ctx.arc(x, y, size, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    } else {
      // Pour les coupes horizontales ou autres types de roches
      switch (rock.type) {
        case "sandstone": // Grès
          // Petits grains de sable
          for (let i = 0; i < 2000; i++) {
            const x = random(0, width)
            const y = random(0, height)
            const size = random(1, 3)

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
            const size = random(5, 15)

            ctx.fillStyle = `rgba(${r - 10 + random(0, 20)}, ${g - 10 + random(0, 20)}, ${b - 10 + random(0, 20)}, 0.3)`
            ctx.beginPath()
            ctx.arc(x, y, size, 0, Math.PI * 2)
            ctx.fill()
          }
          break

        case "conglomerate": // Conglomérat
          // Gros galets arrondis dans une matrice
          for (let i = 0; i < 20; i++) {
            const x = random(0, width)
            const y = random(0, height)
            const size = random(20, 40)

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
            const size = random(15, 35)

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
            const size = random(2, 8)

            ctx.fillStyle = `rgba(${r - 30 + random(0, 60)}, ${g - 30 + random(0, 60)}, ${b - 30 + random(0, 60)}, 0.5)`
            ctx.beginPath()
            ctx.arc(x, y, size, 0, Math.PI * 2)
            ctx.fill()
          }
      }
    }
  }

  // Fonction pour obtenir des positions simulées de fossiles
  function getFossilPositions(rockType: string, width: number, height: number): Array<{ x: number; y: number }> {
    // Simuler des positions différentes selon le type de roche
    const random = (min: number, max: number) => Math.random() * (max - min) + min

    switch (rockType) {
      case "limestone":
        return [
          { x: width * 0.3, y: height * 0.4 },
          { x: width * 0.7, y: height * 0.6 },
          { x: width * 0.5, y: height * 0.2 },
        ]
      case "chalk":
        return [
          { x: width * 0.2, y: height * 0.3 },
          { x: width * 0.6, y: height * 0.5 },
          { x: width * 0.8, y: height * 0.7 },
        ]
      default:
        return []
    }
  }

  // Fonction pour obtenir des positions simulées de stratifications
  function getStratificationPositions(rockType: string, width: number, height: number): Array<{ y: number }> {
    // Simuler des positions différentes selon le type de roche
    switch (rockType) {
      case "sandstone":
        return [{ y: height * 0.2 }, { y: height * 0.5 }, { y: height * 0.8 }]
      case "limestone":
        return [{ y: height * 0.3 }, { y: height * 0.6 }]
      case "silt":
        return [{ y: height * 0.25 }, { y: height * 0.45 }, { y: height * 0.65 }, { y: height * 0.85 }]
      default:
        return []
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Coupe de la Roche</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="horizontal" onValueChange={(value) => setView(value as "horizontal" | "vertical")}>
          <TabsList className="grid w-full grid-cols-2 bg-secondary">
            <TabsTrigger className="bg-orange-300 font-black shadow-lg rounded-3xl" value="horizontal">
              <StratificationIcon className="h-4 w-4 mr-2" />
              Coupe Horizontale
            </TabsTrigger>
            <TabsTrigger className="rounded-3xl shadow-lg bg-orange-300 font-black" value="vertical">
              <StratificationIcon className="h-4 w-4 mr-2 rotate-90" />
              Coupe Verticale
            </TabsTrigger>
          </TabsList>

          <div className="mt-4">
            <canvas ref={canvasRef} width={width} height={height} className="border rounded-md w-full" />
          </div>

          <div className="mt-4 text-sm text-muted-foreground">
            <p>Cette vue montre la structure interne de l'échantillon de {rock.name}.</p>
            {rock.hasFossils && <p className="mt-2">Les cercles rouges indiquent la présence de fossiles.</p>}
            {["sandstone", "limestone", "silt"].includes(rock.type) && (
              <p className="mt-2">Les lignes bleues indiquent les stratifications visibles.</p>
            )}
          </div>
        </Tabs>
      </CardContent>
    </Card>
  )
}

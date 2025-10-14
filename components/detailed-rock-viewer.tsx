"use client"

import { useState, useRef, useCallback } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows } from "@react-three/drei"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { ZoomIn, ZoomOut, RotateCcw, Sun, Moon, Maximize, Minimize, Info } from "lucide-react"
import type { RockSample } from "@/types/rocks"
import RealisticRockModelWithSuspense from "./realistic-rock-model"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface DetailedRockViewerProps {
  rock: RockSample
  showControls?: boolean
  showInfo?: boolean
  height?: string
}

// Composant d'éclairage avancé
function AdvancedLighting({ intensity = 1, position = [10, 10, 10] }) {
  return (
    <>
      <ambientLight intensity={0.5 * intensity} />
      <spotLight position={position} intensity={1 * intensity} angle={0.15} penumbra={1} castShadow />
      <directionalLight position={[5, 5, 5]} intensity={0.5 * intensity} castShadow />
      <pointLight position={[-10, -10, -10]} intensity={0.2 * intensity} />
    </>
  )
}

export default function DetailedRockViewer({
  rock,
  showControls = true,
  showInfo = true,
  height = "500px",
}: DetailedRockViewerProps) {
  const [zoom, setZoom] = useState(1)
  const [lightIntensity, setLightIntensity] = useState(1)
  const [autoRotate, setAutoRotate] = useState(true)
  const [fullscreen, setFullscreen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.2, 3))
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.2, 0.5))

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement && containerRef.current) {
      containerRef.current.requestFullscreen().catch((err) => {
        console.error(`Erreur: Impossible de passer en plein écran: ${err.message}`)
      })
      setFullscreen(true)
    } else {
      document.exitFullscreen()
      setFullscreen(false)
    }
  }, [])

  return (
    <Card className="w-full text-5xl">
      <CardContent className="p-0">
        <div ref={containerRef} className="relative" style={{ height: fullscreen ? "100vh" : height }}>
          <Canvas shadows>
            <PerspectiveCamera makeDefault position={[0, 0, 5 / zoom]} fov={45} near={0.1} far={1000} />

            <AdvancedLighting intensity={lightIntensity} />

            <RealisticRockModelWithSuspense rock={rock} autoRotate={autoRotate} />

            <ContactShadows position={[0, -1, 0]} opacity={0.5} scale={10} blur={1.5} far={10} resolution={256} />

            <Environment preset="studio" />

            <OrbitControls
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              autoRotate={autoRotate}
              autoRotateSpeed={1}
              minDistance={2}
              maxDistance={10}
            />
          </Canvas>

          {showControls && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 bg-background/90 dark:bg-black/80 p-2 rounded-lg shadow-md leading-4 tracking-widest flex-row items-end justify-stretch py-0">
              <Button variant="outline" size="icon" onClick={handleZoomOut} disabled={zoom <= 0.5}>
                <ZoomOut className="h-4 w-4" />
              </Button>

              <Slider
                value={[zoom]}
                min={0.5}
                max={3}
                step={0.1}
                onValueChange={(value) => setZoom(value[0])}
                className="w-24"
              />

              <Button variant="outline" size="icon" onClick={handleZoomIn} disabled={zoom >= 3}>
                <ZoomIn className="h-4 w-4" />
              </Button>

              <div className="w-px h-6 bg-muted" />

              <Button variant="outline" size="icon" onClick={() => setAutoRotate(!autoRotate)}>
                <RotateCcw className={`h-4 w-4 ${autoRotate ? "text-primary" : ""}`} />
              </Button>

              <div className="w-px h-6 bg-muted" />

              <Button variant="outline" size="icon" onClick={() => setLightIntensity((prev) => (prev === 1 ? 0.5 : 1))}>
                {lightIntensity === 1 ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>

              <div className="w-px h-6 bg-muted" />

              <Button variant="outline" size="icon" onClick={toggleFullscreen}>
                {fullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
              </Button>
            </div>
          )}

          {showInfo && (
            <div className="absolute top-4 right-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Info className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-2">
                    <h3 className="font-medium">{rock.name}</h3>
                    <p className="text-sm text-muted-foreground">{rock.description}</p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="font-medium">Type:</span> {rock.type}
                      </div>
                      <div>
                        <span className="font-medium">Couleur:</span> {rock.color}
                      </div>
                      <div>
                        <span className="font-medium">Taille des grains:</span> {rock.grainSize}
                      </div>
                      <div>
                        <span className="font-medium">Texture:</span> {rock.texture === "rough" ? "Rugueuse" : "Lisse"}
                      </div>
                      <div>
                        <span className="font-medium">Dureté:</span> {rock.hardness}/10
                      </div>
                      <div>
                        <span className="font-medium">Réaction à l'acide:</span>{" "}
                        {rock.acidReaction === "strong" ? "Forte" : rock.acidReaction === "weak" ? "Faible" : "Aucune"}
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

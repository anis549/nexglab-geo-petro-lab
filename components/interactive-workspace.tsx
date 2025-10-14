"use client"

import { useState, useRef, useEffect, Suspense } from "react"
import { Canvas, useThree, useFrame } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera, Environment, Html } from "@react-three/drei"
import { Physics, useBox, usePlane, useCylinder } from "@react-three/cannon"
import { Vector3 } from "three"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RefreshCw } from "lucide-react"
import type { RockSample, ExperimentResult } from "@/types/rocks"
import { v4 as uuidv4 } from "@/utils/uuid"
import { getRockColor, getRockMaterialProperties } from "./rock-materials"

interface InteractiveWorkspaceProps {
  rockSamples: RockSample[]
  selectedRock: RockSample | null
  onSelectRock: (rock: RockSample) => void
  onExperimentComplete: (result: ExperimentResult) => void
}

// Composant pour le plan de travail
function WorkBench(props) {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -0.5, 0],
    ...props,
  }))

  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial color="#f0f0f0" />
    </mesh>
  )
}

// Composant pour une roche interactive
function InteractiveRock({ rock, position, onSelect, isSelected }) {
  const [ref, api] = useBox(() => ({
    mass: 1,
    position,
    args: [1, 1, 1],
    allowSleep: false,
  }))

  const materialProps = getRockMaterialProperties(rock.type)
  const color = getRockColor(rock.color)

  // Gérer la sélection de la roche
  const handleClick = (e) => {
    e.stopPropagation()
    onSelect(rock)
  }

  // Gérer la rotation de la roche
  useFrame(() => {
    if (isSelected) {
      ref.current.rotation.y += 0.005
    }
  })

  // Obtenir la géométrie en fonction du type de roche
  const RockGeometry = () => {
    switch (rock.type) {
      case "sandstone":
        return <boxGeometry args={[1, 1, 1]} />
      case "limestone":
        return <sphereGeometry args={[0.8, 32, 32]} />
      case "clay":
        return <cylinderGeometry args={[0.7, 0.7, 1, 32]} />
      case "conglomerate":
        return <dodecahedronGeometry args={[0.8, 1]} />
      case "breccia":
        return <octahedronGeometry args={[0.8, 1]} />
      case "dolomite":
        return <icosahedronGeometry args={[0.8, 1]} />
      case "chalk":
        return <sphereGeometry args={[0.8, 16, 16]} />
      case "silt":
        return <torusGeometry args={[0.5, 0.2, 16, 32]} />
      default:
        return <boxGeometry args={[1, 1, 1]} />
    }
  }

  return (
    <mesh ref={ref} onClick={handleClick} castShadow receiveShadow scale={isSelected ? 1.1 : 1}>
      <RockGeometry />
      <meshStandardMaterial
        color={color}
        roughness={materialProps.roughness}
        metalness={materialProps.metalness}
        emissive={isSelected ? "#555555" : "#000000"}
        emissiveIntensity={isSelected ? 0.2 : 0}
      />
      {isSelected && (
        <Html position={[0, 1.5, 0]} center>
          <div className="bg-white/80 px-2 py-1 rounded text-xs">{rock.name}</div>
        </Html>
      )}
    </mesh>
  )
}

// Hook personnalisé pour le drag and drop
function useDraggable(api) {
  const { camera, raycaster, mouse, gl } = useThree()
  const [isDragging, setIsDragging] = useState(false)
  const dragStartPos = useRef(null)
  const dragStartTime = useRef(0)

  const handlePointerDown = (e) => {
    e.stopPropagation()
    setIsDragging(true)
    dragStartPos.current = new Vector3(e.point.x, e.point.y, e.point.z)
    dragStartTime.current = Date.now()
    gl.domElement.style.cursor = "grabbing"
  }

  const handlePointerUp = (e) => {
    e.stopPropagation()
    setIsDragging(false)
    dragStartPos.current = null
    gl.domElement.style.cursor = "grab"
  }

  const handlePointerMove = (e) => {
    if (isDragging && dragStartPos.current) {
      const dragDelta = new Vector3(
        e.point.x - dragStartPos.current.x,
        0, // Maintenir la même hauteur
        e.point.z - dragStartPos.current.z,
      )

      api.position.set(e.point.x, e.point.y, e.point.z)

      dragStartPos.current = new Vector3(e.point.x, e.point.y, e.point.z)
    }
  }

  return {
    isDragging,
    onPointerDown: handlePointerDown,
    onPointerUp: handlePointerUp,
    onPointerMove: handlePointerMove,
  }
}

// Composant pour le flacon d'acide
function AcidBottle({ position, onUse }) {
  const [ref, api] = useBox(() => ({
    mass: 0.5,
    position,
    args: [0.3, 0.8, 0.3],
    allowSleep: false,
  }))

  const { isDragging, onPointerDown, onPointerUp, onPointerMove } = useDraggable(api)

  // Vérifier si le flacon est utilisé sur une roche
  const handlePointerUp = (e) => {
    onPointerUp(e)

    // Vérifier si le flacon est au-dessus d'une roche
    if (onUse && ref.current) {
      onUse(ref.current.position)
    }
  }

  return (
    <group ref={ref}>
      <mesh
        castShadow
        receiveShadow
        onPointerDown={onPointerDown}
        onPointerUp={handlePointerUp}
        onPointerMove={onPointerMove}
        cursor={isDragging ? "grabbing" : "grab"}
      >
        <cylinderGeometry args={[0.15, 0.15, 0.8, 16]} />
        <meshStandardMaterial color="#88ccff" transparent opacity={0.8} />
      </mesh>
      <mesh position={[0, 0.4, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.2, 16]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <Html position={[0, 0, 0]} center>
        <div className="bg-white/80 px-2 py-1 rounded text-xs">HCl</div>
      </Html>
    </group>
  )
}

// Composant pour le marteau de géologue
function GeologistHammer({ position, onUse }) {
  const [ref, api] = useBox(() => ({
    mass: 1,
    position,
    args: [0.2, 0.8, 0.2],
    allowSleep: false,
  }))

  const { isDragging, onPointerDown, onPointerUp, onPointerMove } = useDraggable(api)

  // Vérifier si le marteau est utilisé sur une roche
  const handlePointerUp = (e) => {
    onPointerUp(e)

    // Vérifier si le marteau est au-dessus d'une roche
    if (onUse && ref.current) {
      onUse(ref.current.position)
    }
  }

  return (
    <group ref={ref}>
      <mesh
        castShadow
        receiveShadow
        onPointerDown={onPointerDown}
        onPointerUp={handlePointerUp}
        onPointerMove={onPointerMove}
        cursor={isDragging ? "grabbing" : "grab"}
        rotation={[0, 0, Math.PI / 4]}
      >
        <boxGeometry args={[0.2, 0.8, 0.2]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      <mesh position={[0.3, 0.3, 0]} castShadow rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.4, 0.2, 0.3]} />
        <meshStandardMaterial color="#A9A9A9" />
      </mesh>
    </group>
  )
}

// Composant pour la loupe
function Magnifier({ position, onUse }) {
  const [ref, api] = useBox(() => ({
    mass: 0.3,
    position,
    args: [0.1, 0.5, 0.1],
    allowSleep: false,
  }))

  const { isDragging, onPointerDown, onPointerUp, onPointerMove } = useDraggable(api)

  // Vérifier si la loupe est utilisée sur une roche
  const handlePointerUp = (e) => {
    onPointerUp(e)

    // Vérifier si la loupe est au-dessus d'une roche
    if (onUse && ref.current) {
      onUse(ref.current.position)
    }
  }

  return (
    <group ref={ref}>
      <mesh
        castShadow
        receiveShadow
        onPointerDown={onPointerDown}
        onPointerUp={handlePointerUp}
        onPointerMove={onPointerMove}
        cursor={isDragging ? "grabbing" : "grab"}
      >
        <cylinderGeometry args={[0.05, 0.05, 0.5, 16]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      <mesh position={[0, 0.3, 0]} castShadow rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.2, 0.03, 16, 32]} />
        <meshStandardMaterial color="#A9A9A9" />
      </mesh>
      <mesh position={[0, 0.3, 0]} castShadow rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.18, 32]} />
        <meshStandardMaterial color="#CCCCFF" transparent opacity={0.5} />
      </mesh>
    </group>
  )
}

// Composant pour le tamiseur
function Sieve({ position, onUse }) {
  const [ref, api] = useCylinder(() => ({
    mass: 0.8,
    position,
    args: [0.4, 0.4, 0.3, 16],
    allowSleep: false,
  }))

  const { isDragging, onPointerDown, onPointerUp, onPointerMove } = useDraggable(api)

  // Vérifier si le tamiseur est utilisé sur une roche
  const handlePointerUp = (e) => {
    onPointerUp(e)

    // Vérifier si le tamiseur est au-dessus d'une roche
    if (onUse && ref.current) {
      onUse(ref.current.position)
    }
  }

  return (
    <group ref={ref}>
      <mesh
        castShadow
        receiveShadow
        onPointerDown={onPointerDown}
        onPointerUp={handlePointerUp}
        onPointerMove={onPointerMove}
        cursor={isDragging ? "grabbing" : "grab"}
      >
        <cylinderGeometry args={[0.4, 0.4, 0.3, 16]} />
        <meshStandardMaterial color="#CCCCCC" wireframe />
      </mesh>
      <mesh position={[0, -0.1, 0]} castShadow>
        <cylinderGeometry args={[0.38, 0.38, 0.05, 16]} />
        <meshStandardMaterial color="#AAAAAA" wireframe />
      </mesh>
    </group>
  )
}

// Composant pour les bulles d'effervescence (réaction à l'acide)
function AcidReactionBubbles({ position, intensity, onComplete }) {
  const groupRef = useRef()
  const [bubbles, setBubbles] = useState([])
  const [timer, setTimer] = useState(0)

  // Créer des bulles en fonction de l'intensité de la réaction
  useEffect(() => {
    const bubbleCount = intensity === "strong" ? 30 : intensity === "weak" ? 15 : 0

    if (bubbleCount > 0) {
      const newBubbles = []
      for (let i = 0; i < bubbleCount; i++) {
        newBubbles.push({
          id: i,
          position: [
            position[0] + (Math.random() - 0.5) * 0.5,
            position[1] + Math.random() * 0.2,
            position[2] + (Math.random() - 0.5) * 0.5,
          ],
          scale: Math.random() * 0.05 + 0.02,
          speed: Math.random() * 0.01 + 0.005,
        })
      }
      setBubbles(newBubbles)
    }

    // Définir un timer pour terminer l'animation
    const timeout = setTimeout(() => {
      setBubbles([])
      if (onComplete) onComplete()
    }, 3000)

    return () => clearTimeout(timeout)
  }, [position, intensity, onComplete])

  // Animer les bulles
  useFrame(() => {
    bubbles.forEach((bubble, i) => {
      const mesh = groupRef.current?.children[i]
      if (mesh) {
        mesh.position.y += bubble.speed
        mesh.rotation.x += 0.01
        mesh.rotation.z += 0.01
      }
    })

    setTimer((prev) => prev + 1)
  })

  if (bubbles.length === 0) return null

  return (
    <group ref={groupRef}>
      {bubbles.map((bubble) => (
        <mesh key={bubble.id} position={bubble.position} scale={bubble.scale}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial color="#FFFFFF" transparent opacity={0.7} />
        </mesh>
      ))}
    </group>
  )
}

// Fonction utilitaire pour vérifier si deux objets sont proches l'un de l'autre
function areObjectsClose(pos1, pos2, threshold = 1.5) {
  const dx = pos1.x - pos2.x
  const dy = pos1.y - pos2.y
  const dz = pos1.z - pos2.z
  const distance = Math.sqrt(dx * dx + dy * dy + dz * dz)
  return distance < threshold
}

// Composant principal pour l'espace de travail interactif
export default function InteractiveWorkspace({
  rockSamples,
  selectedRock,
  onSelectRock,
  onExperimentComplete,
}: InteractiveWorkspaceProps) {
  const [activeRock, setActiveRock] = useState<RockSample | null>(null)
  const [activeExperiment, setActiveExperiment] = useState<string | null>(null)
  const [experimentInProgress, setExperimentInProgress] = useState(false)
  const [acidReaction, setAcidReaction] = useState<{ position: [number, number, number]; intensity: string } | null>(
    null,
  )

  // Référence aux positions des objets dans la scène
  const rockPositionsRef = useRef<Map<string, Vector3>>(new Map())
  const toolPositionsRef = useRef({
    acid: new Vector3(2, 0, -2),
    hammer: new Vector3(2, 0, 0),
    magnifier: new Vector3(2, 0, 2),
    sieve: new Vector3(-2, 0, 0),
  })

  // Initialiser les positions des roches
  useEffect(() => {
    rockSamples.forEach((rock, index) => {
      const row = Math.floor(index / 3)
      const col = index % 3
      rockPositionsRef.current.set(rock.id, new Vector3(-3 + col * 3, 0, -3 + row * 3))
    })
  }, [rockSamples])

  // Gérer la sélection d'une roche
  const handleSelectRock = (rock: RockSample) => {
    setActiveRock(rock)
    if (onSelectRock) onSelectRock(rock)
  }

  // Gérer l'utilisation de l'acide
  const handleUseAcid = (position) => {
    if (!activeRock) return

    const rockPosition = rockPositionsRef.current.get(activeRock.id)
    if (!rockPosition) return

    if (areObjectsClose(position, rockPosition)) {
      setExperimentInProgress(true)
      setActiveExperiment("acid")

      // Déclencher l'animation de réaction à l'acide
      setAcidReaction({
        position: [rockPosition.x, rockPosition.y, rockPosition.z],
        intensity: activeRock.acidReaction,
      })

      // Enregistrer le résultat de l'expérience après l'animation
      setTimeout(() => {
        let result = ""
        let details: Record<string, any> = {}

        result = `Réaction à l'acide: ${
          activeRock.acidReaction === "strong"
            ? "Forte effervescence"
            : activeRock.acidReaction === "weak"
              ? "Faible effervescence"
              : "Aucune réaction"
        }`
        details = { acidReaction: activeRock.acidReaction }

        onExperimentComplete({
          id: uuidv4(),
          rockId: activeRock.id,
          experimentType: "acid",
          timestamp: Date.now(),
          result,
          details,
        })

        setExperimentInProgress(false)
        setActiveExperiment(null)
        setAcidReaction(null)
      }, 3500)
    }
  }

  // Gérer l'utilisation du marteau
  const handleUseHammer = (position) => {
    if (!activeRock) return

    const rockPosition = rockPositionsRef.current.get(activeRock.id)
    if (!rockPosition) return

    if (areObjectsClose(position, rockPosition)) {
      setExperimentInProgress(true)
      setActiveExperiment("hardness")

      // Simuler le test de dureté
      setTimeout(() => {
        let result = ""
        let details: Record<string, any> = {}

        result = `Dureté: ${activeRock.hardness} sur l'échelle de Mohs`
        details = { hardness: activeRock.hardness }

        onExperimentComplete({
          id: uuidv4(),
          rockId: activeRock.id,
          experimentType: "hardness",
          timestamp: Date.now(),
          result,
          details,
        })

        setExperimentInProgress(false)
        setActiveExperiment(null)
      }, 1500)
    }
  }

  // Gérer l'utilisation de la loupe
  const handleUseMagnifier = (position) => {
    if (!activeRock) return

    const rockPosition = rockPositionsRef.current.get(activeRock.id)
    if (!rockPosition) return

    if (areObjectsClose(position, rockPosition)) {
      setExperimentInProgress(true)
      setActiveExperiment("texture")

      // Simuler l'analyse de texture
      setTimeout(() => {
        let result = ""
        let details: Record<string, any> = {}

        result = `Texture: ${activeRock.texture === "rough" ? "Rugueuse" : "Lisse"}`
        details = { texture: activeRock.texture }

        onExperimentComplete({
          id: uuidv4(),
          rockId: activeRock.id,
          experimentType: "texture",
          timestamp: Date.now(),
          result,
          details,
        })

        setExperimentInProgress(false)
        setActiveExperiment(null)
      }, 1500)
    }
  }

  // Gérer l'utilisation du tamiseur
  const handleUseSieve = (position) => {
    if (!activeRock) return

    const rockPosition = rockPositionsRef.current.get(activeRock.id)
    if (!rockPosition) return

    if (areObjectsClose(position, rockPosition)) {
      setExperimentInProgress(true)
      setActiveExperiment("granulometry")

      // Simuler le test granulométrique
      setTimeout(() => {
        let result = ""
        let details: Record<string, any> = {}

        result = `Taille des grains: ${activeRock.grainSize}`
        details = { grainSize: activeRock.grainSize }

        onExperimentComplete({
          id: uuidv4(),
          rockId: activeRock.id,
          experimentType: "granulometry",
          timestamp: Date.now(),
          result,
          details,
        })

        setExperimentInProgress(false)
        setActiveExperiment(null)
      }, 2000)
    }
  }

  // Réinitialiser les positions des outils
  const resetToolPositions = () => {
    // Dans une implémentation réelle, cela repositionnerait les outils à leurs positions initiales
    alert("Outils réinitialisés")
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Espace de Travail Interactif</CardTitle>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={resetToolPositions}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Réinitialiser les outils
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <div className="h-[600px] relative">
            <Canvas shadows>
              <PerspectiveCamera makeDefault position={[0, 5, 10]} fov={45} />

              <ambientLight intensity={0.5} />
              <directionalLight
                position={[5, 10, 5]}
                intensity={1}
                castShadow
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
              />

              <Physics>
                <WorkBench />

                {/* Roches interactives */}
                <Suspense fallback={null}>
                  {rockSamples.map((rock) => (
                    <InteractiveRock
                      key={rock.id}
                      rock={rock}
                      position={rockPositionsRef.current.get(rock.id)?.toArray() || [0, 0, 0]}
                      onSelect={handleSelectRock}
                      isSelected={activeRock?.id === rock.id}
                    />
                  ))}
                </Suspense>

                {/* Outils interactifs */}
                <AcidBottle position={toolPositionsRef.current.acid.toArray()} onUse={handleUseAcid} />
                <GeologistHammer position={toolPositionsRef.current.hammer.toArray()} onUse={handleUseHammer} />
                <Magnifier position={toolPositionsRef.current.magnifier.toArray()} onUse={handleUseMagnifier} />
                <Sieve position={toolPositionsRef.current.sieve.toArray()} onUse={handleUseSieve} />

                {/* Animation de réaction à l'acide */}
                {acidReaction && (
                  <AcidReactionBubbles
                    position={acidReaction.position}
                    intensity={acidReaction.intensity}
                    onComplete={() => setAcidReaction(null)}
                  />
                )}
              </Physics>

              <Environment preset="studio" />
              <OrbitControls
                enablePan={true}
                enableZoom={true}
                enableRotate={true}
                minPolarAngle={0}
                maxPolarAngle={Math.PI / 2}
              />
            </Canvas>

            {/* Instructions et légende */}
            <div className="absolute top-4 left-4 bg-white/80 p-2 rounded shadow-md text-sm">
              <p className="font-bold mb-1">Instructions:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Cliquez sur une roche pour la sélectionner</li>
                <li>Faites glisser les outils vers la roche pour effectuer des tests</li>
                <li>Utilisez la souris pour naviguer dans la scène</li>
              </ul>
            </div>

            {/* Indicateur d'expérience en cours */}
            {experimentInProgress && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/80 p-2 rounded shadow-md">
                <p className="text-center">
                  {activeExperiment === "acid" && "Test à l'acide en cours..."}
                  {activeExperiment === "hardness" && "Test de dureté en cours..."}
                  {activeExperiment === "texture" && "Analyse de texture en cours..."}
                  {activeExperiment === "granulometry" && "Test granulométrique en cours..."}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

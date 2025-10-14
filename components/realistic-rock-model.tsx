"use client"

import { useRef, useState, Suspense } from "react"
import { Environment, ContactShadows } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"
import type { RockSample } from "@/types/rocks"
import { getRockMaterialProperties, getRockColor } from "./rock-materials"

interface RealisticRockModelProps {
  rock: RockSample
  autoRotate?: boolean
}

// Composant pour le modèle 3D de roche réaliste
export function RealisticRockModel({ rock, autoRotate = true }: RealisticRockModelProps) {
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  const [modelError, setModelError] = useState(false)

  // Animation de rotation
  useFrame((state, delta) => {
    if (groupRef.current && autoRotate && !hovered) {
      groupRef.current.rotation.y += delta * 0.2
    }
  })

  // Obtenir les propriétés du matériau en fonction du type de roche
  const materialProps = getRockMaterialProperties(rock.type)
  const color = getRockColor(rock.color)

  // Créer une géométrie en fonction du type de roche
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
    <group ref={groupRef} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
      <mesh>
        <RockGeometry />
        <meshStandardMaterial color={color} roughness={materialProps.roughness} metalness={materialProps.metalness} />
      </mesh>
    </group>
  )
}

// Composant avec Suspense pour le chargement asynchrone
export default function RealisticRockModelWithSuspense(props: RealisticRockModelProps) {
  return (
    <Suspense fallback={<RockPlaceholder />}>
      <RealisticRockModel {...props} />
      <Environment preset="studio" />
      <ContactShadows position={[0, -1, 0]} opacity={0.5} scale={10} blur={1} far={10} resolution={256} />
    </Suspense>
  )
}

// Composant placeholder pendant le chargement
function RockPlaceholder() {
  return (
    <mesh>
      <sphereGeometry args={[0.8, 16, 16]} />
      <meshStandardMaterial color="#a0a0a0" wireframe />
    </mesh>
  )
}

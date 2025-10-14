"use client"

import { useRef, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera, Environment, Text } from "@react-three/drei"
import type { RockSample } from "@/types/rocks"
import type * as THREE from "three"

interface RockModel3DProps {
  rock: RockSample
}

function RockGeometry({ rock }: { rock: RockSample }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state, delta) => {
    if (meshRef.current && !hovered) {
      meshRef.current.rotation.y += delta * 0.2
    }
  })

  // Different geometries based on rock type
  const getGeometry = () => {
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

  // Different colors based on rock color
  const getColor = () => {
    switch (rock.color) {
      case "beige":
        return "#e8d8c3"
      case "gris":
        return "#a0a0a0"
      case "rouge":
        return "#c25b56"
      case "blanc":
        return "#f5f5f5"
      case "gris-brun":
        return "#7d7068"
      case "varié":
        return "#d4a373"
      case "beige à gris":
        return "#c8b6a6"
      default:
        return "#a0a0a0"
    }
  }

  return (
    <mesh ref={meshRef} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
      {getGeometry()}
      <meshStandardMaterial color={getColor()} roughness={rock.texture === "rough" ? 0.8 : 0.2} metalness={0.1} />
    </mesh>
  )
}

function RockLabels({ rock }: { rock: RockSample }) {
  const { camera } = useThree()

  return (
    <>
      <Text
        position={[0, 1.5, 0]}
        fontSize={0.2}
        color="#000000"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter_Regular.json"
        lookAt={camera.position}
      >
        {rock.name}
      </Text>

      <Text
        position={[0, -1.5, 0]}
        fontSize={0.15}
        color="#666666"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter_Regular.json"
        lookAt={camera.position}
      >
        {rock.type}
      </Text>
    </>
  )
}

export default function RockModel3D({ rock }: RockModel3DProps) {
  return (
    <Canvas className="w-full h-full">
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />

      <RockGeometry rock={rock} />
      <RockLabels rock={rock} />

      <Environment preset="studio" />
      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
    </Canvas>
  )
}

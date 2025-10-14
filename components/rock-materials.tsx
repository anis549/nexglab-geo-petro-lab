"use client"

import { useTexture } from "@react-three/drei"
import * as THREE from "three"
import type { RockType } from "@/types/rocks"

interface RockMaterialProps {
  rockType: RockType
  color: string
  roughness?: number
  metalness?: number
}

export function RockMaterial({ rockType, color, roughness = 0.8, metalness = 0.1 }: RockMaterialProps) {
  // Charger les textures appropriées en fonction du type de roche
  const texturePaths = getTexturePathsByRockType(rockType)

  const textures = useTexture({
    map: texturePaths.albedo,
    normalMap: texturePaths.normal,
    roughnessMap: texturePaths.roughness,
    displacementMap: texturePaths.displacement,
  })

  // Ajuster les paramètres des textures
  if (textures.map) textures.map.colorSpace = THREE.SRGBColorSpace
  if (textures.normalMap) textures.normalMap.colorSpace = THREE.LinearSRGBColorSpace
  if (textures.roughnessMap) textures.roughnessMap.colorSpace = THREE.LinearSRGBColorSpace
  if (textures.displacementMap) {
    textures.displacementMap.colorSpace = THREE.LinearSRGBColorSpace
    textures.displacementMap.wrapS = textures.displacementMap.wrapT = THREE.RepeatWrapping
  }

  // Répéter les textures pour plus de détails
  Object.values(textures).forEach((texture) => {
    if (texture) {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping
      texture.repeat.set(2, 2)
    }
  })

  return (
    <meshStandardMaterial
      {...textures}
      color={color}
      roughness={roughness}
      metalness={metalness}
      normalScale={[0.5, 0.5]}
      displacementScale={0.05}
      displacementBias={-0.025}
    />
  )
}

// Fonction pour obtenir les chemins des textures en fonction du type de roche
function getTexturePathsByRockType(rockType: RockType): {
  albedo: string
  normal: string
  roughness: string
  displacement: string
} {
  switch (rockType) {
    case "sandstone":
      return {
        albedo: "/textures/sandstone/albedo.jpg",
        normal: "/textures/sandstone/normal.jpg",
        roughness: "/textures/sandstone/roughness.jpg",
        displacement: "/textures/sandstone/displacement.jpg",
      }
    case "limestone":
      return {
        albedo: "/textures/limestone/albedo.jpg",
        normal: "/textures/limestone/normal.jpg",
        roughness: "/textures/limestone/roughness.jpg",
        displacement: "/textures/limestone/displacement.jpg",
      }
    case "clay":
      return {
        albedo: "/textures/clay/albedo.jpg",
        normal: "/textures/clay/normal.jpg",
        roughness: "/textures/clay/roughness.jpg",
        displacement: "/textures/clay/displacement.jpg",
      }
    case "conglomerate":
      return {
        albedo: "/textures/conglomerate/albedo.jpg",
        normal: "/textures/conglomerate/normal.jpg",
        roughness: "/textures/conglomerate/roughness.jpg",
        displacement: "/textures/conglomerate/displacement.jpg",
      }
    case "breccia":
      return {
        albedo: "/textures/breccia/albedo.jpg",
        normal: "/textures/breccia/normal.jpg",
        roughness: "/textures/breccia/roughness.jpg",
        displacement: "/textures/breccia/displacement.jpg",
      }
    case "dolomite":
      return {
        albedo: "/textures/dolomite/albedo.jpg",
        normal: "/textures/dolomite/normal.jpg",
        roughness: "/textures/dolomite/roughness.jpg",
        displacement: "/textures/dolomite/displacement.jpg",
      }
    case "chalk":
      return {
        albedo: "/textures/chalk/albedo.jpg",
        normal: "/textures/chalk/normal.jpg",
        roughness: "/textures/chalk/roughness.jpg",
        displacement: "/textures/chalk/displacement.jpg",
      }
    case "silt":
      return {
        albedo: "/textures/silt/albedo.jpg",
        normal: "/textures/silt/normal.jpg",
        roughness: "/textures/silt/roughness.jpg",
        displacement: "/textures/silt/displacement.jpg",
      }
    default:
      return {
        albedo: "/textures/default/albedo.jpg",
        normal: "/textures/default/normal.jpg",
        roughness: "/textures/default/roughness.jpg",
        displacement: "/textures/default/displacement.jpg",
      }
  }
}

// Fonction pour obtenir les propriétés physiques des matériaux en fonction du type de roche
export function getRockMaterialProperties(rockType: RockType): { roughness: number; metalness: number } {
  switch (rockType) {
    case "sandstone":
      return { roughness: 0.9, metalness: 0.1 }
    case "limestone":
      return { roughness: 0.7, metalness: 0.2 }
    case "clay":
      return { roughness: 0.95, metalness: 0.05 }
    case "conglomerate":
      return { roughness: 0.85, metalness: 0.15 }
    case "breccia":
      return { roughness: 0.8, metalness: 0.2 }
    case "dolomite":
      return { roughness: 0.75, metalness: 0.25 }
    case "chalk":
      return { roughness: 0.9, metalness: 0.05 }
    case "silt":
      return { roughness: 0.85, metalness: 0.1 }
    default:
      return { roughness: 0.8, metalness: 0.1 }
  }
}

// Fonction pour obtenir la couleur réaliste en fonction de la description de couleur
export function getRockColor(colorDescription: string): string {
  switch (colorDescription) {
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

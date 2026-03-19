"use client"

import type { RockSample } from "@/types/rocks"

export const ROCK_SAMPLES: RockSample[] = [
  {
    id: "sandstone-1",
    name: "Grès Quartzeux",
    type: "sandstone",
    description: "Grès composé principalement de quartz avec un ciment siliceux.",
    color: "beige",
    grainSize: "sand",
    texture: "rough",
    hardness: 7,
    acidReaction: "none",
    fracture: "irregular",
    hasFossils: false,
    modelPath: "/models/sandstone.glb",
    thumbnailPath: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "limestone-1",
    name: "Calcaire Fossilifère",
    type: "limestone",
    description: "Calcaire contenant des fossiles visibles à l'œil nu.",
    color: "gris",
    grainSize: "sand",
    texture: "rough",
    hardness: 3,
    acidReaction: "strong",
    fracture: "irregular",
    hasFossils: true,
    modelPath: "/models/limestone.glb",
    thumbnailPath: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "clay-1",
    name: "Argile Rouge",
    type: "clay",
    description: "Argile de couleur rouge riche en oxydes de fer.",
    color: "rouge",
    grainSize: "clay",
    texture: "smooth",
    hardness: 2,
    acidReaction: "none",
    fracture: "irregular",
    hasFossils: false,
    modelPath: "/models/clay.glb",
    thumbnailPath: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "conglomerate-1",
    name: "Poudingue",
    type: "conglomerate",
    description: "Conglomérat à galets arrondis dans une matrice sableuse.",
    color: "varié",
    grainSize: "pebble",
    texture: "rough",
    hardness: 6,
    acidReaction: "none",
    fracture: "irregular",
    hasFossils: false,
    modelPath: "/models/conglomerate.glb",
    thumbnailPath: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "breccia-1",
    name: "Brèche Sédimentaire",
    type: "breccia",
    description: "Conglomérat à fragments anguleux dans une matrice fine.",
    color: "varié",
    grainSize: "gravel",
    texture: "rough",
    hardness: 6,
    acidReaction: "none",
    fracture: "irregular",
    hasFossils: false,
    modelPath: "/models/breccia.glb",
    thumbnailPath: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "dolomite-1",
    name: "Dolomie",
    type: "dolomite",
    description: "Roche carbonatée composée principalement de dolomite.",
    color: "beige à gris",
    grainSize: "sand",
    texture: "rough",
    hardness: 4,
    acidReaction: "weak",
    fracture: "irregular",
    hasFossils: false,
    modelPath: "/models/dolomite.glb",
    thumbnailPath: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "chalk-1",
    name: "Craie",
    type: "chalk",
    description: "Calcaire blanc très fin composé de microfossiles.",
    color: "blanc",
    grainSize: "clay",
    texture: "smooth",
    hardness: 1,
    acidReaction: "strong",
    fracture: "irregular",
    hasFossils: true,
    modelPath: "/models/chalk.glb",
    thumbnailPath: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "silt-1",
    name: "Silt Consolidé",
    type: "silt",
    description: "Sédiment fin consolidé, intermédiaire entre l'argile et le sable.",
    color: "gris-brun",
    grainSize: "silt",
    texture: "smooth",
    hardness: 3,
    acidReaction: "none",
    fracture: "irregular",
    hasFossils: false,
    modelPath: "/models/silt.glb",
    thumbnailPath: "/placeholder.svg?height=200&width=200",
  },
]

// Data service functions
export function getRockById(id: string): RockSample | undefined {
  return ROCK_SAMPLES.find(rock => rock.id === id)
}

export function getRocksByType(type: RockSample['type']): RockSample[] {
  return ROCK_SAMPLES.filter(rock => rock.type === type)
}

export function searchRocks(query: string): RockSample[] {
  const lowerQuery = query.toLowerCase().trim()
  if (!lowerQuery) return ROCK_SAMPLES

  return ROCK_SAMPLES.filter(rock =>
    rock.name.toLowerCase().includes(lowerQuery) ||
    rock.type.toLowerCase().includes(lowerQuery) ||
    rock.description.toLowerCase().includes(lowerQuery)
  )
}

export function getAllRockTypes(): RockSample['type'][] {
  return [...new Set(ROCK_SAMPLES.map(rock => rock.type))]
}

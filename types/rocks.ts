export type RockType =
  | "sandstone" // grès
  | "limestone" // calcaire
  | "clay" // argile
  | "silt" // silt
  | "conglomerate" // conglomérat
  | "breccia" // brèche
  | "dolomite" // dolomie
  | "chalk" // craie
  | "marl" // marne
  | "shale" // schiste

export type GrainSize =
  | "block" // bloc
  | "pebble" // galet
  | "gravel" // gravier
  | "sand" // sable
  | "silt" // silt
  | "clay" // argile

export type AcidReaction =
  | "strong" // forte
  | "weak" // faible
  | "none" // aucune

export type Texture =
  | "rough" // rugueuse
  | "smooth" // lisse

export type Hardness = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 // Échelle de Mohs

export type Fracture =
  | "conchoidal" // conchoïdale
  | "irregular" // irrégulière
  | "splintery" // esquilleuse

export interface RockSample {
  id: string
  name: string
  type: RockType
  description: string
  color: string
  grainSize: GrainSize
  texture: Texture
  hardness: Hardness
  acidReaction: AcidReaction
  fracture: Fracture
  hasFossils: boolean
  modelPath: string
  thumbnailPath: string
}

export type ExperimentType =
  | "granulometry" // granulométrie
  | "acid" // test à l'acide
  | "hardness" // test de dureté
  | "texture" // analyse de texture
  | "fossil" // détection de fossiles

export interface ExperimentResult {
  id: string
  rockId: string
  experimentType: ExperimentType
  timestamp: number
  result: string
  details: Record<string, any>
}

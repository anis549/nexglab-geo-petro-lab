/**
 * SAFE DATA LAYER UTILITY
 * 
 * Purpose: Validate and safely merge rock sample data with experiment results.
 * 
 * Problem it solves:
 * - experimentResults can contain undefined, null, or invalid values
 * - These broken values override correct rockSamples data
 * - This causes UI to display "undefined" or incorrect data
 * 
 * Solution:
 * - Validate each field individually against allowed values
 * - Only use experiment data if VALID
 * - ALWAYS fall back to rockSamples if experiment data is invalid
 * - Transform data to consistent French labels for display
 */

import type { RockSample, ExperimentResult } from "@/types/rocks"

// ─────────────────────────────────────────────────────────────
// VALIDATION SCHEMAS (Source of Truth)
// ─────────────────────────────────────────────────────────────

const VALID_ACID_REACTIONS = new Set([
  "Forte effervescence",
  "Faible effervescence",
  "Aucune réaction",
])

const VALID_TEXTURES = new Set([
  "Rugueuse",
  "Lisse",
])

const VALID_FOSSILS = new Set([
  "Présents",
  "Absents",
])

const HARDNESS_MIN = 1
const HARDNESS_MAX = 10

// ─────────────────────────────────────────────────────────────
// VALIDATION FUNCTIONS
// ─────────────────────────────────────────────────────────────

/**
 * Validate hardness: must be a number between 1-10
 * Rejects: undefined, null, NaN, strings, out of range
 */
function validateHardness(value: any): number | null {
  if (value === null || value === undefined || value === "") {
    return null
  }

  const num = Number(value)
  if (isNaN(num) || num < HARDNESS_MIN || num > HARDNESS_MAX) {
    return null
  }

  return num
}

/**
 * Validate acid reaction: must match one of allowed values
 * Normalizes French variations and common input patterns
 */
function validateAcidReaction(value: any): string | null {
  if (value === null || value === undefined || value === "" || value === "-") {
    return null
  }

  const str = String(value).toLowerCase().trim()

  // Match "forte"
  if (str.includes("forte") || str.includes("strong") || str.includes("for")) {
    return "Forte effervescence"
  }

  // Match "faible"
  if (str.includes("faible") || str.includes("weak") || str.includes("fai")) {
    return "Faible effervescence"
  }

  // Match "aucune" or "none"
  if (str.includes("aucune") || str.includes("none") || str.includes("aucun")) {
    return "Aucune réaction"
  }

  // Default to null for unrecognized values
  return null
}

/**
 * Validate texture: must match one of allowed values
 * Normalizes French variations and common input patterns
 */
function validateTexture(value: any): string | null {
  if (value === null || value === undefined || value === "" || value === "-") {
    return null
  }

  const str = String(value).toLowerCase().trim()

  // Match "rugueuse" or "rough"
  if (str.includes("rug") || str.includes("rough") || str.includes("rude")) {
    return "Rugueuse"
  }

  // Match "lisse" or "smooth"
  if (str.includes("liss") || str.includes("smooth") || str.includes("fine")) {
    return "Lisse"
  }

  return null
}

/**
 * Validate fossils: must match one of allowed values
 * Normalizes French variations and boolean conversions
 */
function validateFossils(value: any): string | null {
  if (value === null || value === undefined || value === "" || value === "-") {
    return null
  }

  // Handle boolean input (from rockSample.hasFossils)
  if (typeof value === "boolean") {
    return value ? "Présents" : "Absents"
  }

  const str = String(value).toLowerCase().trim()

  // Match "présent" or "yes" or "true"
  if (
    str.includes("présent") ||
    str.includes("present") ||
    str.includes("yes") ||
    str.includes("oui") ||
    str === "true" ||
    str === "1"
  ) {
    return "Présents"
  }

  // Match "absent" or "no" or "false"
  if (
    str.includes("absent") ||
    str.includes("no") ||
    str.includes("non") ||
    str === "false" ||
    str === "0"
  ) {
    return "Absents"
  }

  return null
}

/**
 * Validate granulometry: any non-empty string
 */
function validateGranulometry(value: any): string | null {
  if (value === null || value === undefined || value === "" || value === "-") {
    return null
  }

  const str = String(value).trim()
  return str.length > 0 ? str : null
}

// ─────────────────────────────────────────────────────────────
// DATA TRANSFORMATION (rockSample → display format)
// ─────────────────────────────────────────────────────────────

interface RockDataTransformed {
  hardness: number | null
  acid: string | null
  texture: string | null
  fossil: string | null
  granulometry: string | null
}

/**
 * Transform rock sample data to validated format
 * Used as the FALLBACK when experiment data is invalid
 */
function transformRockSample(rock: RockSample): RockDataTransformed {
  return {
    hardness: validateHardness(rock.hardness),
    acid: transformAcidReaction(rock.acidReaction),
    texture: transformTexture(rock.texture),
    fossil: validateFossils(rock.hasFossils),
    granulometry: validateGranulometry(rock.grainSize),
  }
}

/**
 * Transform internal acidReaction format (strong/weak/none) to display format
 */
function transformAcidReaction(value: any): string | null {
  if (!value) return null

  const str = String(value).toLowerCase().trim()
  if (str === "strong" || str.includes("forte")) return "Forte effervescence"
  if (str === "weak" || str.includes("faible")) return "Faible effervescence"
  if (str === "none" || str.includes("aucune")) return "Aucune réaction"

  return null
}

/**
 * Transform internal texture format (rough/smooth/crystalline) to display format
 */
function transformTexture(value: any): string | null {
  if (!value) return null

  const str = String(value).toLowerCase().trim()
  if (str === "rough" || str.includes("rug")) return "Rugueuse"
  if (str === "smooth" || str.includes("liss")) return "Lisse"

  return null
}

// ─────────────────────────────────────────────────────────────
// SAFELY FIND / VALIDATE LATEST EXPERIMENT RESULT
// ─────────────────────────────────────────────────────────────

/**
 * Get the latest experiment result object for a rock + type, sorted by timestamp desc.
 */
export function getLatestResult(
  rockId: string,
  experimentType: ExperimentResult["experimentType"],
  experimentResults: ExperimentResult[]
): ExperimentResult | null {
  const sorted = experimentResults
    .filter((r) => r.rockId === rockId && r.experimentType === experimentType)
    .sort((a, b) => (b.timestamp ?? 0) - (a.timestamp ?? 0))

  return sorted[0] ?? null
}

/**
 * Get normalized value from an experiment result (details preferred over free-form result string).
 */
function extractExperimentValue(
  experiment: ExperimentResult,
  fieldType: keyof RockDataTransformed
): any {
  const details = experiment.details || {}
  const rawValue = experiment.result

  switch (fieldType) {
    case "hardness": {
      if (typeof details.hardness !== "undefined" && details.hardness !== null) {
        return details.hardness
      }
      const parsed = Number(String(rawValue).match(/\d+(\.\d+)?/)?.[0])
      return isNaN(parsed) ? null : parsed
    }

    case "acid": {
      const candidate = details.acidReaction ?? details.acid ?? rawValue
      return candidate
    }

    case "texture": {
      const candidate = details.texture ?? rawValue
      return candidate
    }

    case "fossil": {
      if (typeof details.hasFossils === "boolean") {
        return details.hasFossils ? "Présents" : "Absents"
      }
      if (typeof details.fossils !== "undefined") {
        return details.fossils
      }
      return rawValue
    }

    case "granulometry": {
      const candidate = details.grainSize ?? details.granulometry ?? rawValue
      // If raw text contains marker, extract the label
      const m = String(candidate).match(/Taille des grains:\s*(.*)$/i)
      if (m) return m[1].trim()
      return candidate
    }

    default:
      return rawValue
  }
}

/**
 * Return the latest valid value for a rock property, null for invalid results.
 */
export function getLatestValidExperimentData(
  rockId: string,
  fieldType: keyof RockDataTransformed,
  experimentResults: ExperimentResult[]
): any | null {
  const experimentTypeMap: Record<keyof RockDataTransformed, ExperimentResult["experimentType"]> = {
    hardness: "hardness",
    acid: "acid",
    texture: "texture",
    fossil: "fossil",
    granulometry: "granulometry",
  }

  const experimentType = experimentTypeMap[fieldType]
  if (!experimentType) return null

  const latest = getLatestResult(rockId, experimentType, experimentResults)
  if (!latest) return null

  const candidate = extractExperimentValue(latest, fieldType)

  switch (fieldType) {
    case "hardness":
      return validateHardness(candidate)
    case "acid":
      return validateAcidReaction(candidate)
    case "texture":
      return validateTexture(candidate)
    case "fossil":
      return validateFossils(candidate)
    case "granulometry":
      return validateGranulometry(candidate)
    default:
      return null
  }
}

// ─────────────────────────────────────────────────────────────
// PUBLIC EXPORT: Main Safe Data Function
// ─────────────────────────────────────────────────────────────

/**
 * MAIN FUNCTION: Get safe rock data with fallback protection
 * 
 * Algorithm:
 * 1. Find latest valid experiment result for field
 * 2. If valid → USE IT
 * 3. If invalid/null → FALLBACK to rockSample
 * 4. ALWAYS returns valid data (never undefined/null in display)
 * 
 * @param rock - The base rock sample (TRUSTED SOURCE)
 * @param experimentResults - All experiment results from user (UNTRUSTED)
 * @returns Merged, validated data guaranteed to be non-null
 */
export function getSafeRockData(
  rock: RockSample,
  experimentResults: ExperimentResult[]
): RockDataTransformed {
  // Transform rock sample as baseline (ALWAYS valid)
  const rockData = transformRockSample(rock)

  // Try to get valid experiment data for each field
  const hardnessExp = getLatestValidExperimentData(rock.id, "hardness", experimentResults)
  const acidExp = getLatestValidExperimentData(rock.id, "acid", experimentResults)
  const textureExp = getLatestValidExperimentData(rock.id, "texture", experimentResults)
  const fossilExp = getLatestValidExperimentData(rock.id, "fossil", experimentResults)
  const granulometryExp = getLatestValidExperimentData(rock.id, "granulometry", experimentResults)

  // Merge: experiment wins IF valid, else rock data wins
  return {
    hardness: hardnessExp ?? rockData.hardness,
    acid: acidExp ?? rockData.acid,
    texture: textureExp ?? rockData.texture,
    fossil: fossilExp ?? rockData.fossil,
    granulometry: granulometryExp ?? rockData.granulometry,
  }
}

/**
 * Format safe rock data for display
 * Applies Mohs scale label for hardness
 */
export function formatRockDataForDisplay(data: RockDataTransformed): Record<string, string> {
  return {
    hardness: data.hardness !== null ? `${data.hardness} (Mohs)` : "—",
    acid: data.acid ?? "—",
    texture: data.texture ?? "—",
    fossil: data.fossil ?? "—",
    granulometry: data.granulometry ?? "—",
  }
}

/**
 * Get single field value safely
 * Used for efficient single-field lookups
 */
export function getSafeRockFieldValue(
  rock: RockSample,
  field: keyof RockDataTransformed,
  experimentResults: ExperimentResult[]
): any | null {
  const safeData = getSafeRockData(rock, experimentResults)
  return safeData[field] ?? null
}

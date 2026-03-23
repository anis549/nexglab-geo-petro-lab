"use client"

import { useCallback } from "react"
import { useLabStore } from "@/store/useLabStore"
import type { RockSample } from "@/types/rocks"

export function useRockSelection() {
  const { selectedRock, setSelectedRock } = useLabStore()

  const selectRock = useCallback((rock: RockSample) => {
    setSelectedRock(rock)
  }, [setSelectedRock])

  const clearSelection = useCallback(() => {
    setSelectedRock(null)
  }, [setSelectedRock])

  return {
    selectedRock,
    selectRock,
    clearSelection,
  }
}

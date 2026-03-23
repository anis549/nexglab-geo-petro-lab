import { useCallback, useMemo } from "react"
import { useLabStore } from "@/store/lab-store"
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

export function useSearch() {
  const { searchQuery, setSearchQuery } = useLabStore()

  const updateSearch = useCallback((query: string) => {
    setSearchQuery(query)
  }, [setSearchQuery])

  const clearSearch = useCallback(() => {
    setSearchQuery("")
  }, [setSearchQuery])

  return {
    searchQuery,
    updateSearch,
    clearSearch,
  }
}

export function useLabMode() {
  const { labMode, setLabMode } = useLabStore()

  const changeMode = useCallback((mode: import("@/store/labStore").LabMode) => {
    setLabMode(mode)
  }, [setLabMode])

  return {
    labMode,
    changeMode,
  }
}

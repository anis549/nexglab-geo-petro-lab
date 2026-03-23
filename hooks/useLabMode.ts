"use client"

import { useCallback } from "react"
import { useLabStore } from "@/store/useLabStore"
import type { LabMode } from "@/store/useLabStore"

export function useLabMode() {
  const { labMode, setLabMode } = useLabStore()

  const switchMode = useCallback((mode: LabMode) => {
    setLabMode(mode)
  }, [setLabMode])

  return {
    labMode,
    switchMode,
  }
}

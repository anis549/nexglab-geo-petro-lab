"use client"

import { useCallback } from "react"
import { useLabStore } from "@/store/lab-store"
import type { LabMode } from "@/store/lab-store"

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

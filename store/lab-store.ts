"use client"

import { create } from "zustand"
import { devtools } from "zustand/middleware"
import type { RockSample } from "@/types/rocks"

export type LabMode = "observation" | "analysis" | "microscope"

interface LabState {
  // Rock selection
  selectedRock: RockSample | null
  setSelectedRock: (rock: RockSample | null) => void

  // Search
  searchQuery: string
  setSearchQuery: (query: string) => void

  // Lab mode
  labMode: LabMode
  setLabMode: (mode: LabMode) => void

  // UI state
  isViewerLoading: boolean
  setViewerLoading: (loading: boolean) => void

  // Actions
  reset: () => void
}

const initialState = {
  selectedRock: null,
  searchQuery: "",
  labMode: "observation" as LabMode,
  isViewerLoading: false,
}

export const useLabStore = create<LabState>()(
  devtools(
    (set, get) => ({
      ...initialState,

      setSelectedRock: (rock) => set({ selectedRock: rock }),

      setSearchQuery: (query) => set({ searchQuery: query }),

      setLabMode: (mode) => set({ labMode: mode }),

      setViewerLoading: (loading) => set({ isViewerLoading: loading }),

      reset: () => set(initialState),
    }),
    { name: "lab-store" }
  )
)

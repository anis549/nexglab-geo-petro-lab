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

  // Filtered rocks (computed)
  filteredRocks: RockSample[]
  setFilteredRocks: (rocks: RockSample[]) => void
}

export const useLabStore = create<LabState>()(
  devtools(
    (set, get) => ({
      selectedRock: null,
      setSelectedRock: (rock) => set({ selectedRock: rock }),

      searchQuery: "",
      setSearchQuery: (query) => set({ searchQuery: query }),

      labMode: "observation",
      setLabMode: (mode) => set({ labMode: mode }),

      filteredRocks: [],
      setFilteredRocks: (rocks) => set({ filteredRocks: rocks }),
    }),
    { name: "lab-store" }
  )
)

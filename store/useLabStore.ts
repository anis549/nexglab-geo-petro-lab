import { create } from "zustand"
import { devtools } from "zustand/middleware"
import type { RockSample } from "@/types/rocks"

export type LabMode = "observation" | "analysis" | "microscope"

interface LabState {
  selectedRock: RockSample | null
  labMode: LabMode
  setSelectedRock: (rock: RockSample | null) => void
  setLabMode: (mode: LabMode) => void
  reset: () => void
}

const initialState = {
  selectedRock: null,
  labMode: "observation" as LabMode,
}

export const useLabStore = create<LabState>()(
  devtools(
    (set) => ({
      ...initialState,
      setSelectedRock: (rock) => set({ selectedRock: rock }),
      setLabMode: (mode) => set({ labMode: mode }),
      reset: () => set(initialState),
    }),
    { name: "lab-store" }
  )
)
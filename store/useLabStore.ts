import { create } from "zustand"
import type { RockSample } from "@/types/rocks"

interface LabState {
  selectedRock: RockSample | null
  setSelectedRock: (rock: RockSample) => void
}

export const useLabStore = create<LabState>((set) => ({
  selectedRock: null,
  setSelectedRock: (rock) => set({ selectedRock: rock }),
}))
"use client"

import { create } from "zustand"
import { devtools } from "zustand/middleware"

interface SearchState {
  searchQuery: string
  setSearchQuery: (query: string) => void
  clearSearch: () => void
}

const initialState = {
  searchQuery: "",
}

export const useSearchStore = create<SearchState>()(
  devtools(
    (set) => ({
      ...initialState,
      setSearchQuery: (query) => set({ searchQuery: query }),
      clearSearch: () => set({ searchQuery: "" }),
    }),
    { name: "search-store" }
  )
)
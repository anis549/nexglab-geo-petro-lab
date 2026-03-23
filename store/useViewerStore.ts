"use client"

import { create } from "zustand"
import { devtools } from "zustand/middleware"

interface ViewerState {
  isViewerLoading: boolean
  setViewerLoading: (loading: boolean) => void
}

const initialState = {
  isViewerLoading: false,
}

export const useViewerStore = create<ViewerState>()(
  devtools(
    (set) => ({
      ...initialState,
      setViewerLoading: (loading) => set({ isViewerLoading: loading }),
    }),
    { name: "viewer-store" }
  )
)
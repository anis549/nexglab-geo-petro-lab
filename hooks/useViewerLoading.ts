"use client"

import { useCallback } from "react"
import { useLabStore } from "@/store/lab-store"

export function useViewerLoading() {
  const { isViewerLoading, setViewerLoading } = useLabStore()

  const startLoading = useCallback(() => {
    setViewerLoading(true)
  }, [setViewerLoading])

  const stopLoading = useCallback(() => {
    setViewerLoading(false)
  }, [setViewerLoading])

  return {
    isViewerLoading,
    startLoading,
    stopLoading,
  }
}

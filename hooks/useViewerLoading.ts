"use client"

import { useCallback } from "react"
import { useViewerStore } from "@/store/useViewerStore"

export function useViewerLoading() {
  const { isViewerLoading, setViewerLoading } = useViewerStore()

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

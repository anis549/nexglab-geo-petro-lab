"use client"

import { useCallback, useMemo } from "react"
import { useLabStore } from "@/store/lab-store"
import type { RockSample } from "@/types/rocks"

export function useSearch(rockSamples: RockSample[]) {
  const { searchQuery, setSearchQuery } = useLabStore()

  const updateSearch = useCallback((query: string) => {
    setSearchQuery(query)
  }, [setSearchQuery])

  const clearSearch = useCallback(() => {
    setSearchQuery("")
  }, [setSearchQuery])

  const filteredRocks = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    if (!query) return rockSamples

    return rockSamples.filter((rock) =>
      rock.name.toLowerCase().includes(query) ||
      rock.type.toLowerCase().includes(query) ||
      rock.description.toLowerCase().includes(query)
    )
  }, [rockSamples, searchQuery])

  return {
    searchQuery,
    updateSearch,
    clearSearch,
    filteredRocks,
  }
}

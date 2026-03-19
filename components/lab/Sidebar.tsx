import React, { memo, useCallback } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import type { RockSample } from "@/types/rocks"
import { RockCard } from "./rock-card"
import { useSearch, useRockSelection } from "@/hooks/useSearch"
import { useRockSelection as useSelection } from "@/hooks/useRockSelection"

interface SidebarProps {
  rockSamples: RockSample[]
}

export const Sidebar = memo(function Sidebar({ rockSamples }: SidebarProps) {
  const { searchQuery, updateSearch, clearSearch, filteredRocks } = useSearch(rockSamples)
  const { selectedRock, selectRock } = useSelection()

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    updateSearch(e.target.value)
  }, [updateSearch])

  const handleSelectRock = useCallback((rock: RockSample) => {
    selectRock(rock)
    clearSearch()
  }, [selectRock, clearSearch])

  return (
    <div className="flex flex-col h-full space-y-4">
      <div className="relative group">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 group-focus-within:text-teal-500 transition-colors" />
        <Input
          placeholder="Search samples by name or type..."
          className="pl-9 h-11 w-full rounded-xl border-zinc-200 bg-white shadow-sm focus-visible:ring-teal-500 transition-all font-medium"
          value={searchQuery}
          onChange={handleSearch}
          aria-label="Search rock samples"
        />
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar min-h-0 pb-4">
        {filteredRocks.length > 0 ? (
          filteredRocks.map((rock) => (
            <RockCard
              key={rock.id}
              rock={rock}
              isSelected={selectedRock?.id === rock.id}
              onClick={handleSelectRock}
            />
          ))
        ) : (
          <div className="text-center py-10 bg-white/50 rounded-xl border border-dashed border-zinc-200">
            <p className="text-sm font-medium text-zinc-500">No samples found.</p>
            <p className="text-xs text-zinc-400 mt-1">Try a different search term.</p>
          </div>
        )}
      </div>
    </div>
  )
})

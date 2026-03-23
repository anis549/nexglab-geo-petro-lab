"use client"

import React, { memo, useCallback } from "react"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { RockSample } from "@/types/rocks"
import { useSearch } from "@/hooks/useSearch"
import { useRockSelection } from "@/hooks/useRockSelection"

interface SidebarProps {
  rockSamples: RockSample[]
  onCloseMobile?: () => void
}

export const Sidebar = memo(function Sidebar({ rockSamples, onCloseMobile }: SidebarProps) {
  const { searchQuery, updateSearch, clearSearch, filteredRocks } = useSearch(rockSamples)
  const { selectedRock, selectRock } = useRockSelection()

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    updateSearch(e.target.value)
  }, [updateSearch])

  const handleSelectRock = useCallback((rock: RockSample) => {
    selectRock(rock)
    clearSearch()
    onCloseMobile?.()
  }, [selectRock, clearSearch, onCloseMobile])

  const handleClearSearch = useCallback(() => {
    clearSearch()
  }, [clearSearch])

  return (
    <aside className="w-full lg:w-[280px] h-full p-6 bg-card/80 backdrop-blur-xl rounded-2xl border border-border shadow-xl flex flex-col gap-6 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-border/50">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            Vault Rocheux
          </h1>
          <p className="text-sm text-muted-foreground">Échantillons Premium</p>
        </div>
        {onCloseMobile && (
          <Button variant="ghost" size="sm" onClick={onCloseMobile} className="lg:hidden -ml-2 p-2 h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Rechercher une roche..."
          className="h-12 pl-10 pr-10 w-full rounded-xl bg-card border-border/50 shadow-sm focus-visible:ring-2 focus-visible:ring-primary/50"
          value={searchQuery}
          onChange={handleSearch}
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
            onClick={handleClearSearch}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Rocks List */}
      <div className="flex-1 overflow-y-auto space-y-2 pb-4">
        {filteredRocks.length ? (
          filteredRocks.map((rock) => (
            <Button
              key={rock.id}
              variant="ghost"
              className={cn(
                "justify-start h-auto p-3 rounded-xl w-full transition-all duration-200 hover:bg-muted hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring",
                selectedRock?.id === rock.id && "bg-primary/10 border-primary/30 ring-1 ring-primary/20 shadow-md"
              )}
              onClick={() => handleSelectRock(rock)}
            >
              <img
                src={rock.image}
                alt={rock.name}
                className="w-10 h-10 flex-shrink-0 object-cover rounded-md border border-border/30 shadow-sm ring-1 ring-background/50"
              />
              <div className="ml-3 flex flex-col items-start flex-1 min-w-0">
                <span className="font-semibold text-foreground text-sm truncate">{rock.name}</span>
                <span className="text-muted-foreground text-xs capitalize">{rock.type}</span>
              </div>
            </Button>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
            <Search className="h-12 w-12 mb-4 opacity-50" />
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-foreground">Aucune roche trouvée</h3>
              <p className="text-sm">Essayez d'ajuster votre recherche</p>
            </div>
          </div>
        )}
      </div>
    </aside>
  )
})

Sidebar.displayName = 'Sidebar'


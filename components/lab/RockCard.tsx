"use client"

import Image from "next/image"
import { memo, useCallback } from "react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { RockSample } from "@/types/rocks"

interface RockCardProps {
  rock: RockSample
  selected?: boolean
  onSelect: (rock: RockSample) => void
}

function RockCardInner({ rock, selected, onSelect }: RockCardProps) {
  const handleClick = useCallback(() => onSelect(rock), [onSelect, rock])

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "group flex w-full items-center gap-3 rounded-2xl border px-3 py-3 text-left transition-transform duration-150",
        selected
          ? "border-primary bg-primary/10 shadow-sm"
          : "border-border bg-card hover:border-secondary hover:bg-secondary/40 focus-visible:border-primary focus-visible:ring-ring/50 focus-visible:ring-[3px] active:scale-[0.98]",
      )}
      aria-pressed={selected}
      aria-label={`Sélectionner ${rock.name}`}
    >
      <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
        <Image
          src={rock.thumbnailPath || "/placeholder.svg?height=200&width=200"}
          alt={`Miniature de ${rock.name}`}
          fill
          className="object-cover"
        />
      </div>

      <div className="min-w-0">
        <h3 className="truncate text-sm font-semibold text-foreground">{rock.name}</h3>
        <p className="mt-1 text-xs text-muted-foreground line-clamp-1">{rock.description}</p>
        <div className="mt-2 flex items-center gap-2">
          <Badge variant="secondary" className="capitalize">
            {rock.type.replace(/([a-z])([A-Z])/g, "$1 $2")}
          </Badge>
          <Badge variant="outline" className="capitalize">
            {rock.grainSize}
          </Badge>
        </div>
      </div>
    </button>
  )
}

export const RockCard = memo(RockCardInner)

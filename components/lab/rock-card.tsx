import React, { memo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { RockSample } from "@/types/rocks"
import Image from "next/image"

interface RockCardProps {
  rock: RockSample
  isSelected: boolean
  onClick: (rock: RockSample) => void
}

export const RockCard = memo(function RockCard({ rock, isSelected, onClick }: RockCardProps) {
  return (
    <button
      type="button"
      onClick={() => onClick(rock)}
      aria-pressed={isSelected}
      aria-label={`Sélectionner ${rock.name}`}
      className={`group w-full text-left rounded-xl border p-3 bg-card shadow-sm transition-all duration-300 transform ${
        isSelected
          ? "border-primary/30 bg-primary/10 shadow-lg scale-[1.01]"
          : "border-border/70 hover:border-primary/40 hover:shadow-xl hover:-translate-y-0.5"
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className="flex-shrink-0 h-14 w-14 rounded-full overflow-hidden border border-border/50 shadow-inner bg-gradient-to-br from-muted/60 to-muted/90 flex items-center justify-center text-2xl"
          style={{ backgroundColor: rock.color || "#e5e7eb" }}
        >
          {rock.thumbnailPath ? (
            <Image
              src={rock.thumbnailPath}
              alt={`Miniature de ${rock.name}`}
              width={56}
              height={56}
              className="h-full w-full object-cover"
            />
          ) : (
            <span aria-hidden="true">{rock.icon}</span>
          )}
        </div>

        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div>
            <p className={`text-sm font-semibold leading-tight truncate ${isSelected ? "text-primary" : "text-foreground"}`}>
              {rock.name}
            </p>
            <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{rock.description}</p>
          </div>

          <div className="mt-3 flex flex-wrap gap-1">
            <Badge variant={isSelected ? "secondary" : "outline"} className="text-xs uppercase">
              {rock.type}
            </Badge>
            <Badge variant="outline" className="text-xs capitalize">
              {rock.grainSize}
            </Badge>
            <Badge variant="outline" className="text-xs capitalize">
              {rock.texture}
            </Badge>
          </div>
        </div>
      </div>
    </button>
  )
})

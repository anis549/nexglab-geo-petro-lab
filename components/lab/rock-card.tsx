import React, { memo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import type { RockSample } from "@/types/rocks"
import Image from "next/image"

interface RockCardProps {
  rock: RockSample
  isSelected: boolean
  onClick: (rock: RockSample) => void
}

export const RockCard = memo(function RockCard({ rock, isSelected, onClick }: RockCardProps) {
  return (
    <Card
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      aria-label={`Select ${rock.name}`}
      className={`relative cursor-pointer overflow-hidden transition-all duration-300 group ${
        isSelected
          ? "border-teal-500 bg-teal-50/50 shadow-md ring-1 ring-teal-500"
          : "bg-white hover:border-zinc-300 hover:shadow-md hover:bg-zinc-50"
      }`}
      onClick={() => onClick(rock)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          onClick(rock)
        }
      }}
    >
      {/* Active state indicator line */}
      {isSelected && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-teal-500 rounded-l-xl" />
      )}

      <CardContent className="p-3 pl-4 flex items-center space-x-4">
        <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-zinc-100 shadow-sm border border-zinc-200 group-hover:shadow transition-shadow">
          {rock.thumbnailPath ? (
            <img
              src={rock.thumbnailPath}
              alt={`${rock.name} thumbnail`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-zinc-400 bg-zinc-100">
              <span className="text-[10px] font-medium uppercase">{rock.type.substring(0, 3)}</span>
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className={`font-semibold truncate transition-colors ${isSelected ? "text-teal-900" : "text-zinc-900 group-hover:text-teal-700"}`}>
            {rock.name}
          </h3>
          <div className="flex items-center space-x-2 mt-1">
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-zinc-100 text-zinc-600 border border-zinc-200">
              {rock.type}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
})

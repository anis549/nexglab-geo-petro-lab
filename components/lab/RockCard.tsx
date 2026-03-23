"use client"

import Image from "next/image"
import { memo, useCallback, useState } from "react"
import { cn } from "@/lib/utils"
import type { RockSample } from "@/types/rocks"

interface RockCardProps {
  rock: RockSample
  isSelected?: boolean
  onClick: (rock: RockSample) => void
}

function RockCardInner({ rock, isSelected, onClick }: RockCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const handleClick = useCallback(() => onClick(rock), [onClick, rock])

  return (
    <button
      type="button"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative flex flex-col overflow-hidden rounded-3xl transition-all duration-500 perspective-[1000px]",
        "glass shadow-glow-primary",
        "focus-visible:shadow-glow-xl focus-visible:ring-4 ring-[#2fa4ff]/30 outline-none",
        isSelected
          ? "border-primary bg-primary/10 ring-2 ring-primary/50 shadow-glow-xl"
          : "hover:shadow-glow-xl hover:border-[#2fa4ff]/60 hover:shadow-[#2fa4ff]/30",
        "hover:scale-110 hover:rotate-1 hover:[transform-style:preserve-3d] active:scale-[0.97]"
      )}
      aria-pressed={isSelected}
      aria-label={`Sélectionner ${rock.name}`}
    >
      {/* Image Container - aspect-square */}
      <div className="relative w-full aspect-square overflow-hidden bg-gradient-to-br from-[#f6f8fb] to-gray-100">
        <Image
          src={rock.image || "/placeholder.svg?height=200&width=200"}
          alt={rock.name}
          fill
          className="object-cover transition-transform duration-300 rounded-lg"
        style={{
          transform: isHovered ? "scale(1.12) translateZ(10px)" : "scale(1)"
        }}
        />
        
        {/* Overlay on hover */}
        {isHovered && (
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b3d91]/80 via-[#0b3d91]/40 to-transparent flex items-end justify-start p-3 animate-in fade-in duration-200">
            <div className="text-white">
              <h3 className="text-sm font-bold truncate">{rock.name}</h3>
            </div>
          </div>
        )}

        {/* Icon Badge - Top Corner */}
        <div className={cn(
          "absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center",
          "bg-white/90 backdrop-blur-sm border border-white/50 shadow-md",
          "text-lg transition-all duration-300",
          isHovered && "scale-110 shadow-lg"
        )}>
          {rock.icon}
        </div>

        {/* Selection indicator */}
        {isSelected && (
          <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-[#2fa4ff] border-2 border-white shadow-md flex items-center justify-center animate-in fade-in duration-200">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>

      {/* Content - Below image */}
      <div className="flex-1 flex flex-col p-3 bg-white/80 gap-2">
        <div className="space-y-0.5">
          <h3 className="text-xs font-bold text-[#0b3d91] truncate leading-tight">
            {rock.name}
          </h3>
          <p className="text-xs text-gray-600 line-clamp-2 leading-tight">
            {rock.description}
          </p>
        </div>
        
        {/* Type & Grain Size Badges */}
        <div className="flex flex-wrap gap-1 text-xs">
          <span className="inline-flex items-center bg-[#0b3d91]/10 text-[#0b3d91] px-2 py-0.5 rounded-md font-medium capitalize">
            {rock.type.replace(/([a-z])([A-Z])/g, "$1 $2").slice(0, 12)}
          </span>
        </div>
      </div>

      {/* Gradient border glow on hover */}
      {isHovered && (
        <div className="absolute inset-0 rounded-xl pointer-events-none"
          style={{
            background: "linear-gradient(135deg, #2fa4ff, #0b3d91)",
            opacity: 0.15,
            WebkitMaskImage: "linear-gradient(transparent, transparent, black, black)",
            maskImage: "linear-gradient(transparent, transparent, black, black)"
          }}
        />
      )}
    </button>
  )
}

export const RockCard = memo(RockCardInner)

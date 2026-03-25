"use client"

import React from "react"
import { cn } from "@/lib/utils"
import type { RockSample } from "@/types/rocks"
import { useLabStore } from "@/store/useLabStore"

interface SidebarProps {
  rockSamples: RockSample[]
  onCloseMobile?: () => void
}

export function Sidebar({ rockSamples, onCloseMobile }: SidebarProps) {
  const { selectedRock, setSelectedRock } = useLabStore()

  return (
    <div className="flex flex-col h-full">

      {/* ── Header ── */}
      <div
        className="px-5 py-5 flex-shrink-0"
        style={{ borderBottom: "1px solid rgba(0,180,255,0.08)" }}
      >
        <div className="flex items-center gap-2 mb-1">
          <div
            className="w-1.5 h-4 rounded-full"
            style={{ background: "linear-gradient(180deg, rgba(0,200,255,1), rgba(0,100,200,0.6))" }}
          />
          <h2
            className="text-xs font-bold tracking-[0.2em] uppercase"
            style={{
              color: "rgba(120,190,255,0.7)",
              fontFamily: "'DM Mono', monospace",
            }}
          >
            Rock Samples
          </h2>
        </div>
        <p
          className="text-xs ml-3.5 pl-0.5"
          style={{ color: "rgba(100,150,200,0.45)", fontFamily: "'Sora', sans-serif" }}
        >
          {rockSamples.length} specimens
        </p>
      </div>

      {/* ── List ── */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1.5 scrollbar-thin"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(0,150,255,0.2) transparent",
        }}
      >
        {rockSamples.map((rock, index) => {
          const isActive = selectedRock?.id === rock.id

          return (
            <button
              key={rock.id}
              onClick={() => {
                setSelectedRock(rock)
                onCloseMobile?.()
              }}
              className="group relative flex items-center gap-3 w-full text-left rounded-xl transition-all duration-200 overflow-hidden"
              style={{
                padding: "10px 12px",
                background: isActive
                  ? "linear-gradient(135deg, rgba(0,80,200,0.35) 0%, rgba(0,160,255,0.2) 100%)"
                  : "transparent",
                border: isActive
                  ? "1px solid rgba(0,200,255,0.25)"
                  : "1px solid transparent",
                boxShadow: isActive
                  ? "0 0 16px rgba(0,140,255,0.15), inset 0 1px 0 rgba(255,255,255,0.08)"
                  : "none",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "rgba(255,255,255,0.04)"
                  e.currentTarget.style.border = "1px solid rgba(255,255,255,0.06)"
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "transparent"
                  e.currentTarget.style.border = "1px solid transparent"
                }
              }}
            >
              {/* Active left accent bar */}
              {isActive && (
                <div
                  className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full"
                  style={{ background: "linear-gradient(180deg, rgba(0,220,255,0.9), rgba(0,120,255,0.5))" }}
                />
              )}

              {/* Thumbnail */}
              <div
                className="flex-shrink-0 w-10 h-10 rounded-lg overflow-hidden relative"
                style={{
                  border: isActive
                    ? "1px solid rgba(0,200,255,0.3)"
                    : "1px solid rgba(255,255,255,0.07)",
                  boxShadow: isActive ? "0 0 10px rgba(0,180,255,0.2)" : "none",
                }}
              >
                <img
                  src={rock.image}
                  className="w-full h-full object-cover"
                  alt={rock.name}
                />
                {/* Overlay sheen on active */}
                {isActive && (
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(135deg, rgba(0,180,255,0.15), transparent)" }}
                  />
                )}
              </div>

              {/* Label */}
              <div className="flex-1 min-w-0">
                <p
                  className="text-sm font-semibold truncate transition-colors duration-200"
                  style={{
                    color: isActive ? "rgba(220,240,255,0.95)" : "rgba(180,210,240,0.6)",
                    fontFamily: "'Sora', sans-serif",
                  }}
                >
                  {rock.name}
                </p>
                <p
                  className="text-xs mt-0.5"
                  style={{
                    color: isActive ? "rgba(0,200,255,0.6)" : "rgba(100,140,180,0.4)",
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "10px",
                  }}
                >
                  #{String(index + 1).padStart(2, "0")}
                </p>
              </div>

              {/* Active indicator dot */}
              {isActive && (
                <div
                  className="flex-shrink-0 w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ background: "rgba(0,220,255,0.8)" }}
                />
              )}
            </button>
          )
        })}
      </div>

      {/* ── Footer ── */}
      <div
        className="px-5 py-4 flex-shrink-0"
        style={{ borderTop: "1px solid rgba(0,180,255,0.06)" }}
      >
        <div className="flex items-center justify-between">
          <span
            className="text-[10px] tracking-widest uppercase"
            style={{ color: "rgba(80,120,170,0.4)", fontFamily: "'DM Mono', monospace" }}
          >
            NexGlab · TP3
          </span>
          <div
            className="w-2 h-2 rounded-full"
            style={{ background: "rgba(0,200,255,0.3)" }}
          />
        </div>
      </div>
    </div>
  )
}

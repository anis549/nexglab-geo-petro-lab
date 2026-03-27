"use client"

import React, { memo } from "react"
import { Viewer } from "./Viewer"
import type { RockSample } from "@/types/rocks"

interface WorkspaceProps {
  selectedRock: RockSample | null
}

export const Workspace = memo(function Workspace({ selectedRock }: WorkspaceProps) {
  if (!selectedRock) {
    return (
      <div className="h-full flex flex-col items-center justify-center gap-4">
        {/* Empty state icon */}
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center"
          style={{
            background: "rgba(0,80,200,0.1)",
            border: "1px solid rgba(0,180,255,0.12)",
          }}
        >
          <span className="text-2xl opacity-50">🪨</span>
        </div>
        <p
          className="text-sm"
          style={{
            color: "rgba(120,170,220,0.45)",
            fontFamily: "'Sora', sans-serif",
          }}
        >
          Sélectionnez une roche
        </p>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col lg:grid lg:grid-cols-2 gap-0 overflow-auto">

      {/* ── 3D Viewer panel ── */}
      <div
        className="relative flex-shrink-0 lg:flex-shrink"
        style={{ minHeight: "420px" }}
      >
        {/* Background glow for the viewer */}
        <div
          className="absolute inset-4 rounded-2xl pointer-events-none z-0"
          style={{
            background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,100,220,0.12) 0%, transparent 70%)",
            filter: "blur(20px)",
          }}
        />

        <div
          className="absolute inset-4 rounded-2xl overflow-hidden z-10"
          style={{
            background: "linear-gradient(145deg, rgba(4,12,30,0.8) 0%, rgba(3,10,24,0.9) 100%)",
            border: "1px solid rgba(0,180,255,0.1)",
            boxShadow: "0 0 0 1px rgba(0,150,255,0.05) inset, 0 4px 30px rgba(0,40,120,0.3)",
          }}
        >
          {/* Top viewer label */}
          <div
            className="absolute top-3 left-3 z-20 flex items-center gap-2 px-3 py-1.5 rounded-lg"
            style={{
              background: "rgba(0,0,0,0.4)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: "rgba(0,220,255,0.8)" }}
            />
            <span
              className="text-[10px] font-semibold tracking-widest uppercase"
              style={{ color: "rgba(0,200,255,0.7)", fontFamily: "'DM Mono', monospace" }}
            >
              3D Viewer
            </span>
          </div>

          {/* Corner decorators */}
          {[
            { top: 8, left: 8, borderTop: "1px solid", borderLeft: "1px solid" },
            { top: 8, right: 8, borderTop: "1px solid", borderRight: "1px solid" },
            { bottom: 8, left: 8, borderBottom: "1px solid", borderLeft: "1px solid" },
            { bottom: 8, right: 8, borderBottom: "1px solid", borderRight: "1px solid" },
          ].map((style, i) => (
            <div
              key={i}
              className="absolute w-4 h-4 pointer-events-none z-20"
              style={{ ...style, borderColor: "rgba(0,200,255,0.3)" }}
            />
          ))}

        <Viewer modelPath={selectedRock.model3D} className="w-full h-full" />
        </div>
      </div>

      {/* ── Info panel ── */}
      <div className="flex flex-col p-6 gap-5 overflow-y-auto">

        {/* Rock name header */}
        <div
          className="p-5 rounded-xl"
          style={{
            background: "linear-gradient(145deg, rgba(0,60,160,0.2) 0%, rgba(0,100,200,0.1) 100%)",
            border: "1px solid rgba(0,180,255,0.12)",
            boxShadow: "0 0 20px rgba(0,100,200,0.08) inset",
          }}
        >
          <div className="flex items-start gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{
                background: "rgba(0,160,255,0.15)",
                border: "1px solid rgba(0,200,255,0.2)",
              }}
            >
              <span className="text-base">🪨</span>
            </div>
            <div>
              <p
                className="text-[10px] font-semibold tracking-[0.2em] uppercase mb-1"
                style={{ color: "rgba(0,200,255,0.55)", fontFamily: "'DM Mono', monospace" }}
              >
                Specimen
              </p>
              <h2
                className="text-xl font-black leading-tight"
                style={{
                  background: "linear-gradient(135deg, #ffffff 0%, rgba(180,225,255,0.9) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  fontFamily: "'Sora', sans-serif",
                }}
              >
                {selectedRock.name}
              </h2>
            </div>
          </div>
        </div>

        {/* Description */}
        <div
          className="p-5 rounded-xl flex-1"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <p
            className="text-xs font-semibold tracking-[0.15em] uppercase mb-3"
            style={{ color: "rgba(100,160,210,0.5)", fontFamily: "'DM Mono', monospace" }}
          >
            Description
          </p>
          <p
            className="text-sm leading-relaxed"
            style={{
              color: "rgba(160,200,240,0.65)",
              fontFamily: "'Sora', sans-serif",
            }}
          >
            {selectedRock.description}
          </p>
        </div>

        {/* Viewer hint */}
        <div
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl"
          style={{
            background: "rgba(0,150,255,0.05)",
            border: "1px solid rgba(0,180,255,0.08)",
          }}
        >
          <span className="text-xs" style={{ color: "rgba(0,180,255,0.4)" }}>↻</span>
          <p
            className="text-[10px] tracking-wide"
            style={{ color: "rgba(100,160,210,0.4)", fontFamily: "'DM Mono', monospace" }}
          >
            Faites glisser pour faire pivoter · Scroll pour zoomer
          </p>
        </div>
      </div>
    </div>
  )
})

"use client"

import { useCallback, useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import LabWorkspace from "./LabWorkspace"
import ExperimentStation from "@/components/experiment-station"
import LabNotebook from "@/components/lab-notebook"
import ClassificationTable from "@/components/classification-table"
import type { ExperimentResult, RockSample } from "@/types/rocks"
import { ROCK_SAMPLES } from "@/data/rocks"
import { useLabStore } from "@/store/useLabStore"

export default function Laboratory() {
  const [experimentResults, setExperimentResults] = useState<ExperimentResult[]>([])
  const [rockSamples] = useState<RockSample[]>(ROCK_SAMPLES)

  const { selectedRock, setSelectedRock } = useLabStore()

  useEffect(() => {
    if (!selectedRock && rockSamples.length > 0) {
      setSelectedRock(rockSamples[0])
    }
  }, [selectedRock, rockSamples, setSelectedRock])

  const addExperimentResult = useCallback((result: ExperimentResult) => {
    setExperimentResults((prev) => [...prev, result])
  }, [])

  return (
    <section
      className="flex flex-col min-h-screen overflow-hidden relative"
      style={{
        background: "linear-gradient(135deg, #020814 0%, #040d1a 35%, #030b18 65%, #020a12 100%)",
      }}
    >
      {/* ── Ambient background layers ── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Primary radial lights */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 70% 50% at 15% 85%, rgba(0,80,200,0.2) 0%, transparent 65%),
              radial-gradient(ellipse 55% 45% at 85% 15%, rgba(0,180,255,0.14) 0%, transparent 60%),
              radial-gradient(ellipse 45% 35% at 50% 50%, rgba(0,60,160,0.1) 0%, transparent 70%)
            `,
          }}
        />
        {/* Floating orbs */}
        <div
          className="absolute w-[600px] h-[600px] rounded-full -top-32 -left-40 animate-pulse"
          style={{
            background: "radial-gradient(circle, rgba(0,90,220,0.18) 0%, transparent 70%)",
            filter: "blur(60px)",
            animationDuration: "8s",
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full bottom-0 right-0 animate-pulse"
          style={{
            background: "radial-gradient(circle, rgba(0,200,255,0.12) 0%, transparent 70%)",
            filter: "blur(50px)",
            animationDuration: "12s",
            animationDelay: "4s",
          }}
        />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,200,255,1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,200,255,1) 1px, transparent 1px)
            `,
            backgroundSize: "64px 64px",
          }}
        />
        {/* Vignette */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 110% 110% at 50% 50%, transparent 45%, rgba(2,8,20,0.7) 100%)",
          }}
        />
      </div>

      <div className="flex flex-col gap-6 px-4 py-6 md:px-6 lg:px-8 flex-1 relative z-10">

        {/* ── Header ── */}
        <header
          className="rounded-2xl p-6"
          style={{
            background: "linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 0 0 1px rgba(0,180,255,0.06) inset, 0 4px 40px rgba(0,60,180,0.15)",
          }}
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              {/* Icon badge */}
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: "linear-gradient(135deg, rgb(172, 229, 255) 0%, rgba(36, 187, 207, 0.97) 100%)",
                  border: "1px solid rgba(0,200,255,0.25)",
                  boxShadow: "0 0 20px rgba(0,150,255,0.25), inset 0 1px 0 rgba(255,255,255,0.15)",
                }}
              >
                <span className="text-2xl"><img src="/lab.png" width={100} height={100} /></span>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1
                    className="font-black text-2xl tracking-tight"
                    style={{
                      background: "linear-gradient(90deg, #ffffff 0%, rgba(180,225,255,0.95) 50%, rgba(0,200,255,0.9) 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      fontFamily: "'Sora', 'Outfit', sans-serif",
                    }}
                  >
                    NEXGLAB
                  </h1>
                  {/* Status pip */}
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                    style={{
                      background: "rgba(0,220,120,0.1)",
                      border: "1px solid rgba(0,220,120,0.2)",
                    }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-semibold tracking-widest text-emerald-400 uppercase">Live</span>
                  </div>
                </div>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "rgba(160,200,240,0.6)", fontFamily: "'Sora', sans-serif" }}
                >
                  Professional Petrography Laboratory
                </p>
              </div>
            </div>

            {/* Top-right decorative accent */}
            <div className="hidden sm:flex items-center gap-2">
              {["TP-03", "GÉO-S5", "2025"].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wider"
                  style={{
                    background: "rgba(0,150,255,0.08)",
                    border: "1px solid rgba(0,180,255,0.15)",
                    color: "rgba(120,190,255,0.7)",
                    fontFamily: "'DM Mono', monospace",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom glint line */}
          <div
            className="absolute bottom-0 left-8 right-8 h-px rounded-full"
            style={{ background: "linear-gradient(90deg, transparent, rgba(0,180,255,0.2), transparent)" }}
          />
        </header>

        {/* ── Tabs ── */}
        <Tabs defaultValue="samples" className="flex-1 flex flex-col min-h-0">

          <TabsList
            className="grid w-full grid-cols-2 sm:grid-cols-4 gap-2 p-2 rounded-2xl border-0"
            style={{
              background: "linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.015) 100%)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.07)",
              boxShadow: "0 4px 24px rgba(0,40,120,0.2)",
            }}
          >
            {[
              { value: "samples",        icon: "🪨", label: "Samples" },
              { value: "experiments",    icon: "🔬", label: "Experiments" },
              { value: "notebook",       icon: "📓", label: "Notebook" },
              { value: "classification", icon: "📊", label: "Classification" },
            ].map(({ value, icon, label }) => (
              <TabsTrigger
                key={value}
                value={value}
                className="rounded-xl text-sm font-semibold transition-all duration-300 data-[state=active]:text-white data-[state=inactive]:text-white/40 data-[state=inactive]:hover:text-white/70"
                style={{
                  fontFamily: "'Sora', sans-serif",
                  // Active state is handled via Tailwind data- variants above;
                  // box-shadow/background via inline for active we do via a wrapper trick:
                }}
                // We inject active styles through a global CSS-compatible approach
                // by wrapping in a span — active bg is applied via Tailwind data-state
              >
                <span
                  className="flex items-center gap-2 w-full justify-center px-1 py-0.5 rounded-lg transition-all duration-300
                    data-[state=active]:bg-gradient-to-r"
                >
                  <span>{icon}</span>
                  <span className="hidden sm:inline">{label}</span>
                </span>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Active tab indicator via a styled override — applied through the component's data-state */}
          <style>{`
            [data-radix-collection-item][data-state="active"] {
              background: linear-gradient(135deg, rgba(0,80,200,0.5) 0%, rgba(0,180,255,0.3) 100%) !important;
              border: 1px solid rgba(0,200,255,0.3) !important;
              box-shadow: 0 0 16px rgba(0,150,255,0.2), inset 0 1px 0 rgba(255,255,255,0.12) !important;
              color: white !important;
            }
            [data-radix-collection-item][data-state="inactive"]:hover {
              background: rgba(255,255,255,0.04) !important;
            }
          `}</style>

          <TabsContent value="samples" className="flex-1 min-h-0 mt-4">
            <LabWorkspace rockSamples={rockSamples} />
          </TabsContent>

          <TabsContent value="experiments" className="mt-4 flex-1 min-h-0">
            <ExperimentStation
              selectedRock={selectedRock}
              onExperimentComplete={addExperimentResult}
              rockSamples={rockSamples}
              onSelectRock={setSelectedRock}
            />
          </TabsContent>

          <TabsContent value="notebook" className="mt-4 flex-1 min-h-0">
            <LabNotebook experimentResults={experimentResults} selectedRock={selectedRock} />
          </TabsContent>

          <TabsContent value="classification" className="mt-4 flex-1 min-h-0">
            <ClassificationTable rockSamples={rockSamples} experimentResults={experimentResults} />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

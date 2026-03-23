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
    <section className="flex flex-col min-h-screen bg-gradient-to-br from-slate-900 via-blue-950/30 to-slate-900/90 overflow-hidden relative">
      {/* Subtle cosmic particles layer */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.3),transparent),radial-gradient(circle_at_80%_20%,rgba(120,119,198,0.2),transparent),radial-gradient(circle_at_40%_40%,rgba(47,164,255,0.1),transparent)] animate-pulse-glow" />
      </div>
      
      <div className="flex flex-col gap-8 px-4 py-8 md:px-6 lg:px-8 flex-1 relative z-10">
        {/* Blackbox Premium Header */}
        <header className="glass rounded-3xl p-8 float-in animate-float-in">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-2xl glass glow-hover bg-gradient-to-br from-[#0b3d91]/80 to-[#2fa4ff]/80 flex items-center justify-center shadow-glow-xl">
                  <span className="text-2xl drop-shadow-md">🧪</span>
                </div>
                  <h1 className="font-bold text-2xl bg-gradient-to-r from-blue-400 via-blue-300 to-cyan-400 bg-clip-text text-transparent drop-shadow-md">
                  NEXGLAB
                </h1>
              </div>
              <p className="text-lg leading-relaxed text-white/80 drop-shadow-sm max-w-xl">
                Professional Petrography Laboratory
              </p>
            </div>
          </div>
        </header>

        {/* Premium Tabs */}
        <Tabs defaultValue="samples" className="flex-1 flex flex-col min-h-0">
        <TabsList className="glass rounded-3xl p-2 shadow-glow-xl backdrop-blur-xl grid w-full grid-cols-2 sm:grid-cols-4 gap-2 border-0">
          <TabsTrigger 
            value="samples" 
            className="glass rounded-2xl text-lg font-bold data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#0b3d91]/90 data-[state=active]:to-[#2fa4ff]/90 data-[state=active]:text-white data-[state=active]:shadow-glow-xl data-[state=active]:ring-2 data-[state=active]:ring-[#2fa4ff]/50 transition-all duration-500 hover:glow-hover hover:scale-[1.05] group"
          >
            <span className="flex items-center gap-2">
              🪨 Samples
            </span>
          </TabsTrigger>
            <TabsTrigger 
              value="experiments" 
              className="glass rounded-2xl text-lg font-bold data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#0b3d91]/90 data-[state=active]:to-[#2fa4ff]/90 data-[state=active]:text-white data-[state=active]:shadow-glow-xl data-[state=active]:ring-2 data-[state=active]:ring-[#2fa4ff]/50 transition-all duration-500 hover:glow-hover hover:scale-[1.05] group"
            >
              <span className="flex items-center gap-2">
                🔬 Experiments
              </span>
            </TabsTrigger>
            <TabsTrigger 
              value="notebook" 
              className="glass rounded-2xl text-lg font-bold data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#0b3d91]/90 data-[state=active]:to-[#2fa4ff]/90 data-[state=active]:text-white data-[state=active]:shadow-glow-xl data-[state=active]:ring-2 data-[state=active]:ring-[#2fa4ff]/50 transition-all duration-500 hover:glow-hover hover:scale-[1.05] group"
            >
              <span className="flex items-center gap-2">
                📓 Notebook
              </span>
            </TabsTrigger>
            <TabsTrigger 
              value="classification" 
              className="glass rounded-2xl text-lg font-bold data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#0b3d91]/90 data-[state=active]:to-[#2fa4ff]/90 data-[state=active]:text-white data-[state=active]:shadow-glow-xl data-[state=active]:ring-2 data-[state=active]:ring-[#2fa4ff]/50 transition-all duration-500 hover:glow-hover hover:scale-[1.05] group"
            >
              <span className="flex items-center gap-2">
                📊 Classification
              </span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="samples" className="flex-1 min-h-0 mt-6">
            <LabWorkspace rockSamples={rockSamples} />
          </TabsContent>

          <TabsContent value="experiments" className="mt-6 flex-1 min-h-0">
            <ExperimentStation
              selectedRock={selectedRock}
              onExperimentComplete={addExperimentResult}
              rockSamples={rockSamples}
              onSelectRock={setSelectedRock}
            />
          </TabsContent>

          <TabsContent value="notebook" className="mt-6 flex-1 min-h-0">
            <LabNotebook experimentResults={experimentResults} selectedRock={selectedRock} />
          </TabsContent>

          <TabsContent value="classification" className="mt-6 flex-1 min-h-0">
            <ClassificationTable rockSamples={rockSamples} experimentResults={experimentResults} />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

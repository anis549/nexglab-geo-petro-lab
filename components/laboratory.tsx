"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import RockViewer from "./rock-viewer"
import ExperimentStation from "./experiment-station"
import LabNotebook from "./lab-notebook"
import ClassificationTable from "./classification-table"
import type { RockSample, ExperimentResult } from "@/types/rocks"
import { initialRocks } from "@/data/rock-samples"

export default function Laboratory() {
  const [selectedRock, setSelectedRock] = useState<RockSample | null>(null)
  const [experimentResults, setExperimentResults] = useState<ExperimentResult[]>([])
  const [rockSamples] = useState<RockSample[]>(initialRocks)

  const addExperimentResult = (result: ExperimentResult) => {
    setExperimentResults((prev) => [...prev, result])
  }

  return (
    <div className="container mx-auto p-2 sm:p-4 bg-background">
      <h1 className="text-2xl sm:text-3xl text-center mb-4 sm:mb-6 px-2 font-black text-orange-400">
        Laboratoire Virtuel de Pétrographie
      </h1>

      <Tabs defaultValue="samples" className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 bg-secondary mb-4">
          <TabsTrigger value="samples" className="text-xs sm:text-sm border-black border-4 bg-zinc-300 font-extrabold rounded-4xl">
            Échantillons
          </TabsTrigger>
          <TabsTrigger value="experiments" className="text-xs sm:text-sm border-black border-4 bg-zinc-300 font-extrabold rounded-4xl">
            Expériences
          </TabsTrigger>
          <TabsTrigger value="notebook" className="text-xs sm:text-sm border-4 border-black bg-zinc-300 font-extrabold rounded-4xl">
            Carnet
          </TabsTrigger>
          <TabsTrigger value="classification" className="text-xs sm:text-sm border-4 border-black bg-zinc-300 font-extrabold rounded-4xl">
            Classification
          </TabsTrigger>
        </TabsList>

        <TabsContent value="samples" className="min-h-[400px] sm:min-h-[600px]">
          <RockViewer rockSamples={rockSamples} onSelectRock={setSelectedRock} selectedRock={selectedRock} />
        </TabsContent>

        <TabsContent value="experiments" className="min-h-[400px] sm:min-h-[600px]">
          <ExperimentStation
            selectedRock={selectedRock}
            onExperimentComplete={addExperimentResult}
            rockSamples={rockSamples}
            onSelectRock={setSelectedRock}
          />
        </TabsContent>

        <TabsContent value="notebook" className="min-h-[400px] sm:min-h-[600px]">
          <LabNotebook experimentResults={experimentResults} selectedRock={selectedRock} />
        </TabsContent>

        <TabsContent value="classification" className="min-h-[400px] sm:min-h-[600px]">
          <ClassificationTable rockSamples={rockSamples} experimentResults={experimentResults} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

"use client"

import { useCallback, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import LabWorkspace from "./LabWorkspace"
import ExperimentStation from "@/components/experiment-station"
import LabNotebook from "@/components/lab-notebook"
import ClassificationTable from "@/components/classification-table"
import type { ExperimentResult, RockSample } from "@/types/rocks"
import { ROCK_SAMPLES } from "@/data/rocks"
import { useLabStore } from "@/store/labStore"

export default function Laboratory() {
  const [experimentResults, setExperimentResults] = useState<ExperimentResult[]>([])
  const [rockSamples] = useState<RockSample[]>(ROCK_SAMPLES)

  const { selectedRock, setSelectedRock } = useLabStore()

  const addExperimentResult = useCallback((result: ExperimentResult) => {
    setExperimentResults((prev) => [...prev, result])
  }, [])

  return (
    <section className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl flex-col gap-6 px-4 py-6">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Laboratoire Virtuel de Pétrographie
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Explorez des échantillons, réalisez des expériences et améliorez vos compétences en pétrographie dans un
            laboratoire virtuel moderne.
          </p>
        </div>
      </header>

      <Tabs defaultValue="samples" className="flex-1">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 gap-2 bg-muted p-1 rounded-2xl shadow-sm">
          <TabsTrigger value="samples">Échantillons</TabsTrigger>
          <TabsTrigger value="experiments">Expériences</TabsTrigger>
          <TabsTrigger value="notebook">Carnet</TabsTrigger>
          <TabsTrigger value="classification">Classification</TabsTrigger>
        </TabsList>

        <TabsContent value="samples" className="mt-4 flex flex-col gap-4">
          <LabWorkspace rockSamples={rockSamples} />
        </TabsContent>

        <TabsContent value="experiments" className="mt-4">
          <ExperimentStation
            selectedRock={selectedRock}
            onExperimentComplete={addExperimentResult}
            rockSamples={rockSamples}
            onSelectRock={setSelectedRock}
          />
        </TabsContent>

        <TabsContent value="notebook" className="mt-4">
          <LabNotebook experimentResults={experimentResults} selectedRock={selectedRock} />
        </TabsContent>

        <TabsContent value="classification" className="mt-4">
          <ClassificationTable rockSamples={rockSamples} experimentResults={experimentResults} />
        </TabsContent>
      </Tabs>
    </section>
  )
}

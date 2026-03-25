"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, Beaker, Hand } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import type { RockSample, ExperimentResult, ExperimentType } from "@/types/rocks"
import { v4 as uuidv4 } from "@/utils/uuid"
import MagnifyingGlass from "./magnifying-glass"
import RockCrossSection from "./rock-cross-section"
import { Viewer } from "@/components/lab/Viewer"
import InteractiveWorkspace from "./interactive-workspace"
import {
  AcidBottleIcon,
  GeologistHammerIcon,
  MagnifierIcon,
  FossilIcon,
  GrainTextureIcon,
  StratificationIcon,
} from "./geology-icons"

interface ExperimentStationProps {
  selectedRock: RockSample | null
  onExperimentComplete: (result: ExperimentResult) => void
  rockSamples: RockSample[]
  onSelectRock: (rock: RockSample) => void
}

export default function ExperimentStation({
  selectedRock,
  onExperimentComplete,
  rockSamples,
  onSelectRock,
}: ExperimentStationProps) {
  const [activeExperiment, setActiveExperiment] = useState<ExperimentType | null>(null)
  const [experimentInProgress, setExperimentInProgress] = useState(false)
  const [experimentResult, setExperimentResult] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<string>("guided")

  if (!selectedRock) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Aucun échantillon sélectionné</AlertTitle>
        <AlertDescription>
          Veuillez sélectionner un échantillon dans la section "Échantillons de Roches" pour effectuer des expériences.
        </AlertDescription>
      </Alert>
    )
  }

  const runExperiment = (type: ExperimentType) => {
    setActiveExperiment(type)
    setExperimentInProgress(true)
    setExperimentResult(null)

    // Simuler l'expérience en cours
    setTimeout(() => {
      setExperimentInProgress(false)

      let result = ""
      let details: Record<string, any> = {}

      switch (type) {
        case "granulometry":
          result = `Taille des grains: ${selectedRock.grainSize}`
          details = { grainSize: selectedRock.grainSize }
          break
        case "acid":
          result = `Réaction à l'acide: ${
            selectedRock.acidReaction === "strong"
              ? "Forte effervescence"
              : selectedRock.acidReaction === "weak"
                ? "Faible effervescence"
                : "Aucune réaction"
          }`
          details = { acidReaction: selectedRock.acidReaction }
          break
        case "hardness":
          result = `Dureté: ${selectedRock.hardness} sur l'échelle de Mohs`
          details = { hardness: selectedRock.hardness }
          break
        case "texture":
          result = `Texture: ${selectedRock.texture === "rough" ? "Rugueuse" : "Lisse"}`
          details = { texture: selectedRock.texture }
          break
        case "fossil":
          result = selectedRock.hasFossils
            ? "Des fossiles ont été détectés dans cet échantillon."
            : "Aucun fossile n'a été détecté dans cet échantillon."
          details = { hasFossils: selectedRock.hasFossils }
          break
      }

      setExperimentResult(result)

      onExperimentComplete({
        id: uuidv4(),
        rockId: selectedRock.id,
        experimentType: type,
        timestamp: Date.now(),
        result,
        details,
      })
    }, 2000)
  }

  // Simuler une réaction à l'acide avec animation
  const AcidReactionAnimation = () => {
    if (selectedRock.acidReaction === "none") {
      return (
        <div className="relative w-full h-48 bg-gray-100 rounded-md flex items-center justify-center">
          <div className="text-center">
            <p className="text-lg font-medium">Aucune réaction</p>
            <p className="text-sm text-muted-foreground">L'échantillon ne réagit pas à l'acide</p>
          </div>
        </div>
      )
    }

    const bubbleCount = selectedRock.acidReaction === "strong" ? 30 : 10

    return (
      <div className="relative w-full h-48 bg-gray-100 rounded-md overflow-hidden">
        <div className="absolute bottom-0 w-full h-1/3 bg-blue-200"></div>
        <div className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gray-300 rounded-md"></div>

        {/* Bulles d'effervescence */}
        {Array.from({ length: bubbleCount }).map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full animate-ping opacity-70"
            style={{
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              bottom: `${Math.random() * 30 + 33}%`,
              left: `${Math.random() * 60 + 20}%`,
              animationDuration: `${Math.random() * 2 + 1}s`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          ></div>
        ))}

        <div className="absolute bottom-2 w-full text-center">
          <p className="text-lg font-medium">
            {selectedRock.acidReaction === "strong" ? "Forte effervescence" : "Faible effervescence"}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Échantillon Sélectionné</CardTitle>
            <CardDescription className="text-sm">{selectedRock.name}</CardDescription>
          </CardHeader>
          <CardContent>
           <div className="w-full h-48 rounded-md overflow-hidden mb-4">
  <Viewer 
    modelPath={selectedRock.model3D} 
    className="w-full h-full"
  />
</div>
            <p className="text-sm">{selectedRock.description}</p>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-2">
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Station d'Expériences</CardTitle>
            <CardDescription className="text-sm">Choisissez entre le mode guidé ou le mode interactif</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-secondary">
                <TabsTrigger value="guided" className="text-xs sm:text-sm font-black bg-stone-300 rounded-4xl shadow-xl">
                  <Beaker className="h-4 w-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Mode Guidé</span>
                  <span className="sm:hidden">Guidé</span>
                </TabsTrigger>
                <TabsTrigger value="interactive" className="text-xs sm:text-sm shadow-xl rounded-4xl bg-stone-300 font-black">
                  <Hand className="h-4 w-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Mode Interactif</span>
                  <span className="sm:hidden">Interactif</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="guided" className="mt-4">
                <Tabs defaultValue="granulometry" className="w-full">
                  <div className="overflow-x-auto">
                    <TabsList className="inline-flex w-full sm:grid sm:grid-cols-6 bg-secondary min-w-max sm:min-w-0">
                      <TabsTrigger value="granulometry" className="text-xs px-2 sm:px-3 rounded-xs border-0 shadow-xl border-transparent">
                        <GrainTextureIcon className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-1" />
                        <span className="hidden sm:inline">Granulométrie</span>
                      </TabsTrigger>
                      <TabsTrigger value="acid" className="text-xs px-2 sm:px-3 shadow-xl">
                        <AcidBottleIcon className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-1" />
                        <span className="hidden sm:inline">Test Acide</span>
                      </TabsTrigger>
                      <TabsTrigger value="hardness" className="text-xs px-2 sm:px-3 shadow-xl">
                        <GeologistHammerIcon className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-1" />
                        <span className="hidden sm:inline">Dureté</span>
                      </TabsTrigger>
                      <TabsTrigger value="texture" className="text-xs px-2 sm:px-3 shadow-xl">
                        <MagnifierIcon className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-1" />
                        <span className="hidden sm:inline">Texture</span>
                      </TabsTrigger>
                      <TabsTrigger value="fossil" className="text-xs px-2 sm:px-3 shadow-xl">
                        <FossilIcon className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-1" />
                        <span className="hidden sm:inline shadow-xl">Fossiles</span>
                      </TabsTrigger>
                      <TabsTrigger value="section" className="text-xs px-2 sm:px-3 shadow-xl">
                        <StratificationIcon className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-1" />
                        <span className="hidden sm:inline">Coupes</span>
                      </TabsTrigger>
                    </TabsList>
                  </div>

                  <TabsContent value="granulometry" className="mt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base sm:text-lg">Test Granulométrique</CardTitle>
                        <CardDescription className="text-xs sm:text-sm">
                          Déterminez la taille des grains de l'échantillon
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm">
                          Ce test permet de déterminer la taille des grains et de classifier l'échantillon selon
                          l'échelle granulométrique (blocs, galets, graviers, sables, silts, argiles).
                        </p>

                        <MagnifyingGlass rock={selectedRock} />

                        <div className="flex justify-center mt-4">
                          <Button
                            onClick={() => runExperiment("granulometry")}
                            disabled={experimentInProgress}
                            className="text-xs sm:text-sm bg-orange-300 rounded-xl shadow-lg font-extrabold"
                          >
                            {experimentInProgress && activeExperiment === "granulometry"
                              ? "Analyse en cours..."
                              : "Lancer le test granulométrique"}
                          </Button>
                        </div>
                        {experimentResult && activeExperiment === "granulometry" && (
                          <Alert className="mt-4">
                            <AlertTitle className="text-sm">Résultat du test</AlertTitle>
                            <AlertDescription className="text-xs sm:text-sm">{experimentResult}</AlertDescription>
                          </Alert>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="acid" className="mt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base sm:text-lg">Test à l'Acide</CardTitle>
                        <CardDescription className="text-xs sm:text-sm">
                          Testez la réactivité de l'échantillon à l'acide chlorhydrique
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm">
                          Ce test permet de déterminer si l'échantillon contient des carbonates. Une forte effervescence
                          indique un calcaire, une faible effervescence indique une dolomie, et aucune réaction indique
                          l'absence de carbonates.
                        </p>

                        {activeExperiment === "acid" && !experimentInProgress && <AcidReactionAnimation />}

                        <div className="flex justify-center mt-4">
                          <Button
                            onClick={() => runExperiment("acid")}
                            disabled={experimentInProgress}
                            className="text-xs sm:text-sm bg-orange-300 font-extrabold border-solid rounded-lg shadow-lg"
                          >
                            {experimentInProgress && activeExperiment === "acid"
                              ? "Test en cours..."
                              : "Appliquer de l'acide"}
                          </Button>
                        </div>
                        {experimentResult && activeExperiment === "acid" && (
                          <Alert className="mt-4">
                            <AlertTitle className="text-sm">Résultat du test</AlertTitle>
                            <AlertDescription className="text-xs sm:text-sm">{experimentResult}</AlertDescription>
                          </Alert>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="hardness" className="mt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base sm:text-lg">Test de Dureté</CardTitle>
                        <CardDescription className="text-xs sm:text-sm">
                          Déterminez la dureté de l'échantillon sur l'échelle de Mohs
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm">
                          Ce test permet de déterminer la dureté de l'échantillon sur l'échelle de Mohs, qui va de 1
                          (talc) à 10 (diamant).
                        </p>

                        <div className="w-full bg-gray-100 rounded-md p-4">
                          <div className="relative h-8 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="absolute h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500"
                              style={{ width: "100%" }}
                            ></div>
                            <div
                              className="absolute h-full w-1 bg-black"
                              style={{ left: `${(selectedRock.hardness / 10) * 100}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between mt-2 text-xs">
                            <span>1 (Talc)</span>
                            <span className="hidden sm:inline">5 (Apatite)</span>
                            <span>10 (Diamant)</span>
                          </div>
                        </div>

                        <div className="flex justify-center mt-4">
                          <Button
                            onClick={() => runExperiment("hardness")}
                            disabled={experimentInProgress}
                            className="text-xs sm:text-sm font-extrabold bg-orange-300 rounded-lg shadow-lg"
                          >
                            {experimentInProgress && activeExperiment === "hardness"
                              ? "Test en cours..."
                              : "Tester la dureté"}
                          </Button>
                        </div>
                        {experimentResult && activeExperiment === "hardness" && (
                          <Alert className="mt-4">
                            <AlertTitle className="text-sm">Résultat du test</AlertTitle>
                            <AlertDescription className="text-xs sm:text-sm">{experimentResult}</AlertDescription>
                          </Alert>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="texture" className="mt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base sm:text-lg">Analyse de Texture</CardTitle>
                        <CardDescription className="text-xs sm:text-sm">
                          Examinez la texture de l'échantillon
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm">
                          Cette analyse permet de déterminer si la texture de l'échantillon est rugueuse ou lisse.
                        </p>

                        <MagnifyingGlass rock={selectedRock} />

                        <div className="flex justify-center mt-4">
                          <Button
                            onClick={() => runExperiment("texture")}
                            disabled={experimentInProgress}
                            className="text-xs sm:text-sm bg-orange-300 font-bold rounded-lg shadow-lg"
                          >
                            {experimentInProgress && activeExperiment === "texture"
                              ? "Analyse en cours..."
                              : "Analyser la texture"}
                          </Button>
                        </div>
                        {experimentResult && activeExperiment === "texture" && (
                          <Alert className="mt-4">
                            <AlertTitle className="text-sm">Résultat de l'analyse</AlertTitle>
                            <AlertDescription className="text-xs sm:text-sm">{experimentResult}</AlertDescription>
                          </Alert>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="fossil" className="mt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base sm:text-lg">Détection de Fossiles</CardTitle>
                        <CardDescription className="text-xs sm:text-sm">
                          Recherchez la présence de fossiles dans l'échantillon
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm">
                          Cette analyse permet de détecter la présence de fossiles dans l'échantillon à l'aide d'un
                          scanner 3D.
                        </p>

                        <div className="relative w-full h-48 bg-gray-100 rounded-md overflow-hidden">
                          {selectedRock.hasFossils ? (
                            <>
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-3/4 h-3/4 border-2 border-green-500 border-dashed rounded-md animate-pulse flex items-center justify-center">
                                  <div className="text-green-500 font-medium text-sm">Fossiles détectés</div>
                                </div>
                              </div>
                              <div className="absolute top-2 right-2 w-4 h-4 bg-green-500 rounded-full"></div>
                            </>
                          ) : (
                            <>
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-3/4 h-3/4 border-2 border-red-500 border-dashed rounded-md flex items-center justify-center">
                                  <div className="text-red-500 font-medium text-sm">Aucun fossile détecté</div>
                                </div>
                              </div>
                              <div className="absolute top-2 right-2 w-4 h-4 bg-red-500 rounded-full"></div>
                            </>
                          )}
                        </div>

                        <div className="flex justify-center mt-4">
                          <Button
                            onClick={() => runExperiment("fossil")}
                            disabled={experimentInProgress}
                            className="text-xs sm:text-sm bg-orange-300 font-bold shadow-lg"
                          >
                            {experimentInProgress && activeExperiment === "fossil"
                              ? "Scan en cours..."
                              : "Scanner l'échantillon"}
                          </Button>
                        </div>
                        {experimentResult && activeExperiment === "fossil" && (
                          <Alert className="mt-4">
                            <AlertTitle className="text-sm">Résultat du scan</AlertTitle>
                            <AlertDescription className="text-xs sm:text-sm">{experimentResult}</AlertDescription>
                          </Alert>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="section" className="mt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base sm:text-lg">Coupes et Stratifications</CardTitle>
                        <CardDescription className="text-xs sm:text-sm">
                          Examinez la structure interne de l'échantillon
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm">
                          Cette analyse permet d'observer les stratifications et la structure interne de l'échantillon.
                        </p>

                        <RockCrossSection rock={selectedRock} />
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </TabsContent>

              <TabsContent value="interactive" className="mt-4">
                <InteractiveWorkspace
                  rockSamples={rockSamples}
                  selectedRock={selectedRock}
                  onSelectRock={onSelectRock}
                  onExperimentComplete={onExperimentComplete}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
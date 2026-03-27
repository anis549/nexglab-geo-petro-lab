"use client"

"use client"

import { useState, useRef } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Save, FileText, ClipboardList } from "lucide-react"
import html2canvas from "html2canvas"
import { jsPDF } from "jspdf"
import type { RockSample, ExperimentResult } from "@/types/rocks"
import { format } from "date-fns"
import LabReport from "./lab-report"
import { getSafeRockData, formatRockDataForDisplay } from "@/utils/safe-rock-data"

interface LabNotebookProps {
  experimentResults: ExperimentResult[]
  selectedRock: RockSample | null
  rockSamples: RockSample[]
}

export default function LabNotebook({
  experimentResults,
  selectedRock,
  rockSamples,
}: LabNotebookProps) {
  const [notes, setNotes] = useState<string>("")
  const [activeTab, setActiveTab] = useState<string>("notes")
  const reportRef = useRef<HTMLDivElement>(null)

  const handleExportPDF = async () => {
    if (!reportRef.current || !selectedRock) {
      alert("Veuillez sélectionner une roche et remplir le rapport avant l'export.")
      return
    }

    const reportElement = reportRef.current.querySelector("#lab-report") as HTMLElement
    if (!reportElement) {
      alert("Section du rapport non trouvée.")
      return
    }

    try {
      const canvas = await html2canvas(reportElement, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
      })

      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPDF("p", "mm", "a4")
      const imgProps = pdf.getImageProperties(imgData)
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width

      // Handle multi-page if content long
      let heightLeft = pdfHeight
      let position = 0

      pdf.addImage(imgData, "PNG", 10, 10, pdfWidth - 20, pdfHeight)
      heightLeft -= pdf.internal.pageSize.getHeight() - 20
      while (heightLeft > 0) {
        position = heightLeft - pdfHeight
        pdf.addPage()
        pdf.addImage(imgData, "PNG", 10, position, pdfWidth - 20, pdfHeight)
        heightLeft -= pdf.internal.pageSize.getHeight()
      }

      if (selectedRock.name) {
        pdf.save(`rapport-laboratoire-${selectedRock.name.replace(/[^a-z0-9]/gi, '_')}.pdf`)
      } else {
        pdf.save("rapport-laboratoire.pdf")
      }
    } catch (error) {
      console.error("Erreur lors de la génération du PDF:", error)
      alert("Une erreur est survenue lors de la génération du PDF.")
    }
  }

  return (
    <div className="space-y-4 notebook-fix">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">

        {/* HEADER TABS */}
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger
            className="bg-orange-300 font-extrabold rounded-full text-black"
            value="notes"
          >
            <ClipboardList className="h-4 w-4 mr-2" />
            Notes de Laboratoire
          </TabsTrigger>

          <TabsTrigger
            className="rounded-full shadow-xl bg-orange-300 font-extrabold text-black"
            value="report"
          >
            <FileText className="h-4 w-4 mr-2" />
            Fiche de Rapport
          </TabsTrigger>
        </TabsList>

        {/* ================= NOTES TAB ================= */}
        <TabsContent value="notes" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* ================= RESULTS ================= */}
            <Card className="md:col-span-1 bg-transparent border-orange-300">
              <CardHeader>
                <CardTitle className="font-black text-white">
                  Résultats des Expériences
                </CardTitle>
                <CardDescription className="text-[#0b3d91]">
                  Historique des tests effectués
                </CardDescription>
              </CardHeader>

              <CardContent>
                {experimentResults.length === 0 ? (
                  <p className="text-center py-8 text-[#0b3d91]">
                    Aucune expérience n'a encore été réalisée.
                  </p>
                ) : (
                  <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">

                    {experimentResults.map((result) => {
                      // Find the corresponding rock for this experiment result
                      const rock = rockSamples.find(r => r.id === result.rockId)
                      if (!rock) return null

                      // Get safe data for this rock
                      const safeData = getSafeRockData(rock, [result])
                      const displayData = formatRockDataForDisplay(safeData)

                      // Get the safe value for this experiment type
                      let safeResult = ""
                      switch (result.experimentType) {
                        case "granulometry":
                          safeResult = displayData.granulometry
                          break
                        case "acid":
                          safeResult = displayData.acid
                          break
                        case "hardness":
                          safeResult = displayData.hardness
                          break
                        case "texture":
                          safeResult = displayData.texture
                          break
                        case "fossil":
                          safeResult = displayData.fossil
                          break
                        default:
                          safeResult = result.result || "—"
                      }

                      return (
                        <Card
                          key={result.id}
                          className="p-4 rounded-xl bg-white shadow-md border border-slate-200"
                        >
                          <CardHeader className="py-3">

                            <CardTitle className="">
                              {result.experimentType === "granulometry" && "Test Granulométrique"}
                              {result.experimentType === "acid" && "Test à l'Acide"}
                              {result.experimentType === "hardness" && "Test de Dureté"}
                              {result.experimentType === "texture" && "Analyse de Texture"}
                              {result.experimentType === "fossil" && "Détection de Fossiles"}
                            </CardTitle>

                            <CardDescription className="text-xs text-[#4a6fa5]">
                              {format(new Date(result.timestamp), "dd/MM/yyyy HH:mm")}
                            </CardDescription>
                          </CardHeader>

                          <CardContent className="py-2">
                            <p className="text-xs text-[#4a6fa5]">
                              {safeResult}
                            </p>
                          </CardContent>
                        </Card>
                      )
                    })}

                  </div>
                )}
              </CardContent>
            </Card>

            {/* ================= NOTES ================= */}
            <Card className="md:col-span-1 border-orange-300">
              <CardHeader>
                <CardTitle className="font-black text-white">
                  Notes de Laboratoire
                </CardTitle>
                <CardDescription className="text-[#0b3d91]/70">
                  Prenez des notes sur vos observations
                </CardDescription>
              </CardHeader>

              <CardContent>
                <Textarea
                  placeholder="Notez vos observations ici..."
                  className="w-full p-2 rounded-lg bg-white text-[#0b3d91] placeholder:text-[#0b3d91]/50"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </CardContent>

              <CardFooter className="flex justify-between">
                <Button variant="outline">
                  <Save className="h-4 w-4 mr-2" />
                  Sauvegarder
                </Button>
              </CardFooter>
            </Card>

          </div>
        </TabsContent>

        {/* ================= REPORT TAB ================= */}
        <TabsContent value="report" className="mt-4">
          <div className="report-scope" ref={reportRef}>
            <LabReport
              experimentResults={experimentResults}
              selectedRock={selectedRock}
            />
          </div>
        </TabsContent>

      </Tabs>
    </div>
  )
}

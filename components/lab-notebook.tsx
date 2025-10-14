"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Save, FileText, ClipboardList } from "lucide-react"
import type { RockSample, ExperimentResult } from "@/types/rocks"
import { format } from "date-fns"
import LabReport from "./lab-report"

interface LabNotebookProps {
  experimentResults: ExperimentResult[]
  selectedRock: RockSample | null
}

export default function LabNotebook({ experimentResults, selectedRock }: LabNotebookProps) {
  const [notes, setNotes] = useState<string>("")
  const [activeTab, setActiveTab] = useState<string>("notes")

  const generatePDF = () => {
    // In a real implementation, this would generate a PDF report
    alert("Génération du rapport PDF...")
  }

  const saveNotes = () => {
    // In a real implementation, this would save the notes to a database
    alert("Notes sauvegardées!")
  }

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger className="bg-orange-300 font-extrabold rounded-full" value="notes">
            <ClipboardList className="h-4 w-4 mr-2" />
            Notes de Laboratoire
          </TabsTrigger>
          <TabsTrigger className="rounded-full shadow-xl bg-orange-300 font-extrabold" value="report">
            <FileText className="h-4 w-4 mr-2" />
            Fiche de Rapport
          </TabsTrigger>
        </TabsList>

        <TabsContent value="notes" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="md:col-span-1 bg-transparent border-orange-300">
              <CardHeader>
                <CardTitle className="font-black">Résultats des Expériences</CardTitle>
                <CardDescription>Historique des tests effectués</CardDescription>
              </CardHeader>
              <CardContent>
                {experimentResults.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">Aucune expérience n'a encore été réalisée.</p>
                ) : (
                  <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                    {experimentResults.map((result) => (
                      <Card className="border-orange-300 border rounded-4xl bg-slate-100 font-extrabold" key={result.id}>
                        <CardHeader className="py-3">
                          <CardTitle className="text-sm font-medium">
                            {result.experimentType === "granulometry" && "Test Granulométrique"}
                            {result.experimentType === "acid" && "Test à l'Acide"}
                            {result.experimentType === "hardness" && "Test de Dureté"}
                            {result.experimentType === "texture" && "Analyse de Texture"}
                            {result.experimentType === "fossil" && "Détection de Fossiles"}
                          </CardTitle>
                          <CardDescription className="text-xs">
                            {format(new Date(result.timestamp), "dd/MM/yyyy HH:mm")}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="py-2">
                          <p className="text-sm">{result.result}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="md:col-span-1 border-orange-300">
              <CardHeader>
                <CardTitle className="font-black">Notes de Laboratoire</CardTitle>
                <CardDescription>Prenez des notes sur vos observations</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Notez vos observations ici..."
                  className="min-h-[300px] border-orange-300 rounded-3xl"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={saveNotes}>
                  <Save className="h-4 w-4 mr-2" />
                  Sauvegarder
                </Button>
                <Button onClick={generatePDF}>
                  <Download className="h-4 w-4 mr-2" />
                  Générer Rapport PDF
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="report" className="mt-4">
          <LabReport experimentResults={experimentResults} selectedRock={selectedRock} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

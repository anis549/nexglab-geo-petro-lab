"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Download, Save } from "lucide-react"
import { jsPDF } from "jspdf"
import html2canvas from "html2canvas"
import type { RockSample, ExperimentResult } from "@/types/rocks"

interface LabReportProps {
  experimentResults: ExperimentResult[]
  selectedRock: RockSample | null
}

export default function LabReport({ experimentResults, selectedRock }: LabReportProps) {
  const [studentName, setStudentName] = useState("")
  const [studentFirstName, setStudentFirstName] = useState("")
  const [studentGroup, setStudentGroup] = useState("")

  // Données pour la Fiche 1
  const [cassette1, setCassette1] = useState({
    typeMateriau: "",
    texture: "",
    classe: "",
  })
  const [cassette2, setCassette2] = useState({
    typeMateriau: "",
    texture: "",
    classe: "",
  })
  const [cassette3, setCassette3] = useState({
    typeMateriau: "",
    texture: "",
    classe: "",
  })
  const [cassette4, setCassette4] = useState({
    typeMateriau: "",
    texture: "",
    classe: "",
  })
  const [observations, setObservations] = useState("")
  const [denomination, setDenomination] = useState("")

  // Données pour la Fiche 2
  const [roche1, setRoche1] = useState({
    texture: "",
    reactionAcide: "",
    tailleElements: "",
    fossiles: "",
    durete: "",
    cassure: "",
  })
  const [roche2, setRoche2] = useState({
    texture: "",
    reactionAcide: "",
    tailleElements: "",
    fossiles: "",
    durete: "",
    cassure: "",
  })
  const [roche3, setRoche3] = useState({
    texture: "",
    reactionAcide: "",
    tailleElements: "",
    fossiles: "",
    durete: "",
    cassure: "",
  })
  const [observationsRoches, setObservationsRoches] = useState("")

  // Fonction pour générer le PDF
  const generatePDF = async () => {
    const reportElement = document.getElementById("lab-report")
    if (!reportElement) return

    try {
      const canvas = await html2canvas(reportElement, {
        scale: 2,
        useCORS: true,
        logging: false,
      })

      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPDF("p", "mm", "a4")
      const imgProps = pdf.getImageProperties(imgData)
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight)
      pdf.save("rapport_petrographie.pdf")
    } catch (error) {
      console.error("Erreur lors de la génération du PDF:", error)
      alert("Une erreur est survenue lors de la génération du PDF.")
    }
  }

  // Fonction pour sauvegarder les données
  const saveReport = () => {
    // Dans une implémentation réelle, ceci sauvegarderait les données dans une base de données
    alert("Rapport sauvegardé!")
  }

  return (
    <div className="space-y-4">
      <Card className="border-orange-300">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Rapport de Laboratoire</CardTitle>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={saveReport}>
              <Save className="h-4 w-4 mr-2" />
              Sauvegarder
            </Button>
            <Button onClick={generatePDF}>
              <Download className="h-4 w-4 mr-2" />
              Exporter en PDF
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <div id="lab-report" className="bg-white p-6 rounded-lg">
            {/* En-tête du document */}
            <div className="grid grid-cols-2 mb-4">
              <div>
                <p className="font-bold">ENSTP</p>
                <p>Responsable : Dr K. OMRACI</p>
              </div>
              <div className="text-right">
                <p className="font-bold">TP Géologie appliquée 1ère Année</p>
                <p>Département : DIB</p>
              </div>
            </div>

            <div className="border-t border-b border-gray-300 my-2"></div>

            {/* Informations de l'étudiant */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <label className="text-sm">Nom</label>
                <Input
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="border-b border-dotted border-black"
                />
              </div>
              <div>
                <label className="text-sm">Prénom</label>
                <Input
                  value={studentFirstName}
                  onChange={(e) => setStudentFirstName(e.target.value)}
                  className="border-b border-dotted border-black"
                />
              </div>
              <div>
                <label className="text-sm">Groupe</label>
                <Input
                  value={studentGroup}
                  onChange={(e) => setStudentGroup(e.target.value)}
                  className="border-b border-dotted border-black"
                />
              </div>
            </div>

            {/* Titre du TP */}
            <div className="text-center font-bold mb-4">
              <h2>Fiche de réponse du TP3 : PÉTROGRAPHIE</h2>
            </div>

            {/* Fiche 1 */}
            <div className="mb-6">
              <p className="font-bold mb-2">Fiche 1 :</p>
              <p className="mb-4 text-sm">
                On vous donne dans plusieurs cassettes différents sols (ou roches déconsolidées) dont les tailles des
                grains sont différentes. Nommez-les en donnant la classe à laquelle ils appartiennent chacun d'eux en
                vous aidant de l'échelle granulaire donnée ci-dessous.
              </p>

              {/* Tableau d'échelle granulaire */}
              <div className="overflow-x-auto mb-4">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th colSpan={3} className="border border-gray-400 bg-gray-200 text-center">
                        COARSE GRENU
                      </th>
                      <th colSpan={1} className="border border-gray-400 bg-gray-200 text-center">
                        FINE
                      </th>
                      <th colSpan={1} className="border border-gray-400 bg-gray-200 text-center">
                        ORGANIC
                      </th>
                    </tr>
                    <tr>
                      <th rowSpan={2} className="border border-gray-400 text-center">
                        TYPE
                      </th>
                      <th className="border border-gray-400 text-center text-xs">
                        blocs
                        <br />
                        ou cailloux
                        <br />
                        Boulders
                      </th>
                      <th className="border border-gray-400 text-center text-xs">
                        galets
                        <br />
                        Cobbles
                      </th>
                      <th colSpan={2} className="border border-gray-400 text-center text-xs">
                        Gravel Gravier
                      </th>
                      <th colSpan={3} className="border border-gray-400 text-center text-xs">
                        Sand Sable
                      </th>
                      <th className="border border-gray-400 text-center text-xs">
                        Silt
                        <br />
                        silt
                      </th>
                      <th className="border border-gray-400 text-center text-xs">
                        Clay
                        <br />
                        Argile
                      </th>
                      <th className="border border-gray-400 text-center text-xs">
                        Organic Soil
                        <br />
                        Sol organique
                      </th>
                    </tr>
                    <tr>
                      <th className="border border-gray-400 text-center"></th>
                      <th className="border border-gray-400 text-center"></th>
                      <th className="border border-gray-400 text-center text-xs">coarse</th>
                      <th className="border border-gray-400 text-center text-xs">medium</th>
                      <th className="border border-gray-400 text-center text-xs">fine</th>
                      <th className="border border-gray-400 text-center text-xs">coarse</th>
                      <th className="border border-gray-400 text-center text-xs">medium</th>
                      <th className="border border-gray-400 text-center text-xs">fine</th>
                      <th className="border border-gray-400 text-center"></th>
                      <th className="border border-gray-400 text-center"></th>
                      <th className="border border-gray-400 text-center"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-400 text-center text-xs">Size Range (mm)</td>
                      <td className="border border-gray-400 text-center text-xs">200</td>
                      <td className="border border-gray-400 text-center text-xs">60</td>
                      <td className="border border-gray-400 text-center text-xs">20</td>
                      <td className="border border-gray-400 text-center text-xs">6</td>
                      <td className="border border-gray-400 text-center text-xs">2</td>
                      <td className="border border-gray-400 text-center text-xs">0.6</td>
                      <td className="border border-gray-400 text-center text-xs">0.2</td>
                      <td className="border border-gray-400 text-center text-xs">0.06</td>
                      <td className="border border-gray-400 text-center text-xs">0.002</td>
                      <td className="border border-gray-400 text-center text-xs">Terre végétale</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-400 text-center text-xs">Graphic Symbol</td>
                      <td className="border border-gray-400 text-center">
                        <div className="w-8 h-8 bg-gray-600 rounded-full mx-auto"></div>
                      </td>
                      <td className="border border-gray-400 text-center">
                        <div className="w-6 h-6 bg-gray-600 rounded-full mx-auto"></div>
                      </td>
                      <td colSpan={2} className="border border-gray-400 text-center">
                        <div className="flex justify-center">
                          <svg width="40" height="30" viewBox="0 0 40 30">
                            <circle cx="10" cy="10" r="3" fill="gray" />
                            <circle cx="20" cy="15" r="4" fill="gray" />
                            <circle cx="30" cy="10" r="3" fill="gray" />
                            <circle cx="15" cy="20" r="3" fill="gray" />
                            <circle cx="25" cy="5" r="2" fill="gray" />
                          </svg>
                        </div>
                      </td>
                      <td colSpan={3} className="border border-gray-400 text-center">
                        <div className="flex justify-center">
                          <svg width="40" height="30" viewBox="0 0 40 30">
                            <circle cx="8" cy="8" r="1" fill="gray" />
                            <circle cx="12" cy="12" r="1" fill="gray" />
                            <circle cx="16" cy="8" r="1" fill="gray" />
                            <circle cx="20" cy="12" r="1" fill="gray" />
                            <circle cx="24" cy="8" r="1" fill="gray" />
                            <circle cx="28" cy="12" r="1" fill="gray" />
                            <circle cx="32" cy="8" r="1" fill="gray" />
                            <circle cx="10" cy="16" r="1" fill="gray" />
                            <circle cx="14" cy="20" r="1" fill="gray" />
                            <circle cx="18" cy="16" r="1" fill="gray" />
                            <circle cx="22" cy="20" r="1" fill="gray" />
                            <circle cx="26" cy="16" r="1" fill="gray" />
                            <circle cx="30" cy="20" r="1" fill="gray" />
                          </svg>
                        </div>
                      </td>
                      <td className="border border-gray-400 text-center">
                        <div className="flex justify-center">
                          <svg width="30" height="30" viewBox="0 0 30 30">
                            <line x1="5" y1="5" x2="25" y2="5" stroke="black" strokeWidth="0.5" />
                            <line x1="5" y1="8" x2="25" y2="8" stroke="black" strokeWidth="0.5" />
                            <line x1="5" y1="11" x2="25" y2="11" stroke="black" strokeWidth="0.5" />
                            <line x1="5" y1="14" x2="25" y2="14" stroke="black" strokeWidth="0.5" />
                            <line x1="5" y1="17" x2="25" y2="17" stroke="black" strokeWidth="0.5" />
                            <line x1="5" y1="20" x2="25" y2="20" stroke="black" strokeWidth="0.5" />
                            <line x1="5" y1="23" x2="25" y2="23" stroke="black" strokeWidth="0.5" />
                            <line x1="5" y1="26" x2="25" y2="26" stroke="black" strokeWidth="0.5" />
                          </svg>
                        </div>
                      </td>
                      <td className="border border-gray-400 text-center">
                        <div className="flex justify-center">
                          <svg width="30" height="30" viewBox="0 0 30 30">
                            <line x1="5" y1="5" x2="25" y2="5" stroke="black" strokeWidth="0.5" />
                            <line x1="5" y1="7" x2="25" y2="7" stroke="black" strokeWidth="0.5" />
                            <line x1="5" y1="9" x2="25" y2="9" stroke="black" strokeWidth="0.5" />
                            <line x1="5" y1="11" x2="25" y2="11" stroke="black" strokeWidth="0.5" />
                            <line x1="5" y1="13" x2="25" y2="13" stroke="black" strokeWidth="0.5" />
                            <line x1="5" y1="15" x2="25" y2="15" stroke="black" strokeWidth="0.5" />
                            <line x1="5" y1="17" x2="25" y2="17" stroke="black" strokeWidth="0.5" />
                            <line x1="5" y1="19" x2="25" y2="19" stroke="black" strokeWidth="0.5" />
                            <line x1="5" y1="21" x2="25" y2="21" stroke="black" strokeWidth="0.5" />
                            <line x1="5" y1="23" x2="25" y2="23" stroke="black" strokeWidth="0.5" />
                            <line x1="5" y1="25" x2="25" y2="25" stroke="black" strokeWidth="0.5" />
                            <line x1="5" y1="27" x2="25" y2="27" stroke="black" strokeWidth="0.5" />
                          </svg>
                        </div>
                      </td>
                      <td className="border border-gray-400 text-center">
                        <div className="flex justify-center">
                          <svg width="30" height="30" viewBox="0 0 30 30">
                            <path d="M10,5 C12,7 14,5 16,7 C18,9 20,7 22,9" stroke="black" fill="none" />
                            <path d="M10,10 C12,12 14,10 16,12 C18,14 20,12 22,14" stroke="black" fill="none" />
                            <path d="M10,15 C12,17 14,15 16,17 C18,19 20,17 22,19" stroke="black" fill="none" />
                            <path d="M10,20 C12,22 14,20 16,22 C18,24 20,22 22,24" stroke="black" fill="none" />
                          </svg>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Tableau de réponses pour la Fiche 1 */}
              <table className="w-full border-collapse mb-4">
                <thead>
                  <tr>
                    <th className="border border-gray-400 bg-gray-100 text-center text-sm p-1">Élément de réponse</th>
                    <th className="border border-gray-400 bg-gray-100 text-center text-sm p-1">cassette 1</th>
                    <th className="border border-gray-400 bg-gray-100 text-center text-sm p-1">cassette 2</th>
                    <th className="border border-gray-400 bg-gray-100 text-center text-sm p-1">cassette 3</th>
                    <th className="border border-gray-400 bg-gray-100 text-center text-sm p-1">cassette 4</th>
                    <th className="border border-gray-400 bg-gray-100 text-center text-sm p-1">
                      Observation (couleur, nature composants, forme...)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-400 text-center text-sm p-1">Type du matériau</td>
                    <td className="border border-gray-400 p-1">
                      <Input
                        value={cassette1.typeMateriau}
                        onChange={(e) => setCassette1({ ...cassette1, typeMateriau: e.target.value })}
                        className="border-none h-8 p-1"
                      />
                    </td>
                    <td className="border border-gray-400 p-1">
                      <Input
                        value={cassette2.typeMateriau}
                        onChange={(e) => setCassette2({ ...cassette2, typeMateriau: e.target.value })}
                        className="border-none h-8 p-1"
                      />
                    </td>
                    <td className="border border-gray-400 p-1">
                      <Input
                        value={cassette3.typeMateriau}
                        onChange={(e) => setCassette3({ ...cassette3, typeMateriau: e.target.value })}
                        className="border-none h-8 p-1"
                      />
                    </td>
                    <td className="border border-gray-400 p-1">
                      <Input
                        value={cassette4.typeMateriau}
                        onChange={(e) => setCassette4({ ...cassette4, typeMateriau: e.target.value })}
                        className="border-none h-8 p-1"
                      />
                    </td>
                    <td className="border border-gray-400 p-1" rowSpan={3}>
                      <Textarea
                        value={observations}
                        onChange={(e) => setObservations(e.target.value)}
                        className="border-none h-full resize-none"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 text-center text-sm p-1">
                      Texture (dimension approximative)
                    </td>
                    <td className="border border-gray-400 p-1">
                      <Input
                        value={cassette1.texture}
                        onChange={(e) => setCassette1({ ...cassette1, texture: e.target.value })}
                        className="border-none h-8 p-1"
                      />
                    </td>
                    <td className="border border-gray-400 p-1">
                      <Input
                        value={cassette2.texture}
                        onChange={(e) => setCassette2({ ...cassette2, texture: e.target.value })}
                        className="border-none h-8 p-1"
                      />
                    </td>
                    <td className="border border-gray-400 p-1">
                      <Input
                        value={cassette3.texture}
                        onChange={(e) => setCassette3({ ...cassette3, texture: e.target.value })}
                        className="border-none h-8 p-1"
                      />
                    </td>
                    <td className="border border-gray-400 p-1">
                      <Input
                        value={cassette4.texture}
                        onChange={(e) => setCassette4({ ...cassette4, texture: e.target.value })}
                        className="border-none h-8 p-1"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 text-center text-sm p-1">Classe</td>
                    <td className="border border-gray-400 p-1">
                      <Input
                        value={cassette1.classe}
                        onChange={(e) => setCassette1({ ...cassette1, classe: e.target.value })}
                        className="border-none h-8 p-1"
                      />
                    </td>
                    <td className="border border-gray-400 p-1">
                      <Input
                        value={cassette2.classe}
                        onChange={(e) => setCassette2({ ...cassette2, classe: e.target.value })}
                        className="border-none h-8 p-1"
                      />
                    </td>
                    <td className="border border-gray-400 p-1">
                      <Input
                        value={cassette3.classe}
                        onChange={(e) => setCassette3({ ...cassette3, classe: e.target.value })}
                        className="border-none h-8 p-1"
                      />
                    </td>
                    <td className="border border-gray-400 p-1">
                      <Input
                        value={cassette4.classe}
                        onChange={(e) => setCassette4({ ...cassette4, classe: e.target.value })}
                        className="border-none h-8 p-1"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="mb-4">
                <p className="mb-1">Quelle dénomination donne-t-on à ce type de roche ?</p>
                <p className="mb-1">Réponse :</p>
                <Textarea
                  value={denomination}
                  onChange={(e) => setDenomination(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2 min-h-[60px]"
                />
              </div>
            </div>

            {/* Fiche 2 */}
            <div className="mb-6">
              <p className="font-bold mb-2">Fiche 2 :</p>
              <p className="mb-4 text-sm">
                On vous demande de faire la reconnaissance des quelques roches sédimentaires en vous aidant du diagramme
                et du tableau des roches sédimentaires fournis en séance du TP.
              </p>

              {/* Tableau de réponses pour la Fiche 2 */}
              <table className="w-full border-collapse mb-4">
                <thead>
                  <tr>
                    <th className="border border-gray-400 bg-gray-100 text-center text-sm p-1">
                      critères de reconnaissance
                    </th>
                    <th className="border border-gray-400 bg-gray-100 text-center text-sm p-1">Roche 1</th>
                    <th className="border border-gray-400 bg-gray-100 text-center text-sm p-1">Roche 2</th>
                    <th className="border border-gray-400 bg-gray-100 text-center text-sm p-1">Roche 3</th>
                    <th className="border border-gray-400 bg-gray-100 text-center text-sm p-1">observations</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-400 text-sm p-1">Texture (lisse ou rugueuse ?)</td>
                    <td className="border border-gray-400 p-1">
                      <Input
                        value={roche1.texture}
                        onChange={(e) => setRoche1({ ...roche1, texture: e.target.value })}
                        className="border-none h-8 p-1"
                      />
                    </td>
                    <td className="border border-gray-400 p-1">
                      <Input
                        value={roche2.texture}
                        onChange={(e) => setRoche2({ ...roche2, texture: e.target.value })}
                        className="border-none h-8 p-1"
                      />
                    </td>
                    <td className="border border-gray-400 p-1">
                      <Input
                        value={roche3.texture}
                        onChange={(e) => setRoche3({ ...roche3, texture: e.target.value })}
                        className="border-none h-8 p-1"
                      />
                    </td>
                    <td className="border border-gray-400 p-1" rowSpan={6}>
                      <Textarea
                        value={observationsRoches}
                        onChange={(e) => setObservationsRoches(e.target.value)}
                        className="border-none h-full resize-none"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 text-sm p-1">Réagit à l'acide?</td>
                    <td className="border border-gray-400 p-1">
                      <Input
                        value={roche1.reactionAcide}
                        onChange={(e) => setRoche1({ ...roche1, reactionAcide: e.target.value })}
                        className="border-none h-8 p-1"
                      />
                    </td>
                    <td className="border border-gray-400 p-1">
                      <Input
                        value={roche2.reactionAcide}
                        onChange={(e) => setRoche2({ ...roche2, reactionAcide: e.target.value })}
                        className="border-none h-8 p-1"
                      />
                    </td>
                    <td className="border border-gray-400 p-1">
                      <Input
                        value={roche3.reactionAcide}
                        onChange={(e) => setRoche3({ ...roche3, reactionAcide: e.target.value })}
                        className="border-none h-8 p-1"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 text-sm p-1">
                      Taille des éléments:
                      <br />
                      &gt; ou &lt;2mm?
                    </td>
                    <td className="border border-gray-400 p-1">
                      <Input
                        value={roche1.tailleElements}
                        onChange={(e) => setRoche1({ ...roche1, tailleElements: e.target.value })}
                        className="border-none h-8 p-1"
                      />
                    </td>
                    <td className="border border-gray-400 p-1">
                      <Input
                        value={roche3.tailleElements}
                        onChange={(e) => setRoche3({ ...roche3, tailleElements: e.target.value })}
                        className="border-none h-8 p-1"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 text-sm p-1">contient des fossiles</td>
                    <td className="border border-gray-400 p-1">
                      <Input
                        value={roche1.fossiles}
                        onChange={(e) => setRoche1({ ...roche1, fossiles: e.target.value })}
                        className="border-none h-8 p-1"
                      />
                    </td>
                    <td className="border border-gray-400 p-1">
                      <Input
                        value={roche2.fossiles}
                        onChange={(e) => setRoche2({ ...roche2, fossiles: e.target.value })}
                        className="border-none h-8 p-1"
                      />
                    </td>
                    <td className="border border-gray-400 p-1">
                      <Input
                        value={roche3.fossiles}
                        onChange={(e) => setRoche3({ ...roche3, fossiles: e.target.value })}
                        className="border-none h-8 p-1"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 text-sm p-1">Dureté</td>
                    <td className="border border-gray-400 p-1">
                      <Input
                        value={roche1.durete}
                        onChange={(e) => setRoche1({ ...roche1, durete: e.target.value })}
                        className="border-none h-8 p-1"
                      />
                    </td>
                    <td className="border border-gray-400 p-1">
                      <Input
                        value={roche2.durete}
                        onChange={(e) => setRoche2({ ...roche2, durete: e.target.value })}
                        className="border-none h-8 p-1"
                      />
                    </td>
                    <td className="border border-gray-400 p-1">
                      <Input
                        value={roche3.durete}
                        onChange={(e) => setRoche3({ ...roche3, durete: e.target.value })}
                        className="border-none h-8 p-1"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 text-sm p-1">Cassure</td>
                    <td className="border border-gray-400 p-1">
                      <Input
                        value={roche1.cassure}
                        onChange={(e) => setRoche1({ ...roche1, cassure: e.target.value })}
                        className="border-none h-8 p-1"
                      />
                    </td>
                    <td className="border border-gray-400 p-1">
                      <Input
                        value={roche2.cassure}
                        onChange={(e) => setRoche2({ ...roche2, cassure: e.target.value })}
                        className="border-none h-8 p-1"
                      />
                    </td>
                    <td className="border border-gray-400 p-1">
                      <Input
                        value={roche3.cassure}
                        onChange={(e) => setRoche3({ ...roche3, cassure: e.target.value })}
                        className="border-none h-8 p-1"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

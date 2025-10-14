"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import type { RockSample, ExperimentResult } from "@/types/rocks"

interface ClassificationTableProps {
  rockSamples: RockSample[]
  experimentResults: ExperimentResult[]
}

export default function ClassificationTable({ rockSamples, experimentResults }: ClassificationTableProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredRocks = rockSamples.filter(
    (rock) =>
      rock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rock.type.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Get the latest experiment results for each rock
  const getLatestResult = (rockId: string, type: string) => {
    const results = experimentResults
      .filter((result) => result.rockId === rockId && result.experimentType === type)
      .sort((a, b) => b.timestamp - a.timestamp)

    return results.length > 0 ? results[0].result : "-"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl">Tableau de Classification des Roches</CardTitle>
        <CardDescription className="text-sm">Comparez les caractéristiques des différentes roches</CardDescription>

        <div className="relative mt-2">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher des roches..."
            className="pl-8 bg-background text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader className="bg-secondary/50">
              <TableRow>
                <TableHead className="text-xs sm:text-sm">Nom</TableHead>
                <TableHead className="text-xs sm:text-sm">Type</TableHead>
                <TableHead className="text-xs sm:text-sm hidden sm:table-cell">Granulométrie</TableHead>
                <TableHead className="text-xs sm:text-sm hidden md:table-cell">Réaction à l'Acide</TableHead>
                <TableHead className="text-xs sm:text-sm hidden lg:table-cell">Dureté</TableHead>
                <TableHead className="text-xs sm:text-sm hidden xl:table-cell">Texture</TableHead>
                <TableHead className="text-xs sm:text-sm hidden xl:table-cell">Fossiles</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRocks.map((rock) => (
                <TableRow key={rock.id}>
                  <TableCell className="font-medium text-xs sm:text-sm">{rock.name}</TableCell>
                  <TableCell className="text-xs sm:text-sm">{rock.type}</TableCell>
                  <TableCell className="text-xs sm:text-sm hidden sm:table-cell">
                    {getLatestResult(rock.id, "granulometry") !== "-"
                      ? getLatestResult(rock.id, "granulometry")
                      : rock.grainSize}
                  </TableCell>
                  <TableCell className="text-xs sm:text-sm hidden md:table-cell">
                    {getLatestResult(rock.id, "acid") !== "-"
                      ? getLatestResult(rock.id, "acid")
                      : rock.acidReaction === "strong"
                        ? "Forte effervescence"
                        : rock.acidReaction === "weak"
                          ? "Faible effervescence"
                          : "Aucune réaction"}
                  </TableCell>
                  <TableCell className="text-xs sm:text-sm hidden lg:table-cell">
                    {getLatestResult(rock.id, "hardness") !== "-"
                      ? getLatestResult(rock.id, "hardness")
                      : `${rock.hardness} (Mohs)`}
                  </TableCell>
                  <TableCell className="text-xs sm:text-sm hidden xl:table-cell">
                    {getLatestResult(rock.id, "texture") !== "-"
                      ? getLatestResult(rock.id, "texture")
                      : rock.texture === "rough"
                        ? "Rugueuse"
                        : "Lisse"}
                  </TableCell>
                  <TableCell className="text-xs sm:text-sm hidden xl:table-cell">
                    {getLatestResult(rock.id, "fossil") !== "-"
                      ? getLatestResult(rock.id, "fossil")
                      : rock.hasFossils
                        ? "Présents"
                        : "Absents"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

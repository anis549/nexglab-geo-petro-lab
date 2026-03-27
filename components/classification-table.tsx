"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import type { RockSample, ExperimentResult } from "@/types/rocks"
import { getSafeRockData, formatRockDataForDisplay } from "@/utils/safe-rock-data"

interface ClassificationTableProps {
  rockSamples: RockSample[]
  experimentResults: ExperimentResult[]
}

export default function ClassificationTable({ rockSamples, experimentResults }: ClassificationTableProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredRocks = useMemo(() => 
    rockSamples.filter(
      (rock) =>
        rock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rock.type.toLowerCase().includes(searchTerm.toLowerCase()),
    ),
  [rockSamples, searchTerm])

  // ─────────────────────────────────────────────────────────────
  // PERFORMANCE: Cache safe data per rock row (computed once)
  // This ensures we call getSafeRockData() ONCE per rock, not multiple times
  // ─────────────────────────────────────────────────────────────
  const rowDataCache = useMemo(() => {
    const cache: Record<string, Record<string, string>> = {}
    
    filteredRocks.forEach((rock) => {
      // SINGLE call to getSafeRockData per rock
      const safeData = getSafeRockData(rock, experimentResults)
      // Format for display (adds "(Mohs)" label to hardness, etc)
      cache[rock.id] = formatRockDataForDisplay(safeData)
    })
    
    return cache
  }, [filteredRocks, experimentResults])

  // ─────────────────────────────────────────────────────────────
  // DISPLAY: Get cached value for cell (already formatted and safe)
  // ─────────────────────────────────────────────────────────────
  function getCellValue(rockId: string, fieldName: string): string {
    return rowDataCache[rockId]?.[fieldName] ?? "—"
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
                    {getCellValue(rock.id, "granulometry")}
                  </TableCell>
                  <TableCell className="text-xs sm:text-sm hidden md:table-cell">
                    {getCellValue(rock.id, "acid")}
                  </TableCell>
                  <TableCell className="text-xs sm:text-sm hidden lg:table-cell">
                    {getCellValue(rock.id, "hardness")}
                  </TableCell>
                  <TableCell className="text-xs sm:text-sm hidden xl:table-cell">
                    {getCellValue(rock.id, "texture")}
                  </TableCell>
                  <TableCell className="text-xs sm:text-sm hidden xl:table-cell">
                    {getCellValue(rock.id, "fossil")}
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

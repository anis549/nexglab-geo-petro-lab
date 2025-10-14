"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Search } from "lucide-react"
import type { RockSample } from "@/types/rocks"
import DetailedRockViewer from "./detailed-rock-viewer"
import Image from "next/image"

interface RockViewerProps {
  rockSamples: RockSample[]
  selectedRock: RockSample | null
  onSelectRock: (rock: RockSample) => void
}

export default function RockViewer({ rockSamples, selectedRock, onSelectRock }: RockViewerProps) {
  const [magnifyMode, setMagnifyMode] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredRocks = rockSamples.filter(
    (rock) =>
      rock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rock.type.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="lg:col-span-1 space-y-4">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            placeholder="Rechercher des échantillons..."
            className="pl-8 h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="h-[500px] overflow-y-auto space-y-2 pr-2">
          {filteredRocks.map((rock) => (
            <Card
              key={rock.id}
              className={`cursor-pointer transition-colors ${
                selectedRock?.id === rock.id ? "border-primary bg-accent/30" : "bg-card"
              }`}
              onClick={() => onSelectRock(rock)}
            >
              <CardContent className="p-3 flex items-center space-x-3">
                <div className="w-16 h-16 bg-geology-strata rounded-md overflow-hidden flex-shrink-0">
                  <img
                    src={rock.thumbnailPath || "/placeholder.svg?height=64&width=64"}
                    alt={rock.name}
                    className="w-full h-full object-cover text-orange-800 bg-amber-800"
                  />
                </div>
                <div className="flex items-center space-x-2 flex-1 min-w-0 border-2 border-red-700 shadow-lg rounded-xl bg-neutral-50 border-solid">
                  <Image src="/images/rock-icon.png" alt="Rock icon" width={24} height={24} className="flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-medium truncate">{rock.name}</h3>
                    <p className="text-sm text-muted-foreground truncate">{rock.type}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="lg:col-span-2">
        <Card className="h-[600px]">
          <CardContent className="p-0 h-full">
            {selectedRock ? (
              <div className="h-full flex flex-col">
                <div className="flex-1 min-h-0">
                  <DetailedRockViewer rock={selectedRock} showControls={true} showInfo={true} height="100%" />
                </div>

                <div className="p-4 bg-muted/50">
                  <h2 className="text-xl font-bold">{selectedRock.name}</h2>
                  <p className="text-sm text-muted-foreground mt-1">{selectedRock.description}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                    <div className="text-sm">
                      <span className="font-medium">Couleur:</span> {selectedRock.color}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Taille des grains:</span> {selectedRock.grainSize}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <p className="text-muted-foreground">Sélectionnez un échantillon pour commencer</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

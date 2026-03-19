"use client"

import { useState, useMemo } from "react"
import type { RockSample } from "@/types/rocks"
import { Sidebar } from "./lab/sidebar"
import { Workspace } from "./lab/workspace"

interface RockViewerProps {
  rockSamples: RockSample[]
  selectedRock: RockSample | null
  onSelectRock: (rock: RockSample) => void
}

export default function RockViewer({ rockSamples, selectedRock, onSelectRock }: RockViewerProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredRocks = useMemo(() => {
    return rockSamples.filter(
      (rock) =>
        rock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rock.type.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }, [rockSamples, searchTerm])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full min-h-[600px] w-full">
      <div className="lg:col-span-1 h-full min-h-0">
        <Sidebar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filteredRocks={filteredRocks}
          selectedRock={selectedRock}
          onSelectRock={onSelectRock}
        />
      </div>

      <div className="lg:col-span-3 h-full min-h-0">
        <Workspace selectedRock={selectedRock} />
      </div>
    </div>
  )
}

"use client"

import Sidebar from "./Sidebar"
import Workspace from "./Workspace"
import type { RockSample } from "@/types/rocks"

interface LabWorkspaceProps {
  rockSamples: RockSample[]
}

export default function LabWorkspace({ rockSamples }: LabWorkspaceProps) {
  return (
    <div className="grid min-h-[560px] gap-4 lg:grid-cols-[320px_1fr]">
      <Sidebar rockSamples={rockSamples} />
      <Workspace selectedRock={null} />
    </div>
  )
}

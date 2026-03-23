"use client"

import { useState } from "react"
import { Sidebar } from "./Sidebar"
import { Workspace } from "./Workspace"
import type { RockSample } from "@/types/rocks"
import { useLabStore } from "@/store/useLabStore"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

interface LabWorkspaceProps {
  rockSamples: RockSample[]
}

export default function LabWorkspace({ rockSamples }: LabWorkspaceProps) {
  const { selectedRock } = useLabStore()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-full min-h-[600px] lg:min-h-[800px] glass rounded-3xl shadow-glow-xl overflow-hidden relative backdrop-blur-xl">
      {/* Enhanced Mobile Toggle */}
      <div className="lg:hidden absolute top-6 left-6 z-20 glass p-3 rounded-2xl shadow-glow-primary ring-1 ring-white/20">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 hover:scale-110 glow-hover"
        >
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Premium Glass Sidebar */}
      <div className={`
        fixed lg:relative inset-y-0 left-0 z-30 lg:z-10
        w-80 lg:w-[420px]
        glass backdrop-blur-xl rounded-r-3xl lg:rounded-r-none shadow-glow-xl lg:shadow-glow-xl
        border-r border-white/20 ring-1 ring-[#2fa4ff]/20 lg:float-glass hover:shadow-glow-xl
        transform transition-all duration-500 ease-out
        ${sidebarOpen ? 'translate-x-0 scale-100' : '-translate-x-full lg:translate-x-0 scale-95 lg:scale-100'}
        flex flex-col animate-float-in
      `}>
        <div className="flex-1 overflow-hidden flex flex-col min-h-0 p-1">
          <Sidebar rockSamples={rockSamples} onCloseMobile={() => setSidebarOpen(false)} />
        </div>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-10 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Workspace - improved responsive sizing */}
      <div className="flex-1 min-w-0 relative overflow-hidden">
        <Workspace selectedRock={selectedRock} />
      </div>
    </div>
  )
}

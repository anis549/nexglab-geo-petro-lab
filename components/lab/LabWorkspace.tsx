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
    <div
      className="flex h-full min-h-[600px] lg:min-h-[800px] rounded-2xl overflow-hidden relative"
      style={{
        background: "linear-gradient(145deg, rgba(255,255,255,0.045) 0%, rgba(255,255,255,0.015) 100%)",
        backdropFilter: "blur(28px)",
        WebkitBackdropFilter: "blur(28px)",
        border: "1px solid rgba(255,255,255,0.075)",
        boxShadow: "0 0 0 1px rgba(0,180,255,0.06) inset, 0 8px 60px rgba(0,40,140,0.25)",
      }}
    >
      {/* ── Top edge glint ── */}
      <div
        className="absolute top-0 left-12 right-12 h-px rounded-full pointer-events-none z-10"
        style={{ background: "linear-gradient(90deg, transparent, rgba(0,200,255,0.25), transparent)" }}
      />

      {/* ── Mobile Toggle ── */}
      <div className="lg:hidden absolute top-5 left-5 z-20">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
          style={{
            background: "linear-gradient(135deg, rgba(0,80,200,0.4) 0%, rgba(0,160,255,0.25) 100%)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(0,200,255,0.25)",
            boxShadow: "0 0 12px rgba(0,150,255,0.2)",
            color: "rgba(180,225,255,0.9)",
          }}
        >
          {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {/* ── Sidebar panel ── */}
      <div
        className={`
          fixed lg:relative inset-y-0 left-0 z-30 lg:z-10
          w-80 lg:w-[380px]
          transform transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          flex flex-col
        `}
        style={{
          background: "linear-gradient(180deg, rgba(4,16,40,0.95) 0%, rgba(3,12,32,0.98) 100%)",
          backdropFilter: "blur(32px)",
          WebkitBackdropFilter: "blur(32px)",
          borderRight: "1px solid rgba(0,180,255,0.1)",
          boxShadow: "4px 0 30px rgba(0,30,100,0.3)",
        }}
      >
        {/* Sidebar inner top glow */}
        <div
          className="absolute top-0 left-0 right-0 h-px pointer-events-none"
          style={{ background: "linear-gradient(90deg, transparent, rgba(0,180,255,0.2), transparent)" }}
        />
        <div className="flex-1 overflow-hidden flex flex-col min-h-0">
          <Sidebar rockSamples={rockSamples} onCloseMobile={() => setSidebarOpen(false)} />
        </div>
      </div>

      {/* ── Mobile overlay ── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-10 lg:hidden"
          style={{ background: "rgba(2,8,20,0.65)", backdropFilter: "blur(4px)" }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Main workspace area ── */}
      <div className="flex-1 min-w-0 relative overflow-hidden">
        {/* Subtle inner left glow border */}
        <div
          className="absolute left-0 top-8 bottom-8 w-px pointer-events-none"
          style={{ background: "linear-gradient(180deg, transparent, rgba(0,180,255,0.12), transparent)" }}
        />
        <Workspace selectedRock={selectedRock} />
      </div>
    </div>
  )
}

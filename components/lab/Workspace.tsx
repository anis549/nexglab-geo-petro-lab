"use client"

import React, { memo, Suspense } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Ruler, TestTube, Hammer, Search, Bug } from "lucide-react"
import type { RockSample } from "@/types/rocks"
import { WorkspaceEmptyState } from "./workspace-empty-state"
import { LabModeSelector } from "./LabModeSelector"
import { Viewer } from "./Viewer"
import { useLabStore } from "@/store/useLabStore"
import { useLabMode } from "@/hooks/useLabMode"

interface WorkspaceProps {
  selectedRock: RockSample | null
}

export const Workspace = memo(function Workspace({ selectedRock }: WorkspaceProps) {
  const { labMode } = useLabMode()

  if (!selectedRock) {
    return (
      <div className="h-full glass rounded-3xl p-12 flex flex-col items-center justify-center backdrop-blur-xl shadow-glow-xl border border-border/20">
        <Suspense fallback={<div className="animate-pulse">Loading...</div>}>
          <WorkspaceEmptyState />
        </Suspense>
      </div>
    )
  }

  return (
    <div className="h-full grid grid-cols-1 lg:grid-cols-3 gap-6 p-4 lg:p-8 bg-background/50 rounded-3xl shadow-glow-xl">
      {/* Left Panel - Rock Info */}
      <div className="lg:col-span-1 space-y-4">
        <div className="glass p-6 rounded-2xl shadow-md border border-border/40 h-full flex flex-col">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 rounded-xl overflow-hidden ring-2 ring-primary/50 shadow-lg flex-shrink-0">
              <img src={selectedRock.image} alt={selectedRock.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold text-foreground truncate">{selectedRock.name}</h2>
              <p className="text-sm font-medium text-muted-foreground capitalize">{selectedRock.type}</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground flex-1 leading-relaxed">{selectedRock.description}</p>
          <div className="flex flex-wrap gap-2 pt-4 mt-auto">
            <Badge variant="secondary" className="text-xs">Dureté: {selectedRock.hardness}</Badge>
            <Badge variant="outline" className="text-xs">{selectedRock.grainSize}</Badge>
            <Badge variant="default" className="text-xs">{selectedRock.texture}</Badge>
            {selectedRock.hasFossils && <Badge variant="destructive" className="text-xs">Fossiles</Badge>}
          </div>
        </div>
      </div>

      {/* Center - 3D Viewer */}
      <div className="lg:col-span-1 lg:col-start-2 row-span-full">
        <div className="sticky top-4 space-y-4">
          <LabModeSelector />
          <div className="glass rounded-2xl p-2 border border-border/50 shadow-lg">
            <Viewer modelPath={selectedRock.model3D} />
          </div>
        </div>
      </div>

      {/* Right Panel - Tools */}
      <div className="lg:col-span-1 space-y-4">
        <div className="glass p-6 rounded-2xl border border-border/40 shadow-md">
          <h3 className="text-lg font-semibold text-foreground mb-6">Outils Scientifiques</h3>
          <div className="space-y-3">
            {[
              { Icon: Ruler, label: 'Granulométrie', desc: 'Analyse grains', type: 'granulometry' },
              { Icon: TestTube, label: 'Test HCl', desc: 'Réaction acide', type: 'acid' },
              { Icon: Hammer, label: 'Dureté', desc: 'Échelle Mohs', type: 'hardness' },
              { Icon: Search, label: 'Texture', desc: 'Surface', type: 'texture' },
              { Icon: Bug, label: 'Fossiles', desc: 'Détection', type: 'fossil' },
            ].map(({ Icon, label, desc, type }) => (
              <Button 
                key={type} 
                variant="ghost" 
                className="w-full justify-start gap-4 p-4 rounded-xl hover:bg-muted/50 hover:shadow-md transition-all group bg-card/70 border border-border/30"
                onClick={() => console.log(`${label} sur ${selectedRock.name}`)}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-foreground">{label}</span>
                  <span className="text-xs text-muted-foreground">{desc}</span>
                </div>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
})

Workspace.displayName = 'Workspace'


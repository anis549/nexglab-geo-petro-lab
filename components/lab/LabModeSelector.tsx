"use client"

import { memo } from "react"
import { Button } from "@/components/ui/button"
import { Eye, Microscope, BarChart3 } from "lucide-react"
import { useLabMode } from "@/hooks/useLabMode"
import type { LabMode } from "@/store/useLabStore"

const modeConfig = {
  observation: {
    icon: Eye,
    label: "Observation",
    description: "Visual inspection and basic analysis",
  },
  analysis: {
    icon: BarChart3,
    label: "Analysis",
    description: "Detailed property analysis",
  },
  microscope: {
    icon: Microscope,
    label: "Microscope",
    description: "High-magnification examination",
  },
}

interface LabModeSelectorProps {
  className?: string
}

export const LabModeSelector = memo(function LabModeSelector({ className }: LabModeSelectorProps) {
  const { labMode, switchMode } = useLabMode()

  return (
    <div className={`flex gap-1 p-1 bg-muted/50 rounded-lg border border-border/50 ${className}`}>
      {(Object.keys(modeConfig) as LabMode[]).map((mode) => {
        const config = modeConfig[mode]
        const Icon = config.icon
        const isActive = labMode === mode

        return (
          <Button
            key={mode}
            variant="ghost"
            size="sm"
            onClick={() => switchMode(mode)}
            className={`flex items-center gap-2 px-3 py-2 text-xs font-medium transition-all duration-200 rounded-md ${
              isActive
                ? "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90"
                : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
            }`}
          >
            <Icon className="h-4 w-4" />
            <span className="hidden sm:inline">{config.label}</span>
          </Button>
        )
      })}
    </div>
  )
})

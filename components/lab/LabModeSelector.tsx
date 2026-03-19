"use client"

import { memo } from "react"
import { Button } from "@/components/ui/button"
import { Eye, Microscope, BarChart3 } from "lucide-react"
import { useLabMode } from "@/hooks/useLabMode"
import type { LabMode } from "@/store/lab-store"

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
    <div className={`flex gap-2 ${className}`}>
      {(Object.keys(modeConfig) as LabMode[]).map((mode) => {
        const config = modeConfig[mode]
        const Icon = config.icon
        const isActive = labMode === mode

        return (
          <Button
            key={mode}
            variant={isActive ? "default" : "outline"}
            size="sm"
            onClick={() => switchMode(mode)}
            className={`flex items-center gap-2 transition-all ${
              isActive
                ? "bg-primary text-primary-foreground shadow-sm"
                : "hover:bg-secondary/80"
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

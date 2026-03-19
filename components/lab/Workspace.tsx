import React, { Suspense } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Flask, Microscope } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import type { RockSample } from "@/types/rocks"
import DetailedRockViewer from "@/components/detailed-rock-viewer"
import { WorkspaceEmptyState } from "./workspace-empty-state"
import { LabModeSelector } from "./LabModeSelector"
import { ViewerLoadingState } from "./ViewerLoadingState"
import { useLabMode } from "@/hooks/useLabMode"
import { useViewerLoading } from "@/hooks/useViewerLoading"

interface WorkspaceProps {
  selectedRock: RockSample | null
}

function LoadingSkeleton() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>
    </div>
  )
}
  const { labMode } = useLabMode()
  const { isViewerLoading } = useViewerLoading()

  if (isViewerLoading) {
    return <ViewerLoadingState />
  }

  switch (labMode) {
    case "observation":
      return (
        <Suspense fallback={<ViewerLoadingState />}>
          <DetailedRockViewer rock={selectedRock} showControls={true} showInfo={false} height="100%" />
        </Suspense>
      )
    case "analysis":
      return (
        <div className="p-6 h-full flex items-center justify-center">
          <div className="text-center">
            <Flask className="h-16 w-16 mx-auto text-teal-500 mb-4" />
            <h3 className="text-lg font-semibold">Analysis Mode</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Chemical analysis tools will be available here.
            </p>
          </div>
        </div>
      )
    case "microscope":
      return (
        <div className="p-6 h-full flex items-center justify-center">
          <div className="text-center">
            <Microscope className="h-16 w-16 mx-auto text-teal-500 mb-4" />
            <h3 className="text-lg font-semibold">Microscope Mode</h3>
            <p className="text-sm text-muted-foreground mt-2">
              High-resolution microscopic examination tools.
            </p>
          </div>
        </div>
      )
    default:
      return null
  }
}

export function Workspace({ selectedRock }: WorkspaceProps) {
  return (
    <Card className="h-full overflow-hidden border-zinc-200 shadow-sm rounded-2xl bg-white flex flex-col">
      <CardContent className="p-0 flex-1 flex flex-col min-h-0">
        {!selectedRock ? (
          <div className="flex-1 p-8 flex flex-col">
            <WorkspaceEmptyState />
          </div>
        ) : (
          <div className="flex-1 flex flex-col min-h-0 bg-zinc-50/30">
            {/* Header with mode selector */}
            <div className="px-6 py-5 bg-white border-b border-zinc-100 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] z-10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold tracking-tight text-zinc-900">
                  {selectedRock.name}
                </h2>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-50 text-teal-700 border border-teal-200 shadow-sm">
                  {selectedRock.type}
                </span>
              </div>
              <LabModeSelector />
            </div>

            {/* Mode-specific content */}
            <div className="flex-1 min-h-0 relative">
              <ModeContent selectedRock={selectedRock} />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}



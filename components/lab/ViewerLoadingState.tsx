"use client"

import { Loader2 } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

export function ViewerLoadingState() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="space-y-4 text-center">
        <div className="flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-teal-500" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-32 mx-auto" />
          <Skeleton className="h-3 w-24 mx-auto" />
        </div>
        <p className="text-sm text-muted-foreground">Loading 3D model...</p>
      </div>
    </div>
  )
}

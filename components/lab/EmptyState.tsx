"use client"

import { Cube } from "lucide-react"

export default function EmptyState() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-border bg-background/60 p-10 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Cube className="h-8 w-8" />
      </div>
      <div>
        <h2 className="text-lg font-semibold text-foreground">Aucun échantillon sélectionné</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Choisissez un échantillon dans la liste pour commencer à l'explorer en 3D.
        </p>
      </div>
    </div>
  )
}

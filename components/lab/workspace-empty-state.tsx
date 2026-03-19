import React from "react"
import { Microscope, ArrowRight, Search } from "lucide-react"

export function WorkspaceEmptyState() {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center p-6 bg-zinc-50/50 rounded-2xl border border-dashed border-zinc-200 my-auto transition-all hover:bg-zinc-50/70">
      <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center mb-5 text-zinc-400 ring-1 ring-zinc-200 transition-colors hover:bg-zinc-200">
        <Microscope className="w-8 h-8 opacity-75" />
      </div>
      <h3 className="text-xl font-bold text-zinc-900 mb-2">No Sample Selected</h3>
      <p className="text-sm text-zinc-500 max-w-[300px] leading-relaxed mb-4">
        Select a rock specimen from the sidebar library to begin your detailed petrographic analysis in 3D.
      </p>
      <div className="flex items-center gap-2 text-xs text-zinc-400">
        <Search className="w-4 h-4" />
        <span>Try searching for "sandstone" or "limestone"</span>
        <ArrowRight className="w-4 h-4" />
      </div>
    </div>
  )
}

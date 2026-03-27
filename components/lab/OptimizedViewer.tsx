"use client"

import dynamic from 'next/dynamic'
import React from 'react'

// Dynamic import - no SSR
const ViewerCanvas = dynamic(
  () => import('./Viewer').then((mod) => ({ default: mod.Viewer })),
  { 
    ssr: false,
    loading: () => (
      <div className="flex h-full items-center justify-center rounded-2xl bg-gradient-to-br from-slate-900/50 to-slate-950/50 border border-slate-800/50">
        <div className="w-12 h-12 rounded-2xl border-2 border-slate-700/50 border-t-blue-400 animate-spin" />
      </div>
    )
  }
)

export const OptimizedViewer = ViewerCanvas


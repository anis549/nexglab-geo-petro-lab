import React from "react"
import { Microscope, ArrowRight, Search, Sparkles } from "lucide-react"

export function WorkspaceEmptyState() {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-gradient-to-br from-muted/20 via-background to-muted/10 rounded-xl border border-dashed border-border/50 transition-all duration-300 hover:bg-gradient-to-br hover:from-muted/30 hover:via-background hover:to-muted/20 hover:border-border/70 hover:shadow-md">
      <div className="relative">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-6 text-primary border border-primary/20 shadow-lg animate-in zoom-in-50 duration-500">
          <Microscope className="w-12 h-12" />
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-highlight/20 flex items-center justify-center animate-pulse">
          <Sparkles className="w-4 h-4 text-highlight" />
        </div>
      </div>

      <h3 className="text-2xl font-bold text-foreground mb-3 animate-in slide-in-from-bottom-4 duration-500 delay-100">
        Aucun échantillon sélectionné
      </h3>
      <p className="text-base text-muted-foreground max-w-md leading-relaxed mb-8 animate-in slide-in-from-bottom-4 duration-500 delay-200">
        Sélectionnez un échantillon de roche dans la bibliothèque latérale pour commencer votre analyse pétrographique détaillée en 3D.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 items-center animate-in slide-in-from-bottom-4 duration-500 delay-300">
        <div className="flex items-center gap-2 text-sm text-muted-foreground bg-card/50 px-4 py-3 rounded-lg border border-border/30 shadow-sm hover:bg-card/70 transition-colors duration-200">
          <Search className="w-4 h-4" />
          <span>Essayez de rechercher "grès" ou "calcaire"</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>

      <div className="mt-8 text-xs text-muted-foreground/60 animate-in fade-in duration-500 delay-500">
        Laboratoire virtuel de pétrographie • Analyse 3D interactive
      </div>
    </div>
  )
}

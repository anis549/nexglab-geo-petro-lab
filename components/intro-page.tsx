"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"
import AnimatedTechBackground from "./animated-tech-background"
import Image from "next/image"

interface IntroPageProps {
  onEnter: () => void
}

export default function IntroPage({ onEnter }: IntroPageProps) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simuler un temps de chargement pour l'effet visuel
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background overflow-hidden">
      {/* Animated Technology Background */}
      <AnimatedTechBackground />

      {/* Contenu principal */}
      <motion.div
        className="relative z-10 max-w-4xl px-6 py-12 text-center flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {/* NexGlab Logo - Prominent and Clear */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-8"
        >
          <Image
            src="/images/nexglab-logo.png"
            alt="NexGlab - Next Generation Laboratory"
            width={400}
            height={133}
            className="w-[300px] sm:w-[380px] md:w-[420px] h-auto"
            priority
            style={{
              filter: "drop-shadow(0 8px 24px rgba(0, 0, 0, 0.15))",
            }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="space-y-4"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground px-4">
            TP3 – Laboratoire Virtuel de Pétrographie
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-4 leading-relaxed">
            Exploration interactive des roches sédimentaires et de leurs propriétés en géologie appliquée
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="mt-12"
        >
          <Button
            onClick={onEnter}
            disabled={isLoading}
            className="relative px-8 py-6 text-lg font-medium bg-primary hover:bg-primary/90 text-primary-foreground border-0 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 hover:scale-105"
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-3"></div>
                <span>Chargement...</span>
              </div>
            ) : (
              <div className="flex items-center">
                <span>COMMENCER LE TP</span>
                <ChevronRight className="ml-3 h-5 w-5" />
              </div>
            )}
          </Button>
        </motion.div>

        {/* Éléments décoratifs */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-[#F4F1ED]/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.3,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Élément décoratif: coupe géologique stylisée */}
      <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-24 overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-24 bg-gradient-to-t from-[#1B1B1B] to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-8 sm:h-12 bg-[#8B5E3C]/10"></div>
        <div className="absolute bottom-0 left-0 right-0 h-6 sm:h-8 bg-[#8B5E3C]/15"></div>
        <div className="absolute bottom-0 left-0 right-0 h-3 sm:h-4 bg-[#8B5E3C]/20"></div>
      </div>
    </div>
  )
}

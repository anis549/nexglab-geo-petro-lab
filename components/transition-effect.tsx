"use client"

import type React from "react"

import { motion } from "framer-motion"

interface TransitionEffectProps {
  isVisible: boolean
  children: React.ReactNode
}

export default function TransitionEffect({ isVisible, children }: TransitionEffectProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  )
}

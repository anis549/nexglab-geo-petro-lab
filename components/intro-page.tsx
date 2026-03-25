"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ChevronRight, Atom } from "lucide-react"
import AnimatedTechBackground from "./animated-tech-background"
import Image from "next/image"

interface IntroPageProps {
  onEnter: () => void
}

function GlowBlob({
  className,
  delay = 0,
  duration = 8,
}: {
  className: string
  delay?: number
  duration?: number
}) {
  return (
    <motion.div
      className={`absolute rounded-full blur-[120px] pointer-events-none ${className}`}
      animate={{
        scale: [1, 1.15, 1],
        x: [0, 20, -10, 0],
        y: [0, -15, 10, 0],
        opacity: [0.22, 0.38, 0.22],
      }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  )
}

function ScanLines() {
  return (
    <div
      className="absolute inset-0 pointer-events-none z-10 opacity-[0.035]"
      style={{
        backgroundImage:
          "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(6,182,212,0.6) 2px, rgba(6,182,212,0.6) 3px)",
        backgroundSize: "100% 3px",
      }}
    />
  )
}

function CornerBrackets() {
  return (
    <>
      <span className="absolute top-4 left-4 w-5 h-5 border-t-[1.5px] border-l-[1.5px] border-cyan-400/50" />
      <span className="absolute top-4 right-4 w-5 h-5 border-t-[1.5px] border-r-[1.5px] border-cyan-400/50" />
      <span className="absolute bottom-4 left-4 w-5 h-5 border-b-[1.5px] border-l-[1.5px] border-cyan-400/50" />
      <span className="absolute bottom-4 right-4 w-5 h-5 border-b-[1.5px] border-r-[1.5px] border-cyan-400/50" />
    </>
  )
}

function DataLine({ delay }: { delay: number }) {
  return (
    <motion.div
      className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"
      animate={{ scaleX: [0, 1, 1, 0], opacity: [0, 0.5, 0.5, 0] }}
      transition={{ duration: 3, delay, repeat: Infinity, repeatDelay: 6, ease: "easeInOut" }}
    />
  )
}

export default function IntroPage({ onEnter }: IntroPageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 28,
        y: (e.clientY / window.innerHeight - 0.5) * 18,
      })
    }
    window.addEventListener("mousemove", handleMouse)
    return () => window.removeEventListener("mousemove", handleMouse)
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#020510]">

      {/* Existing AnimatedTechBackground – toned down */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <AnimatedTechBackground />
      </div>

      {/* Deep radial base */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 100% 70% at 50% 0%, #071530 0%, #020510 60%, #000000 100%)",
        }}
      />

      {/* Layered radial glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] rounded-full bg-[#0a2060] blur-[220px] opacity-25" />
        <div className="absolute top-1/2 -translate-y-1/2 -left-48 w-[600px] h-[700px] rounded-full bg-[#0e3d6e] blur-[200px] opacity-18" />
        <div className="absolute top-1/2 -translate-y-1/2 -right-48 w-[600px] h-[700px] rounded-full bg-[#071f3d] blur-[200px] opacity-18" />
        <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-[#040e20] blur-[180px] opacity-30" />
      </div>

      {/* Animated blobs */}
      <GlowBlob className="w-96 h-96 bg-cyan-500 opacity-25 top-12 right-12" delay={0} duration={10} />
      <GlowBlob className="w-80 h-80 bg-blue-600 opacity-20 bottom-20 left-16" delay={2} duration={12} />
      <GlowBlob className="w-64 h-64 bg-sky-400 opacity-18 top-1/3 -left-20" delay={1.5} duration={9} />
      <GlowBlob className="w-72 h-72 bg-indigo-600 opacity-20 bottom-10 right-1/4" delay={3} duration={11} />
      <GlowBlob className="w-48 h-48 bg-teal-400 opacity-15 top-16 left-1/3" delay={0.5} duration={7} />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.055]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(6,182,212,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.5) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Scanlines */}
      <ScanLines />

      {/* Slow orbit rings (decorative) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
        <motion.div
          className="rounded-full border border-cyan-500/8"
          style={{ width: 780, height: 780 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute rounded-full border border-sky-400/5"
          style={{ width: 1060, height: 1060 }}
          animate={{ rotate: -360 }}
          transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* ── HERO CARD ── */}
      <motion.div
        className="relative z-10 w-full max-w-[720px] mx-4"
        initial={{ opacity: 0, y: 50, scale: 0.94 }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
          x: mousePos.x * 0.25,
        }}
        transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        style={{ y: mousePos.y * 0.18 }}
      >
        {/* Glass panel */}
        <div
          className="relative rounded-[28px] overflow-hidden"
          style={{
            background:
              "linear-gradient(145deg, rgba(255,255,255,0.065) 0%, rgba(255,255,255,0.022) 40%, rgba(6,182,212,0.045) 100%)",
            backdropFilter: "blur(48px)",
            WebkitBackdropFilter: "blur(48px)",
            border: "1px solid rgba(6,182,212,0.20)",
            boxShadow:
              "0 0 0 1px rgba(255,255,255,0.045) inset, 0 48px 140px rgba(0,0,0,0.65), 0 0 90px rgba(6,182,212,0.065)",
          }}
        >
          {/* Inner top light edge */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-300/55 to-transparent" />

          {/* Animated data scan lines */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute w-full" style={{ top: "28%" }}>
              <DataLine delay={2.5} />
            </div>
            <div className="absolute w-full" style={{ top: "72%" }}>
              <DataLine delay={6} />
            </div>
          </div>

          {/* Corner brackets */}
          <CornerBrackets />

          {/* Inner subtle side gradients for depth */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(6,182,212,0.06) 0%, transparent 100%)",
            }}
          />

          {/* ── CONTENT ── */}
          <div className="relative z-10 flex flex-col items-center text-center px-8 py-14 sm:px-14 sm:py-16">

            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mb-9 flex items-center gap-2 px-4 py-[7px] rounded-full"
              style={{
                background: "rgba(6,182,212,0.08)",
                border: "1px solid rgba(6,182,212,0.22)",
                backdropFilter: "blur(12px)",
              }}
            >
              <Atom className="w-3 h-3 text-cyan-400" />
              <span className="text-[10.5px] font-semibold tracking-[0.22em] text-cyan-300/75 uppercase">
                NexGLab · Sciences Géologiques
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse ml-0.5" />
            </motion.div>

            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: -12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.95, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="mb-10 relative"
            >
              <div className="absolute inset-0 blur-3xl bg-cyan-400/15 rounded-full scale-125 pointer-events-none" />
              <Image
                src="/images/nexglab-logo.png"
                alt="NexGlab - Next Generation Laboratory"
                width={400}
                height={133}
                className="relative w-[230px] sm:w-[290px] md:w-[330px] h-auto"
                style={{ filter: "drop-shadow(0 0 28px rgba(6,182,212,0.45))" }}
                priority
              />
            </motion.div>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.82 }}
              className="space-y-3 mb-10"
            >
              <h1
                className="text-[2.4rem] sm:text-5xl md:text-[3.25rem] font-black leading-[1.08] tracking-tight"
                style={{
                  background:
                    "linear-gradient(140deg, #e0f8ff 0%, #67e8f9 35%, #bfdbfe 65%, #ffffff 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: "drop-shadow(0 0 32px rgba(6,182,212,0.28))",
                }}
              >
                Laboratoire Virtuel
                <br />
                <span
                  style={{
                    background:
                      "linear-gradient(90deg, #22d3ee 0%, #38bdf8 45%, #818cf8 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  de Pétrographie
                </span>
              </h1>

              <p className="text-[14.5px] sm:text-[15px] text-slate-400/85 max-w-md mx-auto leading-relaxed font-light tracking-wide">
                Exploration interactive des roches sédimentaires et de leurs
                propriétés en géologie appliquée · TP3
              </p>
            </motion.div>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.9, delay: 1.05 }}
              className="w-full max-w-[260px] h-px mb-10"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(6,182,212,0.5), rgba(99,102,241,0.4), transparent)",
              }}
            />

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.65, delay: 1.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.button
                onClick={onEnter}
                disabled={isLoading}
                className="group relative overflow-hidden rounded-xl px-10 py-[14px] text-[13px] font-semibold tracking-[0.14em] uppercase text-white disabled:cursor-not-allowed"
                whileHover={!isLoading ? { scale: 1.045, y: -2 } : {}}
                whileTap={!isLoading ? { scale: 0.96 } : {}}
                transition={{ type: "spring", stiffness: 420, damping: 26 }}
                style={{
                  background:
                    "linear-gradient(135deg, rgba(6,182,212,0.16) 0%, rgba(14,165,233,0.12) 50%, rgba(99,102,241,0.12) 100%)",
                  backdropFilter: "blur(24px)",
                  WebkitBackdropFilter: "blur(24px)",
                  border: "1px solid rgba(6,182,212,0.38)",
                  boxShadow:
                    "0 0 0 1px rgba(255,255,255,0.06) inset, 0 8px 32px rgba(0,0,0,0.45), 0 0 24px rgba(6,182,212,0.08)",
                }}
              >
                {/* Shimmer sweep on hover */}
                <motion.span
                  className="absolute inset-0 pointer-events-none"
                  initial={{ x: "-110%", opacity: 0 }}
                  whileHover={{ x: "110%", opacity: 1 }}
                  transition={{ duration: 0.65, ease: "easeInOut" }}
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.09), transparent)",
                  }}
                />

                {/* Outer glow on hover */}
                <motion.span
                  className="absolute inset-0 rounded-xl pointer-events-none"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  style={{
                    boxShadow:
                      "0 0 40px rgba(6,182,212,0.38), 0 0 80px rgba(6,182,212,0.14)",
                  }}
                />

                {/* Top edge highlight */}
                <span className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-cyan-200/55 to-transparent pointer-events-none" />

                {/* Button content */}
                <span className="relative z-10 flex items-center gap-3">
                  {isLoading ? (
                    <>
                      <span className="w-4 h-4 border-[1.5px] border-cyan-300/50 border-t-white rounded-full animate-spin" />
                      <span className="text-cyan-200/70">Chargement…</span>
                    </>
                  ) : (
                    <>
                      <span className="text-cyan-100 group-hover:text-white transition-colors duration-300">
                        Commencer le TP
                      </span>
                      <motion.span
                        animate={{ x: [0, 3, 0] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <ChevronRight className="w-4 h-4 text-cyan-400 group-hover:text-cyan-200 transition-colors" />
                      </motion.span>
                    </>
                  )}
                </span>
              </motion.button>
            </motion.div>

            {/* Footer label */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 1.45 }}
              className="mt-9 text-[10px] tracking-[0.26em] text-slate-600 uppercase font-medium"
            >
              Université · Géologie Appliquée · 2026
            </motion.p>
          </div>
        </div>

        {/* Outer card ambient glow */}
        <div
          className="absolute inset-0 rounded-[28px] pointer-events-none -z-10"
          style={{
            boxShadow:
              "0 0 140px rgba(6,182,212,0.075), 0 0 60px rgba(6,182,212,0.05)",
          }}
        />
      </motion.div>

      {/* Floating ambient particles */}
      {[...Array(14)].map((_, i) => {
        const colors = ["#67e8f9", "#818cf8", "#38bdf8", "#a5f3fc", "#7dd3fc"]
        return (
          <motion.div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 1.5 + (i % 3),
              height: 1.5 + (i % 3),
              left: `${8 + (i * 7) % 84}%`,
              top: `${5 + (i * 11) % 90}%`,
              background: colors[i % colors.length],
              boxShadow: `0 0 8px ${colors[i % colors.length]}`,
            }}
            animate={{ y: [0, -35 - (i % 3) * 10, 0], opacity: [0, 0.65, 0] }}
            transition={{
              duration: 4 + (i % 4),
              delay: (i * 0.55) % 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )
      })}
    </div>
  )
}

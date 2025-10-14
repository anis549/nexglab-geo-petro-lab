"use client"

import { useState } from "react"
import Laboratory from "@/components/laboratory"
import IntroPage from "@/components/intro-page"
import GeologyBackground from "@/components/geology-background"

export default function Home() {
  const [showIntro, setShowIntro] = useState(true)

  const handleEnterLab = () => {
    setShowIntro(false)
  }

  return (
    <main className="flex min-h-screen flex-col">
      {showIntro ? (
        <div className="relative w-full h-full">
          <GeologyBackground />
          <IntroPage onEnter={handleEnterLab} />
        </div>
      ) : (
        <Laboratory />
      )}
    </main>
  )
}

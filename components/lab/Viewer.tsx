"use client"

import React, { memo, Suspense, useRef } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, useGLTF, Center, Environment } from "@react-three/drei"
import * as THREE from "three"
import { AlertCircle } from "lucide-react"
import { useLabStore } from "@/store/useLabStore"
import { cn } from "@/lib/utils"

interface ViewerProps {
  modelPath?: string
  className?: string
}

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url)
  const ref = useRef<any>()

  React.useEffect(() => {
    if (!scene) return

    const box = new THREE.Box3().setFromObject(scene)
    const center = box.getCenter(new THREE.Vector3())
    const size = box.getSize(new THREE.Vector3())

    const maxDim = Math.max(size.x, size.y, size.z)
    const scale = 2.5 / maxDim

    scene.position.sub(center)
    scene.scale.setScalar(scale)

    scene.traverse((child: any) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true

        if (child.material) {
          child.material.needsUpdate = true
        }
      }
    })
  }, [scene])

  return <primitive ref={ref} object={scene} />
}

export const Viewer = memo(function Viewer({ modelPath, className }: ViewerProps) {
  const { labMode } = useLabStore()

  if (!modelPath) {
    return (
      <div
        className={cn(
          "flex h-full flex-col items-center justify-center gap-3 rounded-2xl",
          className
        )}
        style={{
          background: "linear-gradient(145deg, rgba(4,12,30,0.7), rgba(3,10,24,0.85))",
          border: "1px solid rgba(0,180,255,0.08)",
        }}
      >
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{
            background: "rgba(255,80,80,0.1)",
            border: "1px solid rgba(255,100,100,0.2)",
          }}
        >
          <AlertCircle
            className="w-6 h-6"
            style={{ color: "rgba(255,120,120,0.6)" }}
          />
        </div>
        <p
          className="text-xs"
          style={{ color: "rgba(120,160,200,0.5)", fontFamily: "'DM Mono', monospace" }}
        >
          No model available
        </p>
      </div>
    )
  }

  return (
    <div className={cn("w-full h-full relative rounded-2xl overflow-hidden", className)}>
      {/* Cinematic vignette overlay */}
      <div
        className="absolute inset-0 z-10 pointer-events-none rounded-2xl"
        style={{
          background: `
            radial-gradient(ellipse 100% 100% at 50% 50%, transparent 55%, rgba(3,10,24,0.55) 100%),
            linear-gradient(180deg, rgba(3,10,24,0.2) 0%, transparent 20%, transparent 80%, rgba(3,10,24,0.3) 100%)
          `,
        }}
      />

      {/* Loading shimmer placeholder */}
      <div
        className="absolute inset-0 z-0 rounded-2xl"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,80,180,0.15) 0%, transparent 70%)",
        }}
      />

      <Canvas
        key={modelPath}
        camera={{ position: [0, 0, 4], fov: 45 }}
        gl={{
          antialias: window.devicePixelRatio > 1,
          outputColorSpace: THREE.SRGBColorSpace,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 1.5]}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />
        <directionalLight position={[-5, 3, -5]} intensity={0.6} />

        <Environment preset="studio" />

        <Suspense fallback={null}>
          <Center>
            <Model url={modelPath} />
          </Center>
        </Suspense>

        <OrbitControls
          enablePan={false}
          enableZoom
          enableRotate
          autoRotate
          autoRotateSpeed={0.5}
          minDistance={labMode === "microscope" ? 1 : 2}
          maxDistance={labMode === "microscope" ? 3 : 6}
        />
      </Canvas>
    </div>
  )
})

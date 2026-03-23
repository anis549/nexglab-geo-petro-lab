"use client"

import React, { memo, Suspense, useRef } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, useGLTF, Center, Environment, Preload } from "@react-three/drei"
import * as THREE from "three"
import { AlertCircle } from "lucide-react"
import { useLabStore } from "@/store/useLabStore"
import { cn } from "@/lib/utils"

interface ViewerProps {
  modelPath?: string
  className?: string
}

function Model({ url }: { url: string }) {
  const gltf = useGLTF(url)
  const groupRef = useRef<any>(null)

  React.useLayoutEffect(() => {
    if (!gltf.scene || !groupRef.current) return

    const box = new THREE.Box3().setFromObject(gltf.scene)
    const center = box.getCenter(new THREE.Vector3())
    gltf.scene.position.sub(center)

    gltf.scene.traverse((child: any) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })
  }, [gltf.scene])

  return <primitive ref={groupRef} object={gltf.scene} />
}

export const Viewer = memo(function Viewer({ modelPath, className }: ViewerProps) {
  const { labMode } = useLabStore()

  if (!modelPath) {
    return (
      <div className={cn("flex h-full items-center justify-center rounded-2xl bg-gradient-to-br from-muted to-muted/50 shadow-lg", className)}>
        <div className="text-center p-8 space-y-2">
          <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto" />
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-1">Aucun échantillon chargé</h3>
            <p className="text-sm text-muted-foreground">Sélectionnez une roche depuis le coffre</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={cn("w-full h-full rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-background to-muted/50 border border-border/50", className)}>
      <Canvas 
        key={modelPath}
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ 
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={2}
          castShadow
          shadow-mapSize={[2048, 2048]}
        />
        <directionalLight position={[-5, 5, -5]} intensity={0.8} />
        <Environment preset="studio" />
        
        <Center>
          <Suspense fallback={null}>
            <Model url={modelPath} />
            <Preload all />
          </Suspense>
        </Center>

        <OrbitControls
          enableZoom
          enableRotate
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.8}
          minPolarAngle={0.1}
          maxPolarAngle={Math.PI / 1.4}
          minDistance={1.5}
          maxDistance={labMode === 'microscope' ? 3 : 10}
          dampingFactor={0.05}
        />
      </Canvas>
    </div>
  )
})


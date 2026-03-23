"use client"
import { useBox } from "@react-three/cannon"

// Composant pour le cylindre physique (manquant dans @react-three/cannon)
export function useCylinder(fn: () => any, deps = []) {
  const args = fn().args || [0.5, 0.5, 1, 16]
  const radius = Math.max(args[0], args[1])
  const height = args[2]

  // Utiliser une boîte comme approximation d'un cylindre
  const [ref, api] = useBox(() => ({
    ...fn(),
    args: [radius * 2, height, radius * 2],
  }))

  return [ref, api]
}

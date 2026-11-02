"use client"

import { Float } from "@react-three/drei"
import { Canvas, useFrame } from "@react-three/fiber"
import { useRef } from "react"
import type { Mesh } from "three"

function StudioObjects() {
  const knot = useRef<Mesh>(null)
  const shard = useRef<Mesh>(null)
  const bead = useRef<Mesh>(null)

  useFrame((_, delta) => {
    if (knot.current) knot.current.rotation.y += delta * 0.28
    if (shard.current) shard.current.rotation.x += delta * 0.18
    if (bead.current) bead.current.rotation.z += delta * 0.12
  })

  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 3.5, 5]} intensity={2.4} color="#fff1dc" />
      <directionalLight position={[-4.5, -1.5, -2]} intensity={0.7} color="#7eb8b2" />
      <Float speed={1.1} rotationIntensity={0.25} floatIntensity={0.55}>
        <mesh ref={knot} position={[-1.25, 0.25, 0]}>
          <torusKnotGeometry args={[0.52, 0.16, 180, 24]} />
          <meshStandardMaterial color="#e7e1d6" metalness={0.82} roughness={0.22} />
        </mesh>
      </Float>
      <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.7}>
        <mesh ref={shard} position={[1.2, 0.45, -0.2]} rotation={[0.4, 0.2, 0.3]}>
          <octahedronGeometry args={[0.72, 0]} />
          <meshStandardMaterial color="#c9854a" metalness={0.64} roughness={0.28} />
        </mesh>
      </Float>
      <Float speed={0.9} rotationIntensity={0.2} floatIntensity={0.45}>
        <mesh ref={bead} position={[0.15, -0.85, 0.4]}>
          <sphereGeometry args={[0.38, 48, 48]} />
          <meshStandardMaterial color="#9fd0cb" metalness={0.4} roughness={0.18} />
        </mesh>
      </Float>
    </>
  )
}

export function OrbitObjectsCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0.15, 5.1], fov: 40 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <StudioObjects />
    </Canvas>
  )
}

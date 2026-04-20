"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { Suspense } from "react"
import { ParticleSphere } from "@/components/ui/cosmos-3d-orbit-gallery"

interface CosmosCanvasProps {
  images: string[]
}

export default function CosmosCanvas({ images }: CosmosCanvasProps) {
  return (
    <Canvas camera={{ position: [-10, 1.5, 10], fov: 50 }} style={{ width: "100%", height: "100%" }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Suspense fallback={null}>
        <ParticleSphere images={images} />
      </Suspense>
      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
    </Canvas>
  )
}

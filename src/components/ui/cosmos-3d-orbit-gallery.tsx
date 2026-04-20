"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { useTexture } from "@react-three/drei"
import * as THREE from "three"

interface ParticleSphereProps {
  images: string[]
}

export function ParticleSphere({ images }: ParticleSphereProps) {
  const PARTICLE_COUNT = 600
  const PARTICLE_SIZE = 0.02
  const SPHERE_RADIUS = 9
  const POSITION_RANDOMNESS = 4
  const ROTATION_SPEED_Y = 0.0005

  const groupRef = useRef<THREE.Group>(null)
  const textures = useTexture(images)

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const colors = new Float32Array(PARTICLE_COUNT * 3)
    const color = new THREE.Color()

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const phi = Math.acos(-1 + (2 * i) / PARTICLE_COUNT)
      const theta = Math.sqrt(PARTICLE_COUNT * Math.PI) * phi
      const radius = SPHERE_RADIUS + (Math.random() - 0.5) * POSITION_RANDOMNESS

      positions[i * 3] = radius * Math.cos(theta) * Math.sin(phi)
      positions[i * 3 + 1] = radius * Math.cos(phi)
      positions[i * 3 + 2] = radius * Math.sin(theta) * Math.sin(phi)

      color.setHSL(Math.random() * 0.1 + 0.05, 0.8, 0.6 + Math.random() * 0.3)
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }
    return { positions, colors }
  }, [PARTICLE_COUNT, SPHERE_RADIUS, POSITION_RANDOMNESS])

  const orbitingImages = useMemo(() => {
    const imgs = []
    const IMAGE_COUNT = images.length
    const IMAGE_SIZE = 1.5

    for (let i = 0; i < IMAGE_COUNT; i++) {
      const angle = (i / IMAGE_COUNT) * Math.PI * 2
      const x = SPHERE_RADIUS * Math.cos(angle)
      const y = 0
      const z = SPHERE_RADIUS * Math.sin(angle)

      const position = new THREE.Vector3(x, y, z)
      const center = new THREE.Vector3(0, 0, 0)

      const euler = new THREE.Euler()
      const matrix = new THREE.Matrix4()
      matrix.lookAt(position, center, new THREE.Vector3(0, 1, 0))
      euler.setFromRotationMatrix(matrix)

      const texture = textures[i % textures.length]
      const img = texture?.image as HTMLImageElement | undefined
      const aspectRatio = img && img.width > 0 ? img.width / img.height : 1.777

      imgs.push({
        position: [x, y, z] as [number, number, number],
        rotation: [euler.x, euler.y, euler.z] as [number, number, number],
        textureIndex: i % textures.length,
        aspectRatio,
        IMAGE_SIZE
      })
    }
    return imgs
  }, [images.length, SPHERE_RADIUS, textures])

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += ROTATION_SPEED_Y
    }
  })

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={colors.length / 3}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={PARTICLE_SIZE} vertexColors transparent opacity={0.8} />
      </points>

      {orbitingImages.map((image, index) => (
        <group key={`image-group-${index}`} position={image.position} rotation={image.rotation}>
          <mesh scale={[1.04, 1.04, 1]}>
            <planeGeometry args={[image.IMAGE_SIZE * image.aspectRatio, image.IMAGE_SIZE]} />
            <meshBasicMaterial color={new THREE.Color("hsl(217, 91%, 60%)")} transparent opacity={0.4} side={THREE.DoubleSide} />
          </mesh>
          <mesh position={[0, 0, 0.01]}>
            <planeGeometry args={[image.IMAGE_SIZE * image.aspectRatio, image.IMAGE_SIZE]} />
            <meshBasicMaterial map={textures[image.textureIndex]} side={THREE.DoubleSide} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

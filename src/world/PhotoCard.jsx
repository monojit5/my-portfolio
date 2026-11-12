import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { Float, RoundedBox, useCursor, useTexture } from '@react-three/drei'

// One of your photos, hung in the sky inside a thick rounded frame.
export default function PhotoCard({ src, w = 7, frame = '#ffffff', onClick, float = true, popped = false, ...props }) {
  const tex = useTexture(src)
  useEffect(() => {
    tex.colorSpace = THREE.SRGBColorSpace
    tex.anisotropy = 8
    tex.needsUpdate = true
  }, [tex])
  const h = w / (tex.image.width / tex.image.height)
  const g = useRef()
  const [hov, setHov] = useState(false)
  useCursor(hov && !!onClick)

  useFrame((_, dt) => {
    const target = popped ? 1.08 : hov && onClick ? 1.04 : 1
    g.current.scale.setScalar(THREE.MathUtils.damp(g.current.scale.x, target, 8, dt))
  })

  const body = (
    <group
      ref={g}
      onPointerOver={(e) => {
        e.stopPropagation()
        setHov(true)
      }}
      onPointerOut={() => setHov(false)}
      onClick={onClick ? (e) => (e.stopPropagation(), onClick(e)) : undefined}
    >
      <RoundedBox args={[w + 0.55, h + 0.55, 0.35]} radius={0.28} smoothness={4} position={[0, 0, -0.2]}>
        <meshStandardMaterial color={frame} roughness={0.5} />
      </RoundedBox>
      <mesh>
        <planeGeometry args={[w, h]} />
        <meshBasicMaterial map={tex} toneMapped={false} />
      </mesh>
    </group>
  )
  return (
    <group {...props}>
      {float ? (
        <Float speed={1.6} rotationIntensity={0.12} floatIntensity={0.7} floatingRange={[-0.25, 0.25]}>
          {body}
        </Float>
      ) : (
        body
      )}
    </group>
  )
}

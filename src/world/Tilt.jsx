import { useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

// Gently turns a whole station toward the mouse, so moving the pointer feels like exploring a diorama.
export default function Tilt({ position, strength = 0.1, children }) {
  const g = useRef()
  useFrame(({ pointer }, dt) => {
    g.current.rotation.y = THREE.MathUtils.damp(g.current.rotation.y, pointer.x * strength, 3, dt)
    g.current.rotation.x = THREE.MathUtils.damp(g.current.rotation.x, -pointer.y * strength * 0.45, 3, dt)
  })
  return (
    <group position={position}>
      <group ref={g}>{children}</group>
    </group>
  )
}

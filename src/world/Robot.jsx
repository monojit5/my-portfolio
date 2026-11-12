import { useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'

const CYAN = '#52ecff'

// The friendly companion bot. Floats, waves, follows the mouse with its head. `letter` makes it hold a love letter.
export default function Robot({ wave = true, letter = false, ...props }) {
  const head = useRef()
  const arm = useRef()
  useFrame(({ clock, pointer }, dt) => {
    const t = clock.elapsedTime
    arm.current.rotation.z = wave ? 2.35 + Math.sin(t * 6 + 1) * 0.35 : 0.25
    head.current.rotation.y = THREE.MathUtils.damp(head.current.rotation.y, pointer.x * 0.55, 4, dt)
    head.current.rotation.x = THREE.MathUtils.damp(head.current.rotation.x, -pointer.y * 0.25, 4, dt)
  })
  return (
    <Float speed={2.2} floatIntensity={0.8} rotationIntensity={0.08}>
      <group {...props}>
        <group ref={head} position={[0, 1.4, 0]}>
          <mesh>
            <sphereGeometry args={[0.56, 32, 24]} />
            <meshStandardMaterial color="#f3f6ff" roughness={0.35} />
          </mesh>
          <mesh position={[0, 0, 0.3]} scale={[1, 0.8, 0.55]}>
            <sphereGeometry args={[0.46, 32, 24]} />
            <meshStandardMaterial color="#10152b" roughness={0.2} />
          </mesh>
          {[-0.17, 0.17].map((x) => (
            <mesh key={x} position={[x, 0.05, 0.5]}>
              <sphereGeometry args={[0.075, 14, 14]} />
              <meshBasicMaterial color={CYAN} toneMapped={false} />
            </mesh>
          ))}
          <mesh position={[0, -0.1, 0.5]} rotation={[0, 0, Math.PI]}>
            <torusGeometry args={[0.09, 0.02, 8, 16, Math.PI]} />
            <meshBasicMaterial color={CYAN} toneMapped={false} />
          </mesh>
          {[-0.58, 0.58].map((x) => (
            <mesh key={x} position={[x, 0, 0]} scale={[0.55, 1, 1]}>
              <sphereGeometry args={[0.14, 12, 12]} />
              <meshStandardMaterial color="#2f6bff" />
            </mesh>
          ))}
          <mesh position={[0, 0.72, 0]}>
            <cylinderGeometry args={[0.025, 0.025, 0.32, 8]} />
            <meshStandardMaterial color="#9aa4c8" />
          </mesh>
          <mesh position={[0, 0.9, 0]}>
            <sphereGeometry args={[0.075, 12, 12]} />
            <meshStandardMaterial color="#ff7a59" emissive="#ff7a59" emissiveIntensity={0.6} />
          </mesh>
        </group>
        <mesh position={[0, 0.62, 0]}>
          <capsuleGeometry args={[0.34, 0.36, 6, 14]} />
          <meshStandardMaterial color="#f3f6ff" roughness={0.4} />
        </mesh>
        <mesh position={[0, 0.66, 0.33]}>
          <sphereGeometry args={[0.07, 10, 10]} />
          <meshBasicMaterial color={CYAN} toneMapped={false} />
        </mesh>
        <group ref={arm} position={[0.42, 0.85, 0]}>
          <mesh position={[0, -0.22, 0]}>
            <capsuleGeometry args={[0.08, 0.28, 4, 10]} />
            <meshStandardMaterial color="#e1e7fb" />
          </mesh>
        </group>
        <group position={[-0.42, 0.85, 0]} rotation={[0, 0, -0.25]}>
          <mesh position={[0, -0.22, 0]}>
            <capsuleGeometry args={[0.08, 0.28, 4, 10]} />
            <meshStandardMaterial color="#e1e7fb" />
          </mesh>
        </group>
        {letter && (
          <group position={[-0.5, 0.45, 0.35]} rotation={[0, 0.3, 0.2]}>
            <mesh>
              <boxGeometry args={[0.62, 0.42, 0.04]} />
              <meshStandardMaterial color="#ffffff" />
            </mesh>
            <mesh position={[0, 0, 0.03]}>
              <sphereGeometry args={[0.07, 10, 10]} />
              <meshStandardMaterial color="#ff4d6d" emissive="#ff4d6d" emissiveIntensity={0.5} />
            </mesh>
          </group>
        )}
      </group>
    </Float>
  )
}

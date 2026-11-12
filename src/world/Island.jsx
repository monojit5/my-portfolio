import { useMemo } from 'react'
import { rng, TAU } from './layout.js'

function Tree({ x, z, s = 1, tone = '#3fa34d' }) {
  return (
    <group position={[x, 0, z]} scale={s}>
      <mesh position={[0, 0.45, 0]}>
        <cylinderGeometry args={[0.12, 0.16, 0.9, 8]} />
        <meshStandardMaterial color="#8a5a35" />
      </mesh>
      <mesh position={[0, 1.4, 0]}>
        <coneGeometry args={[0.75, 1.4, 8]} />
        <meshStandardMaterial color={tone} flatShading />
      </mesh>
      <mesh position={[0, 2.1, 0]}>
        <coneGeometry args={[0.55, 1.1, 8]} />
        <meshStandardMaterial color={tone} flatShading />
      </mesh>
    </group>
  )
}

function Flower({ x, z, c }) {
  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, 0.12, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 0.24, 5]} />
        <meshStandardMaterial color="#3a9a45" />
      </mesh>
      <mesh position={[0, 0.27, 0]}>
        <sphereGeometry args={[0.09, 8, 8]} />
        <meshStandardMaterial color={c} />
      </mesh>
    </group>
  )
}

// A floating island: grassy top, rocky cone underneath, a few trees and flowers on the back half.
export default function Island({ r = 7, grass = '#7ccf5a', rock = '#a8693f', seed = 1, trees = 5, flowers = 14, children }) {
  const decor = useMemo(() => {
    const rand = rng(seed * 101)
    const t = []
    for (let i = 0; i < trees; i++) {
      const a = Math.PI + (rand() - 0.5) * 3.4 // back half
      const d = r * (0.55 + rand() * 0.38)
      t.push({ x: Math.sin(a) * d, z: Math.cos(a) * d, s: 0.7 + rand() * 0.6, tone: rand() > 0.5 ? '#3fa34d' : '#58b84a' })
    }
    const f = []
    const cols = ['#ff7ab8', '#ffd23f', '#ffffff', '#b58cff']
    for (let i = 0; i < flowers; i++) {
      const a = rand() * TAU
      const d = r * (0.3 + rand() * 0.62)
      f.push({ x: Math.sin(a) * d, z: Math.cos(a) * d, c: cols[i % cols.length] })
    }
    return { t, f }
  }, [r, seed, trees, flowers])

  return (
    <group>
      <mesh position={[0, -0.25, 0]}>
        <cylinderGeometry args={[r, r * 0.97, 0.5, 40]} />
        <meshStandardMaterial color={grass} flatShading />
      </mesh>
      <mesh position={[0, -0.55, 0]}>
        <cylinderGeometry args={[r * 0.985, r * 0.9, 0.35, 40]} />
        <meshStandardMaterial color="#c98f5a" flatShading />
      </mesh>
      <mesh position={[0, -3.1, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[r * 0.9, 5, 14]} />
        <meshStandardMaterial color={rock} flatShading />
      </mesh>
      {decor.t.map((p, i) => (
        <Tree key={i} {...p} />
      ))}
      {decor.f.map((p, i) => (
        <Flower key={i} {...p} />
      ))}
      {children}
    </group>
  )
}

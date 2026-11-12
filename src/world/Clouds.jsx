import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { STATIONS, rng } from './layout.js'

const PUFFS = [
  [0, 0, 0, 1.6],
  [1.7, -0.2, 0.2, 1.2],
  [-1.6, -0.1, 0, 1.3],
  [0.7, 0.8, 0, 1.1],
  [-0.6, 0.6, 0.4, 1],
]

function Cloud({ x, y, z, s, speed }) {
  const g = useRef()
  // one material per cloud so it can fade out when the camera flies close to it
  const mat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#ffffff', emissive: '#dfeaff', emissiveIntensity: 0.5, roughness: 1, transparent: true, depthWrite: false }),
    [],
  )
  useFrame(({ camera }, dt) => {
    g.current.position.x += dt * speed
    if (g.current.position.x > 70) g.current.position.x = -70
    const d = g.current.position.distanceTo(camera.position)
    mat.opacity = THREE.MathUtils.clamp((d - 6) / 16, 0, 1)
    g.current.visible = mat.opacity > 0.02
  })
  return (
    <group ref={g} position={[x, y, z]} scale={s}>
      {PUFFS.map(([px, py, pz, r], i) => (
        <mesh key={i} position={[px, py, pz]} scale={[1, 0.78, 0.9]} material={mat}>
          <sphereGeometry args={[r, 20, 14]} />
        </mesh>
      ))}
    </group>
  )
}

export default function Clouds({ count = 34 }) {
  const clouds = useMemo(() => {
    const rand = rng(7)
    const out = []
    let guard = 0
    while (out.length < count && guard++ < 600) {
      const x = (rand() - 0.5) * 110
      const y = -12 + rand() * 30
      const z = 12 - rand() * 232
      // keep clouds out of the corridor between each station and the camera that looks at it
      const blocked = STATIONS.some(([sx, sy, sz]) => Math.abs(y - sy) < 13 && z < sz + 34 && z > sz - 6 && Math.abs(x - sx) < 20)
      if (blocked) continue
      out.push({ x, y, z, s: 1.2 + rand() * 1.8, speed: 0.25 + rand() * 0.5 })
    }
    return out
  }, [count])
  return clouds.map((c, i) => <Cloud key={i} {...c} />)
}

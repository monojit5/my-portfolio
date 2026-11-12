import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import Island from '../Island.jsx'
import PhotoCard from '../PhotoCard.jsx'
import SignBoard from '../SignBoard.jsx'
import Avatar from '../Avatar.jsx'
import Tilt from '../Tilt.jsx'
import { JOURNEY } from '../../data.js'
import { JOURNEY_INDEX } from '../../scrollMap.js'
import { live, useStore } from '../../store.js'
import img from '../../assets/journey-map.jpg'

const damp = THREE.MathUtils.damp
const PTS = [
  [-5.6, 0.1, 4.4],
  [-3.4, 0.1, 2.4],
  [-1.2, 0.1, 4.6],
  [1.6, 0.1, 3.2],
  [3.4, 0.1, 0.8],
  [5.9, 0.1, 2],
]
const STOPS = [0.1, 0.37, 0.63, 0.89]

function Milestone({ at, curve, label, unlocked }) {
  const g = useRef()
  const p = useMemo(() => curve.getPointAt(at), [curve, at])
  useFrame((_, dt) => {
    g.current.scale.setScalar(damp(g.current.scale.x, unlocked ? 1 : 0.8, 6, dt))
  })
  return (
    <group position={[p.x, 0, p.z - 1.5]}>
      <group ref={g}>
        <SignBoard text={label} w={2.5} h={0.9} dim={!unlocked} position={[0, 1.8, 0]} />
        <mesh position={[0, 2.65, 0]}>
          <octahedronGeometry args={[0.2, 0]} />
          <meshBasicMaterial color={unlocked ? '#ffd23f' : '#9aa0bd'} toneMapped={false} />
        </mesh>
      </group>
    </group>
  )
}

function Rocket({ curve, launched }) {
  const g = useRef()
  const base = useMemo(() => curve.getPointAt(0.97).add(new THREE.Vector3(1.2, 0, -1.4)), [curve])
  useFrame(({ clock }, dt) => {
    const target = launched ? 4.2 : 0
    g.current.position.y = damp(g.current.position.y, target + Math.sin(clock.elapsedTime * 9) * (launched ? 0.06 : 0), 2.5, dt)
  })
  return (
    <group position={[base.x, 0, base.z]}>
      <group ref={g}>
        <mesh position={[0, 0.9, 0]}>
          <cylinderGeometry args={[0.38, 0.45, 1.6, 16]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        <mesh position={[0, 2.0, 0]}>
          <coneGeometry args={[0.38, 0.7, 16]} />
          <meshStandardMaterial color="#ff5a4d" />
        </mesh>
        <mesh position={[0, 1.15, 0.38]}>
          <sphereGeometry args={[0.14, 12, 12]} />
          <meshStandardMaterial color="#52ecff" emissive="#52ecff" emissiveIntensity={0.8} />
        </mesh>
        {[0, 2.1, 4.2].map((a) => (
          <mesh key={a} position={[Math.sin(a) * 0.5, 0.35, Math.cos(a) * 0.5]} rotation={[0, a, 0]}>
            <boxGeometry args={[0.08, 0.6, 0.35]} />
            <meshStandardMaterial color="#ff5a4d" />
          </mesh>
        ))}
        {launched && (
          <mesh position={[0, -0.2, 0]} rotation={[Math.PI, 0, 0]}>
            <coneGeometry args={[0.28, 0.9, 12]} />
            <meshBasicMaterial color="#ffb84d" toneMapped={false} />
          </mesh>
        )}
      </group>
    </group>
  )
}

export default function Journey({ position }) {
  const step = useStore((s) => s.journeyStep)
  const curve = useMemo(() => new THREE.CatmullRomCurve3(PTS.map((p) => new THREE.Vector3(...p)), false, 'catmullrom', 0.5), [])
  const walker = useRef()
  const t = useRef(0.03)
  useFrame(({ clock }, dt) => {
    const target = live.k < JOURNEY_INDEX ? 0.03 : live.k === JOURNEY_INDEX ? 0.03 + live.hold * 0.9 : 0.93
    t.current = damp(t.current, target, 3, dt)
    const p = curve.getPointAt(t.current)
    const tan = curve.getTangentAt(t.current)
    walker.current.position.set(p.x, Math.abs(Math.sin(clock.elapsedTime * 8)) * 0.07, p.z)
    walker.current.rotation.y = Math.atan2(tan.x, tan.z)
  })

  return (
    <Tilt position={position}>
      <Island r={8.4} seed={13} trees={6} flowers={10} grass="#86d65f">
        <mesh scale={[1, 0.12, 1]}>
          <tubeGeometry args={[curve, 140, 0.62, 6, false]} />
          <meshStandardMaterial color="#ecc88e" roughness={1} />
        </mesh>
        {JOURNEY.map((m, i) => (
          <Milestone key={m.id} at={STOPS[i]} curve={curve} label={m.label} unlocked={step >= i + 1} />
        ))}
        <Rocket curve={curve} launched={step >= 4} />
        <group ref={walker}>
          <Avatar scale={0.3} wave={false} talk={false} interactive={false} />
        </group>
      </Island>
      <PhotoCard src={img} w={7.6} position={[0, 7.4, -6]} frame="#bfe8ff" />
    </Tilt>
  )
}

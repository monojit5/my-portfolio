import { useRef, useState } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { Html, useCursor } from '@react-three/drei'
import Island from '../Island.jsx'
import PhotoCard from '../PhotoCard.jsx'
import SignBoard from '../SignBoard.jsx'
import Tilt from '../Tilt.jsx'
import { PROJECTS } from '../../data.js'
import { stagePortal } from '../htmlPortal.js'
import { setState, useStore } from '../../store.js'
import img from '../../assets/projects-island.jpg'

// A different rooftop gadget for each project, so every building is recognisable.
function Topper({ kind, color }) {
  switch (kind) {
    case 'chat':
      return (
        <group position={[0, 3.35, 0]}>
          <mesh>
            <sphereGeometry args={[0.5, 20, 16]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
          {[-0.2, 0, 0.2].map((x) => (
            <mesh key={x} position={[x, 0, 0.46]}>
              <sphereGeometry args={[0.07, 8, 8]} />
              <meshBasicMaterial color={color} />
            </mesh>
          ))}
        </group>
      )
    case 'cart':
      return (
        <group position={[0, 3.3, 0]}>
          <mesh rotation={[0.2, 0, 0]}>
            <torusGeometry args={[0.38, 0.09, 10, 24]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
          <mesh position={[0, -0.3, 0]}>
            <boxGeometry args={[0.7, 0.14, 0.4]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
        </group>
      )
    case 'cinema':
      return (
        <mesh position={[0, 3.25, 0.2]}>
          <boxGeometry args={[1.5, 0.5, 0.15]} />
          <meshStandardMaterial color="#ffd23f" emissive="#ffd23f" emissiveIntensity={0.7} />
        </mesh>
      )
    case 'doc':
      return (
        <mesh position={[0, 3.35, 0]} rotation={[0, 0.5, 0]}>
          <boxGeometry args={[0.8, 1, 0.1]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      )
    default:
      return (
        <mesh position={[0, 3.2, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.8, 8]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      )
  }
}

function Building({ project, position }) {
  const g = useRef()
  const [hov, setHov] = useState(false)
  const open = useStore((s) => s.project === project.id)
  const here = useStore((s) => s.section === 2)
  useCursor(hov)
  useFrame((_, dt) => {
    const lift = hov || open ? 0.45 : 0
    g.current.position.y = THREE.MathUtils.damp(g.current.position.y, lift, 8, dt)
    g.current.rotation.y = THREE.MathUtils.damp(g.current.rotation.y, hov ? 0.18 : 0, 6, dt)
  })
  const lit = hov || open
  return (
    <group position={position}>
      <group
        ref={g}
        onPointerOver={(e) => (e.stopPropagation(), setHov(true))}
        onPointerOut={() => setHov(false)}
        onClick={(e) => (e.stopPropagation(), setState({ project: project.id }))}
      >
        <mesh position={[0, 0.9, 0]}>
          <boxGeometry args={[2, 1.8, 2]} />
          <meshStandardMaterial color="#fff4e2" emissive="#fff0d6" emissiveIntensity={0.35} />
        </mesh>
        <mesh position={[0, 2.35, 0]} rotation={[0, Math.PI / 4, 0]}>
          <coneGeometry args={[1.85, 1.25, 4]} />
          <meshStandardMaterial color={project.color} flatShading />
        </mesh>
        <mesh position={[0, 0.5, 1.02]}>
          <boxGeometry args={[0.55, 1, 0.06]} />
          <meshStandardMaterial color="#8a5a35" />
        </mesh>
        {[-0.65, 0.65].map((x) => (
          <mesh key={x} position={[x, 1.15, 1.02]}>
            <boxGeometry args={[0.45, 0.45, 0.05]} />
            <meshStandardMaterial color="#ffe9a8" emissive="#ffd23f" emissiveIntensity={lit ? 1.2 : 0.2} />
          </mesh>
        ))}
        <Topper kind={project.kind} color={project.color} />
      </group>
      {here && (
        <Html portal={stagePortal} position={[0, 4.4, 0]} center distanceFactor={13} style={{ pointerEvents: 'none' }}>
          <div className="tag3d" style={{ background: lit ? '#ffd23f' : '#fff' }}>
            {project.short}
          </div>
        </Html>
      )}
    </group>
  )
}

const SPOTS = [
  [-3.3, 0, 2.6],
  [0, 0, 3.2],
  [3.3, 0, 2.6],
  [-1.7, 0, -0.9],
  [1.7, 0, -0.9],
]

export default function Projects({ position }) {
  return (
    <Tilt position={position}>
      <Island r={7.4} seed={9} trees={4} flowers={8}>
        <SignBoard text="Project Gallery" w={4.2} h={1.2} position={[-5.4, 1.5, 0.2]} rotation={[0, 0.55, 0]} />
        {PROJECTS.map((p, i) => (
          <Building key={p.id} project={p} position={SPOTS[i]} />
        ))}
      </Island>
      <PhotoCard src={img} w={7.2} position={[0, 7.4, -4.6]} frame="#9be7ff" />
    </Tilt>
  )
}

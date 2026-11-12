import { useRef, useState } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { Float, Html, useCursor } from '@react-three/drei'
import Island from '../Island.jsx'
import PhotoCard from '../PhotoCard.jsx'
import SignBoard from '../SignBoard.jsx'
import Tilt from '../Tilt.jsx'
import { SKILLS } from '../../data.js'
import { stagePortal } from '../htmlPortal.js'
import { setState, useStore } from '../../store.js'
import { TAU } from '../layout.js'
import img from '../../assets/skills-lab.jpg'

function Crystal({ skill, position, selected, onHover }) {
  const body = useRef()
  const [hov, setHov] = useState(false)
  useCursor(hov)
  useFrame((_, dt) => {
    const target = selected ? 1.5 : hov ? 1.3 : 1
    body.current.scale.setScalar(THREE.MathUtils.damp(body.current.scale.x, target, 8, dt))
    body.current.rotation.y += dt * (selected ? 2.2 : 0.9)
  })
  const lit = hov || selected
  const here = useStore((s) => s.section === 3)
  return (
    <group position={position} scale={0.82}>
      <Float speed={2} floatIntensity={0.6} rotationIntensity={0}>
        <group
          ref={body}
          onPointerOver={(e) => {
            e.stopPropagation()
            setHov(true)
            onHover(1)
          }}
          onPointerOut={() => {
            setHov(false)
            onHover(-1)
          }}
          onClick={(e) => (e.stopPropagation(), setState({ skill: selected ? null : skill.id }))}
        >
          <mesh scale={[0.72, 1.15, 0.72]}>
            <octahedronGeometry args={[0.78, 0]} />
            <meshStandardMaterial color={skill.color} emissive={skill.color} emissiveIntensity={lit ? 1.1 : 0.45} roughness={0.15} metalness={0.2} flatShading />
          </mesh>
          <mesh scale={1.7}>
            <sphereGeometry args={[0.55, 16, 12]} />
            <meshBasicMaterial color={skill.color} transparent opacity={lit ? 0.3 : 0.12} depthWrite={false} />
          </mesh>
        </group>
      </Float>
      {lit && here && (
        <Html portal={stagePortal} position={[0, 1.7, 0]} center distanceFactor={13} style={{ pointerEvents: 'none' }}>
          <div className="tag3d">{skill.name}</div>
        </Html>
      )}
    </group>
  )
}

const RADIUS = 4.6

export default function Skills({ position }) {
  const selected = useStore((s) => s.skill)
  const ring = useRef()
  const hovered = useRef(0)
  useFrame((_, dt) => {
    if (hovered.current <= 0) ring.current.rotation.y += dt * 0.16
  })
  return (
    <Tilt position={position}>
      <Island r={6.6} seed={11} trees={3} grass="#6fcf8a">
        <SignBoard text="Coding Lab" w={2.8} h={1} position={[-4.4, 0.9, 5.4]} rotation={[0, 0.5, 0]} />
        <group ref={ring} position={[0, 1.7, 0.6]}>
          {SKILLS.map((s, i) => {
            const a = (i / SKILLS.length) * TAU
            return (
              <Crystal
                key={s.id}
                skill={s}
                selected={selected === s.id}
                position={[Math.sin(a) * RADIUS, Math.sin(a * 2) * 0.35, Math.cos(a) * RADIUS]}
                onHover={(d) => (hovered.current = Math.max(0, hovered.current + d))}
              />
            )
          })}
        </group>
      </Island>
      <PhotoCard src={img} w={6.2} position={[0, 6.6, -1.4]} frame="#ffe3b3" />
    </Tilt>
  )
}

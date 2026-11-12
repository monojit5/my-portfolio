import { useRef, useState } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { Float, useCursor } from '@react-three/drei'
import Island from '../Island.jsx'
import Robot from '../Robot.jsx'
import SignBoard from '../SignBoard.jsx'
import Tilt from '../Tilt.jsx'
import { setState, useStore } from '../../store.js'

function Mailbox() {
  const flag = useRef()
  const up = useStore((s) => s.mail)
  const [hov, setHov] = useState(false)
  useCursor(hov)
  useFrame((_, dt) => {
    flag.current.rotation.z = THREE.MathUtils.damp(flag.current.rotation.z, up ? 0 : -1.45, 6, dt)
  })
  return (
    <group
      scale={1.35}
      onPointerOver={(e) => (e.stopPropagation(), setHov(true))}
      onPointerOut={() => setHov(false)}
      onClick={(e) => (e.stopPropagation(), setState({ mail: !up }))}
    >
      <mesh position={[0, 0.55, 0]}>
        <cylinderGeometry args={[0.1, 0.12, 1.1, 10]} />
        <meshStandardMaterial color="#8a5a35" />
      </mesh>
      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[1.3, 0.9, 1.9]} />
        <meshStandardMaterial color={hov ? '#f0504f' : '#df3b3b'} />
      </mesh>
      <mesh position={[0, 1.95, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.65, 0.65, 1.9, 24]} />
        <meshStandardMaterial color={hov ? '#f0504f' : '#df3b3b'} />
      </mesh>
      <mesh position={[0, 1.55, 0.96]}>
        <boxGeometry args={[0.9, 0.7, 0.05]} />
        <meshStandardMaterial color="#9c1f1f" />
      </mesh>
      <mesh position={[0, 1.6, 1.0]}>
        <sphereGeometry args={[0.07, 10, 10]} />
        <meshStandardMaterial color="#ffd23f" />
      </mesh>
      <group ref={flag} position={[0.68, 1.5, 0.2]}>
        <mesh position={[0, 0.35, 0]}>
          <boxGeometry args={[0.06, 0.7, 0.06]} />
          <meshStandardMaterial color="#ffd23f" />
        </mesh>
        <mesh position={[0.16, 0.62, 0]}>
          <boxGeometry args={[0.34, 0.22, 0.05]} />
          <meshStandardMaterial color="#ffd23f" />
        </mesh>
      </group>
    </group>
  )
}

function Envelope({ position, delay }) {
  return (
    <Float speed={2 + delay} floatIntensity={1.4} rotationIntensity={0.6}>
      <group position={position}>
        <mesh>
          <boxGeometry args={[0.7, 0.46, 0.05]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.6} />
        </mesh>
        <mesh position={[0, 0, 0.04]}>
          <sphereGeometry args={[0.07, 10, 10]} />
          <meshStandardMaterial color="#ff4d6d" emissive="#ff4d6d" emissiveIntensity={0.5} />
        </mesh>
      </group>
    </Float>
  )
}

export default function Contact({ position }) {
  return (
    <Tilt position={position}>
      <Island r={6} seed={17} trees={4} grass="#7ad67a">
        <SignBoard text="Contact Me" w={3.6} h={1.2} position={[-3.9, 1.5, 1.6]} rotation={[0, 0.4, 0]} />
        <group position={[-0.6, 0, 0.6]}>
          <Mailbox />
        </group>
        <Robot letter position={[2.7, 0.3, 1.7]} scale={1.25} />
        <Envelope position={[-2.2, 4.6, 0.4]} delay={0.2} />
        <Envelope position={[0.8, 5.4, -0.8]} delay={0.6} />
        <Envelope position={[3.2, 4.4, 0.2]} delay={1} />
      </Island>
    </Tilt>
  )
}

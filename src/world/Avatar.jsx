import { useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { Html, useCursor } from '@react-three/drei'
import { HELLO } from '../data.js'
import { stagePortal } from './htmlPortal.js'
import { getState, setState, useStore } from '../store.js'

const SKIN = '#f6b98f'
const HAIR = '#2b1d27'
const HOODIE = '#1c1c28'
const JEANS = '#3f6fb5'
const BLUE = '#2f6bff'

function useLogoTexture() {
  return useMemo(() => {
    const c = document.createElement('canvas')
    c.width = 256
    c.height = 128
    const g = c.getContext('2d')
    g.fillStyle = '#ffffff'
    g.font = 'bold 92px monospace'
    g.textAlign = 'center'
    g.textBaseline = 'middle'
    g.fillText('</>', 128, 66)
    const t = new THREE.CanvasTexture(c)
    t.colorSpace = THREE.SRGBColorSpace
    return t
  }, [])
}

// A cartoon version of you, built from simple shapes. Waves hello, looks at the mouse, hops when clicked.
export default function Avatar({ wave = true, talk = true, interactive = true, ...props }) {
  const root = useRef()
  const head = useRef()
  const armR = useRef()
  const armL = useRef()
  const hop = useRef(0)
  const [hov, setHov] = useState(false)
  useCursor(hov && interactive)
  const logo = useLogoTexture()
  const line = useStore((s) => s.wave)
  const here = useStore((s) => s.section === 0)

  useFrame(({ clock, pointer }, dt) => {
    const t = clock.elapsedTime
    armR.current.rotation.z = wave ? 2.55 + Math.sin(t * 7) * 0.32 : 0.15 + Math.sin(t * 6) * 0.35
    armL.current.rotation.z = wave ? -0.15 : -0.15 - Math.sin(t * 6) * 0.35
    head.current.rotation.y = THREE.MathUtils.damp(head.current.rotation.y, pointer.x * 0.6, 4, dt)
    head.current.rotation.x = THREE.MathUtils.damp(head.current.rotation.x, -pointer.y * 0.3, 4, dt)
    hop.current = Math.max(0, hop.current - dt * 2.2)
    root.current.position.y = Math.abs(Math.sin(t * 2.2)) * 0.05 + Math.sin(hop.current * Math.PI) * 0.9
  })

  const poke = (e) => {
    e.stopPropagation()
    hop.current = 1
    setState({ wave: (getState().wave + 1) % HELLO.length })
  }

  return (
    <group {...props}>
      <group
        ref={root}
        onPointerOver={interactive ? (e) => (e.stopPropagation(), setHov(true)) : undefined}
        onPointerOut={interactive ? () => setHov(false) : undefined}
        onClick={interactive ? poke : undefined}
      >
        {/* legs + shoes */}
        {[-0.26, 0.26].map((x) => (
          <group key={x}>
            <mesh position={[x, 0.58, 0]}>
              <cylinderGeometry args={[0.21, 0.19, 0.9, 14]} />
              <meshStandardMaterial color={JEANS} />
            </mesh>
            <mesh position={[x, 0.1, 0.08]}>
              <boxGeometry args={[0.38, 0.2, 0.6]} />
              <meshStandardMaterial color="#ffffff" />
            </mesh>
          </group>
        ))}
        {/* hoodie */}
        <mesh position={[0, 1.5, 0]}>
          <capsuleGeometry args={[0.5, 0.62, 6, 18]} />
          <meshStandardMaterial color={HOODIE} roughness={0.8} />
        </mesh>
        <mesh position={[0, 1.58, 0.51]}>
          <planeGeometry args={[0.62, 0.31]} />
          <meshBasicMaterial map={logo} transparent toneMapped={false} />
        </mesh>
        <mesh position={[0, 2.3, -0.28]}>
          <sphereGeometry args={[0.46, 18, 14]} />
          <meshStandardMaterial color={HOODIE} />
        </mesh>
        {/* headphones around the neck */}
        <mesh position={[0, 2.12, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.5, 0.065, 12, 32]} />
          <meshStandardMaterial color={BLUE} />
        </mesh>
        {[-0.5, 0.5].map((x) => (
          <mesh key={x} position={[x, 1.88, 0.22]} scale={[0.55, 1, 1]}>
            <sphereGeometry args={[0.2, 14, 14]} />
            <meshStandardMaterial color={BLUE} />
          </mesh>
        ))}
        {/* arms */}
        <group ref={armR} position={[0.66, 1.95, 0]}>
          <mesh position={[0, -0.42, 0]}>
            <capsuleGeometry args={[0.14, 0.66, 4, 12]} />
            <meshStandardMaterial color={HOODIE} />
          </mesh>
          <mesh position={[0, -0.92, 0]}>
            <sphereGeometry args={[0.17, 14, 14]} />
            <meshStandardMaterial color={SKIN} />
          </mesh>
        </group>
        <group ref={armL} position={[-0.66, 1.95, 0]}>
          <mesh position={[0, -0.42, 0]}>
            <capsuleGeometry args={[0.14, 0.66, 4, 12]} />
            <meshStandardMaterial color={HOODIE} />
          </mesh>
          <mesh position={[0, -0.92, 0]}>
            <sphereGeometry args={[0.17, 14, 14]} />
            <meshStandardMaterial color={SKIN} />
          </mesh>
        </group>
        {/* head */}
        <group ref={head} position={[0, 2.85, 0]}>
          <mesh>
            <sphereGeometry args={[0.68, 32, 24]} />
            <meshStandardMaterial color={SKIN} roughness={0.7} />
          </mesh>
          {[-0.68, 0.68].map((x) => (
            <mesh key={x} position={[x, -0.02, 0]} scale={[0.6, 1, 0.8]}>
              <sphereGeometry args={[0.16, 12, 12]} />
              <meshStandardMaterial color={SKIN} />
            </mesh>
          ))}
          {/* hair: a cap tilted back so the forehead shows, plus a swoopy fringe */}
          <mesh position={[0, 0.06, -0.06]} rotation={[-0.38, 0, 0]}>
            <sphereGeometry args={[0.73, 32, 20, 0, Math.PI * 2, 0, Math.PI * 0.56]} />
            <meshStandardMaterial color={HAIR} roughness={0.6} />
          </mesh>
          <mesh position={[0.28, 0.68, 0.3]} scale={[1.2, 0.8, 1]}>
            <sphereGeometry args={[0.3, 14, 12]} />
            <meshStandardMaterial color={HAIR} />
          </mesh>
          <mesh position={[-0.12, 0.72, 0.34]} scale={[1.1, 0.8, 1]}>
            <sphereGeometry args={[0.28, 14, 12]} />
            <meshStandardMaterial color={HAIR} />
          </mesh>
          {/* face */}
          {[-0.25, 0.25].map((x) => (
            <group key={x}>
              <mesh position={[x, 0.05, 0.57]}>
                <sphereGeometry args={[0.16, 18, 18]} />
                <meshStandardMaterial color="#ffffff" />
              </mesh>
              <mesh position={[x, 0.04, 0.7]}>
                <sphereGeometry args={[0.095, 14, 14]} />
                <meshStandardMaterial color="#3a2418" />
              </mesh>
              <mesh position={[x + 0.03, 0.08, 0.78]}>
                <sphereGeometry args={[0.03, 8, 8]} />
                <meshBasicMaterial color="#ffffff" />
              </mesh>
              <mesh position={[x, 0.3, 0.62]} rotation={[0, 0, x > 0 ? -0.15 : 0.15]}>
                <boxGeometry args={[0.22, 0.045, 0.05]} />
                <meshStandardMaterial color={HAIR} />
              </mesh>
              <mesh position={[x * 1.6, -0.14, 0.56]} scale={[1, 0.6, 0.35]}>
                <sphereGeometry args={[0.11, 12, 12]} />
                <meshStandardMaterial color="#ff8aa0" transparent opacity={0.7} />
              </mesh>
            </group>
          ))}
          <mesh position={[0, -0.08, 0.68]}>
            <sphereGeometry args={[0.06, 10, 10]} />
            <meshStandardMaterial color="#e8a27a" />
          </mesh>
          <mesh position={[0, -0.26, 0.62]} rotation={[0, 0, Math.PI]}>
            <torusGeometry args={[0.2, 0.035, 8, 22, Math.PI]} />
            <meshStandardMaterial color="#8a3b2a" />
          </mesh>
        </group>
        {talk && here && (
          <Html portal={stagePortal} position={[0.9, 4.15, 0]} center distanceFactor={11} style={{ pointerEvents: 'none' }}>
            <div className="bubble3d">{HELLO[line]}</div>
          </Html>
        )}
      </group>
    </group>
  )
}

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import Island from '../Island.jsx'
import PhotoCard from '../PhotoCard.jsx'
import SignBoard from '../SignBoard.jsx'
import Tilt from '../Tilt.jsx'
import { setState, useStore } from '../../store.js'
import house from '../../assets/about-house.jpg'

// Little sparkles that pop out of the house when you knock on the door.
function Sparkles({ on }) {
  const refs = useRef([])
  useFrame(({ clock }) => {
    refs.current.forEach((m, i) => {
      if (!m) return
      const t = (clock.elapsedTime * 0.7 + i / 10) % 1
      m.position.set(Math.sin(i * 2.4) * 3.4, 1.5 + t * 5.5, 1 + Math.cos(i * 1.7) * 1.5)
      m.scale.setScalar(on ? Math.sin(t * Math.PI) * 0.22 : 0)
    })
  })
  return Array.from({ length: 10 }, (_, i) => (
    <mesh key={i} ref={(m) => (refs.current[i] = m)}>
      <octahedronGeometry args={[1, 0]} />
      <meshBasicMaterial color={i % 2 ? '#ffd23f' : '#ff7ab8'} toneMapped={false} />
    </mesh>
  ))
}

export default function About({ position }) {
  const door = useStore((s) => s.door)
  return (
    <Tilt position={position}>
      <Island r={7} seed={5} trees={5}>
        <SignBoard text="About Me" w={3.4} h={1.2} position={[-4.6, 1.5, 3]} rotation={[0, 0.45, 0]} />
        <Sparkles on={door} />
      </Island>
      <PhotoCard
        src={house}
        w={7.2}
        position={[0, 4.9, -0.4]}
        rotation={[0, 0.1, 0]}
        frame="#ffb3d1"
        popped={door}
        onClick={() => setState({ door: !door })}
      />
    </Tilt>
  )
}

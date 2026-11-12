import { Float } from '@react-three/drei'
import Island from '../Island.jsx'
import Avatar from '../Avatar.jsx'
import Robot from '../Robot.jsx'
import PhotoCard from '../PhotoCard.jsx'
import SignBoard from '../SignBoard.jsx'
import Tilt from '../Tilt.jsx'
import portrait from '../../assets/hero-portrait.jpg'

function Rock({ position, s = 1 }) {
  return (
    <Float speed={1.4} floatIntensity={1.2}>
      <group position={position} scale={s}>
        <mesh>
          <cylinderGeometry args={[1.4, 1.2, 0.35, 16]} />
          <meshStandardMaterial color="#7ccf5a" flatShading />
        </mesh>
        <mesh position={[0, -1.1, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[1.2, 2, 10]} />
          <meshStandardMaterial color="#a8693f" flatShading />
        </mesh>
      </group>
    </Float>
  )
}

export default function Hero({ position }) {
  return (
    <Tilt position={position}>
      <Island r={7.2} seed={3} trees={6}>
        <Avatar position={[-0.6, 0, 1.6]} scale={0.95} />
        <Robot position={[2.7, 1.5, 2.4]} />
        <SignBoard text="TOTA.DEV" sub="MERN + AI Developer" w={4.6} h={2} position={[-3.9, 2.2, 0.2]} rotation={[0, 0.35, 0]} />
      </Island>
      <PhotoCard src={portrait} w={5.6} position={[4.9, 5.6, -2.2]} rotation={[0, -0.28, 0]} frame="#ffd23f" />
      <Rock position={[-8, 4.5, -5]} s={0.7} />
      <Rock position={[9, -1.5, -7]} s={0.9} />
      <Rock position={[-5.5, -3.5, 4]} s={0.5} />
    </Tilt>
  )
}

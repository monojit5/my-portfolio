import { Suspense, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { ScrollControls } from '@react-three/drei'
import { PAGES } from '../scrollMap.js'
import { setState } from '../store.js'
import { STATIONS } from './layout.js'
import ScrollBridge from './ScrollBridge.jsx'
import CameraRig from './CameraRig.jsx'
import Sky from './Sky.jsx'
import Clouds from './Clouds.jsx'
import Hero from './stations/Hero.jsx'
import About from './stations/About.jsx'
import Projects from './stations/Projects.jsx'
import Skills from './stations/Skills.jsx'
import Journey from './stations/Journey.jsx'
import Contact from './stations/Contact.jsx'

// Runs once everything (including the photos) has finished loading.
function Ready() {
  useEffect(() => setState({ ready: true }), [])
  return null
}

export default function World() {
  return (
    <Canvas dpr={[1, 1.75]} camera={{ fov: 45, position: [0, 3.2, 17], near: 0.1, far: 420 }} gl={{ antialias: true }}>
      <color attach="background" args={['#bfe8ff']} />
      <fog attach="fog" args={['#d3ecff', 50, 190]} />
      <hemisphereLight args={['#ffffff', '#a9d4ff', 1.15]} />
      <directionalLight position={[8, 16, 12]} intensity={2.1} />
      <Suspense fallback={null}>
        <ScrollControls pages={PAGES} damping={0.25}>
          <ScrollBridge />
          <CameraRig />
          <Sky />
          <Clouds />
          <Hero position={STATIONS[0]} />
          <About position={STATIONS[1]} />
          <Projects position={STATIONS[2]} />
          <Skills position={STATIONS[3]} />
          <Journey position={STATIONS[4]} />
          <Contact position={STATIONS[5]} />
        </ScrollControls>
        <Ready />
      </Suspense>
    </Canvas>
  )
}

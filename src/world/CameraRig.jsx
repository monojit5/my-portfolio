import { useMemo } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { SECTIONS } from '../data.js'
import { STATIONS } from './layout.js'
import { live } from '../store.js'

const smooth = (t) => t * t * (3 - 2 * t)
const damp = THREE.MathUtils.damp

// Camera pose that frames station k. On wide screens the island sits on the side opposite the text panel.
function pose(k, narrow, out) {
  const [sx, sy, sz] = STATIONS[k]
  const shift = narrow ? 0 : SECTIONS[k].side === 'left' ? -4.6 : 4.6
  out.pos.set(sx + shift, sy + 3.6, sz + (narrow ? 25 : 23))
  out.look.set(sx + shift, sy + (narrow ? -1.2 : 3.2), sz)
  return out
}

export default function CameraRig() {
  const size = useThree((s) => s.size)
  const reduce = useMemo(() => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches, [])
  const tmp = useMemo(
    () => ({
      a: { pos: new THREE.Vector3(), look: new THREE.Vector3() },
      b: { pos: new THREE.Vector3(), look: new THREE.Vector3() },
      look: new THREE.Vector3(0, 2.4, 0),
    }),
    [],
  )

  useFrame(({ camera, pointer, clock }, dt) => {
    const narrow = size.width / size.height < 0.95
    // phones are tall and thin, so use a wider lens to keep a whole island in view
    const fov = narrow ? 62 : 45
    if (camera.fov !== fov) {
      camera.fov = fov
      camera.updateProjectionMatrix()
    }
    const k = live.k
    const next = Math.min(k + 1, SECTIONS.length - 1)
    const t = smooth(live.travel)
    pose(k, narrow, tmp.a)
    pose(next, narrow, tmp.b)
    const pos = tmp.a.pos.lerp(tmp.b.pos, t)
    const look = tmp.a.look.lerp(tmp.b.look, t)

    // fly a little higher in the middle of a trip so we glide over the clouds
    pos.y += Math.sin(Math.PI * t) * 3
    const par = reduce ? 0.25 : 1
    pos.x += pointer.x * 1.8 * par
    pos.y += pointer.y * 1.1 * par + Math.sin(clock.elapsedTime * 0.6) * 0.12 * par
    look.x += pointer.x * 0.5 * par

    camera.position.x = damp(camera.position.x, pos.x, 4, dt)
    camera.position.y = damp(camera.position.y, pos.y, 4, dt)
    camera.position.z = damp(camera.position.z, pos.z, 4, dt)
    tmp.look.x = damp(tmp.look.x, look.x, 4, dt)
    tmp.look.y = damp(tmp.look.y, look.y, 4, dt)
    tmp.look.z = damp(tmp.look.z, look.z, 4, dt)
    camera.lookAt(tmp.look)
  })
  return null
}

import { useEffect, useMemo } from 'react'
import * as THREE from 'three'

function paint(tex, text, sub, w, h) {
  const c = tex.userData.canvas
  const g = c.getContext('2d')
  const grad = g.createLinearGradient(0, 0, 0, h)
  grad.addColorStop(0, '#c98544')
  grad.addColorStop(1, '#a8672d')
  g.fillStyle = grad
  g.fillRect(0, 0, w, h)
  g.strokeStyle = 'rgba(90,45,10,0.35)'
  g.lineWidth = 3
  for (let y = h / 3; y < h; y += h / 3) {
    g.beginPath()
    g.moveTo(0, y)
    g.lineTo(w, y)
    g.stroke()
  }
  g.strokeStyle = '#6b3510'
  g.lineWidth = 14
  g.strokeRect(7, 7, w - 14, h - 14)
  g.textAlign = 'center'
  g.textBaseline = 'middle'
  const size = Math.min(h * (sub ? 0.5 : 0.62), (w * 0.86) / Math.max(4, text.length * 0.55))
  g.font = `${size}px "Lilita One", "Trebuchet MS", sans-serif`
  g.lineJoin = 'round'
  g.lineWidth = size * 0.18
  g.strokeStyle = '#6b3510'
  const ty = sub ? h * 0.4 : h * 0.52
  g.strokeText(text, w / 2, ty)
  g.fillStyle = '#ffd23f'
  g.fillText(text, w / 2, ty)
  if (sub) {
    g.font = `800 ${h * 0.17}px Nunito, sans-serif`
    g.lineWidth = h * 0.05
    g.strokeText(sub, w / 2, h * 0.78)
    g.fillStyle = '#fff'
    g.fillText(sub, w / 2, h * 0.78)
  }
  tex.needsUpdate = true
}

// A wooden sign with text painted on it (like the signs in your mood board).
export default function SignBoard({ text, sub, w = 3.4, h = 1.2, posts = true, dim = false, ...props }) {
  const PX = 512
  const PY = Math.round((PX * h) / w)
  const tex = useMemo(() => {
    const c = document.createElement('canvas')
    c.width = PX
    c.height = PY
    const t = new THREE.CanvasTexture(c)
    t.colorSpace = THREE.SRGBColorSpace
    t.anisotropy = 8
    t.userData.canvas = c
    return t
  }, [PY])

  useEffect(() => {
    paint(tex, text, sub, PX, PY)
    document.fonts?.ready.then(() => paint(tex, text, sub, PX, PY))
  }, [tex, text, sub, PY])

  return (
    <group {...props}>
      {posts &&
        [-1, 1].map((s) => (
          <mesh key={s} position={[s * w * 0.36, -h * 0.9, -0.05]}>
            <cylinderGeometry args={[0.07, 0.09, h * 1.8, 8]} />
            <meshStandardMaterial color="#7a4a22" />
          </mesh>
        ))}
      <mesh>
        <boxGeometry args={[w, h, 0.18]} />
        <meshStandardMaterial color={dim ? '#8a7a68' : '#b87333'} />
      </mesh>
      <mesh position={[0, 0, 0.1]}>
        <planeGeometry args={[w, h]} />
        <meshStandardMaterial map={tex} color={dim ? '#9a9aa8' : '#ffffff'} roughness={0.7} />
      </mesh>
    </group>
  )
}

import { useProgress } from '@react-three/drei'
import { useStore } from '../store.js'

export default function Loader() {
  const ready = useStore((s) => s.ready)
  const { progress } = useProgress()
  return (
    <div className="loader" data-hidden={ready} role="status" aria-live="polite">
      <div className="loader-bot" aria-hidden="true">
        <span />
        <span />
      </div>
      <p className="loader-title">Building the world…</p>
      <div className="loader-bar" aria-hidden="true">
        <i style={{ width: `${Math.max(6, Math.round(progress))}%` }} />
      </div>
    </div>
  )
}

import { useEffect, useRef } from 'react'
import { PROJECTS } from '../data.js'
import { setState, useStore } from '../store.js'

// Opens when you click a building in the Project Gallery (or pick a project from the panel).
export default function ProjectModal() {
  const id = useStore((s) => s.project)
  const p = PROJECTS.find((x) => x.id === id)
  const close = useRef(null)

  useEffect(() => {
    if (!p) return
    close.current?.focus()
    const onKey = (e) => e.key === 'Escape' && setState({ project: null })
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [p])

  if (!p) return null
  return (
    <div className="modal-back" onClick={() => setState({ project: null })}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="pm-title" onClick={(e) => e.stopPropagation()} onWheel={(e) => e.stopPropagation()}>
        <div className="modal-head" style={{ background: p.color }}>
          <div>
            <p className="eyebrow light">Project</p>
            <h2 id="pm-title">{p.name}</h2>
            <p className="modal-tag">{p.tagline}</p>
          </div>
          <button ref={close} type="button" className="x" aria-label="Close project" onClick={() => setState({ project: null })}>
            ×
          </button>
        </div>
        <div className="modal-body">
          <ul className="points">
            {p.points.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <div className="chips">
            {p.stack.map((s) => (
              <span key={s} className="chip">
                {s}
              </span>
            ))}
          </div>
          <div className="btn-row">
            {p.live && (
              <a className="btn green" href={p.live} target="_blank" rel="noopener noreferrer">
                Live demo
              </a>
            )}
            <a className="btn purple" href={p.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

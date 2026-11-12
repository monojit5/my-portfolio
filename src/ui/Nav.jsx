import { useState } from 'react'
import { SECTIONS, PROFILE } from '../data.js'
import { navApi, useStore } from '../store.js'

export default function Nav() {
  const section = useStore((s) => s.section)
  const [open, setOpen] = useState(false)
  return (
    <nav className={`nav${open ? ' nav-open' : ''}`} aria-label="Sections">
      <button type="button" className="nav-logo" aria-label={`${PROFILE.brand} home`} onClick={() => { navApi.scrollToSection(0); setOpen(false) }}>
        {'<tota/>'}
      </button>
      <button
        type="button"
        className="nav-toggle"
        aria-expanded={open}
        aria-controls="section-links"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? 'Close' : 'Menu'}
      </button>
      <div className="nav-links" id="section-links">
        {SECTIONS.map((s, i) => (
          <button key={s.id} type="button" aria-current={section === i} onClick={() => { navApi.scrollToSection(i); setOpen(false) }}>
            {s.label}
          </button>
        ))}
      </div>
    </nav>
  )
}

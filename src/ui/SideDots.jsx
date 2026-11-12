import { SECTIONS } from '../data.js'
import { navApi, useStore } from '../store.js'

export default function SideDots() {
  const section = useStore((s) => s.section)
  return (
    <div className="dots" role="group" aria-label="Jump to section">
      {SECTIONS.map((s, i) => (
        <button key={s.id} type="button" aria-label={s.label} aria-current={section === i} onClick={() => navApi.scrollToSection(i)}>
          <span />
        </button>
      ))}
    </div>
  )
}

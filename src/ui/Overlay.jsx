import { useState } from 'react'
import { JOURNEY, PROFILE, PROJECTS, SECTIONS, SKILLS } from '../data.js'
import { navApi, setState, useStore } from '../store.js'
import ContactPanel from './ContactPanel.jsx'
import { TypeAnimation } from 'react-type-animation'
function Home() {
  return (
    <>
      <p className="eyebrow">Welcome to my world</p>
    <h3>
  Hi, I'm{' '}
  <span className="hl">
    <TypeAnimation
      sequence={['Tota', 1500, 'Monojit', 1500]}
      wrapper="span"
      speed={50}
      deletionSpeed={50}
      repeat={Infinity}
    />
  </span>!
</h3>
<h4 className="typing-heading">
  <span className="hl">
    <TypeAnimation
      sequence={[
        'Aspiring MERN Stack Developer', 1800,
        'React.js Developer', 1800,
        'Node.js Developer', 1800,
        'Full Stack Developer', 1800,
        'AI Enthusiast', 1800,
      ]}
      wrapper="span"
      speed={45}
      deletionSpeed={55}
      repeat={Infinity}
    />
  </span>
</h4>
      <p className="note">Open to Full Stack / MERN developer roles.</p>
      <div className="btn-row">
        <button type="button" className="btn green" onClick={() => navApi.scrollToSection(1)}>
          Explore my world
        </button>
        <button type="button" className="btn purple" onClick={() => navApi.scrollToSection(2)}>
          See projects
        </button>
      </div>
      {/* <p className="hint">Move the mouse to look around. Scroll to travel. Click the character to say hi.</p> */}
    </>
  )
}

function About() {
  const door = useStore((s) => s.door)
  return (
    <>
      <p className="eyebrow">About me</p>
      <h2>The house on the hill</h2>
      <p>{PROFILE.summary}</p>
      <div className="chips">
        <span className="chip">{PROFILE.location}</span>
        <span className="chip">Graduated 2026</span>
        <span className="chip">Seeking Full Stack / MERN role</span>
      </div>
      <button type="button" className="btn gold" aria-expanded={door} onClick={() => setState({ door: !door })}>
        {door ? 'Close the door' : 'Knock on the door'}
      </button>
      {door && (
        <div className="reveal">
          <p className="note">Inside, I own a project end to end:</p>
          <ul className="points">
            {PROFILE.endToEnd.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      )}
      <p className="hint">You can also click the house photo in the world.</p>
    </>
  )
}

function Projects() {
  return (
    <>
      <p className="eyebrow">Project gallery</p>
      <h2>Pick a building</h2>
      <p>Click a building in the world to open its project, or choose one here.</p>
      <ul className="list">
        {PROJECTS.map((p) => (
          <li key={p.id}>
            <button type="button" onClick={() => setState({ project: p.id })}>
              <i style={{ background: p.color }} aria-hidden="true" />
              <b>{p.name}</b>
              <small>{p.tagline}</small>
            </button>
          </li>
        ))}
      </ul>
    </>
  )
}

function Skills() {
  const sel = useStore((s) => s.skill)
  const s = SKILLS.find((x) => x.id === sel)
  return (
    <>
      <p className="eyebrow">Coding lab</p>
      <h2>Touch a crystal</h2>
      <div className="detail" aria-live="polite" style={{ borderColor: s ? s.color : undefined }}>
        {s ? (
          <>
            <p className="eyebrow" style={{ margin: 0 }}>
              {s.group}
            </p>
            <h3>{s.name}</h3>
            <p>{s.blurb}</p>
            <div className="chips">
              {s.usedIn.map((u) => (
                <span key={u} className="chip">
                  {u}
                </span>
              ))}
            </div>
          </>
        ) : (
          <p>Click any floating crystal in the lab, or pick a technology below, to see how I use it.</p>
        )}
      </div>
      <div className="chips pick">
        {SKILLS.map((k) => (
          <button key={k.id} type="button" className="chip btnchip" aria-pressed={sel === k.id} onClick={() => setState({ skill: sel === k.id ? null : k.id })}>
            <i style={{ background: k.color }} aria-hidden="true" />
            {k.name}
          </button>
        ))}
      </div>
    </>
  )
}

function Journey() {
  const step = useStore((s) => s.journeyStep)
  const m = JOURNEY[step - 1]
  return (
    <>
      <p className="eyebrow">Journey road</p>
      <h2>Walk the road</h2>
      <p className="note">Keep scrolling and my character walks the road.</p>
      <div className="detail" key={m.id}>
        <p className="eyebrow" style={{ margin: 0 }}>
          {m.label} · {m.meta}
        </p>
        <h3>{m.title}</h3>
        <p className="place">{m.place}</p>
        <p>{m.text}</p>
      </div>
      <ol className="steps" aria-label="Milestones">
        {JOURNEY.map((j, i) => (
          <li key={j.id} data-on={step >= i + 1} aria-current={step === i + 1 ? 'step' : undefined}>
            <button type="button" aria-pressed={step === i + 1} onClick={() => navApi.scrollToJourneyStep(i + 1)}>
              {j.label}
            </button>
          </li>
        ))}
      </ol>
    </>
  )
}

function Contact() {
  const mail = useStore((s) => s.mail)
  const [copied, setCopied] = useState('')
  const copy = async (txt, key) => {
    try {
      await navigator.clipboard.writeText(txt)
      setCopied(key)
      setTimeout(() => setCopied(''), 1500)
    } catch {
      setCopied('')
    }
  }
  return (
    <>
      <p className="eyebrow">Contact me</p>
      <h2>Let's build something</h2>
      <p>I'm looking for a Full Stack / MERN developer role. Say hello!</p>
      <dl className="contact">
        <div>
          <dt>Email</dt>
          <dd>
            <span>{PROFILE.email}</span>
            <button type="button" className="mini" onClick={() => copy(PROFILE.email, 'e')}>
              {copied === 'e' ? 'Copied' : 'Copy'}
            </button>
          </dd>
        </div>
        <div>
          <dt>Phone</dt>
          <dd>
            <span>{PROFILE.phone}</span>
            <button type="button" className="mini" onClick={() => copy(PROFILE.phone, 'p')}>
              {copied === 'p' ? 'Copied' : 'Copy'}
            </button>
          </dd>
        </div>
      </dl>
      <div className="btn-row">
        <a className="btn purple" href={PROFILE.github} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <a className="btn green" href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
      </div>
      <p className="hint">{mail ? 'The mailbox flag is up. Letters welcome!' : 'Click the mailbox to raise its flag.'}</p>
    </>
  )
}

const VIEWS = { home: Home, about: About, projects: Projects, skills: Skills, journey: Journey, contact: ContactPanel }

export default function Overlay() {
  const section = useStore((s) => s.section)
  return (
    <div className="overlay" onWheel={(e) => navApi.scrollBy(e.deltaY)}>
      {SECTIONS.map((s, i) => {
        const View = VIEWS[s.id]
        return (
          <section key={s.id} className={`panel side-${s.side}`} data-id={s.id} data-active={section === i} aria-hidden={section !== i} aria-label={s.label}>
            <View />
          </section>
        )
      })}
    </div>
  )
}

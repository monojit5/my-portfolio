import { useState } from 'react'
import { PROFILE } from '../data.js'
import { useStore } from '../store.js'

// Optional: set VITE_FORM_ENDPOINT (for example a Formspree URL) in a .env file to send messages without opening an email app.
const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT

export default function ContactPanel() {
  const mail = useStore((s) => s.mail)
  const [copied, setCopied] = useState('')
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent | opened | error

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

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
      
      <p>I'm looking for a Full Stack / MERN developer role. Send me a message!</p>

      

      <div className="quick">
        <button type="button" className="mini" onClick={() => copy(PROFILE.email, 'e')}>
          {copied === 'e' ? 'Copied' : `Copy ${PROFILE.email}`}
        </button>
        
<button
  type="button"
  className="mini"
  onClick={() => copy(PROFILE.phone, 'p')}
>
  {copied === 'p'
    ? 'Copied!'
    : `Phone: ${String(PROFILE.phone).slice(0, 4)}****`}
</button>
<a className="mini" href={PROFILE.github} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <a className="mini" href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
      </div>
      {/* <p className="hint">{mail ? 'The mailbox flag is up. Letters welcome!' : 'Tip: click the mailbox in the world to raise its flag.'}</p> */}
    </>
  )
}

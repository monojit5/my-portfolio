import { useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'
import { SECTIONS } from '../data.js'
import { HOLD, PAGES, STARTS, locate, JOURNEY_INDEX } from '../scrollMap.js'
import { setState, navApi, live } from '../store.js'

// Reads the scroll position and tells the rest of the app which section is active.
export default function ScrollBridge() {
  const scroll = useScroll()

  useEffect(() => {
    navApi.scrollToSection = (k) => {
      const el = scroll.el
      const max = el.scrollHeight - el.clientHeight
      el.scrollTo({ top: (STARTS[k] / (PAGES - 1)) * max, behavior: 'smooth' })
    }
    navApi.scrollToJourneyStep = (step) => {
      const el = scroll.el
      const max = el.scrollHeight - el.clientHeight
      const local = HOLD * ((step - 0.5) / 4)
      const position = STARTS[JOURNEY_INDEX] + local * SECTIONS[JOURNEY_INDEX].len
      el.scrollTo({ top: (position / (PAGES - 1)) * max, behavior: 'smooth' })
    }
    navApi.scrollBy = (dy) => scroll.el.scrollBy({ top: dy })
  }, [scroll])

  useFrame(() => {
    const loc = locate(scroll.offset * (PAGES - 1))
    live.k = loc.k
    live.hold = loc.hold
    live.travel = loc.travel
    const active = loc.travel > 0.5 ? loc.k + 1 : loc.k
    let step = 1
    if (loc.k > JOURNEY_INDEX) step = 4
    else if (loc.k === JOURNEY_INDEX) step = Math.min(4, Math.floor(loc.hold * 4) + 1)
    setState({ section: active, journeyStep: step })
  })
  return null
}

import { useSyncExternalStore } from 'react'

// Tiny shared store so the 3D scene (react-three-fiber) and the DOM UI can talk to each other.
let state = {
  section: 0, // active section index
  journeyStep: 1, // 1..4 milestone reached on the journey road
  skill: null, // selected crystal id
  project: null, // open project id
  door: false, // About: door knocked
  mail: false, // Contact: mailbox flag up
  wave: 0, // hero speech-bubble index
  ready: false,
}
const subs = new Set()

export const getState = () => state
export function setState(patch) {
  let changed = false
  for (const k in patch) if (state[k] !== patch[k]) changed = true
  if (!changed) return
  state = { ...state, ...patch }
  subs.forEach((f) => f())
}
export function useStore(selector = (s) => s) {
  return useSyncExternalStore(
    (cb) => {
      subs.add(cb)
      return () => subs.delete(cb)
    },
    () => selector(state),
    () => selector(state),
  )
}

// Per-frame values written by the scroll bridge and read inside the 3D scene (no re-renders).
export const live = { k: 0, hold: 0, travel: 0 }

// Filled in by the scroll bridge inside the canvas.
export const navApi = {
  scrollToSection: () => {},
  scrollToJourneyStep: () => {},
  scrollBy: () => {},
}

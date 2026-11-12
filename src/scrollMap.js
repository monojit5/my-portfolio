import { SECTIONS } from './data.js'

// How scroll position maps to sections. Positions are measured in "pages" (one page = one screen height).
export const HOLD = 0.62 // the camera rests at a station for 62% of a section, then flies to the next
export const PAGES = SECTIONS.reduce((a, s) => a + s.len, 0)
export const STARTS = SECTIONS.reduce((arr, s, i) => {
  arr.push(i === 0 ? 0 : arr[i - 1] + SECTIONS[i - 1].len)
  return arr
}, [])
export const JOURNEY_INDEX = SECTIONS.findIndex((s) => s.id === 'journey')

export function locate(p) {
  let k = SECTIONS.length - 1
  for (let i = 0; i < SECTIONS.length; i++) {
    if (p < STARTS[i] + SECTIONS[i].len) {
      k = i
      break
    }
  }
  const local = Math.max(0, (p - STARTS[k]) / SECTIONS[k].len)
  const last = k === SECTIONS.length - 1
  const hold = Math.min(1, local / HOLD)
  const travel = last ? 0 : Math.min(1, Math.max(0, (local - HOLD) / (1 - HOLD)))
  return { k, local, hold, travel }
}

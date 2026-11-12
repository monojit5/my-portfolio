// Where each station (floating island) sits in the 3D world: [x, y, z]
export const STATIONS = [
  [0, 0, 0], // home
  [16, 4, -40], // about
  [-15, -3, -80], // projects
  [15, 3, -120], // skills
  [-13, 0, -160], // journey
  [0, 4, -200], // contact
]

export const TAU = Math.PI * 2

// Small seeded random so the world looks the same on every load.
export function rng(seed) {
  let a = seed >>> 0
  return () => {
    a += 0x6d2b79f5
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

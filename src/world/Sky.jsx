import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

// Big gradient dome that follows the camera: blue overhead, pastel pink at the horizon.
export default function Sky() {
  const ref = useRef()
  const uniforms = useMemo(
    () => ({
      top: { value: new THREE.Color('#49a8f2') },
      mid: { value: new THREE.Color('#bfe8ff') },
      bottom: { value: new THREE.Color('#ffd6ea') },
    }),
    [],
  )
  useFrame(({ camera }) => ref.current.position.copy(camera.position))
  return (
    <mesh ref={ref} renderOrder={-10} frustumCulled={false}>
      <sphereGeometry args={[320, 32, 20]} />
      <shaderMaterial
        side={THREE.BackSide}
        depthWrite={false}
        fog={false}
        uniforms={uniforms}
        vertexShader={`varying vec3 vDir; void main(){ vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`}
        fragmentShader={`
          uniform vec3 top; uniform vec3 mid; uniform vec3 bottom; varying vec3 vDir;
          void main(){
            float h = vDir.y;
            vec3 c = h > 0.0 ? mix(mid, top, pow(h, 0.55)) : mix(mid, bottom, pow(-h, 0.45));
            gl_FragColor = vec4(c, 1.0);
            #include <colorspace_fragment>
          }`}
      />
    </mesh>
  )
}

import React from 'react'

import * as THREE from 'three'
import OBJModelLoader from 'components/three/Loader/OBJLoader'
import { useFrame } from '@react-three/fiber'
import { useBox } from '@react-three/cannon'


const Vessel: React.FC<any> = ({ waveA, waveB, waveC }) => {
  // const ref= React.useRef()

  const [ref, api] = useBox(() => ({ mass: 100000, position: [0, 500, 0] }))
  console.log(api)
  useFrame((state, delta) => {
    // api.position.set(0, delta * 100, 0)
  })

  const getWaveInfo = (
    offsetX: any,
    offsetZ: any,
    x: any,
    z: any,
    time: any
  ) => {
    const pos = new THREE.Vector3()
    const tangent = new THREE.Vector3(1, 0, 0)
    const binormal = new THREE.Vector3(0, 0, 1)

    ;[waveA, waveB, waveC].forEach((w: any) => {
      const k = (Math.PI * 2.0) / w.wavelength
      const c = Math.sqrt(9.8 / k)
      const d = new THREE.Vector2(
        Math.sin((w.direction * Math.PI) / 180),
        -Math.cos((w.direction * Math.PI) / 180)
      )
      const f = k * (d.dot(new THREE.Vector2(x, z)) - c * time)
      const a = w.steepness / k

      pos.x += d.x * (a * Math.cos(f))
      pos.y += a * Math.sin(f)
      pos.z += d.y * (a * Math.cos(f))

      tangent.x += -d.x * d.x * (w.steepness * Math.sin(f))
      tangent.y += d.x * (w.steepness * Math.cos(f))
      tangent.z += -d.x * d.y * (w.steepness * Math.sin(f))

      binormal.x += -d.x * d.y * (w.steepness * Math.sin(f))
      binormal.y += d.y * (w.steepness * Math.cos(f))
      binormal.z += -d.y * d.y * (w.steepness * Math.sin(f))
    })

    const normal = binormal.cross(tangent).normalize()
    return { position: pos, normal: normal }
  }

  return (
    <OBJModelLoader
      ref={ref}
      model="vessel.obj"
      scale={[0.01, 0.01, 0.01]}
      position={[0, 0, 0]}
    />
  )
}

export default Vessel
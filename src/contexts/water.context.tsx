import { useContext, createContext } from 'react'

import * as THREE from 'three'
import { useControls } from 'leva'

import { Wave } from 'models/wave.model'

const WaterContext = createContext<{
  waveA: Wave
  waveB: Wave
  waveC: Wave
  getWaveInfo: (x: any, y: any, time: any) => THREE.Vector3
}>({
  waveA: {
    direction: 0,
    steepness: 0,
    wavelength: 100,
  },
  waveB: {
    direction: 0,
    steepness: 0,
    wavelength: 100,
  },
  waveC: {
    direction: 0,
    steepness: 0,
    wavelength: 100,
  },
  getWaveInfo: (x: any, y: any, time: any) => new THREE.Vector3(),
})

const WaterRefProvider: React.FC = ({ children }) => {
  const waveA: Wave = useControls('Wave A', {
    direction: { label: 'Direction', value: 0, step: 1, min: 0, max: 359 },
    steepness: { label: 'Steepness', value: 0.15, step: 0.01, min: 0, max: 1 },
    wavelength: { label: 'Wave Length', value: 100, step: 1, min: 1, max: 100 },
  })

  const waveB: Wave = useControls('Wave B', {
    direction: { label: 'Direction', value: 30, step: 1, min: 0, max: 359 },
    steepness: { label: 'Steepness', value: 0.15, step: 0.01, min: 0, max: 1 },
    wavelength: { label: 'Wave Length', value: 50, step: 1, min: 1, max: 100 },
  })

  const waveC: Wave = useControls('Wave C', {
    direction: { label: 'Direction', value: 60, step: 1, min: 0, max: 359 },
    steepness: { label: 'Steepness', value: 0.15, step: 0.01, min: 0, max: 1 },
    wavelength: { label: 'Wave Length', value: 25, step: 1, min: 1, max: 100 },
  })

  const getWaveInfo = (x: any, z: any, time: any): THREE.Vector3 => {
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

    return pos
  }

  return (
    <WaterContext.Provider
      value={{
        waveA,
        waveB,
        waveC,
        getWaveInfo,
      }}
    >
      {children}
    </WaterContext.Provider>
  )
}

const useWaterContext = () => {
  const context = useContext(WaterContext)

  return context
}

export { WaterRefProvider, useWaterContext }

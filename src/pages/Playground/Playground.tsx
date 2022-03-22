import React from 'react'

import { useControls } from 'leva'

import PageContent from 'components/layout/PageContent'
import Canvas from 'components/three/Canvas'
import Sky from 'components/three/Sky'
import GerstnerWater from 'components/three/Water/GerstnerWater'

import { Wave } from 'models/wave.model'

const PlaygroundPage: React.FC = () => {
  // Water Controls
  const { wireframe, size } = useControls('Water', {
    size: { label: 'Water Area', value: 512, min: 64, max: 1024, step: 1 },
    wireframe: { label: 'Wireframe', value: false },
  })

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

  return (
    <PageContent>
      <Canvas>
        <Sky />
        <GerstnerWater
          waveA={waveA}
          waveB={waveB}
          waveC={waveC}
          wireframe={wireframe}
          size={size}
        />
      </Canvas>
    </PageContent>
  )
}

export default PlaygroundPage

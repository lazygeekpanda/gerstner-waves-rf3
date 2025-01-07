import React from 'react'
import { useControls } from 'leva'

import PageContent from 'components/layout/PageContent'
import Canvas from 'components/three/Canvas'
import Sky from 'components/three/Sky'
import Vessel from 'components/three/Vessel'
import GerstnerWater from 'components/three/Water/GerstnerWater'

import { useWaterContext, WaterRefProvider } from 'contexts/water.context'

const PlaygroundPage: React.FC = () => {
  // Water Controls
  const { wireframe, size } = useControls('Water', {
    size: { label: 'Water Area', value: 512, min: 64, max: 1024, step: 1 },
    wireframe: { label: 'Wireframe', value: false },
  })

  const { waveA, waveB, waveC, getWaveInfo } = useWaterContext()

  return (
    <PageContent>
      <Canvas>
        <ambientLight intensity={0.15} position={[100, 100, 100]} />
        <pointLight position={[100, 100, 100]} intensity={0.5} />
        <Sky />

        <Vessel getWaveInfo={getWaveInfo} />
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

const PageWithContext: React.FC = () => (
  <>
    <WaterRefProvider>
      <PlaygroundPage />
    </WaterRefProvider>
  </>
)

export default PageWithContext

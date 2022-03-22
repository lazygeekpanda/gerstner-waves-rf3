import { memo } from 'react'
import { Sky } from '@react-three/drei'

const SkyObject = () => {
  return (
    <>
      <Sky
        distance={450000}
        sunPosition={[1000, 1000, 8000]}
        inclination={10}
        turbidity={0.5}
      />
    </>
  )
}

export default memo(SkyObject)

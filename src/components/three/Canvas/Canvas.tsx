import * as React from 'react'
import { Canvas as R3FCanvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Stats from 'components/three/Stats'

import * as styled from './Canvas.styled'

const Canvas: React.FC = ({ children }) => (
  <styled.Wrapper>
    <R3FCanvas camera={{ position: [75, 25, 25] }}>
      <OrbitControls
        // Zoom limits
        minDistance={15}
        maxDistance={150}
        // Disable camera below surface
        maxPolarAngle={Math.PI / 2.5}
      />
      {children}
      {process.env.NODE_ENV !== 'production' ? <Stats /> : null}
    </R3FCanvas>
  </styled.Wrapper>
)

export default Canvas

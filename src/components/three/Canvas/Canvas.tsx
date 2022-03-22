import * as React from 'react'
import { Canvas as R3FCanvas } from '@react-three/fiber'

import Controls from 'components/three/Controls'
import Stats from 'components/three/Stats'

import * as styled from './Canvas.styled'

const Canvas: React.FC = ({ children }) => (
  <styled.Wrapper>
    <R3FCanvas>
      <Controls>
        {children}
      </Controls>

      <Stats />
    </R3FCanvas>
  </styled.Wrapper>
)

export default Canvas

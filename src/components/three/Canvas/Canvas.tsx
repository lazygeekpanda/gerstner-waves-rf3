import * as React from 'react'
import { Canvas as R3FCanvas } from '@react-three/fiber'

import * as styled from './Canvas.styled'

const Canvas: React.FC = ({ children }) => (
  <styled.Wrapper>
    <R3FCanvas>{children}</R3FCanvas>
  </styled.Wrapper>
)

export default Canvas

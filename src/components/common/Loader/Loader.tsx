import *as React from 'react';

import * as styled from './Loader.styled'

interface Props {
  message?: string
}

const Loader: React.FC<Props> = ({ message }) => (
  <styled.Wrapper>{message || "Loading"}</styled.Wrapper>
)

export default Loader
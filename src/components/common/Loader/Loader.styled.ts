import styled from 'styled-components'

import sizes from 'styles/sizes'

export const Wrapper = styled.div`
  position: absolute;

  top: ${sizes.header};
  bottom: 0;
  right: 0;
  left: 0;

  background-color: rgba(0, 0, 0, .25);

  display: flex;
  align-items: center;
  justify-content: center;
`
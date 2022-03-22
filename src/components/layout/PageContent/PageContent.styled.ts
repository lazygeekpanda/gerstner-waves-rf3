import styled from 'styled-components'

import sizes from 'styles/sizes'
import colors from 'styles/colors'

export const Wrapper = styled.div`
  height: calc(100vh - ${sizes.header});
  background-color: ${colors.bg};

  overflow: hidden;
`
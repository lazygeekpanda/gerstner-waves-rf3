import * as React from 'react';

import * as styled from './PageWrapper.styled'

const PageWrapper: React.FC = ({ children }) => (
  <styled.Wrapper>
    {children}
  </styled.Wrapper>
)

export default PageWrapper
import * as React from 'react';

import * as styled from './PageContent.styled'

const PageContent: React.FC = ({ children }) => (
  <styled.Wrapper>
    {children}
  </styled.Wrapper>
)

export default PageContent
import styled from 'styled-components'

import colors from 'styles/colors'

export const Wrapper = styled.div`
  width: 100%;
  height: 4rem;

  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  padding: 10px 20px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  a {
    color: ${colors.black};
    text-decoration: none;
    font-size: 0.875rem;
  }

  > a {
    display: inline-flex;
  }
`

export const PageTitle = styled.h1`
  font-size: 0.875rem;
  font-weight: 700;
  color: ${colors.accent};

  letter-spacing: 0.5px;
`

export const GithubAccount = styled.h4`
  font-size: 0.875rem;
  font-weight: 300;

  letter-spacing: 0.5px;
`

export const NavRoutes = styled.div`
  > a {
    padding-bottom: 7px;

    margin: 0 10px;
  }

  > a.active {
    color: ${colors.accent};
    border-bottom: 2px solid ${colors.accent};
  }
`

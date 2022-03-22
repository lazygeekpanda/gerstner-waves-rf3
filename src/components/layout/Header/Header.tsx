import React, {} from 'react'
import { Link, NavLink } from 'react-router-dom'

import routes from 'routes'

import * as styled from './Header.styled'

const Header: React.FC = () => {
  return (
    <styled.Wrapper>
      <Link to='/'>
        <styled.GithubAccount>
          @lazygeekpanda/
        </styled.GithubAccount>
        <styled.PageTitle>
          gerstner-waves-r3f
        </styled.PageTitle>
      </Link>

      <styled.NavRoutes>
        {routes.map(route => (
          <NavLink key={route.name} to={route.path}>{route.title}</NavLink>
        ))}
      </styled.NavRoutes>
    </styled.Wrapper>
  )
}

export default Header

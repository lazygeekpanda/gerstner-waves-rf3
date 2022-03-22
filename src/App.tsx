import React from 'react'
import { Leva } from 'leva'

import { Routes, Route } from 'react-router-dom'
import routes from 'routes'

// Layout Components
import PageWrapper from 'components/layout/PageWrapper'
import Header from 'components/layout/Header'

const App: React.FC = () => {
  return (
    <>
      {/* Leva configuration */}
      <span id="leva-wrapper">
        <Leva />
      </span>

      <PageWrapper>
        <Header />
        <React.Suspense fallback="Loading">
          <Routes>
            {routes.map(route => (
              <Route
                key={route.name}
                path={route.path}
                element={<route.component />}
              />
            ))}
          </Routes>
        </React.Suspense>
      </PageWrapper>
    </>
  )
}

export default App

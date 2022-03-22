import React from 'react'
import { render } from 'react-dom'
import { HashRouter } from 'react-router-dom'
import GlobalStyles from 'styles/globalStyles'
import App from './App'

import reportWebVitals from './reportWebVitals'

render(
  <React.StrictMode>
    <HashRouter>
      <GlobalStyles />
      <App />
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

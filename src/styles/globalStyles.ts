import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
html {
  -webkit-font-smoothing: antialiased;
    text-size-adjust: 100%;
}

  html, body {
    margin: 0;
    padding: 0;

    font-size: 1rem;
    font-family: 'Ubuntu', sans-serif;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  h1, h2, h3, h4, h5, h6, p {
    margin: 0;
  }

  body > .stats-wrapper {
    top: 10px !important;
    left: 10px !important;
  }

  #leva-wrapper > div {
    transform: translate3d(-5px, 70px, 0px);
  }
`

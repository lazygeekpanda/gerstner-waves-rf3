import { lazy, FC } from 'react'

export interface Route {
  name: string
  title: string
  path: string
  component: FC
}

const routes: Route[] = [
  {
    name: 'playground',
    title: 'Playground',
    path: '/',
    component: lazy(() => import('pages/Playground')),
  },
  {
    name: 'weather-forecast-simulation',
    title: 'Weather Forecast',
    path: '/weather-forecast',
    component: lazy(() => import('pages/WeatherForecast')),
  }
]

export default routes

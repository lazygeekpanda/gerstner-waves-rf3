import React from 'react'

import PageContent from 'components/layout/PageContent'
import Canvas from 'components/three/Canvas'
import Sky from 'components/three/Sky'
import GerstnerWater from 'components/three/Water/GerstnerWater'
import Vessel from 'components/three/Vessel'

import { WaveInformationWrapper } from './WeatherForecast.styled'

import {
  WeatherWaterRefProvider,
  useWaterContext,
} from 'contexts/weather-water.context'

const WeatherForecastPage: React.FC = () => {
  const { waveA, waveB, waveC, weatherForecast, getWaveInfo } =
    useWaterContext()

  return (
    <PageContent>
      <WaveInformationWrapper>
        <div>
          <strong>TODO:</strong> Get forecast from API
          {/* <label>Swell</label>
          <li>Direction: {weatherForecast.swellDirection} °</li>
          <li>Height: {weatherForecast.swellHeight} m</li>
          <li>Mean period: {weatherForecast.swellMeanPeriod} s</li>

          <hr />

          <label>First Swell</label>
          <li>Direction: {weatherForecast.firstSwellDirection} °</li>
          <li>Height: {weatherForecast.firstSwellHeight} m</li>
          <li>Mean period: {weatherForecast.firstSwellMeanPeriod} s</li>
          <hr />

          <label>Second Swell</label>
          <li>Direction: {weatherForecast.secondSwellDirection} °</li>
          <li>Height: {weatherForecast.secondSwellHeight} m</li>
          <li>Mean period: {weatherForecast.secondSwellMeanPeriod} s</li> */}
        </div>
      </WaveInformationWrapper>
      <Canvas>
        <ambientLight intensity={0.15} position={[100, 100, 100]} />
        <pointLight position={[100, 100, 100]} intensity={0.5} />
        <Sky />
        <Vessel getWaveInfo={getWaveInfo} />
        <GerstnerWater
          waveA={waveA}
          waveB={waveB}
          waveC={waveC}
          wireframe={false}
          size={1024}
        />
      </Canvas>
    </PageContent>
  )
}

const PageWithContext: React.FC = () => (
  <>
    <WeatherWaterRefProvider>
      <WeatherForecastPage />
    </WeatherWaterRefProvider>
  </>
)

export default PageWithContext

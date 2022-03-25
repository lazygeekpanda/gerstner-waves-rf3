import React, { useState, useEffect } from 'react'
import { Physics } from '@react-three/cannon'

import * as weatherServices from 'services/weather.service'

import PageContent from 'components/layout/PageContent'
import Canvas from 'components/three/Canvas'
import Sky from 'components/three/Sky'
import GerstnerWater from 'components/three/Water/GerstnerWater'

import { Wave } from 'models/wave.model'

import { WaveInformationWrapper } from './WeatherForecast.styled'

const WeatherForecastPage: React.FC = () => {
  const [waveA, setWaveA] = useState<Wave>({
    direction: 0,
    steepness: 0,
    wavelength: 100,
  })
  const [waveB, setWaveB] = useState<Wave>({
    direction: 0,
    steepness: 0,
    wavelength: 50,
  })
  const [waveC, setWaveC] = useState<Wave>({
    direction: 0,
    steepness: 0,
    wavelength: 25,
  })

  const [weatherForecast, setWeatherForecast] = useState({
    swellDirection: 0, // deg
    swellHeight: 0, // m
    swellMeanPeriod: 0, // s

    firstSwellDirection: 0, // deg
    firstSwellHeight: 0, // m
    firstSwellMeanPeriod: 0, // s

    secondSwellDirection: 0, // deg
    secondSwellHeight: 0, // m
    secondSwellMeanPeriod: 0, // s
  })

  useEffect(() => {
    getWaves()
  }, [])

  const getWaves = () => {
    const weather = {
      swellDirection: 310,
      swellHeight: 0.3,
      swellMeanPeriod: 12,

      firstSwellDirection: 270,
      firstSwellHeight: 0.3,
      firstSwellMeanPeriod: 5,

      secondSwellDirection: 310,
      secondSwellHeight: 1.2,
      secondSwellMeanPeriod: 10,
    }

    setWeatherForecast(weather)

    setWaveA(
      weatherServices.getWave(
        weather.swellDirection,
        weather.swellHeight,
        weather.swellMeanPeriod
      )
    )
    setWaveB(
      weatherServices.getWave(
        weather.firstSwellDirection,
        weather.firstSwellHeight,
        weather.firstSwellMeanPeriod
      )
    )
    setWaveC(
      weatherServices.getWave(
        weather.secondSwellDirection,
        weather.secondSwellHeight,
        weather.secondSwellMeanPeriod
      )
    )
  }

  return (
    <PageContent>
      <WaveInformationWrapper>
        <div>
          <label>Swell</label>
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
          <li>Mean period: {weatherForecast.secondSwellMeanPeriod} s</li>
        </div>
      </WaveInformationWrapper>
      <Canvas>
        <Sky />
        <Physics>
          <GerstnerWater
            waveA={waveA}
            waveB={waveB}
            waveC={waveC}
            wireframe={false}
            size={1024}
          />
        </Physics>
      </Canvas>
    </PageContent>
  )
}

export default WeatherForecastPage

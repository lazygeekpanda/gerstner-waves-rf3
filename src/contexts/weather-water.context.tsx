import { useState, useEffect, useContext, createContext } from 'react'
import * as weatherServices from 'services/weather.service'
import * as THREE from 'three'

import { Wave } from 'models/wave.model'

const WaterContext = createContext<{
  waveA: Wave
  waveB: Wave
  waveC: Wave
  weatherForecast: {
    swellDirection: number
    swellHeight: number
    swellMeanPeriod: number

    firstSwellDirection: number
    firstSwellHeight: number
    firstSwellMeanPeriod: number

    secondSwellDirection: number
    secondSwellHeight: number
    secondSwellMeanPeriod: number
  }
  getWaveInfo: (x: any, y: any, time: any) => THREE.Vector3
}>({
  waveA: {
    direction: 0,
    steepness: 0,
    wavelength: 100,
  },
  waveB: {
    direction: 0,
    steepness: 0,
    wavelength: 100,
  },
  waveC: {
    direction: 0,
    steepness: 0,
    wavelength: 100,
  },
  weatherForecast: {
    swellDirection: 0, // deg
    swellHeight: 0, // m
    swellMeanPeriod: 0, // s

    firstSwellDirection: 0, // deg
    firstSwellHeight: 0, // m
    firstSwellMeanPeriod: 0, // s

    secondSwellDirection: 0, // deg
    secondSwellHeight: 0, // m
    secondSwellMeanPeriod: 0, // s
  },
  getWaveInfo: (x: any, y: any, time: any) => new THREE.Vector3(),
})

const WeatherWaterRefProvider: React.FC = ({ children }) => {
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

  const getWaveInfo = (x: any, z: any, time: any): THREE.Vector3 => {
    const pos = new THREE.Vector3()
    const tangent = new THREE.Vector3(1, 0, 0)
    const binormal = new THREE.Vector3(0, 0, 1)

    ;[waveA, waveB, waveC].forEach((w: any) => {
      const k = (Math.PI * 2.0) / w.wavelength
      const c = Math.sqrt(9.8 / k)
      const d = new THREE.Vector2(
        Math.sin((w.direction * Math.PI) / 180),
        -Math.cos((w.direction * Math.PI) / 180)
      )
      const f = k * (d.dot(new THREE.Vector2(x, z)) - c * time)
      const a = w.steepness / k

      pos.x += d.x * (a * Math.cos(f))
      pos.y += a * Math.sin(f)
      pos.z += d.y * (a * Math.cos(f))

      tangent.x += -d.x * d.x * (w.steepness * Math.sin(f))
      tangent.y += d.x * (w.steepness * Math.cos(f))
      tangent.z += -d.x * d.y * (w.steepness * Math.sin(f))

      binormal.x += -d.x * d.y * (w.steepness * Math.sin(f))
      binormal.y += d.y * (w.steepness * Math.cos(f))
      binormal.z += -d.y * d.y * (w.steepness * Math.sin(f))
    })

    return pos
  }

  return (
    <WaterContext.Provider
      value={{
        waveA,
        waveB,
        waveC,
        weatherForecast,
        getWaveInfo,
      }}
    >
      {children}
    </WaterContext.Provider>
  )
}

const useWaterContext = () => {
  const context = useContext(WaterContext)

  return context
}

export { WeatherWaterRefProvider, useWaterContext }

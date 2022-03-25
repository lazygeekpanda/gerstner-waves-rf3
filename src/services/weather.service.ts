import { Wave } from 'models/wave.model'

const GRAVITY = 9.81

export const getWave = (swellDirection: number, swellHeight: number, swellMeanPeriod: number): Wave => {
  const direction = swellDirection

  const wavelength = GRAVITY * Math.pow((swellMeanPeriod / (Math.PI * 2)), 2)
  const steepness = swellHeight / wavelength

  return {
    direction,
    steepness,
    wavelength
  }
}


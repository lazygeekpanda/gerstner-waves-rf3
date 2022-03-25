import React, { forwardRef } from 'react'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { useLoader } from '@react-three/fiber'

interface Props {
  ref: any
  model: string

  scale?: number[]
  position?: number[]
  rotation?: number[]
}

const OBJModelLoader: React.FC<Props> = forwardRef(({ model, ...props }, ref) => {
  const obj = useLoader(OBJLoader, require(`assets/models/${model}`))
  // @ts-ignore
  return <primitive ref={ref} object={obj} {...props} />
})

export default OBJModelLoader
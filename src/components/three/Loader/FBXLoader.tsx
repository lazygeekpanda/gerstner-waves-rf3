import React, { forwardRef, memo } from 'react'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { useLoader } from '@react-three/fiber'

interface Props {
  ref: any
  model: string

  scale?: number[]
  position?: number[]
  rotation?: number[]
}

const FBXModelLoader: React.FC<Props> = forwardRef(({ model, ...props }, ref) => {
  const obj = useLoader(FBXLoader, require(`assets/models/${model}`))

  // @ts-ignore
  return <primitive ref={ref} object={obj} {...props} />
})

export default memo(FBXModelLoader)
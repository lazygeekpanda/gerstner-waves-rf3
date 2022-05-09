import React from 'react'

import * as THREE from 'three'
import FBXModelLoader from 'components/three/Loader/FBXLoader'
import { useFrame } from '@react-three/fiber'

interface Props {
  getWaveInfo: (x: any, y: any, time: any) => THREE.Vector3
}

const MARKER_Z_OFFSET = 256

const Vessel: React.FC<Props> = ({ getWaveInfo }) => {
  const ref = React.useRef<THREE.Mesh>()
  const frontRef = React.useRef<THREE.Mesh>()

  useFrame(({ clock }) => {
    const vesselPosition = getWaveInfo(0, 0, clock.getElapsedTime())
    const markerPosition = getWaveInfo(0, 256, clock.getElapsedTime())

    if (ref?.current && frontRef?.current) {
      frontRef.current.position.set(
        -markerPosition.x * 1.15,
        markerPosition.y,
        MARKER_Z_OFFSET
      )

      ref.current.position.set(
        vesselPosition.x,
        vesselPosition.y + 7,
        vesselPosition.z
      )

      // @ts-ignore
      ref.current.lookAt(frontRef.current.position)
    }
  })

  return (
    <>
      <mesh ref={frontRef}>
        <planeBufferGeometry args={[256, 256]} />
        <meshStandardMaterial opacity={0} transparent />
      </mesh>

      <FBXModelLoader ref={ref} model="ship.fbx" scale={[0.5, 0.5, 0.5]} />
    </>
  )
}

export default Vessel

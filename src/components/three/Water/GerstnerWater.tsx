import React, { useRef, useEffect, useMemo, useCallback } from 'react'

import * as THREE from 'three'
import {
  extend,
  useThree,
  useLoader,
  useFrame,
  Object3DNode,
} from '@react-three/fiber'
import { usePlane } from '@react-three/cannon'
import { Water } from 'three/examples/jsm/objects/Water.js'

import vertexShader from './utils/vertex.shader'
import fragmentShader from './utils/fragment.shader'

import { Wave } from 'models/wave.model'

extend({ Water })

declare global {
  namespace JSX {
    interface IntrinsicElements {
      water: Object3DNode<Water, typeof Water>
    }
  }
}

interface Props {
  wireframe: boolean
  size: number
  waveA: Wave
  waveB: Wave
  waveC: Wave
}

const GerstnerWater: React.FC<Props> = ({
  wireframe,
  size,
  waveA,
  waveB,
  waveC,
}) => {
  const [ref] = usePlane(() => ({ mass: 0, rotation: [-Math.PI / 2, 0, 0], position: [0, 0, 0]  }))
  // useRef<Water>()
  const gl = useThree<THREE.WebGLRenderer>((state) => state.gl)

  const waterNormals = useLoader(
    THREE.TextureLoader,
    require('assets/maps/waternormals.jpg')
  ) as any
  waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping

  const onBeforeCompile = useCallback(
    (shader: any) => {
      shader.uniforms.waveA = {
        value: [
          Math.sin((waveA.direction * Math.PI) / 180),
          Math.cos((waveA.direction * Math.PI) / 180),
          waveA.steepness,
          waveA.wavelength,
        ],
      }

      shader.uniforms.waveB = {
        value: [
          Math.sin((waveB.direction * Math.PI) / 180),
          Math.cos((waveB.direction * Math.PI) / 180),
          waveB.steepness,
          waveB.wavelength,
        ],
      }

      shader.uniforms.waveC = {
        value: [
          Math.sin((waveC.direction * Math.PI) / 180),
          Math.cos((waveC.direction * Math.PI) / 180),
          waveC.steepness,
          waveC.wavelength,
        ],
      }

      shader.vertexShader = vertexShader
      shader.fragmentShader = fragmentShader

      shader.uniforms.size.value = 0
    },
    [waveA, waveB, waveC]
  )

  // Plane Geometry
  const geometry = useMemo(
    () => new THREE.PlaneGeometry(size, size, size / 4, size / 4),
    [size]
  )

  // Water Mesh Config
  const config = useMemo(
    () => ({
      textureWidth: 256,
      textureHeight: 256,
      waterNormals,
      sunDirection: new THREE.Vector3(),
      side: THREE.DoubleSide,
      waterColor: '#102E4A',
      sunColor: '#eb8934',
      distortionScale: 8,
      fog: undefined,
      format: gl.outputEncoding,

      onBeforeCompile,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [waterNormals, waveA, waveB, waveC]
  )

  useEffect(() => {
    if (!ref.current) {
      return
    }

    // @ts-ignore
    const material = ref.current.material as THREE.ShaderMaterial
    material.wireframe = wireframe
  }, [size, wireframe, waveA, waveB, waveC])

  // Animate water
  useFrame((_, delta) => {
    if (!ref.current) {
      return
    }

    // @ts-ignore
    const material = ref.current.material as THREE.ShaderMaterial
    material.uniforms.time.value += delta
    material.onBeforeCompile = onBeforeCompile
  })

  return (
    <water
      ref={ref}
      args={[geometry, { ...config }]}
      rotation-x={-Math.PI / 2}
      position={[0, 2, 0]}
    />
  )
}

export default GerstnerWater

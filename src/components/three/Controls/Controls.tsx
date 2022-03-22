import * as React from 'react'
import { useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

const Controls: React.FC = ({ children }) => {
  const ref = React.useRef<any>()
  const { camera } = useThree<any>()

  React.useEffect(() => {
    camera.position.set(-25, 15, -25)
  }, [])

  return (
    <>
      <OrbitControls
        ref={ref}

        // Zoom limits
        minDistance={15}
        maxDistance={75}

        // Disable camera below surface
        maxPolarAngle={Math.PI / 2.5}
      />
      {children}
    </>
  )
}

export default Controls
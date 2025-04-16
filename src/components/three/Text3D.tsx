import { useRef, memo, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

interface Text3DProps {
  text: string
  position?: [number, number, number]
  color?: string
}

const Text3D = memo(({ text, position = [0, 0, 0], color = '#00f2fe' }: Text3DProps) => {
  const textRef = useRef<THREE.Mesh>(null)
  const material = useMemo(() => new THREE.MeshBasicMaterial({ color }), [color])

  useFrame((state) => {
    if (textRef.current) {
      textRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.2
    }
  })

  return (
    <Text
      ref={textRef}
      position={position}
      fontSize={0.5}
      material={material}
      anchorX="center"
      anchorY="middle"
      maxWidth={2}
      lineHeight={1}
      letterSpacing={0.02}
      textAlign="center"
    >
      {text}
    </Text>
  )
})

Text3D.displayName = 'Text3D'

export default Text3D 
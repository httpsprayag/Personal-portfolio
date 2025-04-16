import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Sphere } from '@react-three/drei'
import * as THREE from 'three'

interface Skill {
  name: string
  image: string
  category: string
}

interface Skills3DProps {
  skills: Skill[]
}

const Skills3D = ({ skills }: Skills3DProps) => {
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002
    }
  })

  return (
    <group ref={groupRef}>
      {/* Central sphere */}
      <Sphere args={[1, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#00f2fe"
          metalness={0.5}
          roughness={0.2}
          transparent
          opacity={0.8}
        />
      </Sphere>

      {skills.map((skill, index) => {
        const angle = (index / skills.length) * Math.PI * 2
        const radius = 4
        const x = Math.sin(angle) * radius
        const z = Math.cos(angle) * radius
        const y = Math.sin(Date.now() * 0.001 + index) * 0.5

        return (
          <group
            key={skill.name}
            position={[x, y, z]}
            onPointerOver={() => setHovered(index)}
            onPointerOut={() => setHovered(null)}
          >
            <Sphere args={[0.5, 32, 32]}>
              <meshStandardMaterial
                color={hovered === index ? '#00f2fe' : '#ffffff'}
                metalness={0.5}
                roughness={0.2}
                transparent
                opacity={hovered === index ? 1 : 0.6}
              />
            </Sphere>
            <Text
              position={[0, 0.8, 0]}
              fontSize={0.2}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
              maxWidth={1}
            >
              {skill.name}
            </Text>
          </group>
        )
      })}

      {/* Category indicators */}
      {Array.from(new Set(skills.map(s => s.category))).map((category, index) => {
        const angle = (index / 3) * Math.PI * 2
        const radius = 6
        const x = Math.sin(angle) * radius
        const z = Math.cos(angle) * radius

        return (
          <group
            key={category}
            position={[x, 0, z]}
            onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
          >
            <Sphere args={[0.3, 32, 32]}>
              <meshStandardMaterial
                color={selectedCategory === category ? '#00f2fe' : '#666666'}
                metalness={0.5}
                roughness={0.2}
              />
            </Sphere>
            <Text
              position={[0, 0.5, 0]}
              fontSize={0.15}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
            >
              {category}
            </Text>
          </group>
        )
      })}
    </group>
  )
}

export default Skills3D 
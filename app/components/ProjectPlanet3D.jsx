'use client';

import { useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

function Planet({ color, surfaceTextureUrl, cloudsTextureUrl }) {
  const planetRef = useRef();
  const cloudsRef = useRef();
  const atmosphereRef = useRef();

  const [surfaceTexture, cloudsTexture] = useLoader(THREE.TextureLoader, [
    surfaceTextureUrl,
    cloudsTextureUrl,
  ]);

  useFrame((state, delta) => {
    planetRef.current.rotation.y += delta * 0.05;
    cloudsRef.current.rotation.y += delta * 0.07;

    const mouseX = state.pointer.x;
    const mouseY = state.pointer.y;
    const distance = Math.sqrt(mouseX**2 + mouseY**2);
    const targetIntensity = 1 + (1 - distance) * 2;
    
    atmosphereRef.current.material.emissiveIntensity = THREE.MathUtils.lerp(
      atmosphereRef.current.material.emissiveIntensity,
      targetIntensity,
      0.1
    );
  });

  return (
    <group ref={planetRef}>
      <Sphere ref={atmosphereRef} args={[1.05, 64, 64]} scale={1.2}>
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} transparent={true} opacity={0.15} />
      </Sphere>
      <Sphere ref={cloudsRef} args={[1.01, 64, 64]} scale={1.2}>
        <meshStandardMaterial map={cloudsTexture} transparent={true} opacity={0.4} depthWrite={false} />
      </Sphere>
      <Sphere args={[1, 64, 64]} scale={1.2}>
        <meshStandardMaterial map={surfaceTexture} metalness={0.2} roughness={0.7} />
      </Sphere>
    </group>
  );
}

export default function ProjectPlanet3D({ color, surfaceTextureUrl, cloudsTextureUrl }) {
  return (
    <Canvas camera={{ position: [0, 0, 3], fov: 60 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 2, 3]} intensity={4} />
      <Planet 
        color={color} 
        surfaceTextureUrl={surfaceTextureUrl} 
        cloudsTextureUrl={cloudsTextureUrl} 
      />
    </Canvas>
  );
}
'use client';

import { useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

// The component now accepts the texture URLs as props
function Planet({ color, surfaceTextureUrl, cloudsTextureUrl }) {
  const planetRef = useRef();
  const cloudsRef = useRef();
  const atmosphereRef = useRef();

  // ** THE CRITICAL CHANGE **
  // The useLoader hook now uses the dynamic props instead of hardcoded strings.
  const [surfaceTexture, cloudsTexture] = useLoader(THREE.TextureLoader, [
    surfaceTextureUrl,
    cloudsTextureUrl,
  ]);

  // The animation loop (useFrame) remains exactly the same
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

  // The JSX for the spheres remains the same
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

// The main component also needs to accept and pass down the props
export default function ProjectPlanet3D({ color, surfaceTextureUrl, cloudsTextureUrl }) {
  return (
    <Canvas camera={{ position: [0, 0, 3], fov: 60 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 2, 3]} intensity={4} />
      {/* Pass the props down to the inner Planet component */}
      <Planet 
        color={color} 
        surfaceTextureUrl={surfaceTextureUrl} 
        cloudsTextureUrl={cloudsTextureUrl} 
      />
    </Canvas>
  );
}
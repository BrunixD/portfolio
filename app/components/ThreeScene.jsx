'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import ParticleField from './ParticleField';

export default function ThreeScene() {
  return (
    // The Canvas component is where the 3D scene will be rendered
    // fov: Field of view (zoom level)
    // camera: Sets the initial position of the camera
    <Canvas camera={{ position: [0, 0, 15], fov: 75 }}>
      {/* Add some ambient light so objects are visible */}
      <ambientLight intensity={0.5} />
      
      {/* Suspense is a React feature that lets you show a fallback while components are loading */}
      <Suspense fallback={null}>
        <ParticleField />
      </Suspense>
    </Canvas>
  );
}
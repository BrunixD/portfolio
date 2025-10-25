'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import ParticleField from './ParticleField';

export default function ThreeScene() {
  return (
    <Canvas camera={{ position: [0, 0, 15], fov: 75 }}>
      <ambientLight intensity={0.5} />
      
      <Suspense fallback={null}>
        <ParticleField />
      </Suspense>
    </Canvas>
  );
}
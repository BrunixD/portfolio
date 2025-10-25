'use client';

import { useMemo, useRef }from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

export default function ParticleField(props) {
  const ref = useRef();

  // Generate a vast number of random points in a sphere
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 5000; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const x = -50 + Math.random() * 100;
      const y = -50 + Math.random() * 100;
      const z = -50 + Math.random() * 100;
      temp.push({ t, factor, speed, x, y, z });
    }
    return temp;
  }, []);

  // An array to hold the final positions of the particles
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // useFrame is a hook that runs on every rendered frame
  useFrame((state, delta) => {
    // Animate the particles
    particles.forEach((particle, i) => {
      let { t, factor, speed, x, y, z } = particle;
      t = particle.t += speed / 2;
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.cos(t);

      dummy.position.set(
        x + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        y + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        z + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      );
      dummy.scale.setScalar(s);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();
      ref.current.setMatrixAt(i, dummy.matrix);
    });
    ref.current.instanceMatrix.needsUpdate = true;
    
    // Rotate the entire particle field based on mouse position
    const mouseX = state.pointer.x * 0.1;
    const mouseY = state.pointer.y * 0.1;
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, mouseX, 0.05);
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, mouseY, 0.05);
  });

  return (
    // We use instanced rendering for performance with thousands of objects
    <instancedMesh ref={ref} args={[null, null, 5000]}>
      <sphereGeometry args={[0.05, 32, 32]} />
      <meshBasicMaterial color="#00aaff" />
    </instancedMesh>
  );
}
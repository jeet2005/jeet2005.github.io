import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { paperVertShader, paperFragShader } from './shaders';

export default function PaperPlane() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  // Use a custom shader material for the paper texture
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColorBase: { value: new THREE.Color('#F2ECD8') },
      uColorShadow: { value: new THREE.Color('#D4C5A3') },
    }),
    []
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  return (
    <mesh position={[0, 0, -5]}>
      {/* A large plane that covers the background */}
      <planeGeometry args={[20, 30, 64, 64]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={paperVertShader}
        fragmentShader={paperFragShader}
        uniforms={uniforms}
        transparent={true}
        depthWrite={false}
      />
    </mesh>
  );
}

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function FlutterIcon() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.position.y = Math.sin(t * 1.5) * 0.2;
    meshRef.current.rotation.y = t * 0.5;
    meshRef.current.rotation.z = Math.sin(t * 0.8) * 0.1;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]} castShadow>
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color="#54C5F8" roughness={0.4} metalness={0.2} />
    </mesh>
  );
}

export function PythonIcon() {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!groupRef.current || !meshRef.current) return;
    const t = state.clock.getElapsedTime();
    
    // Orbit around
    groupRef.current.rotation.y = t * 0.8;
    groupRef.current.rotation.z = Math.sin(t * 0.5) * 0.2;
    
    // Bob
    meshRef.current.position.y = Math.cos(t * 2.0) * 0.3;
    meshRef.current.rotation.x = t;
  });

  return (
    <group ref={groupRef}>
      {/* Offset position to create orbit */}
      <mesh ref={meshRef} position={[2, 0, 0]} castShadow>
        <torusKnotGeometry args={[0.3, 0.1, 64, 8]} />
        <meshStandardMaterial color="#3572A5" roughness={0.5} metalness={0.1} />
      </mesh>
    </group>
  );
}

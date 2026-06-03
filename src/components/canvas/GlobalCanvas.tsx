import React from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import PaperPlane from './PaperPlane';
import DustParticles from './DustParticles';

export default function GlobalCanvas() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 0.9,
        }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 10]} intensity={1} color="#FFF5E1" />
        
        <PaperPlane />
        <DustParticles count={250} />
      </Canvas>
    </div>
  );
}

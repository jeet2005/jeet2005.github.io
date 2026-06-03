import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { SKILLS } from '../../data/portfolio';

function SkillObject({ skill, position }: { skill: any, position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    
    // Idle animation
    if (!hovered) {
      meshRef.current.rotation.x = Math.sin(t * 0.5) * 0.2;
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = position[1] + Math.sin(t + position[0]) * 0.1;
    } else {
      // Hover animation (spin faster, float higher)
      meshRef.current.rotation.y += 0.05;
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, position[1] + 0.3, 0.1);
    }
  });

  const getGeometry = () => {
    switch(skill.icon) {
      case 'cylinder': return <cylinderGeometry args={[0.2, 0.2, 0.6, 16]} />;
      case 'box': return <boxGeometry args={[0.5, 0.5, 0.1]} />;
      case 'cube': return <boxGeometry args={[0.4, 0.4, 0.4]} />;
      case 'sphere': return <sphereGeometry args={[0.3, 32, 32]} />;
      case 'cone': return <coneGeometry args={[0.3, 0.6, 16]} />;
      case 'torus': return <torusGeometry args={[0.25, 0.1, 16, 32]} />;
      case 'octahedron': return <octahedronGeometry args={[0.35, 0]} />;
      case 'icosahedron': return <icosahedronGeometry args={[0.35, 0]} />;
      case 'tetrahedron': return <tetrahedronGeometry args={[0.35, 0]} />;
      case 'dodecahedron': return <dodecahedronGeometry args={[0.35, 0]} />;
      case 'ring': return <torusGeometry args={[0.3, 0.05, 16, 32]} />;
      case 'sphere-small': return <sphereGeometry args={[0.2, 32, 32]} />;
      case 'tetrahedron-small': return <tetrahedronGeometry args={[0.25, 0]} />;
      case 'octahedron-small': return <octahedronGeometry args={[0.25, 0]} />;
      default: return <boxGeometry args={[0.4, 0.4, 0.4]} />;
    }
  };

  // Convert level 0-100 to progress bar string
  const barsTotal = 10;
  const barsFilled = Math.round((skill.level / 100) * barsTotal);
  const progressBar = '█'.repeat(barsFilled) + '░'.repeat(barsTotal - barsFilled);

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        castShadow
        receiveShadow
        scale={hovered ? 1.15 : 1}
      >
        {getGeometry()}
        <meshStandardMaterial color={skill.color} roughness={0.4} metalness={0.2} />
      </mesh>
      
      {hovered && (
        <Html position={[0, 0.5, 0]} center zIndexRange={[100, 0]}>
          <div className="bg-paper-base border border-ink-secondary p-3 shadow-lg pointer-events-none w-48 rounded-sm transform -rotate-1">
            <div className="special-elite text-ink-primary font-bold border-b border-ink-faded pb-1 mb-2">
              {skill.name}
            </div>
            <div className="special-elite text-[10px] text-ink-faded flex flex-col gap-1">
              <span>PROFICIENCY:</span>
              <span className="text-ink-secondary">{progressBar}</span>
            </div>
            <div className="absolute top-1 right-2 w-4 h-4 rounded-full border border-stamp-red opacity-50 flex items-center justify-center -rotate-12">
              <span className="text-[6px] text-stamp-red">OK</span>
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}

export default function SkillDesk() {
  return (
    <div className="w-full h-full relative cursor-none">
      <Canvas 
        camera={{ position: [0, 5, 5], fov: 45 }} 
        shadows 
        gl={{ alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[2, 5, 2]} intensity={1.2} castShadow color="#FFF5E1" />
        
        {/* Desk Plane */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
          <planeGeometry args={[20, 10]} />
          <shadowMaterial opacity={0.2} color="#D4C5A3" />
        </mesh>
        
        {/* Scatter Skills on Desk */}
        <group position={[0, 0, 0]}>
          {SKILLS.map((skill, i) => {
            // Calculate a scattered grid position
            const cols = 5;
            const row = Math.floor(i / cols);
            const col = i % cols;
            
            const x = (col - Math.floor(cols/2)) * 1.2 + (Math.random() - 0.5) * 0.5;
            const z = (row - 1) * 1.2 + (Math.random() - 0.5) * 0.5;
            const y = 0.2; // slight float
            
            return (
              <SkillObject key={skill.name} skill={skill} position={[x, y, z]} />
            );
          })}
        </group>
      </Canvas>
    </div>
  );
}

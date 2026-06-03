import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Physics, RigidBody, CuboidCollider } from '@react-three/rapier';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { PROJECTS } from '../../data/portfolio';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

function ProjectCard({ project, index, scrollProgress }: { project: any, index: number, scrollProgress: number }) {
  const [hovered, setHovered] = useState(false);
  const bodyRef = useRef<any>(null);
  
  // Drop logic based on scroll progress
  const startDropProgress = 0.2 + (index * 0.15); 
  const hasDropped = scrollProgress > startDropProgress;

  useEffect(() => {
    if (hasDropped && bodyRef.current) {
      // Wake up the rigid body if it was sleeping
      bodyRef.current.wakeUp();
    }
  }, [hasDropped]);

  return (
    <RigidBody 
      ref={bodyRef} 
      position={hasDropped ? [(index - 1.5) * 2.5, 5, 0] : [(index - 1.5) * 2.5, 10, 0]}
      rotation={[0, 0, (Math.random() - 0.5) * 0.2]}
      restitution={0.4}
      friction={0.8}
      colliders="cuboid"
      type={hasDropped ? "dynamic" : "kinematicPosition"}
    >
      <mesh
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        castShadow
        receiveShadow
      >
        {/* Very thin box like paper */}
        <boxGeometry args={[2.2, 3, 0.05]} />
        <meshStandardMaterial color="#F2ECD8" />
        
        {/* Html overlay for the content */}
        <Html transform position={[0, 0, 0.03]} distanceFactor={2} zIndexRange={[100, 0]}>
          <div 
            className={`w-64 h-80 bg-paper-base border border-paper-edge p-4 flex flex-col cursor-pointer transition-all duration-300 ${hovered ? 'scale-105 shadow-[0_20px_60px_rgba(26,18,9,0.4)] -translate-y-2' : 'shadow-sm'}`}
            style={{ 
              clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)' 
            }}
          >
            {/* Paper fold effect pseudo-element is tricky in inline styles, we simulate it with a border box */}
            <div className="absolute bottom-0 right-0 w-5 h-5 bg-paper-shadow opacity-50" />
            
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">📌</span>
              <h3 className="special-elite text-ink-primary font-bold uppercase truncate">{project.title}</h3>
            </div>
            
            <div className="border-b-2 border-ink-primary w-full mb-2 opacity-50" />
            
            <div className="special-elite text-[10px] text-ink-secondary mb-1">
              Classification: {project.classification}
            </div>
            <div className="special-elite text-[10px] text-ink-secondary mb-3 flex items-center">
              Status: <span className={`w-2 h-2 ml-1 rounded-full ${project.status === 'LIVE' ? 'bg-green-600 animate-pulse' : 'bg-ink-secondary'}`}></span>
              <span className="ml-1">{project.status}</span>
            </div>
            
            <p className="font-serif italic text-sm text-ink-primary mb-2 line-clamp-2">
              "{project.tagline}"
            </p>
            
            <p className="font-sans text-[10px] leading-tight text-ink-secondary mb-4 line-clamp-3">
              {project.description}
            </p>
            
            <div className="flex flex-wrap gap-1 mt-auto mb-4">
              {project.stack.slice(0, 4).map((tech: string) => (
                <span key={tech} className="special-elite text-[8px] border border-ink-faded px-1 py-0.5 rounded-sm">
                  {tech}
                </span>
              ))}
              {project.stack.length > 4 && <span className="special-elite text-[8px] text-ink-faded">+{project.stack.length - 4}</span>}
            </div>
            
            <div className="flex justify-between items-center border-t border-ink-faded pt-2">
              {project.links.live ? (
                <a href={project.links.live} target="_blank" rel="noreferrer" className="special-elite text-[10px] text-ink-primary hover:text-ink-accent transition-colors">
                  [VIEW PROJECT →]
                </a>
              ) : (
                <a href={project.links.github} target="_blank" rel="noreferrer" className="special-elite text-[10px] text-ink-primary hover:text-ink-accent transition-colors">
                  [GITHUB ↗]
                </a>
              )}
              {project.stars > 0 && (
                <span className="special-elite text-[10px] text-ink-secondary">⭐ {project.stars}</span>
              )}
            </div>
          </div>
        </Html>
      </mesh>
    </RigidBody>
  );
}

function BoardNoise() {
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  
  // Create cork noise texture manually using canvas
  const texture = React.useMemo(() => {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    
    // Fill base color
    ctx.fillStyle = '#8B5A2B';
    ctx.fillRect(0, 0, 256, 256);
    
    // Add noise
    for (let i = 0; i < 15000; i++) {
      const x = Math.random() * 256;
      const y = Math.random() * 256;
      const r = Math.random() * 30 + 100;
      const g = Math.random() * 20 + 70;
      const b = Math.random() * 10 + 30;
      const a = Math.random() * 0.3 + 0.1;
      
      ctx.fillStyle = `rgba(${r},${g},${b},${a})`;
      ctx.fillRect(x, y, 1.5, 1.5);
    }
    
    return new THREE.CanvasTexture(canvas);
  }, []);

  return texture ? (
    <meshStandardMaterial 
      ref={materialRef}
      map={texture} 
      roughness={0.9} 
      color="#A06A42"
    />
  ) : (
    <meshStandardMaterial color="#8B5A2B" roughness={0.9} />
  );
}

export default function CorkBoard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;
    
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        setScrollProgress(self.progress);
      }
    });
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full cursor-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 40 }} shadows>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow />
        
        <Physics gravity={[0, -9.81, 0]}>
          {/* Back wall / Corkboard */}
          <RigidBody type="fixed" colliders="cuboid" position={[0, 0, -0.5]}>
            <mesh receiveShadow>
              <boxGeometry args={[30, 20, 1]} />
              <BoardNoise />
            </mesh>
          </RigidBody>
          
          {/* Floor boundary to catch cards */}
          <RigidBody type="fixed" colliders="cuboid" position={[0, -4, 0]}>
            <mesh visible={false}>
              <boxGeometry args={[30, 1, 10]} />
            </mesh>
          </RigidBody>
          
          {/* Left/Right bounds */}
          <RigidBody type="fixed" colliders="cuboid" position={[-6, 0, 0]}>
            <mesh visible={false}><boxGeometry args={[1, 20, 10]} /></mesh>
          </RigidBody>
          <RigidBody type="fixed" colliders="cuboid" position={[6, 0, 0]}>
            <mesh visible={false}><boxGeometry args={[1, 20, 10]} /></mesh>
          </RigidBody>

          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} scrollProgress={scrollProgress} />
          ))}
        </Physics>
      </Canvas>
    </div>
  );
}

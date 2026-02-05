'use client';

import { useRef, useState } from 'react';
import { Mesh } from 'three';
import { useProjectStore } from '@/stores/useProjectStore';
import { Html } from '@react-three/drei';

interface Wall3DProps {
  wall: {
    id: string;
    start: [number, number];
    end: [number, number];
    thickness: number;
    height: number;
  };
}

export default function Wall3D({ wall }: Wall3DProps) {
  const meshRef = useRef<Mesh>(null);
  const { selectedIds, setSelected } = useProjectStore();
  const [hovered, setHovered] = useState(false);
  
  const isSelected = selectedIds.includes(wall.id);

  const length = Math.sqrt(
    Math.pow(wall.end[0] - wall.start[0], 2) + Math.pow(wall.end[1] - wall.start[1], 2)
  );
  const angle = Math.atan2(wall.end[1] - wall.start[1], wall.end[0] - wall.start[0]);
  const centerX = (wall.start[0] + wall.end[0]) / 2;
  const centerZ = (wall.start[1] + wall.end[1]) / 2;

  return (
    <mesh
      ref={meshRef}
      position={[centerX, wall.height / 2, centerZ]}
      rotation={[0, -angle, 0]} // Invert angle for Three.js coord system if needed
      castShadow
      receiveShadow
      onClick={(e) => {
        e.stopPropagation();
        setSelected([wall.id]);
      }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[length, wall.height, wall.thickness]} />
      <meshStandardMaterial 
        color={isSelected ? '#60a5fa' : hovered ? '#cbd5e1' : '#e2e8f0'} 
        metalness={0.1} 
        roughness={0.8} 
      />
      
      {/* Wall Length Label */}
      {isSelected && (
        <Html position={[0, wall.height / 2 + 0.5, 0]} center>
          <div className="px-2 py-1 bg-black/70 text-white text-xs rounded border border-white/20 backdrop-blur-sm">
            {length.toFixed(2)}m
          </div>
        </Html>
      )}
    </mesh>
  );
}
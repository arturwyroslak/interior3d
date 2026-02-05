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
    color?: string; // Support wall color
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

  // Skirting board dimensions
  const skirtingHeight = 0.1;
  const skirtingDepth = wall.thickness + 0.02;

  return (
    <group position={[centerX, 0, centerZ]} rotation={[0, -angle, 0]}>
        {/* Main Wall */}
        <mesh
          ref={meshRef}
          position={[0, wall.height / 2, 0]}
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
            color={isSelected ? '#93c5fd' : wall.color || '#e2e8f0'} // Use wall color or default
            metalness={0.05} 
            roughness={0.8} 
          />
        </mesh>

        {/* Baseboard / Skirting (Left side) */}
        <mesh position={[0, skirtingHeight/2, wall.thickness/2 + 0.01]} receiveShadow>
             <boxGeometry args={[length, skirtingHeight, 0.02]} />
             <meshStandardMaterial color="#f8fafc" roughness={0.5} />
        </mesh>

        {/* Baseboard / Skirting (Right side) */}
        <mesh position={[0, skirtingHeight/2, -wall.thickness/2 - 0.01]} receiveShadow>
             <boxGeometry args={[length, skirtingHeight, 0.02]} />
             <meshStandardMaterial color="#f8fafc" roughness={0.5} />
        </mesh>
      
        {/* Wall Length Label */}
        {isSelected && (
            <Html position={[0, wall.height + 0.2, 0]} center>
            <div className="px-2 py-1 bg-blue-600 text-white text-xs font-bold rounded shadow-lg">
                {length.toFixed(2)}m
            </div>
            </Html>
        )}
    </group>
  );
}
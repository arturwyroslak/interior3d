'use client';

import { useRef } from 'react';
import { Mesh } from 'three';

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
      rotation={[0, angle, 0]}
      castShadow
      receiveShadow
    >
      <boxGeometry args={[length, wall.height, wall.thickness]} />
      <meshStandardMaterial color="#e2e8f0" metalness={0.1} roughness={0.8} />
    </mesh>
  );
}
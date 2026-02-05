'use client';

import { useRef } from 'react';
import { Mesh, BoxGeometry, EdgesGeometry } from 'three';
import { useProjectStore } from '@/stores/useProjectStore';
import { useFrame } from '@react-three/fiber';

interface Asset3DProps {
  asset: {
    id: string;
    position: [number, number, number];
    rotation: [number, number, number];
    scale: [number, number, number];
    modelPath?: string;
  };
}

export default function Asset3D({ asset }: Asset3DProps) {
  const meshRef = useRef<Mesh>(null);
  const { selectedIds, setSelected } = useProjectStore();
  const isSelected = selectedIds.includes(asset.id);

  // Simple animation for selection
  useFrame((state) => {
    if (isSelected && meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group position={asset.position} rotation={asset.rotation} scale={asset.scale}>
      <mesh
        ref={meshRef}
        castShadow
        receiveShadow
        onClick={(e) => {
          e.stopPropagation();
          setSelected([asset.id]);
        }}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color={isSelected ? '#3b82f6' : '#8b5cf6'}
          metalness={0.3}
          roughness={0.4}
        />
      </mesh>
      
      {isSelected && (
        <lineSegments>
          <edgesGeometry args={[new BoxGeometry(1.05, 1.05, 1.05)]} />
          <lineBasicMaterial color="#60a5fa" linewidth={2} toneMapped={false} />
        </lineSegments>
      )}
    </group>
  );
}
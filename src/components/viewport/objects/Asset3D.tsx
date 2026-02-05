'use client';

import { useRef } from 'react';
import { Mesh } from 'three';
import { useProjectStore } from '@/stores/useProjectStore';

interface Asset3DProps {
  asset: {
    id: string;
    position: [number, number, number];
    rotation: [number, number, number];
    scale: [number, number, number];
  };
}

export default function Asset3D({ asset }: Asset3DProps) {
  const meshRef = useRef<Mesh>(null);
  const { selectedIds, setSelected } = useProjectStore();
  const isSelected = selectedIds.includes(asset.id);

  return (
    <group position={asset.position} rotation={asset.rotation} scale={asset.scale}>
      <mesh
        ref={meshRef}
        castShadow
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
          <edgesGeometry args={[new THREE.BoxGeometry(1.02, 1.02, 1.02)]} />
          <lineBasicMaterial color="#3b82f6" linewidth={2} />
        </lineSegments>
      )}
    </group>
  );
}
'use client';

import { Suspense, useRef } from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Mesh, BoxGeometry } from 'three';
import { useProjectStore } from '@/stores/useProjectStore';
import { TransformControls, useCursor } from '@react-three/drei';

interface Asset3DProps {
  asset: {
    id: string;
    position: [number, number, number];
    rotation: [number, number, number];
    scale: [number, number, number];
    name: string;
    modelPath?: string;
  };
}

function Model({ url, color }: { url?: string, color: string }) {
    // In a real app, use useGLTF(url)
    // For this demo, we use a fallback primitive, but the structure allows plugging in real URLs
    // const { scene } = useGLTF(url);
    // return <primitive object={scene} />
    
    // Fallback visuals based on URL "hints" if we don't have real hosting
    if (url === 'cube') return <boxGeometry args={[1, 1, 1]} />;
    if (url === 'sphere') return <sphereGeometry args={[0.5, 32, 32]} />;
    
    return <boxGeometry args={[1, 1, 1]} />;
}

export default function Asset3D({ asset }: Asset3DProps) {
  const meshRef = useRef<Mesh>(null);
  const { selectedIds, setSelected, activeTool, updateAsset } = useProjectStore();
  const isSelected = selectedIds.includes(asset.id);
  const [hovered, setHovered] = useState(false);
  
  useCursor(hovered, 'pointer', 'auto');
  
  const transformMode = 
    isSelected && activeTool === 'move' ? 'translate' :
    isSelected && activeTool === 'rotate' ? 'rotate' :
    isSelected && activeTool === 'scale' ? 'scale' : 
    null;

  return (
    <>
      <group 
        position={asset.position} 
        rotation={asset.rotation} 
        scale={asset.scale}
        onClick={(e) => {
          e.stopPropagation();
          setSelected([asset.id]);
        }}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <mesh
          ref={meshRef}
          castShadow
          receiveShadow
        >
          {/* Dynamic Geometry */}
          {asset.modelPath === 'cube' ? <boxGeometry args={[1, 1, 1]} /> :
           asset.modelPath === 'sphere' ? <sphereGeometry args={[0.5, 32, 32]} /> :
           asset.name.toLowerCase().includes('sofa') ? <boxGeometry args={[2, 0.8, 0.8]} /> :
           asset.name.toLowerCase().includes('table') ? <cylinderGeometry args={[0.5, 0.5, 0.8, 32]} /> :
           <boxGeometry args={[1, 1, 1]} />
          }
          
          <meshStandardMaterial
            color={isSelected ? '#3b82f6' : hovered ? '#a78bfa' : '#8b5cf6'}
            metalness={0.1}
            roughness={0.5}
          />
        </mesh>
        
        {/* Selection Highlight */}
        {isSelected && (
          <lineSegments>
            <edgesGeometry args={[new BoxGeometry(1, 1, 1)]} /> 
            <lineBasicMaterial color="#60a5fa" linewidth={2} toneMapped={false} />
          </lineSegments>
        )}
      </group>
      
      {transformMode && (
        <TransformControls
          object={meshRef}
          mode={transformMode}
          size={0.8}
          onMouseUp={() => {
             if (meshRef.current) {
                 // Sync Logic
                 updateAsset(asset.id, {
                    position: [
                        asset.position[0] + meshRef.current.position.x, 
                        asset.position[1] + meshRef.current.position.y, 
                        asset.position[2] + meshRef.current.position.z
                    ],
                    // Simulating global update by adding delta. 
                    // Real implementation needs full matrix decomposition or separate ref system.
                 });
                 meshRef.current.position.set(0,0,0);
             }
          }}
        />
      )}
    </>
  );
}

import { useState } from 'react';
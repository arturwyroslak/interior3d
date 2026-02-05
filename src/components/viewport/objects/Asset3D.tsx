'use client';

import { useRef, useState } from 'react';
import { Mesh, BoxGeometry } from 'three';
import { useProjectStore } from '@/stores/useProjectStore';
import { useCursor, TransformControls } from '@react-three/drei';
import { ProceduralSofa, ProceduralTable, ProceduralChair, ProceduralBed } from './ProceduralFurniture';

interface Asset3DProps {
  asset: {
    id: string;
    position: [number, number, number];
    rotation: [number, number, number];
    scale: [number, number, number];
    name: string;
    modelPath?: string;
    color?: string; // Support custom color
  };
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

  const renderProceduralAsset = () => {
      const name = asset.name.toLowerCase();
      if (name.includes('sofa')) return <ProceduralSofa color={asset.color} />;
      if (name.includes('table')) return <ProceduralTable color={asset.color} />;
      if (name.includes('chair')) return <ProceduralChair color={asset.color} />;
      if (name.includes('bed')) return <ProceduralBed color={asset.color} />;
      
      // Default Cube
      return (
        <mesh castShadow receiveShadow>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={asset.color || "#8b5cf6"} />
        </mesh>
      );
  };

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
        {/* Render the specific procedural geometry */}
        <group ref={meshRef}>
            {renderProceduralAsset()}
        </group>
        
        {/* Selection Bounding Box */}
        {isSelected && (
          <lineSegments>
            <edgesGeometry args={[new BoxGeometry(1.2, 1.2, 1.2)]} /> 
            <lineBasicMaterial color="#60a5fa" linewidth={2} toneMapped={false} />
          </lineSegments>
        )}
      </group>
      
      {transformMode && (
        <TransformControls
          object={meshRef} // Technically this attaches to the inner group. 
          // For correct behavior we ideally attach to a proxy or handle logic carefully.
          // For this advanced demo, we assume the visual feedback is key.
          mode={transformMode}
          size={0.8}
          onMouseUp={() => {
             if (meshRef.current) {
                 updateAsset(asset.id, {
                    position: [
                        asset.position[0] + meshRef.current.position.x, 
                        asset.position[1] + meshRef.current.position.y, 
                        asset.position[2] + meshRef.current.position.z
                    ],
                    rotation: [
                        asset.rotation[0] + meshRef.current.rotation.x,
                        asset.rotation[1] + meshRef.current.rotation.y,
                        asset.rotation[2] + meshRef.current.rotation.z,
                    ],
                    // Scale would need multiplication logic
                 });
                 // Reset local transform after applying to store (global)
                 meshRef.current.position.set(0,0,0);
                 meshRef.current.rotation.set(0,0,0);
                 meshRef.current.scale.set(1,1,1);
             }
          }}
        />
      )}
    </>
  );
}
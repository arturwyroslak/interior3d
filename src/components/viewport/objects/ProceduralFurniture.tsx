'use client';

import React from 'react';

// Reusable parts
const Leg = ({ position }: { position: [number, number, number] }) => (
  <mesh position={position} castShadow>
    <cylinderGeometry args={[0.04, 0.03, 0.4]} />
    <meshStandardMaterial color="#333" roughness={0.5} />
  </mesh>
);

export const ProceduralSofa = ({ color = '#4f46e5' }: { color?: string }) => {
  return (
    <group position={[0, 0.4, 0]}>
        {/* Base / Seat */}
        <mesh position={[0, 0.1, 0]} castShadow receiveShadow>
            <boxGeometry args={[2.2, 0.3, 0.8]} />
            <meshStandardMaterial color={color} roughness={0.8} />
        </mesh>
        
        {/* Cushions */}
        <mesh position={[-0.55, 0.3, 0]} castShadow receiveShadow>
            <boxGeometry args={[1.0, 0.15, 0.75]} />
            <meshStandardMaterial color={color} roughness={0.9} />
        </mesh>
        <mesh position={[0.55, 0.3, 0]} castShadow receiveShadow>
            <boxGeometry args={[1.0, 0.15, 0.75]} />
            <meshStandardMaterial color={color} roughness={0.9} />
        </mesh>

        {/* Backrest */}
        <mesh position={[0, 0.5, -0.35]} castShadow receiveShadow>
            <boxGeometry args={[2.2, 0.6, 0.15]} />
            <meshStandardMaterial color={color} roughness={0.8} />
        </mesh>

        {/* Armrests */}
        <mesh position={[-1.15, 0.3, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.15, 0.5, 0.8]} />
            <meshStandardMaterial color={color} roughness={0.8} />
        </mesh>
        <mesh position={[1.15, 0.3, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.15, 0.5, 0.8]} />
            <meshStandardMaterial color={color} roughness={0.8} />
        </mesh>

        {/* Legs */}
        <Leg position={[-1, -0.3, 0.3]} />
        <Leg position={[1, -0.3, 0.3]} />
        <Leg position={[-1, -0.3, -0.3]} />
        <Leg position={[1, -0.3, -0.3]} />
    </group>
  );
};

export const ProceduralTable = ({ color = '#8b5cf6' }: { color?: string }) => {
    return (
        <group position={[0, 0.35, 0]}>
            {/* Top */}
            <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
                <cylinderGeometry args={[0.6, 0.6, 0.05, 32]} />
                <meshStandardMaterial color={color} roughness={0.2} metalness={0.1} />
            </mesh>
            
            {/* Stem/Legs */}
            <mesh position={[0, 0, 0]} castShadow>
                <cylinderGeometry args={[0.05, 0.05, 0.7]} />
                <meshStandardMaterial color="#1f2937" metalness={0.5} />
            </mesh>
            <mesh position={[0, -0.35, 0]} receiveShadow>
                 <cylinderGeometry args={[0.3, 0.3, 0.02, 32]} />
                 <meshStandardMaterial color="#1f2937" metalness={0.5} />
            </mesh>
        </group>
    );
};

export const ProceduralChair = ({ color = '#f59e0b' }: { color?: string }) => {
    return (
        <group position={[0, 0.45, 0]}>
            {/* Seat */}
            <mesh position={[0, 0, 0]} castShadow receiveShadow>
                <boxGeometry args={[0.45, 0.05, 0.45]} />
                <meshStandardMaterial color={color} roughness={0.7} />
            </mesh>
            
            {/* Back */}
            <mesh position={[0, 0.4, -0.2]} castShadow receiveShadow>
                <boxGeometry args={[0.45, 0.4, 0.05]} />
                <meshStandardMaterial color={color} roughness={0.7} />
            </mesh>

            {/* Legs */}
            <mesh position={[-0.2, -0.25, 0.2]} castShadow>
                <cylinderGeometry args={[0.02, 0.02, 0.45]} />
                <meshStandardMaterial color="#d1d5db" metalness={0.8} />
            </mesh>
            <mesh position={[0.2, -0.25, 0.2]} castShadow>
                <cylinderGeometry args={[0.02, 0.02, 0.45]} />
                <meshStandardMaterial color="#d1d5db" metalness={0.8} />
            </mesh>
            <mesh position={[-0.2, -0.25, -0.2]} castShadow>
                <cylinderGeometry args={[0.02, 0.02, 0.45]} />
                <meshStandardMaterial color="#d1d5db" metalness={0.8} />
            </mesh>
            <mesh position={[0.2, -0.25, -0.2]} castShadow>
                <cylinderGeometry args={[0.02, 0.02, 0.45]} />
                <meshStandardMaterial color="#d1d5db" metalness={0.8} />
            </mesh>
        </group>
    );
};

export const ProceduralBed = ({ color = '#3b82f6' }: { color?: string }) => {
    return (
        <group position={[0, 0.25, 0]}>
             {/* Frame */}
             <mesh position={[0, 0, 0]} castShadow>
                <boxGeometry args={[1.6, 0.3, 2.1]} />
                <meshStandardMaterial color="#1e293b" roughness={0.6} />
             </mesh>
             
             {/* Mattress */}
             <mesh position={[0, 0.15, 0]} castShadow>
                <boxGeometry args={[1.5, 0.2, 2.0]} />
                <meshStandardMaterial color="#f8fafc" roughness={0.9} />
             </mesh>

             {/* Blanket */}
             <mesh position={[0, 0.16, 0.2]} castShadow receiveShadow>
                <boxGeometry args={[1.52, 0.2, 1.6]} />
                <meshStandardMaterial color={color} roughness={0.8} />
             </mesh>

             {/* Pillows */}
             <mesh position={[-0.4, 0.25, -0.8]} castShadow>
                <boxGeometry args={[0.5, 0.1, 0.3]} />
                <meshStandardMaterial color="white" roughness={0.9} />
             </mesh>
             <mesh position={[0.4, 0.25, -0.8]} castShadow>
                <boxGeometry args={[0.5, 0.1, 0.3]} />
                <meshStandardMaterial color="white" roughness={0.9} />
             </mesh>

             {/* Headboard */}
             <mesh position={[0, 0.4, -1.0]} castShadow>
                <boxGeometry args={[1.6, 0.8, 0.1]} />
                <meshStandardMaterial color="#1e293b" roughness={0.6} />
             </mesh>
        </group>
    );
};
'use client';

import { OrbitControls, Grid, Sky, Environment, ContactShadows, PerspectiveCamera } from '@react-three/drei';
import { useProjectStore } from '@/stores/useProjectStore';
import { useRenderStore } from '@/stores/useRenderStore';
import Wall3D from './objects/Wall3D';
import Asset3D from './objects/Asset3D';

export default function Scene3D() {
  const { walls, assets, snapToGrid, gridSize } = useProjectStore();
  const { shadows, sunIntensity } = useRenderStore();

  return (
    <>
      {/* Camera */}
      <PerspectiveCamera makeDefault position={[10, 10, 10]} fov={50} />
      
      {/* Controls */}
      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        minDistance={1}
        maxDistance={100}
        maxPolarAngle={Math.PI / 2}
        makeDefault
      />

      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[10, 20, 10]}
        intensity={sunIntensity}
        castShadow={shadows}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />
      <pointLight position={[-10, 10, -10]} intensity={0.3} color="#88ccff" />

      {/* Environment */}
      <Environment preset="apartment" />
      <Sky sunPosition={[100, 20, 100]} />

      {/* Grid */}
      {snapToGrid && (
        <Grid
          args={[100, 100]}
          cellSize={gridSize}
          cellThickness={0.5}
          cellColor="#6366f1"
          sectionSize={gridSize * 5}
          sectionThickness={1}
          sectionColor="#8b5cf6"
          fadeDistance={50}
          fadeStrength={1}
          followCamera={false}
          infiniteGrid
        />
      )}

      {/* Ground */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.1} roughness={0.8} />
      </mesh>

      {/* Contact Shadows */}
      {shadows && <ContactShadows opacity={0.5} scale={50} blur={1} far={10} />}

      {/* Walls */}
      {walls.map((wall) => (
        <Wall3D key={wall.id} wall={wall} />
      ))}

      {/* Assets */}
      {assets.map((asset) => (
        <Asset3D key={asset.id} asset={asset} />
      ))}

      {/* Reference Cube */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#3b82f6" metalness={0.3} roughness={0.4} />
      </mesh>
    </>
  );
}
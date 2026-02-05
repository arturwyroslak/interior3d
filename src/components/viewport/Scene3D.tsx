'use client';

import { OrbitControls, Grid, Sky, Environment, ContactShadows, PerspectiveCamera, GizmoHelper, GizmoViewport } from '@react-three/drei';
import { useProjectStore } from '@/stores/useProjectStore';
import { useRenderStore } from '@/stores/useRenderStore';
import Wall3D from './objects/Wall3D';
import Asset3D from './objects/Asset3D';

export default function Scene3D() {
  const { walls, assets, snapToGrid, gridSize, activeTool, selectedIds } = useProjectStore();
  const { shadows, sunIntensity } = useRenderStore();

  const isTransforming = ['move', 'rotate', 'scale'].includes(activeTool) && selectedIds.length > 0;

  return (
    <>
      {/* Camera */}
      <PerspectiveCamera makeDefault position={[10, 10, 10]} fov={50} />
      
      {/* Controls - Disable orbit when using gizmos to prevent camera conflict */}
      <OrbitControls
        makeDefault
        enableDamping
        dampingFactor={0.05}
        minDistance={1}
        maxDistance={50}
        maxPolarAngle={Math.PI / 2}
        enabled={!isTransforming} 
      />

      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[10, 20, 10]}
        intensity={sunIntensity}
        castShadow={shadows}
        shadow-mapSize={[2048, 2048]}
      >
        <orthographicCamera attach="shadow-camera" args={[-20, 20, 20, -20]} />
      </directionalLight>

      {/* Environment */}
      <Environment preset="apartment" background={false} />
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
          infiniteGrid
          position={[0, -0.01, 0]}
        />
      )}

      {/* Ground Plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.1} roughness={0.8} />
      </mesh>

      {shadows && <ContactShadows opacity={0.4} scale={50} blur={1.5} far={10} resolution={256} color="#000000" />}

      {/* Objects */}
      <group>
        {walls.map((wall) => (
            <Wall3D key={wall.id} wall={wall} />
        ))}
        {assets.map((asset) => (
            <Asset3D key={asset.id} asset={asset} />
        ))}
      </group>

      {/* Gizmo Helper */}
      <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
        <GizmoViewport axisColors={['#ef4444', '#22c55e', '#3b82f6']} labelColor="white" />
      </GizmoHelper>
    </>
  );
}
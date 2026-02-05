'use client';

import { OrbitControls, Grid, Sky, Environment, ContactShadows, PerspectiveCamera, GizmoHelper, GizmoViewport, PointerLockControls } from '@react-three/drei';
import { useProjectStore } from '@/stores/useProjectStore';
import { useRenderStore } from '@/stores/useRenderStore';
import Wall3D from './objects/Wall3D';
import Asset3D from './objects/Asset3D';
import { useEffect, useRef, useState } from 'react';
import { useThree } from '@react-three/fiber';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import * as THREE from 'three';

export default function Scene3D() {
  const { walls, assets, snapToGrid, gridSize, activeTool, selectedIds } = useProjectStore();
  const { shadows, sunIntensity } = useRenderStore();
  const { scene, gl, camera } = useThree();
  const controlsRef = useRef<any>(null);
  
  const [isWalkMode, setIsWalkMode] = useState(false);

  const isTransforming = ['move', 'rotate', 'scale'].includes(activeTool) && selectedIds.length > 0;

  // Toggle walk mode when tool changes
  useEffect(() => {
    setIsWalkMode(activeTool === 'navigation');
  }, [activeTool]);

  // Expose scene for export
  useEffect(() => {
    window.sceneRef = scene;

    const handleExportGLB = (e: any) => {
        const filename = e.detail?.filename || 'scene';
        const exporter = new GLTFExporter();
        exporter.parse(
            scene,
            (result) => {
                const output = JSON.stringify(result, null, 2);
                const blob = new Blob([output], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `${filename}.gltf`; // Using .gltf for text-based simple example, .glb requires arraybuffer handling
                link.click();
                URL.revokeObjectURL(url);
            },
            (error) => {
                console.error('An error happened during GLTF export', error);
            },
            {}
        );
    };

    const handleScreenshot = (e: any) => {
        const filename = e.detail?.filename || 'screenshot';
        const format = e.detail?.format || 'png';
        
        // Force render
        gl.render(scene, camera);
        const dataUrl = gl.domElement.toDataURL(`image/${format}`);
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = `${filename}.${format}`;
        link.click();
    };

    window.addEventListener('trigger-export-glb', handleExportGLB);
    window.addEventListener('trigger-screenshot', handleScreenshot);
    
    return () => {
        window.removeEventListener('trigger-export-glb', handleExportGLB);
        window.removeEventListener('trigger-screenshot', handleScreenshot);
    };
  }, [scene, gl, camera]);

  return (
    <>
      <PerspectiveCamera makeDefault position={[10, 10, 10]} fov={50} />
      
      {/* Controls Switching */}
      {isWalkMode ? (
        <PointerLockControls selector="#canvas-container" />
      ) : (
        <OrbitControls
          ref={controlsRef}
          makeDefault
          enableDamping
          dampingFactor={0.05}
          minDistance={1}
          maxDistance={50}
          maxPolarAngle={Math.PI / 2}
          enabled={!isTransforming} 
        />
      )}

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
      {snapToGrid && !isWalkMode && (
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

      {/* Gizmo Helper - Hide in walk mode */}
      {!isWalkMode && (
        <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
            <GizmoViewport axisColors={['#ef4444', '#22c55e', '#3b82f6']} labelColor="white" />
        </GizmoHelper>
      )}
    </>
  );
}
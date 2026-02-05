'use client';

import { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { useProjectStore } from '@/stores/useProjectStore';
import Scene3D from './Scene3D';
import FloorplanEditor from './FloorplanEditor';
import RenderView from './RenderView';
import ViewportControls from './ViewportControls';
import LoadingScreen from './LoadingScreen';
import * as THREE from 'three';

export default function Viewport() {
  const { viewMode, addAsset } = useProjectStore();
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const assetData = e.dataTransfer.getData('asset');
    
    if (assetData) {
      const template = JSON.parse(assetData);
      
      // Calculate drop position (simplified for now, ideally raycast to floor)
      // We'll place it at center or slightly offset based on camera look
      // For a robust implementation, we'd need access to the Three.js scene here, 
      // but passing it via store or event bus is complex. 
      // We'll spawn at (0, 0, 0) or random offset.
      
      addAsset({
        id: `${template.id}-${Date.now()}`,
        type: 'furniture', // Simplification
        name: template.name,
        position: [Math.random() * 2 - 1, 0, Math.random() * 2 - 1],
        rotation: [0, 0, 0],
        scale: [1, 1, 1],
        modelPath: template.id,
      });
    }
  };

  return (
    <div 
      ref={canvasRef}
      className="relative w-full h-full bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 overflow-hidden"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {/* Grid Background */}
      <div className="absolute inset-0 grid-pattern opacity-20" />

      {/* Viewport Content */}
      {viewMode === '2D' && <FloorplanEditor />}
      
      {(viewMode === '3D' || viewMode === 'RENDER') && (
        <Canvas
          shadows
          dpr={[1, 2]}
          camera={{ position: [8, 8, 8], fov: 50 }}
          gl={{ antialias: true, alpha: false, preserveDrawingBuffer: true }}
          className="canvas-container"
        >
          <Suspense fallback={null}>
            {viewMode === '3D' ? <Scene3D /> : <RenderView />}
          </Suspense>
        </Canvas>
      )}

      {/* Viewport Controls Overlay */}
      <ViewportControls />

      {/* Loading Screen */}
      <LoadingScreen />

      {/* Minimap (for 3D mode) */}
      {viewMode === '3D' && (
        <div className="absolute bottom-4 right-4 w-48 h-48 bg-gray-900/80 backdrop-blur-md border border-gray-700 rounded-xl overflow-hidden shadow-2xl pointer-events-none">
          <div className="w-full h-full relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20" />
            <div className="absolute top-2 left-2 text-xs text-gray-400 font-medium">Minimap</div>
            <div className="absolute inset-0 flex items-center justify-center text-gray-600">
               {/* Simple SVG representation of room */}
               <svg viewBox="0 0 100 100" className="w-3/4 h-3/4 opacity-50">
                  <rect x="20" y="20" width="60" height="60" fill="none" stroke="currentColor" strokeWidth="2" />
                  <circle cx="50" cy="50" r="5" fill="currentColor" />
               </svg>
            </div>
          </div>
        </div>
      )}

      {/* Performance Stats */}
      <div className="absolute top-4 left-4 bg-gray-900/80 backdrop-blur-md border border-gray-700 rounded-lg px-3 py-2 text-xs text-gray-400 font-mono pointer-events-none select-none">
        <div className="flex gap-4">
           <span>FPS: <span className="text-green-400 font-bold">60</span></span>
           <span>Mode: <span className="text-blue-400 font-bold">{viewMode}</span></span>
        </div>
      </div>
    </div>
  );
}
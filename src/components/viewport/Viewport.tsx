'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useProjectStore } from '@/stores/useProjectStore';
import Scene3D from './Scene3D';
import FloorplanEditor from './FloorplanEditor';
import RenderView from './RenderView';
import ViewportControls from './ViewportControls';
import LoadingScreen from './LoadingScreen';

export default function Viewport() {
  const viewMode = useProjectStore((state) => state.viewMode);

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 grid-pattern opacity-20" />

      {/* Viewport Content */}
      {viewMode === '2D' && <FloorplanEditor />}
      
      {(viewMode === '3D' || viewMode === 'RENDER') && (
        <Canvas
          shadows
          dpr={[1, 2]}
          camera={{ position: [10, 10, 10], fov: 50 }}
          gl={{ antialias: true, alpha: false }}
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
        <div className="absolute bottom-4 right-4 w-48 h-48 bg-gray-900/80 backdrop-blur-md border border-gray-700 rounded-xl overflow-hidden shadow-2xl">
          <div className="w-full h-full relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20" />
            <div className="absolute top-2 left-2 text-xs text-gray-400 font-medium">Minimap</div>
            <div className="absolute inset-0 flex items-center justify-center text-gray-600">
              <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M9 3v18M15 3v18M3 9h18M3 15h18" />
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* Performance Stats */}
      <div className="absolute top-4 left-4 bg-gray-900/80 backdrop-blur-md border border-gray-700 rounded-lg px-3 py-2 text-xs text-gray-400 font-mono">
        <div>FPS: <span className="text-green-400">60</span></div>
        <div>Objects: <span className="text-blue-400">0</span></div>
        <div>Triangles: <span className="text-purple-400">0</span></div>
      </div>
    </div>
  );
}
'use client';

import { EffectComposer, Bloom, DepthOfField, SSAO } from '@react-three/postprocessing';
import { useRenderStore } from '@/stores/useRenderStore';
import Scene3D from './Scene3D';

export default function RenderView() {
  const { quality, ambientOcclusion, antialiasing } = useRenderStore();

  return (
    <>
      <Scene3D />
      
      {/* Post-processing Effects - Only when quality allows */}
      {quality !== 'low' && (
        <EffectComposer multisampling={antialiasing ? 8 : 0}>
          {ambientOcclusion && (
            <SSAO
              samples={quality === 'ultra' ? 32 : quality === 'high' ? 16 : 8}
              radius={0.1}
              intensity={30}
            />
          )}

          <Bloom
            intensity={0.5}
            luminanceThreshold={0.9}
            luminanceSmoothing={0.9}
            mipmapBlur
          />

          {quality === 'ultra' && (
            <DepthOfField
              focusDistance={0.01}
              focalLength={0.05}
              bokehScale={3}
            />
          )}
        </EffectComposer>
      )}
    </>
  );
}
'use client';

import { EffectComposer, Bloom, DepthOfField, SSAO, ToneMapping } from '@react-three/postprocessing';
import { ToneMappingMode } from 'postprocessing';
import { useRenderStore } from '@/stores/useRenderStore';
import Scene3D from './Scene3D';

export default function RenderView() {
  const { quality, ambientOcclusion, antialiasing, toneMapping } = useRenderStore();

  const toneMappingMode = {
    none: ToneMappingMode.LINEAR,
    linear: ToneMappingMode.LINEAR,
    reinhard: ToneMappingMode.REINHARD,
    cinematic: ToneMappingMode.REINHARD2,
    aces: ToneMappingMode.ACES_FILMIC,
  }[toneMapping];

  return (
    <>
      <Scene3D />
      
      {/* Post-processing Effects */}
      <EffectComposer multisampling={antialiasing ? 8 : 0}>
        {/* Ambient Occlusion */}
        {ambientOcclusion && quality !== 'low' && (
          <SSAO
            samples={quality === 'ultra' ? 32 : quality === 'high' ? 16 : 8}
            radius={0.1}
            intensity={30}
          />
        )}

        {/* Bloom */}
        {quality !== 'low' && (
          <Bloom
            intensity={0.5}
            luminanceThreshold={0.9}
            luminanceSmoothing={0.9}
            mipmapBlur
          />
        )}

        {/* Depth of Field */}
        {quality === 'ultra' && (
          <DepthOfField
            focusDistance={0.01}
            focalLength={0.05}
            bokehScale={3}
          />
        )}

        {/* Tone Mapping */}
        <ToneMapping mode={toneMappingMode} />
      </EffectComposer>
    </>
  );
}
'use client';

import { EffectComposer, Bloom, DepthOfField, SSAO } from '@react-three/postprocessing';
import { useRenderStore } from '@/stores/useRenderStore';
import Scene3D from './Scene3D';
import React, { ReactElement } from 'react';

export default function RenderView() {
  const { quality, ambientOcclusion, antialiasing } = useRenderStore();

  if (quality === 'low') {
    return <Scene3D />;
  }

  // Construct effects array to satisfy strict TypeScript requirements
  // EffectComposer children must be Elements, not null/boolean
  const effects: ReactElement[] = [];

  if (ambientOcclusion) {
    effects.push(
      <SSAO
        key="ssao"
        samples={quality === 'ultra' ? 32 : quality === 'high' ? 16 : 8}
        radius={0.1}
        intensity={30}
      />
    );
  }

  effects.push(
    <Bloom
      key="bloom"
      intensity={0.5}
      luminanceThreshold={0.9}
      luminanceSmoothing={0.9}
      mipmapBlur
    />
  );

  if (quality === 'ultra') {
    effects.push(
      <DepthOfField
        key="dof"
        focusDistance={0.01}
        focalLength={0.05}
        bokehScale={3}
      />
    );
  }

  return (
    <>
      <Scene3D />
      <EffectComposer multisampling={antialiasing ? 8 : 0}>
        {effects}
      </EffectComposer>
    </>
  );
}
import { create } from 'zustand';

interface RenderSettings {
  shadows: boolean;
  quality: 'low' | 'medium' | 'high' | 'ultra';
  globalIllumination: boolean;
  hdri: string;
  sunIntensity: number;
  timeOfDay: number;
  exposure: number;
  raytracing: boolean;
  ambientOcclusion: boolean;
  antialiasing: boolean;
  toneMapping: 'none' | 'linear' | 'reinhard' | 'cinematic' | 'aces';
}

interface RenderStore extends RenderSettings {
  isRendering: boolean;
  renderProgress: number;
  
  updateSettings: (settings: Partial<RenderSettings>) => void;
  startRender: () => void;
  stopRender: () => void;
  captureScreenshot: () => void;
}

export const useRenderStore = create<RenderStore>((set, get) => ({
  shadows: true,
  quality: 'high',
  globalIllumination: true,
  hdri: 'studio',
  sunIntensity: 1.0,
  timeOfDay: 12,
  exposure: 1.0,
  raytracing: false,
  ambientOcclusion: true,
  antialiasing: true,
  toneMapping: 'aces',
  isRendering: false,
  renderProgress: 0,
  
  updateSettings: (settings) => set(settings),
  
  startRender: () => {
    set({ isRendering: true, renderProgress: 0 });
    // Simulate render progress
    const interval = setInterval(() => {
      const progress = get().renderProgress;
      if (progress >= 100) {
        clearInterval(interval);
        set({ isRendering: false });
      } else {
        set({ renderProgress: progress + 10 });
      }
    }, 200);
  },
  
  stopRender: () => set({ isRendering: false, renderProgress: 0 }),
  
  captureScreenshot: () => {
    const canvas = document.querySelector('canvas');
    if (!canvas) return;
    
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `render-${Date.now()}.png`;
      a.click();
      URL.revokeObjectURL(url);
    });
  },
}));
'use client';

import { useRenderStore } from '@/stores/useRenderStore';
import { Sliders, Sun, Image as ImageIcon, Zap, MonitorPlay } from 'lucide-react';

export default function RenderSettingsPanel() {
  const {
    quality,
    shadows,
    globalIllumination,
    sunIntensity,
    isRendering,
    renderProgress,
    updateSettings,
    startRender,
  } = useRenderStore();

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-gray-900 via-gray-850 to-gray-900">
      {/* Header */}
      <div className="p-4 border-b border-gray-700/50">
        <div className="flex items-center gap-2 text-gray-200">
          <ImageIcon className="w-5 h-5 text-purple-500" />
          <h2 className="font-bold text-lg">Render Settings</h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Quality Section */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-400">
            <Sliders className="w-4 h-4" />
            <span>Quality Preset</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {['low', 'medium', 'high', 'ultra'].map((q) => (
              <button
                key={q}
                onClick={() => updateSettings({ quality: q as any })}
                className={`px-3 py-2 rounded-lg text-sm capitalize transition-all ${
                  quality === q
                    ? 'bg-purple-600 text-white border-transparent shadow-lg shadow-purple-900/50'
                    : 'bg-gray-800 border border-gray-700 text-gray-400 hover:bg-gray-700'
                }`}
              >
                {q}
              </button>
            ))}
          </div>
        </section>

        {/* Lighting Section */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-400">
            <Sun className="w-4 h-4" />
            <span>Environment</span>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-gray-400">
              <span>Sun Intensity</span>
              <span>{sunIntensity.toFixed(1)}</span>
            </div>
            <input
              type="range"
              min="0"
              max="5"
              step="0.1"
              value={sunIntensity}
              onChange={(e) => updateSettings({ sunIntensity: parseFloat(e.target.value) })}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700/50">
            <span className="text-sm text-gray-300">Global Illumination</span>
            <div
              onClick={() => updateSettings({ globalIllumination: !globalIllumination })}
              className={`w-10 h-6 rounded-full p-1 cursor-pointer transition-colors ${
                globalIllumination ? 'bg-purple-600' : 'bg-gray-600'
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full transition-transform ${
                  globalIllumination ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700/50">
            <span className="text-sm text-gray-300">Shadows</span>
            <div
              onClick={() => updateSettings({ shadows: !shadows })}
              className={`w-10 h-6 rounded-full p-1 cursor-pointer transition-colors ${
                shadows ? 'bg-purple-600' : 'bg-gray-600'
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full transition-transform ${
                  shadows ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </div>
          </div>
        </section>

        {/* Effects Section */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-400">
            <Zap className="w-4 h-4" />
            <span>Post Processing</span>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded border-gray-600 bg-gray-700 text-purple-600 focus:ring-purple-500" />
              Bloom
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded border-gray-600 bg-gray-700 text-purple-600 focus:ring-purple-500" />
              Ambient Occlusion
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded border-gray-600 bg-gray-700 text-purple-600 focus:ring-purple-500" />
              Antialiasing
            </label>
          </div>
        </section>
      </div>

      {/* Render Button */}
      <div className="p-4 border-t border-gray-700/50 bg-gray-900/50 backdrop-blur">
        <button
          onClick={startRender}
          disabled={isRendering}
          className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 font-bold text-lg transition-all ${
            isRendering
              ? 'bg-gray-700 text-gray-400 cursor-wait'
              : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white shadow-lg shadow-purple-500/25'
          }`}
        >
          {isRendering ? (
            <>
              <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              <span>Rendering {renderProgress}%</span>
            </>
          ) : (
            <>
              <MonitorPlay className="w-5 h-5" />
              <span>Start Render</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
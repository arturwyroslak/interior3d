'use client';

import { useState } from 'react';
import { useProjectStore } from '@/stores/useProjectStore';
import RenderSettingsPanel from '../panels/RenderSettingsPanel';
import {
  Settings,
  Move3d,
  RotateCw,
  Maximize2,
  Palette,
  Lightbulb,
  ChevronRight,
  ChevronDown,
} from 'lucide-react';

interface PanelSection {
  id: string;
  title: string;
  icon: any;
  content: React.ReactNode;
}

function PropertyGroup({ label, icon: Icon, children }: { label: string; icon: any; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-3.5 h-3.5 text-gray-500" />
        <label className="text-xs text-gray-400 font-medium">{label}</label>
      </div>
      {children}
    </div>
  );
}

function InputField({ label, value, suffix }: { label: string; value: string; suffix?: string }) {
  return (
    <div>
      <label className="text-[10px] text-gray-500 mb-1 block">{label}</label>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={() => {}} // ReadOnly for demo or add proper handlers
          className="w-full bg-gray-800/50 text-gray-300 px-2 py-1.5 pr-6 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-xs"
        />
        {suffix && (
          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-gray-500">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

export default function RightPanel() {
  const { selectedIds, assets, viewMode } = useProjectStore();
  const [expandedSections, setExpandedSections] = useState<string[]>(['transform', 'material']);

  // If in Render mode, show Render Settings instead of Object Properties
  if (viewMode === 'RENDER') {
    return (
      <div className="w-80 border-l border-gray-700/50 relative z-40 h-full">
        <RenderSettingsPanel />
      </div>
    );
  }

  const selectedAsset = selectedIds.length === 1 ? assets.find((a) => a.id === selectedIds[0]) : null;

  const toggleSection = (id: string) => {
    setExpandedSections((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const sections: PanelSection[] = [
    {
      id: 'transform',
      title: 'Transform',
      icon: Move3d,
      content: selectedAsset ? (
        <div className="space-y-3">
          <PropertyGroup label="Position" icon={Move3d}>
            <div className="grid grid-cols-3 gap-2">
              <InputField label="X" value={selectedAsset.position[0].toFixed(2)} suffix="m" />
              <InputField label="Y" value={selectedAsset.position[1].toFixed(2)} suffix="m" />
              <InputField label="Z" value={selectedAsset.position[2].toFixed(2)} suffix="m" />
            </div>
          </PropertyGroup>

          <PropertyGroup label="Rotation" icon={RotateCw}>
            <div className="grid grid-cols-3 gap-2">
              <InputField label="X" value={selectedAsset.rotation[0].toFixed(2)} suffix="°" />
              <InputField label="Y" value={selectedAsset.rotation[1].toFixed(2)} suffix="°" />
              <InputField label="Z" value={selectedAsset.rotation[2].toFixed(2)} suffix="°" />
            </div>
          </PropertyGroup>

          <PropertyGroup label="Scale" icon={Maximize2}>
            <div className="grid grid-cols-3 gap-2">
              <InputField label="X" value={selectedAsset.scale[0].toFixed(2)} />
              <InputField label="Y" value={selectedAsset.scale[1].toFixed(2)} />
              <InputField label="Z" value={selectedAsset.scale[2].toFixed(2)} />
            </div>
          </PropertyGroup>
        </div>
      ) : (
        <div className="text-gray-500 text-sm text-center py-4">No object selected</div>
      ),
    },
    {
      id: 'material',
      title: 'Material',
      icon: Palette,
      content: (
        <div className="space-y-3">
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                defaultValue="#3B82F6"
                className="w-12 h-12 rounded-lg border border-gray-700 cursor-pointer"
              />
              <input
                type="text"
                defaultValue="#3B82F6"
                className="flex-1 bg-gray-800/50 text-gray-300 px-3 py-2 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-sm"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-400 mb-1 block">Metalness</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              defaultValue="0.5"
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>

          <div>
            <label className="text-xs text-gray-400 mb-1 block">Roughness</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              defaultValue="0.5"
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>
        </div>
      ),
    },
    {
      id: 'lighting',
      title: 'Lighting',
      icon: Lightbulb,
      content: (
        <div className="space-y-3">
           <div className="p-2 text-sm text-gray-400">Light settings available for light objects</div>
        </div>
      ),
    },
  ];

  return (
    <div className="w-80 bg-gradient-to-b from-gray-900 via-gray-850 to-gray-900 dark:from-black dark:via-gray-950 dark:to-black border-l border-gray-700/50 flex flex-col shadow-2xl relative z-40 h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-700/50">
        <div className="flex items-center gap-2 text-gray-300">
          <Settings className="w-5 h-5 text-blue-500" />
          <h2 className="font-bold text-lg">Properties</h2>
        </div>
        {selectedIds.length > 0 && (
          <p className="text-xs text-gray-500 mt-1">
            {selectedIds.length} object{selectedIds.length > 1 ? 's' : ''} selected
          </p>
        )}
      </div>

      {/* Sections */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {sections.map((section) => {
          const Icon = section.icon;
          const isExpanded = expandedSections.includes(section.id);
          return (
            <div
              key={section.id}
              className="bg-gray-800/30 rounded-xl border border-gray-700/50 overflow-hidden backdrop-blur-sm"
            >
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full p-3 flex items-center justify-between hover:bg-gray-700/30 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-blue-400" />
                  <span className="font-medium text-gray-300">{section.title}</span>
                </div>
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-500" />
                )}
              </button>
              {isExpanded && <div className="p-3 pt-0 border-t border-gray-700/30">{section.content}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
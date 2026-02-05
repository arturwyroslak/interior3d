'use client';

import { useProjectStore } from '@/stores/useProjectStore';
import {
  MousePointer2,
  Square,
  DoorOpen,
  RectangleVertical,
  Ruler,
  Move,
  RotateCw,
  Maximize2,
  Trash2,
  Copy,
  Scissors,
  Navigation,
  Eye,
  Layers,
} from 'lucide-react';

const tools2D = [
  { id: 'select', icon: MousePointer2, label: 'Select', shortcut: 'V' },
  { id: 'wall', icon: Square, label: 'Draw Wall', shortcut: 'W' },
  { id: 'door', icon: DoorOpen, label: 'Add Door', shortcut: 'D' },
  { id: 'window', icon: RectangleVertical, label: 'Add Window', shortcut: 'N' },
  { id: 'measure', icon: Ruler, label: 'Measure', shortcut: 'M' },
];

const tools3D = [
  { id: 'select', icon: MousePointer2, label: 'Select', shortcut: 'V' },
  { id: 'move', icon: Move, label: 'Move', shortcut: 'G' },
  { id: 'rotate', icon: RotateCw, label: 'Rotate', shortcut: 'R' },
  { id: 'scale', icon: Maximize2, label: 'Scale', shortcut: 'S' },
  { id: 'delete', icon: Trash2, label: 'Delete', shortcut: 'X' },
];

const additionalTools = [
  { id: 'duplicate', icon: Copy, label: 'Duplicate', shortcut: 'Ctrl+D' },
  { id: 'navigation', icon: Navigation, label: 'Walk Mode', shortcut: 'Space' },
  { id: 'layers', icon: Layers, label: 'Layers', shortcut: 'L' },
];

export default function LeftToolbar() {
  const { viewMode, activeTool, setActiveTool } = useProjectStore();

  const currentTools = viewMode === '2D' ? tools2D : tools3D;

  return (
    <div className="w-20 bg-gradient-to-b from-gray-900 via-gray-850 to-gray-900 dark:from-black dark:via-gray-950 dark:to-black border-r border-gray-700/50 flex flex-col items-center py-4 gap-2 shadow-2xl relative z-40">
      {/* Main Tools */}
      <div className="flex flex-col gap-2 pb-4 border-b border-gray-700/50 w-full px-2">
        {currentTools.map((tool) => {
          const Icon = tool.icon;
          const isActive = activeTool === tool.id;
          return (
            <button
              key={tool.id}
              onClick={() => setActiveTool(tool.id as any)}
              className={`group relative w-full aspect-square rounded-xl transition-all duration-300 flex items-center justify-center ${
                isActive
                  ? 'bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg shadow-blue-500/50 scale-105'
                  : 'bg-gray-800/50 hover:bg-gray-700 border border-gray-700/50 hover:border-gray-600 hover:scale-105'
              }`}
              title={tool.label}
            >
              <Icon
                className={`w-6 h-6 ${
                  isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'
                }`}
                strokeWidth={2}
              />
              
              {/* Tooltip */}
              <div className="absolute left-full ml-4 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap shadow-xl border border-gray-700 z-50">
                <div className="font-medium">{tool.label}</div>
                <div className="text-xs text-gray-400 mt-0.5">{tool.shortcut}</div>
                <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gray-900 border-l border-t border-gray-700 rotate-45" />
              </div>

              {/* Keyboard Shortcut Badge */}
              {isActive && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-lg">
                  {tool.shortcut}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Additional Tools */}
      <div className="flex flex-col gap-2 w-full px-2">
        {additionalTools.map((tool) => {
          const Icon = tool.icon;
          return (
            <button
              key={tool.id}
              className="group relative w-full aspect-square rounded-xl bg-gray-800/50 hover:bg-gradient-to-br hover:from-gray-700 hover:to-gray-600 border border-gray-700/50 hover:border-gray-600 transition-all duration-300 flex items-center justify-center hover:scale-105"
              title={tool.label}
            >
              <Icon className="w-6 h-6 text-gray-400 group-hover:text-white" strokeWidth={2} />
              
              {/* Tooltip */}
              <div className="absolute left-full ml-4 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap shadow-xl border border-gray-700 z-50">
                <div className="font-medium">{tool.label}</div>
                <div className="text-xs text-gray-400 mt-0.5">{tool.shortcut}</div>
                <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gray-900 border-l border-t border-gray-700 rotate-45" />
              </div>
            </button>
          );
        })}
      </div>

      {/* View Mode Indicator */}
      <div className="mt-auto w-full px-2">
        <div className="w-full aspect-square rounded-xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30 flex flex-col items-center justify-center text-blue-400">
          <Eye className="w-5 h-5 mb-1" />
          <span className="text-[10px] font-bold">{viewMode}</span>
        </div>
      </div>
    </div>
  );
}
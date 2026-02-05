'use client';

import { useProjectStore } from '@/stores/useProjectStore';
import {
  MousePointer2,
  Square,
  DoorOpen,
  Frame,
  Ruler,
  Move,
  RotateCw,
  Maximize,
  Navigation,
  Copy,
  Trash2,
  Grid3x3,
  Eye,
  Layers,
  Camera,
} from 'lucide-react';

const tools2D = [
  { id: 'select', icon: MousePointer2, label: 'Select (V)', shortcut: 'V' },
  { id: 'wall', icon: Square, label: 'Draw Walls (W)', shortcut: 'W' },
  { id: 'door', icon: DoorOpen, label: 'Add Door (D)', shortcut: 'D' },
  { id: 'window', icon: Frame, label: 'Add Window', shortcut: '' },
  { id: 'measure', icon: Ruler, label: 'Measure (M)', shortcut: 'M' },
];

const tools3D = [
  { id: 'select', icon: MousePointer2, label: 'Select (V)', shortcut: 'V' },
  { id: 'move', icon: Move, label: 'Move (G)', shortcut: 'G' },
  { id: 'rotate', icon: RotateCw, label: 'Rotate (R)', shortcut: 'R' },
  { id: 'scale', icon: Maximize, label: 'Scale (S)', shortcut: 'S' },
  { id: 'navigation', icon: Navigation, label: 'Walk Mode', shortcut: '' },
  { id: 'duplicate', icon: Copy, label: 'Duplicate', shortcut: '' },
  { id: 'delete', icon: Trash2, label: 'Delete', shortcut: 'Del' },
];

export default function LeftPanel() {
  const { viewMode, activeTool, setActiveTool, snapToGrid, toggleSnapToGrid } = useProjectStore();

  const tools = viewMode === '2D' ? tools2D : tools3D;

  return (
    <div className="w-16 bg-gray-900 dark:bg-black border-r border-gray-700/50 flex flex-col items-center py-4 gap-2 shadow-2xl relative z-40">
      {/* Tools */}
      <div className="flex flex-col gap-1 w-full px-2">
        {tools.map((tool) => {
          const Icon = tool.icon;
          const isActive = activeTool === tool.id;
          return (
            <div key={tool.id} className="relative group">
              <button
                onClick={() => setActiveTool(tool.id as any)}
                className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
                title={tool.label}
              >
                <Icon className="w-5 h-5" strokeWidth={2} />
              </button>
              
              {/* Tooltip */}
              <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 border border-gray-700">
                {tool.label}
                {tool.shortcut && (
                  <span className="ml-2 text-gray-400">({tool.shortcut})</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="h-px w-10 bg-gray-700 my-2" />

      {/* View Options */}
      <div className="flex flex-col gap-1 w-full px-2">
        <div className="relative group">
          <button
            onClick={toggleSnapToGrid}
            className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-200 ${
              snapToGrid
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/50'
                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
            }`}
            title="Toggle Grid"
          >
            <Grid3x3 className="w-5 h-5" strokeWidth={2} />
          </button>
          <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 border border-gray-700">
            Snap to Grid
          </div>
        </div>

        <div className="relative group">
          <button
            className="w-12 h-12 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-800 hover:text-white transition-all duration-200"
            title="Layers"
          >
            <Layers className="w-5 h-5" strokeWidth={2} />
          </button>
          <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 border border-gray-700">
            Layers Panel
          </div>
        </div>

        <div className="relative group">
          <button
            className="w-12 h-12 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-800 hover:text-white transition-all duration-200"
            title="Visibility"
          >
            <Eye className="w-5 h-5" strokeWidth={2} />
          </button>
          <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 border border-gray-700">
            Toggle Visibility
          </div>
        </div>
      </div>
    </div>
  );
}
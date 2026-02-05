'use client';

import { useProjectStore } from '@/stores/useProjectStore';
import { MousePointer2, Grid3x3, Ruler, Camera } from 'lucide-react';

export default function StatusBar() {
  const { viewMode, activeTool, snapToGrid, gridSize, selectedIds } = useProjectStore();

  return (
    <div className="h-8 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-black dark:via-gray-950 dark:to-black border-t border-gray-700/50 px-4 flex items-center justify-between text-xs text-gray-400">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <MousePointer2 className="w-3.5 h-3.5" />
          <span>Tool: <span className="text-blue-400 font-medium">{activeTool}</span></span>
        </div>
        
        <div className="h-4 w-px bg-gray-700" />
        
        <div className="flex items-center gap-2">
          <Camera className="w-3.5 h-3.5" />
          <span>View: <span className="text-purple-400 font-medium">{viewMode}</span></span>
        </div>
        
        {selectedIds.length > 0 && (
          <>
            <div className="h-4 w-px bg-gray-700" />
            <span>Selected: <span className="text-green-400 font-medium">{selectedIds.length}</span></span>
          </>
        )}
      </div>

      <div className="flex items-center gap-4">
        {snapToGrid && (
          <div className="flex items-center gap-2">
            <Grid3x3 className="w-3.5 h-3.5 text-blue-400" />
            <span>Grid: <span className="text-blue-400 font-medium">{gridSize}m</span></span>
          </div>
        )}
        
        <div className="h-4 w-px bg-gray-700" />
        
        <div className="flex items-center gap-2">
          <Ruler className="w-3.5 h-3.5" />
          <span>Units: <span className="text-gray-300 font-medium">Metric</span></span>
        </div>
      </div>
    </div>
  );
}
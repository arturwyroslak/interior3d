'use client';

import { useEditorStore } from '@/store/editorStore';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
  MousePointer2,
  Square,
  DoorOpen,
  Frame,
  Ruler,
  Move,
  RotateCw,
  Maximize,
  Scissors,
  Grid3x3,
  Eye,
  Layers,
  Camera,
  Navigation,
  Copy,
  Trash2,
} from 'lucide-react';

const tools2D = [
  { id: 'select', icon: MousePointer2, label: 'Select' },
  { id: 'wall', icon: Square, label: 'Draw Walls' },
  { id: 'door', icon: DoorOpen, label: 'Add Door' },
  { id: 'window', icon: Frame, label: 'Add Window' },
  { id: 'measure', icon: Ruler, label: 'Measure' },
  { id: 'move', icon: Move, label: 'Move' },
  { id: 'rotate', icon: RotateCw, label: 'Rotate' },
  { id: 'scale', icon: Maximize, label: 'Scale' },
];

const tools3D = [
  { id: 'select', icon: MousePointer2, label: 'Select' },
  { id: 'camera', icon: Camera, label: 'Orbit Camera' },
  { id: 'walk', icon: Navigation, label: 'Walk Mode' },
  { id: 'move', icon: Move, label: 'Move Object' },
  { id: 'rotate', icon: RotateCw, label: 'Rotate Object' },
  { id: 'scale', icon: Maximize, label: 'Scale Object' },
  { id: 'duplicate', icon: Copy, label: 'Duplicate' },
  { id: 'delete', icon: Trash2, label: 'Delete' },
];

export function LeftPanel() {
  const { viewMode, activeTool, setActiveTool, showGrid, setShowGrid, snapToGrid, setSnapToGrid } =
    useEditorStore();

  const tools = viewMode === '2d' ? tools2D : tools3D;

  return (
    <TooltipProvider>
      <div className="w-16 bg-card border-r border-border flex flex-col items-center py-4 gap-2">
        {/* Tools */}
        <div className="flex flex-col gap-1">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Tooltip key={tool.id}>
                <TooltipTrigger asChild>
                  <Button
                    variant={activeTool === tool.id ? 'secondary' : 'ghost'}
                    size="icon"
                    onClick={() => setActiveTool(tool.id as any)}
                  >
                    <Icon className="w-5 h-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">{tool.label}</TooltipContent>
              </Tooltip>
            );
          })}
        </div>

        <div className="h-px w-full bg-border my-2" />

        {/* View Options */}
        <div className="flex flex-col gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={showGrid ? 'secondary' : 'ghost'}
                size="icon"
                onClick={() => setShowGrid(!showGrid)}
              >
                <Grid3x3 className="w-5 h-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Toggle Grid</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <Layers className="w-5 h-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Layers</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <Eye className="w-5 h-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Visibility</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
}

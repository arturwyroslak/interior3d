'use client';

import { useEditorStore } from '@/store/editorStore';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
  Save,
  FolderOpen,
  Download,
  Undo,
  Redo,
  Grid3x3,
  Box,
  Image,
  Settings,
  Moon,
  Sun,
  Plus,
} from 'lucide-react';
import { useState } from 'react';

export function TopBar() {
  const { viewMode, setViewMode, projectName, undo, redo } = useEditorStore();
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const handleExport = (format: 'png' | 'jpg' | 'pdf' | 'glb') => {
    console.log(`Exporting as ${format}`);
    // Implement export logic
  };

  return (
    <TooltipProvider>
      <div className="h-16 bg-card border-b border-border flex items-center justify-between px-4">
        {/* Logo & Project Name */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Box className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold">Interior3D</span>
          </div>
          <div className="h-8 w-px bg-border" />
          <input
            type="text"
            value={projectName}
            onChange={(e) => useEditorStore.getState().setProjectName(e.target.value)}
            className="bg-transparent border-none outline-none text-sm font-medium focus:bg-muted px-2 py-1 rounded"
          />
        </div>

        {/* Main Actions */}
        <div className="flex items-center gap-2">
          {/* File Operations */}
          <div className="flex gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Plus className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>New Project</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <FolderOpen className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Open Project</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Save className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Save Project</TooltipContent>
            </Tooltip>
          </div>

          <div className="h-8 w-px bg-border" />

          {/* Export */}
          <div className="flex gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" onClick={() => handleExport('png')}>
                  PNG
                </Button>
              </TooltipTrigger>
              <TooltipContent>Export as PNG</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" onClick={() => handleExport('glb')}>
                  GLB
                </Button>
              </TooltipTrigger>
              <TooltipContent>Export 3D Model</TooltipContent>
            </Tooltip>
          </div>

          <div className="h-8 w-px bg-border" />

          {/* Undo/Redo */}
          <div className="flex gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={undo}>
                  <Undo className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Undo (Ctrl+Z)</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={redo}>
                  <Redo className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Redo (Ctrl+Y)</TooltipContent>
            </Tooltip>
          </div>

          <div className="h-8 w-px bg-border" />

          {/* View Mode Switcher */}
          <div className="flex gap-1 bg-muted rounded-md p-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={viewMode === '2d' ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('2d')}
                >
                  <Grid3x3 className="w-4 h-4 mr-1" />
                  2D
                </Button>
              </TooltipTrigger>
              <TooltipContent>Floor Plan View</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={viewMode === '3d' ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('3d')}
                >
                  <Box className="w-4 h-4 mr-1" />
                  3D
                </Button>
              </TooltipTrigger>
              <TooltipContent>3D View</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={viewMode === 'render' ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('render')}
                >
                  <Image className="w-4 h-4 mr-1" />
                  Render
                </Button>
              </TooltipTrigger>
              <TooltipContent>Realistic Render</TooltipContent>
            </Tooltip>
          </div>

          <div className="h-8 w-px bg-border" />

          {/* Settings & Theme */}
          <div className="flex gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Settings className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Project Settings</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={toggleTheme}>
                  {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>Toggle Theme</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}

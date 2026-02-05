'use client';

import { useEffect } from 'react';
import { useProjectStore } from '@/stores/useProjectStore';

export default function KeyboardShortcuts() {
  const { 
    undo, 
    redo, 
    deleteAsset, 
    selectedIds, 
    setViewMode, 
    setActiveTool,
    saveProject,
    toggleSnapToGrid
  } = useProjectStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if input is focused
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement).tagName)) {
        return;
      }

      // File Operations
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        saveProject();
      }

      // Undo/Redo
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        if (e.shiftKey) {
          e.preventDefault();
          redo();
        } else {
          e.preventDefault();
          undo();
        }
      }

      // View Modes
      if (e.key === '1') setViewMode('2D');
      if (e.key === '2') setViewMode('3D');
      if (e.key === '3') setViewMode('RENDER');

      // Tools
      if (e.key === 'v') setActiveTool('select');
      if (e.key === 'w') setActiveTool('wall');
      if (e.key === 'd') setActiveTool('door');
      if (e.key === 'm') setActiveTool('measure');
      if (e.key === 'r') setActiveTool('rotate');
      if (e.key === 's') setActiveTool('scale');
      if (e.key === 'g') setActiveTool('move'); // Blender style grab

      // Delete
      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (selectedIds.length > 0) {
          // Assuming currently only single selection deletion for simplicity in this snippet
          // Ideally deleteAsset should handle multiple or we iterate
          selectedIds.forEach(id => deleteAsset(id));
        }
      }

      // Grid
      if (e.shiftKey && e.key === 'Tab') {
        e.preventDefault();
        toggleSnapToGrid();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    undo, 
    redo, 
    deleteAsset, 
    selectedIds, 
    setViewMode, 
    setActiveTool, 
    saveProject, 
    toggleSnapToGrid
  ]);

  return null;
}
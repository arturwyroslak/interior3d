'use client';

import { useState } from 'react';
import { useProjectStore } from '@/stores/useProjectStore';
import {
  Save,
  FolderOpen,
  Plus,
  Undo,
  Redo,
  Download,
  Settings,
  Moon,
  Sun,
  Grid3x3,
  Ruler,
  Box,
  Image,
  FileJson,
  Camera,
} from 'lucide-react';

export default function TopBar() {
  const {
    projectName,
    setProjectName,
    viewMode,
    setViewMode,
    darkMode,
    toggleDarkMode,
    snapToGrid,
    toggleSnapToGrid,
    showDimensions,
    undo,
    redo,
    newProject,
    saveProject,
    historyIndex,
    history,
  } = useProjectStore();

  const [showSettings, setShowSettings] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);

  const canUndo = historyIndex >= 0;
  const canRedo = historyIndex < history.length - 1;

  const handleExport = (format: string) => {
    console.log(`Exporting as ${format}`);
    setShowExportMenu(false);
  };

  return (
    <div className="h-16 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-black dark:via-gray-950 dark:to-black border-b border-gray-700/50 backdrop-blur-xl flex items-center justify-between px-4 shadow-2xl relative z-50">
      {/* Logo & Project Name */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/50 group-hover:shadow-blue-500/80 transition-all duration-300 group-hover:scale-110">
            <Box className="w-6 h-6 text-white" strokeWidth={2.5} />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
            Interior3D
          </span>
        </div>

        <div className="h-8 w-px bg-gray-700" />

        <input
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className="bg-gray-800/50 text-gray-100 px-4 py-1.5 rounded-lg border border-gray-700/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-200 min-w-[200px] font-medium"
          placeholder="Project Name"
        />
      </div>

      {/* Main Actions */}
      <div className="flex items-center gap-2">
        {/* File Operations */}
        <div className="flex items-center gap-1 bg-gray-800/50 rounded-lg p-1 border border-gray-700/30">
          <button
            onClick={newProject}
            className="p-2 hover:bg-gray-700 rounded-md transition-all duration-200 text-gray-300 hover:text-white group relative"
            title="New Project"
          >
            <Plus className="w-5 h-5" />
            <span className="tooltip">New Project</span>
          </button>
          <button
            onClick={() => document.getElementById('file-input')?.click()}
            className="p-2 hover:bg-gray-700 rounded-md transition-all duration-200 text-gray-300 hover:text-white"
            title="Open Project"
          >
            <FolderOpen className="w-5 h-5" />
          </button>
          <button
            onClick={saveProject}
            className="p-2 hover:bg-gray-700 rounded-md transition-all duration-200 text-gray-300 hover:text-white"
            title="Save Project"
          >
            <Save className="w-5 h-5" />
          </button>
        </div>

        {/* History */}
        <div className="flex items-center gap-1 bg-gray-800/50 rounded-lg p-1 border border-gray-700/30">
          <button
            onClick={undo}
            disabled={!canUndo}
            className={`p-2 rounded-md transition-all duration-200 ${
              canUndo
                ? 'hover:bg-gray-700 text-gray-300 hover:text-white'
                : 'text-gray-600 cursor-not-allowed'
            }`}
            title="Undo"
          >
            <Undo className="w-5 h-5" />
          </button>
          <button
            onClick={redo}
            disabled={!canRedo}
            className={`p-2 rounded-md transition-all duration-200 ${
              canRedo
                ? 'hover:bg-gray-700 text-gray-300 hover:text-white'
                : 'text-gray-600 cursor-not-allowed'
            }`}
            title="Redo"
          >
            <Redo className="w-5 h-5" />
          </button>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center bg-gray-800/50 rounded-lg p-1 border border-gray-700/30">
          <button
            onClick={() => setViewMode('2D')}
            className={`px-4 py-2 rounded-md transition-all duration-200 font-medium ${
              viewMode === '2D'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50'
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
          >
            2D
          </button>
          <button
            onClick={() => setViewMode('3D')}
            className={`px-4 py-2 rounded-md transition-all duration-200 font-medium ${
              viewMode === '3D'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50'
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
          >
            3D
          </button>
          <button
            onClick={() => setViewMode('RENDER')}
            className={`px-4 py-2 rounded-md transition-all duration-200 font-medium ${
              viewMode === 'RENDER'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/50'
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
          >
            Render
          </button>
        </div>

        {/* Export Menu */}
        <div className="relative">
          <button
            onClick={() => setShowExportMenu(!showExportMenu)}
            className="p-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 rounded-lg transition-all duration-200 text-white shadow-lg shadow-green-500/30 hover:shadow-green-500/50"
            title="Export"
          >
            <Download className="w-5 h-5" />
          </button>
          {showExportMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-2xl overflow-hidden z-50 animate-fade-in">
              <button
                onClick={() => handleExport('PNG')}
                className="w-full px-4 py-2.5 text-left text-gray-300 hover:bg-gray-700 hover:text-white transition-colors flex items-center gap-2"
              >
                <Image className="w-4 h-4" />
                Export as PNG
              </button>
              <button
                onClick={() => handleExport('JPG')}
                className="w-full px-4 py-2.5 text-left text-gray-300 hover:bg-gray-700 hover:text-white transition-colors flex items-center gap-2"
              >
                <Image className="w-4 h-4" />
                Export as JPG
              </button>
              <button
                onClick={() => handleExport('GLB')}
                className="w-full px-4 py-2.5 text-left text-gray-300 hover:bg-gray-700 hover:text-white transition-colors flex items-center gap-2"
              >
                <Box className="w-4 h-4" />
                Export as GLB
              </button>
              <button
                onClick={() => handleExport('PDF')}
                className="w-full px-4 py-2.5 text-left text-gray-300 hover:bg-gray-700 hover:text-white transition-colors flex items-center gap-2"
              >
                <FileJson className="w-4 h-4" />
                Export as PDF
              </button>
            </div>
          )}
        </div>

        {/* Tools Toggle */}
        <div className="flex items-center gap-1 bg-gray-800/50 rounded-lg p-1 border border-gray-700/30">
          <button
            onClick={toggleSnapToGrid}
            className={`p-2 rounded-md transition-all duration-200 ${
              snapToGrid
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
            title="Snap to Grid"
          >
            <Grid3x3 className="w-5 h-5" />
          </button>
          <button
            className="p-2 rounded-md transition-all duration-200 text-gray-400 hover:text-white hover:bg-gray-700"
            title="Show Dimensions"
          >
            <Ruler className="w-5 h-5" />
          </button>
        </div>

        {/* Settings */}
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="p-2 hover:bg-gray-700 rounded-lg transition-all duration-200 text-gray-300 hover:text-white"
          title="Settings"
        >
          <Settings className="w-5 h-5" />
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2 bg-gradient-to-br from-orange-500 to-yellow-500 hover:from-orange-400 hover:to-yellow-400 rounded-lg transition-all duration-200 text-white shadow-lg shadow-orange-500/30"
          title="Toggle Theme"
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>

      <input type="file" id="file-input" className="hidden" accept=".interior3d,.json" />
    </div>
  );
}
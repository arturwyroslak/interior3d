'use client';

import { Camera, ZoomIn, ZoomOut, Maximize, Home } from 'lucide-react';

export default function ViewportControls() {
  return (
    <div className="absolute top-4 right-4 flex flex-col gap-2">
      <button className="w-10 h-10 bg-gray-900/80 hover:bg-gray-800 backdrop-blur-md border border-gray-700 rounded-lg flex items-center justify-center text-gray-300 hover:text-white transition-all duration-200 shadow-lg hover:scale-110">
        <Home className="w-5 h-5" />
      </button>
      <button className="w-10 h-10 bg-gray-900/80 hover:bg-gray-800 backdrop-blur-md border border-gray-700 rounded-lg flex items-center justify-center text-gray-300 hover:text-white transition-all duration-200 shadow-lg hover:scale-110">
        <ZoomIn className="w-5 h-5" />
      </button>
      <button className="w-10 h-10 bg-gray-900/80 hover:bg-gray-800 backdrop-blur-md border border-gray-700 rounded-lg flex items-center justify-center text-gray-300 hover:text-white transition-all duration-200 shadow-lg hover:scale-110">
        <ZoomOut className="w-5 h-5" />
      </button>
      <button className="w-10 h-10 bg-gray-900/80 hover:bg-gray-800 backdrop-blur-md border border-gray-700 rounded-lg flex items-center justify-center text-gray-300 hover:text-white transition-all duration-200 shadow-lg hover:scale-110">
        <Maximize className="w-5 h-5" />
      </button>
      <button className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 backdrop-blur-md border border-blue-500 rounded-lg flex items-center justify-center text-white transition-all duration-200 shadow-lg shadow-blue-500/50 hover:scale-110">
        <Camera className="w-5 h-5" />
      </button>
    </div>
  );
}
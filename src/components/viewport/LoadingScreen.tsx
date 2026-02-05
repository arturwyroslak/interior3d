'use client';

import { Box } from 'lucide-react';

export default function LoadingScreen() {
  return null; // Only show when actually loading
  
  return (
    <div className="absolute inset-0 bg-gray-950 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse shadow-2xl shadow-blue-500/50">
          <Box className="w-10 h-10 text-white" strokeWidth={2.5} />
        </div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text mb-2">
          Loading Scene
        </h2>
        <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden mx-auto">
          <div className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full animate-pulse" style={{ width: '60%' }} />
        </div>
      </div>
    </div>
  );
}
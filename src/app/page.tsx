'use client';

import { useEffect } from 'react';
import { useProjectStore } from '@/stores/useProjectStore';
import TopBar from '@/components/layout/TopBar';
import LeftToolbar from '@/components/layout/LeftToolbar';
import RightPanel from '@/components/layout/RightPanel';
import Viewport from '@/components/viewport/Viewport';
import AssetLibrary from '@/components/library/AssetLibrary';
import StatusBar from '@/components/layout/StatusBar';
import KeyboardShortcuts from '@/components/utils/KeyboardShortcuts';

export default function Home() {
  const darkMode = useProjectStore((state) => state.darkMode);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <main className="h-screen w-screen overflow-hidden bg-gray-100 dark:bg-gray-950">
      <KeyboardShortcuts />
      
      {/* Top Navigation */}
      <TopBar />
      
      {/* Main Layout */}
      <div className="flex h-[calc(100vh-64px)] w-full">
        {/* Left Toolbar */}
        <LeftToolbar />
        
        {/* Center Viewport */}
        <div className="flex-1 relative">
          <Viewport />
        </div>
        
        {/* Right Panel */}
        <RightPanel />
      </div>
      
      {/* Bottom Status Bar */}
      <StatusBar />
      
      {/* Asset Library (Floating) */}
      <AssetLibrary />
    </main>
  );
}
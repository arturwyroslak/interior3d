'use client';

import { useState } from 'react';
import { useProjectStore } from '@/stores/useProjectStore';
import { Search, Sofa, Lamp, Utensils, Bath, Flower2, Box, X, GripHorizontal } from 'lucide-react';

const CATEGORIES = [
  { id: 'furniture', name: 'Furniture', icon: Sofa },
  { id: 'lighting', name: 'Lighting', icon: Lamp },
  { id: 'kitchen', name: 'Kitchen', icon: Utensils },
  { id: 'bathroom', name: 'Bathroom', icon: Bath },
  { id: 'decoration', name: 'Decor', icon: Flower2 },
  { id: 'primitive', name: 'Shapes', icon: Box },
];

const MOCK_ASSETS = {
  furniture: [
    { id: 'sofa_01', name: 'Modern Sofa', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=100&h=100&fit=crop' },
    { id: 'chair_01', name: 'Eames Chair', image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=100&h=100&fit=crop' },
    { id: 'table_01', name: 'Coffee Table', image: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=100&h=100&fit=crop' },
  ],
  lighting: [
    { id: 'lamp_floor', name: 'Floor Lamp', image: 'https://images.unsplash.com/photo-1507473888900-52ea75561061?w=100&h=100&fit=crop' },
    { id: 'lamp_desk', name: 'Desk Lamp', image: 'https://images.unsplash.com/photo-1534349762913-961f695e3877?w=100&h=100&fit=crop' },
  ],
  kitchen: [
    { id: 'kitchen_island', name: 'Kitchen Island', image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=100&h=100&fit=crop' },
  ],
  primitive: [
    { id: 'cube', name: 'Cube', image: 'https://placehold.co/100x100/3b82f6/white?text=Cube' },
    { id: 'sphere', name: 'Sphere', image: 'https://placehold.co/100x100/8b5cf6/white?text=Sphere' },
  ],
};

export default function AssetLibrary() {
  const [isOpen, setIsOpen] = useState(true);
  const [activeCategory, setActiveCategory] = useState('furniture');
  const [searchQuery, setSearchQuery] = useState('');
  const { addAsset } = useProjectStore();

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-12 left-24 bg-gray-900 text-white p-3 rounded-xl shadow-2xl border border-gray-700 hover:scale-105 transition-transform z-50"
      >
        <Box className="w-6 h-6" />
      </button>
    );
  }

  const assets = MOCK_ASSETS[activeCategory as keyof typeof MOCK_ASSETS] || [];
  const filteredAssets = assets.filter(asset => 
    asset.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDragStart = (e: React.DragEvent, asset: any) => {
    e.dataTransfer.setData('asset', JSON.stringify(asset));
  };

  const handleAddAsset = (assetTemplate: any) => {
    addAsset({
      id: `${assetTemplate.id}-${Date.now()}`,
      type: activeCategory as any,
      name: assetTemplate.name,
      position: [0, 0.5, 0],
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
      modelPath: assetTemplate.id,
    });
  };

  return (
    <div className="fixed bottom-12 left-24 w-[600px] bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-gray-700/50 bg-gray-800/50 cursor-move">
        <div className="flex items-center gap-2 text-gray-200">
          <GripHorizontal className="w-5 h-5 text-gray-500" />
          <span className="font-semibold">Asset Library</span>
        </div>
        <button 
          onClick={() => setIsOpen(false)}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex h-64">
        {/* Categories Sidebar */}
        <div className="w-40 bg-gray-950/50 border-r border-gray-700/50 flex flex-col gap-1 p-2 overflow-y-auto">
          {CATEGORIES.map(cat => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
                  activeCategory === cat.id
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col bg-gray-900/30">
          {/* Search Bar */}
          <div className="p-3 border-b border-gray-700/50">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search assets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-950/50 border border-gray-700 rounded-lg pl-9 pr-3 py-1.5 text-sm text-gray-200 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          {/* Grid */}
          <div className="flex-1 overflow-y-auto p-3 grid grid-cols-4 gap-3 content-start">
            {filteredAssets.map(asset => (
              <div
                key={asset.id}
                draggable
                onDragStart={(e) => handleDragStart(e, asset)}
                onClick={() => handleAddAsset(asset)}
                className="group relative aspect-square bg-gray-800 rounded-xl border border-gray-700 cursor-pointer hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/20 transition-all overflow-hidden"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={asset.image} 
                  alt={asset.name}
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-2 pt-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-xs font-medium text-white truncate text-center">{asset.name}</p>
                </div>
              </div>
            ))}
            {filteredAssets.length === 0 && (
              <div className="col-span-4 py-8 text-center text-gray-500 text-sm">
                No assets found in this category.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
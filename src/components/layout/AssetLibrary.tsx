'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Armchair, Lightbulb, Home, TreePine, Package } from 'lucide-react';
import { useEditorStore } from '@/store/editorStore';
import * as THREE from 'three';

const assets = {
  furniture: [
    { id: 'sofa-1', name: 'Modern Sofa', category: 'furniture' },
    { id: 'table-1', name: 'Dining Table', category: 'furniture' },
    { id: 'chair-1', name: 'Office Chair', category: 'furniture' },
    { id: 'bed-1', name: 'King Bed', category: 'furniture' },
    { id: 'desk-1', name: 'Work Desk', category: 'furniture' },
    { id: 'shelf-1', name: 'Bookshelf', category: 'furniture' },
  ],
  lighting: [
    { id: 'lamp-1', name: 'Floor Lamp', category: 'lighting' },
    { id: 'pendant-1', name: 'Pendant Light', category: 'lighting' },
    { id: 'chandelier-1', name: 'Chandelier', category: 'lighting' },
    { id: 'spot-1', name: 'Spot Light', category: 'lighting' },
  ],
  decoration: [
    { id: 'plant-1', name: 'Monstera', category: 'decoration' },
    { id: 'vase-1', name: 'Ceramic Vase', category: 'decoration' },
    { id: 'painting-1', name: 'Abstract Art', category: 'decoration' },
    { id: 'rug-1', name: 'Persian Rug', category: 'decoration' },
  ],
};

export function AssetLibrary() {
  const [searchQuery, setSearchQuery] = useState('');
  const { addObject } = useEditorStore();

  const handleAddAsset = (asset: any) => {
    addObject({
      id: `${asset.id}-${Date.now()}`,
      type: asset.category === 'lighting' ? 'light' : 'furniture',
      category: asset.category,
      name: asset.name,
      position: new THREE.Vector3(0, 0, 0),
      rotation: new THREE.Euler(0, 0, 0),
      scale: new THREE.Vector3(1, 1, 1),
    });
  };

  return (
    <div className="w-80 bg-card border-l border-border flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h3 className="font-semibold text-sm text-muted-foreground">ASSET LIBRARY</h3>
        
        {/* Search */}
        <div className="relative mt-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search assets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-muted border border-border rounded-md pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Content */}
      <Tabs defaultValue="furniture" className="flex-1 flex flex-col">
        <TabsList className="w-full grid grid-cols-3 rounded-none border-b border-border">
          <TabsTrigger value="furniture" className="gap-2">
            <Armchair className="w-4 h-4" />
            <span className="hidden sm:inline">Furniture</span>
          </TabsTrigger>
          <TabsTrigger value="lighting" className="gap-2">
            <Lightbulb className="w-4 h-4" />
            <span className="hidden sm:inline">Lights</span>
          </TabsTrigger>
          <TabsTrigger value="decoration" className="gap-2">
            <TreePine className="w-4 h-4" />
            <span className="hidden sm:inline">Decor</span>
          </TabsTrigger>
        </TabsList>

        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {(['furniture', 'lighting', 'decoration'] as const).map((category) => (
            <TabsContent key={category} value={category} className="p-4 mt-0">
              <div className="grid grid-cols-2 gap-3">
                {assets[category]
                  .filter((asset) =>
                    asset.name.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((asset) => (
                    <button
                      key={asset.id}
                      onClick={() => handleAddAsset(asset)}
                      className="group relative aspect-square bg-muted rounded-lg border border-border hover:border-primary transition-all overflow-hidden"
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Package className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                        <p className="text-xs font-medium text-white">{asset.name}</p>
                      </div>
                    </button>
                  ))}
              </div>
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
}

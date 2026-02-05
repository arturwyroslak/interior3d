import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { Vector3 } from 'three';

export type ViewMode = '2D' | '3D' | 'RENDER';
export type Tool = 'select' | 'wall' | 'door' | 'window' | 'measure' | 'move' | 'rotate' | 'scale' | 'delete';

interface Wall {
  id: string;
  start: [number, number];
  end: [number, number];
  thickness: number;
  height: number;
  material: string;
}

interface Room {
  id: string;
  walls: string[];
  floor: string;
  ceiling: string;
  area: number;
}

interface Asset {
  id: string;
  type: 'furniture' | 'lighting' | 'decoration' | 'kitchen' | 'bathroom' | 'plant';
  name: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  modelPath: string;
  material?: any;
}

interface ProjectState {
  // Project Info
  projectName: string;
  units: 'metric' | 'imperial';
  wallHeight: number;
  
  // View State
  viewMode: ViewMode;
  activeTool: Tool;
  snapToGrid: boolean;
  gridSize: number;
  showDimensions: boolean;
  darkMode: boolean;
  
  // Project Data
  walls: Wall[];
  rooms: Room[];
  assets: Asset[];
  selectedIds: string[];
  
  // Camera
  cameraPosition: [number, number, number];
  cameraTarget: [number, number, number];
  
  // History
  history: any[];
  historyIndex: number;
  
  // Actions
  setProjectName: (name: string) => void;
  setViewMode: (mode: ViewMode) => void;
  setActiveTool: (tool: Tool) => void;
  toggleSnapToGrid: () => void;
  setGridSize: (size: number) => void;
  toggleDarkMode: () => void;
  
  addWall: (wall: Wall) => void;
  updateWall: (id: string, updates: Partial<Wall>) => void;
  deleteWall: (id: string) => void;
  
  addAsset: (asset: Asset) => void;
  updateAsset: (id: string, updates: Partial<Asset>) => void;
  deleteAsset: (id: string) => void;
  duplicateAsset: (id: string) => void;
  
  setSelected: (ids: string[]) => void;
  clearSelection: () => void;
  
  undo: () => void;
  redo: () => void;
  
  newProject: () => void;
  saveProject: () => void;
  loadProject: (data: any) => void;
}

const initialState = {
  projectName: 'Untitled Project',
  units: 'metric' as const,
  wallHeight: 2.8,
  viewMode: '2D' as ViewMode,
  activeTool: 'select' as Tool,
  snapToGrid: true,
  gridSize: 0.5,
  showDimensions: true,
  darkMode: true,
  walls: [],
  rooms: [],
  assets: [],
  selectedIds: [],
  cameraPosition: [10, 10, 10] as [number, number, number],
  cameraTarget: [0, 0, 0] as [number, number, number],
  history: [],
  historyIndex: -1,
};

export const useProjectStore = create<ProjectState>()(devtools(persist((set, get) => ({
  ...initialState,
  
  setProjectName: (name) => set({ projectName: name }),
  setViewMode: (mode) => set({ viewMode: mode }),
  setActiveTool: (tool) => set({ activeTool: tool }),
  toggleSnapToGrid: () => set((state) => ({ snapToGrid: !state.snapToGrid })),
  setGridSize: (size) => set({ gridSize: size }),
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  
  addWall: (wall) => set((state) => ({
    walls: [...state.walls, wall],
    history: [...state.history.slice(0, state.historyIndex + 1), { type: 'addWall', wall }],
    historyIndex: state.historyIndex + 1,
  })),
  
  updateWall: (id, updates) => set((state) => ({
    walls: state.walls.map(w => w.id === id ? { ...w, ...updates } : w),
  })),
  
  deleteWall: (id) => set((state) => ({
    walls: state.walls.filter(w => w.id !== id),
    history: [...state.history.slice(0, state.historyIndex + 1), { type: 'deleteWall', id }],
    historyIndex: state.historyIndex + 1,
  })),
  
  addAsset: (asset) => set((state) => ({
    assets: [...state.assets, asset],
    history: [...state.history.slice(0, state.historyIndex + 1), { type: 'addAsset', asset }],
    historyIndex: state.historyIndex + 1,
  })),
  
  updateAsset: (id, updates) => set((state) => ({
    assets: state.assets.map(a => a.id === id ? { ...a, ...updates } : a),
  })),
  
  deleteAsset: (id) => set((state) => ({
    assets: state.assets.filter(a => a.id !== id),
    selectedIds: state.selectedIds.filter(sid => sid !== id),
  })),
  
  duplicateAsset: (id) => set((state) => {
    const asset = state.assets.find(a => a.id === id);
    if (!asset) return state;
    const newAsset = { ...asset, id: `${asset.id}-copy-${Date.now()}`, position: [asset.position[0] + 1, asset.position[1], asset.position[2]] as [number, number, number] };
    return { assets: [...state.assets, newAsset] };
  }),
  
  setSelected: (ids) => set({ selectedIds: ids }),
  clearSelection: () => set({ selectedIds: [] }),
  
  undo: () => set((state) => {
    if (state.historyIndex < 0) return state;
    const action = state.history[state.historyIndex];
    // Implement undo logic based on action type
    return { historyIndex: state.historyIndex - 1 };
  }),
  
  redo: () => set((state) => {
    if (state.historyIndex >= state.history.length - 1) return state;
    return { historyIndex: state.historyIndex + 1 };
  }),
  
  newProject: () => set(initialState),
  
  saveProject: () => {
    const state = get();
    const projectData = {
      projectName: state.projectName,
      walls: state.walls,
      rooms: state.rooms,
      assets: state.assets,
      settings: {
        units: state.units,
        wallHeight: state.wallHeight,
        gridSize: state.gridSize,
      },
    };
    const blob = new Blob([JSON.stringify(projectData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${state.projectName}.interior3d`;
    a.click();
    URL.revokeObjectURL(url);
  },
  
  loadProject: (data) => set({
    projectName: data.projectName,
    walls: data.walls,
    rooms: data.rooms,
    assets: data.assets,
    units: data.settings?.units || 'metric',
    wallHeight: data.settings?.wallHeight || 2.8,
    gridSize: data.settings?.gridSize || 0.5,
  }),
}), {
  name: 'interior3d-storage',
})));
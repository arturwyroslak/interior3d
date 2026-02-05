import { create } from 'zustand';
import * as THREE from 'three';

export type ViewMode = '2d' | '3d' | 'render';
export type Tool = 
  | 'select'
  | 'wall'
  | 'door' 
  | 'window'
  | 'measure'
  | 'move'
  | 'rotate'
  | 'scale'
  | 'delete';

export interface Wall {
  id: string;
  start: THREE.Vector2;
  end: THREE.Vector2;
  thickness: number;
  height: number;
}

export interface Room {
  id: string;
  name: string;
  walls: string[];
  floor: THREE.Vector2[];
  height: number;
}

export interface SceneObject {
  id: string;
  type: 'furniture' | 'light' | 'decoration';
  category: string;
  name: string;
  position: THREE.Vector3;
  rotation: THREE.Euler;
  scale: THREE.Vector3;
  modelUrl?: string;
}

interface EditorState {
  // View
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  
  // Tools
  activeTool: Tool;
  setActiveTool: (tool: Tool) => void;
  
  // Scene data
  walls: Wall[];
  rooms: Room[];
  objects: SceneObject[];
  
  // Selection
  selectedObjectId: string | null;
  setSelectedObject: (id: string | null) => void;
  
  // Actions
  addWall: (wall: Wall) => void;
  removeWall: (id: string) => void;
  addObject: (obj: SceneObject) => void;
  removeObject: (id: string) => void;
  updateObject: (id: string, updates: Partial<SceneObject>) => void;
  
  // Project
  projectName: string;
  setProjectName: (name: string) => void;
  
  // Settings
  gridSize: number;
  snapToGrid: boolean;
  showGrid: boolean;
  units: 'metric' | 'imperial';
  setGridSize: (size: number) => void;
  setSnapToGrid: (snap: boolean) => void;
  setShowGrid: (show: boolean) => void;
  setUnits: (units: 'metric' | 'imperial') => void;
  
  // History
  history: any[];
  historyIndex: number;
  undo: () => void;
  redo: () => void;
}

export const useEditorStore = create<EditorState>((set, get) => ({
  // View
  viewMode: '3d',
  setViewMode: (mode) => set({ viewMode: mode }),
  
  // Tools
  activeTool: 'select',
  setActiveTool: (tool) => set({ activeTool: tool }),
  
  // Scene data
  walls: [],
  rooms: [],
  objects: [],
  
  // Selection
  selectedObjectId: null,
  setSelectedObject: (id) => set({ selectedObjectId: id }),
  
  // Actions
  addWall: (wall) => set((state) => ({ walls: [...state.walls, wall] })),
  removeWall: (id) => set((state) => ({ walls: state.walls.filter(w => w.id !== id) })),
  addObject: (obj) => set((state) => ({ objects: [...state.objects, obj] })),
  removeObject: (id) => set((state) => ({ objects: state.objects.filter(o => o.id !== id) })),
  updateObject: (id, updates) => set((state) => ({
    objects: state.objects.map(obj => 
      obj.id === id ? { ...obj, ...updates } : obj
    )
  })),
  
  // Project
  projectName: 'Untitled Project',
  setProjectName: (name) => set({ projectName: name }),
  
  // Settings
  gridSize: 1,
  snapToGrid: true,
  showGrid: true,
  units: 'metric',
  setGridSize: (size) => set({ gridSize: size }),
  setSnapToGrid: (snap) => set({ snapToGrid: snap }),
  setShowGrid: (show) => set({ showGrid: show }),
  setUnits: (units) => set({ units }),
  
  // History
  history: [],
  historyIndex: -1,
  undo: () => {
    const { historyIndex, history } = get();
    if (historyIndex > 0) {
      // Implement undo logic
      set({ historyIndex: historyIndex - 1 });
    }
  },
  redo: () => {
    const { historyIndex, history } = get();
    if (historyIndex < history.length - 1) {
      // Implement redo logic
      set({ historyIndex: historyIndex + 1 });
    }
  },
}));

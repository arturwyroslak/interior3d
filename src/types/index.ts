import { Vector3 } from 'three';

export interface Material {
  id: string;
  name: string;
  type: 'standard' | 'physical' | 'basic';
  color: string;
  metalness?: number;
  roughness?: number;
  emissive?: string;
  emissiveIntensity?: number;
  opacity?: number;
  textureMap?: string;
  normalMap?: string;
  roughnessMap?: string;
  metalnessMap?: string;
}

export interface Transform {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
}

export interface BoundingBox {
  min: Vector3;
  max: Vector3;
  center: Vector3;
  size: Vector3;
}

export interface AssetCategory {
  id: string;
  name: string;
  icon: string;
  items: AssetItem[];
}

export interface AssetItem {
  id: string;
  name: string;
  category: string;
  thumbnail: string;
  modelPath: string;
  dimensions: [number, number, number];
  tags: string[];
  favorite?: boolean;
}

export interface Door {
  id: string;
  wallId: string;
  position: number; // 0-1 along wall
  width: number;
  height: number;
  type: 'single' | 'double' | 'sliding' | 'folding';
  openDirection: 'left' | 'right' | 'in' | 'out';
  material: Material;
}

export interface Window {
  id: string;
  wallId: string;
  position: number;
  width: number;
  height: number;
  sillHeight: number;
  type: 'fixed' | 'casement' | 'sliding' | 'awning';
  material: Material;
}

export interface Light {
  id: string;
  type: 'point' | 'spot' | 'directional' | 'area' | 'ambient';
  position: [number, number, number];
  intensity: number;
  color: string;
  castShadow: boolean;
  distance?: number;
  angle?: number;
  penumbra?: number;
}

export interface Layer {
  id: string;
  name: string;
  visible: boolean;
  locked: boolean;
  color: string;
  objects: string[];
}

export interface Measurement {
  id: string;
  start: [number, number, number];
  end: [number, number, number];
  distance: number;
  unit: 'mm' | 'cm' | 'm' | 'in' | 'ft';
}

export interface CameraPreset {
  id: string;
  name: string;
  position: [number, number, number];
  target: [number, number, number];
  fov: number;
}

export interface KeyboardShortcut {
  key: string;
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  action: string;
  description: string;
}
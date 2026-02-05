'use client';

import { useRef, useState, useEffect } from 'react';
import { useProjectStore } from '@/stores/useProjectStore';

export default function FloorplanEditor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { walls, activeTool, snapToGrid, gridSize, addWall } = useProjectStore();
  const [startPoint, setStartPoint] = useState<[number, number] | null>(null);
  const [mousePos, setMousePos] = useState<[number, number] | null>(null);

  // Conversion constants
  const ZOOM = 50; // pixels per meter
  const OFFSET_X = 400;
  const OFFSET_Y = 400;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Reset layout
    canvas.width = canvas.parentElement?.clientWidth || 800;
    canvas.height = canvas.parentElement?.clientHeight || 600;

    // Background
    ctx.fillStyle = '#0f172a'; // slate-900
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Grid
    drawGrid(ctx, canvas.width, canvas.height, gridSize * ZOOM);

    // Existing Walls
    walls.forEach(wall => {
      drawWall(ctx, wall.start, wall.end, wall.thickness * ZOOM, '#94a3b8', '#e2e8f0');
    });

    // Drawing Draft Wall
    if (activeTool === 'wall' && startPoint && mousePos) {
      drawWall(ctx, 
        [(startPoint[0] - OFFSET_X)/ZOOM, (startPoint[1] - OFFSET_Y)/ZOOM], 
        [(mousePos[0] - OFFSET_X)/ZOOM, (mousePos[1] - OFFSET_Y)/ZOOM], 
        0.2 * ZOOM, 
        'rgba(59, 130, 246, 0.5)', 
        '#60a5fa'
      );
      
      // Draw dimension line
      drawDimension(ctx, startPoint, mousePos);
    }
    
    // Cursor highlight
    if (mousePos) {
       ctx.beginPath();
       ctx.arc(mousePos[0], mousePos[1], 5, 0, Math.PI * 2);
       ctx.fillStyle = '#3b82f6';
       ctx.fill();
    }

  }, [walls, activeTool, snapToGrid, gridSize, startPoint, mousePos]);

  const drawGrid = (ctx: CanvasRenderingContext2D, w: number, h: number, step: number) => {
    ctx.beginPath();
    ctx.strokeStyle = '#1e293b'; // slate-800
    ctx.lineWidth = 1;
    for (let x = (OFFSET_X % step); x < w; x += step) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
    }
    for (let y = (OFFSET_Y % step); y < h; y += step) {
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
    }
    ctx.stroke();
  };

  const drawWall = (ctx: CanvasRenderingContext2D, start: number[], end: number[], width: number, fill: string, stroke: string) => {
    const x1 = start[0] * ZOOM + OFFSET_X;
    const y1 = start[1] * ZOOM + OFFSET_Y;
    const x2 = end[0] * ZOOM + OFFSET_X;
    const y2 = end[1] * ZOOM + OFFSET_Y;
    
    ctx.beginPath();
    ctx.strokeStyle = stroke;
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    
    // Draw joints
    ctx.fillStyle = stroke;
    ctx.beginPath();
    ctx.arc(x1, y1, width/2, 0, Math.PI*2);
    ctx.arc(x2, y2, width/2, 0, Math.PI*2);
    ctx.fill();
  };

  const drawDimension = (ctx: CanvasRenderingContext2D, p1: number[], p2: number[]) => {
    const distPx = Math.hypot(p2[0] - p1[0], p2[1] - p1[1]);
    const distM = (distPx / ZOOM).toFixed(2);
    
    const midX = (p1[0] + p2[0]) / 2;
    const midY = (p1[1] + p2[1]) / 2;
    
    ctx.fillStyle = '#ffffff';
    ctx.font = '12px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    const padding = 4;
    const textWidth = ctx.measureText(distM + 'm').width;
    
    ctx.fillStyle = 'rgba(0,0,0,0.7)';
    ctx.fillRect(midX - textWidth/2 - padding, midY - 10, textWidth + padding*2, 20);
    
    ctx.fillStyle = '#ffffff';
    ctx.fillText(distM + 'm', midX, midY);
  };

  const getSnappedPos = (e: React.MouseEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    if (!snapToGrid) return [x, y];
    
    const step = gridSize * ZOOM;
    const sx = Math.round((x - OFFSET_X) / step) * step + OFFSET_X;
    const sy = Math.round((y - OFFSET_Y) / step) * step + OFFSET_Y;
    return [sx, sy];
  };

  return (
    <div className="w-full h-full bg-slate-950 relative cursor-crosshair">
      <canvas
        ref={canvasRef}
        onMouseDown={(e) => {
          if (activeTool !== 'wall') return;
          const pos = getSnappedPos(e);
          if (!startPoint) {
            setStartPoint(pos as [number, number]);
          } else {
            addWall({
              id: `wall-${Date.now()}`,
              start: [(startPoint[0] - OFFSET_X)/ZOOM, (startPoint[1] - OFFSET_Y)/ZOOM],
              end: [(pos[0] - OFFSET_X)/ZOOM, (pos[1] - OFFSET_Y)/ZOOM],
              thickness: 0.2,
              height: 2.8,
              material: 'default'
            });
            setStartPoint(pos as [number, number]); // Chain walls
          }
        }}
        onMouseMove={(e) => {
           setMousePos(getSnappedPos(e) as [number, number]);
        }}
        className="block"
      />
      
      {/* HUD */}
      <div className="absolute top-4 left-4 pointer-events-none">
         <div className="bg-black/50 backdrop-blur-md text-white px-3 py-2 rounded-lg text-sm border border-white/10">
            <span className="text-blue-400 font-bold">2D EDITOR</span>
            <div className="text-xs text-gray-400 mt-1">
               {activeTool === 'wall' ? 'Click to place wall nodes' : 'Select Wall Tool (W) to draw'}
            </div>
         </div>
      </div>
    </div>
  );
}
'use client';

import { useRef, useState, useEffect } from 'react';
import { useProjectStore } from '@/stores/useProjectStore';

export default function FloorplanEditor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { walls, activeTool, snapToGrid, gridSize, addWall } = useProjectStore();
  const [startPoint, setStartPoint] = useState<[number, number] | null>(null);
  const [currentPoint, setCurrentPoint] = useState<[number, number] | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Clear canvas
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    if (snapToGrid) {
      drawGrid(ctx, canvas.width, canvas.height, gridSize * 50);
    }

    // Draw walls
    walls.forEach((wall) => {
      drawWall(ctx, wall.start, wall.end, wall.thickness * 50);
    });

    // Draw current wall being drawn
    if (startPoint && currentPoint && activeTool === 'wall') {
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 10;
      ctx.setLineDash([10, 5]);
      ctx.beginPath();
      ctx.moveTo(startPoint[0], startPoint[1]);
      ctx.lineTo(currentPoint[0], currentPoint[1]);
      ctx.stroke();
      ctx.setLineDash([]);
    }
  }, [walls, snapToGrid, gridSize, startPoint, currentPoint, activeTool]);

  const drawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number, size: number) => {
    ctx.strokeStyle = 'rgba(99, 102, 241, 0.1)';
    ctx.lineWidth = 1;

    // Vertical lines
    for (let x = 0; x <= width; x += size) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    // Horizontal lines
    for (let y = 0; y <= height; y += size) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Major grid lines
    ctx.strokeStyle = 'rgba(139, 92, 246, 0.2)';
    ctx.lineWidth = 2;

    for (let x = 0; x <= width; x += size * 5) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    for (let y = 0; y <= height; y += size * 5) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  };

  const drawWall = (
    ctx: CanvasRenderingContext2D,
    start: [number, number],
    end: [number, number],
    thickness: number
  ) => {
    ctx.strokeStyle = '#f1f5f9';
    ctx.fillStyle = '#475569';
    ctx.lineWidth = thickness;
    ctx.lineCap = 'square';

    ctx.beginPath();
    ctx.moveTo(start[0] * 50 + 400, start[1] * 50 + 400);
    ctx.lineTo(end[0] * 50 + 400, end[1] * 50 + 400);
    ctx.stroke();
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (activeTool !== 'wall') return;

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const snappedPoint = snapToGrid
      ? [Math.round(x / (gridSize * 50)) * (gridSize * 50), Math.round(y / (gridSize * 50)) * (gridSize * 50)]
      : [x, y];

    if (!startPoint) {
      setStartPoint(snappedPoint as [number, number]);
    } else {
      // Create wall
      addWall({
        id: `wall-${Date.now()}`,
        start: [(startPoint[0] - 400) / 50, (startPoint[1] - 400) / 50],
        end: [(snappedPoint[0] - 400) / 50, (snappedPoint[1] - 400) / 50],
        thickness: 0.2,
        height: 2.8,
        material: 'default',
      });
      setStartPoint(null);
      setCurrentPoint(null);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!startPoint || activeTool !== 'wall') return;

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const snappedPoint = snapToGrid
      ? [Math.round(x / (gridSize * 50)) * (gridSize * 50), Math.round(y / (gridSize * 50)) * (gridSize * 50)]
      : [x, y];

    setCurrentPoint(snappedPoint as [number, number]);
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-crosshair"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
      />

      {/* Coordinates Display */}
      {currentPoint && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-gray-900/90 backdrop-blur-md border border-gray-700 rounded-lg px-4 py-2 text-sm text-gray-300 font-mono">
          X: {((currentPoint[0] - 400) / 50).toFixed(2)}m | Y: {((currentPoint[1] - 400) / 50).toFixed(2)}m
        </div>
      )}

      {/* Instructions */}
      {activeTool === 'wall' && !startPoint && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-blue-600/90 backdrop-blur-md rounded-lg px-4 py-2 text-sm text-white font-medium shadow-lg">
          Click to start drawing wall
        </div>
      )}

      {activeTool === 'wall' && startPoint && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-purple-600/90 backdrop-blur-md rounded-lg px-4 py-2 text-sm text-white font-medium shadow-lg">
          Click to finish wall | ESC to cancel
        </div>
      )}
    </div>
  );
}
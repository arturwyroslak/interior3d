'use client';

import { useEditorStore } from '@/store/editorStore';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Palette, Lightbulb, Maximize2, RotateCw } from 'lucide-react';

export function RightPanel() {
  const { selectedObjectId, objects, updateObject } = useEditorStore();

  const selectedObject = objects.find((obj) => obj.id === selectedObjectId);

  if (!selectedObject) {
    return (
      <div className="w-80 bg-card border-l border-border p-4">
        <div className="text-center text-muted-foreground mt-8">
          <p className="text-sm">Select an object to edit properties</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 bg-card border-l border-border flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h3 className="font-semibold text-sm text-muted-foreground">INSPECTOR</h3>
        <h2 className="text-lg font-bold mt-1">{selectedObject.name}</h2>
        <p className="text-xs text-muted-foreground mt-0.5">{selectedObject.type}</p>
      </div>

      {/* Properties */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <Tabs defaultValue="transform" className="w-full">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="transform">
              <Maximize2 className="w-4 h-4" />
            </TabsTrigger>
            <TabsTrigger value="material">
              <Palette className="w-4 h-4" />
            </TabsTrigger>
            <TabsTrigger value="lighting">
              <Lightbulb className="w-4 h-4" />
            </TabsTrigger>
          </TabsList>

          <TabsContent value="transform" className="p-4 space-y-4">
            {/* Position */}
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-2 block">
                POSITION
              </label>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs w-4">X</span>
                  <Slider
                    value={[selectedObject.position.x]}
                    onValueChange={([x]) =>
                      updateObject(selectedObject.id, {
                        position: selectedObject.position.clone().setX(x),
                      })
                    }
                    min={-20}
                    max={20}
                    step={0.1}
                    className="flex-1"
                  />
                  <input
                    type="number"
                    value={selectedObject.position.x.toFixed(2)}
                    className="w-16 bg-muted border border-border rounded px-2 py-1 text-xs"
                    readOnly
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs w-4">Y</span>
                  <Slider
                    value={[selectedObject.position.y]}
                    onValueChange={([y]) =>
                      updateObject(selectedObject.id, {
                        position: selectedObject.position.clone().setY(y),
                      })
                    }
                    min={-20}
                    max={20}
                    step={0.1}
                    className="flex-1"
                  />
                  <input
                    type="number"
                    value={selectedObject.position.y.toFixed(2)}
                    className="w-16 bg-muted border border-border rounded px-2 py-1 text-xs"
                    readOnly
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs w-4">Z</span>
                  <Slider
                    value={[selectedObject.position.z]}
                    onValueChange={([z]) =>
                      updateObject(selectedObject.id, {
                        position: selectedObject.position.clone().setZ(z),
                      })
                    }
                    min={-20}
                    max={20}
                    step={0.1}
                    className="flex-1"
                  />
                  <input
                    type="number"
                    value={selectedObject.position.z.toFixed(2)}
                    className="w-16 bg-muted border border-border rounded px-2 py-1 text-xs"
                    readOnly
                  />
                </div>
              </div>
            </div>

            {/* Rotation */}
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-2 block">
                ROTATION
              </label>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs w-4">X</span>
                  <Slider
                    value={[(selectedObject.rotation.x * 180) / Math.PI]}
                    onValueChange={([x]) => {
                      const newRotation = selectedObject.rotation.clone();
                      newRotation.x = (x * Math.PI) / 180;
                      updateObject(selectedObject.id, { rotation: newRotation });
                    }}
                    min={0}
                    max={360}
                    step={1}
                    className="flex-1"
                  />
                  <input
                    type="number"
                    value={((selectedObject.rotation.x * 180) / Math.PI).toFixed(0)}
                    className="w-16 bg-muted border border-border rounded px-2 py-1 text-xs"
                    readOnly
                  />
                </div>
              </div>
            </div>

            {/* Scale */}
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-2 block">
                SCALE
              </label>
              <div className="flex items-center gap-2">
                <Slider
                  value={[selectedObject.scale.x]}
                  onValueChange={([scale]) =>
                    updateObject(selectedObject.id, {
                      scale: selectedObject.scale.clone().setScalar(scale),
                    })
                  }
                  min={0.1}
                  max={5}
                  step={0.1}
                  className="flex-1"
                />
                <input
                  type="number"
                  value={selectedObject.scale.x.toFixed(2)}
                  className="w-16 bg-muted border border-border rounded px-2 py-1 text-xs"
                  readOnly
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="material" className="p-4 space-y-4">
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-2 block">
                COLOR
              </label>
              <input
                type="color"
                className="w-full h-10 rounded border border-border"
                defaultValue="#3b82f6"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-2 block">
                METALNESS
              </label>
              <Slider defaultValue={[0.5]} min={0} max={1} step={0.01} />
            </div>

            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-2 block">
                ROUGHNESS
              </label>
              <Slider defaultValue={[0.5]} min={0} max={1} step={0.01} />
            </div>

            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-2 block">
                OPACITY
              </label>
              <Slider defaultValue={[1]} min={0} max={1} step={0.01} />
            </div>
          </TabsContent>

          <TabsContent value="lighting" className="p-4 space-y-4">
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-2 block">
                EMISSION
              </label>
              <Slider defaultValue={[0]} min={0} max={10} step={0.1} />
            </div>

            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-2 block">
                EMISSION COLOR
              </label>
              <input
                type="color"
                className="w-full h-10 rounded border border-border"
                defaultValue="#ffffff"
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Actions */}
      <div className="p-4 border-t border-border">
        <Button
          variant="destructive"
          className="w-full"
          onClick={() => useEditorStore.getState().removeObject(selectedObject.id)}
        >
          Delete Object
        </Button>
      </div>
    </div>
  );
}

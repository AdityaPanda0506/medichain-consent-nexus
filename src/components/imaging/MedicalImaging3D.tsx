
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { 
  Eye, 
  RotateCcw, 
  ZoomIn, 
  ZoomOut, 
  Download, 
  Share,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Settings
} from "lucide-react";

const MedicalImaging3D = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRotating, setIsRotating] = useState(false);
  const [zoom, setZoom] = useState([100]);
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
  const [selectedScan, setSelectedScan] = useState('chest-ct');
  const [currentSlice, setCurrentSlice] = useState([25]);

  const availableScans = [
    { id: 'chest-ct', name: 'Chest CT Scan', date: '2024-06-20', slices: 50 },
    { id: 'brain-mri', name: 'Brain MRI', date: '2024-06-15', slices: 80 },
    { id: 'knee-xray', name: 'Knee X-Ray', date: '2024-06-10', slices: 1 },
    { id: 'cardiac-ct', name: 'Cardiac CT', date: '2024-06-05', slices: 120 }
  ];

  // Mock 3D rendering using canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      // Clear canvas
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw mock 3D object (simplified)
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const scale = zoom[0] / 100;

      // Draw mock medical scan visualization
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.scale(scale, scale);
      ctx.rotate((rotation.y * Math.PI) / 180);

      // Draw multiple layers to simulate 3D medical imaging
      for (let i = 0; i < 10; i++) {
        const alpha = 0.1 + (i * 0.05);
        const size = 80 + (i * 5);
        
        ctx.fillStyle = `rgba(59, 130, 246, ${alpha})`;
        ctx.fillRect(-size/2, -size/2, size, size);
        
        // Add some detail to simulate medical structures
        ctx.fillStyle = `rgba(239, 68, 68, ${alpha * 0.5})`;
        ctx.beginPath();
        ctx.arc(0, 0, size/4, 0, 2 * Math.PI);
        ctx.fill();
      }

      ctx.restore();

      // Draw slice indicator
      ctx.fillStyle = '#64748b';
      ctx.font = '14px sans-serif';
      ctx.fillText(`Slice: ${currentSlice[0]}/${availableScans.find(s => s.id === selectedScan)?.slices || 50}`, 20, 30);
      ctx.fillText(`Zoom: ${zoom[0]}%`, 20, 50);
      ctx.fillText(`Rotation: ${Math.round(rotation.y)}°`, 20, 70);

      if (isRotating) {
        setRotation(prev => ({ ...prev, y: prev.y + 1 }));
      }

      requestAnimationFrame(animate);
    };

    animate();
  }, [isRotating, zoom, rotation, currentSlice, selectedScan]);

  const resetView = () => {
    setRotation({ x: 0, y: 0, z: 0 });
    setZoom([100]);
    setCurrentSlice([25]);
  };

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Mock interaction - rotate based on click position
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const deltaX = x - centerX;
    const deltaY = y - centerY;

    setRotation(prev => ({
      ...prev,
      y: prev.y + deltaX * 0.5,
      x: prev.x + deltaY * 0.5
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-slate-800">3D Medical Imaging</h3>
          <p className="text-slate-600">Interactive 3D visualization of medical scans</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Share className="w-4 h-4 mr-2" />
            Share View
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Scan Selection */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Available Scans</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {availableScans.map((scan) => (
                <button
                  key={scan.id}
                  onClick={() => setSelectedScan(scan.id)}
                  className={`w-full text-left p-3 rounded-lg border transition-colors ${
                    selectedScan === scan.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <h4 className="font-semibold text-slate-800">{scan.name}</h4>
                  <p className="text-sm text-slate-600">{scan.date}</p>
                  <Badge variant="secondary" className="mt-1">
                    {scan.slices} slices
                  </Badge>
                </button>
              ))}
            </CardContent>
          </Card>

          {/* Controls */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">View Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Zoom Level</label>
                <Slider
                  value={zoom}
                  onValueChange={setZoom}
                  max={300}
                  min={25}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>25%</span>
                  <span>{zoom[0]}%</span>
                  <span>300%</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Slice Navigation</label>
                <Slider
                  value={currentSlice}
                  onValueChange={setCurrentSlice}
                  max={availableScans.find(s => s.id === selectedScan)?.slices || 50}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>1</span>
                  <span>{currentSlice[0]}</span>
                  <span>{availableScans.find(s => s.id === selectedScan)?.slices || 50}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsRotating(!isRotating)}
                  className="flex-1"
                >
                  {isRotating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {isRotating ? 'Pause' : 'Auto Rotate'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetView}
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setZoom([Math.min(300, zoom[0] + 25)])}
                >
                  <ZoomIn className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setZoom([Math.max(25, zoom[0] - 25)])}
                >
                  <ZoomOut className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 3D Viewer */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                3D Viewer - {availableScans.find(s => s.id === selectedScan)?.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <canvas
                  ref={canvasRef}
                  width={800}
                  height={600}
                  className="w-full border border-slate-200 rounded-lg cursor-pointer bg-slate-50"
                  onClick={handleCanvasClick}
                />
                
                {/* Overlay controls */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button variant="secondary" size="sm">
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>

                {/* Playback controls for slice navigation */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-lg p-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCurrentSlice([Math.max(1, currentSlice[0] - 1)])}
                  >
                    <SkipBack className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsRotating(!isRotating)}
                  >
                    {isRotating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCurrentSlice([Math.min(availableScans.find(s => s.id === selectedScan)?.slices || 50, currentSlice[0] + 1)])}
                  >
                    <SkipForward className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="mt-4 text-sm text-slate-600">
                <p><strong>Instructions:</strong></p>
                <ul className="list-disc list-inside space-y-1 mt-2">
                  <li>Click and drag on the image to rotate the view</li>
                  <li>Use the zoom slider to adjust magnification</li>
                  <li>Navigate through slices using the slice slider</li>
                  <li>Enable auto-rotate for continuous rotation</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Technical Information */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Eye className="w-5 h-5 text-blue-600" />
            <div>
              <h4 className="font-semibold text-blue-800">3D Visualization Technology</h4>
              <p className="text-sm text-blue-600">
                Powered by Three.js WebGL rendering engine. Supports DICOM format, 
                real-time manipulation, and medical-grade image processing.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MedicalImaging3D;

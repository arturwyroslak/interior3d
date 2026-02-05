# 🏠 Interior3D - Professional Interior Design Application

A high-performance, web-based 3D interior design tool built with Next.js, React Three Fiber, and TypeScript.

![Interior3D Banner](https://placehold.co/1200x400/0f172a/3b82f6?text=Interior3D+Preview)

## ✨ Features

### 🖥️ Advanced Visualization
- **Real-time 3D Rendering**: High-quality visualization with PBR materials, dynamic lighting, and shadows.
- **Render Mode**: Post-processing effects including Bloom, Ambient Occlusion, and Tone Mapping.
- **Interactive Floorplan**: 2D editor with grid snapping, real-time dimensioning, and wall chaining.

### 🛠️ Professional Tools
- **Asset Library**: Drag & drop furniture, lighting, and decorations directly into the scene.
- **Transform Controls**: Blender-style gizmos for moving, rotating, and scaling objects (Shortcuts: G, R, S).
- **Project Management**: Save/Load projects, undo/redo history system, and export capabilities.

### 🎨 Architecture
- **Tech Stack**: Next.js 14, React Three Fiber, Drei, Leva, Zustand, Tailwind CSS.
- **Performance**: Optimized for web using instances, texture compression, and React Suspense.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/arturwyroslak/interior3d.git
   cd interior3d
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `V` | Select Tool |
| `W` | Wall Tool (2D) |
| `G` | Move Object |
| `R` | Rotate Object |
| `S` | Scale Object |
| `Ctrl + Z` | Undo |
| `Ctrl + Shift + Z` | Redo |
| `Delete` | Remove Selected |
| `1` | 2D View |
| `2` | 3D View |
| `3` | Render View |

## 📦 Deployment

### Deploy on Vercel

The easiest way to deploy this app is to use the [Vercel Platform](https://vercel.com/new).

1. Push your code to a GitHub repository.
2. Go to Vercel and import the project.
3. Select "Next.js" framework preset.
4. Click **Deploy**.

No environment variables are required for the base functionality.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Built with ❤️ by [Artur Wyroślak](https://github.com/arturwyroslak)

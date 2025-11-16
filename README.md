# Cyclanatomy - Interactive 3D Road Bike Viewer

An interactive 3D visualization of a road bike built with Three.js, featuring mouse-controlled rotation and detailed component markers.

## Features

- 🎮 **Interactive 3D Model**: Drag to rotate, scroll to zoom
- 🎯 **Component Markers**: Click on numbered markers to highlight bike parts
- 📱 **Responsive Design**: Works on desktop and mobile devices
- ✨ **Modern UI**: Clean interface matching the Figma design
- 🔄 **Smooth Animations**: Damped camera controls for fluid interaction

## Setup Instructions

### 1. Add Your 3D Model

Place your 3D bike model in the `models/` directory:

```
cyclanatomy/
├── models/
│   └── roadbike.glb  (or roadbike.gltf + textures)
├── assets/
├── index.html
├── styles.css
└── app.js
```

**Supported formats:**
- `.glb` (recommended - single file with embedded textures)
- `.gltf` (with separate texture files)

### 2. Model Naming

The application looks for the model at: `./models/roadbike.glb`

To use a different model name, update the path in `app.js`:

```javascript
const CONFIG = {
    modelPath: './models/your-model-name.glb', // Update this
    // ... other config
};
```

### 3. Texture Files

If using `.gltf` format, ensure all texture files are in the same directory:

```
models/
├── roadbike.gltf
├── texture_color.png
├── texture_normal.png
└── texture_metallic.png
```

### 4. Running the Application

#### Option A: Using a Local Server (Recommended)

Three.js requires a local server to load external files. Use any of these methods:

**Python 3:**
```bash
cd /Users/ellenpark73591/Desktop/DX/create-a-thon/cyclanatomy
python3 -m http.server 8000
```

**Node.js (with npx):**
```bash
npx http-server -p 8000
```

**VS Code Live Server:**
- Install "Live Server" extension
- Right-click `index.html` → "Open with Live Server"

Then open: `http://localhost:8000`

#### Option B: Direct File Opening (Limited)

You can open `index.html` directly in a browser, but the 3D model won't load due to CORS restrictions. A placeholder bike will be shown instead.

## Customization

### Camera Settings

Edit `CONFIG` in `app.js`:

```javascript
const CONFIG = {
    cameraPosition: { x: 3, y: 1.5, z: 5 }, // Initial camera position
    cameraFov: 45,                           // Field of view
    minDistance: 2,                          // Minimum zoom
    maxDistance: 10,                         // Maximum zoom
    autoRotate: false,                       // Enable auto-rotation
    autoRotateSpeed: 0.5,                    // Rotation speed
};
```

### Marker Positions

Update marker positions in `styles.css` to match your bike model:

```css
.marker-1 {
    top: 39.55%;
    left: 30.56%;
}
```

### Colors and Styling

Modify colors in `styles.css`:

```css
:root {
    --primary-color: #000000;
    --background-color: #ffffff;
    --accent-color: #c5d100;
}
```

## Interactive Features

### Mouse Controls
- **Left Click + Drag**: Rotate the bike
- **Scroll**: Zoom in/out
- **Right Click + Drag**: Pan (disabled by default)

### Keyboard Shortcuts
- `R`: Reset camera to default position
- `A`: Toggle auto-rotation

### Marker Interactions
- **Click markers (1, 2, 3)**: View component information
- **Hover markers**: See component name tooltip

## Bike Components

The three numbered markers indicate:

1. **Saddle**: Rider support and comfort
2. **Frame**: Main structural component
3. **Handlebars**: Steering and control

You can customize these in `app.js`:

```javascript
const partInfo = {
    'saddle': 'Your custom description',
    'frame': 'Your custom description',
    'handlebars': 'Your custom description'
};
```

## Project Structure

```
cyclanatomy/
├── index.html          # Main HTML structure
├── styles.css          # All styling and layout
├── app.js             # Three.js logic and interactions
├── assets/            # Images and SVG assets from Figma
├── models/            # 3D model files (add your .glb/.gltf here)
└── README.md          # This file
```

## Technical Details

### Dependencies (CDN)
- Three.js r128
- OrbitControls
- GLTFLoader

All loaded via CDN, no npm installation required.

### Browser Support
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

### Performance
- Optimized shadow maps (2048x2048)
- Automatic pixel ratio capping (max 2x)
- Efficient rendering loop
- Camera damping for smooth movement

## Troubleshooting

### Model Not Loading
1. ✅ Check model file is in `models/` directory
2. ✅ Verify file name matches `CONFIG.modelPath`
3. ✅ Use a local server (not file://)
4. ✅ Check browser console for errors
5. ✅ Ensure model format is .glb or .gltf

### Textures Missing
1. ✅ Use .glb format (embeds textures)
2. ✅ If using .gltf, place textures in same folder
3. ✅ Check texture paths in .gltf file

### Performance Issues
1. ✅ Reduce shadow map size in `app.js`
2. ✅ Disable shadows on smaller details
3. ✅ Lower `toneMappingExposure`

## Next Steps

1. **Add your 3D model** to the `models/` directory
2. **Adjust marker positions** to match your bike's anatomy
3. **Customize component information** for each marker
4. **Optional**: Add more markers for additional components
5. **Optional**: Implement modal/panel for detailed part info

## Credits

Design: Figma design system
3D Model: Canyon Endurace CF Road Bike
Framework: Three.js
Developer: Built with ❤️ for Cyclanatomy

---

For questions or issues, check the browser console for detailed error messages.


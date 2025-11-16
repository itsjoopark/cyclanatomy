# 3D Model Files - Canyon Endurace CF Road Bike

## ✅ Current Setup

Your 3D model is properly configured and ready to load!

### File Structure
```
models/
├── roadbike.gltf          # Main 3D model definition (GLTF format)
├── scene.bin              # Binary geometry data (19.2 MB)
├── textures/              # Texture images directory
│   ├── Canyon_Color_baseColor.png        # Main bike frame color/design
│   └── Selle_Italia_SLR_baseColor.jpeg   # Saddle texture
└── README.md              # This file
```

## 📊 Model Information

**Source:** Sketchfab (mmaarriioo)  
**License:** CC-BY-4.0  
**Model Name:** Roadbike / Bicycle Canyon Endurace CF  
**Format:** GLTF 2.0  

### Model Components
The bike model contains 15 separate mesh parts:

1. **Endurance Frame** (Canyon Color) - Main frame with texture
2. **Chrom** - Chrome/shiny metal parts
3. **Selle Italia SLR** - Saddle with texture
4. **Aluminum** (x5) - Aluminum components (rims, spokes, etc.)
5. **Black** (x3) - Black rubber/plastic parts (tires, grips)
6. **Red** - Red accent details
7. **Black Matt** - Matte black components
8. **Aluminium Bursted** - Brushed aluminum finish
9. **Ultegra Grey** - Grey Shimano Ultegra components

### Materials
- **Canyon_Color:** Main frame texture (PNG)
- **Selle_Italia_SLR:** Saddle texture (JPEG)
- **Chrom:** Metallic chrome (no texture)
- **Aluminum:** Metallic aluminum (no texture)
- **Black:** Matte/glossy black (no texture)

### Statistics
- **Total Vertices:** ~400,000+
- **Total Triangles:** ~800,000+
- **Texture Count:** 2 (Canyon frame, Saddle)
- **File Size:** ~19 MB (scene.bin)
- **Texture Resolution:** Various (optimized)

## 🚀 How It's Loaded

The `app.js` file loads this model using Three.js GLTFLoader:

1. **Loads** `roadbike.gltf`
2. **References** `scene.bin` for geometry
3. **Loads textures** from `textures/` subdirectory
4. **Centers** the model at origin (0,0,0)
5. **Scales** to fit ~2.5 units
6. **Enables shadows** on all meshes
7. **Optimizes textures** with anisotropic filtering

## ✨ Texture Optimization

The app automatically applies:
- Maximum anisotropic filtering for sharp textures
- Proper color encoding (sRGB)
- Environment map intensity for metallic parts
- Shadow mapping for realistic depth

## 🎨 Customization

### Change Model Scale
Edit `app.js`, line ~141:
```javascript
const scale = 2.5 / maxDim;  // Change 2.5 to adjust size
```

### Adjust Initial View
Edit `app.js`, CONFIG section:
```javascript
cameraPosition: { x: 3, y: 1.5, z: 5 },  // Camera position
```

### Replace Model
To use a different bike model:
1. Replace `roadbike.gltf` and `scene.bin`
2. Update textures in `textures/` folder
3. Ensure texture paths in .gltf match folder structure

## 🔍 Troubleshooting

### Model loads but textures are missing
✅ **Check:** Textures must be in `models/textures/` folder  
✅ **Check:** Texture file names match the .gltf references  
✅ **Check:** Browser console for loading errors  

### Model appears too large/small
✅ **Adjust:** Scale factor in `app.js` (line ~141)  
✅ **Adjust:** Camera distance in CONFIG.minDistance/maxDistance  

### Model is rotated incorrectly
✅ **Check:** The model orientation in the .gltf file  
✅ **Add rotation:** In app.js after loading:
```javascript
bikeModel.rotation.y = Math.PI / 2; // Rotate 90 degrees
```

### Shadows not appearing
✅ **Check:** `castShadow` and `receiveShadow` are enabled  
✅ **Check:** Lighting setup has shadow cameras configured  
✅ **Adjust:** Shadow map size or bias settings  

## 📝 Model Metadata

```json
{
  "author": "mmaarriioo",
  "license": "CC-BY-4.0",
  "source": "Sketchfab",
  "title": "Roadbike / Bicycle Canyon Endurace CF",
  "generator": "Sketchfab-16.14.0",
  "version": "GLTF 2.0"
}
```

## 🎯 What's Working

✅ Model file path configured correctly  
✅ Textures in proper subdirectory  
✅ GLTF references match file structure  
✅ Binary data (scene.bin) present  
✅ Shadow casting enabled  
✅ Material optimization active  
✅ Anisotropic filtering enabled  
✅ Console logging for debugging  

## 🚴 Ready to View!

Start the development server:
```bash
./start-server.sh
```

Or manually:
```bash
python3 -m http.server 8000
```

Then open: **http://localhost:8000**

The Canyon Endurace CF bike should load with full textures and be ready for interaction! 🎉

---

**Model Credits:**  
Original model by mmaarriioo on Sketchfab  
Licensed under CC-BY-4.0  
https://sketchfab.com/3d-models/roadbike-bicycle-canyon-endurace-cf


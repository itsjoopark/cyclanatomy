# 📚 Cyclanatomy - File Index

Quick reference guide to all project files.

---

## 🚀 Main Application Files

### `index.html` (1.9 KB)
**Purpose:** Main 3D viewer page  
**Contains:** Canvas, markers overlay, loading indicator, navigation  
**Open this:** To see the interactive 3D bike viewer  

### `app.js` (12 KB)
**Purpose:** All Three.js logic and 3D scene setup  
**Contains:**
- Scene initialization
- Camera and controls setup
- Lighting configuration
- 3D model loading (GLTF)
- Placeholder bike generator
- Mouse interaction handlers
- Animation loop

**Key functions:**
- `init()` - Scene setup
- `loadBikeModel()` - Load 3D model
- `createPlaceholderBike()` - Fallback if no model
- `setupLighting()` - Light configuration
- `animate()` - Render loop

### `styles.css` (4.8 KB)
**Purpose:** All styling and layout  
**Contains:**
- Navigation bar styling
- Marker positioning and effects
- Responsive design
- Animations and transitions
- Loading indicators
- Tooltips

---

## 📖 Documentation Files

### `README.md` (5.6 KB) ⭐ START HERE
**Purpose:** Complete project documentation  
**Contains:**
- Full setup instructions
- Customization guide
- Troubleshooting
- Technical details
- Browser requirements

### `QUICKSTART.md` (2.5 KB) ⚡ FASTEST START
**Purpose:** Get running in 3 steps  
**Contains:**
- Minimal setup instructions
- Quick reference controls
- Common issues

### `PROJECT_SUMMARY.md` (9 KB) 📊 OVERVIEW
**Purpose:** High-level project overview  
**Contains:**
- Feature list
- Implementation details
- Figma → Code mapping
- Customization examples
- Enhancement ideas

### `INDEX.md` (This file)
**Purpose:** File navigation guide  

---

## 🎨 Asset Files

### `assets/` directory
- `a33049d2ff7f7aada449d6ed562ed1df36cfa8cd.png` - Specialized bike image (from Figma)
- `3095022babb4045083c822411c66843ba4eed47f.svg` - SVG vector 1
- `72022625de42d45ff8d6cb43477bd17a493325ac.svg` - SVG vector 2
- `9f5c16688b2f3ff691d1a476fa154b7ad355a0a6.svg` - SVG vector 3

**Purpose:** Images and graphics from Figma design  
**Used in:** preview-2d.html and as reference

---

## 🎭 Demo & Preview Files

### `preview-2d.html` (2.5 KB)
**Purpose:** 2D preview version (no 3D model needed)  
**Open this:** To see the design with static bike image  
**Useful for:** Testing layout without 3D setup

---

## 🔧 Configuration Files

### `package.json`
**Purpose:** Project metadata and scripts  
**Run scripts:**
```bash
npm run dev     # Start development server
npm start       # Same as dev
npm run preview # Open 2D preview
```

### `.gitignore`
**Purpose:** Exclude files from Git  
**Excludes:** System files, logs, IDE configs

### `start-server.sh` ⚡ LAUNCHER
**Purpose:** One-click server startup  
**Run:** `./start-server.sh` or `bash start-server.sh`  
**Does:**
- Checks for 3D model
- Verifies Python installation
- Starts server on port 8000
- Opens browser automatically (macOS)

---

## 📦 3D Model Directory

### `models/` directory
- `PLACE_MODEL_HERE.txt` - Instructions for adding 3D model
- `roadbike.glb` - (You need to add this)

**Expected model:** Canyon Endurace CF or similar road bike  
**Format:** .glb (preferred) or .gltf + textures  

---

## 🗺️ File Relationships

```
index.html
  ├── requires: app.js
  ├── requires: styles.css
  └── loads: models/roadbike.glb

app.js
  ├── depends on: Three.js (CDN)
  ├── depends on: OrbitControls (CDN)
  ├── depends on: GLTFLoader (CDN)
  └── references: models/roadbike.glb

preview-2d.html
  └── uses: assets/a33049d2ff7f7aada449d6ed562ed1df36cfa8cd.png

start-server.sh
  └── serves: all files on localhost:8000
```

---

## 📝 Which File to Edit?

### To change 3D behavior:
→ Edit `app.js`

### To change styling/layout:
→ Edit `styles.css`

### To change HTML structure:
→ Edit `index.html`

### To add 3D model:
→ Add to `models/roadbike.glb`

### To adjust marker positions:
→ Edit `styles.css` (`.marker-1`, `.marker-2`, `.marker-3`)

### To change component info:
→ Edit `app.js` (`partInfo` object)

---

## 🎯 Common Tasks

### Task: Start the application
**Files:** `start-server.sh` or terminal  
**Command:** `./start-server.sh` or `python3 -m http.server 8000`

### Task: Add 3D model
**Files:** `models/` directory  
**Action:** Place your `.glb` or `.gltf` file as `models/roadbike.glb`

### Task: Change marker positions
**Files:** `styles.css`  
**Edit:** `.marker-1`, `.marker-2`, `.marker-3` classes

### Task: Adjust camera view
**Files:** `app.js`  
**Edit:** `CONFIG` object (lines 10-24)

### Task: Change colors
**Files:** `styles.css` (UI), `app.js` (3D model)  
**Search for:** Color hex codes (#000000, etc.)

### Task: Add new marker
**Files:** `index.html` (markup), `styles.css` (positioning), `app.js` (info)  
**Steps:** Add HTML div, CSS position, JS description

---

## 📊 File Size Summary

```
Total Project Size: ~30 KB (excluding 3D model)

Breakdown:
- app.js:          12.1 KB  (40%)
- PROJECT_SUMMARY:  9.0 KB  (30%)
- README.md:        5.6 KB  (18%)
- styles.css:       4.8 KB  (16%)
- QUICKSTART.md:    2.5 KB   (8%)
- preview-2d.html:  2.5 KB   (8%)
- index.html:       1.9 KB   (6%)
- Other files:      ~5 KB    (17%)

Assets: ~150 KB (PNG + SVGs)
3D Model: (Your file - typically 1-10 MB)
```

---

## 🎓 Learning Path

If you're new to the project, read files in this order:

1. **QUICKSTART.md** - Get it running (5 min)
2. **index.html** - Understand structure (10 min)
3. **styles.css** - See how it's styled (15 min)
4. **app.js** - Learn the 3D logic (30 min)
5. **README.md** - Deep dive into features (20 min)
6. **PROJECT_SUMMARY.md** - Full context (15 min)

**Total learning time:** ~1.5 hours to understand everything

---

## 🔍 Search Guide

### Find camera settings:
`grep -n "camera" app.js`

### Find marker styles:
`grep -n "marker" styles.css`

### Find model loader:
`grep -n "GLTFLoader" app.js`

### Find lighting setup:
`grep -n "Light" app.js`

### Find all TODO comments:
`grep -rn "TODO" .`

---

## 🚀 Next Steps

1. ✅ Read `QUICKSTART.md`
2. ✅ Add your 3D model to `models/`
3. ✅ Run `./start-server.sh`
4. ✅ Open http://localhost:8000
5. ✅ Customize as needed

---

**Questions?** Check the relevant documentation file above!

**Ready to build?** Start with `QUICKSTART.md` → Add model → Run server → Customize!

🎉 Happy coding!


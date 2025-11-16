# 🚴 Cyclanatomy Quick Start Guide

## Step 1: Add Your 3D Model

Place your bike 3D model file in the `models/` folder:

```bash
models/
└── roadbike.glb   # Your 3D model here
```

**Model name from your reference:** `roadbike__bicycle_canyon_endurace_cf`

## Step 2: Start Local Server

Open terminal in the project directory and run:

```bash
python3 -m http.server 8000
```

Or with Node.js:

```bash
npx http-server -p 8000
```

## Step 3: Open in Browser

Navigate to: **http://localhost:8000**

## What You Should See

✅ Interactive 3D bike model in the center  
✅ Mouse drag to rotate  
✅ Scroll to zoom  
✅ Three numbered markers (1, 2, 3) on the bike  
✅ "Cyclanatomy" header at top  
✅ "Specialized Road Bike" label at bottom  

## Controls

| Action | Effect |
|--------|--------|
| **Left Click + Drag** | Rotate bike |
| **Scroll Wheel** | Zoom in/out |
| **Press R** | Reset camera |
| **Press A** | Toggle auto-rotate |
| **Click Markers** | Highlight bike parts |

## Troubleshooting

### "Could not load 3D model"
- ✅ Make sure your model is named `roadbike.glb`
- ✅ Check that it's in the `models/` folder
- ✅ Use a local server (not opening file directly)

### Placeholder Bike Shows Instead
- This means the 3D model couldn't be loaded
- The app creates a simple placeholder automatically
- Add your actual model to see the real bike

### Textures Not Showing
- Use `.glb` format (embeds textures)
- If using `.gltf`, put texture files in same folder

## Customize Markers

Edit `styles.css` to reposition markers for your bike:

```css
.marker-1 { top: 39.55%; left: 30.56%; }  /* Saddle */
.marker-2 { top: 46.68%; left: 45.69%; }  /* Frame */
.marker-3 { top: 34.86%; left: 52.78%; }  /* Handlebars */
```

## File Structure

```
cyclanatomy/
├── index.html          ← Main page
├── styles.css          ← All styling
├── app.js             ← Three.js code
├── models/            ← Put your 3D model here
├── assets/            ← Figma design assets
├── README.md          ← Full documentation
└── QUICKSTART.md      ← This file
```

## Next Steps

1. 🎨 Adjust marker positions to match your bike
2. 📝 Edit component descriptions in `app.js`
3. 🎯 Add more markers for additional parts
4. 💅 Customize colors and styling
5. 📱 Test on mobile devices

---

**Need help?** Check the full `README.md` or browser console for errors.

**Ready to go?** Just add your 3D model and start the server! 🚀


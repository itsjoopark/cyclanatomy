# 🎨 Cyclanatomy Visual Guide

Visual reference for the implementation matching your Figma design.

---

## 📐 Layout Structure

```
┌─────────────────────────────────────────────────────────┐
│  Cyclanatomy                                   [50px]   │ Top Nav
├─────────────────────────────────────────────────────────┤
│                                                         │
│                                                         │
│              ┌─────────────────────┐                    │
│              │         3           │  ← Handlebars      │
│              │  ⚫                  │     Marker         │
│              │                     │                    │
│              │     ⚫  1           │  ← Saddle          │
│              │       /\            │     Marker         │
│              │      /  \           │                    │
│              │     /    \          │                    │
│              │  ⚫ 2     \         │  ← Frame           │
│              │   /        \        │     Marker         │
│              │  ●──────────●       │                    │
│              │   \        /        │                    │
│              │    \      /         │                    │
│              │     ●────●          │  ← 3D Bike Model   │
│              └─────────────────────┘                    │
│                                                         │
│                ┌─────────────────┐                      │
│                │ Specialized     │  ← Bike Label       │
│                │ Road Bike       │                      │
│                └─────────────────┘                      │
│                                                         │
│          🖱️  Drag to rotate • Scroll to zoom           │ Controls
└─────────────────────────────────────────────────────────┘
```

---

## 🎯 Marker Positions (from Figma)

### Marker 1 - Saddle
```css
position: top: 39.55%, left: 30.56%
```
- Location: Upper left area
- Component: Bike saddle/seat
- Color: Black circle with white "1"

### Marker 2 - Frame
```css
position: top: 46.68%, left: 45.69%
```
- Location: Center-left (main frame)
- Component: Bike frame structure
- Color: Black circle with white "2"

### Marker 3 - Handlebars
```css
position: top: 34.86%, left: 52.78%
```
- Location: Upper right area
- Component: Handlebars/steering
- Color: Black circle with white "3"

---

## 🎨 Color Palette

### UI Colors
```
Background Gradient:
  ┌─────────────────┐
  │   #f8f8f8       │  ← Top (light gray)
  │                 │
  │   #ffffff       │  ← Bottom (white)
  └─────────────────┘

Header:
  Background: #ffffff (white)
  Text:       #000000 (black)
  Border:     rgba(0, 0, 0, 0.5)
  Shadow:     rgba(0, 0, 0, 0.25)

Markers:
  Background: #000000 (black)
  Text:       #f5f5f5 (near white)
  Border:     #797979 (gray)
  Shadow:     rgba(0, 0, 0, 0.25)
  Hover:      #1a1a1a (darker black)

Labels:
  Background: #ffffff (white)
  Text:       #000000 (black)
  Shadow:     rgba(0, 0, 0, 0.15)

Controls Info:
  Background: rgba(0, 0, 0, 0.7)
  Text:       #ffffff (white)
```

### 3D Bike Colors (from Specialized bike)
```
Frame:    #5a6b5e  ┌───┐  Green-gray
                   │   │
Accent:   #c9d100  └───┘  Yellow (branding)

Wheels:   #1a1a1a  ⚫    Black/dark gray

Seat:     #2d2d2d  ■     Dark gray
```

---

## 📏 Dimensions & Spacing

### Top Navigation Bar
```
Height:        50px
Padding:       0 30px
Font Size:     18px
Font Weight:   700 (Bold)
Border Bottom: 0.5px solid
```

### Markers
```
Size:          33px × 33px
Border Radius: 16.5px (circle)
Border Width:  1px
Font Size:     15px
Font Weight:   700 (Bold)
Shadow:        0px 4px 4px 0px rgba(0,0,0,0.25)

Hover Scale:   1.15× (15% larger)
```

### Bike Label
```
Padding:       8px 16px
Border Radius: 8px
Font Size:     14px
Font Weight:   500 (Medium)
Position:      bottom: 35%, center horizontally
Shadow:        0px 2px 8px rgba(0,0,0,0.15)
```

### Controls Info
```
Padding:       10px 20px
Border Radius: 20px
Font Size:     13px
Position:      bottom: 20px, center horizontally
Opacity:       0.9
```

---

## ⚡ Interactive States

### Marker States

#### Default
```
┌─────┐
│  1  │  Black background
└─────┘  White text
         1px gray border
```

#### Hover
```
┌─────┐
│  1  │  Darker black
└─────┘  Scaled 1.15×
         Larger shadow
  ↑       Tooltip appears
Tooltip
```

#### Clicked
```
┌─────┐
│  1  │  Brief animation
└─────┘  Console log
         Shows info
```

### Canvas States

#### Default
```
cursor: grab  ✋
```

#### Dragging
```
cursor: grabbing  ✊
```

#### Loading
```
┌──────────────────┐
│                  │
│    ◌ Loading     │  Spinner + text
│    3D Model...   │
│                  │
└──────────────────┘
```

---

## 🎬 Animation Timeline

### Page Load Sequence

```
0.0s  ┌─────────────────────────────────────┐
      │ Page loads, canvas appears          │
      │ Loading indicator shows             │
0.2s  │ Marker 1 fades in + scales up      │ ⚫
0.4s  │ Marker 2 fades in + scales up      │    ⚫
0.6s  │ Marker 3 fades in + scales up      │       ⚫
1.0s  │ 3D model loaded (or placeholder)    │
      │ Loading indicator fades out         │
      │ Idle animation begins (subtle)      │
∞     │ Continuous render loop              │
      └─────────────────────────────────────┘
```

### Marker Animation
```css
@keyframes fadeInScale {
    0%   { opacity: 0; transform: scale(0.5); }
    100% { opacity: 1; transform: scale(1.0); }
}
Duration: 0.5s
Easing: ease-out
```

---

## 🖱️ Mouse Interaction Flow

### Rotation
```
1. User clicks canvas
2. Cursor changes to "grabbing" ✊
3. Mouse movement rotates bike
4. OrbitControls updates camera
5. Smooth damping applied
6. User releases, cursor back to "grab" ✋
```

### Zoom
```
1. User scrolls wheel
2. Scroll delta detected
3. Camera distance changes
4. Clamped between min (2) and max (10)
5. Smooth interpolation
```

### Marker Click
```
1. User clicks marker
2. Marker scales briefly
3. Console logs part name
4. Optional: bike rotates slightly
5. Optional: info panel appears
```

---

## 📱 Responsive Breakpoints

### Desktop (> 768px)
```
Header Font:    18px
Marker Size:    33px
Label Font:     14px
Controls Font:  13px
```

### Mobile (≤ 768px)
```
Header Font:    16px  ↓
Marker Size:    28px  ↓
Label Font:     12px  ↓
Controls Font:  11px  ↓
```

---

## 🔦 Lighting Setup (3D Scene)

```
Scene Lighting Configuration:

        🌅 Hemisphere Light (top)
            ↓ (soft ambient)
            
    ☀️ Main Light          ☀️ Rim Light
    (key, front-right)    (back-left)
         ↘              ↙
            🚴 Bike
         ↗              
    💡 Fill Light
    (opposite of main)
    
────────────────────────────────────
        Ground Plane
    (receives shadows)
```

### Light Types & Positions
```
Ambient Light:
  Color:     0xffffff
  Intensity: 0.6
  Position:  N/A (everywhere)

Main Directional Light (Key):
  Color:     0xffffff
  Intensity: 0.8
  Position:  (5, 10, 7)
  Shadows:   ✅ Enabled

Fill Light:
  Color:     0xffffff
  Intensity: 0.3
  Position:  (-5, 5, -5)

Rim Light:
  Color:     0xffffff
  Intensity: 0.4
  Position:  (0, 3, -8)

Hemisphere Light:
  Sky Color:    0xffffff
  Ground Color: 0x444444
  Intensity:    0.4
  Position:     (0, 20, 0)
```

---

## 🎥 Camera Configuration

```
Camera Setup:

Field of View (FOV):  45°
Aspect Ratio:         window.innerWidth / window.innerHeight
Near Plane:           0.1
Far Plane:            1000

Initial Position:     (3, 1.5, 5)
Look At:              (0, 0, 0) - center

        Y (up)
        │
        │     Camera (3, 1.5, 5)
        │    ╱
        │   ╱
        │  ╱
        │ ╱
────────●────────── X
       ╱│
      ╱ │
     ╱  │
    Z   │
        │
       Bike at origin
```

### OrbitControls Constraints
```
Min Distance:   2.0   ───────⚫  (closest zoom)
Max Distance:   10.0          ⚫───────  (farthest zoom)

Min Polar:      π × 0.2  (36°)   \
Max Polar:      π × 0.7  (126°)  /  Vertical limits

Panning:        ❌ Disabled
Damping:        ✅ Enabled (0.05)
Auto-rotate:    ❌ Disabled (toggle with 'A')
```

---

## 🎯 3D Model Specifications

### Expected Format
```
Preferred:   .glb (GLTF Binary)
Alternative: .gltf + texture files

File Name:   roadbike.glb
Location:    models/roadbike.glb

Recommended Size:
  Geometry:  < 50,000 polygons
  Textures:  ≤ 2048 × 2048 px
  File Size: 1-10 MB
```

### Auto-adjustments Applied
```
1. Model loaded into scene
2. Bounding box calculated
3. Model centered at origin (0, 0, 0)
4. Scaled to fit ~2.5 units
5. Shadows enabled on all meshes
6. Materials updated if needed
```

---

## 🎨 Figma → Three.js Mapping

### Design Translation

| Figma Element | Three.js Element |
|---------------|------------------|
| Bike image (2D) | 3D GLB model with textures |
| Flat lighting | Multi-light setup (5 lights) |
| Static view | Interactive camera (OrbitControls) |
| Markers (absolute) | HTML overlay (CSS positioning) |
| White background | Scene background + gradient |
| Drop shadow | Three.js shadow maps |

---

## 📊 Visual Hierarchy

```
Z-Index Layers (front to back):

1000 → Top Nav Bar
 100 → Loading Indicator
  10 → Markers + Tooltips
   2 → Bike Label
   1 → Controls Info
   0 → 3D Canvas (Three.js)
  -1 → Background
```

---

## ✨ Visual Effects

### Shadows (Three.js)
```
Shadow Map Size:     2048 × 2048
Shadow Type:         PCFSoftShadowMap
Shadow Camera Near:  0.1
Shadow Camera Far:   50
Shadow Camera Bounds: ±10 units

Objects Casting Shadows:
  ✅ Bike model
  ✅ All bike components

Objects Receiving Shadows:
  ✅ Ground plane
```

### Fog
```
Color:    #f8f8f8 (matches background)
Near:     8 units
Far:      15 units
Effect:   Atmospheric depth
```

### Tone Mapping
```
Type:      ACESFilmicToneMapping
Exposure:  1.2
Encoding:  sRGB
```

---

## 🎭 Placeholder Bike (if no 3D model)

```
Built from basic geometries:

  ┌──┐               Seat (box)
  │  │
  └──┴───┐
         │           Seat tube (cylinder)
     ┌───┴───┐       
     │       │       Main frame (cylinder)
     │       │
    ⚫───────⚫       Wheels (torus)
```

### Placeholder Colors
```
Frame:  #5a6b5e  (green-gray)
Wheels: #1a1a1a  (black)
Seat:   #2d2d2d  (dark gray)
Accent: #c9d100  (yellow)
```

---

## 🔄 Render Loop

```
┌─────────────────────────────────┐
│ requestAnimationFrame()         │
├─────────────────────────────────┤
│ 1. Get delta time               │
│ 2. Update OrbitControls         │
│ 3. Apply idle animation (y)     │
│ 4. Render scene + camera        │
│ 5. Loop back to step 1          │
└─────────────────────────────────┘

FPS Target: 60 fps
Delta Time: ~16.67ms per frame
```

---

## 📐 Coordinate System

```
Three.js uses right-handed coordinate system:

         Y+ (up)
          │
          │
          │
          └─────── X+ (right)
         ╱
        ╱
       ╱
      Z+ (toward viewer)

Bike faces: +X direction (right)
Camera looks: toward -Z (into screen)
```

---

## 🎯 Performance Targets

```
Target Metrics:

FPS:          60 fps
Frame Time:   < 16.67ms
GPU Memory:   < 500 MB
Texture Mem:  < 100 MB
Poly Count:   < 50,000 triangles
Shadow Res:   2048 × 2048
Pixel Ratio:  Capped at 2×
```

---

## 🎨 Typography

```
Font Family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto

Weights Used:
  700 (Bold)   → Header, markers
  600 (SemiBold) → (not used)
  500 (Medium) → Bike label
  400 (Regular) → Controls, body

Sizes:
  18px → Header
  15px → Marker numbers
  14px → Bike label
  13px → Controls info
  12px → Tooltips
```

---

**This completes the visual guide!**

For implementation details, see the source files:
- `styles.css` - All styling
- `app.js` - 3D scene setup
- `index.html` - Structure

🎨 Design matches Figma frame-by-frame! ✨


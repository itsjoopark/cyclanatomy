#!/bin/bash

# Cyclanatomy Development Server Launcher
# =======================================

echo "🚴 Starting Cyclanatomy Development Server..."
echo ""

# Check if we're in the correct directory
if [ ! -f "index.html" ]; then
    echo "❌ Error: index.html not found"
    echo "Please run this script from the cyclanatomy directory"
    exit 1
fi

# Check if 3D model exists
if [ -f "models/roadbike.glb" ] || [ -f "models/roadbike.gltf" ]; then
    echo "✅ 3D model found"
else
    echo "⚠️  No 3D model found in models/ directory"
    echo "   The app will show a placeholder bike"
    echo "   Add your model as: models/roadbike.glb"
    echo ""
fi

# Check Python version
if command -v python3 &> /dev/null; then
    echo "✅ Python 3 found"
    echo ""
    echo "Starting server on http://localhost:8000"
    echo "Press Ctrl+C to stop"
    echo ""
    echo "📂 Available pages:"
    echo "   • http://localhost:8000          - 3D Interactive Viewer"
    echo "   • http://localhost:8000/preview-2d.html - 2D Preview"
    echo ""
    
    # Try to open in default browser (macOS)
    if [[ "$OSTYPE" == "darwin"* ]]; then
        sleep 2 && open "http://localhost:8000" &
    fi
    
    # Start Python server
    python3 -m http.server 8000
    
elif command -v python &> /dev/null; then
    echo "✅ Python found"
    echo ""
    echo "Starting server on http://localhost:8000"
    echo "Press Ctrl+C to stop"
    echo ""
    
    # Start Python server
    python -m SimpleHTTPServer 8000
    
else
    echo "❌ Python not found"
    echo ""
    echo "Please install Python or use another method:"
    echo ""
    echo "Option 1: Install Python"
    echo "  Visit: https://www.python.org/downloads/"
    echo ""
    echo "Option 2: Use Node.js"
    echo "  Run: npx http-server -p 8000"
    echo ""
    echo "Option 3: Use VS Code Live Server"
    echo "  Install extension and right-click index.html"
    echo ""
    exit 1
fi


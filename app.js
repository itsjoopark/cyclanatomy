// Three.js Scene Setup
let scene, camera, renderer, controls;
let bikeModel = null;
let clock = new THREE.Clock();

// Configuration
const CONFIG = {
    backgroundColor: 0xf8f8f8,
    cameraPosition: { x: 3, y: 0.5, z: 5 }, // Lowered camera Y position
    cameraFov: 45,
    modelPath: './models/roadbike.gltf', // Your Canyon bike 3D model
    autoRotate: false,
    autoRotateSpeed: 0.5,
    enableDamping: true,
    dampingFactor: 0.05,
    minDistance: 2,
    maxDistance: 10,
    maxPolarAngle: Math.PI * 0.7,
    minPolarAngle: Math.PI * 0.2,
    targetPosition: { x: 0, y: -0.5, z: 0 } // Lower target point
};

// Initialize the scene
function init() {
    const canvas = document.getElementById('three-canvas');
    const container = document.getElementById('canvas-container');
    
    // Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(CONFIG.backgroundColor);
    scene.fog = new THREE.Fog(CONFIG.backgroundColor, 8, 15);

    // Camera
    const aspect = window.innerWidth / window.innerHeight;
    camera = new THREE.PerspectiveCamera(CONFIG.cameraFov, aspect, 0.1, 1000);
    camera.position.set(CONFIG.cameraPosition.x, CONFIG.cameraPosition.y, CONFIG.cameraPosition.z);
    camera.lookAt(CONFIG.targetPosition.x, CONFIG.targetPosition.y, CONFIG.targetPosition.z);

    // Renderer
    renderer = new THREE.WebGLRenderer({ 
        canvas: canvas, 
        antialias: true,
        alpha: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight - 50);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    // Controls (OrbitControls for mouse interaction)
    controls = new THREE.OrbitControls(camera, canvas);
    controls.target.set(CONFIG.targetPosition.x, CONFIG.targetPosition.y, CONFIG.targetPosition.z);
    controls.enableDamping = CONFIG.enableDamping;
    controls.dampingFactor = CONFIG.dampingFactor;
    controls.autoRotate = CONFIG.autoRotate;
    controls.autoRotateSpeed = CONFIG.autoRotateSpeed;
    controls.minDistance = CONFIG.minDistance;
    controls.maxDistance = CONFIG.maxDistance;
    controls.maxPolarAngle = CONFIG.maxPolarAngle;
    controls.minPolarAngle = CONFIG.minPolarAngle;
    controls.enablePan = false;

    // Lighting Setup
    setupLighting();

    // Load the 3D Model
    loadBikeModel();

    // Ground/Platform (optional)
    createGround();

    // Event Listeners
    window.addEventListener('resize', onWindowResize, false);
    setupMarkerInteractions();
    setupButtonControlPanel();

    // Start animation loop
    animate();
}

// Setup Lighting
function setupLighting() {
    // Ambient Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    // Main Directional Light (Key Light)
    const mainLight = new THREE.DirectionalLight(0xffffff, 0.8);
    mainLight.position.set(5, 10, 7);
    mainLight.castShadow = true;
    mainLight.shadow.camera.near = 0.1;
    mainLight.shadow.camera.far = 50;
    mainLight.shadow.camera.left = -10;
    mainLight.shadow.camera.right = 10;
    mainLight.shadow.camera.top = 10;
    mainLight.shadow.camera.bottom = -10;
    mainLight.shadow.mapSize.width = 2048;
    mainLight.shadow.mapSize.height = 2048;
    scene.add(mainLight);

    // Fill Light (opposite side)
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
    fillLight.position.set(-5, 5, -5);
    scene.add(fillLight);

    // Rim Light (from behind)
    const rimLight = new THREE.DirectionalLight(0xffffff, 0.4);
    rimLight.position.set(0, 3, -8);
    scene.add(rimLight);

    // Hemisphere Light for natural look
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.4);
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);
}

// Load 3D Bike Model
function loadBikeModel() {
    const loader = new THREE.GLTFLoader();
    const loadingIndicator = document.getElementById('loading-indicator');
    
    // Check if model file exists, if not create a placeholder
    loader.load(
        CONFIG.modelPath,
        // Success callback
        function(gltf) {
            bikeModel = gltf.scene;
            console.log('✅ 3D model loaded successfully!');
            console.log('Model info:', gltf);
            
            // Center and scale the model
            const box = new THREE.Box3().setFromObject(bikeModel);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());
            
            console.log('Model dimensions:', size);
            console.log('Model center:', center);
            
            // Center the model and lower it vertically
            bikeModel.position.x = -center.x;
            bikeModel.position.y = -center.y - 0.5; // Lower the model on Y axis
            bikeModel.position.z = -center.z;
            
            // Store base Y position for idle animation
            bikeModel.userData.baseY = -center.y - 0.5;
            
            // Scale to fit
            const maxDim = Math.max(size.x, size.y, size.z);
            const scale = 2.5 / maxDim;
            bikeModel.scale.setScalar(scale);
            console.log('Model scale factor:', scale);
            
            // Enable shadows and optimize materials
            let meshCount = 0;
            let textureCount = 0;
            
            bikeModel.traverse((child) => {
                if (child.isMesh) {
                    meshCount++;
                    child.castShadow = true;
                    child.receiveShadow = true;
                    
                    // Enhance materials and textures
                    if (child.material) {
                        child.material.needsUpdate = true;
                        
                        // Optimize texture rendering if textures exist
                        if (child.material.map) {
                            textureCount++;
                            child.material.map.anisotropy = renderer.capabilities.getMaxAnisotropy();
                            child.material.map.needsUpdate = true;
                        }
                        
                        // Ensure proper metalness and roughness for realistic look
                        if (child.material.metalness !== undefined) {
                            child.material.envMapIntensity = 1.0;
                        }
                    }
                }
            });
            
            console.log(`✅ Loaded ${meshCount} meshes with ${textureCount} textures`);
            
            scene.add(bikeModel);
            loadingIndicator.classList.add('hidden');
            
            console.log('🚴 Canyon Endurace CF bike ready for interaction!');
        },
        // Progress callback
        function(xhr) {
            const percentComplete = (xhr.loaded / xhr.total) * 100;
            console.log(`Loading model: ${percentComplete.toFixed(2)}%`);
        },
        // Error callback - Create placeholder if model doesn't exist
        function(error) {
            console.warn('Could not load 3D model, creating placeholder:', error);
            createPlaceholderBike();
            loadingIndicator.classList.add('hidden');
        }
    );
}

// Create Placeholder Bike (if 3D model is not available)
function createPlaceholderBike() {
    bikeModel = new THREE.Group();
    
    // Create a simple bike representation using basic geometries
    // Color scheme based on Specialized bike (green/gray frame, yellow accent)
    const wheelGeometry = new THREE.TorusGeometry(0.4, 0.05, 16, 32);
    const frameMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x5a6b5e, // Green-gray frame color
        metalness: 0.6,
        roughness: 0.4
    });
    const wheelMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x1a1a1a,
        metalness: 0.3,
        roughness: 0.7
    });
    
    // Front wheel
    const frontWheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
    frontWheel.rotation.y = Math.PI / 2;
    frontWheel.position.set(0.8, 0, 0);
    frontWheel.castShadow = true;
    bikeModel.add(frontWheel);
    
    // Rear wheel
    const rearWheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
    rearWheel.rotation.y = Math.PI / 2;
    rearWheel.position.set(-0.8, 0, 0);
    rearWheel.castShadow = true;
    bikeModel.add(rearWheel);
    
    // Frame - main tube
    const mainTube = new THREE.Mesh(
        new THREE.CylinderGeometry(0.02, 0.02, 1.6, 16),
        frameMaterial
    );
    mainTube.rotation.z = Math.PI / 2;
    mainTube.position.set(0, 0.3, 0);
    mainTube.castShadow = true;
    bikeModel.add(mainTube);
    
    // Frame - seat tube
    const seatTube = new THREE.Mesh(
        new THREE.CylinderGeometry(0.02, 0.02, 0.8, 16),
        frameMaterial
    );
    seatTube.position.set(-0.3, 0.5, 0);
    seatTube.castShadow = true;
    bikeModel.add(seatTube);
    
    // Seat
    const seat = new THREE.Mesh(
        new THREE.BoxGeometry(0.15, 0.03, 0.08),
        new THREE.MeshStandardMaterial({ color: 0x2d2d2d })
    );
    seat.position.set(-0.3, 0.9, 0);
    seat.castShadow = true;
    bikeModel.add(seat);
    
    // Handlebars tube
    const handlebarTube = new THREE.Mesh(
        new THREE.CylinderGeometry(0.02, 0.02, 0.6, 16),
        frameMaterial
    );
    handlebarTube.position.set(0.8, 0.4, 0);
    handlebarTube.castShadow = true;
    bikeModel.add(handlebarTube);
    
    // Handlebars
    const handlebars = new THREE.Mesh(
        new THREE.CylinderGeometry(0.015, 0.015, 0.4, 16),
        frameMaterial
    );
    handlebars.rotation.z = Math.PI / 2;
    handlebars.position.set(0.8, 0.7, 0);
    handlebars.castShadow = true;
    bikeModel.add(handlebars);
    
    // Add accent color (yellow Specialized branding from the Figma design)
    const accentGeometry = new THREE.BoxGeometry(0.4, 0.15, 0.05);
    const accentMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xc9d100, // Yellow branding
        metalness: 0.2,
        roughness: 0.5
    });
    const accent = new THREE.Mesh(accentGeometry, accentMaterial);
    accent.position.set(0.2, 0.35, 0);
    accent.rotation.z = -0.2;
    accent.castShadow = true;
    bikeModel.add(accent);
    
    bikeModel.position.y = -0.5; // Lower position to match centered view
    scene.add(bikeModel);
    
    console.log('Placeholder bike created. Add your 3D model to:', CONFIG.modelPath);
}

// Create Ground/Platform
function createGround() {
    const groundGeometry = new THREE.CircleGeometry(5, 64);
    const groundMaterial = new THREE.ShadowMaterial({ opacity: 0.15 });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.01;
    ground.receiveShadow = true;
    scene.add(ground);
    
    // Optional: Add a subtle grid
    const gridHelper = new THREE.GridHelper(10, 20, 0xdddddd, 0xeeeeee);
    gridHelper.position.y = 0;
    gridHelper.material.opacity = 0.1;
    gridHelper.material.transparent = true;
    scene.add(gridHelper);
}

// Setup Marker Interactions
function setupMarkerInteractions() {
    const markers = document.querySelectorAll('.marker');
    
    markers.forEach(marker => {
        marker.addEventListener('click', function() {
            const part = this.getAttribute('data-part');
            handleMarkerClick(part);
        });
    });
}

// Setup Button Control Panel
function setupButtonControlPanel() {
    const buttons = document.querySelectorAll('.control-button');
    
    // Define camera positions for each view
    const cameraViews = {
        '1': { position: { x: 4, y: 1.5, z: 3 }, target: { x: 0, y: -0.5, z: 0 }, name: 'Handlebar View' },
        '2': { position: { x: -4, y: 1.5, z: 3 }, target: { x: 0, y: -0.5, z: 0 }, name: 'Frame View' },
        '3': { position: { x: 0, y: -0.5, z: 5 }, target: { x: 0, y: -0.5, z: 0 }, name: 'Wheel View' },
        '4': { position: { x: 3, y: 2, z: 2 }, target: { x: 0, y: 0, z: 0 }, name: 'Seat View' },
        '5': { position: { x: 4, y: -0.5, z: 3 }, target: { x: 0, y: -1, z: 0 }, name: 'Crankset View' },
        '6': { position: { x: -4, y: -0.5, z: 3 }, target: { x: 0, y: -1, z: 0 }, name: 'Pedals View' },
        '7': { position: { x: 4, y: 0, z: 4 }, target: { x: 0, y: -0.5, z: 0 }, name: 'Brakes View' },
        '8': { position: { x: 3, y: 1, z: 3 }, target: { x: 0, y: -0.2, z: 0 }, name: 'Seat Tubes View' }
    };
    
    // Define part information for each button
    const partInfo = {
        '1': {
            title: 'Handlebar',
            description: 'Controls steering and provides multiple hand positions for comfort during long rides. Drop bar design for aerodynamic riding positions.',
            image: 'assets/8c89efe7cd63396f9ef63fff39497ad473a2f61e.png'
        },
        '2': {
            title: 'Frame',
            description: 'The main structure that holds all components together. Canyon Endurace CF - Carbon fiber endurance frame designed for stability and performance.',
            image: 'assets/d846e8a4c8a6aa69dbcea502e792010403ef74ac.png'
        },
        '3': {
            title: 'Wheel',
            description: 'Provides rotation and momentum. High-performance wheels with lightweight rims and aerodynamic spokes for optimal speed and handling.',
            image: 'assets/d32a9b6ae2ceeb377159616b20dafde17eb949a2.png'
        },
        '4': {
            title: 'Seat',
            description: 'Supports the rider during cycling. Ergonomically designed saddle for comfort on long rides while maintaining optimal riding position.',
            image: 'assets/456b7bdbe8fa2952a105b9a319eb61c6d11989f0.png'
        },
        '5': {
            title: 'Crankset',
            description: 'Converts pedaling motion into rotational energy. High-quality chainring system that transfers power efficiently from rider to wheels.',
            image: 'assets/821aebfb15d9c00666b19935c3abbaa5fd5bae4c.png'
        },
        '6': {
            title: 'Pedals',
            description: 'Connects the rider to the drivetrain. Platform pedals designed for optimal power transfer and rider control during cycling.',
            image: 'assets/e18d0296931db098aedcb6900ce9bf28d689533b.png'
        },
        '7': {
            title: 'Brakes',
            description: 'Provides stopping power and speed control. Hydraulic disc brakes offering precise modulation and reliable performance in all conditions.',
            image: 'assets/6089fd405129d49b01696196eb33d73687ea470e.png'
        },
        '8': {
            title: 'Seat Tubes',
            description: 'Connects the seat to the frame. Part of the main frame triangle that provides structural integrity and supports the saddle height adjustment.',
            image: 'assets/8424563e3b42c948e1d9fbf864813fa0cc970272.png'
        }
    };
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const viewNumber = this.getAttribute('data-view');
            const view = cameraViews[viewNumber];
            
            if (view) {
                // Remove active class from all buttons
                buttons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Animate camera to new position
                animateCameraToView(view);
                
                // Update side panel if button 1 or 2
                if (partInfo[viewNumber]) {
                    updateSidePanelContent(partInfo[viewNumber]);
                }
                
                console.log(`Switching to ${view.name}`);
            }
        });
    });
    
    // Set button 1 as default active and show handlebar info
    const defaultButton = document.querySelector('[data-view="1"]');
    if (defaultButton) {
        defaultButton.classList.add('active');
        // Show handlebar info by default
        if (partInfo['1']) {
            updateSidePanelContent(partInfo['1']);
        }
    }
}

// Update Side Panel Content
function updateSidePanelContent(info) {
    const panel = document.getElementById('description-side-panel');
    if (!panel) return;
    
    const header = panel.querySelector('.panel-header');
    const description = panel.querySelector('.panel-description');
    const image = panel.querySelector('.panel-image');
    
    if (header) {
        header.textContent = info.title;
    }
    
    if (description) {
        description.textContent = info.description;
    }
    
    if (image && info.image) {
        image.src = info.image;
        image.alt = info.title;
    }
    
    console.log(`Updated side panel to show: ${info.title}`);
}

// Animate camera to a specific view
function animateCameraToView(view) {
    const startPos = {
        x: camera.position.x,
        y: camera.position.y,
        z: camera.position.z
    };
    
    const startTarget = {
        x: controls.target.x,
        y: controls.target.y,
        z: controls.target.z
    };
    
    const duration = 1000; // 1 second
    const startTime = performance.now();
    
    function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease in-out function
        const eased = progress < 0.5
            ? 2 * progress * progress
            : -1 + (4 - 2 * progress) * progress;
        
        // Interpolate camera position
        camera.position.x = startPos.x + (view.position.x - startPos.x) * eased;
        camera.position.y = startPos.y + (view.position.y - startPos.y) * eased;
        camera.position.z = startPos.z + (view.position.z - startPos.z) * eased;
        
        // Interpolate target position
        controls.target.x = startTarget.x + (view.target.x - startTarget.x) * eased;
        controls.target.y = startTarget.y + (view.target.y - startTarget.y) * eased;
        controls.target.z = startTarget.z + (view.target.z - startTarget.z) * eased;
        
        controls.update();
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }
    
    requestAnimationFrame(animate);
}

// Handle Marker Click
function handleMarkerClick(part) {
    console.log(`Clicked on: ${part}`);
    
    // Camera positions for each part
    const cameraPositions = {
        'saddle': { x: -2, y: 2, z: 4 },
        'frame': { x: 2, y: 1, z: 4 },
        'handlebar': { x: 4, y: 1.5, z: 3 }  // Focus on front/handlebars
    };
    
    // Animate camera to focus on the selected part
    if (cameraPositions[part] && bikeModel) {
        const targetPos = cameraPositions[part];
        
        // Smooth camera transition
        const currentPos = {
            x: camera.position.x,
            y: camera.position.y,
            z: camera.position.z
        };
        
        // Simple animation (without gsap dependency)
        let progress = 0;
        const duration = 1000; // 1 second
        const startTime = performance.now();
        
        function animateCamera(currentTime) {
            progress = Math.min((currentTime - startTime) / duration, 1);
            
            // Ease in-out
            const eased = progress < 0.5 
                ? 2 * progress * progress 
                : -1 + (4 - 2 * progress) * progress;
            
            camera.position.x = currentPos.x + (targetPos.x - currentPos.x) * eased;
            camera.position.y = currentPos.y + (targetPos.y - currentPos.y) * eased;
            camera.position.z = currentPos.z + (targetPos.z - currentPos.z) * eased;
            
            if (progress < 1) {
                requestAnimationFrame(animateCamera);
            }
        }
        
        requestAnimationFrame(animateCamera);
        
        // Highlight the specific part by name
        highlightBikePart(part);
    }
    
    // Show info panel
    showPartInfo(part);
}

// Highlight specific bike part
function highlightBikePart(partName) {
    if (!bikeModel) return;
    
    // Find and highlight meshes related to the part
    bikeModel.traverse((child) => {
        if (child.isMesh) {
            // Reset all emissive colors first
            if (child.material && child.material.emissive) {
                child.material.emissive.setHex(0x000000);
            }
            
            // Highlight specific parts based on mesh name
            const meshName = child.name.toLowerCase();
            
            if (partName === 'handlebar' && 
                (meshName.includes('handlebar') || meshName.includes('stem') || 
                 meshName.includes('grip') || meshName.includes('bar'))) {
                // Add orange/yellow glow to handlebars
                if (child.material && child.material.emissive) {
                    child.material.emissive.setHex(0xff6600);
                    child.material.emissiveIntensity = 0.3;
                    
                    // Reset after 2 seconds
                    setTimeout(() => {
                        child.material.emissive.setHex(0x000000);
                        child.material.emissiveIntensity = 0;
                    }, 2000);
                }
            }
        }
    });
    
    console.log(`Highlighting: ${partName}`);
}

// Show Part Information (optional feature)
function showPartInfo(part) {
    const partInfo = {
        'saddle': {
            title: 'Saddle',
            description: 'Provides comfort and support for the rider during long rides.',
            details: 'Selle Italia SLR - Premium racing saddle'
        },
        'frame': {
            title: 'Frame',
            description: 'The main structure that holds all components together.',
            details: 'Canyon Endurace CF - Carbon fiber endurance frame'
        },
        'handlebar': {
            title: 'Handlebar',
            description: 'Allows the rider to steer and control the bike. Multiple hand positions for comfort.',
            details: 'Drop bar design for aerodynamic riding positions'
        }
    };
    
    const info = partInfo[part];
    
    if (info) {
        console.log(`\n📍 ${info.title}`);
        console.log(`   ${info.description}`);
        console.log(`   ${info.details}\n`);
        
        // Create/update info panel in DOM
        showInfoPanel(info);
    }
}

// Show info panel on screen
function showInfoPanel(info) {
    // Remove existing panel if any
    const existingPanel = document.getElementById('part-info-panel');
    if (existingPanel) {
        existingPanel.remove();
    }
    
    // Create new info panel
    const panel = document.createElement('div');
    panel.id = 'part-info-panel';
    panel.innerHTML = `
        <div class="info-header">
            <h3>${info.title}</h3>
            <button class="close-btn" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
        <p class="info-description">${info.description}</p>
        <p class="info-details">${info.details}</p>
    `;
    
    document.getElementById('canvas-container').appendChild(panel);
    
    // Also update the descriptive side panel
    updateDescriptiveSidePanel(info);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (panel.parentElement) {
            panel.style.opacity = '0';
            setTimeout(() => panel.remove(), 300);
        }
    }, 5000);
}

// Update Descriptive Side Panel (legacy function - kept for compatibility)
function updateDescriptiveSidePanel(info) {
    const panel = document.getElementById('description-side-panel');
    if (!panel) return;
    
    const header = panel.querySelector('.panel-header');
    const description = panel.querySelector('.panel-description');
    
    if (header) {
        header.textContent = info.title;
    }
    
    if (description) {
        description.textContent = info.description;
    }
    
    // Update image based on part
    const partImages = {
        'Saddle': 'assets/8c89efe7cd63396f9ef63fff39497ad473a2f61e.png',
        'Frame': 'assets/d846e8a4c8a6aa69dbcea502e792010403ef74ac.png',
        'Handlebar': 'assets/8c89efe7cd63396f9ef63fff39497ad473a2f61e.png',
        'Wheel': 'assets/d32a9b6ae2ceeb377159616b20dafde17eb949a2.png',
        'Seat': 'assets/456b7bdbe8fa2952a105b9a319eb61c6d11989f0.png',
        'Crankset': 'assets/821aebfb15d9c00666b19935c3abbaa5fd5bae4c.png',
        'Pedals': 'assets/e18d0296931db098aedcb6900ce9bf28d689533b.png',
        'Brakes': 'assets/6089fd405129d49b01696196eb33d73687ea470e.png',
        'Seat Tubes': 'assets/8424563e3b42c948e1d9fbf864813fa0cc970272.png'
    };
    
    const image = panel.querySelector('.panel-image');
    if (image && partImages[info.title]) {
        image.src = partImages[info.title];
        image.alt = info.title;
    }
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    
    const delta = clock.getDelta();
    
    // Update controls
    controls.update();
    
    // Optional: Add subtle floating animation
    if (bikeModel && CONFIG.autoRotate === false) {
        // Subtle idle animation - base position is lower now
        const baseY = bikeModel.userData.baseY || -0.5;
        bikeModel.position.y = baseY + Math.sin(clock.getElapsedTime() * 0.5) * 0.02;
    }
    
    // Render
    renderer.render(scene, camera);
}

// Handle Window Resize
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight - 50);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Optional: Add keyboard controls
document.addEventListener('keydown', (event) => {
    switch(event.key) {
        case 'r':
        case 'R':
            // Reset camera
            camera.position.set(CONFIG.cameraPosition.x, CONFIG.cameraPosition.y, CONFIG.cameraPosition.z);
            controls.target.set(CONFIG.targetPosition.x, CONFIG.targetPosition.y, CONFIG.targetPosition.z);
            break;
        case 'a':
        case 'A':
            // Toggle auto-rotate
            CONFIG.autoRotate = !CONFIG.autoRotate;
            controls.autoRotate = CONFIG.autoRotate;
            break;
    }
});

// ===== BIKE SIZE CALCULATOR =====

// Initialize bike size calculator
function setupBikeSizeCalculator() {
    const unitButtons = document.querySelectorAll('.unit-btn');
    const calculateBtn = document.querySelector('.calculate-btn');
    const resultDisplay = document.getElementById('bike-size-result');
    let currentUnit = 'inches'; // Default unit
    
    // Unit toggle functionality
    unitButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            unitButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Update current unit
            currentUnit = this.getAttribute('data-unit');
            
            console.log(`Unit changed to: ${currentUnit}`);
        });
    });
    
    // Calculate button functionality
    calculateBtn.addEventListener('click', function() {
        // Get input values
        const footLength = parseFloat(document.getElementById('foot-length').value);
        const inseamLength = parseFloat(document.getElementById('inseam-length').value);
        const armLength = parseFloat(document.getElementById('arm-length').value);
        const lowerLegLength = parseFloat(document.getElementById('lower-leg-length').value);
        
        // Validate inputs
        if (isNaN(footLength) || isNaN(inseamLength) || isNaN(armLength) || isNaN(lowerLegLength)) {
            alert('Please fill in all measurements');
            return;
        }
        
        if (footLength <= 0 || inseamLength <= 0 || armLength <= 0 || lowerLegLength <= 0) {
            alert('Please enter valid positive numbers for all measurements');
            return;
        }
        
        // Calculate bike size
        const bikeSize = calculateBikeSize(footLength, inseamLength, armLength, lowerLegLength, currentUnit);
        
        // Display result
        displayBikeSizeResult(bikeSize, currentUnit);
        
        console.log('Bike size calculated:', bikeSize);
    });
}

// Calculate bike size based on body measurements
function calculateBikeSize(footLength, inseamLength, armLength, lowerLegLength, unit) {
    // Convert to centimeters if needed
    let inseamCM = unit === 'inches' ? inseamLength * 2.54 : inseamLength;
    let armLengthCM = unit === 'inches' ? armLength * 2.54 : armLength;
    let lowerLegCM = unit === 'inches' ? lowerLegLength * 2.54 : lowerLegLength;
    
    // Standard bike sizing formula (primarily based on inseam)
    // Frame size (cm) = Inseam (cm) × 0.67
    // This is a common road bike sizing formula
    const frameSizeCM = inseamCM * 0.67;
    
    // Adjust based on arm length (torso reach consideration)
    // If arms are relatively longer, might prefer slightly larger frame
    const armAdjustment = (armLengthCM - 60) * 0.05; // Assuming 60cm average arm length
    
    // Adjust based on lower leg (for optimal saddle height)
    const legAdjustment = (lowerLegCM - 40) * 0.03; // Assuming 40cm average lower leg
    
    // Calculate final frame size
    let adjustedFrameSize = frameSizeCM + armAdjustment + legAdjustment;
    
    // Clamp to reasonable bike frame sizes (48cm to 62cm for road bikes)
    adjustedFrameSize = Math.max(48, Math.min(62, adjustedFrameSize));
    
    // Determine size category
    let sizeCategory;
    if (adjustedFrameSize < 50) {
        sizeCategory = 'XS (Extra Small)';
    } else if (adjustedFrameSize < 52) {
        sizeCategory = 'S (Small)';
    } else if (adjustedFrameSize < 54) {
        sizeCategory = 'M (Medium)';
    } else if (adjustedFrameSize < 56) {
        sizeCategory = 'M/L (Medium-Large)';
    } else if (adjustedFrameSize < 58) {
        sizeCategory = 'L (Large)';
    } else {
        sizeCategory = 'XL (Extra Large)';
    }
    
    return {
        frameSizeCM: Math.round(adjustedFrameSize * 10) / 10,
        frameSizeInches: Math.round(adjustedFrameSize / 2.54 * 10) / 10,
        category: sizeCategory,
        inseamCM: Math.round(inseamCM * 10) / 10,
        recommendedSaddleHeight: Math.round(inseamCM * 0.883 * 10) / 10
    };
}

// Display bike size result
function displayBikeSizeResult(bikeSize, unit) {
    const resultDisplay = document.getElementById('bike-size-result');
    
    const displaySize = unit === 'inches' ? bikeSize.frameSizeInches : bikeSize.frameSizeCM;
    const displayUnit = unit === 'inches' ? 'inches' : 'cm';
    
    resultDisplay.innerHTML = `
        <h4>Your Recommended Bike Size:</h4>
        <div class="bike-size">${displaySize} ${displayUnit}</div>
        <p><strong>Frame Size Category:</strong> ${bikeSize.category}</p>
        <p><strong>Frame Size (cm):</strong> ${bikeSize.frameSizeCM} cm</p>
        <p><strong>Frame Size (inches):</strong> ${bikeSize.frameSizeInches}"</p>
        <p><strong>Recommended Saddle Height:</strong> ${bikeSize.recommendedSaddleHeight} cm</p>
        <p style="margin-top: 10px; font-size: 12px; color: #636363;">
            <em>Note: This is a general recommendation. Professional bike fitting is recommended for optimal comfort and performance.</em>
        </p>
    `;
    
    resultDisplay.classList.add('show');
}

// Call setup function when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setupBikeSizeCalculator();
    console.log('Bike Size Calculator initialized');
});


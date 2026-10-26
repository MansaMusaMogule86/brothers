import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

interface ThreeDExperienceProps {
  onExploreDna?: () => void;
  onExploreBrothers?: () => void;
}

export const ThreeDExperience: React.FC<ThreeDExperienceProps> = ({
  onExploreDna,
  onExploreBrothers,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [controlsCollapsed, setControlsCollapsed] = useState(false);
  const [activePreset, setActivePreset] = useState<'sanctuary' | 'elevated' | 'monolith'>('sanctuary');
  const [rotationSpeed, setRotationSpeed] = useState<number>(0.005);
  const [atmosphere, setAtmosphere] = useState<'dusk' | 'champagne' | 'noir'>('champagne');

  // Mutable refs for Three.js scene
  const sceneRef = useRef<{
    camera: THREE.PerspectiveCamera;
    controls: OrbitControls;
    keyLight: THREE.DirectionalLight;
    ambientLight: THREE.HemisphereLight;
    kineticGroup: THREE.Group;
    ring1: THREE.Mesh;
    ring2: THREE.Mesh;
    coreMesh: THREE.Mesh;
    speedRef: { current: number };
  } | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Software WebGL detector probe
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    // 2. Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
      alpha: true,
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // 3. Scene and Environment
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x101110, 0.05);

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // 4. Camera
    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 1.8, 6.2);

    // 5. Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = !isSoftwareGl;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 + 0.05; // do not go below ground
    controls.minDistance = 3.5;
    controls.maxDistance = 9.5;
    controls.target.set(0, 1.2, 0);

    // 6. Lighting Rig (Warm Key Light + Cool Hemisphere Fill + Rim Light)
    const keyLight = new THREE.DirectionalLight(0xfff1dd, 2.8);
    keyLight.position.set(4, 6, 3);
    keyLight.castShadow = !isSoftwareGl;
    if (keyLight.castShadow) {
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      keyLight.shadow.bias = -0.0005;
      keyLight.shadow.camera.near = 0.5;
      keyLight.shadow.camera.far = 15;
    }
    scene.add(keyLight);

    const ambientLight = new THREE.HemisphereLight(0xb9a17b, 0x101110, 0.9);
    scene.add(ambientLight);

    const rimLight = new THREE.DirectionalLight(0xb9a17b, 1.6);
    rimLight.position.set(-4, 3, -4);
    scene.add(rimLight);

    // 7. Composite Procedural Model (Brothers DNA Architectural Monolith)
    // 3-12 parts assembled into a cohesive luxury kinetic sculpture:
    const kineticGroup = new THREE.Group();
    kineticGroup.position.set(0, 0, 0);
    scene.add(kineticGroup);

    // Reusable Luxury Materials
    const champagneMetalMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xb9a17b,
      metalness: 0.92,
      roughness: 0.18,
      clearcoat: 0.6,
      clearcoatRoughness: 0.1,
    });

    const darkBasaltMaterial = new THREE.MeshStandardMaterial({
      color: 0x1b1d1b,
      roughness: 0.78,
      metalness: 0.25,
    });

    const brushedTitaniumMaterial = new THREE.MeshStandardMaterial({
      color: 0x333533,
      roughness: 0.35,
      metalness: 0.85,
    });

    const glowingCoreMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4c4a8,
      emissive: 0xb9a17b,
      emissiveIntensity: 0.85,
      roughness: 0.2,
      metalness: 0.4,
    });

    // Part 1: Stepped Foundation Plinth (bottom-center flush)
    const baseGeometry = new THREE.CylinderGeometry(2.2, 2.4, 0.12, 48);
    const baseMesh = new THREE.Mesh(baseGeometry, darkBasaltMaterial);
    baseMesh.position.y = 0.06;
    baseMesh.receiveShadow = true;
    kineticGroup.add(baseMesh);

    const subBaseGeometry = new THREE.CylinderGeometry(1.9, 1.9, 0.06, 48);
    const subBaseMesh = new THREE.Mesh(subBaseGeometry, champagneMetalMaterial);
    subBaseMesh.position.y = 0.15;
    kineticGroup.add(subBaseMesh);

    // Part 2: Soft Contact Shadow Plane (procedural canvas radial shadow)
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const ctx = shadowCanvas.getContext('2d')!;
    const gradient = ctx.createRadialGradient(128, 128, 10, 128, 128, 120);
    gradient.addColorStop(0, 'rgba(0, 0, 0, 0.8)');
    gradient.addColorStop(0.5, 'rgba(0, 0, 0, 0.35)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256, 256);

    const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
    shadowTexture.colorSpace = THREE.SRGBColorSpace;
    const shadowGeo = new THREE.PlaneGeometry(5.2, 5.2);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      opacity: 0.75,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = 0.01;
    scene.add(shadowMesh);

    // Part 3: Cardinal Architectural Bronze Guide Rails
    for (let i = 0; i < 4; i++) {
      const angle = (i * Math.PI) / 2;
      const radius = 1.65;
      const railGeo = new THREE.CylinderGeometry(0.02, 0.02, 2.5, 16);
      const rail = new THREE.Mesh(railGeo, champagneMetalMaterial);
      rail.position.set(Math.cos(angle) * radius, 1.35, Math.sin(angle) * radius);
      rail.castShadow = true;
      kineticGroup.add(rail);

      // Top finials
      const finialGeo = new THREE.SphereGeometry(0.045, 16, 16);
      const finial = new THREE.Mesh(finialGeo, champagneMetalMaterial);
      finial.position.set(Math.cos(angle) * radius, 2.6, Math.sin(angle) * radius);
      kineticGroup.add(finial);
    }

    // Part 4: Central Monolith Tower (Beveled Octagonal Column)
    const monolithGeo = new THREE.CylinderGeometry(0.55, 0.7, 1.9, 8);
    const monolithMesh = new THREE.Mesh(monolithGeo, darkBasaltMaterial);
    monolithMesh.position.y = 1.25;
    monolithMesh.castShadow = true;
    monolithMesh.receiveShadow = true;
    kineticGroup.add(monolithMesh);

    // Monolith Brass Accents Bands
    const bandGeo = new THREE.CylinderGeometry(0.62, 0.62, 0.04, 32);
    const band1 = new THREE.Mesh(bandGeo, champagneMetalMaterial);
    band1.position.y = 0.75;
    kineticGroup.add(band1);

    const band2 = new THREE.Mesh(bandGeo, champagneMetalMaterial);
    band2.position.y = 1.75;
    kineticGroup.add(band2);

    // Part 5: Inner Floating Gyroscopic Ring 1
    const ring1Geo = new THREE.TorusGeometry(1.08, 0.035, 24, 72);
    const ring1 = new THREE.Mesh(ring1Geo, champagneMetalMaterial);
    ring1.position.y = 1.3;
    ring1.castShadow = true;
    kineticGroup.add(ring1);

    // Part 6: Outer Gyroscopic Ring 2 (Perpendicular Angle)
    const ring2Geo = new THREE.TorusGeometry(1.35, 0.03, 24, 72);
    const ring2 = new THREE.Mesh(ring2Geo, brushedTitaniumMaterial);
    ring2.position.y = 1.3;
    ring2.rotation.x = Math.PI / 3;
    ring2.castShadow = true;
    kineticGroup.add(ring2);

    // Part 7: Luminous DNA Core (Floating Icosahedron with subtle breathing scale)
    const coreGeo = new THREE.IcosahedronGeometry(0.28, 1);
    const coreMesh = new THREE.Mesh(coreGeo, glowingCoreMaterial);
    coreMesh.position.y = 1.3;
    kineticGroup.add(coreMesh);

    // Part 8: Procedural Luminescent Dust Particles
    const particleCount = 40;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let p = 0; p < particleCount; p++) {
      const pAngle = Math.random() * Math.PI * 2;
      const pRadius = 0.8 + Math.random() * 1.5;
      const pHeight = 0.4 + Math.random() * 2.2;
      particlePositions[p * 3] = Math.cos(pAngle) * pRadius;
      particlePositions[p * 3 + 1] = pHeight;
      particlePositions[p * 3 + 2] = Math.sin(pAngle) * pRadius;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xb9a17b,
      size: 0.045,
      transparent: true,
      opacity: 0.7,
    });
    const particlePoints = new THREE.Points(particleGeo, particleMat);
    kineticGroup.add(particlePoints);

    // Store references for UI interaction and animation
    const speedRef = { current: 0.005 };
    sceneRef.current = {
      camera,
      controls,
      keyLight,
      ambientLight,
      kineticGroup,
      ring1,
      ring2,
      coreMesh,
      speedRef,
    };

    // 8. Lossless Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const tick = () => {
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Kinetic rotation
      const spd = speedRef.current;
      kineticGroup.rotation.y += spd;
      ring1.rotation.x += spd * 1.8;
      ring1.rotation.y += spd * 1.2;
      ring2.rotation.y -= spd * 1.4;
      ring2.rotation.z += spd * 0.9;

      // Subtle biological core breathing
      const breath = 1 + Math.sin(elapsedTime * 1.8) * 0.08;
      coreMesh.scale.set(breath, breath, breath);

      // Controls update with exponential damping
      controls.update();

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(tick);
    };

    tick();

    // 9. Resize Observer
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      controls.dispose();
      renderer.dispose();
      shadowTexture.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Update atmosphere presets
  const setAtmospherePreset = (mode: 'dusk' | 'champagne' | 'noir') => {
    setAtmosphere(mode);
    if (!sceneRef.current) return;
    const { keyLight, ambientLight } = sceneRef.current;
    if (mode === 'champagne') {
      keyLight.color.setHex(0xfff1dd);
      keyLight.intensity = 2.8;
      ambientLight.color.setHex(0xb9a17b);
      ambientLight.intensity = 0.9;
    } else if (mode === 'dusk') {
      keyLight.color.setHex(0xe6915e);
      keyLight.intensity = 2.2;
      ambientLight.color.setHex(0x5c3c2b);
      ambientLight.intensity = 0.6;
    } else if (mode === 'noir') {
      keyLight.color.setHex(0xd0d5db);
      keyLight.intensity = 1.9;
      ambientLight.color.setHex(0x222422);
      ambientLight.intensity = 0.45;
    }
  };

  // Update camera presets smoothly
  const setCameraPreset = (preset: 'sanctuary' | 'elevated' | 'monolith') => {
    setActivePreset(preset);
    if (!sceneRef.current) return;
    const { camera, controls } = sceneRef.current;
    if (preset === 'sanctuary') {
      camera.position.set(0, 1.8, 6.2);
      controls.target.set(0, 1.2, 0);
    } else if (preset === 'elevated') {
      camera.position.set(3.8, 3.4, 4.6);
      controls.target.set(0, 1.0, 0);
    } else if (preset === 'monolith') {
      camera.position.set(0.2, 1.3, 3.8);
      controls.target.set(0, 1.3, 0);
    }
  };

  // Toggle rotation speed
  const toggleRotation = () => {
    if (!sceneRef.current) return;
    const newSpeed = rotationSpeed === 0 ? 0.005 : rotationSpeed === 0.005 ? 0.015 : 0;
    setRotationSpeed(newSpeed);
    sceneRef.current.speedRef.current = newSpeed;
  };

  return (
    <div className="relative w-full h-full min-h-[580px] lg:min-h-[720px] bg-[#101110] overflow-hidden select-none">
      {/* 1. WebGL Canvas Container */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />

      {/* 2. Unified Top Header Overlay (Zero Overlap on Mobile & Desktop) */}
      <div className="absolute top-4 sm:top-8 left-4 sm:left-8 right-4 sm:right-8 z-10 flex items-start justify-between gap-3 pointer-events-none">
        <div className="min-w-0 pr-2">
          <div className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-[#B9A17B]/80 font-mono mb-0.5 truncate">
            SANCTUARY ARCHITECTURE · 30B STREET
          </div>
          <h2 className="text-base sm:text-xl md:text-2xl font-serif tracking-wide text-[#F1EEE8] truncate">
            The Brothers Monolith
          </h2>
          <div className="hidden sm:flex items-center gap-2 mt-1 text-xs text-[#969892]">
            <span>Spatial Prototype</span>
            <span aria-hidden="true">·</span>
            <span>Procedural PBR Lighting</span>
            <span aria-hidden="true">·</span>
            <span>4°C – 70°C Dynamic Range</span>
          </div>
        </div>

        {onExploreDna && (
          <div className="pointer-events-auto shrink-0 pt-0.5">
            <button
              onClick={onExploreDna}
              className="px-3 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-xs uppercase tracking-[0.15em] font-medium text-[#101110] bg-[#B9A17B] hover:bg-[#D4C4A8] transition-colors whitespace-nowrap cursor-pointer shadow-sm"
            >
              Configure DNA
            </button>
          </div>
        )}
      </div>

      {/* 4. Center Instructions Hint (Shown only when controls are collapsed or higher up) */}
      {controlsCollapsed && (
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 pointer-events-none z-10 opacity-60 text-center px-4 w-full">
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#969892]">
            Drag to inspect 360° · Scroll to zoom
          </span>
        </div>
      )}

      {/* 5. Collapsible Bottom Control Dock (Consolidated, Zero Center Viewport Occlusion) */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 w-[94%] max-w-[680px]">
        {/* Collapse / Expand Toggle Button */}
        <div className="flex justify-center mb-1">
          <button
            onClick={() => setControlsCollapsed(!controlsCollapsed)}
            className="px-3 py-1 bg-[#1B1D1B] text-[#969892] hover:text-[#F1EEE8] text-[10px] uppercase tracking-[0.2em] border border-[#B9A17B]/20 transition-all"
            aria-label="Toggle 3D Viewport Controls"
          >
            {controlsCollapsed ? 'Show Viewport Controls ▴' : 'Collapse Viewport Controls ▾'}
          </button>
        </div>

        {/* Floating Horizontal Glassmorphic Control Strip */}
        {!controlsCollapsed && (
          <div className="bg-[#1B1D1B]/95 border border-[#B9A17B]/25 p-3 shadow-2xl flex flex-wrap items-center justify-between gap-3 text-xs">
            {/* Perspective Selector */}
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] uppercase tracking-[0.15em] text-[#969892] mr-1">View</span>
              <button
                onClick={() => setCameraPreset('sanctuary')}
                className={`px-2.5 py-1 text-[11px] tracking-wider uppercase transition-colors ${
                  activePreset === 'sanctuary'
                    ? 'bg-[#B9A17B] text-[#101110] font-medium'
                    : 'text-[#F1EEE8] hover:bg-[#101110]'
                }`}
              >
                Sanctuary
              </button>
              <button
                onClick={() => setCameraPreset('elevated')}
                className={`px-2.5 py-1 text-[11px] tracking-wider uppercase transition-colors ${
                  activePreset === 'elevated'
                    ? 'bg-[#B9A17B] text-[#101110] font-medium'
                    : 'text-[#F1EEE8] hover:bg-[#101110]'
                }`}
              >
                Elevated
              </button>
              <button
                onClick={() => setCameraPreset('monolith')}
                className={`px-2.5 py-1 text-[11px] tracking-wider uppercase transition-colors ${
                  activePreset === 'monolith'
                    ? 'bg-[#B9A17B] text-[#101110] font-medium'
                    : 'text-[#F1EEE8] hover:bg-[#101110]'
                }`}
              >
                Core
              </button>
            </div>

            {/* Atmosphere Presets */}
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] uppercase tracking-[0.15em] text-[#969892] mr-1">Light</span>
              <button
                onClick={() => setAtmospherePreset('champagne')}
                className={`px-2.5 py-1 text-[11px] tracking-wider uppercase transition-colors ${
                  atmosphere === 'champagne'
                    ? 'bg-[#B9A17B] text-[#101110] font-medium'
                    : 'text-[#F1EEE8] hover:bg-[#101110]'
                }`}
              >
                Champagne
              </button>
              <button
                onClick={() => setAtmospherePreset('dusk')}
                className={`px-2.5 py-1 text-[11px] tracking-wider uppercase transition-colors ${
                  atmosphere === 'dusk'
                    ? 'bg-[#B9A17B] text-[#101110] font-medium'
                    : 'text-[#F1EEE8] hover:bg-[#101110]'
                }`}
              >
                Dusk
              </button>
              <button
                onClick={() => setAtmospherePreset('noir')}
                className={`px-2.5 py-1 text-[11px] tracking-wider uppercase transition-colors ${
                  atmosphere === 'noir'
                    ? 'bg-[#B9A17B] text-[#101110] font-medium'
                    : 'text-[#F1EEE8] hover:bg-[#101110]'
                }`}
              >
                Noir
              </button>
            </div>

            {/* Kinetic Motion Toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleRotation}
                className="px-2.5 py-1 text-[11px] uppercase tracking-wider text-[#F1EEE8] bg-[#101110] border border-[#B9A17B]/20 hover:border-[#B9A17B] transition-colors"
              >
                Motion: {rotationSpeed === 0 ? 'Paused' : rotationSpeed === 0.005 ? 'Gentle' : 'Dynamic'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

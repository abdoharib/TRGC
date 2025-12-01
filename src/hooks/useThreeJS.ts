/**
 * useThreeJS Hook
 * Manages Three.js scene initialization and cleanup
 */

import { useEffect, useRef, RefObject } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import type { ThreeJSConfig, LayerConfig } from '../types/components';
import { isMesh } from '../types/components';

export interface UseThreeJSReturn {
  layerGroupRef: RefObject<THREE.Group | null>;
}

/**
 * Custom hook to set up and manage a Three.js scene
 * @param mountRef - Reference to the DOM element to mount the renderer
 * @param config - Configuration options for the scene
 * @param layers - Array of layer configurations
 * @param onLayerClick - Callback when a layer is clicked
 * @returns Reference to the layer group
 */
export function useThreeJS(
  mountRef: RefObject<HTMLDivElement>,
  config: ThreeJSConfig = {},
  layers: LayerConfig[] = [],
  onLayerClick?: (layerId: string) => void
): UseThreeJSReturn {
  const layerGroupRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const {
      cameraPosition = [5, 4, 6],
      fogDensity = 0.05,
      minDistance = 3,
      maxDistance = 15,
      enableShadows = true,
    } = config;

    // Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x1a202c, fogDensity);

    const camera = new THREE.PerspectiveCamera(
      45,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      100
    );
    camera.position.set(...cameraPosition);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit to 2 for performance
    renderer.shadowMap.enabled = enableShadows;
    mountRef.current.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = minDistance;
    controls.maxDistance = maxDistance;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(5, 10, 7);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const spotLight = new THREE.SpotLight(0xE6B37C, 0.6);
    spotLight.position.set(-5, 2, -5);
    scene.add(spotLight);

    // Geometry Generation
    const createCurvedGeometry = (width: number, depth: number, segments: number) => {
      const geometry = new THREE.PlaneGeometry(width, depth, segments, segments);
      const positionAttribute = geometry.attributes.position;

      for (let i = 0; i < positionAttribute.count; i++) {
        const x = positionAttribute.getX(i);
        const y = positionAttribute.getY(i);
        const zOffset = Math.sin(x * 0.8) * 0.5 + Math.cos(y * 0.8) * 0.3;
        positionAttribute.setZ(i, zOffset);
      }

      geometry.computeVertexNormals();
      return geometry;
    };

    const baseGeometry = createCurvedGeometry(6, 4, 64);

    // Layer Creation
    const meshLayers: THREE.Mesh[] = [];
    const layerGroup = new THREE.Group();
    layerGroupRef.current = layerGroup;
    scene.add(layerGroup);

    const createLayer = (layerConfig: LayerConfig) => {
      const { name, color, yPos, type = 'solid' } = layerConfig;
      
      let material: THREE.Material;
      let originalOpacity: number;
      let originalTransparent: boolean;
      
      if (type === 'wireframe') {
        originalOpacity = 0.8;
        originalTransparent = true;
        material = new THREE.MeshBasicMaterial({
          color,
          wireframe: true,
          transparent: true,
          opacity: originalOpacity,
          depthWrite: false // Important for transparency rendering
        });
      } else {
        originalOpacity = type === 'glass' ? 0.7 : 1.0;
        originalTransparent = type === 'glass';
        material = new THREE.MeshStandardMaterial({
          color,
          roughness: 0.4,
          metalness: 0.1,
          side: THREE.DoubleSide,
          transparent: originalTransparent,
          opacity: originalOpacity,
          depthWrite: !originalTransparent // Disable depth write for transparent materials
        });
      }

      const mesh = new THREE.Mesh(baseGeometry, material);
      mesh.rotation.x = -Math.PI / 2;
      mesh.renderOrder = yPos; // Set render order based on layer position
      // Store original material properties
      mesh.userData = { 
        originalY: 0, 
        offsetFactor: yPos, 
        id: name,
        originalOpacity,
        originalTransparent,
        materialType: type
      };
      meshLayers.push(mesh);
      layerGroup.add(mesh);
      return mesh;
    };

    // Create layers from config
    layers.forEach(layer => createLayer(layer));

    // Interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // Function to restore all layers to their original state
    const restoreAllLayers = () => {
      meshLayers.forEach(mesh => {
        const { originalOpacity, originalTransparent } = mesh.userData;
        
        if (mesh.material instanceof THREE.MeshStandardMaterial) {
          mesh.material.emissive.setHex(0x000000);
          mesh.material.transparent = originalTransparent;
          mesh.material.opacity = originalOpacity;
          mesh.material.depthWrite = !originalTransparent;
          mesh.material.needsUpdate = true;
        } else if (mesh.material instanceof THREE.MeshBasicMaterial) {
          mesh.material.transparent = originalTransparent;
          mesh.material.opacity = originalOpacity;
          mesh.material.depthWrite = false;
          mesh.material.needsUpdate = true;
        }
      });
    };

    const onMouseClick = (event: MouseEvent) => {
      if (!mountRef.current) return;
      
      const rect = mountRef.current.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(meshLayers);

      if (intersects.length > 0) {
        const intersectedObject = intersects[0].object;
        
        // Use type guard for safe type narrowing
        if (!isMesh(intersectedObject)) return;
        
        const selectedMesh = intersectedObject;
        const layerId = selectedMesh.userData.id;

        // Set transparency for all layers with higher opacity
        meshLayers.forEach(mesh => {
          if (mesh.material instanceof THREE.MeshStandardMaterial) {
            mesh.material.emissive.setHex(0x000000);
            mesh.material.transparent = true;
            mesh.material.opacity = 0.5; // Higher opacity so layers are more visible
            mesh.material.depthWrite = false; // Critical for proper transparency rendering
            mesh.material.needsUpdate = true;
          } else if (mesh.material instanceof THREE.MeshBasicMaterial) {
            mesh.material.transparent = true;
            mesh.material.opacity = 0.5;
            mesh.material.depthWrite = false;
            mesh.material.needsUpdate = true;
          }
        });

        // Highlight and make selected layer fully opaque
        if (selectedMesh.material instanceof THREE.MeshStandardMaterial) {
          selectedMesh.material.emissive.setHex(0xE6B37C);
          selectedMesh.material.opacity = 1.0;
          selectedMesh.material.depthWrite = true; // Enable for selected layer
          selectedMesh.material.needsUpdate = true;
        } else if (selectedMesh.material instanceof THREE.MeshBasicMaterial) {
          selectedMesh.material.opacity = 0.8;
          selectedMesh.material.needsUpdate = true;
        }

        if (onLayerClick) {
          onLayerClick(layerId);
        }
      } else {
        // Clicked on empty space - restore all layers
        restoreAllLayers();
        if (onLayerClick) {
          onLayerClick('');
        }
      }
    };

    if (mountRef.current) {
      mountRef.current.addEventListener('click', onMouseClick);
    }

    // Animation Loop
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle Resize
    const handleResize = () => {
      if (!mountRef.current) return;
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (mountRef.current) {
        mountRef.current.removeEventListener('click', onMouseClick);
        // Safe removal check
        if (mountRef.current.contains(renderer.domElement)) {
          mountRef.current.removeChild(renderer.domElement);
        }
      }

      cancelAnimationFrame(animationId);
      
      // Dispose resources
      renderer.dispose();
      baseGeometry.dispose();
      meshLayers.forEach(mesh => {
        if (mesh.material) {
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach(mat => mat.dispose());
          } else {
            mesh.material.dispose();
          }
        }
      });
      
      scene.clear();
    };
  }, [mountRef, config, layers, onLayerClick]);

  return { layerGroupRef };
}

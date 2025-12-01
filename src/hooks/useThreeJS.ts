/**
 * useThreeJS Hook
 * Manages Three.js scene initialization and cleanup
 */

import { useEffect, useRef, RefObject } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import type { ThreeJSConfig, LayerConfig } from '../types/components';

export interface UseThreeJSReturn {
  layerGroupRef: RefObject<THREE.Group>;
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
      if (type === 'wireframe') {
        material = new THREE.MeshBasicMaterial({
          color,
          wireframe: true,
          transparent: true,
          opacity: 0.8
        });
      } else {
        material = new THREE.MeshStandardMaterial({
          color,
          roughness: 0.4,
          metalness: 0.1,
          side: THREE.DoubleSide,
          transparent: type === 'glass',
          opacity: type === 'glass' ? 0.7 : 1.0
        });
      }

      const mesh = new THREE.Mesh(baseGeometry, material);
      mesh.rotation.x = -Math.PI / 2;
      mesh.userData = { originalY: 0, offsetFactor: yPos, id: name };
      meshLayers.push(mesh);
      layerGroup.add(mesh);
      return mesh;
    };

    // Create layers from config
    layers.forEach(layer => createLayer(layer));

    // Interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseClick = (event: MouseEvent) => {
      if (!mountRef.current) return;
      
      const rect = mountRef.current.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(meshLayers);

      if (intersects.length > 0) {
        const selectedMesh = intersects[0].object as THREE.Mesh;
        const layerId = selectedMesh.userData.id;

        // Reset emissive
        meshLayers.forEach(l => {
          const mat = l.material as THREE.MeshStandardMaterial;
          if (mat.emissive) {
            mat.emissive.setHex(0x000000);
          }
        });

        // Highlight
        const mat = selectedMesh.material as THREE.MeshStandardMaterial;
        if (mat.emissive) {
          mat.emissive.setHex(0xE6B37C);
        }

        if (onLayerClick) {
          onLayerClick(layerId);
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

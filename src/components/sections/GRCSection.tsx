/**
 * GRC Section Component
 * Interactive 3D visualization of composite material layers using Three.js
 * Based on the working HTML example with curved surfaces and layer annotations
 */

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import type { GRCSectionProps } from '../../types/components';

interface LayerData {
    title: string;
    material: string;
    function: string;
    char: string;
}

const LAYER_DATA: Record<string, LayerData> = {
    finishing: {
        title: "طبقة التشطيب",
        material: "دهان بولي يوريثان، طلاء جيل، أو طلاء معماري",
        function: "الجماليات والحماية (الأشعة فوق البنفسجية / المياه)",
        char: "ملمس ناعم، غير مسامي، تشطيب سلس."
    },
    filling: {
        title: "طبقة الحشو",
        material: "معجون إيبوكسي / ملاط راتنجي",
        function: "تسوية السطح والتنعيم",
        char: "يملأ فراغات الشبكة، سهل الصنفرة."
    },
    mesh: {
        title: "الشبكة المطبوعة ثلاثية الأبعاد",
        material: "بلاستيك حراري PLA / ABS / PETG",
        function: "التثبيت الميكانيكي والسقالات",
        char: "هيكل شبكي، خفيف الوزن."
    },
    gfcr: {
        title: "GFCR (القاعدة)",
        material: "خرسانة مقواة بألياف زجاجية",
        function: "الركيزة الإنشائية",
        char: "قوة شد عالية، مقاوم للحريق."
    }
};

export const GRCSection: React.FC<GRCSectionProps> = ({ className = '' }) => {
    const canvasContainerRef = useRef<HTMLDivElement>(null);
    const labelsContainerRef = useRef<HTMLDivElement>(null);
    const [selectedLayer, setSelectedLayer] = useState<string | null>(null);
    const [explodeValue, setExplodeValue] = useState(1.0);

    // Refs for Three.js objects
    const sceneRef = useRef<THREE.Scene | null>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const controlsRef = useRef<OrbitControls | null>(null);
    const layersRef = useRef<THREE.Mesh[]>([]);
    const currentSelectionRef = useRef<THREE.Mesh | null>(null);
    const animationIdRef = useRef<number | null>(null);
    const explodeValueRef = useRef<number>(1.0); // Track current explode value for animation loop

    useEffect(() => {
        if (!canvasContainerRef.current || !labelsContainerRef.current) return;

        const container = canvasContainerRef.current;
        const labelsContainer = labelsContainerRef.current;

        // Scene setup
        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x1a202c, 0.05);
        sceneRef.current = scene;

        // Camera setup
        const camera = new THREE.PerspectiveCamera(
            45,
            container.clientWidth / container.clientHeight,
            0.1,
            100
        );
        camera.position.set(6, 5, 8);
        cameraRef.current = camera;

        // Renderer setup
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.shadowMap.enabled = true;
        container.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        // Controls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.minDistance = 3;
        controls.maxDistance = 15;
        controlsRef.current = controls;

        // Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        scene.add(ambientLight);

        const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
        dirLight.position.set(5, 10, 7);
        dirLight.castShadow = true;
        scene.add(dirLight);

        const spotLight = new THREE.SpotLight(0x63b3ed, 0.6);
        spotLight.position.set(-5, 2, -5);
        scene.add(spotLight);

        // Geometry generation
        const calculateHeight = (x: number, y: number) =>
            Math.sin(x * 0.8) * 0.5 + Math.cos(y * 0.8) * 0.3;

        function createCurvedGeometry(width: number, depth: number, segments: number) {
            const geometry = new THREE.PlaneGeometry(width, depth, segments, segments);
            const positionAttribute = geometry.attributes.position;

            for (let i = 0; i < positionAttribute.count; i++) {
                const x = positionAttribute.getX(i);
                const y = positionAttribute.getY(i);
                const zOffset = calculateHeight(x, y);
                positionAttribute.setZ(i, zOffset);
            }

            geometry.computeVertexNormals();
            return geometry;
        }

        const baseGeometry = createCurvedGeometry(6, 4, 64);
        const layerGroup = new THREE.Group();
        scene.add(layerGroup);

        // Layer creation
        const layers: THREE.Mesh[] = [];
        const layerLabels: Array<{
            element: HTMLDivElement;
            mesh: THREE.Mesh;
            localPoint: THREE.Vector3;
        }> = [];

        function createLayer(
            id: string,
            color: number,
            yPos: number,
            type: 'solid' | 'wireframe' | 'glass' = 'solid'
        ) {
            let material: THREE.Material;

            if (type === 'wireframe') {
                material = new THREE.MeshBasicMaterial({
                    color: color,
                    wireframe: true,
                    transparent: true,
                    opacity: 0.8
                });
            } else {
                material = new THREE.MeshStandardMaterial({
                    color: color,
                    roughness: 0.4,
                    metalness: 0.1,
                    side: THREE.DoubleSide,
                    transparent: type === 'glass',
                    opacity: type === 'glass' ? 0.7 : 1.0
                });
            }

            const mesh = new THREE.Mesh(baseGeometry, material);
            mesh.rotation.x = -Math.PI / 2;

            mesh.userData = {
                originalY: 0,
                offsetFactor: yPos,
                id: id,
                originalColor: color,
                materialType: type
            };

            // Add dotted line
            // Note: mesh is rotated -90° on X axis, so Y becomes Z in local space
            const attachX = 3;
            const attachZ = 0;  // This will be Y in world space after rotation
            const attachY = calculateHeight(attachX, attachZ);  // This will be Z in world space after rotation

            const linePoints = [];
            linePoints.push(new THREE.Vector3(attachX, attachY, attachZ));
            linePoints.push(new THREE.Vector3(attachX + 1.5, attachY, attachZ));

            const lineGeometry = new THREE.BufferGeometry().setFromPoints(linePoints);
            const lineMaterial = new THREE.LineDashedMaterial({
                color: 0xffffff,
                dashSize: 0.2,
                gapSize: 0.1,
                opacity: 0.6,
                transparent: true
            });

            const line = new THREE.Line(lineGeometry, lineMaterial);
            line.computeLineDistances();
            mesh.add(line);

            // Create HTML label
            const div = document.createElement('div');
            div.className = 'absolute bg-black/60 text-white px-3 py-1 rounded text-xs font-bold pointer-events-none whitespace-nowrap border-l-[3px] border-blue-400 transition-opacity duration-200 shadow-lg';
            div.style.opacity = '0';
            div.style.zIndex = '10';
            div.textContent = LAYER_DATA[id].title;
            labelsContainer.appendChild(div);

            // Line tip position in local mesh coordinates
            const lineTipLocal = new THREE.Vector3(attachX + 1.5, attachY, attachZ);

            layerLabels.push({
                element: div,
                mesh: mesh,
                localPoint: lineTipLocal
            });

            layers.push(mesh);
            layerGroup.add(mesh);
            return mesh;
        }

        // Create the 4 layers
        createLayer('gfcr', 0xe2e8f0, 0);
        createLayer('mesh', 0x4a5568, 1, 'wireframe');
        createLayer('filling', 0xa0aec0, 2, 'glass');
        createLayer('finishing', 0xffffff, 3);

        layersRef.current = layers;

        // Interaction logic
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();
        let hoveredMesh: THREE.Mesh | null = null;

        function onMouseMove(event: MouseEvent) {
            const rect = renderer.domElement.getBoundingClientRect();
            mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(layers);

            // Reset previous hover
            if (hoveredMesh && hoveredMesh !== currentSelectionRef.current) {
                const mat = hoveredMesh.material as THREE.MeshStandardMaterial | THREE.MeshBasicMaterial;
                const materialType = hoveredMesh.userData.materialType;

                if (materialType === 'wireframe') {
                    // Reset wireframe color
                    (mat as THREE.MeshBasicMaterial).color.setHex(hoveredMesh.userData.originalColor);
                } else if ((mat as THREE.MeshStandardMaterial).emissive) {
                    // Reset emissive for standard materials
                    (mat as THREE.MeshStandardMaterial).emissive.setHex(0x000000);
                }
                renderer.domElement.style.cursor = 'default';
            }

            // Apply hover effect
            if (intersects.length > 0) {
                const newHoveredMesh = intersects[0].object as THREE.Mesh;

                if (newHoveredMesh !== currentSelectionRef.current) {
                    const mat = newHoveredMesh.material as THREE.MeshStandardMaterial | THREE.MeshBasicMaterial;
                    const materialType = newHoveredMesh.userData.materialType;

                    if (materialType === 'wireframe') {
                        // Brighten wireframe on hover
                        (mat as THREE.MeshBasicMaterial).color.setHex(0x6b9ac4); // Lighter blue for wireframe hover
                    } else if ((mat as THREE.MeshStandardMaterial).emissive) {
                        (mat as THREE.MeshStandardMaterial).emissive.setHex(0x1a5490); // Subtle blue glow on hover
                    }
                }

                hoveredMesh = newHoveredMesh;
                renderer.domElement.style.cursor = 'pointer';
            } else {
                hoveredMesh = null;
                renderer.domElement.style.cursor = 'default';
            }
        }

        function onMouseClick(event: MouseEvent) {
            const rect = renderer.domElement.getBoundingClientRect();
            mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(layers);

            if (intersects.length > 0) {
                const selectedMesh = intersects[0].object as THREE.Mesh;
                const layerId = selectedMesh.userData.id;

                // Clear previous selection
                if (currentSelectionRef.current) {
                    const mat = currentSelectionRef.current.material as THREE.MeshStandardMaterial | THREE.MeshBasicMaterial;
                    const materialType = currentSelectionRef.current.userData.materialType;

                    if (materialType === 'wireframe') {
                        // Reset wireframe to original color
                        (mat as THREE.MeshBasicMaterial).color.setHex(currentSelectionRef.current.userData.originalColor);
                    } else if ((mat as THREE.MeshStandardMaterial).emissive) {
                        (mat as THREE.MeshStandardMaterial).emissive.setHex(0x000000);
                    }
                }

                // Highlight selected layer
                const selectedMat = selectedMesh.material as THREE.MeshStandardMaterial | THREE.MeshBasicMaterial;
                const materialType = selectedMesh.userData.materialType;

                if (materialType === 'wireframe') {
                    // Bright color for wireframe selection
                    (selectedMat as THREE.MeshBasicMaterial).color.setHex(0x63b3ed); // Bright blue for selection
                } else if ((selectedMat as THREE.MeshStandardMaterial).emissive) {
                    (selectedMat as THREE.MeshStandardMaterial).emissive.setHex(0x3182ce); // Brighter blue for selection
                }

                currentSelectionRef.current = selectedMesh;
                setSelectedLayer(layerId);
            }
        }

        container.addEventListener('mousemove', onMouseMove);
        container.addEventListener('click', onMouseClick);

        // Animation loop
        const tempV = new THREE.Vector3();

        function animate() {
            animationIdRef.current = requestAnimationFrame(animate);
            controls.update();

            // Handle exploded view
            const currentExplodeValue = explodeValueRef.current;
            layers.forEach(mesh => {
                const targetY = mesh.userData.offsetFactor * currentExplodeValue;
                mesh.position.y += (targetY - mesh.position.y) * 0.1;
            });

            // Update labels - Show labels when explode value is active
            const showLabels = currentExplodeValue > 0;

            layerLabels.forEach(labelObj => {
                tempV.copy(labelObj.localPoint);
                tempV.applyMatrix4(labelObj.mesh.matrixWorld);
                tempV.project(camera);

                // Check if point is in front of camera
                const isInFront = tempV.z < 1;

                if (isInFront && showLabels) {
                    const x = (tempV.x * 0.5 + 0.5) * container.clientWidth;
                    const y = (tempV.y * -0.5 + 0.5) * container.clientHeight;

                    labelObj.element.style.transform = `translate(${x + 10}px, ${y - 10}px)`;
                    labelObj.element.style.opacity = '1';
                    labelObj.element.style.visibility = 'visible';
                } else {
                    labelObj.element.style.opacity = '0';
                    labelObj.element.style.visibility = 'hidden';
                }
            });

            renderer.render(scene, camera);
        }

        animate();

        // Handle resize
        const handleResize = () => {
            if (!container || !camera || !renderer) return;
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            container.removeEventListener('mousemove', onMouseMove);
            container.removeEventListener('click', onMouseClick);

            if (animationIdRef.current) {
                cancelAnimationFrame(animationIdRef.current);
            }

            if (renderer) {
                container.removeChild(renderer.domElement);
                renderer.dispose();
            }

            // Clean up labels
            while (labelsContainer.firstChild) {
                labelsContainer.removeChild(labelsContainer.firstChild);
            }
        };
    }, []);

    // Update explode value ref when state changes
    useEffect(() => {
        explodeValueRef.current = explodeValue;
    }, [explodeValue]);

    return (
        <section id="grc" className={`py-24 bg-neutral-50 relative overflow-hidden ${className}`}>
            {/* Background pattern */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: 'radial-gradient(#1B2A4E 1px, transparent 1px)',
                    backgroundSize: '30px 30px'
                }}
            />

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-bold text-primary mb-4">
                        ما هو الـ <span className="text-secondary">GRC</span> ؟
                    </h2>
                    <div className="w-24 h-1 bg-secondary mx-auto rounded-full" />
                </motion.div>

                {/* 3D Canvas Area */}
                <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-800">
                    <div className="relative">
                        <div
                            ref={canvasContainerRef}
                            className="relative w-full bg-gradient-to-b from-[#2d3748] to-[#1a202c]"
                            style={{ height: '60vh', minHeight: '400px' }}
                        >
                            {/* Overlay UI controls */}
                            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-[#1a202c]/80 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/10 flex items-center gap-4 z-10">
                                <span className="text-xs font-bold text-gray-400 uppercase">تفكيك الطبقات</span>
                                <style>{`
                                    .layer-slider {
                                        -webkit-appearance: none;
                                        appearance: none;
                                        width: 160px;
                                        height: 6px;
                                        border-radius: 5px;
                                        background: linear-gradient(to right, #4A5568 0%, #FF6B35 100%);
                                        outline: none;
                                        opacity: 0.9;
                                        transition: opacity 0.2s;
                                    }
                                    
                                    .layer-slider:hover {
                                        opacity: 1;
                                    }
                                    
                                    .layer-slider::-webkit-slider-thumb {
                                        -webkit-appearance: none;
                                        appearance: none;
                                        width: 18px;
                                        height: 18px;
                                        border-radius: 50%;
                                        background: #FF6B35;
                                        cursor: pointer;
                                        border: 2px solid white;
                                        box-shadow: 0 0 8px rgba(255, 107, 53, 0.6);
                                        transition: all 0.2s;
                                    }
                                    
                                    .layer-slider::-webkit-slider-thumb:hover {
                                        transform: scale(1.1);
                                        box-shadow: 0 0 12px rgba(255, 107, 53, 0.8);
                                    }
                                    
                                    .layer-slider::-moz-range-thumb {
                                        width: 18px;
                                        height: 18px;
                                        border-radius: 50%;
                                        background: #FF6B35;
                                        cursor: pointer;
                                        border: 2px solid white;
                                        box-shadow: 0 0 8px rgba(255, 107, 53, 0.6);
                                        transition: all 0.2s;
                                    }
                                    
                                    .layer-slider::-moz-range-thumb:hover {
                                        transform: scale(1.1);
                                        box-shadow: 0 0 12px rgba(255, 107, 53, 0.8);
                                    }
                                    
                                    .layer-slider::-moz-range-track {
                                        width: 100%;
                                        height: 6px;
                                        cursor: pointer;
                                        background: linear-gradient(to right, #4A5568 0%, #FF6B35 100%);
                                        border-radius: 5px;
                                    }
                                    
                                    @media (max-width: 768px) {
                                        .layer-slider {
                                            width: 128px;
                                        }
                                    }
                                `}</style>
                                <input
                                    type="range"
                                    min="0"
                                    max="2"
                                    step="0.01"
                                    value={explodeValue}
                                    onChange={(e) => setExplodeValue(parseFloat(e.target.value))}
                                    className="layer-slider"
                                />
                            </div>
                        </div>

                        {/* Labels Container - positioned outside overflow container */}
                        <div
                            ref={labelsContainerRef}
                            className="absolute pointer-events-none z-30"
                            style={{
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '60vh',
                                minHeight: '400px',
                                overflow: 'visible'
                            }}
                        />
                    </div>

                    {/* Info Section */}
                    <div className="flex flex-col md:flex-row gap-8 bg-gray-900 p-6 md:p-8">
                        {/* Header */}
                        <div className="md:w-1/3">
                            <h3 className="text-2xl md:text-3xl font-bold mb-2 text-blue-400">
                                الهيكل المركب
                            </h3>
                            <p className="text-gray-400 mb-4 text-sm md:text-base">
                                تصور ثلاثي الأبعاد تفاعلي.
                                <br />
                                انقر بزر الماوس الأيسر + اسحب للتدوير. قم بالتمرير للتكبير.
                                <br />
                                <strong>انقر على طبقة للفحص.</strong>
                            </p>

                            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 text-sm text-gray-400">
                                <h4 className="font-bold text-white mb-2">ملاحظة تقنية:</h4>
                                <p>
                                    يستخدم هذا التصور تشوهًا جيبيًا على مستويات ثلاثية الأبعاد لمحاكاة الأشكال المعمارية "ذات الشكل الحر" التي تمكنها الخرسانة المقواة المطبوعة ثلاثية الأبعاد.
                                </p>
                            </div>
                        </div>

                        {/* Dynamic Info Panel */}
                        <div className="md:w-2/3 w-full max-w-2xl bg-gray-800 rounded-xl p-6 md:p-8 shadow-2xl border border-gray-700">
                            {selectedLayer ? (
                                <motion.div
                                    key={selectedLayer}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="animate-fade-in"
                                >
                                    <h2 className="text-xl md:text-2xl font-bold text-white mb-4 border-b border-gray-600 pb-2">
                                        {LAYER_DATA[selectedLayer]?.title || 'طبقة غير معروفة'}
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div>
                                            <span className="text-xs uppercase tracking-wider text-blue-400 font-semibold">
                                                المادة
                                            </span>
                                            <p className="text-gray-300 mt-1 text-sm">
                                                {LAYER_DATA[selectedLayer]?.material}
                                            </p>
                                        </div>
                                        <div>
                                            <span className="text-xs uppercase tracking-wider text-green-400 font-semibold">
                                                الوظيفة
                                            </span>
                                            <p className="text-gray-300 mt-1 text-sm">
                                                {LAYER_DATA[selectedLayer]?.function}
                                            </p>
                                        </div>
                                        <div>
                                            <span className="text-xs uppercase tracking-wider text-purple-400 font-semibold">
                                                الخصائص
                                            </span>
                                            <p className="text-gray-300 mt-1 text-sm">
                                                {LAYER_DATA[selectedLayer]?.char}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-300 mb-2">اختر طبقة</h3>
                                    <p className="text-gray-500">
                                        انقر على أي طبقة في العرض ثلاثي الأبعاد أعلاه لرؤية مواصفات المواد والغرض الهندسي.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

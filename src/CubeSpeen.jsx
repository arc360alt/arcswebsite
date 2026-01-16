import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function RainbowCube() {
  const [showCube, setShowCube] = useState(false);
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const animationIdRef = useRef(null);
  
  const rainbowActive = useRef(true);
  const colorSpeed = useRef(0.005);
  const rotationSpeed = useRef(0.01);
  const hueOffset = useRef(0);

  useEffect(() => {
    // Wait 2 seconds before showing the cube
    const timer = setTimeout(() => {
      setShowCube(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showCube || !mountRef.current || sceneRef.current) return;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Cube geometry and materials
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const materials = [
      new THREE.MeshBasicMaterial({ color: 0xff0000 }),
      new THREE.MeshBasicMaterial({ color: 0xff7f00 }),
      new THREE.MeshBasicMaterial({ color: 0xffff00 }),
      new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
      new THREE.MeshBasicMaterial({ color: 0x0000ff }),
      new THREE.MeshBasicMaterial({ color: 0x8b00ff }),
    ];
    const cube = new THREE.Mesh(geometry, materials);
    scene.add(cube);

    // Reset colors function
    const resetColors = () => {
      materials[0].color.setHex(0xff0000);
      materials[1].color.setHex(0xff7f00);
      materials[2].color.setHex(0xffff00);
      materials[3].color.setHex(0x00ff00);
      materials[4].color.setHex(0x0000ff);
      materials[5].color.setHex(0x8b00ff);
      hueOffset.current = 0;
    };

    // Keyboard handler
    const onKeyDown = (e) => {
      switch (e.code) {
        case 'Space':
          e.preventDefault();
          rainbowActive.current = !rainbowActive.current;
          if (!rainbowActive.current) resetColors();
          break;
        case 'KeyW':
          e.preventDefault();
          colorSpeed.current = Math.min(colorSpeed.current + 0.002, 0.05);
          break;
        case 'KeyS':
          e.preventDefault();
          colorSpeed.current = Math.max(colorSpeed.current - 0.002, 0.0001);
          break;
        case 'ArrowUp':
          e.preventDefault();
          rotationSpeed.current = Math.min(rotationSpeed.current + 0.005, 0.5);
          break;
        case 'ArrowDown':
          e.preventDefault();
          rotationSpeed.current = Math.max(rotationSpeed.current - 0.005, 0);
          break;
        case 'KeyR':
          e.preventDefault();
          rainbowActive.current = false;
          resetColors();
          break;
      }
    };

    // Resize handler
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);

      cube.rotation.x += rotationSpeed.current;
      cube.rotation.y += rotationSpeed.current;

      if (rainbowActive.current) {
        hueOffset.current += colorSpeed.current;
        materials.forEach((material, i) => {
          const hue = (hueOffset.current + i * 0.16) % 1;
          material.color.setHSL(hue, 1, 0.5);
        });
      }

      renderer.render(scene, camera);
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', onResize);
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', onResize);
      
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      geometry.dispose();
      materials.forEach(m => m.dispose());
      renderer.dispose();
      sceneRef.current = null;
    };
  }, [showCube]);

  return <div ref={mountRef} className="w-full h-screen bg-black" />;
}
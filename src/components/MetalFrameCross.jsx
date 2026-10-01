import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export const MetalFrameCross = ({
  onLoadingComplete,
  minDuration = 1200,
  background = '#F4F1ED',
  baseColor = 0xa8693a,
}) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [fadingOut, setFadingOut] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Minimum display timer
    const startTime = Date.now();

    // Setup Three.js scene
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(background);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Lights
    const ambientLight = new THREE.AmbientLight(0xfff5ea, 1.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.0);
    dirLight1.position.set(5, 10, 7);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xa8693a, 1.5);
    dirLight2.position.set(-5, -5, -5);
    scene.add(dirLight2);

    // Group for the Metal Cross
    const crossGroup = new THREE.Group();

    // Create metal frame geometry (Cross shape with inner cutout frame)
    const createFrameArm = (w, h, d) => {
      const armGroup = new THREE.Group();
      
      const outerGeo = new THREE.BoxGeometry(w, h, d);
      const outerMat = new THREE.MeshStandardMaterial({
        color: baseColor,
        metalness: 0.85,
        roughness: 0.25,
      });
      const outerMesh = new THREE.Mesh(outerGeo, outerMat);
      armGroup.add(outerMesh);

      // Inner subtle accent bevel/beam
      const innerGeo = new THREE.BoxGeometry(w * 0.82, h * 0.82, d * 1.05);
      const innerMat = new THREE.MeshStandardMaterial({
        color: 0x2b2623,
        metalness: 0.9,
        roughness: 0.4,
      });
      const innerMesh = new THREE.Mesh(innerGeo, innerMat);
      armGroup.add(innerMesh);

      return armGroup;
    };

    // Vertical Arm
    const vArm = createFrameArm(0.7, 3.2, 0.7);
    crossGroup.add(vArm);

    // Horizontal Arm
    const hArm = createFrameArm(3.2, 0.7, 0.7);
    crossGroup.add(hArm);

    // Corner studs / metallic rivets for detailed editorial texture
    const studGeo = new THREE.SphereGeometry(0.12, 16, 16);
    const studMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.9,
      roughness: 0.2,
    });

    const positions = [
      [0.9, 0.9, 0.4],
      [-0.9, 0.9, 0.4],
      [0.9, -0.9, 0.4],
      [-0.9, -0.9, 0.4],
    ];

    positions.forEach(([x, y, z]) => {
      const stud = new THREE.Mesh(studGeo, studMat);
      stud.position.set(x, y, z);
      crossGroup.add(stud);
    });

    scene.add(crossGroup);

    // Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const renderLoop = () => {
      const elapsedTime = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        crossGroup.rotation.x = Math.sin(elapsedTime * 0.8) * 0.25 + 0.2;
        crossGroup.rotation.y = elapsedTime * 1.2;
        crossGroup.rotation.z = Math.cos(elapsedTime * 0.6) * 0.15;
        crossGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.1;
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Handle timer for finishing loader
    const elapsed = Date.now() - startTime;
    const remainingTime = Math.max(0, minDuration - elapsed);

    const timer = setTimeout(() => {
      setFadingOut(true);
      setTimeout(() => {
        setHidden(true);
        if (onLoadingComplete) onLoadingComplete();
      }, 500); // 500ms fade transition
    }, remainingTime);

    // Cleanup
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);

      // Dispose WebGL resources
      renderer.dispose();
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach((mat) => mat.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
    };
  }, [minDuration, background, baseColor, onLoadingComplete]);

  if (hidden) return null;

  return (
    <div
      ref={containerRef}
      className={`loader-overlay ${fadingOut ? 'loader-fade-out' : ''}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 9999,
        backgroundColor: background,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'opacity 0.5s ease, visibility 0.5s ease',
        opacity: fadingOut ? 0 : 1,
        pointerEvents: fadingOut ? 'none' : 'all',
      }}
    >
      <canvas ref={canvasRef} style={{ width: '280px', height: '280px' }} />
      <div className="loader-brand" style={{ marginTop: '1.5rem', textAlign: 'center' }}>
        <span
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '0.85rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: '#2B2623',
            fontWeight: 600,
          }}
        >
          PRANAV SRIKRISHNAN
        </span>
        <div
          style={{
            fontSize: '0.7rem',
            letterSpacing: '0.15em',
            color: '#a8693a',
            marginTop: '0.25rem',
            textTransform: 'uppercase',
          }}
        >
          Portfolio 2026
        </div>
      </div>
    </div>
  );
};

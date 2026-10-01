import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export const PlateStack = ({
  onLoadingComplete,
  minDuration = 1200,
  background = '#F4F1ED',
  baseColor = '#3A332E',
  accentColor = '#a8693a',
  speed = 1.0,
  distance = 1.0,
  stack = 5,
  width = 300,
  height = 300,
  style = {},
}) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [fadingOut, setFadingOut] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const startTime = Date.now();

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const canvasWidth = width;
    const canvasHeight = height;

    const scene = new THREE.Scene();
    scene.background = null; // Transparent canvas over ivory container

    const camera = new THREE.PerspectiveCamera(45, canvasWidth / canvasHeight, 0.1, 1000);
    camera.position.set(0, 0, 7 * distance);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(canvasWidth, canvasHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xfff5ea, 2.2);
    dirLight1.position.set(5, 8, 6);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(THREE.Color.NAMES[accentColor] || accentColor, 1.2);
    dirLight2.position.set(-4, -4, -4);
    scene.add(dirLight2);

    // Group of stacked plates
    const stackGroup = new THREE.Group();
    const plates = [];

    const parsedBaseColor = new THREE.Color(baseColor);
    const parsedAccentColor = new THREE.Color(accentColor);

    const numPlates = stack;
    const plateWidth = 2.4;
    const plateHeight = 0.12;
    const plateDepth = 1.6;

    for (let i = 0; i < numPlates; i++) {
      const isTop = i === numPlates - 1;
      const plateGeo = new THREE.BoxGeometry(plateWidth, plateHeight, plateDepth);
      
      const plateMat = new THREE.MeshStandardMaterial({
        color: isTop ? parsedAccentColor : parsedBaseColor,
        metalness: isTop ? 0.6 : 0.8,
        roughness: isTop ? 0.3 : 0.25,
      });

      const mesh = new THREE.Mesh(plateGeo, plateMat);
      mesh.position.y = (i - numPlates / 2) * 0.18;
      mesh.rotation.y = (i * 0.08);

      stackGroup.add(mesh);
      plates.push(mesh);
    }

    scene.add(stackGroup);

    // WebGL animation loop
    let animationFrameId;
    const clock = new THREE.Clock();

    const renderLoop = () => {
      const elapsed = clock.getElapsedTime() * speed;

      if (!prefersReducedMotion) {
        stackGroup.rotation.y = elapsed * 0.9;
        stackGroup.rotation.x = Math.sin(elapsed * 0.6) * 0.2 + 0.15;

        // Fan / Deal oscillation of plates
        plates.forEach((plate, i) => {
          const wave = Math.sin(elapsed * 1.5 + i * 0.4);
          plate.rotation.y = (i * 0.12) + wave * 0.15;
          plate.position.x = Math.cos(elapsed * 1.2 + i * 0.3) * 0.08 * (i + 1);
        });
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    // Timer logic
    const elapsedMs = Date.now() - startTime;
    const remainingTime = Math.max(0, minDuration - elapsedMs);

    const timer = setTimeout(() => {
      setFadingOut(true);
      setTimeout(() => {
        setHidden(true);
        if (onLoadingComplete) onLoadingComplete();
      }, 500);
    }, remainingTime);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
          else obj.material.dispose();
        }
      });
    };
  }, [minDuration, background, baseColor, accentColor, speed, distance, stack, width, height, onLoadingComplete]);

  if (hidden) return null;

  return (
    <div
      ref={containerRef}
      className={`plate-stack-loader ${fadingOut ? 'loader-fade-out' : ''}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 99999,
        backgroundColor: background,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'opacity 0.5s ease, visibility 0.5s ease',
        opacity: fadingOut ? 0 : 1,
        pointerEvents: fadingOut ? 'none' : 'all',
        ...style,
      }}
    >
      <canvas ref={canvasRef} style={{ width: `${width}px`, height: `${height}px` }} />
      <div style={{ marginTop: '1.25rem', textAlign: 'center' }}>
        <h1
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '0.9rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#2B2623',
            fontWeight: 600,
            margin: 0,
          }}
        >
          PRANAV SRIKRISHNAN
        </h1>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.7rem',
            letterSpacing: '0.15em',
            color: '#a8693a',
            marginTop: '0.35rem',
            textTransform: 'uppercase',
            fontWeight: 500,
          }}
        >
          AI / ML / SOFTWARE
        </p>
      </div>
    </div>
  );
};

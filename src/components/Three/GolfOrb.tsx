import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    THREE: any;
  }
}

const GolfOrb: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !window.THREE) return;

    const THREE = window.THREE;
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 2.5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Golf Ball Geometry (Higher detail for premium look)
    const geometry = new THREE.IcosahedronGeometry(1, 15);
    
    // Custom Shader Material for "Orb" look
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color1: { value: new THREE.Color(0xec4899) }, // Signal Color
        color2: { value: new THREE.Color(0xfacc15) }, // Gold Color
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        uniform float time;
        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          vec3 pos = position;
          // Add subtle displacement
          pos += normal * sin(pos.x * 5.0 + time) * 0.05;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        uniform float time;
        uniform vec3 color1;
        uniform vec3 color2;
        void main() {
          float pulse = (sin(time * 0.5) + 1.0) * 0.5;
          vec3 color = mix(color1, color2, vNormal.y * 0.5 + 0.5);
          float intensity = pow(0.7 - dot(vNormal, vec3(0, 0, 1.0)), 2.0);
          gl_FragColor = vec4(color + intensity * 0.5, 0.8);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
    });

    const orb = new THREE.Mesh(geometry, material);
    scene.add(orb);

    // Wireframe overlay
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.1
    });
    const wireframe = new THREE.Mesh(geometry, wireframeMaterial);
    orb.add(wireframe);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xec4899, 2);
    pointLight.position.set(2, 2, 2);
    scene.add(pointLight);

    // Animation
    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const time = performance.now() * 0.001;
      
      material.uniforms.time.value = time;
      orb.rotation.y += 0.005;
      orb.rotation.z += 0.002;
      
      // Floating motion
      orb.position.y = Math.sin(time * 0.5) * 0.1;
      
      renderer.render(scene, camera);
    };
    animate();

    // Handle Resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full" style={{ minHeight: '400px' }} />;
};

export default GolfOrb;

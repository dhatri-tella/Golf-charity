'use client';

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Float, OrbitControls, Sphere, Plane, Environment, Stars, Box, Torus, Octahedron } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const GolfBall = () => {
  return (
    <Float speed={1.4} rotationIntensity={0.35} floatIntensity={0.5}>
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[0.15, 128, 128]} />
        <meshStandardMaterial color="#F8F8FF" metalness={0.25} roughness={0.15} />
      </mesh>
      <mesh position={[0, -0.15, 0]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.2, 32]} />
        <meshStandardMaterial color="#C8A560" metalness={0.5} roughness={0.35} />
      </mesh>
    </Float>
  );
};

const GolfPin = () => {
  return (
    <group position={[0.9, 0.02, -0.4]}>
      <mesh castShadow>
        <cylinderGeometry args={[0.01, 0.01, 0.8, 16]} />
        <meshStandardMaterial color="#ffffff" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.45, 0]}>
        <coneGeometry args={[0.07, 0.18, 16]} />
        <meshStandardMaterial color="#E11D48" metalness={0.2} roughness={0.3} />
      </mesh>
    </group>
  );
};

const FloatingTrophy = () => {
  return (
    <Float speed={0.8} rotationIntensity={0.2} floatIntensity={0.3}>
      <group position={[-1.2, 0.8, -0.8]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.4, 16]} />
          <meshStandardMaterial color="#FFD700" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0, 0.25, 0]}>
          <boxGeometry args={[0.2, 0.05, 0.15]} />
          <meshStandardMaterial color="#FFD700" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>
    </Float>
  );
};

const FloatingHeart = () => {
  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.4}>
      <group position={[1.5, 1.2, 0.5]}>
        <mesh castShadow>
          <sphereGeometry args={[0.12, 32, 32]} />
          <meshStandardMaterial color="#ff2d70" emissive="#ff2d70" emissiveIntensity={0.2} />
        </mesh>
      </group>
    </Float>
  );
};

const FloatingGeometric = () => {
  const meshRef = React.useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={0.6} rotationIntensity={0.1} floatIntensity={0.2}>
      <mesh ref={meshRef} position={[-0.5, 1.5, 1.2]} castShadow>
        <octahedronGeometry args={[0.1]} />
        <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.1} metalness={0.8} roughness={0.2} />
      </mesh>
    </Float>
  );
};

const FloatingRing = () => {
  return (
    <Float speed={0.9} rotationIntensity={0.3} floatIntensity={0.3}>
      <mesh position={[0.3, 1.8, -1.5]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <torusGeometry args={[0.15, 0.03, 16, 32]} />
        <meshStandardMaterial color="#ff487f" emissive="#ff487f" emissiveIntensity={0.15} metalness={0.6} roughness={0.3} />
      </mesh>
    </Float>
  );
};

const FloatingCube = () => {
  const meshRef = React.useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.4;
    }
  });

  return (
    <Float speed={1.1} rotationIntensity={0.2} floatIntensity={0.4}>
      <mesh ref={meshRef} position={[-1.8, 0.6, 0.3]} castShadow>
        <boxGeometry args={[0.12, 0.12, 0.12]} />
        <meshStandardMaterial color="#ff2d70" emissive="#ff2d70" emissiveIntensity={0.1} metalness={0.7} roughness={0.3} />
      </mesh>
    </Float>
  );
};

const GolfScene = () => {
  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[5, 8, 3]} intensity={0.9} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
      <directionalLight position={[-5, 6, -5]} intensity={0.4} />
      <pointLight position={[0, 5, 0]} intensity={0.3} color="#ff2d70" />

      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#1D7A1D" roughness={0.7} metalness={0.1} />
      </mesh>

      <mesh position={[0.25, 0.01, 0.45]} rotation={[0, Math.PI / 5, 0]}>
        <boxGeometry args={[1.6, 0.02, 0.8]} />
        <meshStandardMaterial color="#2E9B2E" roughness={0.8} metalness={0.04} />
      </mesh>

      <GolfBall />
      <GolfPin />
      <FloatingTrophy />
      <FloatingHeart />
      <FloatingGeometric />
      <FloatingRing />
      <FloatingCube />

      <mesh position={[-0.9, 0.02, 0.8]} rotation={[0, Math.PI / 10, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 0.02, 32]} />
        <meshStandardMaterial color="#FFD163" roughness={0.3} metalness={0.1} />
      </mesh>

      <Stars radius={15} depth={40} count={2500} factor={4} fade />
      <Environment preset="sunset" />
    </>
  );
};

const Golf3DBackground: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`pointer-events-none fixed inset-0 -z-10 ${className}`}>
      <Canvas
        shadows
        camera={{ position: [2, 3, 3], fov: 50 }}
        gl={{ antialias: true }}
      >
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.35} maxPolarAngle={Math.PI / 2.1} minPolarAngle={Math.PI / 2.1} />
        <GolfScene />
      </Canvas>
    </div>
  );
};

export default Golf3DBackground;

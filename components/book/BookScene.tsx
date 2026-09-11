"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles, Stars, Environment } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function RotatingGroup() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.02;
      groupRef.current.rotation.x += delta * 0.01;
    }
  });

  return (
    <group ref={groupRef}>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Sparkles count={200} scale={15} size={2} speed={0.4} opacity={0.3} color="#D9A15C" />
    </group>
  );
}

export default function BookScene() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 40%, #1a0812 0%, #04020a 75%)' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <RotatingGroup />
      </Canvas>
    </div>
  );
}

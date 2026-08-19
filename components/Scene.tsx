"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, RoundedBox, Text, useTexture, MeshTransmissionMaterial } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette, ChromaticAberration } from "@react-three/postprocessing";
import * as THREE from "three";
import { useRef, useEffect, useState, Suspense } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ErrorBoundary } from "./ErrorBoundary";

gsap.registerPlugin(ScrollTrigger);

function IDCard() {
  const photoTexture = useTexture("/images/allan-photo.jpg");

  return (
    <group>
      {/* Main Card */}
      <RoundedBox args={[3.4, 2.1, 0.05]} radius={0.05} smoothness={4}>
        <MeshTransmissionMaterial 
          backside 
          samples={6} 
          thickness={0.5} 
          roughness={0.3} 
          transmission={1.0} 
          ior={1.6} 
          chromaticAberration={0.05} 
          anisotropy={0.1} 
          color="#0f172a" 
        />
      </RoundedBox>
      
      {/* Lanyard Clip Detail */}
      <group position={[0, 1.05, 0]}>
        <mesh position={[0, 0.1, 0]}>
          <boxGeometry args={[0.6, 0.15, 0.1]} />
          <meshStandardMaterial color="#222222" metalness={0.9} roughness={0.4} />
        </mesh>
        <mesh position={[0, 0.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.15, 0.03, 16, 32]} />
          <meshStandardMaterial color="#aaaaaa" metalness={1} roughness={0.2} />
        </mesh>
      </group>

      {/* Front Face Details */}
      <group position={[0, 0, 0.026]}>
        
        {/* Availability Badge */}
        <mesh position={[-0.2, 0.75, -0.001]}>
          <planeGeometry args={[2.1, 0.2]} />
          <meshBasicMaterial color="#1e3a8a" />
        </mesh>
        <Text
          position={[-1.15, 0.75, 0]}
          fontSize={0.065}
          color="#93c5fd"
          anchorX="left"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
        >
          CURRENTLY: B.TECH STUDENT | OPEN TO INTERNSHIPS
        </Text>

        {/* Name */}
        <Text
          position={[-1.2, 0.35, 0]}
          fontSize={0.28}
          color="#ffffff"
          anchorX="left"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
        >
          ALLAN K J
        </Text>
        
        {/* College Name */}
        <Text
          position={[-1.2, -0.1, 0]}
          fontSize={0.11}
          color="#a1a1aa"
          anchorX="left"
          anchorY="middle"
          maxWidth={2}
          lineHeight={1.5}
          font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
        >
          Karunya Institute of Technology and Sciences
        </Text>

        {/* Subtitle */}
        <Text
          position={[-1.2, -0.4, 0]}
          fontSize={0.09}
          color="#3b82f6"
          anchorX="left"
          anchorY="middle"
          maxWidth={2}
          font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
        >
          B.Tech Cybersecurity
        </Text>
        
        {/* Photo Frame / Border (Over 1.0 color to trigger bloom) */}
        <mesh position={[1.0, 0, -0.001]}>
          <planeGeometry args={[0.85, 1.05]} />
          <meshBasicMaterial color={[1.5, 1.5, 1.5] as any} toneMapped={false} />
        </mesh>

        {/* Real Photo Texture */}
        <mesh position={[1.0, 0, 0]}>
          <planeGeometry args={[0.8, 1.0]} />
          <meshBasicMaterial map={photoTexture} toneMapped={false} />
        </mesh>
        
        {/* Bottom Bar Accent (Glowing) */}
        <mesh position={[-0.2, -0.7, 0]}>
          <planeGeometry args={[2.0, 0.05]} />
          <meshBasicMaterial color={[1.2, 1.2, 1.2] as any} toneMapped={false} />
        </mesh>
      </group>

      {/* Back Face Details */}
      <group position={[0, 0, -0.026]} rotation={[0, Math.PI, 0]}>
        {/* Magnetic Stripe */}
        <mesh position={[0, 0.6, 0]}>
          <planeGeometry args={[3.4, 0.4]} />
          <meshBasicMaterial color="#050505" />
        </mesh>
        
        <Text
          position={[0, -0.2, 0]}
          fontSize={0.2}
          color="#888888"
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
        >
          ID: URK25CS6018
        </Text>
      </group>
    </group>
  );
}

function SceneContent() {
  const scrollGroupRef = useRef<THREE.Group>(null);
  const pivotGroupRef = useRef<THREE.Group>(null);
  const idleSwayRef = useRef<gsap.core.Tween | null>(null);
  const handleCardClickRef = useRef<(() => void) | null>(null);
  
  // GSAP scroll and entrance animations
  useEffect(() => {
    if (!scrollGroupRef.current || !pivotGroupRef.current) return;

    const ctx = gsap.context(() => {
      // Refresh ScrollTrigger after a short delay to ensure DOM layout is fully measured
      // This is crucial in Next.js/R3F where canvas mounts independently of the HTML DOM
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 500);

      // 0. Set initial states
      gsap.set(scrollGroupRef.current!.rotation, { x: 0, y: 0, z: 0 });
      gsap.set(scrollGroupRef.current!.position, { x: 0, y: 0, z: 0 });
      gsap.set(scrollGroupRef.current!.scale, { x: 1, y: 1, z: 1 });
      
      // Pivot starts high up for the drop, angled slightly for momentum
      gsap.set(pivotGroupRef.current!.position, { x: 0, y: 5, z: 0 }); 
      gsap.set(pivotGroupRef.current!.rotation, { x: 0, y: 0, z: Math.PI / 16 });

      // 1. ENTRANCE ANIMATION (Fall + Pendulum)
      const enterTl = gsap.timeline({
        onComplete: () => {
          // Check if we are at the top of the page before starting the idle sway
          if (window.scrollY < 50) {
            idleSwayRef.current?.play();
          }
        }
      });
      
      enterTl.to(pivotGroupRef.current!.position, {
        y: 1.05, // Rest position of pivot (shifted up by 1.05 to rotate from top edge)
        duration: 0.7,
        ease: "power2.in"
      });

      const swingDuration = 0.5;
      enterTl.to(pivotGroupRef.current!.rotation, { z: -Math.PI / 12, duration: swingDuration, ease: "sine.inOut" })
             .to(pivotGroupRef.current!.rotation, { z: Math.PI / 20, duration: swingDuration, ease: "sine.inOut" })
             .to(pivotGroupRef.current!.rotation, { z: -Math.PI / 32, duration: swingDuration, ease: "sine.inOut" })
             .to(pivotGroupRef.current!.rotation, { z: Math.PI / 64, duration: swingDuration, ease: "sine.inOut" })
             .to(pivotGroupRef.current!.rotation, { z: 0, duration: swingDuration, ease: "sine.inOut" });

      // 2. IDLE SWAY LOOP
      idleSwayRef.current = gsap.to(pivotGroupRef.current!.rotation, {
        z: Math.PI / 90, // subtle 2 degree sway
        duration: 2.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        paused: true
      });
      
      // 3. SCROLL ANIMATION (Scrubbing across the whole page)
      const stTl = gsap.timeline({
        scrollTrigger: {
          trigger: "#main-scroll-container",
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Cleanly pause the idle sway when scrolling down, resume when at the very top
            if (self.progress > 0.01) {
              if (idleSwayRef.current?.isActive()) {
                idleSwayRef.current.pause();
                gsap.to(pivotGroupRef.current!.rotation, { z: 0, duration: 0.5, ease: "power2.out", overwrite: "auto" });
              }
            } else if (self.progress <= 0.01 && !enterTl.isActive()) {
              if (idleSwayRef.current?.paused()) {
                idleSwayRef.current.play();
              }
            }
          }
        }
      });

      // Animate scale down to 0.25 and DOM opacity down to 0
      stTl.to(scrollGroupRef.current!.scale, { x: 0.25, y: 0.25, z: 0.25 }, 0)
          .to(scrollGroupRef.current!.rotation, { x: -Math.PI / 8, z: Math.PI / 12 }, 0)
          .to("#scene-container", { opacity: 0 }, 0);

      // 4. CLICK HANDLER
      handleCardClickRef.current = () => {
        // Smoothly scroll down past the blank spacer to the content
        window.scrollTo({
          top: window.innerHeight,
          behavior: "smooth"
        });
      };
    });

    return () => {
      ctx.revert();
    };
  }, []); // Empty dependency array removes React state re-renders entirely

  return (
    <>
      <ambientLight intensity={1.5} />
      <directionalLight position={[10, 10, 5]} intensity={2} />
      {/* Blue Rim Light */}
      <spotLight position={[-2, 2, -3]} intensity={20} color="#3b82f6" penumbra={1} distance={15} />
      <pointLight position={[0, 0, -2]} intensity={10} color="#3b82f6" />
      
      <Suspense fallback={null}>
        <Environment preset="city" />
      </Suspense>
      
      <group ref={scrollGroupRef}>
        <group position={[0, 1.05, 0]} ref={pivotGroupRef}>
          <group 
            position={[0, -1.05, 0]} 
            onClick={(e) => {
              e.stopPropagation();
              handleCardClickRef.current?.();
            }}
            onPointerOver={() => document.body.style.cursor = 'pointer'}
            onPointerOut={() => document.body.style.cursor = 'auto'}
          >
            <Suspense fallback={null}>
              <IDCard />
            </Suspense>
          </group>
        </group>
      </group>

      <EffectComposer multisampling={0}>
        {/* Set threshold > 1 so standard text (#ffffff) does NOT bloom, only emissive/overdriven colors do */}
        <Bloom luminanceThreshold={1.2} luminanceSmoothing={0.9} intensity={0.6} />
        <ChromaticAberration offset={new THREE.Vector2(0.0007, 0.0007)} />
        <Vignette eskil={false} offset={0.1} darkness={0.9} />
      </EffectComposer>

      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        autoRotate={false}
        onStart={() => {
          if (idleSwayRef.current?.isActive()) {
            idleSwayRef.current.pause();
            gsap.to(pivotGroupRef.current!.rotation, { z: 0, duration: 0.5, overwrite: "auto" });
          }
        }}
        onEnd={() => {
          // Restart sway after user stops interacting (if at top of page)
          setTimeout(() => {
             if (window.scrollY < 50 && idleSwayRef.current?.paused()) {
                idleSwayRef.current.play();
             }
          }, 2000);
        }}
      />
    </>
  );
}

export default function Scene() {
  return (
    <div className="absolute inset-0 h-full w-full pointer-events-auto" style={{ zIndex: 0 }}>
      <ErrorBoundary>
        <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }}>
          <SceneContent />
        </Canvas>
      </ErrorBoundary>
    </div>
  );
}

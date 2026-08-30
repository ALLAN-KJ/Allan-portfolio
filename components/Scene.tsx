"use client";

import { Canvas, useFrame, useThree, invalidate } from "@react-three/fiber";
import { OrbitControls, Environment, RoundedBox, Text, useTexture, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useRef, useEffect, useState, Suspense } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ErrorBoundary } from "./ErrorBoundary";

gsap.registerPlugin(ScrollTrigger);

function IDCard({ isMobile = false }: { isMobile?: boolean }) {
  const photoTexture = useTexture("/images/allan-photo.jpg");

  return (
    <group>
      {/* Main Card */}
      <RoundedBox args={[3.4, 2.1, 0.05]} radius={0.05} smoothness={4}>
        <MeshTransmissionMaterial
          backside
          samples={isMobile ? 3 : 4}
          resolution={isMobile ? 512 : 768}
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
          color="#D9A15C"
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
          color="#D9A15C"
          anchorX="left"
          anchorY="middle"
          maxWidth={2}
          font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
        >
          B.Tech Cybersecurity
        </Text>

        {/* Photo Frame / Border */}
        <mesh position={[1.0, 0, -0.001]}>
          <planeGeometry args={[0.85, 1.05]} />
          <meshBasicMaterial color={[1.5, 1.5, 1.5] as any} toneMapped={false} />
        </mesh>

        {/* Real Photo Texture */}
        <mesh position={[1.0, 0, 0]}>
          <planeGeometry args={[0.8, 1.0]} />
          <meshBasicMaterial map={photoTexture} toneMapped={false} />
        </mesh>

        {/* Bottom Bar Accent */}
        <mesh position={[-0.2, -0.7, 0]}>
          <planeGeometry args={[2.0, 0.05]} />
          <meshBasicMaterial color={[1.53, 1.134, 0.648] as any} toneMapped={false} />
        </mesh>
      </group>

      {/* Back Face Details */}
      <group position={[0, 0, -0.026]} rotation={[0, Math.PI, 0]}>
        {/* Solid Back Plane (FrontSide only so it's invisible from the front of the glass) */}
        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[3.4, 2.1]} />
          <meshStandardMaterial color="#0C0D12" roughness={0.9} side={THREE.FrontSide} />
        </mesh>

        {/* Magnetic Stripe */}
        <mesh position={[0, 0.6, 0.001]}>
          <planeGeometry args={[3.4, 0.4]} />
          <meshBasicMaterial color="#050505" side={THREE.FrontSide} />
        </mesh>

        {/* Register Number */}
        <Text
          position={[0, -0.2, 0.001]}
          fontSize={0.2}
          color="#D9A15C"
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
          material-side={THREE.FrontSide}
        >
          URK25CS6018
        </Text>
      </group>
    </group>
  );
}

// Helper: fires once after the GL context is ready, then calls ScrollTrigger.refresh
// Also invalidates the frame loop on every scroll event so scrub animations render
function SceneReadyRefresher() {
  const { gl } = useThree();
  const refreshed = useRef(false);

  useEffect(() => {
    const onScroll = () => invalidate();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useFrame(() => {
    if (!refreshed.current && gl.domElement) {
      refreshed.current = true;
      ScrollTrigger.refresh();
    }
  });

  return null;
}

function SceneContent() {
  const scrollGroupRef = useRef<THREE.Group>(null);
  const pivotGroupRef = useRef<THREE.Group>(null);
  const entryGroupRef = useRef<THREE.Group>(null);
  const idleSwayRef = useRef<gsap.core.Tween | null>(null);
  const idleFloatRef = useRef<gsap.core.Tween | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // GSAP animation: Scroll-driven persistent 3D object
  useEffect(() => {
    if (!scrollGroupRef.current || !pivotGroupRef.current || !entryGroupRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      // 1. Initial State
      const initialScale = window.innerWidth < 768 ? 0.75 : 1;
      gsap.set(scrollGroupRef.current!.scale, { x: initialScale, y: initialScale, z: initialScale });
      gsap.set(scrollGroupRef.current!.rotation, { x: 0, y: 0, z: 0 });
      gsap.set(scrollGroupRef.current!.position, { 
        x: window.innerWidth < 768 ? 0 : 2, 
        y: window.innerWidth < 768 ? 1.5 : 0, 
        z: 0 
      });
      
      gsap.set(pivotGroupRef.current!.position, { x: 0, y: 0, z: 0 }); // Rest position
      gsap.set(pivotGroupRef.current!.rotation, { x: 0, y: 0, z: 0 }); // Rest rotation

      if (!prefersReducedMotion) {
        // Entry Drop Animation (Strict vertical fall under gravity, no bounce)
        gsap.fromTo(
          entryGroupRef.current!.position,
          { y: 6 },
          { y: 0, duration: 1.2, ease: "power2.out", delay: 0.5, onUpdate: () => invalidate() }
        );
        
        // Pendulum Swing (Rotational oscillation decaying to stop)
        gsap.fromTo(
          entryGroupRef.current!.rotation,
          { z: Math.PI / 8 },
          { z: 0, duration: 2.5, ease: "elastic.out(1, 0.4)", delay: 0.5, onUpdate: () => invalidate() }
        );
      }

      // 2. Idle Motion (Breathing)
      idleSwayRef.current = gsap.to(pivotGroupRef.current!.rotation, {
        y: Math.PI / 32,
        z: Math.PI / 64,
        duration: 4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        onUpdate: () => invalidate(),
      });

      idleFloatRef.current = gsap.to(pivotGroupRef.current!.position, {
        y: 0.1,
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        onUpdate: () => invalidate(),
      });

      // 3. Scroll-Driven Transform tied perfectly to #hero section
      let mm = gsap.matchMedia();

      mm.add({
        isDesktop: "(min-width: 768px)",
        isMobile: "(max-width: 767px)"
      }, (context) => {
        const { isDesktop } = context.conditions as { isDesktop: boolean };
        
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            end: "bottom top", // Scoped ONLY to hero
            scrub: true,
            invalidateOnRefresh: true,
            onLeave: () => {
              // Fade out scene container completely to prevent overlaps outside hero
              const sceneContainer = document.getElementById("scene-container");
              if (sceneContainer) gsap.to(sceneContainer, { opacity: 0, pointerEvents: "none", duration: 0.2 });
            },
            onEnterBack: () => {
              // Fade it back in when scrolling back into hero
              const sceneContainer = document.getElementById("scene-container");
              if (sceneContainer) gsap.to(sceneContainer, { opacity: 1, duration: 0.2 });
            }
          }
        });

        if (isDesktop && !prefersReducedMotion) {
          const endScale = 0.65;
          // Main Rotation, Scale, and Translation
          tl.to(scrollGroupRef.current!.position, {
            x: 3, // Drift right on desktop
            y: 0.5, // Drift slightly up
            z: -1,
            ease: "none",
          }, 0)
          .to(scrollGroupRef.current!.scale, {
            x: endScale,
            y: endScale,
            z: endScale,
            ease: "none",
          }, 0)
          .to(scrollGroupRef.current!.rotation, {
            x: Math.PI / 12,
            y: Math.PI, // Flip exactly to the back face
            z: -Math.PI / 24,
            ease: "none",
          }, 0);
        } else if (!prefersReducedMotion) {
          // On mobile, stay centered but do the Y flip to show the back face
          tl.to(scrollGroupRef.current!.position, { y: 1 }, 0)
            .to(scrollGroupRef.current!.rotation, {
              x: Math.PI / 12,
              y: Math.PI, // Flip exactly to the back face
              z: -Math.PI / 24,
              ease: "none",
            }, 0);
        }
      });
    });

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <>
      <SceneReadyRefresher />
      <ambientLight intensity={1.5} />
      <directionalLight position={[10, 10, 5]} intensity={2} />
      {/* Amber Rim Light */}
      <spotLight position={[-2, 2, -3]} intensity={20} color="#D9A15C" penumbra={1} distance={15} />
      <pointLight position={[0, 0, -2]} intensity={10} color="#D9A15C" />

      <Suspense fallback={null}>
        <Environment preset="city" />
      </Suspense>

      <group ref={entryGroupRef}>
        <group ref={scrollGroupRef}>
          <group position={[0, 1.05, 0]} ref={pivotGroupRef}>
            <group position={[0, -1.05, 0]}>
              <Suspense fallback={null}>
                <IDCard isMobile={isMobile} />
              </Suspense>
            </group>
          </group>
        </group>
      </group>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
        onStart={() => {
          if (idleSwayRef.current?.isActive()) {
            idleSwayRef.current.pause();
            gsap.to(pivotGroupRef.current!.rotation, { z: 0, duration: 0.5, overwrite: "auto" });
          }
          if (idleFloatRef.current?.isActive()) {
            idleFloatRef.current.pause();
            gsap.to(pivotGroupRef.current!.position, { y: 0, duration: 0.5, overwrite: "auto" });
          }
        }}
        onEnd={() => {
          setTimeout(() => {
            if (idleSwayRef.current?.paused()) idleSwayRef.current.play();
            if (idleFloatRef.current?.paused()) idleFloatRef.current.play();
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
        {/* Cap DPR at 2 */}
        <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 4.5], fov: 45 }} frameloop="demand">
          <SceneContent />
        </Canvas>
      </ErrorBoundary>
    </div>
  );
}

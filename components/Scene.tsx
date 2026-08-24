"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Environment, RoundedBox, Text, useTexture, MeshTransmissionMaterial } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette, ChromaticAberration } from "@react-three/postprocessing";
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
          samples={isMobile ? 3 : 6}
          resolution={isMobile ? 512 : 1024}
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

// Helper: fires once after the GL context is ready, then calls ScrollTrigger.refresh
function SceneReadyRefresher() {
  const { gl } = useThree();
  const refreshed = useRef(false);

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
  const idleSwayRef = useRef<gsap.core.Tween | null>(null);
  const handleCardClickRef = useRef<(() => void) | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // GSAP scroll and entrance animations
  useEffect(() => {
    if (!scrollGroupRef.current || !pivotGroupRef.current) return;

    const ctx = gsap.context(() => {
      // 0. Set initial states
      gsap.set(scrollGroupRef.current!.rotation, { x: 0, y: 0, z: 0 });
      gsap.set(scrollGroupRef.current!.position, { x: 0, y: 0, z: 0 });
      const initialScale = window.innerWidth < 768 ? 0.75 : 1;
      gsap.set(scrollGroupRef.current!.scale, { x: initialScale, y: initialScale, z: initialScale });

      // Pivot starts high up for the drop, angled slightly for momentum
      gsap.set(pivotGroupRef.current!.position, { x: 0, y: 5, z: 0 });
      gsap.set(pivotGroupRef.current!.rotation, { x: 0, y: 0, z: Math.PI / 16 });

      // 1. ENTRANCE ANIMATION (Fall + Pendulum)
      const enterTl = gsap.timeline({
        onComplete: () => {
          // Card has settled. Now reveal the HTML hero content and scroll prompt.
          // This ensures zero overlap: card is fully visible and settled
          // before any HTML text appears over the same screen area.
          const heroContent = document.getElementById("hero-content");
          const scrollPrompt = document.getElementById("scroll-prompt");

          if (heroContent) {
            gsap.to(heroContent, {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: "expo.out",
              onStart: () => {
                heroContent.style.pointerEvents = "auto";
              }
            });
          }

          if (scrollPrompt && window.scrollY < 50) {
            gsap.to(scrollPrompt, {
              opacity: 0.8,
              duration: 0.6,
              ease: "power2.out",
              delay: 0.3
            });
          }

          // Start idle sway only if still at top of page
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
      // Both the 3D card's scale/tilt AND the scene container opacity are driven
      // entirely by scroll position — fully reversible in both directions.
      const sceneContainer = document.getElementById("scene-container");
      if (sceneContainer) {
        gsap.set(sceneContainer, { opacity: 1 });
      }

      const stTl = gsap.timeline({
        scrollTrigger: {
          trigger: "#main-scroll-container",
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const scrollPromptEl = document.getElementById("scroll-prompt");
            if (self.progress > 0.01) {
              // Scrolling down: pause idle sway and hide scroll prompt
              if (idleSwayRef.current?.isActive()) {
                idleSwayRef.current.pause();
                gsap.to(pivotGroupRef.current!.rotation, { z: 0, duration: 0.5, ease: "power2.out", overwrite: "auto" });
              }
              if (scrollPromptEl) {
                gsap.to(scrollPromptEl, { opacity: 0, duration: 0.3, overwrite: "auto" });
              }
            } else if (self.progress <= 0.01 && !enterTl.isActive()) {
              // Back at top and entrance is done: resume idle sway and restore scroll prompt
              if (idleSwayRef.current?.paused()) {
                idleSwayRef.current.play();
              }
              if (scrollPromptEl) {
                gsap.to(scrollPromptEl, { opacity: 0.8, duration: 0.4, overwrite: "auto" });
              }
            }
          }
        }
      });

      // Animate the 3D card: scale down and tilt as user scrolls.
      // Simultaneously fade the scene container so the card is fully invisible at page bottom.
      // Both are scrub-linked — scrolling back up smoothly restores them.
      stTl
        // Card shrinks to near-zero over the full scroll range
        .to(scrollGroupRef.current!.scale, { x: 0.05, y: 0.05, z: 0.05 }, 0)
        .to(scrollGroupRef.current!.rotation, { x: -Math.PI / 8, z: Math.PI / 12 }, 0)
        // Scene container fades: starts fading at 30% scroll, fully gone at 100%
        .fromTo(
          sceneContainer ?? {},
          { opacity: 1 },
          { opacity: 0, ease: "none" },
          0.3
        );

      // 4. CLICK / TAP HANDLER — works for both mouse and touch
      handleCardClickRef.current = () => {
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

  // Touch tap handler for mobile — the R3F onClick fires on pointer events,
  // but we also attach a native touchend to the canvas parent for reliability
  useEffect(() => {
    const canvasParent = document.getElementById('scene-container');
    if (!canvasParent) return;

    const handleTouchEnd = (e: TouchEvent) => {
      // Only trigger if it was a tap (not a scroll gesture)
      if (e.changedTouches.length === 1) {
        handleCardClickRef.current?.();
      }
    };

    canvasParent.addEventListener('touchend', handleTouchEnd, { passive: true });
    return () => canvasParent.removeEventListener('touchend', handleTouchEnd);
  }, []);

  return (
    <>
      <SceneReadyRefresher />
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
              <IDCard isMobile={isMobile} />
            </Suspense>
          </group>
        </group>
      </group>

      {/* Desktop: full postprocessing. Mobile: lighter bloom only, no chromatic aberration */}
      <EffectComposer multisampling={0}>
        <Bloom
          luminanceThreshold={isMobile ? 1.5 : 1.2}
          luminanceSmoothing={0.9}
          intensity={isMobile ? 0.3 : 0.6}
        />
        {!isMobile && (
          <ChromaticAberration offset={new THREE.Vector2(0.0007, 0.0007)} />
        )}
        <Vignette eskil={false} offset={0.1} darkness={isMobile ? 0.7 : 0.9} />
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
        {/* Cap DPR at 2 — Math.min(window.devicePixelRatio, 2) */}
        <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 4.5], fov: 45 }}>
          <SceneContent />
        </Canvas>
      </ErrorBoundary>
    </div>
  );
}


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

  // GSAP animation: three-phase sequence
  // Phase 1 — LANDING:    Card falls, swings, settles. Nothing else visible.
  // Phase 2 — TRANSITION: First scroll/click → card disappears → reappears small → hero fades in.
  // Phase 3 — SCROLL:     ScrollTrigger drives the small card 0.15 → 0 across the full page.
  useEffect(() => {
    if (!scrollGroupRef.current || !pivotGroupRef.current) return;

    // State flags live outside ctx so the cleanup fn can also read them
    let hasTriggered = false;
    let enterTlComplete = false;
    let removeFirstScrollListener: (() => void) | null = null;

    const ctx = gsap.context(() => {
      const initialScale = window.innerWidth < 768 ? 0.75 : 1;
      const sceneContainer = document.getElementById("scene-container");

      // ── 0. Initial states ──────────────────────────────────────────────────
      gsap.set(scrollGroupRef.current!.rotation, { x: 0, y: 0, z: 0 });
      gsap.set(scrollGroupRef.current!.position, { x: 0, y: 0, z: 0 });
      gsap.set(scrollGroupRef.current!.scale, { x: initialScale, y: initialScale, z: initialScale });
      gsap.set(pivotGroupRef.current!.position, { x: 0, y: 5, z: 0 });
      gsap.set(pivotGroupRef.current!.rotation, { x: 0, y: 0, z: Math.PI / 16 });
      if (sceneContainer) gsap.set(sceneContainer, { opacity: 1 });

      // ── setupScrollTrigger ─────────────────────────────────────────────────
      // Called only after the reappear animation finishes (card already at 0.15).
      // GSAP's "to" captures the current scale (0.15) as the from-value, so the
      // scrub drives it cleanly from 0.15 → 0 over the full page length.
      const setupScrollTrigger = () => {
        if (!scrollGroupRef.current) return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: "#main-scroll-container",
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        // Card: 0.15 → 0 (scale captured from current state), with a gentle tilt
        tl.to(scrollGroupRef.current!.scale, { x: 0, y: 0, z: 0, ease: "none" }, 0)
          .to(scrollGroupRef.current!.rotation, { x: -Math.PI / 8, z: Math.PI / 12, ease: "none" }, 0);

        // Scene container fades to 0 in sync with the card disappearing
        if (sceneContainer) {
          tl.to(sceneContainer, { opacity: 0, ease: "none" }, 0);
        }
      };

      // ── triggerTransition ──────────────────────────────────────────────────
      // Fires exactly once on first scroll (> 5 px) or card click.
      const triggerTransition = () => {
        if (hasTriggered) return;
        hasTriggered = true;

        removeFirstScrollListener?.(); // stop listening now

        // Pause idle sway and snap pivot to neutral
        idleSwayRef.current?.pause();
        gsap.to(pivotGroupRef.current!.rotation, { z: 0, duration: 0.2, overwrite: "auto" });

        // Hide scroll prompt immediately
        const scrollPrompt = document.getElementById("scroll-prompt");
        if (scrollPrompt) gsap.to(scrollPrompt, { opacity: 0, duration: 0.2, overwrite: true });

        // Reveal hero HTML content (slight delay so card starts disappearing first)
        const heroContent = document.getElementById("hero-content");
        if (heroContent) {
          heroContent.style.pointerEvents = "auto";
          gsap.to(heroContent, { opacity: 1, y: 0, duration: 0.85, ease: "expo.out", delay: 0.2 });
        }

        // Phase 2a: Card shrinks to nothing (0.28 s) ─────────────────────────
        gsap.to(scrollGroupRef.current!.scale, {
          x: 0, y: 0, z: 0,
          duration: 0.28, ease: "power2.in",
          onComplete: () => {
            // Reset rotation so the reappear is perfectly upright
            gsap.set(pivotGroupRef.current!.rotation, { z: 0 });
            gsap.set(scrollGroupRef.current!.rotation, { x: 0, y: 0, z: 0 });

            // Phase 2b: Card pops back at small background scale (0.38 s) ────
            gsap.to(scrollGroupRef.current!.scale, {
              x: 0.15, y: 0.15, z: 0.15,
              duration: 0.38, ease: "back.out(1.4)",
              onComplete: setupScrollTrigger, // Phase 3 begins here
            });
          },
        });
      };

      // ── 1. ENTRANCE ANIMATION (Fall + Pendulum) ────────────────────────────
      const enterTl = gsap.timeline({
        onComplete: () => {
          enterTlComplete = true;

          // Show "Scroll to explore" prompt (only if still at page top)
          const scrollPrompt = document.getElementById("scroll-prompt");
          if (scrollPrompt && window.scrollY < 50) {
            gsap.to(scrollPrompt, { opacity: 0.8, duration: 0.6, ease: "power2.out" });
          }

          // Start idle sway
          if (window.scrollY < 50) {
            idleSwayRef.current?.play();
          }

          // Edge case: user scrolled during the entrance animation
          if (window.scrollY > 5) {
            triggerTransition();
          }
        },
      });

      enterTl.to(pivotGroupRef.current!.position, {
        y: 1.05, // rest position of pivot
        duration: 0.7,
        ease: "power2.in",
      });

      const swingDuration = 0.5;
      enterTl
        .to(pivotGroupRef.current!.rotation, { z: -Math.PI / 12, duration: swingDuration, ease: "sine.inOut" })
        .to(pivotGroupRef.current!.rotation, { z:  Math.PI / 20, duration: swingDuration, ease: "sine.inOut" })
        .to(pivotGroupRef.current!.rotation, { z: -Math.PI / 32, duration: swingDuration, ease: "sine.inOut" })
        .to(pivotGroupRef.current!.rotation, { z:  Math.PI / 64, duration: swingDuration, ease: "sine.inOut" })
        .to(pivotGroupRef.current!.rotation, { z: 0,             duration: swingDuration, ease: "sine.inOut" });

      // ── 2. IDLE SWAY (paused until entrance completes) ────────────────────
      idleSwayRef.current = gsap.to(pivotGroupRef.current!.rotation, {
        z: Math.PI / 90,
        duration: 2.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        paused: true,
      });

      // ── 3. FIRST SCROLL LISTENER ──────────────────────────────────────────
      // Waits for entrance to finish (enterTlComplete) before triggering.
      const handleFirstScroll = () => {
        if (window.scrollY > 5 && enterTlComplete) {
          triggerTransition();
        }
      };
      window.addEventListener("scroll", handleFirstScroll, { passive: true });
      removeFirstScrollListener = () => window.removeEventListener("scroll", handleFirstScroll);

      // ── 4. CLICK / TAP HANDLER ────────────────────────────────────────────
      handleCardClickRef.current = () => {
        if (!enterTlComplete) return; // ignore clicks during entrance
        triggerTransition();
        // After a short delay (so the disappear animation starts), scroll slightly
        // to kick off the scroll-linked Phase 3.
        setTimeout(() => {
          if (window.scrollY < 50) {
            window.scrollTo({ top: 80, behavior: "smooth" });
          }
        }, 200);
      };
    });

    return () => {
      removeFirstScrollListener?.();
      ctx.revert();
    };
  }, []); // Empty dep array — avoids re-running on state changes

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

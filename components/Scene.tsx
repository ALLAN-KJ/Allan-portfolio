"use client";

import { Canvas, useFrame, useThree, invalidate, extend } from "@react-three/fiber";
import { OrbitControls, Environment, RoundedBox, Text, useTexture, MeshTransmissionMaterial, shaderMaterial } from "@react-three/drei";
import { EffectComposer, Glitch } from "@react-three/postprocessing";
import * as THREE from "three";
import { useRef, useEffect, useState, Suspense } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ErrorBoundary } from "./ErrorBoundary";

gsap.registerPlugin(ScrollTrigger);

const RippleShaderMaterial = shaderMaterial(
  {
    uTexture: new THREE.Texture(),
    uTextureBw: new THREE.Texture(),
    uHover: 0,
    uTime: 0,
    uPointer: new THREE.Vector2(0.5, 0.5),
  },
  // vertex shader
  `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `,
  // fragment shader
  `
  uniform sampler2D uTexture;
  uniform sampler2D uTextureBw;
  uniform float uHover;
  uniform float uTime;
  uniform vec2 uPointer;
  varying vec2 vUv;

  void main() {
    float dist = distance(vUv, uPointer);
    float ripple = sin(dist * 30.0 - uTime * 15.0) * 0.03 * uHover;
    vec2 distortedUv = vUv + normalize(vUv - uPointer + 0.0001) * ripple;
    
    vec4 color = texture2D(uTexture, distortedUv);
    vec4 bwColor = texture2D(uTextureBw, distortedUv);
    
    gl_FragColor = mix(color, bwColor, uHover);
  }
  `
);

extend({ RippleShaderMaterial });

function IDCard({ isMobile = false }: { isMobile?: boolean }) {
  const photoTexture = useTexture("/images/allan_coat.png");
  const photoTextureBw = useTexture("/images/allan_coatbw.png");
  const [hovered, setHovered] = useState(false);
  const materialRef = useRef<any>(null);

  useFrame((state, delta) => {
    if (typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches) {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const target = hovered ? 1 : 0;
      
      if (materialRef.current) {
        materialRef.current.uTime = state.clock.elapsedTime;
        if (reducedMotion) {
          materialRef.current.uHover = target;
        } else {
          materialRef.current.uHover = THREE.MathUtils.lerp(
            materialRef.current.uHover,
            target,
            delta * 5
          );
        }
        if (hovered || materialRef.current.uHover > 0.01) {
          invalidate();
        }
      }
    }
  });

  return (
    <group>
      <EffectComposer>
        <Glitch
          delay={[1.5, 3.5]}
          duration={[0.1, 0.3]}
          strength={[0.1, 0.2]}
          active={hovered && !window.matchMedia("(prefers-reduced-motion: reduce)").matches}
          ratio={0.5}
        />
      </EffectComposer>

      {/* Main Card */}
      <RoundedBox args={[3.4, 2.1, 0.05]} radius={0.05} smoothness={4}>
        <MeshTransmissionMaterial
          backside
          samples={isMobile ? 2 : 3}
          resolution={isMobile ? 256 : 512}
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

        {/* Photo with Interactive Ripple Shader */}
        <mesh 
          position={[1.0, 0, 0.001]}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onPointerMove={(e) => {
            if (e.uv && materialRef.current) {
              materialRef.current.uPointer.copy(e.uv);
            }
          }}
        >
          <planeGeometry args={[0.8, 1.0]} />
          {/* @ts-ignore */}
          <rippleShaderMaterial 
            ref={materialRef} 
            uTexture={photoTexture} 
            uTextureBw={photoTextureBw}
            toneMapped={false}
          />
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
          position={[0, 0.6, 0.002]}
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
    // Throttled scroll invalidation — cap at ~60fps to avoid over-rendering
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          invalidate();
          ticking = false;
        });
      }
    };
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
      // 25% smaller scale (desktop 1→0.75, mobile 0.75→0.5625)
      const initialScale = window.innerWidth < 768 ? 0.5625 : 0.75;
      gsap.set(scrollGroupRef.current!.scale, { x: initialScale, y: initialScale, z: initialScale });
      gsap.set(scrollGroupRef.current!.rotation, { x: 0, y: 0, z: 0 });
      // 25% higher resting Y (desktop 0.5->1.0, mobile 1.875->2.375)
      gsap.set(scrollGroupRef.current!.position, { 
        x: window.innerWidth < 768 ? 0 : 2, 
        y: window.innerWidth < 768 ? 2.375 : 1.0, 
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
            scrub: 1, // Responsive scrub with slight smoothing (1s catch-up)
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
          // Proportionally scaled end values (25% smaller baseline)
          const endScale = 0.4875; // 0.65 * 0.75
          // Main Rotation, Scale, and Translation
          tl.to(scrollGroupRef.current!.position, {
            x: 3, // Drift right on desktop
            y: 1.35, // Drift slightly up (higher baseline)
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
          tl.to(scrollGroupRef.current!.position, { y: 1.875 }, 0) // Higher baseline for mobile
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

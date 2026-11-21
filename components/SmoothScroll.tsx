"use client";

import { useEffect, ReactNode } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4, // Luxurious, velvety smooth deceleration curve
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential ease-out
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      syncTouch: true, // Smooth touch-based scrolling on mobile
      syncTouchLerp: 0.065, // Gliding momentum for phone touch gestures
      touchInertiaExponent: 2.2, // Natural fluid inertia when finger lifts
      wheelMultiplier: 1.1, // Effortless trackpad and mousewheel glide
      touchMultiplier: 1.6, // Responsive yet silky mobile touch tracking
      autoResize: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    // Store the raf reference so we can remove the EXACT same function on cleanup
    const rafHandler = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(rafHandler);
    // lagSmoothing(0) prevents GSAP from dropping frames or causing jumpy stutters with Lenis
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(rafHandler);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}

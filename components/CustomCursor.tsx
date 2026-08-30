"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;
    
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Center the cursor exactly on the pointer
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.15, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.15, ease: "power3" });

    const moveCursor = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const handleHover = () => {
      gsap.to(cursor, { 
        scale: 2.5, 
        backgroundColor: "transparent", 
        border: "1px solid #D9A15C", 
        duration: 0.3 
      });
    };

    const handleLeave = () => {
      gsap.to(cursor, { 
        scale: 1, 
        backgroundColor: "#D9A15C", 
        border: "0px solid #D9A15C", 
        duration: 0.3 
      });
    };

    window.addEventListener("mousemove", moveCursor);

    const interactiveSelectors = "a, button, [role='button'], input, select, textarea, .interactive-3d";
    
    // We use event delegation on document body to handle dynamically added elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(interactiveSelectors)) {
        handleHover();
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(interactiveSelectors)) {
        handleLeave();
      }
    };

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-4 h-4 rounded-full bg-primary pointer-events-none z-[9999] mix-blend-difference hidden md:block"
      style={{ transform: "translate(-50%, -50%)", x: -100, y: -100 }}
    />
  );
}

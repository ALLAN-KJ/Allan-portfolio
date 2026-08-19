"use client";

import { useEffect, useRef, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function FadeInText({ children, className = "" }: { children: ReactNode, className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current) return;
    
    // Select all direct children (headings, p, buttons, etc)
    const elements = containerRef.current.children;

    gsap.fromTo(elements, 
      { 
        y: 50, 
        opacity: 0,
        scale: 0.95
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        stagger: 0.35,
        ease: "expo.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        }
      }
    );

  }, []);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}

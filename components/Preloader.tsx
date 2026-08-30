"use client";

import { useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";
import gsap from "gsap";

export default function Preloader() {
  const { progress, active } = useProgress();
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      if (progress === 100 || !active) {
        gsap.to(".preloader-container", {
          opacity: 0,
          duration: 0.8,
          ease: "power2.inOut",
          onComplete: () => {
            const el = document.querySelector(".preloader-container") as HTMLElement;
            if (el) el.style.display = "none";
          }
        });
      }
    }
  }, [progress, active, isMounted]);

  if (!isMounted) return null;

  return (
    <div className="preloader-container fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background" role="status" aria-label="Loading portfolio">
      <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden relative" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100}>
        <div 
          className="absolute top-0 left-0 h-full bg-primary transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="mt-4 text-primary text-sm font-mono tracking-widest" aria-hidden="true">
        {Math.round(progress)}%
      </div>
    </div>
  );
}

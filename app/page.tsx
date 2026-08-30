"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Scene from "@/components/Scene";
import Header from "@/components/Header";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import TechStack from "@/components/sections/TechStack";
import Skills from "@/components/sections/Skills";
import Competitions from "@/components/sections/Competitions";
import Contact from "@/components/sections/Contact";
import Preloader from "@/components/Preloader";

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && "scrollRestoration" in history) {
      history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
    }
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add("(min-width: 320px)", () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      if (prefersReducedMotion) {
        if (heroContentRef.current) gsap.set(heroContentRef.current, { opacity: 1, y: 0, pointerEvents: "auto" });
        return;
      }

      // Hero text simple fade in
      if (heroContentRef.current) {
        gsap.to(heroContentRef.current, {
          opacity: 1,
          y: 0,
          duration: 1.2,
          delay: 0.5,
          pointerEvents: "auto",
          ease: "power3.out",
        });
      }
    });

    return () => mm.revert();
  }, []);

  return (
    <>
      <Preloader />
      
      <main id="main-scroll-container" className="relative bg-[#0A0B0F] overflow-x-hidden selection:bg-[#D9A15C]/30 text-[#EDEDF2]">
        <Header />
        
        <div id="scene-container" className="fixed inset-0 z-[1] pointer-events-none transition-opacity duration-500">
          <div className="absolute inset-0 w-full h-full pointer-events-none">
            <Scene />
          </div>
        </div>

        <div className="relative z-10 w-full">
          {/* Hero Section - Two column layout to prevent overlap */}
          <section id="hero" ref={heroRef} className="flex min-h-screen flex-col md:flex-row items-center justify-end md:justify-start px-6 md:px-24 text-center md:text-left pointer-events-auto border-b border-transparent relative z-10 bg-transparent pb-24 md:pb-0">
            <div
              id="hero-content"
              ref={heroContentRef}
              className="flex flex-col items-center md:items-start justify-center w-full md:w-1/2 opacity-0 translate-y-8 pointer-events-none relative z-10 mt-[25vh] sm:mt-[35vh] md:mt-0"
            >
              <h1 className="text-5xl font-black font-heading tracking-[-0.04em] text-[#EDEDF2] md:text-7xl xl:text-9xl drop-shadow-[0_0_20px_rgba(217,161,92,0.15)] pointer-events-auto leading-[0.95]">
                Allan K J
              </h1>
              <p className="mt-6 md:mt-8 max-w-xl text-base md:text-lg text-[#9A9AA5] leading-[1.7] font-light pointer-events-auto">
                Cybersecurity student specializing in enterprise IT security, networking, and full-stack development.
              </p>
            </div>
            
            {/* Right half (desktop) or top half (mobile) is empty space for the 3D card */}
            <div className="hidden md:block w-1/2 h-full pointer-events-none" />
          </section>

          {/* Dynamic Sections Wrapper - Standard Flow */}
          <div className="pointer-events-auto relative z-20 w-full bg-[#0A0B0F]">
            <Projects />
            <Experience />
            <TechStack />
            <Skills />
            <Competitions />
            <Contact />
          </div>
        </div>
      </main>
    </>
  );
}

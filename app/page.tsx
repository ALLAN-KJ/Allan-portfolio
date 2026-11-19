"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import HeroTerminal from "@/components/HeroTerminal";
import Header from "@/components/Header";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import TechStack from "@/components/sections/TechStack";
import Skills from "@/components/sections/Skills";
import Certifications from "@/components/sections/Certifications";
import Competitions from "@/components/sections/Competitions";
import Contact from "@/components/sections/Contact";
import Preloader from "@/components/Preloader";
import Education from "@/components/sections/Education";

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const heroTerminalRef = useRef<HTMLDivElement>(null);

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
        if (heroTerminalRef.current) gsap.set(heroTerminalRef.current, { opacity: 1, y: 0, pointerEvents: "auto" });
        return;
      }

      let heroSplit: SplitType | null = null;

      // Hero text & letter-by-letter reveal
      if (heroContentRef.current) {
        gsap.to(heroContentRef.current, {
          opacity: 1,
          y: 0,
          duration: 1.0,
          delay: 0.3,
          pointerEvents: "auto",
          ease: "power3.out",
        });

        heroSplit = new SplitType(".hero-title", { types: "chars" });
        if (heroSplit.chars) {
          gsap.fromTo(
            heroSplit.chars,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.05,
              duration: 0.8,
              delay: 0.4,
              ease: "power4.out",
            }
          );
        }
      }

      // Hero terminal fade in
      if (heroTerminalRef.current) {
        gsap.to(heroTerminalRef.current, {
          opacity: 1,
          y: 0,
          duration: 1.2,
          delay: 0.7,
          pointerEvents: "auto",
          ease: "power3.out",
        });
      }

      return () => {
        heroSplit?.revert();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <>
      <Preloader />
      
      <main id="main-scroll-container" className="relative bg-[#0A0B0F] overflow-x-hidden selection:bg-[#D9A15C]/30 text-[#EDEDF2]">
        <Header />

        <div className="relative z-10 w-full">
          {/* Hero Section - Two column layout with interactive terminal on right */}
          <section id="hero" ref={heroRef} className="flex min-h-screen flex-col md:flex-row items-center justify-center md:justify-between px-6 md:px-24 text-center md:text-left pointer-events-auto border-b border-transparent relative z-10 bg-transparent pt-28 pb-16 md:py-0 gap-10 md:gap-12">
            <div
              id="hero-content"
              ref={heroContentRef}
              className="flex flex-col items-center md:items-start justify-center w-full md:w-1/2 opacity-0 translate-y-8 pointer-events-none relative z-10"
            >
              <h1 
                className="hero-title spider-glitch text-5xl font-black font-heading tracking-[-0.04em] text-[#EDEDF2] md:text-7xl xl:text-8xl 2xl:text-9xl drop-shadow-[0_0_20px_rgba(217,161,92,0.15)] pointer-events-auto leading-[0.95] whitespace-nowrap cursor-pointer"
                data-text="Allan K J"
              >
                Allan K J
              </h1>
              <p className="mt-6 md:mt-8 max-w-xl text-base md:text-lg text-[#9A9AA5] leading-[1.7] font-light pointer-events-auto">
                Cybersecurity specialist and creative developer engineering immersive 3D web applications, network defense systems, and full-stack software architectures. B.Tech CSE (Cyber Security) @ Karunya.
              </p>
            </div>
            
            {/* Right column: Interactive macOS-style bash terminal */}
            <div
              ref={heroTerminalRef}
              className="w-full md:w-1/2 flex items-center justify-center md:justify-end opacity-0 translate-y-8 pointer-events-none relative z-20"
            >
              <HeroTerminal />
            </div>
          </section>

          {/* Dynamic Sections Wrapper - Standard Flow */}
          <div className="pointer-events-auto relative z-20 w-full bg-[#0A0B0F]">
            <Projects />
            <Experience />
            <Education />
            <Skills />
            <Certifications />
            <TechStack />
            <Competitions />
            <Contact />
          </div>
        </div>
      </main>
    </>
  );
}

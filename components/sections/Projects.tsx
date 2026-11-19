"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedButton from "../AnimatedButton";

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const pinWrapper = pinWrapperRef.current;
    const track = trackRef.current;
    const heading = headingRef.current;

    if (!container || !pinWrapper || !track) return;

    const mm = gsap.matchMedia();

    // Universal: Safe entrance animation for heading
    if (heading) {
      gsap.fromTo(
        heading,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: heading,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // Desktop & Tablet (>= 768px): Pinned Horizontal Scrub with 1:1 Lenis Harmony
    mm.add("(min-width: 768px)", () => {
      const getScrollAmount = () => {
        return track.scrollWidth - window.innerWidth + 140; // 140px end buffer
      };

      // scrub: 0.5 creates buttery-smooth synchronization with Lenis without double-lag
      const horizontalScroll = gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: pinWrapper,
          start: "top top",
          end: () => `+=${getScrollAmount() * 1.15}`,
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressBarRef.current) {
              progressBarRef.current.style.transform = `scaleX(${self.progress})`;
            }
          },
        },
      });

      return () => {
        horizontalScroll.kill();
      };
    });

    // Mobile (< 768px): Card entrance animations
    mm.add("(max-width: 767px)", () => {
      const cards = gsap.utils.toArray(".project-card") as HTMLElement[];
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: "power3.out",
            duration: 0.6,
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    });

    return () => {
      mm.revert();
    };
  }, []);

  const projects = [
    {
      title: "Personal Portfolio Website",
      category: "3D Interactive Site",
      description:
        "Built with Next.js, TypeScript, Three.js, React Three Fiber, GSAP, and Tailwind CSS. Features an interactive 3D scene with scroll-linked animation. Implemented smooth-scroll UX (Lenis) and post-processing visual effects (bloom, depth) for a polished, cinematic presentation.",
      link: "https://allan-portfolioo.vercel.app",
      buttonText: "See the build",
    },
    {
      title: "Smart India Hackathon (SIH) 2026",
      category: "Problem Statement 26160",
      description:
        "Built and deployed a full-stack solution for SIH 2026 Problem Statement 26160. Deployed frontend on Vercel and backend on Render; live and accessible to all users.",
      link: "https://sih-2026-frontend-eight.vercel.app",
      buttonText: "View Live",
    },
    {
      title: "Student LMS Platform",
      category: "Full-Stack Web App",
      description:
        "Full-stack learning management system built during a Qaroo internship — features API integration and live student-facing functionality.",
      link: "https://student-lms-vds8.onrender.com/",
      buttonText: "View Live",
    },
    {
      title: "GHOST",
      category: "AI Voice Assistant",
      description:
        "Building a voice-controlled AI assistant that sends WhatsApp messages and opens websites like Google and YouTube.",
      link: null,
      buttonText: "In Progress",
    },
    {
      title: "Education-Themed 3D Website",
      category: "Interactive 3D Web (In Progress)",
      description:
        "Designing a book-shaped, themed interactive 3D website for education.",
      link: null,
      buttonText: "In Progress",
    },
  ];

  return (
    <section
      id="projects"
      ref={containerRef}
      className="w-full relative bg-[#0C0D12] z-[30] overflow-hidden"
    >
      {/* 1. Giant Headline Section: At the top separately, exactly like yesterday */}
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-16 md:pt-40 md:pb-24 text-center md:text-left">
        <h2
          ref={headingRef}
          className="projects-heading text-[clamp(4rem,10vw,8rem)] md:text-[9rem] lg:text-[12rem] font-black font-heading text-[#EDEDF2] tracking-[-0.05em] leading-[0.9]"
        >
          Selected<br className="hidden md:block" /> Works<span className="text-[#D9A15C]">.</span>
        </h2>
        <p className="mt-6 text-xs md:text-sm text-[#9A9AA5] tracking-widest uppercase font-mono">
          Scroll down to explore projects →
        </p>
      </div>

      {/* 2. Pinned Horizontal Track: Viewport-height showcase (Headline is above and not visible while scrubbing) */}
      <div
        ref={pinWrapperRef}
        className="w-full md:h-screen md:min-h-screen flex flex-col justify-center relative overflow-hidden pb-24 md:pb-0"
      >
        {/* Desktop Top Status & Progress Bar (Visible while scrolling cards) */}
        <div className="hidden md:flex absolute top-20 lg:top-24 left-12 right-12 lg:left-24 lg:right-24 z-40 items-center justify-between text-xs font-mono tracking-widest text-[#9A9AA5]/70 uppercase select-none pointer-events-none">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D9A15C] animate-pulse" />
            Projects Showcase
          </span>
          <div className="flex items-center gap-4">
            <span className="text-[#D9A15C]/80">01 — 05</span>
            <div className="w-36 h-[2px] bg-white/10 rounded-full overflow-hidden">
              <div
                ref={progressBarRef}
                className="w-full h-full bg-[#D9A15C] origin-left transform scale-x-0 transition-transform duration-75"
              />
            </div>
          </div>
        </div>

        {/* Horizontal Track: Vertical Showcase Cards matching requested size (~400px–420px) */}
        <div
          ref={trackRef}
          className="flex items-center gap-6 md:gap-8 lg:gap-10 px-6 md:px-16 lg:px-24 w-full md:w-max overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none scrollbar-none pb-6 md:pb-0"
        >
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="project-card group flex-shrink-0 w-[85vw] max-md:max-w-[360px] md:w-[440px] lg:w-[460px] xl:w-[480px] md:max-w-none min-h-[460px] md:h-[480px] lg:h-[500px] snap-center bg-[#0F111A] border border-[#D9A15C]/15 rounded-[1.75rem] p-7 md:p-8 lg:p-9 flex flex-col justify-between hover:border-[#D9A15C]/50 transition-all duration-300 ease-out md:hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(217,161,92,0.12)] shadow-xl cursor-default relative overflow-hidden backdrop-blur-sm"
            >
              <div>
                {/* Card Header: Category Tag & Large Index Counter */}
                <div className="flex items-start justify-between gap-3 mb-5 md:mb-6">
                  <span className="px-3 py-1 rounded-full bg-[#D9A15C]/10 border border-[#D9A15C]/20 text-[#D9A15C] font-medium tracking-[0.1em] uppercase text-[0.65rem] md:text-[0.7rem] transition-transform duration-300 group-hover:translate-x-1">
                    {project.category}
                  </span>
                  <span className="text-xl md:text-2xl font-heading font-black text-white/20 group-hover:text-[#D9A15C]/70 transition-colors duration-300 flex-shrink-0">
                    0{idx + 1}
                  </span>
                </div>

                {/* Title */}
                <h3 className="glitch-hover text-2xl md:text-3xl font-bold font-heading text-[#EDEDF2] mb-3 md:mb-4 tracking-[-0.02em] leading-tight transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-[#9A9AA5] text-sm leading-[1.7] font-light">
                  {project.description}
                </p>
              </div>

              {/* Action Button */}
              <div className="mt-6 md:mt-8 transition-transform duration-300 group-hover:translate-y-[-2px]">
                {project.link ? (
                  <AnimatedButton
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {project.buttonText}
                  </AnimatedButton>
                ) : (
                  <div className="px-5 py-2.5 rounded-full border border-white/10 text-[#9A9AA5] inline-flex items-center text-xs md:text-sm font-medium cursor-not-allowed uppercase tracking-[0.12em] min-h-[40px]">
                    {project.buttonText}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

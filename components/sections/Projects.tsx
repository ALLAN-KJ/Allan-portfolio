"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedButton from "../AnimatedButton";

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const track = trackRef.current;
    const heading = headingRef.current;

    if (!container || !track) return;

    const mm = gsap.matchMedia();

    // Universal: Safe entrance animation for heading
    if (heading) {
      gsap.fromTo(
        heading,
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // Desktop & Tablet (>= 768px): Pinned Horizontal Scrub with Extended Pacing
    mm.add("(min-width: 768px)", () => {
      const getScrollAmount = () => {
        return track.scrollWidth - window.innerWidth + 180; // 180px buffer for elegant end breathing room
      };

      // Extended scroll travel so wide cards glide with luxurious, deliberate pacing
      const getScrollDistance = () => {
        return getScrollAmount() * 1.35;
      };

      const horizontalScroll = gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${getScrollDistance()}`,
          pin: true,
          scrub: 1.2,
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
      className="w-full relative bg-[#0C0D12] z-[30] overflow-hidden py-24 md:py-0 md:min-h-screen md:h-screen md:flex md:flex-col md:justify-center"
    >
      {/* Top Bar with Section Tag & Progress Bar (Desktop >= 768px) */}
      <div className="hidden md:flex absolute top-8 left-12 right-12 lg:left-24 lg:right-24 z-40 items-center justify-between text-xs font-mono tracking-widest text-[#9A9AA5]/70 uppercase select-none pointer-events-none">
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

      {/* Mobile-Only Section Header (< 768px) */}
      <div className="md:hidden w-full px-6 mb-8 text-left">
        <div className="text-[#D9A15C] font-mono tracking-[0.2em] uppercase text-xs mb-3">
          Featured Portfolio
        </div>
        <h2 className="projects-heading text-[clamp(3.5rem,12vw,5.5rem)] font-black font-heading text-[#EDEDF2] tracking-[-0.05em] leading-[0.88]">
          Selected<br />Works<span className="text-[#D9A15C]">.</span>
        </h2>
        <p className="mt-3 text-xs text-[#9A9AA5] tracking-wider uppercase font-mono flex items-center gap-2">
          <span>Swipe sideways to explore</span>
          <span className="text-[#D9A15C]">→</span>
        </p>
      </div>

      {/* Horizontal Track: Opening Giant Title Panel + 5 Cinematic Wide Cards */}
      <div
        ref={trackRef}
        className="flex items-center gap-8 md:gap-12 lg:gap-16 px-6 md:px-16 lg:px-24 w-full md:w-max overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none scrollbar-none pb-6 md:pb-0"
      >
        {/* Desktop Opening Panel: Restored Massive Two-Line Typography */}
        <div className="hidden md:flex flex-shrink-0 w-[70vw] md:w-[50vw] lg:w-[45vw] xl:w-[40vw] flex-col justify-center pr-6 lg:pr-12 select-none">
          <div className="text-[#D9A15C] font-mono tracking-[0.2em] uppercase text-xs md:text-sm mb-4">
            Featured Portfolio
          </div>
          <h2
            ref={headingRef}
            className="projects-heading text-[clamp(4.5rem,8vw,7.5rem)] md:text-[7.5rem] lg:text-[9.5rem] xl:text-[11rem] font-black font-heading text-[#EDEDF2] tracking-[-0.05em] leading-[0.88]"
          >
            Selected<br />Works<span className="text-[#D9A15C]">.</span>
          </h2>
          <p className="mt-8 text-xs md:text-sm text-[#9A9AA5] tracking-widest uppercase font-mono flex items-center gap-3">
            <span>Scroll down to explore</span>
            <span className="text-[#D9A15C] animate-pulse">→</span>
          </p>
        </div>

        {/* 5 Cinematic Wide Showcase Cards */}
        {projects.map((project, idx) => (
          <div
            key={idx}
            className="project-card group flex-shrink-0 w-[85vw] max-w-[360px] md:w-[68vw] md:max-w-[820px] lg:w-[65vw] lg:max-w-[880px] min-h-[480px] md:h-[530px] lg:h-[550px] snap-center bg-[#0F111A] border border-[#D9A15C]/15 rounded-[2rem] p-7 md:p-12 lg:p-14 flex flex-col justify-between hover:border-[#D9A15C]/50 transition-all duration-500 ease-out md:hover:-translate-y-2 hover:shadow-[0_0_50px_rgba(217,161,92,0.14)] shadow-xl cursor-default relative overflow-hidden backdrop-blur-sm"
          >
            <div>
              {/* Card Header: Category Tag & Large Index Counter */}
              <div className="flex items-center justify-between mb-6 md:mb-8">
                <span className="px-3.5 py-1.5 rounded-full bg-[#D9A15C]/10 border border-[#D9A15C]/20 text-[#D9A15C] font-medium tracking-[0.12em] uppercase text-[0.7rem] md:text-xs transition-transform duration-500 group-hover:translate-x-1">
                  {project.category}
                </span>
                <span className="text-2xl md:text-4xl font-heading font-black text-white/20 group-hover:text-[#D9A15C]/70 transition-colors duration-500">
                  0{idx + 1}
                </span>
              </div>

              {/* Title */}
              <h3 className="glitch-hover text-2xl md:text-4xl lg:text-5xl font-bold font-heading text-[#EDEDF2] mb-5 md:mb-6 tracking-[-0.03em] leading-[1.1] transition-transform duration-500 group-hover:translate-x-1 group-hover:text-white">
                {project.title}
              </h3>

              {/* Description */}
              <p className="text-[#9A9AA5] text-sm md:text-base lg:text-lg leading-[1.75] font-light max-w-2xl">
                {project.description}
              </p>
            </div>

            {/* Action Button */}
            <div className="mt-8 transition-transform duration-500 group-hover:translate-y-[-4px]">
              {project.link ? (
                <AnimatedButton
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {project.buttonText}
                </AnimatedButton>
              ) : (
                <div className="px-6 py-3 rounded-full border border-white/10 text-[#9A9AA5] inline-flex items-center text-xs md:text-sm font-medium cursor-not-allowed uppercase tracking-[0.12em] min-h-[44px]">
                  {project.buttonText}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

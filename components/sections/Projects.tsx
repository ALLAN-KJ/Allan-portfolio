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
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // Desktop & Tablet (>= 768px): Pinned Horizontal Scrub
    mm.add("(min-width: 768px)", () => {
      const getScrollAmount = () => {
        return track.scrollWidth - window.innerWidth + 140; // 140px buffer
      };

      const getScrollDistance = () => {
        return getScrollAmount() * 1.25;
      };

      const horizontalScroll = gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${getScrollDistance()}`,
          pin: true,
          scrub: 1.1,
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
      className="w-full relative bg-[#0C0D12] z-[30] overflow-hidden py-20 md:py-0 md:min-h-screen md:h-screen md:flex md:flex-col md:justify-center"
    >
      {/* Top Section Header: Pinned separately above the cards */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-16 lg:px-24 mb-6 md:mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-[#D9A15C] font-mono tracking-[0.2em] uppercase text-xs mb-2">
            Featured Portfolio
          </div>
          <h2
            ref={headingRef}
            className="projects-heading text-[clamp(2.5rem,6vw,4.5rem)] md:text-[4rem] lg:text-[5rem] font-black font-heading text-[#EDEDF2] tracking-[-0.05em] leading-[0.9] whitespace-nowrap"
          >
            Selected Works<span className="text-[#D9A15C]">.</span>
          </h2>
          <p className="mt-2 text-xs md:text-sm text-[#9A9AA5] tracking-widest uppercase font-mono hidden md:block">
            Scroll down to explore horizontally →
          </p>
          <p className="mt-2 text-xs text-[#9A9AA5] tracking-wider uppercase font-mono md:hidden">
            Swipe sideways to explore →
          </p>
        </div>

        {/* Desktop Progress Bar & Counter */}
        <div className="hidden md:flex items-center gap-4 mb-2">
          <span className="text-xs font-mono text-[#D9A15C]/80 tracking-widest uppercase">
            01 — 05
          </span>
          <div className="w-36 h-[2px] bg-white/10 rounded-full overflow-hidden">
            <div
              ref={progressBarRef}
              className="w-full h-full bg-[#D9A15C] origin-left transform scale-x-0 transition-transform duration-75"
            />
          </div>
        </div>
      </div>

      {/* Horizontal Track: Project cards only with +50% breadth (~720px width) */}
      <div
        ref={trackRef}
        className="flex items-center gap-8 md:gap-10 lg:gap-12 px-6 md:px-16 lg:px-24 w-full md:w-max overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none scrollbar-none pb-6 md:pb-0"
      >
        {projects.map((project, idx) => (
          <div
            key={idx}
            className="project-card group flex-shrink-0 w-[88vw] max-w-[380px] md:w-[680px] lg:w-[720px] xl:w-[750px] min-h-[440px] md:h-[460px] lg:h-[480px] snap-center bg-[#0F111A] border border-[#D9A15C]/15 rounded-[1.75rem] p-7 md:p-10 lg:p-12 flex flex-col justify-between hover:border-[#D9A15C]/50 transition-all duration-300 ease-out md:hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(217,161,92,0.12)] shadow-xl cursor-default relative overflow-hidden backdrop-blur-sm"
          >
            <div>
              {/* Card Header: Category Tag & Large Index Counter */}
              <div className="flex items-center justify-between mb-5 md:mb-6">
                <span className="px-3.5 py-1.5 rounded-full bg-[#D9A15C]/10 border border-[#D9A15C]/20 text-[#D9A15C] font-medium tracking-[0.12em] uppercase text-[0.7rem] md:text-xs transition-transform duration-300 group-hover:translate-x-1">
                  {project.category}
                </span>
                <span className="text-xl md:text-3xl font-heading font-black text-white/20 group-hover:text-[#D9A15C]/70 transition-colors duration-300">
                  0{idx + 1}
                </span>
              </div>

              {/* Title */}
              <h3 className="glitch-hover text-2xl md:text-3xl lg:text-4xl font-bold font-heading text-[#EDEDF2] mb-4 md:mb-5 tracking-[-0.02em] leading-tight transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white">
                {project.title}
              </h3>

              {/* Description */}
              <p className="text-[#9A9AA5] text-sm md:text-base lg:text-[1.05rem] leading-[1.75] font-light max-w-2xl">
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
    </section>
  );
}

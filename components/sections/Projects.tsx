"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import AnimatedButton from "../AnimatedButton";

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    
    if (!container) return;

    // Simple vertical stack/grid fade up for all devices
    const cards = gsap.utils.toArray(".project-card") as HTMLElement[];
    
    cards.forEach((card) => {
      // Use fromTo to ensure starting opacity is explicitly 0 and ending is 1
      gsap.fromTo(card, 
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "power3.out",
          duration: 0.8,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          }
        }
      );
    });

    // Universal: SplitType mask reveal for heading
    const split = new SplitType(".projects-heading", { types: "chars" });
    gsap.fromTo(split.chars, {
      y: 50,
      opacity: 0,
    }, {
      scrollTrigger: {
        trigger: container,
        start: "top 80%",
        toggleActions: "play none none reverse",
        onEnter: () => {
          const heading = document.querySelector('.projects-heading');
          if (heading) {
            heading.classList.add('glitch-active');
            setTimeout(() => heading.classList.remove('glitch-active'), 300);
          }
        }
      },
      y: 0,
      opacity: 1,
      stagger: 0.05,
      ease: "power4.out",
      duration: 0.8,
    });

    return () => {
      split.revert();
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
    <section id="projects" ref={containerRef} 
      className="w-full relative bg-[#0C0D12] z-[30] py-48 flex flex-col items-center"
    >
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 mb-20 text-center md:text-left">
        <h2 className="projects-heading text-[clamp(4rem,10vw,8rem)] md:text-[9rem] lg:text-[12rem] font-black font-heading text-[#EDEDF2] tracking-[-0.05em] leading-[0.9]">
          Selected<br className="hidden md:block"/> Works<span className="text-[#D9A15C]">.</span>
        </h2>
      </div>

      <div 
        ref={scrollWrapperRef} 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 lg:px-8 w-full max-w-7xl mx-auto"
      >
        {projects.map((project, idx) => (
          <div
            key={idx}
            className="project-card group w-full bg-[#0F111A] border border-[#D9A15C]/15 rounded-[1.5rem] p-8 md:p-10 flex flex-col justify-between hover:border-[#D9A15C]/50 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(217,161,92,0.12)] shadow-lg cursor-default"
          >
            <div>
              <p className="text-[#D9A15C] font-medium tracking-[0.12em] uppercase text-[0.65rem] md:text-[0.7rem] mb-5 transition-transform duration-500 group-hover:translate-x-1">
                {project.category}
              </p>
              <h3 className="glitch-hover text-2xl md:text-3xl font-bold font-heading text-[#EDEDF2] mb-5 tracking-[-0.02em] transition-transform duration-500 group-hover:translate-x-1">{project.title}</h3>
              <p className="text-[#9A9AA5] text-sm md:text-base leading-[1.7] font-light">{project.description}</p>
            </div>
            <div className="mt-10 transition-transform duration-500 group-hover:translate-y-[-4px]">
              {project.link ? (
                <AnimatedButton href={project.link} target="_blank" rel="noopener noreferrer">
                  {project.buttonText}
                </AnimatedButton>
              ) : (
                <div className="px-6 py-3 rounded-full border border-white/10 text-[#9A9AA5] inline-flex items-center text-xs font-medium cursor-not-allowed uppercase tracking-[0.12em] min-h-[44px]">
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

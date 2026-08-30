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
      title: "Tool Finder",
      category: "5-Day AI Build Sprint",
      description:
        "Built solo in a 5-day AI build sprint (Conesta Forge). Reached a Forge Score of 1,391, ranking #33 on the leaderboard.",
      link: null,
      buttonText: "Confidential",
    },
    {
      title: "This Portfolio",
      category: "Web Development",
      description:
        "Interactive 3D site built with Next.js, React Three Fiber, GSAP, and Lenis for smooth scroll UX and cinematic presentation.",
      link: "https://allan-portfolioo.vercel.app",
      buttonText: "See the build",
    },
    {
      title: "ZF Group HMI Dashboard",
      category: "Industrial Control Interface",
      description:
        "React/TypeScript UI changes to an industrial oil-bath monitoring interface at ZF Friedrichshafen AG. (Internal/Confidential)",
      link: null,
      buttonText: "Confidential",
    },
  ];

  return (
    <section
      id="projects"
      ref={containerRef}
      className="w-full relative bg-[#0C0D12] z-[30] py-32 flex flex-col items-center"
    >
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 mb-24 text-center md:text-left">
        <h2 className="projects-heading text-[4rem] md:text-[6rem] lg:text-[8rem] font-black font-heading text-[#EDEDF2] tracking-[-0.03em] leading-[0.92]">
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
            className="project-card group w-full bg-[#0F111A] border border-[#D9A15C]/15 rounded-[1.5rem] p-8 md:p-10 flex flex-col justify-between hover:border-[#D9A15C]/40 transition-all duration-500 hover:-translate-y-2 hover:scale-[1.01] hover:shadow-[0_0_30px_rgba(217,161,92,0.08)] shadow-lg cursor-default"
          >
            <div>
              <p className="text-[#D9A15C] font-medium tracking-[0.12em] uppercase text-[0.65rem] md:text-[0.7rem] mb-5 transition-transform duration-500 group-hover:translate-x-1">
                {project.category}
              </p>
              <h3 className="text-2xl md:text-3xl font-bold font-heading text-[#EDEDF2] mb-5 tracking-[-0.02em] transition-transform duration-500 group-hover:translate-x-1">{project.title}</h3>
              <p className="text-[#9A9AA5] text-sm md:text-base leading-[1.7] font-light">{project.description}</p>
            </div>
            <div className="mt-10 transition-transform duration-500 group-hover:translate-y-[-4px]">
              {project.link ? (
                <AnimatedButton href={project.link} target="_blank" rel="noopener noreferrer">
                  {project.buttonText}
                </AnimatedButton>
              ) : (
                <div className="px-5 py-2.5 rounded-full border border-white/10 text-[#9A9AA5] inline-block text-[0.65rem] md:text-xs font-medium cursor-not-allowed uppercase tracking-[0.12em]">
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

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import AnimatedButton from "../AnimatedButton";

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    let headingSplit: SplitType | null = null;
    const mm = gsap.matchMedia();

    // Universal: SplitType mask reveal for heading
    headingSplit = new SplitType(".projects-heading", { types: "chars" });
    gsap.fromTo(
      headingSplit.chars,
      { y: 50, opacity: 0 },
      {
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
          toggleActions: "play none none reverse",
          onEnter: () => {
            const heading = document.querySelector(".projects-heading");
            if (heading) {
              heading.classList.add("glitch-active");
              setTimeout(() => heading.classList.remove("glitch-active"), 300);
            }
          },
        },
        y: 0,
        opacity: 1,
        stagger: 0.05,
        ease: "power4.out",
        duration: 0.8,
      }
    );

    // Desktop: Pinned Horizontal Scrolling (>= 768px)
    mm.add("(min-width: 768px)", () => {
      const getScrollAmount = () => {
        const trackWidth = track.scrollWidth;
        return trackWidth - window.innerWidth + 120; // 120px end padding buffer
      };

      const horizontalScroll = gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${getScrollAmount()}`,
          pin: true,
          scrub: 1,
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

    // Mobile: Native Horizontal Swipe (< 768px)
    mm.add("(max-width: 767px)", () => {
      // Cards simple fade-in on mobile
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
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    });

    return () => {
      mm.revert();
      headingSplit?.revert();
    };
  }, []);

  const projects = [
    {
      title: "Personal Portfolio Website",
      category: "3D Interactive Site",
      description:
        "Built with Next.js, TypeScript, Three.js, React Three Fiber, GSAP, and Tailwind CSS. Features an interactive bash terminal with scroll-linked animation and post-processing visual effects for a cinematic presentation.",
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
        "Building a voice-controlled AI assistant that responds to voice commands, capable of sending WhatsApp messages and automating browser tasks.",
      link: null,
      buttonText: "In Progress",
    },
    {
      title: "Education-Themed 3D Website",
      category: "Interactive 3D Web",
      description:
        "Designing an interactive, book-shaped 3D educational learning platform exploring geometric web interactions.",
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
      {/* Section Header */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-24 mb-10 md:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="projects-heading text-[clamp(2.5rem,6vw,5rem)] md:text-[4.5rem] lg:text-[5.5rem] font-black font-heading text-[#EDEDF2] tracking-[-0.05em] leading-[0.9] whitespace-nowrap">
            Selected Works<span className="text-[#D9A15C]">.</span>
          </h2>
          <p className="mt-3 text-xs md:text-sm text-[#9A9AA5] tracking-widest uppercase font-mono hidden md:block">
            Scroll down to explore horizontally →
          </p>
          <p className="mt-2 text-xs text-[#9A9AA5] tracking-wider uppercase font-mono md:hidden">
            Swipe sideways to view projects →
          </p>
        </div>

        {/* Desktop Progress Bar */}
        <div className="hidden md:block w-48 h-[2px] bg-white/10 rounded-full overflow-hidden mb-3">
          <div
            ref={progressBarRef}
            className="w-full h-full bg-[#D9A15C] origin-left transform scale-x-0 transition-transform duration-75"
          />
        </div>
      </div>

      {/* Projects Track: Pinned horizontal translation on Desktop, Native swipe on Mobile */}
      <div
        ref={trackRef}
        data-lenis-prevent
        className="flex gap-6 md:gap-8 px-6 md:px-24 w-full md:w-max overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none scrollbar-none pb-6 md:pb-0 items-stretch"
      >
        {projects.map((project, idx) => (
          <div
            key={idx}
            className="project-card group w-[85vw] max-w-[340px] md:w-[440px] xl:w-[480px] min-h-[460px] md:h-[500px] snap-center flex-shrink-0 bg-[#0F111A] border border-[#D9A15C]/15 rounded-[1.5rem] p-8 md:p-10 flex flex-col justify-between hover:border-[#D9A15C]/50 transition-all duration-300 ease-out md:hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(217,161,92,0.12)] shadow-lg cursor-default"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <p className="text-[#D9A15C] font-medium tracking-[0.12em] uppercase text-[0.65rem] md:text-[0.7rem] transition-transform duration-500 group-hover:translate-x-1">
                  {project.category}
                </p>
                <span className="text-xs font-mono text-[#9A9AA5]/50">
                  0{idx + 1}
                </span>
              </div>
              <h3 className="glitch-hover text-2xl md:text-3xl font-bold font-heading text-[#EDEDF2] mb-5 tracking-[-0.02em] transition-transform duration-500 group-hover:translate-x-1">
                {project.title}
              </h3>
              <p className="text-[#9A9AA5] text-sm md:text-base leading-[1.7] font-light">
                {project.description}
              </p>
            </div>

            <div className="mt-8 transition-transform duration-500 group-hover:translate-y-[-4px]">
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

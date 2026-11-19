"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
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

    // Universal: Letter-by-letter reveal for heading (shown one by one)
    let headingSplit: SplitType | null = null;
    if (heading) {
      headingSplit = new SplitType(".projects-heading", { types: "chars" });
      if (headingSplit.chars) {
        gsap.fromTo(
          headingSplit.chars,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.05,
            duration: 0.8,
            ease: "power4.out",
            scrollTrigger: {
              trigger: heading,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }

    // Desktop & Tablet (>= 768px): Pinned Horizontal Scrub with 1:1 Lenis Harmony
    mm.add("(min-width: 768px)", () => {
      // Cards pop-up entrance animation
      const cards = track.querySelectorAll(".project-card");
      gsap.fromTo(
        cards,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: pinWrapper,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Stop scroll when Card 05 is at the far-left margin and the GitHub concluding card is on the right
      const getScrollAmount = () => {
        const cards = track.querySelectorAll(".project-card");
        if (cards.length >= 2) {
          const card5 = cards[cards.length - 2] as HTMLElement;
          const firstCard = cards[0] as HTMLElement;
          return card5.offsetLeft - firstCard.offsetLeft;
        }
        return track.scrollWidth - window.innerWidth + 140;
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
      headingSplit?.revert();
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
          className="projects-heading group text-[clamp(4rem,10vw,8rem)] md:text-[9rem] lg:text-[12rem] font-black font-heading text-[#EDEDF2] tracking-[-0.05em] leading-[0.9] cursor-pointer"
        >
          <span className="spider-glitch block" data-text="Selected">Selected</span>
          <span className="spider-glitch block" data-text="Works.">
            Works<span className="text-[#D9A15C]">.</span>
          </span>
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
            <span className="text-[#D9A15C]/80">01 — 05 + More</span>
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
          style={{
            paddingLeft: "max(1.5rem, calc((100vw - 80rem) / 2 + 2rem))",
            paddingRight: "max(1.5rem, calc((100vw - 80rem) / 2 + 2rem))",
          }}
          className="gpu-accel flex items-center gap-6 md:gap-8 lg:gap-10 w-full md:w-max overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none scrollbar-none pb-6 md:pb-0"
        >
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="project-card gpu-accel group flex-shrink-0 w-[85vw] max-md:max-w-[360px] md:w-[440px] lg:w-[460px] xl:w-[480px] md:max-w-none min-h-[460px] md:h-[480px] lg:h-[500px] snap-center bg-[#0F111A] border border-[#D9A15C]/15 rounded-[1.75rem] p-7 md:p-8 lg:p-9 flex flex-col justify-between hover:border-[#D9A15C]/50 transition-all duration-300 ease-out md:hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(217,161,92,0.12)] shadow-xl cursor-default relative overflow-hidden backdrop-blur-sm"
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
                <h3 
                  className="spider-glitch text-2xl md:text-3xl font-bold font-heading text-[#EDEDF2] mb-3 md:mb-4 tracking-[-0.02em] leading-tight transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white"
                  data-text={project.title}
                >
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

          {/* Concluding Card: Explore More on GitHub & Contact */}
          <div
            className="project-card gpu-accel group flex-shrink-0 w-[85vw] max-md:max-w-[360px] md:w-[440px] lg:w-[460px] xl:w-[480px] md:max-w-none min-h-[460px] md:h-[480px] lg:h-[500px] snap-center bg-[#0F111A] border border-[#D9A15C]/25 rounded-[1.75rem] p-7 md:p-8 lg:p-9 flex flex-col justify-between hover:border-[#D9A15C]/60 transition-all duration-300 ease-out md:hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(217,161,92,0.18)] shadow-xl cursor-default relative overflow-hidden backdrop-blur-sm"
          >
            <div>
              {/* Card Header: Category Tag & GitHub SVG Link */}
              <div className="flex items-start justify-between gap-3 mb-5 md:mb-6">
                <span className="px-3 py-1 rounded-full bg-[#D9A15C]/15 border border-[#D9A15C]/30 text-[#D9A15C] font-medium tracking-[0.1em] uppercase text-[0.65rem] md:text-[0.7rem] transition-transform duration-300 group-hover:translate-x-1">
                  Open Source & More
                </span>
                <a
                  href="https://github.com/ALLAN-KJ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-[#EDEDF2] hover:text-[#D9A15C] hover:border-[#D9A15C]/40 transition-colors flex-shrink-0"
                  aria-label="GitHub Profile"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                </a>
              </div>

              {/* Title */}
              <h3 
                className="spider-glitch text-2xl md:text-3xl font-bold font-heading text-[#EDEDF2] mb-3 md:mb-4 tracking-[-0.02em] leading-tight transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white"
                data-text="More on GitHub"
              >
                More on GitHub
              </h3>

              {/* Description */}
              <p className="text-[#9A9AA5] text-sm leading-[1.7] font-light">
                Want to explore more source code, experiments, and ongoing builds? Check out all public repositories on GitHub or reach out to collaborate.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 md:mt-8 flex items-center gap-4 flex-wrap">
              <AnimatedButton
                href="https://github.com/ALLAN-KJ"
                target="_blank"
                rel="noopener noreferrer"
              >
                View GitHub
              </AnimatedButton>
              <a
                href="#contact"
                className="text-xs md:text-sm text-[#9A9AA5] hover:text-[#D9A15C] font-mono tracking-wider uppercase transition-colors inline-flex items-center gap-1.5"
              >
                <span>Let&apos;s Talk</span>
                <span>→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

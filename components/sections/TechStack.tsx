"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

const techRow1 = ["Python", "C", "Java", "TypeScript", "JavaScript", "HTML5", "CSS3", "React", "Next.js", "Tailwind CSS"];
const techRow2 = ["Docker", "Groq API", "Three.js", "GSAP", "Lenis", "Git", "VS Code", "Node.js", "Linux", "Antigravity"];

export default function TechStack() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", listener);

    let headingSplit: SplitType | null = null;
    if (headingRef.current) {
      headingSplit = new SplitType(".techstack-heading", { types: "chars" });
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
              trigger: headingRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }

    return () => {
      mediaQuery.removeEventListener("change", listener);
      headingSplit?.revert();
    };
  }, []);

  return (
    <section ref={containerRef} className="py-48 w-full bg-[#0A0B0F] relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 mb-20 text-center md:text-left">
        <h2 
          ref={headingRef}
          className="techstack-heading spider-glitch text-[clamp(4rem,10vw,8rem)] md:text-[9rem] lg:text-[12rem] font-black font-heading text-[#EDEDF2] tracking-[-0.05em] leading-[0.9]"
          data-text="Tech Stack & Tools."
        >
          Tech Stack {"&"} Tools<span className="text-[#D9A15C]">.</span>
        </h2>
      </div>

      <div className="relative w-full flex flex-col gap-6 select-none overflow-hidden mask-edges pb-10">
        {/* Row 1: Left to right */}
        <div className={`flex gap-6 w-max ${reducedMotion ? "flex-wrap justify-center w-full px-6" : "animate-marquee pause-on-hover"}`}>
          {[...techRow1, ...(reducedMotion ? [] : techRow1), ...(reducedMotion ? [] : techRow1), ...(reducedMotion ? [] : techRow1)].map((tech, idx) => (
            <div
              key={`row1-${idx}`}
              className="px-6 py-3 rounded-full border border-white/10 bg-[#0F111A] text-[#9A9AA5] text-sm md:text-base font-medium whitespace-nowrap transition-colors hover:text-[#EDEDF2] hover:border-[#D9A15C]/30"
            >
              {tech}
            </div>
          ))}
        </div>

        {/* Row 2: Right to left */}
        <div className={`flex gap-6 w-max ${reducedMotion ? "flex-wrap justify-center w-full px-6 mt-4" : "animate-marquee-reverse pause-on-hover"}`}>
          {[...techRow2, ...(reducedMotion ? [] : techRow2), ...(reducedMotion ? [] : techRow2), ...(reducedMotion ? [] : techRow2)].map((tech, idx) => (
            <div
              key={`row2-${idx}`}
              className="px-6 py-3 rounded-full border border-white/10 bg-[#0F111A] text-[#9A9AA5] text-sm md:text-base font-medium whitespace-nowrap transition-colors hover:text-[#EDEDF2] hover:border-[#D9A15C]/30"
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

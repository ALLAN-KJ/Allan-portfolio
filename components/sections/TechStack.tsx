"use client";

import { useEffect, useState } from "react";

const techRow1 = ["C", "HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS"];
const techRow2 = ["Three.js", "GSAP", "Lenis", "Git", "VS Code", "Node.js", "Linux", "Figma"];

export default function TechStack() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  return (
    <section className="py-24 w-full bg-[#0A0B0F] relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center md:text-left">
        <h2 className="text-[clamp(2.25rem,7vw,5rem)] font-black font-heading text-[#EDEDF2] tracking-[-0.03em] leading-[0.92]">
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

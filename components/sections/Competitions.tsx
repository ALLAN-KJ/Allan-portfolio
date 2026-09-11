"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

export default function Competitions() {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let headingSplit: SplitType | null = null;

    const ctx = gsap.context(() => {
      itemsRef.current.forEach((item) => {
        if (!item) return;
        
        gsap.fromTo(
          item,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            ease: "power3.out",
            duration: 0.8,
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      headingSplit = new SplitType(".competitions-heading", { types: "chars" });
      gsap.from(headingSplit.chars, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        y: 50,
        opacity: 0,
        stagger: 0.05,
        ease: "power4.out",
        duration: 0.8,
      });
    }, containerRef);

    return () => {
      ctx.revert();
      headingSplit?.revert();
    };
  }, []);

  const competitions = [
    {
      title: "Mindkraft 2026",
      date: "27–28 March 2026",
      events: ["Hashes over Roses 3.0", "Crypto Crime 2.0", "IoT Inferno – The MindKraft Challenge"],
      description: "International Level Techno-Management Fest, Karunya Institute of Technology and Sciences. Took part in three cybersecurity- and IoT-focused events."
    },
    {
      title: "Conesta Forge",
      date: "2026",
      events: ["5-Day AI Build Sprint"],
      description: "Shipped a working web application solo, finishing #33 on the leaderboard."
    },
    {
      title: "Aurelion Hackathon",
      date: "2026",
      events: ["24-Hour Hackathon"],
      description: "Participated as part of a small team."
    },
  ];

  return (
    <section id="competitions" ref={containerRef} className="py-32 w-full bg-[#0A0B0F] overflow-hidden relative">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="competitions-heading text-[clamp(2.5rem,8vw,5rem)] font-black font-heading text-[#EDEDF2] mb-20 text-center tracking-[-0.03em] leading-[0.92]">
          Competitions<span className="text-[#D9A15C]">.</span>
        </h2>

        <div className="flex flex-col gap-16 items-center">
          {competitions.map((comp, idx) => (
            <div
              key={idx}
              ref={(el) => {
                itemsRef.current[idx] = el;
              }}
              className="w-full md:w-[85%] bg-[#0F111A] border border-white/5 rounded-[1.5rem] p-8 md:p-12 shadow-lg relative overflow-hidden group hover:-translate-y-1 hover:scale-[1.02] hover:border-[#D9A15C]/40 transition-all duration-300 ease-out hover:shadow-[0_0_35px_rgba(217,161,92,0.1)] cursor-default"
            >
              <div className="absolute top-0 right-0 p-8 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-500">
                <span className="text-[10rem] text-[#D9A15C] font-black leading-none">
                  {String(idx + 1).padStart(2, "0")}
                </span>
              </div>
              
              <div className="relative z-10 transition-transform duration-500 group-hover:translate-x-1">
                <p className="text-[#D9A15C] font-medium tracking-[0.12em] uppercase text-[0.65rem] mb-4">
                  {comp.date}
                </p>
                <h3 className="text-3xl md:text-4xl font-bold font-heading text-[#EDEDF2] mb-7 tracking-[-0.02em]">
                  {comp.title}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {comp.events.map((event, eIdx) => (
                    <span 
                      key={eIdx}
                      className="px-4 py-2 rounded-full bg-white/5 border border-white/8 text-[#9A9AA5] text-xs font-medium tracking-wide group-hover:border-[#D9A15C]/20 transition-colors duration-300"
                    >
                      {event}
                    </span>
                  ))}
                </div>
                {comp.description && (
                  <p className="mt-5 text-[#9A9AA5] text-sm md:text-base leading-[1.7] font-light">
                    {comp.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

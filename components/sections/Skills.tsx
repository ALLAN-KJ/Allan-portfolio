"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current) return;

    let headingSplit: SplitType | null = null;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        itemsRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          ease: "power3.out",
          duration: 0.8,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      headingSplit = new SplitType(".skills-heading", { types: "chars" });
      gsap.from(headingSplit.chars, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        y: 50,
        opacity: 0,
        stagger: 0.03,
        ease: "power4.out",
        duration: 0.8,
      });
    }, containerRef);

    return () => {
      ctx.revert();
      headingSplit?.revert();
    };
  }, []);

  const skillCategories = [
    {
      title: "Languages",
      skills: ["Python", "C", "HTML", "CSS", "JavaScript"],
    },
    {
      title: "Domains",
      skills: ["Cybersecurity", "System Design", "IoT", "Linux System Administration"],
    },
    {
      title: "Certifications",
      skills: [
        "Red Hat System Administration I (RH124)",
        "Cisco IoT & Digital Transformation",
        "EC-Council Cybersecurity Workshop",
      ],
    },
  ];

  return (
    <section id="skills" ref={containerRef} className="py-32 w-full bg-[#0C0D12] border-t border-white/5 relative">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="skills-heading text-[clamp(2.25rem,8vw,3.75rem)] font-black font-heading text-[#EDEDF2] mb-20 text-center tracking-[-0.03em] leading-[0.92]">
          Skills {"&"} Certifications<span className="text-[#D9A15C]">.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {skillCategories.map((category, idx) => (
            <div
              key={idx}
              ref={(el) => {
                itemsRef.current[idx] = el;
              }}
              className="group bg-[#0F111A] border border-white/5 rounded-[1.5rem] p-8 hover:border-[#D9A15C]/30 transition-all duration-500 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-[0_0_25px_rgba(217,161,92,0.07)] shadow-md cursor-default"
            >
              <h3 className="text-base font-semibold font-heading text-[#EDEDF2] mb-6 flex items-center gap-3 tracking-[0.05em] uppercase transition-transform duration-500 group-hover:translate-x-1">
                <span className="w-5 h-5 rounded-full border border-[#D9A15C]/40 flex items-center justify-center group-hover:border-[#D9A15C]/80 transition-colors">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D9A15C]/60 group-hover:bg-[#D9A15C] transition-colors" />
                </span>
                {category.title}
              </h3>
              <ul className="space-y-3">
                {category.skills.map((skill, sIdx) => (
                  <li key={sIdx} className="text-[#9A9AA5] font-light flex items-start gap-3 text-sm leading-[1.7] transition-colors duration-300 group-hover:text-[#EDEDF2]/70">
                    <span className="text-[#D9A15C]/60 mt-1 opacity-80 group-hover:opacity-100 transition-opacity text-xs">▹</span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

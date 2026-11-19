"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let headingSplit: SplitType | null = null;

    const ctx = gsap.context(() => {
      itemsRef.current.forEach((item) => {
        if (!item) return;

        const textElement = item.querySelector(".reveal-text");
        const dotElement = item.querySelector(".timeline-dot");

        if (textElement && dotElement) {
          gsap.fromTo(
            textElement,
            { opacity: 0, x: -20 },
            {
              opacity: 1,
              x: 0,
              ease: "power3.out",
              duration: 0.8,
              scrollTrigger: {
                trigger: item,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );

          gsap.fromTo(
            dotElement,
            { scale: 0, backgroundColor: "#3f3f46" },
            {
              scale: 1,
              backgroundColor: "#D9A15C",
              ease: "back.out(1.7)",
              duration: 0.6,
              scrollTrigger: {
                trigger: item,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });

      headingSplit = new SplitType(".experience-heading", { types: "chars" });
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

  const experiences = [
    {
      company: "ZF Group (ZF Friedrichshafen AG)",
      role: "IT Security & Networking Intern",
      date: "June 2 – July 3, 2026",
      location: "In-Person | Coimbatore, India",
      description: "Worked with the IT security and operations team at a global automotive technology company, learning core networking and cybersecurity concepts. Performed yearly password reset maintenance and configured Apple A16 iPads for successful deployment."
    },
    {
      company: "Conesta Forge (powered by Fludigo)",
      role: "5-Day AI Build Sprint",
      date: "June 21 – 26, 2026",
      location: "Remote",
      description: "Built and shipped 'Tool Finder' solo, from blank idea to live product in five days under a hard deadline. Finished with a Forge Score of 1,391, placing #33 on the program leaderboard."
    },
    {
      company: "Qaroo",
      role: "Software Intern",
      date: "June 1 – 20, 2026",
      location: "Remote",
      description: "Completed a three-week internship covering the fundamentals of full-stack development and API integration for student platforms."
    },
  ];

  return (
    <section id="experience" ref={containerRef} className="py-48 w-full bg-[#0A0B0F] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <h2 
          className="experience-heading spider-glitch text-[clamp(4rem,10vw,8rem)] md:text-[9rem] lg:text-[12rem] font-black font-heading text-[#EDEDF2] mb-20 tracking-[-0.05em] leading-[0.9]"
          data-text="Experience."
        >
          Experience<span className="text-[#D9A15C]">.</span>
        </h2>

        <div className="relative border-l-2 border-primary/20 ml-4 md:ml-12">
          {experiences.map((exp, idx) => (
            <div
              key={idx}
              ref={(el) => {
                itemsRef.current[idx] = el;
              }}
              className="mb-24 relative pl-10 md:pl-16 group"
            >
              <div className="timeline-dot absolute -left-[11px] top-2 w-4 h-4 rounded-full border-2 border-[#D9A15C]/60 bg-[#0A0B0F] z-10 transition-all duration-500 group-hover:border-[#D9A15C] group-hover:bg-[#D9A15C]/20" />

              <div className="reveal-text transition-transform duration-500 group-hover:translate-x-1">
                <p className="text-[#D9A15C] font-medium tracking-[0.12em] uppercase text-[0.65rem] mb-5">
                  {exp.date} &bull; {exp.location}
                </p>
                <h3 
                  className="spider-glitch text-3xl md:text-4xl font-bold font-heading text-[#EDEDF2] mb-3 tracking-[-0.02em]"
                  data-text={exp.company}
                >
                  {exp.company}
                </h3>
                <p className="text-[#EDEDF2] text-lg font-medium leading-[1.7] mb-4">{exp.role}</p>
                {exp.description && (
                  <p className="text-[#9A9AA5] text-sm md:text-base font-light leading-[1.7]">{exp.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

export default function Education() {
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

      headingSplit = new SplitType(".education-heading", { types: "chars" });
      gsap.from(headingSplit.chars, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
          onEnter: () => {
            const heading = document.querySelector('.education-heading');
            if (heading) {
              heading.classList.add('glitch-active');
              setTimeout(() => heading.classList.remove('glitch-active'), 300);
            }
          }
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

  const educationList = [
    {
      institution: "Karunya Institute of Technology and Sciences",
      degree: "B.Tech — Computer Science & Engineering",
      specialization: "Specialisation: Cybersecurity",
      location: "Coimbatore, India",
      cgpa: "CGPA: 7.06 / 10",
    },
  ];

  return (
    <section id="education" ref={containerRef} className="py-48 w-full bg-[#0C0D12] relative overflow-hidden border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <h2 className="education-heading text-[clamp(4rem,10vw,8rem)] md:text-[9rem] lg:text-[12rem] font-black font-heading text-[#EDEDF2] mb-20 tracking-[-0.05em] leading-[0.9]">
          Education<span className="text-[#D9A15C]">.</span>
        </h2>

        <div className="relative border-l-2 border-primary/20 ml-4 md:ml-12">
          {educationList.map((edu, idx) => (
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
                  {edu.location}
                </p>
                <h3 className="text-3xl md:text-4xl font-bold font-heading text-[#EDEDF2] mb-3 tracking-[-0.02em]">{edu.institution}</h3>
                <p className="text-[#EDEDF2] text-xl font-medium leading-[1.7] mb-2">{edu.degree}</p>
                <p className="text-[#9A9AA5] text-base font-light leading-[1.7] mb-2">{edu.specialization}</p>
                <p className="text-[#D9A15C]/80 text-sm font-medium tracking-wide">{edu.cgpa}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

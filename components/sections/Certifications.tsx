"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

export default function Certifications() {
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

      headingSplit = new SplitType(".certifications-heading", { types: "chars" });
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

  const certifications = [
    {
      title: "Introduction to IoT and Digital Transformation",
      issuer: "Cisco Networking Academy",
      description: "Covers IoT architecture, connected device ecosystems, and digital transformation strategies in enterprise IT.",
    },
    {
      title: "Red Hat System Administration I (RH124, Ver. 10)",
      issuer: "Red Hat (RHA)",
      description: "Covers Linux CLI, filesystem management, user/group administration, and system services.",
    },
    {
      title: "EC-Council Cybersecurity Workshop",
      issuer: "EC-Council",
      description: "Certificate of Participation — 1 CPE credit.",
    },
  ];

  return (
    <section id="certifications" ref={containerRef} className="py-32 w-full bg-[#0A0B0F] overflow-hidden relative border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="certifications-heading text-[clamp(2.5rem,8vw,5rem)] font-black font-heading text-[#EDEDF2] mb-20 text-center tracking-[-0.03em] leading-[0.92]">
          Certifications<span className="text-[#D9A15C]">.</span>
        </h2>

        <div className="flex flex-col gap-10 items-center">
          {certifications.map((cert, idx) => (
            <div
              key={idx}
              ref={(el) => {
                itemsRef.current[idx] = el;
              }}
              className="w-full md:w-[85%] bg-[#0F111A] border border-white/5 rounded-[1.5rem] p-8 shadow-lg relative overflow-hidden group hover:-translate-y-1 hover:scale-[1.02] hover:border-[#D9A15C]/40 transition-all duration-300 ease-out hover:shadow-[0_0_35px_rgba(217,161,92,0.1)] cursor-default"
            >
              <div className="relative z-10 transition-transform duration-500 group-hover:translate-x-1">
                <p className="text-[#D9A15C] font-medium tracking-[0.12em] uppercase text-[0.65rem] mb-4">
                  {cert.issuer}
                </p>
                <h3 className="text-2xl md:text-3xl font-bold font-heading text-[#EDEDF2] mb-4 tracking-[-0.02em]">
                  {cert.title}
                </h3>
                <p className="text-[#9A9AA5] text-sm md:text-base leading-[1.7] font-light">
                  {cert.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import AnimatedButton from "../AnimatedButton";

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current || !bgRef.current) return;

    let mm = gsap.matchMedia();

    // Desktop parallax only
    mm.add("(min-width: 768px)", () => {
      gsap.fromTo(
        bgRef.current,
        { y: "-30%" },
        {
          y: "30%",
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    });
    
    // Massive heading mask reveal
    const headingSplit = new SplitType(".contact-heading", { types: "chars" });
    gsap.fromTo(headingSplit.chars, {
      y: 50,
      opacity: 0,
    }, {
      scrollTrigger: {
        trigger: containerRef.current,
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
      mm.revert();
      headingSplit.revert();
    };
  }, []);

  return (
    <section id="contact" ref={containerRef} className="relative min-h-[100vh] flex flex-col items-center justify-center py-40 overflow-hidden border-t border-white/5 bg-[#0C0D12]">
      {/* Parallax Background */}
      <div 
        ref={bgRef}
        className="absolute inset-[-30%] z-0 bg-[radial-gradient(ellipse_at_center,rgba(217,161,92,0.05)_0%,rgba(10,11,15,1)_65%)] md:block"
      />


      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center">
        <h2 className="contact-heading text-[clamp(3rem,10vw,4rem)] md:text-[8rem] font-black font-heading text-[#EDEDF2] mb-6 tracking-[-0.04em] leading-[0.92]">
          Let&apos;s<br/>Connect<span className="text-[#D9A15C]">.</span>
        </h2>
        
        <p className="text-base md:text-lg text-[#9A9AA5] mb-16 font-light max-w-lg mx-auto leading-[1.7]">
          Always open for a chat about cybersecurity, development, or the next big MCU theory.
        </p>

        <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-8 mb-24">
          <div className="hover:scale-105 transition-transform duration-300">
            <AnimatedButton href="mailto:allan22kj@gmail.com">
              Say hello
            </AnimatedButton>
          </div>
          <div className="hover:scale-105 transition-transform duration-300">
            <AnimatedButton href="tel:+919361409760">
              +91 93614 09760
            </AnimatedButton>
          </div>
        </div>

        <div className="flex justify-center items-center gap-8 border-t border-white/8 pt-12 w-full max-w-md mx-auto">
          <a
            href="https://linkedin.com/in/allan-k-j-21389838a"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium tracking-[0.08em] uppercase text-[#9A9AA5] hover:text-[#D9A15C] transition-all duration-300"
          >
            LinkedIn
          </a>
          <span className="w-1 h-1 rounded-full bg-[#8FD9FF]/40" />
          <a
            href="https://github.com/ALLAN-KJ"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium tracking-[0.08em] uppercase text-[#9A9AA5] hover:text-[#D9A15C] transition-all duration-300"
          >
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}

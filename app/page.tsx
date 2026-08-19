"use client";

import { useState, useEffect } from "react";
import Scene from "@/components/Scene";
import Header from "@/components/Header";
import FadeInText from "@/components/FadeInText";
import AnimatedButton from "@/components/AnimatedButton";
import Footer from "@/components/Footer";
import { Marquee } from "@/components/ui/marquee";

export default function Home() {
  const techStack = [
    { name: "Python", icon: "🐍" },
    { name: "C", icon: "⚙️" },
    { name: "HTML5", icon: "🌐" },
    { name: "CSS3", icon: "🎨" },
    { name: "JavaScript", icon: "⚡" },
    { name: "Git", icon: "📦" },
    { name: "VS Code", icon: "💻" },
    { name: "React", icon: "⚛️" },
    { name: "Next.js", icon: "▲" },
    { name: "Tailwind", icon: "🌊" },
    { name: "Linux", icon: "🐧" },
  ];

  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    // Force page to start at top on reload so the 3D card entrance animation is always visible
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }
      window.scrollTo(0, 0);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10 && !isRevealed) {
        setIsRevealed(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isRevealed]);

  return (
    <main id="main-scroll-container" className="relative bg-black overflow-x-hidden selection:bg-blue-500/30">
      
      {/* Living Background Atmosphere */}
      <div className="fixed inset-0 z-0 pointer-events-none aurora-bg"></div>
      <div className="fixed inset-0 z-0 pointer-events-none noise-overlay"></div>
      
      <Header />
      
      {/* Landing Prompt */}
      {!isRevealed && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce z-50 pointer-events-none opacity-80">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-blue-400 mb-2">
            Scroll to explore
          </span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
            <path d="M12 5v14M19 12l-7 7-7-7"/>
          </svg>
        </div>
      )}

      {/* 3D Scene Background Fixed to screen */}
      <div id="scene-container" className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <Scene />
        </div>
      </div>

      {/* Foreground Content */}
      <div className={`relative z-10 w-full transition-opacity duration-1000 ${isRevealed ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        
        {/* HERO SECTION */}
        <section id="hero" className="flex min-h-[100vh] flex-col items-center justify-center px-4 text-center pointer-events-auto pt-[15vh]">
          <FadeInText className="flex flex-col items-center justify-center mt-32">
            
            <h1 className="text-6xl font-black tracking-tighter text-white md:text-9xl drop-shadow-2xl mt-16">
              Allan K J
            </h1>
            <p className="mt-8 max-w-3xl text-xl md:text-2xl text-zinc-400 leading-relaxed font-light">
              Second-year Computer Science Engineering student specializing in <strong className="font-semibold text-blue-400">Cybersecurity</strong>, working across enterprise IT security, networking, and full-stack development.
            </p>
            <div className="mt-12 flex gap-6 pointer-events-auto">
              <AnimatedButton href="#experience">
                View My Work
              </AnimatedButton>
            </div>
          </FadeInText>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="flex min-h-screen items-center justify-center px-6 py-40 pointer-events-auto bg-gradient-to-b from-transparent to-black/80">
          <div className="max-w-5xl w-full mx-auto">
            <FadeInText>
              <h2 className="text-4xl font-black tracking-tight text-white md:text-7xl mb-12 drop-shadow-xl">
                About Me
              </h2>
              <div className="p-10 md:p-16 rounded-[2rem] bg-zinc-950/70 border border-white/5 backdrop-blur-2xl shadow-2xl hover:border-blue-500/20 transition-colors duration-500">
                <p className="text-2xl text-white font-semibold mb-4 tracking-tight">
                  B.Tech Computer Science & Engineering (Cybersecurity)
                </p>
                <p className="text-lg text-blue-400 mb-10 font-medium">
                  Karunya Institute of Technology and Sciences, Coimbatore — expected May 2029.
                </p>
                <p className="text-xl text-zinc-400 leading-relaxed font-light">
                  Comfortable working directly with production systems, from adjusting an internal HMI control interface at ZF Group to shipping a complete web application in a five-day build sprint. Particularly interested in the intersection of system security and practical software development.
                </p>
              </div>
            </FadeInText>
          </div>
        </section>

        {/* TECH STACK SECTION (Marquee) */}
        <section className="py-24 pointer-events-auto bg-zinc-950/80 border-y border-white/5 backdrop-blur-2xl overflow-hidden flex flex-col items-center relative z-10">
          <FadeInText className="w-full">
            <h2 className="text-sm font-bold text-blue-400 mb-12 tracking-[0.2em] uppercase text-center">
              Tech Stack & Tools
            </h2>
          </FadeInText>
          <div className="relative flex w-full flex-col items-center justify-center overflow-hidden pointer-events-auto">
            <Marquee pauseOnHover className="[--duration:30s]">
              {techStack.map((tech, idx) => (
                <div key={idx} className="flex items-center gap-3 px-8 py-4 mx-4 rounded-2xl bg-zinc-950/70 border border-white/5 backdrop-blur-2xl hover:border-blue-500/30 hover:bg-zinc-800/80 transition-colors cursor-pointer group">
                  <span className="text-2xl group-hover:scale-110 transition-transform">{tech.icon}</span>
                  <span className="text-lg font-medium text-zinc-300 group-hover:text-white transition-colors">{tech.name}</span>
                </div>
              ))}
            </Marquee>
            <Marquee reverse pauseOnHover className="[--duration:30s] mt-4">
              {techStack.slice().reverse().map((tech, idx) => (
                <div key={idx} className="flex items-center gap-3 px-8 py-4 mx-4 rounded-2xl bg-zinc-950/70 border border-white/5 backdrop-blur-2xl hover:border-blue-500/30 hover:bg-zinc-800/80 transition-colors cursor-pointer group">
                  <span className="text-2xl group-hover:scale-110 transition-transform">{tech.icon}</span>
                  <span className="text-lg font-medium text-zinc-300 group-hover:text-white transition-colors">{tech.name}</span>
                </div>
              ))}
            </Marquee>
            {/* Fade edges */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-black/80 to-transparent"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-black/80 to-transparent"></div>
          </div>
        </section>

        {/* EXPERIENCE SECTION */}
        <section id="experience" className="flex min-h-screen flex-col justify-center px-6 py-40 bg-zinc-950/80 backdrop-blur-2xl border-b border-white/5 pointer-events-auto relative z-10">
          <div className="max-w-7xl mx-auto w-full relative z-10">
            <FadeInText>
              <h2 className="text-4xl font-black tracking-tight text-white md:text-7xl mb-24 text-center">
                Experience & Projects
              </h2>
            </FadeInText>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
              {[
                { 
                  label: "ZF", title: "ZF Group", role: "IT Security & Networking Intern", date: "June–July 2026", 
                  desc: [
                    "Made targeted UI changes to an internal HMI control system built in React and TypeScript, used for monitoring an industrial oil bath process.",
                    "Handled password resets and yearly password reset cycles as part of maintaining cybersecurity hygiene across enterprise accounts.",
                    "Configured 16 iPads and successfully delivered them for deployment.",
                    "Learned core networking concepts, including how brute-force attacks occur and are mitigated."
                  ]
                },
                { 
                  label: "CF", title: "Conesta Forge", role: "5-Day AI Build Sprint", date: "June 2026", 
                  desc: [
                    "Built and shipped 'Tool Finder,' taking it from a blank idea to a live, working product in five days.",
                    "Finished with a Forge Score of 1,391, placing #33 on the program leaderboard.",
                    "Participated in and completed the 5-day build sprint."
                  ]
                },
                { 
                  label: "QA", title: "Qaroo", role: "Full-Stack Development Intern", date: "June 2026", 
                  desc: [
                    "Completed a three-week internship covering full-stack development and API integration.",
                    "Helped distribute completion certificates."
                  ]
                }
              ].map((item, i) => (
                <FadeInText key={i} className="p-10 rounded-3xl bg-zinc-900/70 backdrop-blur-2xl border border-white/5 flex flex-col h-full hover:scale-[1.03] hover:-translate-y-1 hover:bg-zinc-800/80 hover:border-blue-500/50 hover:shadow-[0_4px_20px_rgba(37,99,235,0.2)] transition-all duration-300 group">
                  <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-8 border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors">
                    <span className="text-blue-400 font-bold text-lg">{item.label}</span>
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-xs text-blue-400 mb-8 font-semibold tracking-widest uppercase leading-loose">{item.role} <br/>({item.date})</p>
                  <ul className="text-zinc-400 flex-grow font-light leading-relaxed text-base space-y-3 list-disc list-inside">
                    {item.desc.map((bullet, idx) => (
                      <li key={idx} className="pl-1 -indent-5 ml-5">{bullet}</li>
                    ))}
                  </ul>
                </FadeInText>
              ))}
            </div>

            <div className="flex flex-col gap-8">
              <FadeInText className="p-12 md:p-16 rounded-[3rem] bg-zinc-950 border border-white/5 relative overflow-hidden group hover:scale-[1.03] hover:-translate-y-1 hover:border-purple-500/50 hover:shadow-[0_4px_20px_rgba(168,85,247,0.2)] transition-all duration-300">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.1),transparent_50%)]"></div>
                <div className="relative z-10">
                  <span className="inline-block px-5 py-2 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold tracking-[0.2em] uppercase mb-8 border border-blue-500/20">
                    Project Highlight
                  </span>
                  <h3 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight tracking-tight">
                    Qaroo Student LMS
                  </h3>
                  <p className="text-2xl text-blue-400 mb-8 font-medium">
                    Full-Stack Learning Management System
                  </p>
                  <p className="text-xl text-zinc-400 max-w-4xl leading-relaxed font-light mb-12">
                    A comprehensive Learning Management System built during a full-stack development internship at Qaroo, featuring seamless API integrations and robust backend architecture.
                  </p>
                  <AnimatedButton href="https://github.com/suressvar/Student-LMS" target="_blank" rel="noopener noreferrer">
                    View on GitHub
                  </AnimatedButton>
                </div>
              </FadeInText>

              <FadeInText className="p-12 md:p-16 rounded-[3rem] bg-zinc-950 border border-white/5 relative overflow-hidden group hover:scale-[1.03] hover:-translate-y-1 hover:border-purple-500/50 hover:shadow-[0_4px_20px_rgba(168,85,247,0.2)] transition-all duration-300">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(37,99,235,0.1),transparent_50%)]"></div>
                <div className="relative z-10">
                  <span className="inline-block px-5 py-2 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold tracking-[0.2em] uppercase mb-8 border border-blue-500/20">
                    Web Development
                  </span>
                  <h3 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight tracking-tight">
                    Personal Portfolio Website
                  </h3>
                  <p className="text-2xl text-blue-400 mb-4 font-medium">
                    3D Interactive Site
                  </p>
                  <p className="text-sm font-bold text-zinc-500 tracking-widest uppercase mb-8">
                    Next.js • TypeScript • Three.js • GSAP • Tailwind CSS
                  </p>
                  <p className="text-xl text-zinc-400 max-w-4xl leading-relaxed font-light mb-12">
                    Built a personal portfolio site featuring an interactive 3D scene with scroll-linked animation, using React Three Fiber for 3D rendering and GSAP ScrollTrigger for scroll-driven transitions. Implemented smooth-scroll UX (Lenis) and post-processing visual effects (bloom, depth) for a polished, cinematic presentation.
                  </p>
                  <AnimatedButton href="https://github.com/ALLAN-KJ" target="_blank" rel="noopener noreferrer">
                    View on GitHub
                  </AnimatedButton>
                </div>
              </FadeInText>
            </div>

          </div>
        </section>

        {/* ACHIEVEMENTS / CERTIFICATIONS & COMPETITIONS */}
        <section id="achievements" className="py-40 px-6 pointer-events-auto bg-gradient-to-t from-black/80 to-transparent">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
            
            {/* Certifications Cards */}
            <div>
              <FadeInText>
                <h2 className="text-4xl font-black tracking-tight text-white mb-16">
                  Certifications
                </h2>
                <div className="space-y-6">
                  <div className="p-8 rounded-3xl bg-zinc-950/70 backdrop-blur-2xl border border-white/5 hover:scale-[1.03] hover:-translate-y-1 hover:border-teal-500/50 hover:bg-zinc-900/80 hover:shadow-[0_4px_20px_rgba(20,184,166,0.2)] transition-all duration-300 group">
                    <span className="text-xs font-bold text-teal-400 tracking-widest uppercase mb-4 block">Cisco Networking Academy</span>
                    <h3 className="text-2xl font-bold text-white mb-3">Introduction to IoT & Digital Transformation</h3>
                    <p className="text-zinc-400 font-light leading-relaxed">Fundamental concepts of the Internet of Things, connected devices, and enterprise digital evolution.</p>
                  </div>
                  <div className="p-8 rounded-3xl bg-zinc-950/70 backdrop-blur-2xl border border-white/5 hover:scale-[1.03] hover:-translate-y-1 hover:border-teal-500/50 hover:bg-zinc-900/80 hover:shadow-[0_4px_20px_rgba(20,184,166,0.2)] transition-all duration-300 group">
                    <span className="text-xs font-bold text-teal-400 tracking-widest uppercase mb-4 block">Red Hat</span>
                    <h3 className="text-2xl font-bold text-white mb-3">Red Hat System Administration I (RH124)</h3>
                    <p className="text-zinc-400 font-light leading-relaxed">Core administration tasks, command-line operations, and foundational security in enterprise Linux environments.</p>
                  </div>
                </div>
              </FadeInText>
            </div>
            
            {/* Vertical Timeline */}
            <div>
              <FadeInText>
                <h2 className="text-4xl font-black tracking-tight text-white mb-16">
                  Competitions
                </h2>
                <div className="relative border-l border-white/10 ml-4 pl-10 space-y-12 py-4">
                  
                  {/* Timeline Item 1 */}
                  <div className="relative group hover:scale-[1.03] hover:-translate-y-1 hover:bg-zinc-900/30 p-4 -ml-4 rounded-2xl transition-all duration-300 border border-transparent hover:border-amber-500/50 hover:shadow-[0_4px_20px_rgba(245,158,11,0.1)]">
                    <div className="absolute -left-[45px] top-5 h-5 w-5 rounded-full border-[4px] border-black bg-amber-500 group-hover:shadow-[0_0_15px_rgba(245,158,11,1)] transition-shadow"></div>
                    <span className="text-sm font-bold text-amber-400 tracking-widest uppercase block mb-2">June 2026</span>
                    <h3 className="text-2xl font-bold text-white mb-3">Conesta Forge (5-Day AI Build Sprint)</h3>
                    <p className="text-zinc-400 font-light leading-relaxed">
                      Shipped a working web application solo, finishing #33 on the leaderboard.
                    </p>
                  </div>

                  {/* Timeline Item 2 */}
                  <div className="relative group hover:scale-[1.03] hover:-translate-y-1 hover:bg-zinc-900/30 p-4 -ml-4 rounded-2xl transition-all duration-300 border border-transparent hover:border-amber-500/50 hover:shadow-[0_4px_20px_rgba(245,158,11,0.1)]">
                    <div className="absolute -left-[45px] top-5 h-5 w-5 rounded-full border-[4px] border-black bg-amber-500 group-hover:shadow-[0_0_15px_rgba(245,158,11,1)] transition-shadow"></div>
                    <span className="text-sm font-bold text-amber-400 tracking-widest uppercase block mb-2">2026</span>
                    <h3 className="text-2xl font-bold text-white mb-3">Aurelion Hackathon (24-Hour)</h3>
                    <p className="text-zinc-400 font-light leading-relaxed">
                      Participated as part of a small team.
                    </p>
                  </div>

                  {/* Timeline Item 3 */}
                  <div className="relative group hover:scale-[1.03] hover:-translate-y-1 hover:bg-zinc-900/30 p-4 -ml-4 rounded-2xl transition-all duration-300 border border-transparent hover:border-amber-500/50 hover:shadow-[0_4px_20px_rgba(245,158,11,0.1)]">
                    <div className="absolute -left-[45px] top-5 h-5 w-5 rounded-full border-[4px] border-black bg-zinc-600 group-hover:bg-amber-500 group-hover:shadow-[0_0_15px_rgba(245,158,11,1)] transition-all"></div>
                    <span className="text-sm font-bold text-amber-400 tracking-widest uppercase block mb-2">March 27-28, 2026</span>
                    <h3 className="text-2xl font-bold text-white mb-3">Mindkraft 2026 (Karunya Institute)</h3>
                    <p className="text-zinc-400 font-light leading-relaxed">
                      Took part in three cybersecurity- and IoT-focused events — "Hashes over Roses 3.0," "Crypto Crime 2.0," and "IoT Inferno – The MindKraft Challenge" — held 27–28 March 2026.
                    </p>
                  </div>

                </div>
              </FadeInText>
            </div>
          </div>
        </section>

        {/* CONTACT / CLOSING SECTION */}
        <section id="closing" className="flex min-h-screen flex-col items-center justify-center px-4 text-center pointer-events-auto relative">
          
          <FadeInText className="flex flex-col items-center justify-center bg-zinc-950/90 p-16 md:p-32 rounded-[4rem] border border-white/5 backdrop-blur-2xl shadow-2xl relative z-10 w-full max-w-5xl">
            <h2 className="text-5xl font-black tracking-tight text-white md:text-8xl mb-8">
              Let's Connect
            </h2>
            <div className="flex gap-8 mb-16 flex-wrap justify-center">
              <a href="https://linkedin.com/in/allan-k-j-21389838a" target="_blank" rel="noopener noreferrer" className="text-lg font-medium text-zinc-400 hover:text-blue-400 transition-colors underline underline-offset-8 decoration-white/10 hover:decoration-blue-400">
                LinkedIn
              </a>
              <span className="text-zinc-700">•</span>
              <a href="https://github.com/ALLAN-KJ" target="_blank" rel="noopener noreferrer" className="text-lg font-medium text-zinc-400 hover:text-blue-400 transition-colors underline underline-offset-8 decoration-white/10 hover:decoration-blue-400">
                GitHub
              </a>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 justify-center w-full max-w-lg">
              <div className="w-full">
                <AnimatedButton href="mailto:allank@karunya.edu.in?subject=Hello%20Allan" target="_blank" rel="noopener noreferrer">
                  Email Me
                </AnimatedButton>
              </div>
              <div className="w-full">
                <AnimatedButton href="tel:+919361409760" target="_blank" rel="noopener noreferrer">
                  93614 09760
                </AnimatedButton>
              </div>
            </div>
          </FadeInText>
        </section>

        <Footer />
      </div>
    </main>
  );
}

"use client";

import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "motion/react";
import Link from "next/link";
import { useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Header() {
  const { scrollY, scrollYProgress } = useScroll();
  const [isOpen, setIsOpen] = useState(false);
  
  // Nav bar shrinks as you scroll
  const navHeight = useTransform(scrollY, [0, 100], [80, 60]);
  const navBackground = useTransform(scrollY, [0, 100], ["rgba(10, 10, 10, 0)", "rgba(10, 10, 11, 0.9)"]);
  const navBackdropFilter = useTransform(scrollY, [0, 100], ["blur(0px)", "blur(24px)"]);
  
  // Progress bar smoothing
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const links = [
    { name: "Home", href: "#hero", id: "hero" },
    { name: "Projects", href: "#projects", id: "projects" },
    { name: "Experience", href: "#experience", id: "experience" },
    { name: "Skills", href: "#skills", id: "skills" },
    { name: "Competitions", href: "#competitions", id: "competitions" },
    { name: "Contact", href: "#contact", id: "contact" },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const triggers: ScrollTrigger[] = [];
    
    links.forEach(link => {
      const section = document.getElementById(link.id);
      const navItem = document.getElementById(`nav-${link.id}`);
      const mobileNavItem = document.getElementById(`mobile-nav-${link.id}`);
      
      if (section && (navItem || mobileNavItem)) {
        const trigger = ScrollTrigger.create({
          trigger: section,
          start: "top center",
          end: "bottom center",
          onToggle: (self) => {
            if (self.isActive) {
              if (navItem) navItem.classList.add("text-[#D9A15C]");
              if (navItem) navItem.classList.remove("text-[#9A9AA5]");
              if (mobileNavItem) mobileNavItem.classList.add("text-[#D9A15C]");
              if (mobileNavItem) mobileNavItem.classList.remove("text-[#9A9AA5]");
            } else {
              if (navItem) navItem.classList.remove("text-[#D9A15C]");
              if (navItem) navItem.classList.add("text-[#9A9AA5]");
              if (mobileNavItem) mobileNavItem.classList.remove("text-[#D9A15C]");
              if (mobileNavItem) mobileNavItem.classList.add("text-[#9A9AA5]");
            }
          }
        });
        triggers.push(trigger);
      }
    });
    
    return () => {
      triggers.forEach(t => t.kill());
    };
  }, []);

  return (
    <>
      <motion.header
        style={{
          height: navHeight,
          backgroundColor: navBackground,
          backdropFilter: navBackdropFilter,
          WebkitBackdropFilter: navBackdropFilter
        }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 border-b border-primary/20 shadow-lg shadow-black/20 transition-colors"
      >
        <div className="text-sm font-semibold font-heading text-[#EDEDF2] tracking-[0.06em] uppercase hover:text-[#D9A15C] transition-colors">
          Allan K J
        </div>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-4 lg:gap-8">
          <nav className="flex gap-4 lg:gap-8">
            {links.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                id={`nav-${link.id}`}
                className="nav-link glitch-hover text-[0.7rem] font-medium tracking-[0.12em] uppercase text-[#9A9AA5] hover:text-[#EDEDF2] transition-all duration-300 p-2 min-h-[44px] inline-flex items-center focus-visible:text-[#EDEDF2] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D9A15C]/50 rounded-sm"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Social Icons */}
          <div className="flex items-center gap-2 border-l border-white/10 pl-4 lg:pl-6">
            <a
              href="https://github.com/ALLAN-KJ"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#9A9AA5] hover:text-[#EDEDF2] transition-colors p-2 inline-flex items-center justify-center focus-visible:text-[#EDEDF2] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D9A15C]/50 rounded-sm"
              aria-label="GitHub Profile"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com/in/allan-k-j-21389838a"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#9A9AA5] hover:text-[#D9A15C] transition-colors p-2 inline-flex items-center justify-center focus-visible:text-[#D9A15C] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D9A15C]/50 rounded-sm"
              aria-label="LinkedIn Profile"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Mobile Hamburger */}
        <button 
          className="md:hidden p-2 text-white hover:text-primary transition-colors flex flex-col justify-center items-center gap-1.5 w-12 h-12 z-[60]"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          <motion.span animate={isOpen ? { rotate: 45, y: 8, backgroundColor: "var(--primary)" } : { rotate: 0, y: 0, backgroundColor: "#fff" }} className="w-6 h-0.5 block transition-transform"></motion.span>
          <motion.span animate={isOpen ? { opacity: 0 } : { opacity: 1, backgroundColor: "#fff" }} className="w-6 h-0.5 block transition-opacity"></motion.span>
          <motion.span animate={isOpen ? { rotate: -45, y: -8, backgroundColor: "var(--primary)" } : { rotate: 0, y: 0, backgroundColor: "#fff" }} className="w-6 h-0.5 block transition-transform"></motion.span>
        </button>

        {/* Progress Bar */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#D9A15C]/70 origin-left"
          style={{ scaleX }}
        />
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {links.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                id={`mobile-nav-${link.id}`}
                onClick={() => setIsOpen(false)}
                className="glitch-hover text-lg font-medium tracking-[0.12em] uppercase text-[#9A9AA5] hover:text-[#D9A15C] transition-all duration-300 min-h-[44px] flex items-center justify-center p-4 w-full focus-visible:text-[#D9A15C] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D9A15C]/50 rounded-sm"
              >
                {link.name}
              </Link>
            ))}

            <div className="flex items-center gap-6 mt-4 pt-6 border-t border-white/10">
              <a
                href="https://github.com/ALLAN-KJ"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#9A9AA5] hover:text-[#EDEDF2] transition-colors p-2 inline-flex items-center gap-2 text-sm uppercase tracking-[0.12em]"
                aria-label="GitHub Profile"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/allan-k-j-21389838a"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#9A9AA5] hover:text-[#D9A15C] transition-colors p-2 inline-flex items-center gap-2 text-sm uppercase tracking-[0.12em]"
                aria-label="LinkedIn Profile"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                LinkedIn
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

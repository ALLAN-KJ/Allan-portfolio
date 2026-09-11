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
        <nav className="hidden md:flex gap-4 lg:gap-8">
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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

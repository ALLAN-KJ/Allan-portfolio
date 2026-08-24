"use client";

import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "motion/react";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const { scrollY, scrollYProgress } = useScroll();
  const [isOpen, setIsOpen] = useState(false);
  
  // Nav bar shrinks as you scroll
  const navHeight = useTransform(scrollY, [0, 100], [80, 60]);
  const navBackground = useTransform(scrollY, [0, 100], ["rgba(10, 10, 10, 0)", "rgba(0, 0, 0, 0.9)"]);
  const navBackdropFilter = useTransform(scrollY, [0, 100], ["blur(0px)", "blur(24px)"]);
  
  // Progress bar smoothing
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const links = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Achievements", href: "#achievements" },
    { name: "Contact", href: "#closing" },
  ];

  return (
    <>
      <motion.header
        style={{
          height: navHeight,
          backgroundColor: navBackground,
          backdropFilter: navBackdropFilter,
          WebkitBackdropFilter: navBackdropFilter
        }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 border-b border-blue-500/20 shadow-lg shadow-black/20"
      >
        <div className="text-xl font-bold text-white tracking-tighter">Allan K J</div>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-4 lg:gap-8">
          {links.map((link) => (
            <Link key={link.name} href={link.href} className="text-sm font-medium text-zinc-400 hover:text-white transition-colors p-2 min-h-[44px] inline-flex items-center">
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Hamburger */}
        <button 
          className="md:hidden p-2 text-white flex flex-col justify-center items-center gap-1.5 w-12 h-12 z-[60]"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          <motion.span animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }} className="w-6 h-0.5 bg-white block transition-transform"></motion.span>
          <motion.span animate={isOpen ? { opacity: 0 } : { opacity: 1 }} className="w-6 h-0.5 bg-white block transition-opacity"></motion.span>
          <motion.span animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }} className="w-6 h-0.5 bg-white block transition-transform"></motion.span>
        </button>

        {/* Progress Bar */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-500 origin-left shadow-[0_0_10px_rgba(37,99,235,0.8)]"
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
                onClick={() => setIsOpen(false)}
                className="text-2xl font-black text-zinc-400 hover:text-white transition-colors min-h-[44px] flex items-center justify-center p-4 w-full"
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

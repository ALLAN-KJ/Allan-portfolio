"use client";

import { motion, useScroll, useTransform, useSpring } from "motion/react";
import Link from "next/link";

export default function Header() {
  const { scrollY, scrollYProgress } = useScroll();
  
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

  return (
    <motion.header
      style={{
        height: navHeight,
        backgroundColor: navBackground,
        backdropFilter: navBackdropFilter,
        WebkitBackdropFilter: navBackdropFilter
      }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 border-b border-blue-500/20 shadow-lg shadow-black/20"
    >
      <div className="text-xl font-bold text-white tracking-tighter">Brand™</div>
      <nav className="flex gap-8">
        <Link href="#hero" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Home</Link>
        <Link href="#about" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">About</Link>
        <Link href="#experience" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Experience</Link>
        <Link href="#achievements" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Achievements</Link>
        <Link href="#closing" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Contact</Link>
      </nav>

      {/* Progress Bar */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-500 origin-left shadow-[0_0_10px_rgba(37,99,235,0.8)]"
        style={{ scaleX }}
      />
    </motion.header>
  );
}

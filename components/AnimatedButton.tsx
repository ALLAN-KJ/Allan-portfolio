"use client";

import { motion } from "motion/react";
import React from "react";

export default function AnimatedButton({ children, href = "#", target, rel, className = "" }: { children: React.ReactNode, href?: string, target?: string, rel?: string, className?: string }) {
  return (
    <motion.a
      href={href}
      target={target}
      rel={rel}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      className={`glitch-hover inline-flex items-center justify-center rounded-full bg-[#D9A15C] px-8 py-4 text-sm font-semibold uppercase tracking-[0.1em] text-[#0A0B0F] min-h-[44px] shadow-[0_0_20px_rgba(217,161,92,0.25)] transition-colors duration-300 hover:bg-[#C4903F] hover:shadow-[0_0_30px_rgba(217,161,92,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9A15C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0B0F] ${className}`}
    >
      {children}
    </motion.a>
  );
}

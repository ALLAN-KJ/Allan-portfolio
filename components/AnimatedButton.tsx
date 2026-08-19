"use client";

import { motion } from "motion/react";
import React from "react";

export default function AnimatedButton({ children, href = "#", target, rel }: { children: React.ReactNode, href?: string, target?: string, rel?: string }) {
  return (
    <motion.a
      href={href}
      target={target}
      rel={rel}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      className="mt-8 inline-flex items-center justify-center rounded-full bg-blue-600 px-8 py-4 text-sm font-semibold text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-colors hover:bg-blue-500 hover:shadow-[0_0_30px_rgba(37,99,235,0.7)]"
    >
      {children}
    </motion.a>
  );
}

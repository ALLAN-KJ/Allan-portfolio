"use client";

import { motion } from "motion/react";

interface GalleryCardProps {
  title: string;
  category: string;
  color: string;
}

export default function GalleryCard({ title, category, color }: GalleryCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, rotate: 1 }}
      whileTap={{ scale: 0.98 }}
      className="group relative h-80 w-full overflow-hidden rounded-2xl cursor-pointer"
    >
      <div 
        className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-80"
        style={{ backgroundColor: color }}
      />
      
      {/* Glassmorphism content overlay */}
      <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
        <p className="text-xs font-semibold uppercase tracking-wider text-white/70 mb-2">
          {category}
        </p>
        <h3 className="text-xl font-bold text-white">
          {title}
        </h3>
      </div>
      
      {/* Shine effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-tr from-transparent via-white to-transparent transform -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-in-out" />
    </motion.div>
  );
}

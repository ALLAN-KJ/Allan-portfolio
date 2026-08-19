"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-[#0a0a0a] py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start">
          <span className="text-2xl font-bold text-white tracking-tighter mb-2">Allan K J</span>
          <p className="text-sm text-zinc-500">
            Cybersecurity & Full-Stack Development.
          </p>
        </div>

        {/* Links */}
        <div className="flex gap-6">
          <Link href="https://github.com/ALLAN-KJ" target="_blank" rel="noopener noreferrer" className="text-sm text-zinc-400 hover:text-blue-400 transition-colors">GitHub</Link>
          <Link href="https://linkedin.com/in/allan-k-j-21389838a" target="_blank" rel="noopener noreferrer" className="text-sm text-zinc-400 hover:text-blue-400 transition-colors">LinkedIn</Link>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="max-w-7xl mx-auto mt-12 text-center md:text-left">
        <p className="text-xs text-zinc-600">
          &copy; {new Date().getFullYear()} Allan K J. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

"use client";

import React, { useEffect } from 'react';
import BookScene from '@/components/book/BookScene';
import Book from '@/components/book/Book';

export default function NexusLogin() {
  // Lock scroll when on the login page to ensure the 3D book experience is full-screen
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto'; // restore
    };
  }, []);

  return (
    <main className="fixed inset-0 z-50 bg-[#04020a] overflow-hidden selection:bg-[#c9a84c]/30 text-[#ddd5c8]">
      {/* Background 3D Scene */}
      <BookScene />
      
      {/* Interactive 3D Book */}
      <Book />
    </main>
  );
}

"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { Magnetic } from "./animations/Magnetic";

export function FloatingWhatsApp() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.5, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.8, type: "spring" }}
      className="fixed bottom-6 right-6 z-50 md:bottom-12 md:right-12"
    >
      <Magnetic strength={0.2}>
        <a 
          href="https://wa.me/62881025610837" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#25D366] text-white shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:shadow-[0_0_40px_rgba(37,211,102,0.6)] transition-all duration-300 hover:scale-110"
        >
          {/* Ripple effect */}
          <span className="absolute inset-0 rounded-full border-2 border-[#25D366] opacity-0 group-hover:animate-ping"></span>
          
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-7 h-7 md:w-8 md:h-8"
          >
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
          </svg>
        </a>
      </Magnetic>
    </motion.div>
  );
}

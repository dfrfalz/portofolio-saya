"use client";

import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { FaGithub as Github, FaInstagram as Instagram } from "react-icons/fa6";
import { HeroBackground } from "@/components/HeroBackground";
import { PremiumProfileImage } from "@/components/ui/PremiumProfileImage";
import Link from "next/link";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);
  
  // Scroll-linked fade out
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Desktop: parallax Y + fade | Mobile: only fade (no jerky Y movement)
  const yTextScroll = useTransform(scrollYProgress, [0, 1], [0, isMobile ? 0 : 300]);
  const opacityText = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 40, opacity: 0, filter: "blur(10px)" },
    visible: { 
      y: 0, 
      opacity: 1, 
      filter: "blur(0px)",
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } 
    },
  };

  return (
    <section 
      ref={containerRef} 
      className="relative h-[100svh] min-h-[600px] md:min-h-[800px] w-full flex flex-col justify-center items-center overflow-hidden px-4 md:px-8"
    >
      <HeroBackground />

      {/* Main Content — smooth fade on scroll, no Y jerk on mobile */}
      <motion.div
        style={{ 
          y: yTextScroll,
          opacity: opacityText 
        }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center md:justify-between text-center md:text-left mt-16 md:mt-12 gap-8 md:gap-12"
      >
        <div className="flex flex-col items-center md:items-start max-w-4xl">
          {/* Mobile Profile Image */}
          <motion.div variants={itemVariants} className="block md:hidden mb-6">
            <PremiumProfileImage size="sm" />
          </motion.div>

          <motion.div variants={itemVariants} className="overflow-hidden mb-4 md:mb-10">
            <div className="inline-flex items-center gap-2 md:gap-3 px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl">
              <span className="relative flex h-2 w-2 md:h-2.5 md:w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 md:h-2.5 md:w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-[0.65rem] md:text-xs tracking-[0.15em] md:tracking-[0.2em] uppercase font-medium text-white/80">
                Available for freelance
              </span>
            </div>
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="text-[2.8rem] leading-[0.9] sm:text-6xl md:text-[7rem] lg:text-[9rem] font-bold tracking-tighter text-white mix-blend-difference"
          >
            Creative <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-white/90 to-white/30 italic font-medium pr-2 md:pr-4">
              Developer.
            </span>
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="mt-6 md:mt-12 text-sm md:text-2xl text-white/60 max-w-md md:max-w-2xl font-light leading-relaxed mix-blend-difference"
          >
            I craft digital experiences that combine sophisticated engineering with premium, cinematic design.
          </motion.p>

          <motion.div variants={itemVariants} className="mt-8 md:mt-16 flex flex-col sm:flex-row gap-5 md:gap-8 items-center md:items-start w-full md:w-auto">
            <a href="#work" className="group relative w-full sm:w-auto px-8 md:px-10 py-4 md:py-6 rounded-full bg-white text-black font-semibold tracking-wide text-sm overflow-hidden flex items-center justify-center">
              <span className="relative z-10 flex items-center gap-2 transition-transform duration-500 group-hover:-translate-y-20">
                Explore Work
              </span>
              <span className="absolute inset-0 z-10 flex items-center justify-center gap-2 translate-y-full transition-transform duration-500 group-hover:translate-y-0">
                Explore Work
              </span>
            </a>
            
            <div className="flex gap-3 md:gap-4">
              <a 
                href="https://github.com/dfrfalz" 
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/10 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-full" />
                <Github size={18} className="text-white/80 group-hover:text-white transition-colors" />
              </a>
              <a 
                href="https://instagram.com/lostt.js" 
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/10 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-[#fd5949] to-[#d6249f] opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-full" />
                <Instagram size={18} className="text-white/80 group-hover:text-white transition-colors" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Desktop Profile Image */}
        <motion.div 
          variants={itemVariants}
          className="hidden md:block relative z-10"
        >
          <PremiumProfileImage size="hero" />
        </motion.div>
      </motion.div>

      {/* Scroll indicator — hidden on mobile to save space */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-4 z-10 mix-blend-difference hidden md:flex"
      >
        <span className="text-[0.65rem] uppercase tracking-[0.3em] text-white/50 rotate-90 origin-bottom translate-y-12 mb-16">
          Scroll
        </span>
        <div className="w-[1px] h-16 bg-white/20 relative overflow-hidden">
          <motion.div 
            animate={{ y: ["-100%", "200%"] }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="w-full h-1/2 bg-white absolute top-0 left-0"
          />
        </div>
      </motion.div>
    </section>
  );
}

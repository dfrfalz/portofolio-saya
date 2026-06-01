"use client";

import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface PremiumProfileImageProps {
  src?: string;
  alt?: string;
  className?: string;
  size?: "sm" | "md" | "lg" | "hero" | "about";
}

const DEFAULT_IMAGE = "https://res.cloudinary.com/dvpm3w0ed/image/upload/v1780296497/WhatsApp_Image_2026-06-01_at_13.47.12_t4nq2p.jpg";

export function PremiumProfileImage({
  src = DEFAULT_IMAGE,
  alt = "Profile image",
  className = "",
  size = "md",
}: PremiumProfileImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [imageError, setImageError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  // Size mapping — mobile sizes are controlled, desktop stays large
  const sizeClasses = {
    sm: "w-28 h-28 md:w-40 md:h-40 rounded-full",
    md: "w-40 h-52 md:w-64 md:h-80 rounded-[1.5rem] md:rounded-[2rem]",
    lg: "w-56 h-72 md:w-80 md:h-[28rem] rounded-[2rem] md:rounded-[2.5rem]",
    hero: "w-48 h-48 md:w-[32rem] md:h-[32rem] rounded-full md:rounded-[4rem]",
    about: "w-full max-w-[280px] aspect-[3/4] md:w-[26rem] md:aspect-[9/16] rounded-[1.5rem] md:rounded-[3rem]",
  };

  const finalSrc = imageError ? DEFAULT_IMAGE : src;

  return (
    <div ref={containerRef} className={cn("relative group", className)}>
      {/* Background Glow — simplified on mobile (no rotation animation) */}
      {!isMobile && (
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.4, 0.6, 0.4],
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
          className={cn(
            "absolute -inset-4 blur-3xl rounded-full bg-gradient-to-tr from-primary via-purple-500/30 to-emerald-400/20 z-0 opacity-40 group-hover:opacity-80 transition-opacity duration-700",
            sizeClasses[size]
          )}
        />
      )}
      {/* Static glow on mobile */}
      {isMobile && (
        <div
          className={cn(
            "absolute -inset-3 blur-2xl rounded-full bg-gradient-to-tr from-primary/30 via-purple-500/20 to-emerald-400/10 z-0 opacity-30",
            sizeClasses[size]
          )}
        />
      )}

      <motion.div
        animate={isMobile ? undefined : { y: [0, -10, 0] }}
        transition={isMobile ? undefined : { duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className={cn(
          "relative z-10 p-[2px] overflow-hidden",
          "[mask-image:linear-gradient(to_bottom,black_70%,transparent_100%)]",
          "[-webkit-mask-image:linear-gradient(to_bottom,black_70%,transparent_100%)]",
          sizeClasses[size]
        )}
      >
        {/* Animated Gradient Border Glow — only on desktop */}
        {!isMobile && (
          <>
            <div className="absolute inset-0 z-0 bg-[conic-gradient(from_0deg_at_50%_50%,rgba(255,255,255,0)_0%,rgba(255,255,255,0.8)_20%,rgba(255,255,255,0)_40%)] animate-[spin_4s_linear_infinite] opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 z-0 bg-[conic-gradient(from_180deg_at_50%_50%,rgba(0,0,0,0)_0%,theme(colors.primary)_20%,rgba(0,0,0,0)_40%)] animate-[spin_4s_linear_infinite] opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
          </>
        )}
        {/* Simple border on mobile */}
        {isMobile && (
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-white/30 via-primary/20 to-transparent" />
        )}

        {/* Inner Container */}
        <div className="absolute inset-[2px] bg-black z-10 rounded-[inherit] overflow-hidden">
          <img
            src={finalSrc}
            alt={alt}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />

          {/* Glassmorphism Inner Shadow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/10 pointer-events-none mix-blend-overlay" />
        </div>
      </motion.div>

      {/* Floating Particles — only on desktop */}
      {!isMobile && Array.from({ length: 4 }).map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, Math.random() * -30 - 10, 0],
            x: [0, (Math.random() - 0.5) * 30, 0],
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
          className={cn(
            "absolute w-1.5 h-1.5 rounded-full bg-white blur-[1px] z-20 pointer-events-none",
            i === 0 ? "top-4 left-4" : "",
            i === 1 ? "top-1/4 right-0 bg-primary" : "",
            i === 2 ? "bottom-12 left-2" : "",
            i === 3 ? "bottom-4 right-1/4" : ""
          )}
        />
      ))}
    </div>
  );
}

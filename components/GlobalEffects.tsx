"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function GlobalEffects() {
  // Cursor state
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);
  const [isPointer, setIsPointer] = useState(false);

  // Smooth spring for cursor
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only enable custom cursor on non-touch devices
    if (window.matchMedia("(pointer: fine)").matches) {
      setIsPointer(true);
    }

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if the hovered element or its parents is clickable
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest(".cursor-pointer")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* 1. Cinematic Vignette */}
      <div className="pointer-events-none fixed inset-0 z-[100] mix-blend-multiply opacity-60">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,#000_150%)]" />
      </div>

      {/* 2. Animated Film Grain/Noise */}
      <div 
        className="pointer-events-none fixed inset-0 z-[110] opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />

      {/* 3. Custom Cursor */}
      {isPointer && (
        <motion.div
          className={cn(
            "pointer-events-none fixed top-0 left-0 z-[999] rounded-full mix-blend-difference flex items-center justify-center transition-all duration-300 ease-out",
            isHovering ? "w-16 h-16 bg-white/20 border border-white/50 backdrop-blur-sm -ml-4 -mt-4" : "w-8 h-8 bg-white -ml-0 -mt-0"
          )}
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
          }}
        >
          {isHovering && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-2 h-2 bg-white rounded-full"
            />
          )}
        </motion.div>
      )}
    </>
  );
}

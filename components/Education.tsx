"use client";

import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Award } from "lucide-react";
import { cn } from "@/lib/utils";

const educationData = [
  {
    id: 1,
    school: "University of Technology",
    major: "B.Sc. in Computer Science",
    year: "2020 — 2024",
    description: "Specialized in software engineering, graphics programming, and creative development. Led the university's web development club.",
    achievements: ["Summa Cum Laude", "Best Capstone Project"],
  },
  {
    id: 2,
    school: "Creative Arts Academy",
    major: "Digital Design Diploma",
    year: "2018 — 2020",
    description: "Focus on UI/UX, typography, and interactive media. Bridged the gap between visual design and front-end execution.",
    achievements: ["Awwwards Young Jury", "Design Excellence Award"],
  }
];

export function Education() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="academic" className="relative py-20 md:py-56 px-4 md:px-8 max-w-7xl mx-auto min-h-[60vh] md:min-h-[80vh]">
      <div className="mb-16 md:mb-40 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-4 md:mb-6"
        >
          <GraduationCap size={14} className="text-white/70 md:w-4 md:h-4" />
          <span className="text-[0.65rem] md:text-xs tracking-[0.15em] md:tracking-[0.2em] uppercase font-medium text-white/70">
            Academic Background
          </span>
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-7xl font-bold tracking-tighter"
        >
          Education & <br className="md:hidden" /> Experience
        </motion.h2>
      </div>

      <div ref={containerRef} className="relative max-w-4xl mx-auto">
        {/* Central Animated Timeline Line */}
        <div className="absolute left-[15px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[1px] bg-white/10">
          <motion.div 
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-primary via-white to-transparent shadow-[0_0_15px_rgba(255,255,255,0.5)]"
            style={{ height: lineHeight }}
          />
        </div>

        <div className="flex flex-col gap-10 md:gap-24">
          {educationData.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <div key={item.id} className="relative flex flex-col md:flex-row items-start md:items-center justify-between w-full group">
                
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-1/2 -translate-x-[2px] md:-translate-x-1/2 flex items-center justify-center w-8 h-8 z-10 mt-4 md:mt-0">
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="w-3 h-3 rounded-full bg-white group-hover:scale-150 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.8)] transition-all duration-500"
                  />
                  {/* Outer pulse — hidden on mobile for perf */}
                  <div className="absolute inset-0 rounded-full border border-white/30 animate-ping opacity-0 group-hover:opacity-100 transition-opacity hidden md:block" />
                </div>

                {/* Left side */}
                <div className={cn(
                  "w-full md:w-[45%] pl-10 md:pl-0 flex flex-col",
                  isEven ? "md:items-end md:text-right" : "md:order-last md:items-start md:text-left"
                )}>
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col"
                  >
                    <span className="text-xs md:text-sm font-semibold tracking-widest uppercase text-white/50 mb-1 md:mb-2">
                      {item.year}
                    </span>
                    <h3 className="text-xl md:text-4xl font-bold tracking-tight mb-1 md:mb-2">
                      {item.major}
                    </h3>
                    <p className="text-sm md:text-lg text-primary/80 font-medium">{item.school}</p>
                  </motion.div>
                </div>

                {/* Right side */}
                <div className={cn(
                  "w-full md:w-[45%] pl-10 md:pl-0 mt-3 md:mt-0",
                  !isEven ? "md:order-first md:items-end md:text-right" : "md:items-start md:text-left"
                )}>
                  <motion.div
                    initial={{ opacity: 0, x: !isEven ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="relative p-4 md:p-8 rounded-xl md:rounded-2xl border border-white/5 bg-white/[0.02] group-hover:bg-white/[0.04] group-hover:border-white/10 transition-all duration-500 overflow-hidden"
                  >
                    {/* Hover Glow — desktop only */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl hidden md:block" />
                    
                    <p className="relative z-10 text-white/60 leading-relaxed font-light text-sm md:text-base mb-4 md:mb-6">
                      {item.description}
                    </p>

                    <div className="relative z-10 flex flex-wrap gap-2">
                      {item.achievements.map((achievement, i) => (
                        <div key={i} className="flex items-center gap-1.5 md:gap-2 px-2.5 md:px-3 py-1 md:py-1.5 rounded-md bg-black/50 border border-white/10 text-[0.65rem] md:text-xs font-medium text-white/80">
                          <Award size={12} className="text-primary/70 md:w-3.5 md:h-3.5" />
                          {achievement}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

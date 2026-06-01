"use client";

import { motion } from "framer-motion";
import { Code2, Database, Layout, Sparkles, Terminal, Palette } from "lucide-react";
import { cn } from "@/lib/utils";

const skillCategories = [
  {
    title: "Frontend Engineering",
    icon: <Layout className="w-6 h-6 text-emerald-400" />,
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    description: "Building fluid, accessible, and performant user interfaces.",
  },
  {
    title: "Motion & Animation",
    icon: <Sparkles className="w-6 h-6 text-purple-400" />,
    skills: ["Framer Motion", "GSAP", "Three.js", "WebGL"],
    description: "Crafting immersive cinematic experiences and interactions.",
  },
  {
    title: "Creative Design",
    icon: <Palette className="w-6 h-6 text-pink-400" />,
    skills: ["Figma", "UI/UX", "Prototyping", "Wireframing"],
    description: "Designing premium, high-end aesthetics and layouts.",
  },
  {
    title: "Backend Architecture",
    icon: <Database className="w-6 h-6 text-blue-400" />,
    skills: ["Node.js", "PostgreSQL", "Prisma", "Redis"],
    description: "Designing scalable and secure server-side solutions.",
  },
];

export function Skills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section id="skills" className="relative py-32 md:py-48 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row gap-12 justify-between items-start mb-24">
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6">
            <Code2 size={16} className="text-white/70" />
            <span className="text-xs tracking-[0.2em] uppercase font-medium text-white/70">
              Technical Arsenal
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
            The tools behind the <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/30">
              magic.
            </span>
          </h2>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="text-lg md:text-xl text-white/50 max-w-md font-light leading-relaxed"
        >
          I leverage cutting-edge technologies to bridge the gap between design and engineering, ensuring every pixel performs beautifully.
        </motion.p>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {skillCategories.map((category, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="group relative p-8 md:p-10 rounded-3xl border border-white/10 bg-white/[0.02] overflow-hidden hover:bg-white/[0.04] transition-colors duration-500"
          >
            {/* Animated Hover Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            {/* Ambient glow behind icon */}
            <div className="absolute top-10 left-10 w-24 h-24 bg-white/5 blur-2xl rounded-full group-hover:bg-white/10 transition-colors duration-700 pointer-events-none" />

            <div className="relative z-10">
              <div className="mb-6 p-4 rounded-2xl bg-black/40 border border-white/10 inline-block">
                {category.icon}
              </div>
              
              <h3 className="text-2xl font-semibold mb-3 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/50 transition-all duration-300">
                {category.title}
              </h3>
              
              <p className="text-white/60 mb-8 font-light leading-relaxed">
                {category.description}
              </p>

              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, idx) => (
                  <div 
                    key={idx}
                    className="px-4 py-2 rounded-full border border-white/10 bg-black/30 text-sm text-white/80 group-hover:border-white/20 transition-colors duration-300"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

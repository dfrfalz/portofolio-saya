"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "lenis/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const projects = [
  {
    id: "aetheria",
    title: "Lost Assistant WhatsAap",
    category: "Automation",
    year: "2025",
    description: "Sistem otomatisasi WhatsApp yang andal yang dibangun dengan Node.js untuk menyederhanakan komunikasi dan keterlibatan pengguna.",
    image: "https://res.cloudinary.com/dvpm3w0ed/image/upload/v1780322491/Cuplikan_layar_2026-06-01_210113_kgyrsi.png",
  },
  {
    id: "nova",
    title: "Website Praktikum",
    category: "Website",
    year: "2026",
    description: "Sebuah platform cerdas yang dibangun dengan Supabase dan API Gemini & Grok untuk mengotomatiskan pemilihan tema dan logika guna mencegah plagiarisme dalam laporan akademik.",
    image: "https://res.cloudinary.com/dvpm3w0ed/image/upload/v1780323360/Cuplikan_layar_2026-06-01_211542_j5ymmy.png",
  },
  {
    id: "lumina",
    title: "Lumina",
    category: "E-Commerce",
    year: "2024",
    description: "Reimagining the luxury e-commerce experience with fluid transitions, micro-interactions, and premium typography.",
    image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2600&auto=format&fit=crop",
  },
  {
    id: "horizon",
    title: "Horizon",
    category: "Brand Identity",
    year: "2023",
    description: "A complete digital transformation for an architecture firm, focusing on minimalism and spatial design principles on the web.",
    image: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2670&auto=format&fit=crop",
  }
];

// Desktop: GSAP horizontal scroll
function DesktopProjects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useLenis(() => {
    ScrollTrigger.update();
  });

  useGSAP(() => {
    const slider = sliderRef.current;
    const section = sectionRef.current;
    if (!slider || !section) return;

    const getScrollAmount = () => slider.scrollWidth - window.innerWidth;

    gsap.to(slider, {
      x: () => -getScrollAmount(),
      ease: "none",
      scrollTrigger: {
        trigger: section,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        end: () => "+=" + getScrollAmount(),
        invalidateOnRefresh: true,
      },
    });

    if (progressRef.current) {
      gsap.to(progressRef.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => "+=" + getScrollAmount(),
          scrub: 1,
        },
      });
    }

    ScrollTrigger.refresh();
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="work" className="relative w-full h-screen bg-black overflow-hidden">
      <div className="absolute top-12 left-12 z-50 pointer-events-none mix-blend-difference">
        <h2 className="text-base uppercase tracking-[0.3em] font-semibold text-white/70">
          Selected Works
        </h2>
      </div>

      <div ref={sliderRef} className="flex h-screen will-change-transform">
        {projects.map((project, i) => (
          <div
            key={project.id}
            className="project-panel relative w-screen h-screen flex-shrink-0 flex items-center justify-center p-12 overflow-hidden group"
          >
            <div className="relative w-full h-[90vh] rounded-[2rem] overflow-hidden bg-black/50 border border-white/5">
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <div className="project-image w-full h-full scale-110">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-50 transition-opacity duration-1000 group-hover:opacity-70"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent w-1/2 pointer-events-none" />
              </div>

              <div className="absolute inset-0 p-20 flex flex-col justify-center z-10">
                <div className="flex flex-row justify-between items-end w-full gap-8">
                  <div className="max-w-4xl">
                    <div className="flex items-center gap-4 mb-6">
                      <span className="w-12 h-[1px] bg-white/30" />
                      <span className="text-sm uppercase tracking-[0.3em] text-white/70 font-medium">
                        0{i + 1} // {project.category}
                      </span>
                    </div>

                    <h3 className="text-[9rem] font-bold tracking-tighter text-white leading-[0.9] mb-8 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/50 transition-all duration-700">
                      {project.title}
                    </h3>

                    <p className="text-2xl text-white/60 font-light leading-relaxed max-w-2xl">
                      {project.description}
                    </p>
                  </div>

                  <a href="#" className="flex w-32 h-32 rounded-full border border-white/20 bg-white/5 backdrop-blur-md items-center justify-center hover:bg-white hover:text-black hover:scale-105 transition-all duration-500 overflow-hidden relative group/btn">
                    <div className="absolute inset-0 bg-white translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
                    <ArrowUpRight size={40} className="relative z-10 stroke-1" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-96 h-[2px] bg-white/10 overflow-hidden z-50">
        <div
          ref={progressRef}
          className="h-full bg-white origin-left scale-x-0 will-change-transform"
        />
      </div>
    </section>
  );
}

// Mobile: Simple vertical card layout (no GSAP, no lag)
function MobileProjects() {
  return (
    <section id="work" className="relative py-20 px-4 bg-black">
      <div className="mb-10">
        <h2 className="text-sm uppercase tracking-[0.3em] font-semibold text-white/70">
          Selected Works
        </h2>
      </div>

      <div className="flex flex-col gap-6">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="relative rounded-2xl overflow-hidden border border-white/5 group"
          >
            {/* Image */}
            <div className="relative w-full aspect-[4/3] overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover opacity-70"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-[1px] bg-white/30" />
                <span className="text-[0.6rem] uppercase tracking-[0.2em] text-white/60 font-medium">
                  0{i + 1} // {project.category}
                </span>
              </div>

              <h3 className="text-2xl font-bold tracking-tight text-white mb-2">
                {project.title}
              </h3>

              <p className="text-sm text-white/50 font-light leading-relaxed line-clamp-2">
                {project.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function Projects() {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsMobile(window.innerWidth < 768);

    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!mounted) return null;

  return isMobile ? <MobileProjects /> : <DesktopProjects />;
}

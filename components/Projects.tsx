"use client";

import { useRef, useEffect } from "react";
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
    title: "Aetheria",
    category: "Web3 Experience",
    year: "2025",
    description: "A breathtaking immersive web experience bridging the physical and digital realms through generative art and real-time 3D rendering.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
  },
  {
    id: "nova",
    title: "Nova Engine",
    category: "Creative Development",
    year: "2026",
    description: "A high-performance animation engine designed specifically for modern cinematic web experiences, utilizing WebGL.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop",
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

export function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  // Critical: Sync Lenis smooth scroll with GSAP ScrollTrigger on every frame
  useLenis((lenis) => {
    ScrollTrigger.update();
  });

  useGSAP(() => {
    const slider = sliderRef.current;
    const section = sectionRef.current;
    if (!slider || !section) return;

    const getScrollAmount = () => {
      return slider.scrollWidth - window.innerWidth;
    };

    // Main horizontal scroll tween
    gsap.to(slider, {
      x: () => -getScrollAmount(),
      ease: "none",
      scrollTrigger: {
        trigger: section,
        pin: true,
        pinSpacing: true, // Explicitly create space so Contact doesn't overlap
        scrub: 1,
        end: () => "+=" + getScrollAmount(),
        invalidateOnRefresh: true,
      },
    });

    // Progress bar animation
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

    // Force ScrollTrigger to refresh after everything is set up
    // This tells Lenis the new page height
    ScrollTrigger.refresh();
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="work" className="relative w-full h-screen bg-black overflow-hidden">
      
      {/* Global Section Header */}
      <div className="absolute top-6 left-6 md:top-12 md:left-12 z-50 pointer-events-none mix-blend-difference">
        <h2 className="text-sm md:text-base uppercase tracking-[0.3em] font-semibold text-white/70">
          Selected Works
        </h2>
      </div>

      {/* Horizontal Slider Track */}
      <div ref={sliderRef} className="flex h-screen will-change-transform">
        {projects.map((project, i) => (
          <div 
            key={project.id} 
            className="project-panel relative w-screen h-screen flex-shrink-0 flex items-center justify-center p-4 md:p-12 overflow-hidden group"
          >
            {/* Premium Panel Container */}
            <div className="relative w-full h-[85vh] md:h-[90vh] rounded-[2rem] overflow-hidden bg-black/50 border border-white/5">
              
              {/* Image */}
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <div className="project-image w-full h-full scale-110">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover opacity-60 md:opacity-50 transition-opacity duration-1000 group-hover:opacity-70"
                  />
                </div>
                {/* Cinematic Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent md:w-1/2 pointer-events-none" />
              </div>
              
              {/* Content Overlay */}
              <div className="absolute inset-0 p-8 md:p-20 flex flex-col justify-end md:justify-center z-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end w-full gap-8">
                  
                  <div className="max-w-4xl">
                    <div className="flex items-center gap-4 mb-6">
                      <span className="w-12 h-[1px] bg-white/30" />
                      <span className="text-xs md:text-sm uppercase tracking-[0.3em] text-white/70 font-medium">
                        0{i + 1} // {project.category}
                      </span>
                    </div>
                    
                    <h3 className="text-6xl sm:text-7xl md:text-[9rem] font-bold tracking-tighter text-white leading-[0.9] mb-8 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/50 transition-all duration-700">
                      {project.title}
                    </h3>
                    
                    <p className="text-lg md:text-2xl text-white/60 font-light leading-relaxed max-w-2xl">
                      {project.description}
                    </p>
                  </div>

                  <a href="#" className="hidden md:flex w-32 h-32 rounded-full border border-white/20 bg-white/5 backdrop-blur-md items-center justify-center hover:bg-white hover:text-black hover:scale-105 transition-all duration-500 overflow-hidden relative group/btn">
                    <div className="absolute inset-0 bg-white translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
                    <ArrowUpRight size={40} className="relative z-10 stroke-1" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Scroll Progress Bar */}
      <div className="absolute bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 w-64 md:w-96 h-[2px] bg-white/10 overflow-hidden z-50">
        <div 
          ref={progressRef}
          className="h-full bg-white origin-left scale-x-0 will-change-transform"
        />
      </div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PremiumProfileImage } from "@/components/ui/PremiumProfileImage";

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    // Split text animation or simple opacity reveal
    const words = textRef.current?.querySelectorAll("span");
    
    if (words) {
      gsap.fromTo(words, 
        { opacity: 0.1, y: 10 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            end: "center center",
            scrub: true,
          }
        }
      );
    }
  }, { scope: containerRef });

  const aboutText = "I blend creative vision with technical precision to build digital experiences that leave a lasting impact. My approach focuses on fluid motion, immersive storytelling, and uncompromising performance.";
  const words = aboutText.split(" ");

  return (
    <section 
      id="about" 
      ref={containerRef}
      className="py-20 md:py-56 px-4 md:px-12 max-w-7xl mx-auto min-h-[50vh] md:min-h-[70vh] flex flex-col justify-center"
    >
      <div className="mb-8 md:mb-12">
        <h2 className="text-sm tracking-[0.2em] uppercase text-muted-foreground font-semibold">About Me</h2>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8 md:gap-24 items-center">
        {/* Left Side: Profile Image */}
        <div className="w-full md:w-1/3 flex justify-center md:justify-start">
          <PremiumProfileImage size="about" />
        </div>

        {/* Right Side: Text & Stats */}
        <div className="w-full md:w-2/3 flex flex-col">
          <p ref={textRef} className="text-xl md:text-5xl lg:text-6xl font-medium leading-[1.3] md:leading-[1.2] tracking-tight">
            {words.map((word, i) => (
              <span key={i} className="inline-block mr-2 md:mr-3 mb-1 md:mb-2">{word}</span>
            ))}
          </p>

          <div className="mt-12 md:mt-24 grid grid-cols-3 gap-4 md:gap-12 border-t border-white/10 pt-8 md:pt-16">
            <div>
              <h3 className="text-2xl md:text-4xl font-bold mb-1 md:mb-2">5+</h3>
              <p className="text-xs md:text-base text-muted-foreground">Years of Experience</p>
            </div>
            <div>
              <h3 className="text-2xl md:text-4xl font-bold mb-1 md:mb-2">40+</h3>
              <p className="text-xs md:text-base text-muted-foreground">Projects Delivered</p>
            </div>
            <div>
              <h3 className="text-2xl md:text-4xl font-bold mb-1 md:mb-2">Awwwards</h3>
              <p className="text-xs md:text-base text-muted-foreground">Multiple Recognitions</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

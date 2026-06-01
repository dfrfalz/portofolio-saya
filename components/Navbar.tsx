"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Magnetic } from "@/components/animations/Magnetic";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Home", href: "#" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Academic", href: "#academic" },
  { name: "Work", href: "#work" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const [activeSection, setActiveSection] = useState("Home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = navItems.map((item) => item.href.substring(1)).filter(Boolean);
      let current = "Home";
      
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          // If the section's top has crossed the middle of the screen
          if (rect.top <= window.innerHeight / 2) {
            current = section;
          }
        }
      }
      
      if (window.scrollY < 100) current = "Home";
      
      setActiveSection(current.charAt(0).toUpperCase() + current.slice(1));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setIsMobileMenuOpen(false);
    if (href === "#") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Floating Pill Navbar (Desktop) */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
        className={cn(
          "fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500",
          "w-[90%] max-w-2xl md:w-auto"
        )}
      >
        <div 
          className={cn(
            "flex items-center justify-between px-6 py-3 rounded-full border border-white/10 transition-all duration-500",
            scrolled ? "bg-black/40 backdrop-blur-xl shadow-[0_0_20px_rgba(0,0,0,0.5)]" : "bg-transparent border-transparent"
          )}
        >
          {/* Logo */}
          <Magnetic strength={0.2}>
            <Link 
              href="#" 
              onClick={(e) => handleLinkClick(e, "#")}
              className="text-lg font-bold tracking-tighter uppercase mr-8 relative group"
            >
              <span className="relative z-10 text-white mix-blend-difference">Daffa</span>
            </Link>
          </Magnetic>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.name || (activeSection === "Home" && item.name === "Home");
              return (
                <Magnetic key={item.name} strength={0.2}>
                  <Link
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.href)}
                    className="relative px-4 py-2 rounded-full text-sm font-medium transition-colors"
                  >
                    <span className={cn("relative z-10 transition-colors duration-300", isActive ? "text-black" : "text-white/70 hover:text-white")}>
                      {item.name}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute inset-0 bg-white rounded-full z-0"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </Link>
                </Magnetic>
              );
            })}
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden relative z-50 p-2 text-white/80 hover:text-white transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.header>

      {/* Fullscreen Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-3xl flex flex-col items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-8">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.1 * i, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.href)}
                    className="text-4xl sm:text-6xl font-bold tracking-tighter uppercase text-white hover:text-white/50 transition-colors"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </nav>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-12 text-white/50 text-sm tracking-widest uppercase"
            >
              Creative Developer
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

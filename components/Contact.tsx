"use client";

import { motion } from "framer-motion";
import { Mail, ArrowUpRight } from "lucide-react";
import { Magnetic } from "./animations/Magnetic";

export function Contact() {
  return (
    <section id="contact" className="relative py-40 md:py-56 px-6 overflow-hidden bg-white text-black mt-40 rounded-t-[3rem] md:rounded-t-[6rem]">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="uppercase tracking-widest font-semibold mb-8 text-black/50"
        >
          Have an idea?
        </motion.p>
        
        <motion.h2 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter leading-[0.8] mb-16"
        >
          Let's Work <br/> Together
        </motion.h2>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col md:flex-row gap-6 items-center"
        >
          <a href="mailto:btcdaffa@gmail.com" className="group relative inline-flex items-center justify-center w-40 h-40 md:w-56 md:h-56 bg-black text-white rounded-full text-lg md:text-2xl font-bold tracking-tight hover:scale-105 transition-transform duration-500 shadow-2xl">
            <span className="absolute inset-0 bg-primary/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
            <span className="relative z-10 flex items-center gap-2">
              Say Hello
            </span>
          </a>
        </motion.div>
        
        {/* Email Contact Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 md:mt-24"
        >
          <Magnetic strength={0.1}>
            <a 
              href="mailto:btcdaffa@gmail.com"
              className="group flex items-center gap-4 px-8 py-4 rounded-full border border-black/10 hover:border-black/30 hover:bg-black/5 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors duration-300">
                <Mail size={18} />
              </div>
              <span className="text-lg font-medium tracking-tight">btcdaffa@gmail.com</span>
              <ArrowUpRight size={18} className="text-black/40 group-hover:text-black group-hover:rotate-45 transition-all duration-300" />
            </a>
          </Magnetic>
        </motion.div>
      </div>

      <div className="mt-32 max-w-7xl mx-auto border-t border-black/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm font-medium gap-8 md:gap-4 text-black/60">
        <p>© 2026 Daffa. All rights reserved.</p>
        <div className="flex gap-8">
          <a href="https://github.com/dfrfalz" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors relative group">
            GitHub
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="https://instagram.com/lostt.js" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors relative group">
            Instagram
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="https://wa.me/62881025610837" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors relative group">
            WhatsApp
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full"></span>
          </a>
        </div>
      </div>
    </section>
  );
}

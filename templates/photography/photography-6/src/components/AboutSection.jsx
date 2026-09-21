import React from 'react';
import { motion } from 'framer-motion';

export default function AboutSection({ onGetInTouch }) {
  return (
    <section 
      id="about" 
      className="w-full max-w-full box-border px-4 sm:px-6 lg:px-12 py-20 lg:py-28 bg-[#121212] text-white flex justify-center items-center overflow-hidden"
    >
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        
        {/* Left Column: Portrait photo showcase container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, cubicBezier: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-sm sm:max-w-md mx-auto px-4 flex flex-col items-center justify-center"
        >
          <div className="w-full aspect-[4/5] sm:aspect-[3/4] overflow-hidden rounded-2xl flex justify-center items-center mx-auto shadow-2xl border border-white/10">
            <img 
              src="https://images.unsplash.com/photo-1554080353-a576cf803bda?auto=format&fit=crop&w=800&q=80" 
              alt="Kairo Portrait" 
              className="w-full h-full object-cover rounded-2xl block"
            />
          </div>
        </motion.div>

        {/* Right Column: Bio details */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, delay: 0.2, cubicBezier: [0.16, 1, 0.3, 1] }}
          className="flex flex-col justify-center text-left space-y-6"
        >
          {/* Label */}
          <span className="text-[#ff4a3b] text-xs font-bold tracking-[3px] uppercase block font-sans">
            Available for assignments worldwide
          </span>

          {/* Heading */}
          <h2 
            className="text-3xl sm:text-4xl lg:text-5xl font-normal text-white leading-tight tracking-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Hello, I am Kairo.<br/>
            A Fashion & Lifestyle Photographer based in London, UK.
          </h2>

          {/* Bio text */}
          <p className="text-sm sm:text-base leading-relaxed text-stone-300 font-sans font-light">
            My work is defined by a deep appreciation for geometric compositions, high-contrast natural light, and the raw, quiet chemistry between subject and lens. By combining high-fashion editorial aesthetics with contemporary lifestyle storytelling, I aim to create cinematic captures that linger in the mind.
          </p>

          <p className="text-sm sm:text-base leading-relaxed text-stone-400 font-sans font-light">
            Over the past decade, I have collaborated with leading publications and boutique couture labels across Milan, Paris, New York, and Tokyo.
          </p>

          {/* Signature/CTA */}
          <div className="pt-2 flex items-center gap-6">
            <button 
              onClick={onGetInTouch}
              className="inline-block bg-[#ff4a3b] hover:bg-[#e03a2c] text-white text-xs uppercase font-semibold tracking-wider px-8 py-3.5 rounded-full shadow-lg transition-all border-none cursor-pointer"
            >
              Get in Touch
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

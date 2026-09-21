import React from 'react';
import { motion } from 'framer-motion';

export default function AboutSection() {
  const stats = [
    { value: "150+", label: "Shoots Completed" },
    { value: "8+", label: "Years Experience" },
    { value: "40+", label: "Global Clients" }
  ];

  return (
    <section 
      id="about" 
      className="w-full max-w-full overflow-x-hidden bg-[#faf9f6] py-20 sm:py-28 px-4 sm:px-8 text-neutral-900 font-['Poppins',sans-serif]"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-16 items-center">
        {/* Left: Photographer Portrait */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-sm sm:max-w-md mx-auto aspect-[3/4] rounded-2xl overflow-hidden bg-neutral-100 border border-black/5 shadow-sm"
        >
          <img 
            src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80" 
            alt="Lume Photographer Portrait" 
            className="w-full h-full object-cover block"
          />
        </motion.div>

        {/* Right: Bio & Stats */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-xl mx-auto"
        >
          <span className="text-[#ff7a52] text-xs font-bold tracking-[3px] uppercase block mb-3.5">
            Available for assignments worldwide
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-6 tracking-tight text-neutral-900 font-['Playfair_Display',serif]">
            Hello, I'm Lume. A fashion & lifestyle photographer based in New York.
          </h2>
          <p className="text-sm sm:text-base leading-relaxed text-neutral-700 mb-8 font-light">
            My work explores the intersections of light, raw human emotion, and editorial composition. Rooted in cinematic storytelling, I help individuals, agencies, and international brands capture their vision with custom, bespoke visuals.
          </p>

          {/* Stats counters */}
          <div className="flex flex-wrap gap-8 sm:gap-10 border-t border-black/10 pt-8">
            {stats.map((stat, idx) => (
              <div key={idx}>
                <span className="block text-3xl sm:text-4xl font-extrabold text-[#ff7a52] font-['Playfair_Display',serif] mb-1">
                  {stat.value}
                </span>
                <span className="text-xs text-neutral-600 font-semibold uppercase tracking-wider">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

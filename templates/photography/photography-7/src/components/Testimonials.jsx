import React from 'react';
import { motion } from 'framer-motion';

export default function Testimonials() {
  const reviews = [
    {
      quote: "Lume's visual direction completely transformed our collection launch. The composition and play of light feel extremely premium.",
      client: "Sarah Jenkins",
      role: "Creative Director, Vélour Magazine"
    },
    {
      quote: "Absolute professionalism from pre-production to delivery. The portrait series captured precisely the raw elegance we aimed for.",
      client: "Marcus Aurelius",
      role: "Founder, Zenith Campaign"
    }
  ];

  return (
    <section className="w-full max-w-full overflow-x-hidden bg-[#faf9f6] py-20 sm:py-28 px-4 sm:px-8 text-neutral-900 font-['Poppins',sans-serif] border-t border-black/5">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-xs font-bold tracking-[3px] uppercase text-[#ff7a52] block mb-2.5">
            Client Feedback
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 font-['Playfair_Display',serif]">
            Kind Words
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
          {reviews.map((rev, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#f9f9fb] p-8 sm:p-10 rounded-2xl border border-black/5 relative"
            >
              <span className="absolute top-6 left-6 text-7xl sm:text-8xl font-['Playfair_Display',serif] text-[#ff7a52]/10 leading-none pointer-events-none select-none">
                &ldquo;
              </span>
              <p className="text-sm sm:text-base leading-relaxed text-neutral-700 italic font-light mb-6 relative z-10">
                {rev.quote}
              </p>
              <div>
                <strong className="block text-sm sm:text-base font-semibold text-neutral-900">{rev.client}</strong>
                <span className="text-xs text-[#ff7a52] font-semibold">{rev.role}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

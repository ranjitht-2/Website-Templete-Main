import React from 'react';
import { motion } from 'framer-motion';

export default function HeroGrid() {
  const images = [
    {
      src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
      caption: "VOGUE Editorial — Portrait of Clara",
      category: "Fashion / Color"
    },
    {
      src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
      caption: "Sartorial Elegance — Black & White Studio Session",
      category: "Editorial / Monochromatic"
    },
    {
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
      caption: "Summer Horizon — Lifestyle Shoot in Amalfi",
      category: "Lifestyle / Color"
    },
    {
      src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
      caption: "Neon Reverie — Sunset Couture Collection",
      category: "High Fashion / Color"
    },
    {
      src: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80",
      caption: "Quiet Gazes — Studio Portraiture",
      category: "Portrait / Monochromatic"
    },
    {
      src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
      caption: "Drape & Shadows — Fine Art Editorial",
      category: "Fine Art / Monochromatic"
    }
  ];

  return (
    <section id="work" className="w-full max-w-full bg-[#0a0a0a] overflow-hidden m-0 p-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full m-0 p-0 gap-0">
        {images.map((img, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: idx * 0.1, cubicBezier: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden aspect-[3/4] cursor-pointer w-full group"
          >
            <div className="w-full h-full relative">
              <img 
                src={img.src} 
                alt={img.caption} 
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Hover Darken Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/90 via-[#0a0a0a]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col justify-end p-6 sm:p-8 text-left box-border">
                <span className="text-[#ff4a3b] text-xs font-bold tracking-[2px] uppercase font-sans mb-1.5">
                  {img.category}
                </span>
                <h4 
                  className="text-white text-lg sm:text-xl font-medium leading-snug m-0"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {img.caption}
                </h4>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

import React from 'react';
import { siteConfig } from '../data/config';
import ScrollReveal from './ScrollReveal';

export default function Gallery() {
  const fallbackImage = 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80';

  return (
    <section id="portfolio" className="py-24 md:py-36 bg-black text-[#f5f4f1] w-full">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Gallery Title */}
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-16">
          <ScrollReveal>
            <h2 className="text-3xl md:text-5xl font-serif font-light tracking-wide">Selected Works</h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 font-sans mt-3 md:mt-0">
              DOCUMENTING COUTURE LOVE STORIES
            </span>
          </ScrollReveal>
        </div>

        {/* 2x2 Grid Centering on Tablet & Mobile */}
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 items-center justify-center">
          {siteConfig.portfolio.map((item, idx) => {
            const imageSource = item.imageSrc || item.image || fallbackImage;

            return (
              <ScrollReveal key={idx} delay={idx * 0.1}>
                <div className="group cursor-pointer flex flex-col space-y-3">
                  
                  {/* Photo Container with Resilient Image & onError Fallback */}
                  <div className="w-full aspect-[4/3] bg-stone-900 overflow-hidden relative rounded-sm border border-white/5 shadow-2xl">
                    <img
                      src={imageSource}
                      alt={item.title || "Editorial wedding photography"}
                      className="w-full h-full object-cover grayscale contrast-125 hover:scale-105 transition duration-500 block"
                      onError={(e) => {
                        e.currentTarget.src = fallbackImage;
                      }}
                    />

                    {/* Subtle Hover Details Overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 pointer-events-none">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-[#c5a880] mb-1 font-sans">
                        {item.title}
                      </span>
                      <p className="text-sm font-serif font-light text-[#f5f4f1]">
                        {item.caption}
                      </p>
                    </div>
                  </div>

                  {/* Caption & Location Metadata */}
                  <div className="flex justify-between items-baseline pt-1">
                    <span className="font-serif text-sm font-light text-neutral-300">
                      {item.caption}
                    </span>
                    <span className="text-[9px] uppercase tracking-widest text-neutral-500 font-sans">
                      {item.title}
                    </span>
                  </div>

                </div>
              </ScrollReveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}

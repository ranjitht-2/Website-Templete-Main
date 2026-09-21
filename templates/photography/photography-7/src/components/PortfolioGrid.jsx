import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

export default function PortfolioGrid({ onOpenSignIn }) {
  const { isAuthenticated } = useAuth();
  const [favorites, setFavorites] = useState({});

  const projects = [
    { url: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80", title: "Noir Silhouette", category: "Editorial Fashion" },
    { url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80", title: "Golden Hour Bloom", category: "Outdoor Portraiture" },
    { url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80", title: "Velvet Crimson", category: "Vogue Cover" },
    { url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80", title: "Urban Concrete", category: "Street Culture" },
    { url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80", title: "Prism Radiance", category: "Studio Lighting" },
    { url: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80", title: "Windswept Ivory", category: "High Fashion" }
  ];

  const handleToggleFavorite = (e, index, project) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      if (onOpenSignIn) {
        onOpenSignIn(`Sign in to favorite "${project.title}" and save to your client moodboard`, 'portfolio');
      }
      return;
    }

    setFavorites(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <section 
      id="portfolio" 
      className="w-full max-w-full overflow-x-hidden bg-white py-20 sm:py-28 px-4 sm:px-8 text-neutral-900 font-['Poppins',sans-serif]"
    >
      <div className="w-full max-w-sm sm:max-w-md md:max-w-6xl mx-auto flex flex-col items-center">
        {/* Header Title */}
        <div className="mb-12 sm:mb-16 text-center">
          <span className="text-xs font-bold tracking-[3px] uppercase text-[#ff7a52] block mb-2.5">
            Selected Work
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 font-['Playfair_Display',serif]">
            Recent Projects
          </h2>
        </div>

        {/* Centered Gallery Layout across Mobile & Desktop */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 justify-items-center">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-md mx-auto relative group cursor-pointer bg-neutral-100"
            >
              <motion.img
                src={project.url}
                alt={project.title}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full object-cover rounded-2xl block"
              />

              {/* Top Right Save / Favorite Button */}
              <button
                type="button"
                aria-label="Save to Moodboard"
                onClick={(e) => handleToggleFavorite(e, index, project)}
                className={`absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center border transition-all cursor-pointer backdrop-blur-md ${
                  favorites[index]
                    ? 'bg-[#ff7a52] text-white border-[#ff7a52] shadow-md shadow-[#ff7a52]/40'
                    : 'bg-black/30 hover:bg-black/60 text-white border-white/20'
                }`}
              >
                <i className={`fa-${favorites[index] ? 'solid' : 'regular'} fa-heart text-xs`}></i>
              </button>
              
              {/* Tag and Title Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-6 sm:p-7 box-border pointer-events-none">
                <span className="text-[#ff7a52] text-xs font-semibold uppercase tracking-wider mb-1.5 drop-shadow-sm">
                  {project.category}
                </span>
                <h4 className="text-xl sm:text-2xl font-bold text-white font-['Playfair_Display',serif] drop-shadow-sm m-0">
                  {project.title}
                </h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

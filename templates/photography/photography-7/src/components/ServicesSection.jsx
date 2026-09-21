import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

export default function ServicesSection({ onOpenSignIn }) {
  const { isAuthenticated } = useAuth();

  const services = [
    {
      num: "01",
      title: "Portrait Sessions",
      desc: "Tailored lifestyle, headshot, and fine-art studio portraits designed to capture raw, authentic character."
    },
    {
      num: "02",
      title: "Editorial & Fashion",
      desc: "High-contrast modeling portfolios, lookbooks, and high-fashion spreads tailored for magazines and designers."
    },
    {
      num: "03",
      title: "Event Coverage",
      desc: "Cinematic, candid documentation of private parties, exhibitions, launches, and high-end corporate events."
    },
    {
      num: "04",
      title: "Brand Campaigns",
      desc: "Commercial product and narrative photography built to establish a distinct, premium visual footprint."
    }
  ];

  const handleServiceClick = (service) => {
    if (!isAuthenticated) {
      if (onOpenSignIn) {
        onOpenSignIn(`Sign in to reserve a ${service.title} session with Lume Studio`, 'contact');
      }
    } else {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="services" 
      className="w-full max-w-full overflow-x-hidden bg-white py-20 sm:py-28 px-4 sm:px-8 text-neutral-900 font-['Poppins',sans-serif]"
    >
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-xs font-bold tracking-[3px] uppercase text-[#ff7a52] block mb-2.5">
            Our Expertise
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 font-['Playfair_Display',serif]">
            Creative Services
          </h2>
        </div>

        {/* 4-Column Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => handleServiceClick(service)}
              className="bg-[#f9f9fb] p-8 rounded-2xl border border-black/5 hover:-translate-y-1 hover:border-[#ff7a52]/40 hover:shadow-lg hover:shadow-[#ff7a52]/5 transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <span className="text-[#ff7a52] text-3xl font-extrabold block mb-6 font-['Playfair_Display',serif] opacity-85">
                  {service.num}
                </span>
                <h3 className="text-xl font-semibold mb-3 font-['Playfair_Display',serif] text-neutral-900 group-hover:text-[#ff7a52] transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-neutral-700 font-light m-0 mb-6">
                  {service.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-black/5 flex items-center justify-between text-xs font-semibold text-[#ff7a52]">
                <span>{isAuthenticated ? 'Book Package' : 'Sign In to Book'}</span>
                <i className="fa-solid fa-arrow-right transform group-hover:translate-x-1 transition-transform"></i>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

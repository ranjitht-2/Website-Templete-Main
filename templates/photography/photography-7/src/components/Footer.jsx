import React from 'react';

export default function Footer({ onNavClick }) {
  const links = [
    { label: "Home", id: "home" },
    { label: "Portfolio", id: "portfolio" },
    { label: "About", id: "about" },
    { label: "Services", id: "services" },
    { label: "Contact", id: "contact" }
  ];

  const handleNavClick = (sectionId) => {
    if (onNavClick) {
      onNavClick(sectionId);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="w-full max-w-full overflow-x-hidden bg-white border-t border-black/5 py-16 sm:py-20 px-4 sm:px-8 text-neutral-900 font-['Poppins',sans-serif]">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-10">
        {/* Logo */}
        <a 
          href="#home" 
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('home');
          }}
          className="no-underline text-neutral-900 font-extrabold text-2xl tracking-[3px]"
        >
          LUME STUDIO
        </a>

        {/* Small Navigation Links */}
        <div className="flex gap-6 flex-wrap justify-center">
          {links.map((link) => (
            <a 
              key={link.label}
              href={`#${link.id}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.id);
              }}
              className="text-neutral-600 no-underline text-xs font-semibold tracking-wider uppercase hover:text-[#ff7a52] transition-colors cursor-pointer"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-black/5" />

        {/* Lower row */}
        <div className="w-full flex justify-between items-center flex-wrap gap-4 text-xs text-neutral-500">
          <span>&copy; 2026 Lume Studio. All rights reserved.</span>
          <div className="flex gap-5">
            <a href="#" className="text-neutral-500 no-underline hover:text-neutral-900">Privacy Policy</a>
            <a href="#" className="text-neutral-500 no-underline hover:text-neutral-900">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

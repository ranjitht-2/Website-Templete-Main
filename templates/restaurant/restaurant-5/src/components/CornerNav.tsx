import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, UserCheck } from 'lucide-react';
import { NOIRE_IMAGES, NOIRE_CONFIG } from '../data/noireData';
import { noireAudio } from '../utils/noireAudio';
import { useAuth } from '../context/AuthContext';

interface CornerNavProps {
  currentSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenReservation: () => void;
  onNavigateToAuth?: () => void;
}

export const CornerNav: React.FC<CornerNavProps> = ({
  currentSection,
  onNavigate,
  onOpenReservation,
  onNavigateToAuth
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(noireAudio.getMutedState());
  const { user, isAuthenticated, logout } = useAuth();

  const isHome = currentSection === 'hero';

  // Handle ESC Key to Close Menu Overlay
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  // Handle User Interaction for Audio Autoplay Policy & Section Change
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (isHome && !noireAudio.getMutedState()) {
        noireAudio.start();
      }
    };

    window.addEventListener('click', handleFirstInteraction, { once: true });
    window.addEventListener('keydown', handleFirstInteraction, { once: true });
    window.addEventListener('touchstart', handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, [isHome]);

  // Audio active on home page only as specified in requirement
  useEffect(() => {
    if (isHome && !isMuted) {
      noireAudio.start();
    } else {
      noireAudio.stop();
    }
  }, [isHome, isMuted]);

  const handleToggleSound = () => {
    const muted = noireAudio.toggleMute();
    setIsMuted(muted);
  };

  const menuItems = [
    { 
      id: '01', 
      code: '01', 
      label: 'HOME', 
      targetId: 'hero', 
      href: '#hero', 
      image: NOIRE_IMAGES.heroBg 
    },
    { 
      id: '02', 
      code: '02', 
      label: 'RESTAURANT', 
      targetId: 'room', 
      href: '#room', 
      image: NOIRE_IMAGES.roomInterior 
    },
    { 
      id: '03', 
      code: '03', 
      label: 'MENU', 
      targetId: 'menu', 
      href: '#menu', 
      image: NOIRE_IMAGES.signatureSeabass 
    },
    { 
      id: '04', 
      code: '04', 
      label: 'NIGHT', 
      targetId: 'night', 
      href: '#night', 
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80' 
    },
    { 
      id: '05', 
      code: '05', 
      label: 'EVENTS', 
      targetId: 'events', 
      href: '#events', 
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1000&q=80' 
    },
    { 
      id: '06', 
      code: '06', 
      label: 'GALLERY', 
      targetId: 'gallery', 
      href: '#gallery', 
      image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1000&q=80' 
    },
    { 
      id: '07', 
      code: '07', 
      label: 'CONTACT', 
      targetId: 'location', 
      href: '#contact', 
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80' 
    },
    { 
      id: '08', 
      code: '08', 
      label: isAuthenticated ? 'PATRON PROFILE' : 'PATRON ACCESS', 
      targetId: 'patron', 
      href: '#patron', 
      image: 'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=1000&q=80' 
    },
  ];

  const handleLinkClick = (targetId: string) => {
    setIsMenuOpen(false);
    onNavigate(targetId);
  };

  const handleAuthClick = () => {
    setIsMenuOpen(false);
    if (onNavigateToAuth) {
      onNavigateToAuth();
    }
  };

  return (
    <>
      {/* Top Left: Logo */}
      <div className="fixed top-6 left-6 z-40">
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('hero');
          }}
          className="font-display text-2xl font-bold tracking-tighter text-[#F3EBDD] hover:text-[#B87552] transition-colors duration-300"
        >
          NOIRÉ®
        </a>
      </div>

      {/* Top Right: Sound Button + Member Button + Menu Button */}
      <div className="fixed top-6 right-6 z-40 flex items-center space-x-3">
        {/* Member Access Button */}
        {isAuthenticated && user ? (
          <button
            onClick={handleAuthClick}
            className="flex items-center space-x-1.5 bg-[#171512]/90 backdrop-blur-md px-3.5 py-2 border border-[#B87552] font-mono text-xs tracking-widest text-[#B87552] hover:bg-[#B87552] hover:text-[#171512] transition-all duration-300 shadow-sm cursor-pointer"
            title="View NOIRÉ Patron Profile"
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">[ {user.name.split(' ')[0].toUpperCase()} ]</span>
          </button>
        ) : (
          <button
            onClick={handleAuthClick}
            className="flex items-center space-x-1.5 bg-[#171512]/90 backdrop-blur-md px-3.5 py-2 border border-[rgba(243,235,221,0.14)] font-mono text-xs tracking-widest text-[#F3EBDD] hover:border-[#B87552] hover:text-[#B87552] transition-all duration-300 shadow-sm cursor-pointer"
          >
            <span>[ SIGN IN ]</span>
          </button>
        )}

        {/* Ambient Sound Button (Shown on Home Page) */}
        {isHome && (
          <button
            onClick={handleToggleSound}
            className="group flex items-center space-x-2 bg-[#171512]/90 backdrop-blur-md px-3.5 py-2 border border-[rgba(243,235,221,0.14)] font-mono text-xs tracking-widest text-[#F3EBDD] hover:border-[#B87552] hover:text-[#B87552] transition-all duration-300 shadow-sm cursor-pointer"
            title={isMuted ? 'Unmute Ambient Lounge Score' : 'Mute Ambient Lounge Score'}
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5 text-[#B8AA98] group-hover:text-[#B87552]" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-[#B87552] animate-pulse" />
            )}
            <span className="hidden sm:inline">
              {isMuted ? '[ SOUND OFF ]' : '[ SOUND ON ]'}
            </span>
          </button>
        )}

        {/* Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="group flex items-center space-x-2 bg-[#171512]/90 backdrop-blur-md px-4 py-2 border border-[rgba(243,235,221,0.14)] font-mono text-xs tracking-widest text-[#F3EBDD] hover:border-[#B87552] hover:text-[#B87552] transition-all duration-300 shadow-sm cursor-pointer"
          aria-label="Toggle Menu Overlay"
        >
          <span className="w-2 h-2 rounded-full bg-[#B87552] animate-pulse"></span>
          <span>{isMenuOpen ? '[ CLOSE ]' : '[ MENU ]'}</span>
        </button>
      </div>

      {/* Bottom Left: Coordinates */}
      <div className="fixed bottom-6 left-6 z-40 hidden md:block pointer-events-none">
        <div className="font-mono text-[11px] tracking-widest text-[#B8AA98] flex items-center space-x-3 bg-[#171512]/90 backdrop-blur-sm px-3 py-1.5 border border-[rgba(243,235,221,0.14)] shadow-sm">
          <span className="text-[#F3EBDD] font-bold">CHENNAI</span>
          <span>13.0827° N / 80.2707° E</span>
        </div>
      </div>

      {/* Bottom Right: Status Indicator & Quick Reserve */}
      <div className="fixed bottom-6 right-6 z-40 hidden md:flex items-center space-x-4">
        <button
          onClick={onOpenReservation}
          className="btn-copper text-xs px-5 py-2.5 shadow-lg cursor-pointer"
        >
          RESERVE TABLE →
        </button>
        <div className="font-mono text-[11px] tracking-widest text-[#B87552] flex items-center space-x-2 bg-[#171512]/90 backdrop-blur-sm px-3 py-1.5 border border-[#B87552]/40 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#B87552] animate-ping"></span>
          <span>OPEN TONIGHT 19:00 — 01:00</span>
        </div>
      </div>

      {/* Full-Screen Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#171512] text-[#F3EBDD] flex flex-col justify-between p-8 md:p-16 overflow-y-auto animate-fadeIn">
          {/* Header Bar inside Menu */}
          <div className="flex justify-between items-center pb-8 border-b border-[rgba(243,235,221,0.14)]">
            <span className="font-display text-2xl font-bold tracking-tight text-[#F3EBDD]">NOIRÉ®</span>
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <button
                  onClick={() => { logout(); setIsMenuOpen(false); }}
                  className="font-mono text-xs text-[#B8AA98] hover:text-[#B87552] underline cursor-pointer bg-transparent border-none"
                >
                  [ SIGN OUT ]
                </button>
              ) : null}
              <button
                onClick={() => setIsMenuOpen(false)}
                className="font-mono text-sm tracking-widest text-[#B87552] hover:text-[#F3EBDD] transition-colors cursor-pointer bg-transparent border-none"
              >
                [ ESC / CLOSE ]
              </button>
            </div>
          </div>

          {/* Main Navigation Items with Image Previews */}
          <div className="my-auto py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Nav list */}
            <div className="lg:col-span-7 flex flex-col space-y-3">
              {menuItems.map((item) => (
                <div
                  key={item.id}
                  onMouseEnter={() => setActiveImage(item.image)}
                  onMouseLeave={() => setActiveImage(null)}
                  onClick={() => {
                    if (item.targetId === 'patron') {
                      handleAuthClick();
                    } else {
                      handleLinkClick(item.targetId);
                    }
                  }}
                  className="group flex items-baseline space-x-6 cursor-pointer py-2.5 border-b border-[rgba(243,235,221,0.1)] hover:border-[#B87552] transition-colors"
                >
                  <span className="font-mono text-sm text-[#B8AA98] group-hover:text-[#B87552] transition-colors">
                    {item.code}
                  </span>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      if (item.targetId === 'patron') {
                        handleAuthClick();
                      } else {
                        handleLinkClick(item.targetId);
                      }
                    }}
                    className="font-display text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#F3EBDD] group-hover:text-[#B87552] group-hover:translate-x-3 transition-all duration-300 no-underline"
                  >
                    {item.label}
                  </a>
                </div>
              ))}
            </div>

            {/* Hover Image Preview Container */}
            <div className="hidden lg:flex lg:col-span-5 relative w-full h-[450px] bg-[#141414] rounded-2xl overflow-hidden items-center justify-center border border-stone-800/60 shadow-2xl">
              {activeImage ? (
                <img
                  src={activeImage}
                  alt="Experience Preview"
                  className="w-full h-full object-cover transition-opacity duration-300 ease-in-out"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80';
                  }}
                />
              ) : (
                <span className="text-[11px] font-mono tracking-widest text-stone-500 uppercase px-6 text-center">
                  HOVER OVER MENU ITEMS TO PREVIEW EXPERIENCE
                </span>
              )}
            </div>
          </div>

          {/* Footer Bar inside Menu */}
          <div className="pt-8 border-t border-[rgba(243,235,221,0.14)] flex flex-col md:flex-row justify-between text-xs font-mono text-[#B8AA98] space-y-4 md:space-y-0">
            <div>{NOIRE_CONFIG.city} — {NOIRE_CONFIG.tagline}</div>
            <div>RESERVATIONS: {NOIRE_CONFIG.phone}</div>
            <div className="text-[#B87552]">
              <a href={NOIRE_CONFIG.socials.instagram} target="_blank" rel="noreferrer" className="hover:underline">
                INSTAGRAM: @NOIRE.SUPPERCLUB
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

import React from 'react';
import { motion } from 'framer-motion';
import { Maximize2, Bookmark, FileCode, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function ProjectCard({ project, onImageClick, onRequireAuth }) {
  const { isAuthenticated, isProjectSaved, toggleSaveProject } = useAuth();
  const saved = isProjectSaved(project.id);

  const handleSaveClick = (e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      if (onRequireAuth) {
        onRequireAuth('Authenticate to bookmark architectural specifications to your client moodboard.', () => {
          toggleSaveProject(project);
        });
      }
      return;
    }
    toggleSaveProject(project);
  };

  const handleDownloadSpec = (e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      if (onRequireAuth) {
        onRequireAuth('Authenticate to download high-resolution BIM / CAD drawings and architectural specs.');
      }
      return;
    }
    alert(`Downloading BIM / CAD architectural specifications for ${project.title}...`);
  };

  return (
    <div className="group flex flex-col md:grid md:grid-cols-12 gap-8 md:gap-12 py-12 border-b border-[#1a2b4a]/10 items-center">
      {/* Blueprint / Sketch Side */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="col-span-12 md:col-span-5 w-full aspect-[4/3] bg-white blueprint-bg border border-[#1a2b4a]/10 p-6 flex flex-col justify-between relative overflow-hidden shadow-sm"
      >
        <div className="flex justify-between items-center z-10">
          <div className="text-[10px] font-mono tracking-widest text-[#1a2b4a]/50 font-bold uppercase">
            FL-PLAN // CAD STRUCTURAL DATA
          </div>
          <button
            onClick={handleSaveClick}
            className={`p-1.5 border transition cursor-pointer flex items-center gap-1 text-[10px] font-mono uppercase ${
              saved 
                ? 'bg-[#1a2b4a] text-white border-[#1a2b4a]' 
                : 'bg-white/80 hover:bg-white text-[#1a2b4a]/70 hover:text-[#1a2b4a] border-[#1a2b4a]/15'
            }`}
            title={saved ? 'Saved to Moodboard' : 'Save to Moodboard'}
          >
            {saved ? <Check size={11} /> : <Bookmark size={11} />}
            <span className="hidden sm:inline">{saved ? 'SAVED' : 'SAVE'}</span>
          </button>
        </div>

        <img 
          src={project.blueprint} 
          alt="Blueprint sketch" 
          className="absolute inset-0 w-full h-full object-contain mix-blend-multiply opacity-25 group-hover:scale-102 transition-transform duration-700 pointer-events-none"
        />

        <div className="flex flex-wrap gap-x-6 gap-y-2 mt-auto z-10 pt-4 border-t border-[#1a2b4a]/5">
          <div>
            <div className="text-[9px] font-mono tracking-widest text-[#1a2b4a]/50 uppercase font-bold">AREA</div>
            <div className="text-xs font-sans font-medium text-[#1a2b4a]">{project.specs.area}</div>
          </div>
          <div>
            <div className="text-[9px] font-mono tracking-widest text-[#1a2b4a]/50 uppercase font-bold">YEAR</div>
            <div className="text-xs font-sans font-medium text-[#1a2b4a]">{project.specs.year}</div>
          </div>
          <div>
            <div className="text-[9px] font-mono tracking-widest text-[#1a2b4a]/50 uppercase font-bold">LOCATION</div>
            <div className="text-xs font-sans font-medium text-[#1a2b4a]">{project.specs.location}</div>
          </div>
        </div>
      </motion.div>

      {/* Photography Side */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="col-span-12 md:col-span-7 w-full flex flex-col gap-4"
      >
        <div 
          onClick={() => onImageClick(project.images, 0)}
          className="relative aspect-[16/10] bg-zinc-100 overflow-hidden cursor-pointer group/img shadow-sm"
        >
          <img 
            src={project.images[0]} 
            alt={project.title} 
            className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover/img:scale-105"
          />
          <div className="absolute inset-0 bg-[#1a2b4a]/20 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="bg-white/95 text-[#1a2b4a] px-4 py-2 text-xs font-sans tracking-widest uppercase flex items-center gap-2 rounded-sm shadow-md font-semibold transform translate-y-2 group-hover/img:translate-y-0 transition-all duration-300">
              <Maximize2 size={12} /> Expand Gallery
            </div>
          </div>
        </div>
        
        {/* Project details below */}
        <div className="mt-2 flex flex-col md:flex-row md:justify-between md:items-start gap-4">
          <div className="max-w-xl">
            <div className="flex items-center gap-3">
              <h3 className="text-2xl font-light text-[#1a2b4a] tracking-tight font-serif">{project.title}</h3>
              <button
                onClick={handleDownloadSpec}
                className="text-[10px] font-mono tracking-wider text-[#1a2b4a]/60 hover:text-[#1a2b4a] uppercase underline decoration-[#1a2b4a]/30 hover:decoration-[#1a2b4a] transition cursor-pointer flex items-center gap-1 border-none bg-transparent"
              >
                <FileCode size={11} />
                <span>CAD SPEC</span>
              </button>
            </div>
            <p className="mt-2 text-sm text-[#1a2b4a]/75 leading-relaxed font-sans">{project.description}</p>
          </div>
          <div className="border-l border-[#1a2b4a]/10 pl-4 py-1 flex-shrink-0">
            <span className="text-[9px] font-mono tracking-widest text-[#1a2b4a]/40 font-bold uppercase block mb-1">MATERIALS</span>
            <p className="text-xs font-sans font-medium text-[#1a2b4a]/80 max-w-[200px] leading-tight">{project.specs.materials}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

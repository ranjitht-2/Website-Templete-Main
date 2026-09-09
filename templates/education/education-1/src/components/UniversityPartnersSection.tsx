import React from 'react';
import { PageId } from '../types';
import { LogoLoop } from './reactbits/LogoLoop';
import { UNIVERSITIES_DATA } from '../data/edupathData';
import { Building2, ArrowRight } from 'lucide-react';

interface UniversityPartnersSectionProps {
  onNavigate?: (page: PageId) => void;
}

export const UniversityPartnersSection: React.FC<UniversityPartnersSectionProps> = ({ onNavigate }) => {
  return (
    <section id="universities-section" className="py-12 bg-white border-b border-slate-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-indigo-700 uppercase tracking-wider">
            <Building2 className="w-4 h-4 text-indigo-600" />
            <span>GLOBAL ACADEMIC & RESEARCH ALLIANCES</span>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-xs text-slate-500 hidden md:block">
              Curricula certified and co-developed with leading institutions
            </p>
            {onNavigate && (
              <button
                onClick={() => onNavigate('universities')}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 cursor-pointer transition-colors"
              >
                <span>Explore All Partners</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      <LogoLoop items={UNIVERSITIES_DATA} speed={32} />
    </section>
  );
};

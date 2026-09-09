import React, { useState, useMemo } from 'react';
import { PageId, Course, UniversityPartner } from '../types';
import { SpotlightCard } from '../components/reactbits/SpotlightCard';
import { GradientText } from '../components/reactbits/GradientText';
import { UNIVERSITY_PARTNERS_DETAILED, COURSES_DATA } from '../data/edupathData';
import {
  Building2,
  Award,
  GraduationCap,
  Globe,
  BookOpen,
  Sparkles,
  CheckCircle2,
  Search,
  ArrowRight,
  ShieldCheck,
  Filter,
  MapPin,
  ExternalLink,
  School,
  FileCheck,
} from 'lucide-react';

interface UniversitiesPageProps {
  onNavigate: (page: PageId) => void;
  onSelectCourse?: (course: Course) => void;
  onOpenAuth?: (mode: 'login' | 'register') => void;
}

export const UniversitiesPage: React.FC<UniversitiesPageProps> = ({
  onNavigate,
  onSelectCourse,
  onOpenAuth,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<string>('All');
  const [selectedPartnerModal, setSelectedPartnerModal] = useState<UniversityPartner | null>(null);

  const domains = [
    'All',
    'AI & Systems',
    'Computer Science & Quantum',
    'Data Science & Ethics',
    'Leadership & Strategy',
    'Engineering & Cloud',
    'Design & Human-Computer Interaction',
    'Marketing Science & Growth',
  ];

  const filteredPartners = useMemo(() => {
    return UNIVERSITY_PARTNERS_DETAILED.filter((partner) => {
      const matchesSearch =
        partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        partner.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        partner.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        partner.featuredPrograms.some((prog) => prog.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesDomain =
        selectedDomain === 'All' || partner.domain.toLowerCase().includes(selectedDomain.toLowerCase());

      return matchesSearch && matchesDomain;
    });
  }, [searchQuery, selectedDomain]);

  const handleExploreCourse = (courseId?: string) => {
    if (courseId && onSelectCourse) {
      const matched = COURSES_DATA.find((c) => c.id === courseId);
      if (matched) {
        onSelectCourse(matched);
        return;
      }
    }
    onNavigate('courses');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 pb-20 space-y-16">
      {/* 1. Hero Banner */}
      <section className="bg-gradient-to-b from-white via-indigo-50/40 to-[#F8FAFC] py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-200/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center space-y-5 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-mono font-bold uppercase tracking-wider border border-indigo-200 shadow-xs">
            <Building2 className="w-3.5 h-3.5 text-indigo-600" />
            <span>GLOBAL ACADEMIC & RESEARCH ALLIANCES</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-slate-900 leading-[1.15]">
            World-Class University{' '}
            <GradientText colors={['#4F46E5', '#7C3AED', '#2563EB', '#4F46E5']}>
              Partnerships
            </GradientText>
          </h1>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto">
            Skillora collaborates with world-renowned universities and research institutes to co-develop rigorous curriculums, certified degree pathways, and transferable academic credits.
          </p>

          {/* Quick Alliance Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 border border-slate-200/80 shadow-xs text-center">
              <span className="text-2xl sm:text-3xl font-extrabold text-indigo-600 font-mono font-display">8+</span>
              <p className="text-[11px] font-bold text-slate-500 uppercase font-mono tracking-wider mt-0.5">Tier-1 Universities</p>
            </div>
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 border border-slate-200/80 shadow-xs text-center">
              <span className="text-2xl sm:text-3xl font-extrabold text-purple-600 font-mono font-display">95+</span>
              <p className="text-[11px] font-bold text-slate-500 uppercase font-mono tracking-wider mt-0.5">Accredited Modules</p>
            </div>
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 border border-slate-200/80 shadow-xs text-center">
              <span className="text-2xl sm:text-3xl font-extrabold text-cyan-600 font-mono font-display">100%</span>
              <p className="text-[11px] font-bold text-slate-500 uppercase font-mono tracking-wider mt-0.5">Verifiable ECTS</p>
            </div>
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 border border-slate-200/80 shadow-xs text-center">
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600 font-mono font-display">180k+</span>
              <p className="text-[11px] font-bold text-slate-500 uppercase font-mono tracking-wider mt-0.5">Certified Scholars</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Search & Category Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search university, program, or research lab..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-indigo-500 focus:bg-white transition-all"
              />
            </div>

            {/* Filter Domain Indicator */}
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <Filter className="w-3.5 h-3.5 text-indigo-600" />
              <span>Showing {filteredPartners.length} of {UNIVERSITY_PARTNERS_DETAILED.length} Academic Partners</span>
            </div>
          </div>

          {/* Domain Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 no-scrollbar">
            {domains.map((domain) => (
              <button
                key={domain}
                onClick={() => setSelectedDomain(domain)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedDomain === domain
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-600/20'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {domain}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. University Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredPartners.map((partner) => (
            <SpotlightCard
              key={partner.id}
              spotlightColor="rgba(99, 102, 241, 0.08)"
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col justify-between space-y-6 hover:shadow-lg transition-all"
            >
              <div className="space-y-4">
                {/* Header: Crest + Name + Badge */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${partner.logoColor} p-0.5 shadow-md shrink-0 flex items-center justify-center text-white font-display font-extrabold text-xl`}>
                      <div className="w-full h-full rounded-[14px] bg-white/10 backdrop-blur-xs flex items-center justify-center border border-white/20">
                        {partner.name.charAt(0)}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display">
                          {partner.name}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                        <span>{partner.location}</span>
                      </div>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 uppercase tracking-wider shrink-0">
                    {partner.badge}
                  </span>
                </div>

                {/* Ranking & Domain metadata */}
                <div className="flex flex-wrap items-center gap-2 text-[11px]">
                  <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-semibold flex items-center gap-1">
                    <Award className="w-3 h-3 text-amber-500" />
                    <span>{partner.ranking}</span>
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-purple-50 text-purple-700 font-semibold">
                    Est. {partner.established}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    <span>{partner.degreeCredits}</span>
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {partner.description}
                </p>

                {/* Featured Co-Developed Curriculums */}
                <div className="space-y-2 pt-2">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                    Featured Co-Developed Programs:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {partner.featuredPrograms.map((prog, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-700 font-medium"
                      >
                        {prog}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <div className="flex items-center gap-1 text-xs text-indigo-600 font-semibold font-mono">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{partner.accreditedCoursesCount} Accredited Courses</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedPartnerModal(partner)}
                    className="px-3.5 py-2 text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => handleExploreCourse(partner.popularCourseId)}
                    className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold rounded-xl shadow-md shadow-indigo-600/20 transition-all cursor-pointer flex items-center gap-1"
                  >
                    <span>View Courses</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* 4. Accreditation & Credit Transfer Framework */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl space-y-4 relative z-10 mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-cyan-300 text-xs font-mono font-bold uppercase tracking-wider border border-white/15">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>ACADEMIC INTEGRITY & VERIFICATION</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-white">
              Transferable Credits & Blockchain Verification
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Every course co-certified with our university alliances includes verifiable cryptographic credentials and direct European Credit Transfer and Accumulation System (ECTS) compatibility.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3 backdrop-blur-xs">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-400 font-bold">
                <FileCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white font-display">
                Institutional Syllabus Sync
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Course syllabi are reviewed and updated annually alongside department heads and lead faculty to mirror on-campus academic standards.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3 backdrop-blur-xs">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-400 font-bold">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white font-display">
                Verifiable Digital Credentials
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Receive verifiable certificate links signed by accredited university partners for immediate addition to LinkedIn, resumes, and academic transcripts.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3 backdrop-blur-xs">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-400 font-bold">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white font-display">
                Global Faculty Office Hours
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Participate in live monthly AMA webinars, research panels, and digital thesis showcases hosted by university partner professors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Institutional Partnership CTA Banner */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 rounded-3xl p-8 sm:p-12 text-center text-white space-y-6 shadow-xl relative overflow-hidden">
          <div className="space-y-3 relative z-10">
            <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-white">
              Represent a University or Research Lab?
            </h2>
            <p className="text-xs sm:text-sm text-indigo-100 max-w-xl mx-auto">
              Join the Skillora Academic Consortium to publish certified courses, discover top global research scholars, and integrate digital laboratory sandbox environments.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 relative z-10">
            <button
              onClick={() => (onOpenAuth ? onOpenAuth('register') : onNavigate('courses'))}
              className="px-8 py-3.5 bg-white text-indigo-900 hover:bg-slate-100 font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all cursor-pointer transform hover:-translate-y-0.5"
            >
              Apply as Academic Partner
            </button>
            <button
              onClick={() => onNavigate('courses')}
              className="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer border border-white/20"
            >
              Browse Accredited Catalog
            </button>
          </div>
        </div>
      </section>

      {/* 6. University Detail Modal */}
      {selectedPartnerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 border border-slate-200 shadow-2xl space-y-6 relative animate-in zoom-in-95">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${selectedPartnerModal.logoColor} flex items-center justify-center text-white font-display font-extrabold text-xl shadow-md`}>
                  {selectedPartnerModal.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 font-display">
                    {selectedPartnerModal.name}
                  </h3>
                  <p className="text-xs text-slate-500">{selectedPartnerModal.location}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedPartnerModal(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed border-y border-slate-100 py-4">
              <p>{selectedPartnerModal.description}</p>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] font-mono font-bold text-slate-400 block uppercase">Global Rank</span>
                  <span className="text-xs font-bold text-slate-800">{selectedPartnerModal.ranking}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] font-mono font-bold text-slate-400 block uppercase">Credit Value</span>
                  <span className="text-xs font-bold text-slate-800">{selectedPartnerModal.degreeCredits}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setSelectedPartnerModal(null)}
                className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setSelectedPartnerModal(null);
                  handleExploreCourse(selectedPartnerModal.popularCourseId);
                }}
                className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>Explore University Courses</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

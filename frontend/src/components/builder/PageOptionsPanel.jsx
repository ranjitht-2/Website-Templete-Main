import React, { useState, useRef } from 'react';
import {
  Layout,
  X,
  ChevronDown,
  ChevronRight,
  GripVertical,
  Eye,
  EyeOff,
  ArrowUp,
  ArrowDown,
  AlertTriangle,
  Globe,
  Code2,
  SlidersHorizontal,
  Copy,
  Layers,
  HelpCircle,
  Check
} from 'lucide-react';
import {
  PAGE_BASE_TEMPLATES,
  getBaseTemplateById,
  applyBaseTemplateToState
} from '../../services/pageBaseTemplates';

export default function PageOptionsPanel({
  builderState,
  onUpdateState,
  onClose,
  onReorderSectionsInDOM,
  showToast
}) {
  // Accordion Expand/Collapse States
  const [openAccordions, setOpenAccordions] = useState({
    baseTemplate: true,
    pageToggles: true,
    arrangeSections: true,
    metaTags: false,
    customCode: false
  });

  const toggleAccordion = (key) => {
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Drag and Drop state for sections
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const arrangeSectionsRef = useRef(null);

  // Active current template schema
  const currentTemplate = getBaseTemplateById(builderState.pageBaseTemplate || 'standard');

  // Handle Base Template Swap
  const handleSelectTemplate = (templateId) => {
    if (templateId === currentTemplate.id) return;
    const nextState = applyBaseTemplateToState(builderState, templateId);
    onUpdateState(nextState);
    if (showToast) {
      showToast(`Switched layout to ${getBaseTemplateById(templateId).name}`);
    }
  };

  // Section Reordering Helpers
  const handleMoveSection = (index, direction) => {
    const newIdx = index + direction;
    if (newIdx < 0 || newIdx >= builderState.sections.length) return;
    const nextSections = [...builderState.sections];
    const [moved] = nextSections.splice(index, 1);
    nextSections.splice(newIdx, 0, moved);
    onUpdateState({ sections: nextSections });
    if (onReorderSectionsInDOM) {
      onReorderSectionsInDOM(nextSections);
    }
  };

  const handleToggleSectionVisibility = (secId) => {
    const nextSections = builderState.sections.map((s) =>
      s.id === secId ? { ...s, enabled: !s.enabled } : s
    );
    onUpdateState({ sections: nextSections });
    if (onReorderSectionsInDOM) {
      onReorderSectionsInDOM(nextSections);
    }
  };

  // HTML5 Drag and Drop handlers
  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    // Transparent drag preview if needed
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    setDragOverIndex(index);
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === targetIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    const nextSections = [...builderState.sections];
    const [moved] = nextSections.splice(draggedIndex, 1);
    nextSections.splice(targetIndex, 0, moved);

    setDraggedIndex(null);
    setDragOverIndex(null);

    onUpdateState({ sections: nextSections });
    if (onReorderSectionsInDOM) {
      onReorderSectionsInDOM(nextSections);
    }
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  // Scroll to / Focus Section Customizer when "Customize" is clicked
  const handleCustomizeClick = () => {
    setOpenAccordions((prev) => ({ ...prev, arrangeSections: true }));
    if (arrangeSectionsRef.current) {
      arrangeSectionsRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  return (
    <div className="w-80 sm:w-[390px] bg-white border border-slate-200 rounded-2xl flex flex-col h-full shrink-0 z-10 shadow-sm overflow-hidden animate-in slide-in-from-left-4 duration-200 select-none">
      
      {/* 1. PANEL HEADER */}
      <div className="h-15 px-5 border-b border-slate-200 flex items-center justify-between bg-white shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs shadow-2xs">
            <Layout size={17} />
          </div>
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 m-0">
              Page Options
            </h3>
            <span className="text-[10px] text-slate-400 font-medium">Layout Schemas & Section Order</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
          title="Close Page Options"
        >
          <X size={16} />
        </button>
      </div>

      {/* 2. MAIN SCROLLABLE BODY */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 flex flex-col gap-4 text-slate-800">
        
        {/* Active Document Route Input */}
        <div className="bg-slate-50/80 p-3.5 rounded-2xl border border-slate-200/90">
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
            Active Document Route
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={builderState.pageName || 'index.html'}
              onChange={(e) => onUpdateState({ pageName: e.target.value })}
              placeholder="index.html"
              className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 bg-white focus:outline-none focus:border-blue-500 shadow-2xs"
            />
            <button
              type="button"
              onClick={() => {
                if (showToast) showToast(`Route updated to /${builderState.pageName}`);
                else alert(`Active route updated to /${builderState.pageName}`);
              }}
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-white transition-all cursor-pointer shadow-xs hover:scale-105 active:scale-95 shrink-0 bg-blue-600 hover:bg-blue-700"
            >
              Update
            </button>
          </div>
        </div>

        {/* =========================================================
            SECTION 1: PAGE BASE TEMPLATE SELECTOR
        ========================================================= */}
        <div className="border border-slate-200/90 rounded-2xl overflow-hidden bg-white shadow-2xs">
          <button
            type="button"
            onClick={() => toggleAccordion('baseTemplate')}
            className="w-full px-4 py-3.5 bg-slate-50/80 hover:bg-slate-100/80 flex items-center justify-between text-xs font-bold text-slate-800 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Layout size={15} className="text-blue-600" />
              <span>Page Base Template</span>
              <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200/60">
                {currentTemplate.name}
              </span>
            </div>
            {openAccordions.baseTemplate ? <ChevronDown size={15} className="text-blue-600" /> : <ChevronRight size={15} className="text-slate-400" />}
          </button>

          {openAccordions.baseTemplate && (
            <div className="p-4 bg-white flex flex-col gap-4 border-t border-slate-100">
              
              {/* CURRENT TEMPLATE VISUAL BLOCK REPRESENTATION */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    Current Template
                  </span>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Active Layout
                  </span>
                </div>

                {/* VISUAL BLOCK DIAGRAM WITH EMBEDDED CUSTOMIZE BUTTON */}
                <div className="p-3.5 rounded-2xl bg-gradient-to-br from-blue-50/50 to-slate-50/80 border-2 border-blue-500/80 shadow-xs flex flex-col gap-2.5">
                  
                  {/* Case 1: Standard Layout */}
                  {currentTemplate.id === 'standard' && (
                    <div className="flex flex-col gap-2">
                      {/* PAGE TITLE BLOCK WITH EMBEDDED PRIMARY CUSTOMIZE BUTTON */}
                      <div className="p-3 rounded-xl bg-blue-600 text-white flex items-center justify-between shadow-xs">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-blue-200 animate-ping" />
                          <span className="text-xs font-black tracking-wider uppercase">PAGE TITLE</span>
                        </div>
                        <button
                          type="button"
                          onClick={handleCustomizeClick}
                          className="px-3 py-1 rounded-lg bg-white text-blue-700 text-[11px] font-extrabold shadow-sm hover:bg-blue-50 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                          <SlidersHorizontal size={12} />
                          <span>Customize</span>
                        </button>
                      </div>

                      {/* SECTIONS BLOCK */}
                      <div className="p-4 rounded-xl bg-white border border-blue-200/80 text-center flex flex-col items-center justify-center gap-1 shadow-2xs">
                        <span className="text-xs font-black tracking-wider text-slate-700 uppercase">SECTIONS</span>
                        <span className="text-[10px] font-medium text-slate-400">
                          {builderState.sections.filter(s => s.enabled).length} Active Sections (Full Width)
                        </span>
                        <div className="flex gap-1 mt-1 w-full max-w-[200px]">
                          <div className="h-1 flex-1 bg-slate-200 rounded-full" />
                          <div className="h-1 flex-1 bg-blue-300 rounded-full" />
                          <div className="h-1 flex-1 bg-slate-200 rounded-full" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Case 2: Right Sidebar Layout */}
                  {currentTemplate.id === 'right-sidebar' && (
                    <div className="flex flex-col gap-2">
                      {/* PAGE TITLE BLOCK WITH EMBEDDED PRIMARY CUSTOMIZE BUTTON */}
                      <div className="p-3 rounded-xl bg-blue-600 text-white flex items-center justify-between shadow-xs">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-blue-200 animate-ping" />
                          <span className="text-xs font-black tracking-wider uppercase">PAGE TITLE</span>
                        </div>
                        <button
                          type="button"
                          onClick={handleCustomizeClick}
                          className="px-3 py-1 rounded-lg bg-white text-blue-700 text-[11px] font-extrabold shadow-sm hover:bg-blue-50 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                          <SlidersHorizontal size={12} />
                          <span>Customize</span>
                        </button>
                      </div>

                      {/* SPLIT ROW: SECTIONS (LEFT) / WIDGETS (RIGHT) */}
                      <div className="flex gap-2 h-20">
                        <div className="flex-[2] p-2 rounded-xl bg-white border border-blue-200/80 flex flex-col items-center justify-center shadow-2xs">
                          <span className="text-xs font-black tracking-wider text-slate-700 uppercase">SECTIONS</span>
                          <span className="text-[9px] text-slate-400">Main Content Stream</span>
                        </div>
                        <div className="flex-1 p-2 rounded-xl bg-indigo-50 border border-indigo-200/80 flex flex-col items-center justify-center text-center shadow-2xs">
                          <span className="text-[10px] font-black tracking-wider text-indigo-700 uppercase">WIDGETS</span>
                          <span className="text-[8px] text-indigo-500">Right Rail</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Case 3: Left Sidebar Layout */}
                  {currentTemplate.id === 'left-sidebar' && (
                    <div className="flex flex-col gap-2">
                      {/* PAGE TITLE BLOCK WITH EMBEDDED PRIMARY CUSTOMIZE BUTTON */}
                      <div className="p-3 rounded-xl bg-blue-600 text-white flex items-center justify-between shadow-xs">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-blue-200 animate-ping" />
                          <span className="text-xs font-black tracking-wider uppercase">PAGE TITLE</span>
                        </div>
                        <button
                          type="button"
                          onClick={handleCustomizeClick}
                          className="px-3 py-1 rounded-lg bg-white text-blue-700 text-[11px] font-extrabold shadow-sm hover:bg-blue-50 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                          <SlidersHorizontal size={12} />
                          <span>Customize</span>
                        </button>
                      </div>

                      {/* SPLIT ROW: WIDGETS (LEFT) / SECTIONS (RIGHT) */}
                      <div className="flex gap-2 h-20">
                        <div className="flex-1 p-2 rounded-xl bg-emerald-50 border border-emerald-200/80 flex flex-col items-center justify-center text-center shadow-2xs">
                          <span className="text-[10px] font-black tracking-wider text-emerald-700 uppercase">WIDGETS</span>
                          <span className="text-[8px] text-emerald-500">Left Rail</span>
                        </div>
                        <div className="flex-[2] p-2 rounded-xl bg-white border border-blue-200/80 flex flex-col items-center justify-center shadow-2xs">
                          <span className="text-xs font-black tracking-wider text-slate-700 uppercase">SECTIONS</span>
                          <span className="text-[9px] text-slate-400">Main Content Stream</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Case 4: Full Left Sidebar Layout */}
                  {currentTemplate.id === 'full-left-sidebar' && (
                    <div className="flex gap-2 h-28">
                      {/* FULL LEFT COLUMN: WIDGETS */}
                      <div className="w-24 p-2 rounded-xl bg-indigo-600 text-white flex flex-col items-center justify-center text-center shadow-xs">
                        <span className="text-[10px] font-black tracking-wider uppercase">WIDGETS</span>
                        <span className="text-[8px] text-indigo-200 mt-1">Full Left Column</span>
                      </div>

                      {/* RIGHT STACK: PAGE TITLE (TOP) + SECTIONS (BOTTOM) */}
                      <div className="flex-1 flex flex-col gap-2 justify-between">
                        {/* PAGE TITLE WITH CUSTOMIZE BUTTON */}
                        <div className="p-2 rounded-xl bg-blue-600 text-white flex items-center justify-between shadow-xs">
                          <span className="text-[10px] font-black tracking-wider uppercase">PAGE TITLE</span>
                          <button
                            type="button"
                            onClick={handleCustomizeClick}
                            className="px-2 py-0.5 rounded bg-white text-blue-700 text-[10px] font-extrabold shadow-2xs hover:bg-blue-50 active:scale-95 transition-all"
                          >
                            Customize
                          </button>
                        </div>
                        {/* SECTIONS */}
                        <div className="flex-1 p-2 rounded-xl bg-white border border-blue-200/80 flex flex-col items-center justify-center shadow-2xs">
                          <span className="text-[10px] font-black tracking-wider text-slate-700 uppercase">SECTIONS</span>
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              </div>

              {/* CHANGE TEMPLATE GRID */}
              <div className="flex flex-col gap-2.5 pt-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    Change Template
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">
                    4 Structural Options
                  </span>
                </div>

                {/* Standard Warning Notice */}
                <div className="p-2.5 rounded-xl bg-amber-50/90 border border-amber-200/90 flex items-start gap-2 text-amber-900 text-[11px] leading-relaxed">
                  <AlertTriangle size={15} className="text-amber-600 shrink-0 mt-0.5" />
                  <span className="font-medium">
                    Changing template will override any customizations made to the current template.
                  </span>
                </div>

                {/* 4 Click-to-Select Layout Cards */}
                <div className="grid grid-cols-2 gap-2.5">
                  {PAGE_BASE_TEMPLATES.map((tpl) => {
                    const isActive = tpl.id === currentTemplate.id;

                    return (
                      <div
                        key={tpl.id}
                        onClick={() => handleSelectTemplate(tpl.id)}
                        className={`p-2.5 rounded-xl border text-xs transition-all cursor-pointer flex flex-col gap-2 ${
                          isActive
                            ? 'bg-blue-50/70 border-blue-500 shadow-2xs ring-2 ring-blue-500/20'
                            : 'bg-white border-slate-200 hover:border-blue-400 hover:bg-slate-50/80 hover:shadow-xs'
                        }`}
                      >
                        {/* Miniature Block Diagram */}
                        <div className="h-16 w-full rounded-lg bg-slate-100 p-1 flex flex-col gap-1 overflow-hidden border border-slate-200">
                          {tpl.id === 'standard' && (
                            <>
                              <div className="w-full h-4 rounded bg-blue-500 text-[7px] font-black text-white flex items-center justify-center uppercase">
                                Page Title
                              </div>
                              <div className="w-full flex-1 rounded bg-white border border-slate-300 text-[7px] font-bold text-slate-600 flex items-center justify-center uppercase">
                                Sections
                              </div>
                            </>
                          )}

                          {tpl.id === 'right-sidebar' && (
                            <>
                              <div className="w-full h-3.5 rounded bg-blue-500 text-[7px] font-black text-white flex items-center justify-center uppercase">
                                Page Title
                              </div>
                              <div className="w-full flex-1 flex gap-1">
                                <div className="flex-[2] rounded bg-white border border-slate-300 text-[6px] font-bold text-slate-600 flex items-center justify-center uppercase">
                                  Sections
                                </div>
                                <div className="flex-1 rounded bg-indigo-200 text-[6px] font-bold text-indigo-800 flex items-center justify-center uppercase">
                                  Widgets
                                </div>
                              </div>
                            </>
                          )}

                          {tpl.id === 'left-sidebar' && (
                            <>
                              <div className="w-full h-3.5 rounded bg-blue-500 text-[7px] font-black text-white flex items-center justify-center uppercase">
                                Page Title
                              </div>
                              <div className="w-full flex-1 flex gap-1">
                                <div className="flex-1 rounded bg-emerald-200 text-[6px] font-bold text-emerald-800 flex items-center justify-center uppercase">
                                  Widgets
                                </div>
                                <div className="flex-[2] rounded bg-white border border-slate-300 text-[6px] font-bold text-slate-600 flex items-center justify-center uppercase">
                                  Sections
                                </div>
                              </div>
                            </>
                          )}

                          {tpl.id === 'full-left-sidebar' && (
                            <div className="w-full h-full flex gap-1">
                              <div className="w-1/3 h-full rounded bg-indigo-600 text-[6px] font-bold text-white flex items-center justify-center text-center uppercase">
                                Widgets
                              </div>
                              <div className="flex-1 h-full flex flex-col gap-1">
                                <div className="w-full h-4 rounded bg-blue-500 text-[6px] font-black text-white flex items-center justify-center uppercase">
                                  Page Title
                                </div>
                                <div className="w-full flex-1 rounded bg-white border border-slate-300 text-[6px] font-bold text-slate-600 flex items-center justify-center uppercase">
                                  Sections
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Title & Badge */}
                        <div className="flex items-center justify-between">
                          <span className={`font-bold text-[11px] ${isActive ? 'text-blue-900' : 'text-slate-800'}`}>
                            {tpl.name}
                          </span>
                          {isActive && (
                            <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center">
                              <Check size={10} />
                            </span>
                          )}
                        </div>

                        <p className="text-[10px] text-slate-500 m-0 line-clamp-1">
                          {tpl.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          )}
        </div>

        {/* =========================================================
            SECTION 2: PAGE TOGGLES & SETTINGS
        ========================================================= */}
        <div className="flex flex-col gap-3">
          
          {/* Show Page Title Boolean Toggle */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/90 shadow-2xs">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-800">Show Page Title</span>
              <span title="Dynamically shows or hides the main page title block on the rendered canvas" className="cursor-help text-slate-400">
                <HelpCircle size={13} />
              </span>
            </div>
            <button
              type="button"
              onClick={() => onUpdateState({ showPageTitle: !builderState.showPageTitle })}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ease-in-out cursor-pointer ${
                builderState.showPageTitle ? 'bg-blue-600' : 'bg-slate-300'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                  builderState.showPageTitle ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Expandable Meta Tags Accordion */}
          <div className="border border-slate-200/90 rounded-2xl overflow-hidden bg-white shadow-2xs">
            <button
              type="button"
              onClick={() => toggleAccordion('metaTags')}
              className="w-full px-4 py-3.5 bg-slate-50/80 hover:bg-slate-100/80 flex items-center justify-between text-xs font-bold text-slate-800 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Globe size={15} className="text-blue-600" />
                <span>Meta Tags & SEO Configuration</span>
              </div>
              {openAccordions.metaTags ? <ChevronDown size={15} className="text-blue-600" /> : <ChevronRight size={15} className="text-slate-400" />}
            </button>

            {openAccordions.metaTags && (
              <div className="p-3.5 bg-white flex flex-col gap-3 border-t border-slate-100 text-xs">
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">SEO Title Tag</label>
                  <input
                    type="text"
                    placeholder="My Page Title | Official Site"
                    value={builderState.metaTags?.title || ''}
                    onChange={(e) => onUpdateState({ metaTags: { ...builderState.metaTags, title: e.target.value } })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">Meta Description</label>
                  <textarea
                    rows={2}
                    placeholder="Brief description of page content for search engines..."
                    value={builderState.metaTags?.description || ''}
                    onChange={(e) => onUpdateState({ metaTags: { ...builderState.metaTags, description: e.target.value } })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">Meta Keywords</label>
                  <input
                    type="text"
                    placeholder="template, builder, modern, reactive"
                    value={builderState.metaTags?.keywords || ''}
                    onChange={(e) => onUpdateState({ metaTags: { ...builderState.metaTags, keywords: e.target.value } })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Expandable Page Custom Code Accordion */}
          <div className="border border-slate-200/90 rounded-2xl overflow-hidden bg-white shadow-2xs">
            <button
              type="button"
              onClick={() => toggleAccordion('customCode')}
              className="w-full px-4 py-3.5 bg-slate-50/80 hover:bg-slate-100/80 flex items-center justify-between text-xs font-bold text-slate-800 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Code2 size={15} className="text-blue-600" />
                <span>Page Custom Code</span>
              </div>
              {openAccordions.customCode ? <ChevronDown size={15} className="text-blue-600" /> : <ChevronRight size={15} className="text-slate-400" />}
            </button>

            {openAccordions.customCode && (
              <div className="p-3.5 bg-white flex flex-col gap-3 border-t border-slate-100 text-xs">
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">&lt;head&gt; Custom Scripts &amp; Styles</label>
                  <textarea
                    rows={3}
                    placeholder="<style> /* Custom page styles */ </style>"
                    value={builderState.pageCustomCode?.head || ''}
                    onChange={(e) => onUpdateState({ pageCustomCode: { ...builderState.pageCustomCode, head: e.target.value } })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono text-slate-800 bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">&lt;body&gt; End Custom Scripts</label>
                  <textarea
                    rows={3}
                    placeholder="<script> // Page specific tracking or widget </script>"
                    value={builderState.pageCustomCode?.body || ''}
                    onChange={(e) => onUpdateState({ pageCustomCode: { ...builderState.pageCustomCode, body: e.target.value } })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono text-slate-800 bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            )}
          </div>

        </div>

        {/* =========================================================
            SECTION 3: SECTION ARRANGEMENT ENGINE
        ========================================================= */}
        <div
          ref={arrangeSectionsRef}
          className="border border-slate-200/90 rounded-2xl overflow-hidden bg-white shadow-2xs"
        >
          <button
            type="button"
            onClick={() => toggleAccordion('arrangeSections')}
            className="w-full px-4 py-3.5 bg-slate-50/80 hover:bg-slate-100/80 flex items-center justify-between text-xs font-bold text-slate-800 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Layers size={15} className="text-blue-600" />
              <span>Arrange Sections</span>
              <span className="text-[10px] font-semibold text-slate-600 bg-slate-200/80 px-2 py-0.5 rounded-full">
                {builderState.sections.filter(s => s.enabled).length}/{builderState.sections.length} Active
              </span>
            </div>
            {openAccordions.arrangeSections ? <ChevronDown size={15} className="text-blue-600" /> : <ChevronRight size={15} className="text-slate-400" />}
          </button>

          {openAccordions.arrangeSections && (
            <div className="p-3.5 bg-white flex flex-col gap-2 border-t border-slate-100">
              <p className="text-[11px] text-slate-400 m-0 mb-1">
                Drag handles or use arrows to reorder. Changes update live in the canvas:
              </p>

              <div className="flex flex-col gap-2">
                {builderState.sections.map((sec, idx) => {
                  const anchorTag = sec.anchor || (sec.id.startsWith('#') ? sec.id : `#${sec.id.replace('sec-', 'section-')}`);
                  const isDraggingThis = draggedIndex === idx;
                  const isOverThis = dragOverIndex === idx;

                  return (
                    <div
                      key={sec.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, idx)}
                      onDragOver={(e) => handleDragOver(e, idx)}
                      onDrop={(e) => handleDrop(e, idx)}
                      onDragEnd={handleDragEnd}
                      className={`flex items-center justify-between p-2.5 rounded-xl border text-xs transition-all ${
                        isDraggingThis
                          ? 'opacity-40 border-dashed border-blue-500 bg-blue-50/40'
                          : isOverThis
                          ? 'border-blue-500 bg-blue-50/60 shadow-sm scale-[1.01]'
                          : sec.enabled
                          ? 'bg-white border-slate-200/90 shadow-2xs hover:border-slate-300'
                          : 'bg-slate-50 border-dashed border-slate-200 opacity-60'
                      }`}
                    >
                      {/* Left: Drag Handle & Section Name + ID Anchor */}
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <div className="cursor-grab active:cursor-grabbing p-1 text-slate-400 hover:text-slate-600">
                          <GripVertical size={14} />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="font-bold text-slate-800 text-[11px] truncate">
                            {sec.name}
                          </span>
                          <span className="text-[9px] font-mono text-blue-600 font-semibold truncate">
                            {anchorTag}
                          </span>
                        </div>
                      </div>

                      {/* Right: Move Controls & Visibility Toggle */}
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleMoveSection(idx, -1)}
                          disabled={idx === 0}
                          className="w-6 h-6 rounded-full bg-slate-100 hover:bg-blue-50 hover:text-blue-600 disabled:opacity-20 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
                          title="Move Section Up"
                        >
                          <ArrowUp size={12} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleMoveSection(idx, 1)}
                          disabled={idx === builderState.sections.length - 1}
                          className="w-6 h-6 rounded-full bg-slate-100 hover:bg-blue-50 hover:text-blue-600 disabled:opacity-20 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
                          title="Move Section Down"
                        >
                          <ArrowDown size={12} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleToggleSectionVisibility(sec.id)}
                          className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                            sec.enabled ? 'bg-blue-50 text-blue-600 hover:bg-blue-100' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                          }`}
                          title={sec.enabled ? 'Hide Section in Canvas' : 'Show Section in Canvas'}
                        >
                          {sec.enabled ? <Eye size={12} /> : <EyeOff size={12} />}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Duplicate Page Button */}
        <button
          type="button"
          onClick={() => {
            const newName = prompt('Enter name for duplicated page tab (e.g. about.html, contact.html):', `copy-${builderState.pageName}`);
            if (newName && !builderState.tabs.includes(newName)) {
              onUpdateState({
                tabs: [...builderState.tabs, newName],
                activeTab: newName,
                pageName: newName
              });
              if (showToast) showToast(`Duplicated active document as ${newName}`);
              else alert(`Created new page tab: ${newName}`);
            }
          }}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-full text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all cursor-pointer border border-slate-200 shadow-2xs hover:scale-[1.01] active:scale-95"
        >
          <Copy size={14} className="text-blue-600" />
          <span>Duplicate Active Document</span>
        </button>

      </div>
    </div>
  );
}

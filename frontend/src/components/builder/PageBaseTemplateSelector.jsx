import React from 'react';
import {
  Layout,
  ChevronDown,
  ChevronRight,
  Check,
  SlidersHorizontal,
  AlertTriangle,
  Layers,
  ArrowRight
} from 'lucide-react';
import {
  PAGE_BASE_TEMPLATES,
  getBaseTemplateById,
  applyBaseTemplateToState
} from '../../services/pageBaseTemplates';
import TemplateWireframeGraphic from './TemplateWireframeGraphic';

export default function PageBaseTemplateSelector({
  builderState,
  onUpdateState,
  onCustomizeLayout,
  isExpanded = true,
  onToggleExpand
}) {
  const currentTemplate = getBaseTemplateById(builderState.pageBaseTemplate);

  const handleSelectTemplate = (tpl) => {
    if (tpl.id === currentTemplate.id) return;
    
    // Apply template layout swap while safely preserving pageName, pageTitle, tabs, metaTags, colors, fonts
    const nextState = applyBaseTemplateToState(builderState, tpl.id);
    onUpdateState(nextState);
  };

  return (
    <div className="border border-slate-200/90 rounded-2xl overflow-hidden bg-white shadow-2xs">
      {/* Accordion Trigger Header */}
      <button
        type="button"
        onClick={onToggleExpand}
        className="w-full px-4 py-3.5 bg-slate-50/80 hover:bg-slate-100/80 flex items-center justify-between text-xs font-bold text-slate-800 transition-colors cursor-pointer select-none"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <Layout size={14} />
          </div>
          <div className="text-left">
            <div className="flex items-center gap-1.5">
              <span>Page Base Template</span>
              <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                {currentTemplate.name}
              </span>
            </div>
          </div>
        </div>
        {isExpanded ? (
          <ChevronDown size={15} className="text-blue-600" />
        ) : (
          <ChevronRight size={15} className="text-slate-400" />
        )}
      </button>

      {/* Accordion Content Body */}
      {isExpanded && (
        <div className="p-4 bg-white flex flex-col gap-4 border-t border-slate-100">
          
          {/* =========================================================
              1. CURRENT ACTIVE TEMPLATE CARD
          ========================================================= */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between px-0.5">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                Current Template
              </span>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Active Layout
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-gradient-to-br from-blue-50/60 to-slate-50/80 border-2 border-blue-500/80 shadow-xs flex flex-col gap-3 transition-all">
              <div className="flex items-start gap-3">
                {/* Visual Blueprint Wireframe Graphic */}
                <TemplateWireframeGraphic
                  layoutType={currentTemplate.layoutType || currentTemplate.id}
                  className="w-18 h-14"
                />

                {/* Template Info & Metadata */}
                <div className="flex-1 min-w-0 flex flex-col gap-1">
                  <div className="flex items-center justify-between gap-1">
                    <h4 className="text-xs font-bold text-slate-900 m-0 truncate">
                      {currentTemplate.name}
                    </h4>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-blue-100 text-blue-800 shrink-0">
                      {currentTemplate.badge}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-600 font-medium m-0 line-clamp-2 leading-relaxed">
                    {currentTemplate.description}
                  </p>

                  <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-semibold mt-0.5">
                    <Layers size={12} className="text-blue-600 shrink-0" />
                    <span>{currentTemplate.sectionsSummary}</span>
                  </div>
                </div>
              </div>

              {/* Page Route Target & Quick Customize Action */}
              <div className="pt-2.5 border-t border-blue-200/60 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
                  <span className="text-slate-400">Target Route:</span>
                  <code className="text-[10px] font-bold text-slate-700 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                    /{builderState.pageName || 'index.html'}
                  </code>
                </div>

                <button
                  type="button"
                  onClick={onCustomizeLayout}
                  className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold transition-all shadow-xs hover:shadow-sm flex items-center gap-1.5 cursor-pointer active:scale-95"
                >
                  <SlidersHorizontal size={12} />
                  <span>Customize</span>
                </button>
              </div>
            </div>
          </div>

          {/* =========================================================
              2. CHANGE TEMPLATE SECTION
          ========================================================= */}
          <div className="flex flex-col gap-2.5 pt-1">
            <div className="flex items-center justify-between px-0.5">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                Change Base Template
              </span>
              <span className="text-[10px] text-slate-400 font-medium">
                {PAGE_BASE_TEMPLATES.length} Archetypes
              </span>
            </div>

            {/* Helper Warning Alert Box */}
            <div className="p-2.5 rounded-xl bg-amber-50/90 border border-amber-200/90 flex items-start gap-2 text-amber-900 text-[11px] leading-relaxed">
              <AlertTriangle size={15} className="text-amber-600 shrink-0 mt-0.5" />
              <span className="font-medium">
                Changing template will override any customizations made to the current template.
              </span>
            </div>

            {/* Grid / Stack of Alternate Template Cards */}
            <div className="flex flex-col gap-2">
              {PAGE_BASE_TEMPLATES.map((tpl) => {
                const isActive = tpl.id === currentTemplate.id;

                return (
                  <div
                    key={tpl.id}
                    onClick={() => handleSelectTemplate(tpl)}
                    className={`p-3 rounded-xl border text-xs transition-all cursor-pointer flex flex-col gap-2 ${
                      isActive
                        ? 'bg-blue-50/70 border-blue-500 shadow-2xs'
                        : 'bg-white border-slate-200/90 hover:border-blue-400 hover:bg-slate-50/80 hover:shadow-xs'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      {/* Blueprint Wireframe Graphic */}
                      <TemplateWireframeGraphic
                        layoutType={tpl.layoutType || tpl.id}
                        className="w-14 h-11"
                      />

                      {/* Card Info */}
                      <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                        <div className="flex items-center justify-between gap-1">
                          <span className={`font-bold text-xs ${isActive ? 'text-blue-900' : 'text-slate-800'}`}>
                            {tpl.name}
                          </span>
                          {isActive ? (
                            <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                              <Check size={12} />
                            </span>
                          ) : (
                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600">
                              {tpl.badge}
                            </span>
                          )}
                        </div>

                        <p className="text-[10px] text-slate-500 m-0 line-clamp-1 leading-snug">
                          {tpl.description}
                        </p>

                        {/* Feature Badges */}
                        <div className="flex flex-wrap gap-1 mt-1">
                          {tpl.features.map((feat, idx) => (
                            <span
                              key={idx}
                              className="text-[9px] font-medium bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded"
                            >
                              {feat}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Apply Button Action on Hover/Inactive */}
                    {!isActive && (
                      <div className="flex items-center justify-between pt-1.5 border-t border-slate-100 text-[10px] text-slate-400">
                        <span>{tpl.sectionsSummary}</span>
                        <span className="font-bold text-blue-600 flex items-center gap-1 group-hover:underline">
                          Select Template <ArrowRight size={10} />
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      )}
    </div>
  );
}

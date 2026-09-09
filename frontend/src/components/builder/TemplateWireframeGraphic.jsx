import React from 'react';

/**
 * Renders a crisp blueprint / wireframe vector graphic representing a page layout archetype.
 */
export default function TemplateWireframeGraphic({ layoutType, className = 'w-16 h-12' }) {
  const type = (layoutType || 'standard').toLowerCase();

  switch (type) {
    case 'boxed':
    case 'boxed-centered':
      return (
        <div
          className={`relative rounded-lg border border-slate-200 bg-slate-100/90 flex flex-col items-center justify-between p-1 overflow-hidden shrink-0 shadow-2xs ${className}`}
        >
          {/* Top floating pill header */}
          <div className="w-9/12 h-1.5 rounded-full bg-blue-500/80 shadow-2xs" />
          
          {/* Centered Boxed Canvas */}
          <div className="w-10/12 h-6 bg-white rounded border border-slate-300/80 flex flex-col gap-0.5 p-0.5 shadow-xs">
            <div className="w-full h-2 rounded-xs bg-blue-100 border border-blue-200" />
            <div className="flex gap-0.5 w-full flex-1">
              <div className="flex-1 bg-slate-200/80 rounded-xs" />
              <div className="flex-1 bg-slate-200/80 rounded-xs" />
            </div>
          </div>

          {/* Bottom subtle bar */}
          <div className="w-10/12 h-1 rounded-xs bg-slate-300" />
        </div>
      );

    case 'sidebar':
    case 'sidebar-dashboard':
      return (
        <div
          className={`relative rounded-lg border border-slate-200 bg-slate-50 flex overflow-hidden shrink-0 shadow-2xs ${className}`}
        >
          {/* Left vertical nav rail */}
          <div className="w-3.5 bg-blue-600/90 h-full flex flex-col items-center gap-0.5 pt-1 px-0.5">
            <div className="w-2 h-1 rounded-xs bg-white/90" />
            <div className="w-2 h-0.5 rounded-xs bg-blue-200/60" />
            <div className="w-2 h-0.5 rounded-xs bg-blue-200/60" />
            <div className="w-2 h-0.5 rounded-xs bg-blue-200/60" />
          </div>

          {/* Right main workspace stage */}
          <div className="flex-1 flex flex-col p-1 gap-1 bg-white">
            {/* Top mini header */}
            <div className="w-full h-1.5 rounded-xs bg-slate-100 border border-slate-200 flex items-center justify-between px-0.5">
              <div className="w-3 h-0.5 bg-slate-400 rounded-full" />
              <div className="w-1.5 h-1 rounded-full bg-blue-500" />
            </div>
            {/* Grid modules */}
            <div className="grid grid-cols-2 gap-0.5 flex-1">
              <div className="bg-blue-50 border border-blue-200/80 rounded-xs" />
              <div className="bg-slate-100 border border-slate-200/80 rounded-xs" />
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-xs" />
          </div>
        </div>
      );

    case 'split':
    case 'split-showcase':
      return (
        <div
          className={`relative rounded-lg border border-slate-200 bg-white flex flex-col p-1 gap-1 overflow-hidden shrink-0 shadow-2xs ${className}`}
        >
          {/* Top nav bar */}
          <div className="w-full h-1.5 rounded-xs bg-slate-200/80 flex items-center justify-between px-0.5">
            <div className="w-2 h-0.5 bg-blue-600 rounded-full" />
            <div className="w-3 h-0.5 bg-slate-400 rounded-full" />
          </div>

          {/* Split 50/50 Hero */}
          <div className="flex gap-1 flex-1">
            {/* Left text column */}
            <div className="flex-1 flex flex-col justify-center gap-0.5">
              <div className="w-full h-1.5 bg-slate-700/80 rounded-xs" />
              <div className="w-4/5 h-1 bg-slate-300 rounded-xs" />
              <div className="w-3 h-1 bg-blue-500 rounded-xs mt-0.5" />
            </div>
            {/* Right media block */}
            <div className="flex-1 bg-blue-100 border border-blue-300/80 rounded-xs flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-500/40" />
            </div>
          </div>

          {/* Bottom feature blocks */}
          <div className="flex gap-0.5 w-full h-1.5">
            <div className="flex-1 bg-slate-100 rounded-xs" />
            <div className="flex-1 bg-slate-100 rounded-xs" />
          </div>
        </div>
      );

    case 'editorial':
    case 'editorial-hub':
      return (
        <div
          className={`relative rounded-lg border border-slate-200 bg-slate-50 flex flex-col items-center p-1 gap-0.5 overflow-hidden shrink-0 shadow-2xs ${className}`}
        >
          {/* Top header */}
          <div className="w-full h-1.5 bg-slate-200 rounded-xs flex items-center justify-center">
            <div className="w-4 h-0.5 bg-slate-600 rounded-full" />
          </div>

          {/* Central Narrow Column */}
          <div className="w-9/12 bg-white border border-slate-200/90 rounded flex-1 flex flex-col p-0.5 gap-0.5">
            <div className="w-full h-1.5 bg-blue-600/80 rounded-xs" />
            <div className="w-full h-0.5 bg-slate-300 rounded-full" />
            <div className="w-10/12 h-0.5 bg-slate-300 rounded-full" />
            <div className="w-full h-0.5 bg-slate-300 rounded-full" />
            <div className="w-8/12 h-0.5 bg-slate-300 rounded-full" />
          </div>

          {/* Footer */}
          <div className="w-full h-1 bg-slate-200 rounded-xs" />
        </div>
      );

    case 'saas':
    case 'saas-product':
      return (
        <div
          className={`relative rounded-lg border border-slate-200 bg-white flex flex-col p-1 gap-0.5 overflow-hidden shrink-0 shadow-2xs ${className}`}
        >
          {/* Floating Pill Nav */}
          <div className="w-10/12 mx-auto h-1.5 rounded-full bg-blue-600/90 flex items-center justify-between px-1">
            <div className="w-1.5 h-0.5 bg-white rounded-full" />
            <div className="w-1.5 h-0.5 bg-blue-200 rounded-full" />
          </div>

          {/* Centered Hero Banner */}
          <div className="w-full h-2.5 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 rounded-xs flex items-center justify-center">
            <div className="w-4 h-1 bg-blue-500 rounded-xs" />
          </div>

          {/* 3 Pricing / Feature Cards */}
          <div className="grid grid-cols-3 gap-0.5 flex-1">
            <div className="bg-slate-100 rounded-xs" />
            <div className="bg-blue-50 border border-blue-400/80 rounded-xs shadow-2xs" />
            <div className="bg-slate-100 rounded-xs" />
          </div>
        </div>
      );

    case 'standard':
    case 'standard-landing':
    default:
      return (
        <div
          className={`relative rounded-lg border border-slate-200 bg-white flex flex-col p-1 gap-1 overflow-hidden shrink-0 shadow-2xs ${className}`}
        >
          {/* Top sticky nav bar */}
          <div className="w-full h-1.5 rounded-xs bg-slate-200/90 flex items-center justify-between px-0.5">
            <div className="w-2.5 h-0.5 bg-blue-600 rounded-full" />
            <div className="w-4 h-0.5 bg-slate-400 rounded-full" />
          </div>

          {/* Full-width Hero Banner */}
          <div className="w-full h-3 bg-gradient-to-r from-blue-100 to-slate-100 border border-blue-200 rounded-xs flex flex-col items-center justify-center gap-0.5">
            <div className="w-5 h-1 bg-slate-700 rounded-xs" />
            <div className="w-3 h-0.5 bg-blue-600 rounded-xs" />
          </div>

          {/* 3 Columns */}
          <div className="grid grid-cols-3 gap-0.5 flex-1">
            <div className="bg-slate-100 rounded-xs" />
            <div className="bg-slate-100 rounded-xs" />
            <div className="bg-slate-100 rounded-xs" />
          </div>

          {/* Footer Bar */}
          <div className="w-full h-1 bg-slate-200 rounded-xs" />
        </div>
      );
  }
}

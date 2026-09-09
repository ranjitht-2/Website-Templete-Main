import React, { useState, useEffect, useCallback } from 'react';
import {
  Palette,
  X,
  ChevronDown,
  Check,
  RotateCcw,
  Plus,
  Trash2,
  HelpCircle,
  Sparkles,
  Copy,
  Info
} from 'lucide-react';
import {
  COLOR_PRESETS,
  DEFAULT_CUSTOM_SCOPED_PRESETS
} from '../../services/builderStore';
import ColorPickerPopover from './ColorPickerPopover';

// Row 1 & Row 2 Color Definitions
const GLOBAL_COLORS_ROW1 = [
  { key: 'background', label: 'BACKGROUND', defaultFallback: '#ffffff' },
  { key: 'default', label: 'DEFAULT', defaultFallback: '#212529' },
  { key: 'heading', label: 'HEADING', defaultFallback: '#0f172a' },
  { key: 'accent', label: 'ACCENT', defaultFallback: '#0066ff' },
  { key: 'surface', label: 'SURFACE', defaultFallback: '#f8fafc' },
  { key: 'contrast', label: 'CONTRAST', defaultFallback: '#ffffff' }
];

const GLOBAL_COLORS_ROW2 = [
  { key: 'nav', label: 'NAV', defaultFallback: '#334155' },
  { key: 'navHover', label: 'NAV HOV', defaultFallback: '#0066ff' },
  { key: 'mobileBg', label: 'MOB BG', defaultFallback: '#ffffff' },
  { key: 'dropBg', label: 'DROP BG', defaultFallback: '#ffffff' },
  { key: 'dropNav', label: 'DROP NAV', defaultFallback: '#334155' },
  { key: 'dropHover', label: 'DROP HOV', defaultFallback: '#0066ff' }
];

export default function ColorOptionsPanel({
  builderState,
  onUpdateState,
  onClose,
  showToast
}) {
  // Accordion Expand/Collapse States
  const [isGlobalColorsOpen, setIsGlobalColorsOpen] = useState(true);
  const [isCustomPresetsOpen, setIsCustomPresetsOpen] = useState(false);

  // Filter Pill Tab: 'all' | 'light' | 'dark'
  const [presetFilter, setPresetFilter] = useState('all');

  // Active Open Color Picker Popover Key (e.g. 'accent', 'background', etc.)
  const [activePickerKey, setActivePickerKey] = useState(null);

  // Custom Presets State (Loaded from localStorage or defaults)
  const [customPresets, setCustomPresets] = useState(() => {
    try {
      const saved = localStorage.getItem('ts_builder_custom_color_presets');
      return saved ? JSON.parse(saved) : DEFAULT_CUSTOM_SCOPED_PRESETS;
    } catch {
      return DEFAULT_CUSTOM_SCOPED_PRESETS;
    }
  });

  // Modal / Form state for "+ Add Custom Preset"
  const [isAddingPreset, setIsAddingPreset] = useState(false);
  const [newPresetName, setNewPresetName] = useState('');
  const [newPresetClass, setNewPresetClass] = useState('');
  const [newPresetDesc, setNewPresetDesc] = useState('');

  // Help Modal State
  const [showHelpModal, setShowHelpModal] = useState(false);

  // Toast / Status Message
  const [appliedToast, setAppliedToast] = useState(null);

  const triggerToast = useCallback((msg) => {
    if (showToast) {
      showToast(msg);
    } else {
      setAppliedToast(msg);
      setTimeout(() => setAppliedToast(null), 2500);
    }
  }, [showToast]);

  const currentColors = builderState?.colors || { ...COLOR_PRESETS[0].colors };
  const activePresetId = builderState?.activePresetId || 'techno-blue';

  // Filtered Presets List
  const filteredPresets = COLOR_PRESETS.filter((preset) => {
    if (presetFilter === 'all') return true;
    return preset.type === presetFilter;
  });

  // Update Individual Color Variable
  const handleColorChange = (key, value) => {
    const updatedColors = {
      ...currentColors,
      [key]: value
    };
    onUpdateState({
      colors: updatedColors,
      activePresetId: null // modified custom
    });
  };

  // Select Preset Palette
  const handleSelectPreset = useCallback((preset) => {
    onUpdateState({
      colors: { ...preset.colors },
      activePresetId: preset.id
    });
    triggerToast(`Applied palette: ${preset.name}`);
  }, [onUpdateState, triggerToast]);

  // Reset to Default Preset
  const handleResetToDefault = () => {
    const defaultPreset = COLOR_PRESETS[0];
    onUpdateState({
      colors: { ...defaultPreset.colors },
      activePresetId: defaultPreset.id
    });
    triggerToast('Reset palette to Techno Blue default');
  };

  // Apply Palette Action Button
  const handleApplyPalette = () => {
    triggerToast('Palette successfully applied to live template!');
  };

  // Keyboard Navigation to Cycle Presets (ArrowUp / ArrowDown / '[' / ']')
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't intercept if typing in an input
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) {
        return;
      }

      if (e.key === 'ArrowDown' || e.key === ']') {
        e.preventDefault();
        const currentIndex = filteredPresets.findIndex((p) => p.id === activePresetId);
        const nextIndex = (currentIndex + 1) % filteredPresets.length;
        handleSelectPreset(filteredPresets[nextIndex]);
      } else if (e.key === 'ArrowUp' || e.key === '[') {
        e.preventDefault();
        const currentIndex = filteredPresets.findIndex((p) => p.id === activePresetId);
        const prevIndex = (currentIndex - 1 + filteredPresets.length) % filteredPresets.length;
        handleSelectPreset(filteredPresets[prevIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePresetId, filteredPresets, handleSelectPreset]);

  // Save Custom Preset
  const handleSaveCustomPreset = (e) => {
    e.preventDefault();
    if (!newPresetName.trim()) return;

    let formattedClass = newPresetClass.trim();
    if (!formattedClass.startsWith('.')) {
      formattedClass = `.${formattedClass || newPresetName.toLowerCase().replace(/\s+/g, '-')}`;
    }

    const newPreset = {
      id: `custom-${Date.now()}`,
      className: formattedClass,
      name: newPresetName.trim(),
      description: newPresetDesc.trim() || 'Custom scoped color scheme',
      colors: [
        currentColors.background || '#ffffff',
        currentColors.heading || '#0f172a',
        currentColors.accent || '#0066ff',
        currentColors.surface || '#f8fafc',
        currentColors.contrast || '#ffffff',
        currentColors.nav || '#334155'
      ]
    };

    const nextPresets = [...customPresets, newPreset];
    setCustomPresets(nextPresets);
    localStorage.setItem('ts_builder_custom_color_presets', JSON.stringify(nextPresets));

    setNewPresetName('');
    setNewPresetClass('');
    setNewPresetDesc('');
    setIsAddingPreset(false);
    triggerToast(`Created custom preset: ${newPreset.name}`);
  };

  // Delete Custom Preset
  const handleDeleteCustomPreset = (id, name, e) => {
    e.stopPropagation();
    const nextPresets = customPresets.filter((p) => p.id !== id);
    setCustomPresets(nextPresets);
    localStorage.setItem('ts_builder_custom_color_presets', JSON.stringify(nextPresets));
    triggerToast(`Removed custom preset: ${name}`);
  };

  // Helper to render segmented 6-color bar for a preset
  const renderContinuousSegmentedBar = (preset) => {
    const c = preset.colors;
    const sixColors = [
      c.background || '#ffffff',
      c.heading || '#0f172a',
      c.accent || '#0066ff',
      c.surface || '#f8fafc',
      c.nav || '#334155',
      c.contrast || '#ffffff'
    ];

    return (
      <div
        className="w-24 sm:w-28 h-6 rounded-md overflow-hidden flex shadow-2xs border border-slate-200 shrink-0"
        style={{
          boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.06)'
        }}
      >
        {sixColors.map((col, idx) => (
          <div
            key={idx}
            className="flex-1 h-full"
            style={{
              backgroundColor: col,
              boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.08)'
            }}
            title={col}
          />
        ))}
      </div>
    );
  };

  return (
    <aside
      className="w-80 sm:w-[380px] bg-white border border-slate-200 rounded-2xl flex flex-col h-full shrink-0 z-10 shadow-sm overflow-hidden animate-in slide-in-from-left-4 duration-200 select-none font-sans text-slate-800"
      aria-label="Color Options Editor Panel"
    >
      {/* =========================================================
          1. PANEL HEADER
      ========================================================= */}
      <div className="h-15 px-5 border-b border-slate-200 flex items-center justify-between bg-white shrink-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
            <Palette size={16} />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 m-0">
                Color Options
              </h2>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" title="Live Sync Active" />
            </div>
            <p className="text-[10px] text-slate-500 font-medium m-0 leading-none mt-0.5">
              Global variables &amp; theme presets
            </p>
          </div>
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            title="Close Color Options Panel"
          >
            <X size={15} />
          </button>
        )}
      </div>

      {/* =========================================================
          PANEL BODY (SCROLLABLE CONTENT)
      ========================================================= */}
      <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-6 text-slate-800">

        {/* =========================================================
            2. SECTION: GLOBAL COLORS (COLLAPSIBLE ACCORDION)
        ========================================================= */}
        <div className="bg-slate-50 rounded-2xl border border-slate-200 overflow-visible transition-all duration-200">
          {/* Accordion Trigger */}
          <button
            type="button"
            onClick={() => setIsGlobalColorsOpen(!isGlobalColorsOpen)}
            className="w-full p-4 flex items-center justify-between text-left cursor-pointer hover:bg-slate-100/80 transition-colors rounded-2xl"
          >
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-900">
                Global Colors
              </span>
              <span className="text-[10px] font-bold text-blue-600 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
                12 Variables
              </span>
            </div>
            <ChevronDown
              size={16}
              className={`text-slate-400 transition-transform duration-200 ${
                isGlobalColorsOpen ? 'rotate-180 text-blue-600' : ''
              }`}
            />
          </button>

          {/* Accordion Body */}
          {isGlobalColorsOpen && (
            <div className="px-4 pb-4 pt-1 flex flex-col gap-4">
              {/* Row 1 Grid: BACKGROUND, DEFAULT, HEADING, ACCENT, SURFACE, CONTRAST */}
              <div>
                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
                  Foundation &amp; Branding (Row 1)
                </span>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {GLOBAL_COLORS_ROW1.map((item) => {
                    const colorVal = currentColors[item.key] || item.defaultFallback;
                    const isOpen = activePickerKey === item.key;

                    return (
                      <div key={item.key} className="relative flex flex-col items-center">
                        <span className="text-[9px] font-extrabold uppercase tracking-tight text-slate-600 mb-1 truncate w-full text-center">
                          {item.label}
                        </span>

                        <button
                          type="button"
                          onClick={() => setActivePickerKey(isOpen ? null : item.key)}
                          className={`w-full h-10 rounded-lg relative overflow-hidden cursor-pointer transition-all duration-150 hover:scale-105 active:scale-95 border ${
                            isOpen
                              ? 'border-blue-600 ring-2 ring-blue-500/30 shadow-md'
                              : 'border-slate-200 hover:border-blue-400'
                          }`}
                          style={{
                            backgroundColor: colorVal,
                            boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.1)'
                          }}
                          title={`${item.label}: ${colorVal}`}
                        >
                          {/* Checkerboard subtle hint for transparent/white */}
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-black/10 transition-opacity" />
                        </button>

                        <span className="text-[9px] font-mono font-medium text-slate-500 mt-1 uppercase truncate max-w-full">
                          {colorVal.replace('#', '')}
                        </span>

                        {/* Popover Color Picker */}
                        {isOpen && (
                          <ColorPickerPopover
                            color={colorVal}
                            label={item.label}
                            onChange={(newHex) => handleColorChange(item.key, newHex)}
                            onClose={() => setActivePickerKey(null)}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Row 2 Grid: NAV, NAV HOV, MOB BG, DROP BG, DROP NAV, DROP HOV */}
              <div>
                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
                  Navigation &amp; Dropdowns (Row 2)
                </span>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {GLOBAL_COLORS_ROW2.map((item) => {
                    const colorVal = currentColors[item.key] || item.defaultFallback;
                    const isOpen = activePickerKey === item.key;

                    return (
                      <div key={item.key} className="relative flex flex-col items-center">
                        <span className="text-[9px] font-extrabold uppercase tracking-tight text-slate-600 mb-1 truncate w-full text-center">
                          {item.label}
                        </span>

                        <button
                          type="button"
                          onClick={() => setActivePickerKey(isOpen ? null : item.key)}
                          className={`w-full h-10 rounded-lg relative overflow-hidden cursor-pointer transition-all duration-150 hover:scale-105 active:scale-95 border ${
                            isOpen
                              ? 'border-blue-600 ring-2 ring-blue-500/30 shadow-md'
                              : 'border-slate-200 hover:border-blue-400'
                          }`}
                          style={{
                            backgroundColor: colorVal,
                            boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.1)'
                          }}
                          title={`${item.label}: ${colorVal}`}
                        >
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-black/10 transition-opacity" />
                        </button>

                        <span className="text-[9px] font-mono font-medium text-slate-500 mt-1 uppercase truncate max-w-full">
                          {colorVal.replace('#', '')}
                        </span>

                        {/* Popover Color Picker */}
                        {isOpen && (
                          <ColorPickerPopover
                            color={colorVal}
                            label={item.label}
                            onChange={(newHex) => handleColorChange(item.key, newHex)}
                            onClose={() => setActivePickerKey(null)}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* =========================================================
            3. SECTION: COLOR PRESETS
        ========================================================= */}
        <div className="flex flex-col gap-3">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xs font-bold text-slate-900 m-0">
                Color Presets
              </h3>
              <p className="text-[11px] text-slate-500 m-0 mt-0.5 leading-relaxed">
                Pick a preset, then use keyboard shortcuts to cycle.
              </p>
            </div>

            {/* Filter Pill Buttons: [All], [Light], [Dark] */}
            <div className="flex items-center gap-0.5 bg-slate-100 p-1 rounded-full text-[10px] font-bold shrink-0 border border-slate-200/60">
              {['all', 'light', 'dark'].map((filter) => {
                const isActive = presetFilter === filter;
                return (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setPresetFilter(filter)}
                    className={`px-2.5 py-1 rounded-full uppercase tracking-wider transition-all duration-150 cursor-pointer ${
                      isActive
                        ? 'bg-white text-blue-600 shadow-xs font-extrabold'
                        : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/50'
                    }`}
                  >
                    {filter}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Preset Palette Cards List */}
          <div className="flex flex-col gap-2 max-h-[300px] overflow-y-auto pr-1">
            {filteredPresets.map((preset, index) => {
              const isSelected = activePresetId === preset.id;
              const formattedIndex = String(index + 1).padStart(2, '0');

              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handleSelectPreset(preset)}
                  className={`group relative flex items-center justify-between p-3 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/70 ring-2 ring-blue-500/20 shadow-md scale-[1.01]'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 hover:-translate-y-0.5 hover:shadow-sm'
                  }`}
                >
                  {/* Left: Index Badge & Name */}
                  <div className="flex items-center gap-3 min-w-0 pr-2">
                    <span
                      className={`text-[10px] font-mono font-extrabold px-2 py-0.5 rounded-md shrink-0 ${
                        isSelected
                          ? 'bg-blue-600 text-white shadow-2xs'
                          : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
                      }`}
                    >
                      {formattedIndex}
                    </span>

                    <div className="truncate">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`text-xs font-bold truncate ${
                            isSelected
                              ? 'text-blue-900'
                              : 'text-slate-800'
                          }`}
                        >
                          {preset.name}
                        </span>
                        {isSelected && (
                          <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                            <Check size={10} strokeWidth={3} />
                          </span>
                        )}
                      </div>
                      <span className="text-[9px] font-medium text-slate-400 uppercase tracking-wider">
                        {preset.type} palette
                      </span>
                    </div>
                  </div>

                  {/* Right: Continuous Segmented Bar of 6 harmonized color blocks */}
                  {renderContinuousSegmentedBar(preset)}
                </button>
              );
            })}
          </div>
        </div>

        {/* =========================================================
            4. SECTION: CUSTOM COLOR PRESETS (COLLAPSIBLE ACCORDION)
        ========================================================= */}
        <div className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden transition-all duration-200">
          {/* Accordion Trigger */}
          <button
            type="button"
            onClick={() => setIsCustomPresetsOpen(!isCustomPresetsOpen)}
            className="w-full p-4 flex items-center justify-between text-left cursor-pointer hover:bg-slate-100/80 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-900">
                Custom Color Presets
              </span>
              <span className="text-[10px] font-bold text-slate-600 bg-slate-200 px-2 py-0.5 rounded-full">
                {customPresets.length}
              </span>
            </div>
            <ChevronDown
              size={16}
              className={`text-slate-400 transition-transform duration-200 ${
                isCustomPresetsOpen ? 'rotate-180 text-blue-600' : ''
              }`}
            />
          </button>

          {/* Accordion Body */}
          {isCustomPresetsOpen && (
            <div className="px-4 pb-4 pt-1 flex flex-col gap-3">
              <p className="text-[11px] text-slate-500 m-0 leading-relaxed">
                Create custom color presets and reuse them across your sections.
              </p>

              {/* Scoped Classes Preset List */}
              <div className="flex flex-col gap-2 max-h-56 overflow-y-auto pr-1">
                {customPresets.map((preset) => (
                  <div
                    key={preset.id}
                    className="p-3 rounded-xl border border-slate-200 bg-white flex flex-col gap-2 hover:border-slate-300 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                          {preset.className}
                        </span>
                        <span className="text-xs font-semibold text-slate-800 truncate">
                          {preset.name}
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText(preset.className);
                            triggerToast(`Copied class ${preset.className}`);
                          }}
                          className="p-1 rounded text-slate-400 hover:text-blue-600 hover:bg-slate-100 transition-colors cursor-pointer"
                          title="Copy Class Name"
                        >
                          <Copy size={12} />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => handleDeleteCustomPreset(preset.id, preset.name, e)}
                          className="p-1 rounded text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors cursor-pointer"
                          title="Delete Custom Preset"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>

                    {/* Mini Swatch Strip */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        {preset.colors.slice(0, 5).map((col, idx) => (
                          <span
                            key={idx}
                            className="w-4 h-4 rounded-md border border-black/10 shadow-2xs"
                            style={{ backgroundColor: col }}
                            title={col}
                          />
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          onUpdateState({
                            colors: {
                              ...currentColors,
                              background: preset.colors[0],
                              heading: preset.colors[1],
                              accent: preset.colors[2],
                              surface: preset.colors[3],
                              contrast: preset.colors[4]
                            }
                          });
                          triggerToast(`Applied scoped theme: ${preset.name}`);
                        }}
                        className="text-[10px] font-bold text-blue-600 hover:underline cursor-pointer"
                      >
                        Apply Scoped
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Custom Preset Form / Button */}
              {isAddingPreset ? (
                <form
                  onSubmit={handleSaveCustomPreset}
                  className="p-3.5 rounded-xl border border-blue-200 bg-blue-50/50 flex flex-col gap-2.5 animate-in fade-in duration-150"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-900">
                      New Scoped Preset
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsAddingPreset(false)}
                      className="text-slate-400 hover:text-slate-600 text-xs"
                    >
                      Cancel
                    </button>
                  </div>

                  <input
                    type="text"
                    value={newPresetName}
                    onChange={(e) => setNewPresetName(e.target.value)}
                    placeholder="Preset Name (e.g. Modern Hero Spotlight)"
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-800 bg-white focus:outline-none focus:border-blue-500 shadow-2xs font-medium"
                    required
                  />

                  <input
                    type="text"
                    value={newPresetClass}
                    onChange={(e) => setNewPresetClass(e.target.value)}
                    placeholder="Class Selector (e.g. .hero-spotlight)"
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-mono text-slate-800 bg-white focus:outline-none focus:border-blue-500 shadow-2xs"
                  />

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[10px] text-slate-500">Uses current active 6 colors</span>
                    <button
                      type="submit"
                      className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-sm cursor-pointer transition-colors"
                    >
                      Save Preset
                    </button>
                  </div>
                </form>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsAddingPreset(true)}
                  className="w-full py-3 px-4 rounded-xl border-2 border-dashed border-slate-300 hover:border-blue-500 text-slate-600 hover:text-blue-600 hover:bg-blue-50/50 text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer group"
                >
                  <Plus size={15} className="transition-transform group-hover:rotate-90 text-blue-600" />
                  <span>Add Custom Preset</span>
                </button>
              )}
            </div>
          )}
        </div>

      </div>

      {/* =========================================================
          5. BOTTOM FOOTER / ACTIONS
      ========================================================= */}
      <div className="border-t border-slate-200 bg-white p-4 flex items-center justify-between shrink-0 gap-3 z-10">
        <button
          type="button"
          onClick={handleResetToDefault}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 transition-all cursor-pointer shadow-2xs active:scale-95"
          title="Reset to default palette"
        >
          <RotateCcw size={13} />
          <span>Reset to Default</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowHelpModal(true)}
            className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-blue-600 transition-colors cursor-pointer"
            title="Help &amp; Documentation"
          >
            <HelpCircle size={13} />
            <span className="hidden sm:inline">Help / Docs</span>
          </button>

          <button
            type="button"
            onClick={handleApplyPalette}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white transition-all duration-150 cursor-pointer shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
            style={{
              background: 'linear-gradient(135deg, #0088ff 0%, #0044cc 100%)',
              boxShadow: '0 4px 14px rgba(0, 102, 255, 0.28)'
            }}
          >
            <Check size={13} strokeWidth={2.5} />
            <span>Apply Palette</span>
          </button>
        </div>
      </div>

      {/* Floating Status Toast */}
      {appliedToast && (
        <div className="absolute bottom-18 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-slate-900/90 text-white text-xs font-semibold shadow-xl backdrop-blur-md flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200 z-50">
          <Sparkles size={13} className="text-amber-400" />
          <span>{appliedToast}</span>
        </div>
      )}

      {/* Help Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 max-w-sm w-full shadow-2xl text-slate-800">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <div className="flex items-center gap-2">
                <Info size={16} className="text-blue-600" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 m-0">Color Engine Help</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowHelpModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X size={14} />
              </button>
            </div>

            <div className="text-xs space-y-2.5 leading-relaxed text-slate-600">
              <p>
                <strong>Global Variables:</strong> Modifies CSS custom variables (<code>--background-color</code>, <code>--accent-color</code>, <code>--heading-color</code>) that automatically cascade to all sections in real-time.
              </p>
              <p>
                <strong>Keyboard Shortcuts:</strong> Use <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border text-[10px] font-mono">↓</kbd> or <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border text-[10px] font-mono">]</kbd> to cycle forward through presets, and <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border text-[10px] font-mono">↑</kbd> or <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border text-[10px] font-mono">[</kbd> to cycle backward.
              </p>
              <p>
                <strong>Scoped Classes:</strong> Apply custom palette rules to individual sections using class modifiers like <code>.dark-hero</code> or <code>.light-background</code>.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowHelpModal(false)}
              className="mt-4 w-full py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors cursor-pointer"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Pipette, Check, Copy, X } from 'lucide-react';

// ==========================================
// Color Math Helper Utilities
// ==========================================
function hexToRgb(hex) {
  if (!hex) return { r: 0, g: 0, b: 0, a: 1 };
  let cleaned = hex.replace('#', '').trim();
  if (cleaned.length === 3) {
    cleaned = cleaned.split('').map((c) => c + c).join('');
  }
  let a = 1;
  if (cleaned.length === 8) {
    a = parseInt(cleaned.slice(6, 8), 16) / 255;
    cleaned = cleaned.slice(0, 6);
  }
  const num = parseInt(cleaned, 16);
  if (isNaN(num)) return { r: 0, g: 0, b: 0, a: 1 };
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
    a: Math.round(a * 100) / 100
  };
}

function rgbToHex(r, g, b, a = 1) {
  const clamp = (v) => Math.max(0, Math.min(255, Math.round(v)));
  const toHex = (v) => clamp(v).toString(16).padStart(2, '0');
  let hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  if (a < 1) {
    const alphaHex = Math.round(a * 255).toString(16).padStart(2, '0');
    hex += alphaHex;
  }
  return hex;
}

function rgbToHsv(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;
  const s = max === 0 ? 0 : d / max;
  const v = max;

  if (max !== min) {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
      default:
        break;
    }
    h /= 6;
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), v: Math.round(v * 100) };
}

function hsvToRgb(h, s, v) {
  h = h / 360;
  s = s / 100;
  v = v / 100;
  let r, g, b;
  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0: r = v; g = t; b = p; break;
    case 1: r = q; g = v; b = p; break;
    case 2: r = p; g = v; b = t; break;
    case 3: r = p; g = q; b = v; break;
    case 4: r = t; g = p; b = v; break;
    case 5: r = v; g = p; b = q; break;
    default: r = 0; g = 0; b = 0; break;
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
}

const POPULAR_SWATCHES = [
  '#ffffff', '#f8fafc', '#94a3b8', '#334155', '#0f172a', '#000000',
  '#0066ff', '#2563eb', '#38bdf8', '#059669', '#10b981', '#7c3aed',
  '#ec4899', '#f43f5e', '#ea580c', '#eab308'
];

export default function ColorPickerPopover({
  color = '#0066ff',
  label = 'COLOR',
  onChange,
  onClose
}) {
  const popoverRef = useRef(null);
  const satValRef = useRef(null);

  // Parse initial color
  const initialRgb = hexToRgb(color);
  const initialHsv = rgbToHsv(initialRgb.r, initialRgb.g, initialRgb.b);

  const [hue, setHue] = useState(initialHsv.h);
  const [sat, setSat] = useState(initialHsv.s);
  const [val, setVal] = useState(initialHsv.v);
  const [alpha, setAlpha] = useState(initialRgb.a !== undefined ? initialRgb.a : 1);
  const [inputMode, setInputMode] = useState('HEX'); // 'HEX' | 'RGB'
  const [hexInput, setHexInput] = useState(color);
  const [copied, setCopied] = useState(false);
  const isDraggingSatVal = useRef(false);

  // Sync state when color prop changes externally
  useEffect(() => {
    const rgb = hexToRgb(color);
    const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
    setHue(hsv.h);
    setSat(hsv.s);
    setVal(hsv.v);
    setAlpha(rgb.a !== undefined ? rgb.a : 1);
    setHexInput(color);
  }, [color]);

  // Handle color calculations from HSV + Alpha
  const updateFromHsv = useCallback((newH, newS, newV, newA) => {
    const rgb = hsvToRgb(newH, newS, newV);
    const hex = rgbToHex(rgb.r, rgb.g, rgb.b, newA);
    setHexInput(hex);
    if (onChange) onChange(hex);
  }, [onChange]);

  // Click outside and Escape handler
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target)) {
        if (onClose) onClose();
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (onClose) onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside, true);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside, true);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  // 2D Saturation / Value Gradient Picker Drag Handler
  const handleSatValPointer = (e) => {
    if (!satValRef.current) return;
    const rect = satValRef.current.getBoundingClientRect();
    const clientX = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    const clientY = e.clientY ?? e.touches?.[0]?.clientY ?? 0;
    const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
    const y = Math.max(0, Math.min(rect.height, clientY - rect.top));

    const newSat = Math.round((x / rect.width) * 100);
    const newVal = Math.round((1 - y / rect.height) * 100);

    setSat(newSat);
    setVal(newVal);
    updateFromHsv(hue, newSat, newVal, alpha);
  };

  const startSatValDrag = (e) => {
    isDraggingSatVal.current = true;
    handleSatValPointer(e);

    const onMove = (moveEvent) => {
      if (isDraggingSatVal.current) {
        handleSatValPointer(moveEvent);
      }
    };
    const onUp = () => {
      isDraggingSatVal.current = false;
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onUp);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onMove);
    window.addEventListener('touchend', onUp);
  };

  // Hue Slider Change
  const handleHueChange = (e) => {
    const newHue = parseInt(e.target.value, 10);
    setHue(newHue);
    updateFromHsv(newHue, sat, val, alpha);
  };

  // Alpha Slider Change
  const handleAlphaChange = (e) => {
    const newAlpha = parseFloat(e.target.value) / 100;
    setAlpha(newAlpha);
    updateFromHsv(hue, sat, val, newAlpha);
  };

  // Direct Hex Input Submit
  const handleHexInputChange = (e) => {
    const val = e.target.value;
    setHexInput(val);
    if (/^#?([0-9A-F]{3}|[0-9A-F]{6}|[0-9A-F]{8})$/i.test(val)) {
      const formatted = val.startsWith('#') ? val : `#${val}`;
      const rgb = hexToRgb(formatted);
      const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
      setHue(hsv.h);
      setSat(hsv.s);
      setVal(hsv.v);
      setAlpha(rgb.a !== undefined ? rgb.a : 1);
      if (onChange) onChange(formatted);
    }
  };

  // RGB Input fields
  const currentRgb = hsvToRgb(hue, sat, val);
  const handleRgbChange = (channel, value) => {
    const num = Math.max(0, Math.min(255, parseInt(value, 10) || 0));
    const nextRgb = { ...currentRgb, [channel]: num };
    const hsv = rgbToHsv(nextRgb.r, nextRgb.g, nextRgb.b);
    setHue(hsv.h);
    setSat(hsv.s);
    setVal(hsv.v);
    const hex = rgbToHex(nextRgb.r, nextRgb.g, nextRgb.b, alpha);
    setHexInput(hex);
    if (onChange) onChange(hex);
  };

  // EyeDropper API integration
  const handleEyeDropper = async () => {
    if (window.EyeDropper) {
      try {
        const eyeDropper = new window.EyeDropper();
        const result = await eyeDropper.open();
        if (result && result.sRGBHex) {
          const pickedHex = result.sRGBHex;
          setHexInput(pickedHex);
          const rgb = hexToRgb(pickedHex);
          const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
          setHue(hsv.h);
          setSat(hsv.s);
          setVal(hsv.v);
          setAlpha(1);
          if (onChange) onChange(pickedHex);
        }
      } catch (err) {
        // User canceled eye dropper
      }
    } else {
      alert('Native EyeDropper tool is supported in Chromium browsers (Chrome, Edge, Opera).');
    }
  };

  const handleCopyHex = () => {
    navigator.clipboard.writeText(hexInput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const pureHueRgb = hsvToRgb(hue, 100, 100);
  const pureHueHex = rgbToHex(pureHueRgb.r, pureHueRgb.g, pureHueRgb.b);

  return (
    <div
      ref={popoverRef}
      className="absolute right-0 top-full mt-2 w-[280px] bg-white rounded-2xl border border-slate-200 shadow-2xl z-50 p-4 text-slate-800 animate-in fade-in zoom-in-95 duration-150 select-none font-sans"
      style={{
        boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.05)'
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Popover Header */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span
            className="w-3 h-3 rounded-full border border-black/15 shadow-2xs"
            style={{ backgroundColor: hexInput }}
          />
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
            {label}
          </span>
        </div>
        <div className="flex items-center gap-1">
          {window.EyeDropper && (
            <button
              type="button"
              onClick={handleEyeDropper}
              className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Pick Color from Screen (EyeDropper)"
            >
              <Pipette size={13} />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            title="Close Popover"
          >
            <X size={13} />
          </button>
        </div>
      </div>

      {/* 2D Saturation / Value Gradient Box */}
      <div
        ref={satValRef}
        onMouseDown={startSatValDrag}
        onTouchStart={startSatValDrag}
        className="relative w-full h-36 rounded-xl cursor-crosshair overflow-hidden mb-3.5 shadow-inner"
        style={{
          backgroundColor: pureHueHex,
          backgroundImage: `
            linear-gradient(to right, #ffffff, transparent),
            linear-gradient(to top, #000000, transparent)
          `
        }}
      >
        {/* Saturation / Brightness Handle Thumb */}
        <div
          className="absolute w-4 h-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-md pointer-events-none transition-transform"
          style={{
            left: `${sat}%`,
            top: `${100 - val}%`,
            backgroundColor: hexInput,
            boxShadow: '0 0 0 1px rgba(0,0,0,0.4), 0 2px 6px rgba(0,0,0,0.3)'
          }}
        />
      </div>

      {/* Sliders: Hue & Opacity */}
      <div className="flex flex-col gap-2.5 mb-3.5">
        {/* Hue Rainbow Slider */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase w-4">H</span>
          <input
            type="range"
            min="0"
            max="360"
            value={hue}
            onChange={handleHueChange}
            className="flex-1 h-3 rounded-full appearance-none cursor-pointer outline-none shadow-inner"
            style={{
              background: 'linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)'
            }}
          />
        </div>

        {/* Opacity / Alpha Slider */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase w-4">A</span>
          <div
            className="flex-1 h-3 rounded-full relative overflow-hidden flex items-center shadow-inner"
            style={{
              backgroundImage: 'linear-gradient(45deg, #cbd5e1 25%, transparent 25%), linear-gradient(-45deg, #cbd5e1 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #cbd5e1 75%), linear-gradient(-45deg, transparent 75%, #cbd5e1 75%)',
              backgroundSize: '8px 8px',
              backgroundPosition: '0 0, 0 4px, 4px -4px, -4px 0px'
            }}
          >
            <input
              type="range"
              min="0"
              max="100"
              value={Math.round(alpha * 100)}
              onChange={handleAlphaChange}
              className="w-full h-full appearance-none bg-transparent cursor-pointer outline-none relative z-10"
              style={{
                background: `linear-gradient(to right, transparent, ${pureHueHex})`
              }}
            />
          </div>
          <span className="text-[10px] font-mono text-slate-500 w-7 text-right">
            {Math.round(alpha * 100)}%
          </span>
        </div>
      </div>

      {/* Numeric Inputs: HEX / RGB Mode Switcher */}
      <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 mb-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex gap-1 bg-slate-200/70 p-0.5 rounded-lg text-[10px] font-bold">
            {['HEX', 'RGB'].map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setInputMode(mode)}
                className={`px-2 py-0.5 rounded-md transition-all cursor-pointer ${
                  inputMode === mode
                    ? 'bg-white text-blue-600 shadow-2xs font-bold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={handleCopyHex}
            className="flex items-center gap-1 text-[10px] font-bold text-slate-500 hover:text-blue-600 transition-colors cursor-pointer px-1.5 py-0.5 rounded hover:bg-slate-200/50"
            title="Copy HEX Code"
          >
            {copied ? <Check size={11} className="text-emerald-500" /> : <Copy size={11} />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>

        {inputMode === 'HEX' ? (
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-slate-400">#</span>
            <input
              type="text"
              value={hexInput.replace('#', '')}
              onChange={handleHexInputChange}
              placeholder="0066FF"
              className="w-full px-2 py-1 rounded-lg border border-slate-200 text-xs font-mono font-bold text-slate-900 bg-white focus:outline-none focus:border-blue-500 uppercase shadow-2xs"
            />
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { label: 'R', val: currentRgb.r, channel: 'r' },
              { label: 'G', val: currentRgb.g, channel: 'g' },
              { label: 'B', val: currentRgb.b, channel: 'b' }
            ].map(({ label, val, channel }) => (
              <div key={label} className="flex flex-col">
                <span className="text-[9px] font-bold text-slate-400 uppercase text-center">{label}</span>
                <input
                  type="number"
                  min="0"
                  max="255"
                  value={val}
                  onChange={(e) => handleRgbChange(channel, e.target.value)}
                  className="w-full px-1.5 py-1 text-center rounded-lg border border-slate-200 text-xs font-mono font-bold text-slate-900 bg-white focus:outline-none focus:border-blue-500 shadow-2xs"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Swatches Bar */}
      <div>
        <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
          Quick Swatches
        </span>
        <div className="grid grid-cols-8 gap-1.5">
          {POPULAR_SWATCHES.map((swatch) => (
            <button
              key={swatch}
              type="button"
              onClick={() => {
                setHexInput(swatch);
                const rgb = hexToRgb(swatch);
                const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
                setHue(hsv.h);
                setSat(hsv.s);
                setVal(hsv.v);
                setAlpha(1);
                if (onChange) onChange(swatch);
              }}
              style={{
                backgroundColor: swatch,
                boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.15)'
              }}
              className="w-full h-5 rounded-md hover:scale-110 active:scale-95 transition-transform cursor-pointer"
              title={swatch}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

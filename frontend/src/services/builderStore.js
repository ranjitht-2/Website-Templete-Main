// Preset Color Schemes (All / Light / Dark)
export const COLOR_PRESETS = [
  {
    id: 'techno-blue',
    name: 'Techno Blue',
    type: 'light',
    colors: {
      background: '#ffffff',
      default: '#212529',
      heading: '#0f172a',
      accent: '#0066ff',
      surface: '#f8fafc',
      contrast: '#ffffff',
      nav: '#334155',
      navHover: '#0066ff',
      mobileBg: '#ffffff',
      dropBg: '#ffffff',
      dropNav: '#334155',
      dropHover: '#0066ff'
    }
  },
  {
    id: 'emerald-luxury',
    name: 'Emerald Sanctuary',
    type: 'light',
    colors: {
      background: '#fcfdfd',
      default: '#1f2937',
      heading: '#064e3b',
      accent: '#059669',
      surface: '#f0fdf4',
      contrast: '#ffffff',
      nav: '#374151',
      navHover: '#059669',
      mobileBg: '#ffffff',
      dropBg: '#ffffff',
      dropNav: '#374151',
      dropHover: '#059669'
    }
  },
  {
    id: 'violet-pulse',
    name: 'Violet Pulse',
    type: 'light',
    colors: {
      background: '#ffffff',
      default: '#1e293b',
      heading: '#4c1d95',
      accent: '#7c3aed',
      surface: '#f5f3ff',
      contrast: '#ffffff',
      nav: '#334155',
      navHover: '#7c3aed',
      mobileBg: '#ffffff',
      dropBg: '#ffffff',
      dropNav: '#334155',
      dropHover: '#7c3aed'
    }
  },
  {
    id: 'sunset-coral',
    name: 'Sunset Coral',
    type: 'light',
    colors: {
      background: '#fffdfa',
      default: '#292524',
      heading: '#7c2d12',
      accent: '#ea580c',
      surface: '#fff7ed',
      contrast: '#ffffff',
      nav: '#44403c',
      navHover: '#ea580c',
      mobileBg: '#ffffff',
      dropBg: '#ffffff',
      dropNav: '#44403c',
      dropHover: '#ea580c'
    }
  },
  {
    id: 'nordic-frost',
    name: 'Nordic Frost',
    type: 'light',
    colors: {
      background: '#f8fafc',
      default: '#334155',
      heading: '#0f172a',
      accent: '#0284c7',
      surface: '#f0f9ff',
      contrast: '#ffffff',
      nav: '#475569',
      navHover: '#0284c7',
      mobileBg: '#ffffff',
      dropBg: '#f8fafc',
      dropNav: '#334155',
      dropHover: '#0284c7'
    }
  },
  {
    id: 'amber-luxe',
    name: 'Amber Luxe',
    type: 'light',
    colors: {
      background: '#fefefe',
      default: '#27272a',
      heading: '#713f12',
      accent: '#d97706',
      surface: '#fefce8',
      contrast: '#ffffff',
      nav: '#3f3f46',
      navHover: '#d97706',
      mobileBg: '#ffffff',
      dropBg: '#ffffff',
      dropNav: '#3f3f46',
      dropHover: '#d97706'
    }
  },
  {
    id: 'cyber-dark',
    name: 'Cyberpunk Dark',
    type: 'dark',
    colors: {
      background: '#090d16',
      default: '#e2e8f0',
      heading: '#ffffff',
      accent: '#38bdf8',
      surface: '#0f172a',
      contrast: '#020617',
      nav: '#94a3b8',
      navHover: '#38bdf8',
      mobileBg: '#090d16',
      dropBg: '#0f172a',
      dropNav: '#cbd5e1',
      dropHover: '#38bdf8'
    }
  },
  {
    id: 'crimson-noir',
    name: 'Crimson Noir',
    type: 'dark',
    colors: {
      background: '#0a0a0a',
      default: '#d4d4d8',
      heading: '#ffffff',
      accent: '#f43f5e',
      surface: '#18181b',
      contrast: '#000000',
      nav: '#a1a1aa',
      navHover: '#f43f5e',
      mobileBg: '#0a0a0a',
      dropBg: '#18181b',
      dropNav: '#e4e4e7',
      dropHover: '#f43f5e'
    }
  },
  {
    id: 'golden-obsidian',
    name: 'Golden Obsidian',
    type: 'dark',
    colors: {
      background: '#0d0d0f',
      default: '#e4e4e7',
      heading: '#fef08a',
      accent: '#eab308',
      surface: '#18181b',
      contrast: '#000000',
      nav: '#a1a1aa',
      navHover: '#eab308',
      mobileBg: '#0d0d0f',
      dropBg: '#18181b',
      dropNav: '#f4f4f5',
      dropHover: '#eab308'
    }
  },
  {
    id: 'deep-midnight',
    name: 'Deep Midnight',
    type: 'dark',
    colors: {
      background: '#030712',
      default: '#cbd5e1',
      heading: '#f1f5f9',
      accent: '#6366f1',
      surface: '#111827',
      contrast: '#ffffff',
      nav: '#94a3b8',
      navHover: '#818cf8',
      mobileBg: '#030712',
      dropBg: '#111827',
      dropNav: '#cbd5e1',
      dropHover: '#818cf8'
    }
  },
  {
    id: 'aurora-forest',
    name: 'Aurora Forest',
    type: 'dark',
    colors: {
      background: '#06130e',
      default: '#d1fae5',
      heading: '#6ee7b7',
      accent: '#10b981',
      surface: '#0d281e',
      contrast: '#022c22',
      nav: '#a7f3d0',
      navHover: '#34d399',
      mobileBg: '#06130e',
      dropBg: '#0d281e',
      dropNav: '#d1fae5',
      dropHover: '#34d399'
    }
  },
  {
    id: 'neon-synthwave',
    name: 'Neon Synthwave',
    type: 'dark',
    colors: {
      background: '#120b1e',
      default: '#f3e8ff',
      heading: '#f472b6',
      accent: '#ec4899',
      surface: '#24123a',
      contrast: '#ffffff',
      nav: '#d8b4fe',
      navHover: '#f472b6',
      mobileBg: '#120b1e',
      dropBg: '#24123a',
      dropNav: '#f3e8ff',
      dropHover: '#f472b6'
    }
  }
];

// Default Custom Scoped Presets for sections
export const DEFAULT_CUSTOM_SCOPED_PRESETS = [
  {
    id: 'scoped-light-bg',
    className: '.light-background',
    name: 'Light Background',
    description: 'Crisp high-key background for clean content & feature cards',
    colors: ['#ffffff', '#0f172a', '#2563eb', '#f8fafc', '#ffffff', '#334155']
  },
  {
    id: 'scoped-dark-hero',
    className: '.dark-hero',
    name: 'Dark Hero Section',
    description: 'Immersive dark backdrop for prominent hero banners & statistics',
    colors: ['#090d16', '#ffffff', '#38bdf8', '#0f172a', '#020617', '#94a3b8']
  },
  {
    id: 'scoped-accent-surface',
    className: '.accent-surface',
    name: 'Accent Spotlight',
    description: 'Tinted brand highlight section for testimonials & featured perks',
    colors: ['#eff6ff', '#1e3a8a', '#2563eb', '#dbeafe', '#ffffff', '#1d4ed8']
  },
  {
    id: 'scoped-contrast-card',
    className: '.contrast-card',
    name: 'Contrast Pitch Card',
    description: 'High-contrast card style for pricing tiers and call-to-actions',
    colors: ['#18181b', '#ffffff', '#f43f5e', '#27272a', '#000000', '#f43f5e']
  }
];

// Google Fonts list
export const GOOGLE_FONTS = [
  'Plus Jakarta Sans',
  'Inter',
  'Roboto',
  'Poppins',
  'Open Sans',
  'Montserrat',
  'Outfit',
  'Playfair Display',
  'Space Grotesk',
  'Raleway',
  'Cinzel',
  'Fira Code'
];

// Re-export Page Base Template schemas and helpers
export {
  PAGE_BASE_TEMPLATES,
  getBaseTemplateById,
  getDefaultBaseTemplate,
  applyBaseTemplateToState
} from './pageBaseTemplates';

export const INITIAL_BUILDER_STATE = {
  activeTab: 'index.html',
  tabs: ['index.html', 'about.html', 'services.html', 'contact.html'],
  viewport: 'desktop', // 'builder' | 'desktop' | 'tablet' | 'mobile'
  activeDrawer: 'page', // 'page' | 'header' | 'footer' | 'colors' | 'fonts' | 'media' | 'misc' | null
  themeMode: 'light',
  
  // Page Options
  pageName: 'index.html',
  pageTitle: 'Home',
  showPageTitle: true,
  pageBaseTemplate: 'standard', // 'standard' | 'right-sidebar' | 'left-sidebar' | 'full-left-sidebar'
  metaTags: {
    title: '',
    description: '',
    keywords: '',
    ogImage: ''
  },
  pageCustomCode: {
    head: '',
    body: ''
  },
  sections: [
    { id: 'sec-0', anchor: '#hero', name: 'Hero / Banner Section', enabled: true },
    { id: 'sec-1', anchor: '#intro', name: 'Introduction & Overview', enabled: true },
    { id: 'sec-2', anchor: '#featured-speakers', name: 'Featured Speakers / Highlights', enabled: true },
    { id: 'sec-3', anchor: '#schedule', name: 'Schedule & Agenda Matrix', enabled: true },
    { id: 'sec-4', anchor: '#testimonials', name: 'Attendees & Testimonials', enabled: true },
    { id: 'sec-5', anchor: '#contact', name: 'Registration / Contact Form', enabled: true }
  ],

  // Header Options
  headerTemplate: 'sticky-top', // 'sticky-top' | 'left-dock' | 'floating'
  navmenuScrollspy: true,
  navmenuDropdownTrigger: 'hover', // 'hover' | 'click'
  headerCustomOverride: false,
  logoImage: '',
  avatarImage: '',

  // Colors
  colors: { ...COLOR_PRESETS[0].colors },
  activePresetId: 'techno-blue',

  // Fonts
  fonts: {
    defaultFont: 'Plus Jakarta Sans',
    headingFont: 'Plus Jakarta Sans',
    navFont: 'Plus Jakarta Sans'
  },

  // Misc Options
  animationOnScroll: true,
  scrollTopButton: true,
  pagePreloader: false,
  globalCustomCode: ''
};

// Generates complete live CSS to inject into the live canvas/iframe
export function generateLiveCSS(builderState) {
  const { colors, fonts, showPageTitle, pageBaseTemplate, headerTemplate } = builderState;

  // Base Layout Container overrides
  let layoutCSS = '';
  const layout = (pageBaseTemplate || 'standard').toLowerCase();

  if (layout === 'right-sidebar' || layout === 'split' || layout === 'split-showcase') {
    layoutCSS = `
      body > main, body > div.main-wrapper, body > section, div#root > main {
        display: grid !important;
        grid-template-columns: minmax(0, 1fr) 280px !important;
        gap: 2rem !important;
        max-width: 1320px !important;
        margin-left: auto !important;
        margin-right: auto !important;
        padding: 1.5rem !important;
        box-sizing: border-box !important;
      }
      aside, .sidebar, .widget-rail, .widget-area {
        grid-column: 2 !important;
        position: sticky !important;
        top: 20px !important;
        height: fit-content !important;
      }
    `;
  } else if (layout === 'left-sidebar' || layout === 'boxed' || layout === 'boxed-centered') {
    layoutCSS = `
      body > main, body > div.main-wrapper, body > section, div#root > main {
        display: grid !important;
        grid-template-columns: 280px minmax(0, 1fr) !important;
        gap: 2rem !important;
        max-width: 1320px !important;
        margin-left: auto !important;
        margin-right: auto !important;
        padding: 1.5rem !important;
        box-sizing: border-box !important;
      }
      aside, .sidebar, .widget-rail, .widget-area {
        grid-column: 1 !important;
        grid-row: 1 !important;
        position: sticky !important;
        top: 20px !important;
        height: fit-content !important;
      }
    `;
  } else if (layout === 'full-left-sidebar' || layout === 'sidebar-dashboard' || layout === 'sidebar') {
    layoutCSS = `
      body {
        display: flex !important;
        flex-direction: row !important;
        min-height: 100vh !important;
        overflow-x: hidden !important;
      }
      header, .navbar-vertical, aside.sidebar, nav.site-header, .widget-column {
        width: 260px !important;
        flex-shrink: 0 !important;
        position: sticky !important;
        top: 0 !important;
        height: 100vh !important;
        overflow-y: auto !important;
        border-right: 1px solid rgba(0, 0, 0, 0.08) !important;
        background: #ffffff !important;
      }
      main, .content-wrapper, section, div#root > main {
        flex: 1 !important;
        min-width: 0 !important;
      }
    `;
  } else {
    // standard (Page Title top / Sections bottom)
    layoutCSS = `
      body {
        display: block !important;
        width: 100% !important;
      }
      main, .content-wrapper, section, div#root > main {
        display: block !important;
        width: 100% !important;
      }
    `;
  }

  // Header layout overrides
  let headerCSS = '';
  if (headerTemplate === 'floating') {
    headerCSS = `
      header, nav.navbar, .site-header {
        position: fixed !important;
        top: 16px !important;
        left: 50% !important;
        transform: translateX(-50%) !important;
        width: 92% !important;
        max-width: 1280px !important;
        border-radius: 99px !important;
        box-shadow: 0 12px 36px rgba(0, 0, 0, 0.12) !important;
        z-index: 99999 !important;
        backdrop-filter: blur(16px) !important;
        -webkit-backdrop-filter: blur(16px) !important;
      }
    `;
  } else if (headerTemplate === 'left-dock') {
    headerCSS = `
      header, nav.navbar, .site-header {
        position: fixed !important;
        left: 0 !important;
        top: 0 !important;
        bottom: 0 !important;
        width: 260px !important;
        height: 100vh !important;
        z-index: 99999 !important;
        display: flex !important;
        flex-direction: column !important;
      }
      body {
        padding-left: 260px !important;
      }
    `;
  } else {
    // sticky-top
    headerCSS = `
      header, nav.navbar, .site-header {
        position: sticky !important;
        top: 0 !important;
        z-index: 99999 !important;
      }
    `;
  }

  // Page Title visibility
  let titleCSS = '';
  if (!showPageTitle) {
    titleCSS = `
      .page-title, .breadcrumbs, .pagetitle, .header-hero-title, h1.page-heading {
        display: none !important;
      }
    `;
  }

  return `
    :root {
      --background-color: ${colors.background} !important;
      --default-color: ${colors.default} !important;
      --heading-color: ${colors.heading} !important;
      --accent-color: ${colors.accent} !important;
      --surface-color: ${colors.surface} !important;
      --contrast-color: ${colors.contrast} !important;
      --nav-color: ${colors.nav} !important;
      --nav-hover-color: ${colors.navHover} !important;
      --mobile-bg-color: ${colors.mobileBg} !important;
      --drop-bg-color: ${colors.dropBg} !important;
      --drop-nav-color: ${colors.dropNav} !important;
      --drop-hover-color: ${colors.dropHover} !important;
      --primary-color: ${colors.accent} !important;
      
      --default-font: '${fonts.defaultFont}', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
      --heading-font: '${fonts.headingFont}', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
      --nav-font: '${fonts.navFont}', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
    }
    body {
      font-family: var(--default-font) !important;
      background-color: var(--background-color) !important;
      color: var(--default-color) !important;
      transition: background-color 0.2s ease, color 0.2s ease !important;
    }
    h1, h2, h3, h4, h5, h6, .heading-font, [class*="heading"], [class*="title"] {
      font-family: var(--heading-font) !important;
      color: var(--heading-color) !important;
    }
    a, .accent-text, nav a:hover {
      color: var(--accent-color);
    }
    .btn-primary, .btn-hero-primary, button.primary, .btn-action, a.btn-primary {
      background: var(--accent-color) !important;
      background-color: var(--accent-color) !important;
      border-color: var(--accent-color) !important;
      color: var(--contrast-color) !important;
    }
    ${titleCSS}
    ${layoutCSS}
    ${headerCSS}
  `;
}

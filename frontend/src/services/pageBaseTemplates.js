// Universal Page Base Template Schemas
// Abstracts layout schemas so they adapt cleanly across all template categories (Events, Portfolio, Education, SaaS, Business, Blog, Admin)

export const PAGE_BASE_TEMPLATES = [
  {
    id: 'standard',
    aliases: ['standard-landing', 'blank', 'default'],
    name: 'Standard',
    badge: 'Default',
    badgeColor: 'blue',
    description: 'Page Title (top) / Sections (bottom) with full-width responsive flow.',
    layoutType: 'standard',
    layoutFlow: {
      top: 'PAGE TITLE',
      columns: [
        { type: 'sections', label: 'SECTIONS', width: '100%' }
      ]
    },
    features: ['Page Title Top', 'Full-Width Sections', 'Linear Flow']
  },
  {
    id: 'right-sidebar',
    aliases: ['sidebar-right', 'split-showcase'],
    name: 'Right Sidebar',
    badge: 'Popular',
    badgeColor: 'violet',
    description: 'Page Title (top) / Sections (left) / Widgets (right).',
    layoutType: 'right-sidebar',
    layoutFlow: {
      top: 'PAGE TITLE',
      columns: [
        { type: 'sections', label: 'SECTIONS', width: '68%' },
        { type: 'widgets', label: 'WIDGETS', width: '32%' }
      ]
    },
    features: ['Page Title Top', 'Content Left (68%)', 'Widgets Right (32%)']
  },
  {
    id: 'left-sidebar',
    aliases: ['sidebar-left', 'boxed-centered'],
    name: 'Left Sidebar',
    badge: 'Pro',
    badgeColor: 'emerald',
    description: 'Page Title (top) / Widgets (left) / Sections (right).',
    layoutType: 'left-sidebar',
    layoutFlow: {
      top: 'PAGE TITLE',
      columns: [
        { type: 'widgets', label: 'WIDGETS', width: '32%' },
        { type: 'sections', label: 'SECTIONS', width: '68%' }
      ]
    },
    features: ['Page Title Top', 'Widgets Left (32%)', 'Content Right (68%)']
  },
  {
    id: 'full-left-sidebar',
    aliases: ['sidebar-dashboard', 'sidebar', 'portal'],
    name: 'Full Left Sidebar',
    badge: 'Portal',
    badgeColor: 'indigo',
    description: 'Widgets (full left column) / Page Title & Sections (stacked right).',
    layoutType: 'full-left-sidebar',
    layoutFlow: {
      hasFullLeftSidebar: true,
      left: { type: 'widgets', label: 'WIDGETS', width: '280px' },
      right: {
        top: 'PAGE TITLE',
        bottom: 'SECTIONS'
      }
    },
    features: ['Full Left Column (Widgets)', 'Stacked Right (Title + Sections)', 'Dashboard Flow']
  }
];

/**
 * Resolves a template by ID or backward-compatible alias.
 */
export function getBaseTemplateById(id) {
  if (!id) return PAGE_BASE_TEMPLATES[0];
  const query = id.toLowerCase();
  return (
    PAGE_BASE_TEMPLATES.find(
      (tpl) => tpl.id.toLowerCase() === query || (tpl.aliases && tpl.aliases.includes(query))
    ) || PAGE_BASE_TEMPLATES[0]
  );
}

/**
 * Returns default template
 */
export function getDefaultBaseTemplate() {
  return PAGE_BASE_TEMPLATES[0];
}

/**
 * Applies a new Base Template to the current builder state,
 * preserving metadata like pageName, pageTitle, tabs, metaTags, customCode, colors, and fonts,
 * while safely swapping layout configuration.
 */
export function applyBaseTemplateToState(currentState, templateId) {
  const targetTemplate = getBaseTemplateById(templateId);
  if (!targetTemplate) return currentState;

  return {
    ...currentState,
    pageBaseTemplate: targetTemplate.id
  };
}

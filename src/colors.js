// Centralized color configuration for the whole site (every page except
// Studio and Portfolio, which have their own intentionally different themes -
// see portfolioColors.js for Portfolio's palette).
// Edit these values to change the color scheme across all shared pages.

const colors = {
  // Background colors
  bg: {
    primary: 'bg-slate-950',        // Main background (used as fallback)
    banner: 'bg-slate-900/80',      // Top rotating banner background
    card: 'bg-slate-900/40',        // Default card background (link cards, stat cards, etc.)
    cardHover: 'hover:bg-slate-900/60', // Card background on hover (full class, already includes "hover:")
    well: 'bg-slate-800/50',        // Icon wells, back button, social icon buttons
    wellSubtle: 'bg-slate-800/30',  // Nested/secondary well (e.g. activity rows)
  },

  // Animated gradient page background
  // Set enabled to true to use gradient, false to use solid bg.primary color
  gradient: {
    enabled: true,
    // Customize your gradient colors here (use any valid CSS colors)
    colors: ['#002729', '#001929', '#181538'], // slate-950, slate-800, slate-700
    // Animation settings
    animation: 'animate-gradient',
    // Gradient direction classes: 'bg-gradient-to-r', 'bg-gradient-to-br', 'bg-gradient-to-b', etc.
    direction: 'bg-gradient-to-br',
  },

  // Large decorative blurred blobs behind page content
  blobs: {
    primary: 'bg-cyan-500/10',
    secondary: 'bg-purple-500/10',
  },

  // Text colors
  text: {
    primary: 'text-slate-100',      // Main text / card values
    secondary: 'text-slate-200',    // Card titles
    tertiary: 'text-slate-400',     // Link default color, subtitles
    muted: 'text-slate-500',        // Footer text, labels (light)
    subtle: 'text-slate-600',       // Footer text (very light)
    accent: 'text-cyan-400',        // Banner message, icons, links hover
    accentHover: 'hover:text-cyan-300', // Link hover color
    linkArrow: 'text-cyan-600',     // Arrow before links
  },

  // Border colors
  border: {
    primary: 'border-slate-700/50', // All chrome borders
    accentHover: 'hover:border-cyan-500/30', // Border hover state on cards/buttons
  },

  // Gradient used on page/hero heading text
  heroGradient: 'bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400',

  // Accent gradients cycled through for the homepage LinkCard icon wells
  accents: [
    'bg-gradient-to-br from-cyan-500/20 to-blue-500/20',
    'bg-gradient-to-br from-purple-500/20 to-pink-500/20',
    'bg-gradient-to-br from-amber-500/20 to-orange-500/20',
    'bg-gradient-to-br from-green-500/20 to-emerald-500/20',
  ],

  // Transition classes (duration is appended separately at each call site)
  transition: {
    colors: 'transition-colors',
    all: 'transition-all',
  },

  // Font
  font: {
    family: 'font-mono',
  },
};

export default colors;

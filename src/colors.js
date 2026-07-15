// Centralized color configuration for the whole site (every page except
// Studio and Portfolio, which have their own intentionally different themes -
// see portfolioColors.js for Portfolio's palette).
// Edit these values to change the color scheme across all shared pages.

const colors = {
  // Background colors
  bg: {
    primary: 'bg-slate-950',        // Main background (used as fallback)
    banner: 'bg-red-950/80',        // Top rotating banner background
    card: 'bg-slate-900/40',        // Default card background (link cards, stat cards, etc.)
    cardHover: 'hover:bg-slate-900/60', // Card background on hover (full class, already includes "hover:")
    well: 'bg-slate-800/50',        // Icon wells, back button, social icon buttons
    wellSubtle: 'bg-slate-800/30',  // Nested/secondary well (e.g. activity rows)
    iconAccent: 'bg-red-500/10',    // Small accent icon wells (e.g. stat card icons)
  },

  // Animated gradient page background
  // Set enabled to true to use gradient, false to use solid bg.primary color
  gradient: {
    enabled: true,
    // Customize your gradient colors here (use any valid CSS colors)
    colors: ['#290000', '#1a0000', '#380a0a'], // deep red / near-black red / dark maroon
    // Animation settings
    animation: 'animate-gradient',
    // Gradient direction classes: 'bg-gradient-to-r', 'bg-gradient-to-br', 'bg-gradient-to-b', etc.
    direction: 'bg-gradient-to-br',
  },

  // Large decorative blurred blobs behind page content
  blobs: {
    primary: 'bg-red-500/10',
    secondary: 'bg-rose-500/10',
  },

  // Text colors
  text: {
    primary: 'text-slate-100',      // Main text / card values
    secondary: 'text-slate-200',    // Card titles
    tertiary: 'text-slate-400',     // Link default color, subtitles
    muted: 'text-slate-500',        // Footer text, labels (light)
    subtle: 'text-slate-600',       // Footer text (very light)
    accent: 'text-red-400',         // Banner message, icons, links hover
    accentHover: 'hover:text-red-300', // Link hover color
    linkArrow: 'text-red-600',      // Arrow before links
    onAccent: 'text-white',         // Icon color sitting on a colored accent well
  },

  // Border colors
  border: {
    primary: 'border-slate-700/50', // All chrome borders
    accentHover: 'hover:border-red-500/30', // Border hover state on cards/buttons
    avatar: 'border-slate-800',     // Ring around avatars / status dots
  },

  // Discord status indicator colors (mirrors Discord's own status convention,
  // intentionally not tied to the site accent color)
  status: {
    online: 'bg-green-500',
    idle: 'bg-yellow-500',
    dnd: 'bg-red-500',
    offline: 'bg-gray-500',
  },

  // Loading spinner
  spinner: 'border-red-400/30 border-t-red-400',

  // Ring around the homepage hero profile picture
  heroRing: {
    border: 'border-red-400/30',
    shadow: 'shadow-red-500/10',
  },

  // Social icon hover colors. `github` follows the site accent since it has no
  // brand color of its own here; the rest are each service's real brand color.
  social: {
    github: 'hover:text-red-300 hover:border-red-500/30',
    youtube: 'hover:text-red-400 hover:border-red-500/30',
    discord: 'hover:text-indigo-400 hover:border-indigo-500/30',
    modrinth: 'hover:text-green-400 hover:border-green-500/30',
  },

  // Gradient used on page/hero heading text
  heroGradient: 'bg-gradient-to-r from-red-400 via-rose-400 to-red-600',

  // Accent gradients cycled through for the homepage LinkCard icon wells
  accents: [
    'bg-gradient-to-br from-red-500/20 to-rose-500/20',
    'bg-gradient-to-br from-rose-500/20 to-pink-500/20',
    'bg-gradient-to-br from-orange-500/20 to-red-500/20',
    'bg-gradient-to-br from-red-600/20 to-orange-600/20',
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

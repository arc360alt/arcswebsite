// Centralized color configuration for the entire website
// Edit these values to change the color scheme across all pages

const colors = {
  // Background colors
  bg: {
    primary: 'bg-slate-950',        // Main background (used as fallback)
    secondary: 'bg-slate-900/50',   // Banner background
    tertiary: 'bg-slate-900/30',    // Links box background
    card: 'bg-slate-900/20',        // Image container background
  },

  // Animated gradient background
  // Set enabled to true to use gradient, false to use solid bg.primary color
  gradient: {
    enabled: true,
    // Customize your gradient colors here (use any valid CSS colors)
    colors: ['#0f172a', '#04002b', '#181538'], // slate-950, slate-800, slate-700
    // Animation settings
    animation: 'animate-gradient',
    // Gradient direction classes: 'bg-gradient-to-r', 'bg-gradient-to-br', 'bg-gradient-to-b', etc.
    direction: 'bg-gradient-to-br',
  },

  // Text colors
  text: {
    primary: 'text-slate-100',      // Main text
    secondary: 'text-slate-300',    // Title text
    tertiary: 'text-slate-400',     // Link default color
    muted: 'text-slate-500',        // Footer text (light)
    subtle: 'text-slate-600',       // Footer text (very light)
    accent: 'text-cyan-400',        // Banner message, links hover
    accentHover: 'hover:text-cyan-300', // Link hover color
    linkArrow: 'text-cyan-600',     // Arrow before links
  },

  // Border colors
  border: {
    primary: 'border-slate-700',    // All borders
  },

  // Transition classes
  transition: {
    colors: 'transition-colors',
    all: 'transition-all duration-500',
  },

  // Font
  font: {
    family: 'font-mono',
  }
};

export default colors;

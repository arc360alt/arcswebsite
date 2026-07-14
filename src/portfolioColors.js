// Centralized color configuration for the Portfolio page only
// Edit these values to change the Portfolio page's color scheme without touching layout code.
// Note: Tailwind class names here must stay as full literal strings (not built by concatenation)
// so Tailwind's build step can detect and generate them.

const portfolioColors = {
  // Page background - rendered as a raw CSS linear-gradient, so plain hex codes work here
  background: {
    direction: 'to bottom right',
    colors: ['#331e00', '#2d1100', '#2c1900'],
  },

  // Top nav pill
  nav: {
    bg: 'bg-orange-900/40',
    border: 'border-amber-700/50',
  },

  // Gradient used on the hero name text
  heroGradient: 'bg-gradient-to-r from-orange-600 via-yellow-600 to-yellow-500',

  // Default card surface, used for skill/project/modpack/repo cards
  card: {
    bg: 'bg-yellow-950/40',
    border: 'border-amber-700/50',
    hoverBorder: 'hover:border-orange-500/60',
    hoverShadow: 'hover:shadow-[0_0_30px_rgba(249,115,22,0.35)]',
  },

  // Discord presence card
  discordCard: {
    bg: 'bg-yellow-950/60',
    border: 'border-slate-700/50',
  },

  // Highlight treatment for the "this site" repo card
  highlight: {
    border: 'border-orange-500/60',
    shadow: 'shadow-[0_0_30px_rgba(249,115,22,0.35)]',
    shadowHover: 'hover:shadow-[0_0_40px_rgba(249,115,22,0.55)]',
  },

  // Small pill badges
  badge: {
    accentBg: 'bg-orange-500/20',
    accentText: 'text-orange-300',
    beginnerBg: 'bg-green-500/20',
    beginnerText: 'text-green-300',
  },

  // Primary call-to-action buttons (e.g. modpack downloads)
  button: {
    gradient: 'bg-gradient-to-r from-orange-600 to-yellow-600',
    gradientHover: 'hover:from-orange-500 hover:to-yellow-500',
  },

  // Toggle switches (e.g. Show Forks)
  toggle: {
    checkedBg: 'peer-checked:bg-orange-600',
  },
};

export default portfolioColors;

// Centralized color configuration for the Portfolio page only
// Edit these values to change the Portfolio page's color scheme without touching layout code.
// Note: Tailwind class names here must stay as full literal strings (not built by concatenation)
// so Tailwind's build step can detect and generate them.

const portfolioColors = {
  // Page background - rendered as a raw CSS linear-gradient, so plain hex codes work here
  background: {
    direction: 'to bottom right',
    colors: ['#330000', '#2d0000', '#2c0a0a'],
  },

  // Browser chrome tint (<meta name="theme-color">)
  themeColor: '#dc2626',

  // Base page text color
  text: {
    base: 'text-gray-100',    // outer page wrapper
    body: 'text-gray-400',    // paragraph copy
    bodyLight: 'text-gray-300', // brighter body text (now-items, tooltip, link default state)
    white: 'text-white',
    hoverWhite: 'hover:text-white',
  },

  // Top nav pill
  nav: {
    bg: 'bg-red-900/40',
    border: 'border-red-700/50',
    text: 'text-white',
    activeBg: 'bg-white/20',
    indicator: 'bg-white',
    indicatorShadow: '0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(255,255,255,0.4)',
    iconHover: 'hover:text-gray-300',
  },

  // Gradient used on the hero name text
  heroGradient: 'bg-gradient-to-r from-red-600 via-rose-600 to-red-500',

  // Default card surface, used for skill/project/modpack/repo cards
  card: {
    bg: 'bg-red-950/40',
    border: 'border-red-700/50',
    hoverBorder: 'hover:border-red-500/60',
    hoverShadow: 'hover:shadow-[0_0_30px_rgba(239,68,68,0.35)]',
  },

  // Discord presence card
  discordCard: {
    bg: 'bg-red-950/60',
    border: 'border-red-900/50',
    avatarRing: 'border-red-800',
    statusBox: 'bg-red-900/50',    // custom-status callout
    activityBox: 'bg-slate-900/50', // current-activity callout (kept neutral)
    bannerFallback: '#5865F2',      // Discord's own brand blurple, shows behind banner.png while it loads
  },

  // Discord status dot colors (mirrors Discord's own status convention,
  // intentionally not tied to the page accent color)
  status: {
    online: 'bg-green-500',
    idle: 'bg-yellow-500',
    dnd: 'bg-red-500',
    offline: 'bg-gray-500',
  },

  // Highlight treatment for the "this site" repo card
  highlight: {
    border: 'border-red-500/60',
    shadow: 'shadow-[0_0_30px_rgba(239,68,68,0.35)]',
    shadowHover: 'hover:shadow-[0_0_40px_rgba(239,68,68,0.55)]',
  },

  // Small pill badges
  badge: {
    accentBg: 'bg-red-500/20',
    accentText: 'text-red-300',
    beginnerBg: 'bg-green-500/20',
    beginnerText: 'text-green-300',
    neutralBg: 'bg-slate-600/50', // "Fork" tag
  },

  // Modpack loader/version tags - kept as distinct hues since they identify
  // different real things (mod loader vs. game version), not page theme
  tags: {
    forge: 'bg-red-500/20 text-red-300',
    fabric: 'bg-green-500/20 text-green-300',
    version: 'bg-blue-500/20 text-blue-300',
  },

  // Primary call-to-action buttons (e.g. modpack downloads)
  button: {
    gradient: 'bg-gradient-to-r from-red-600 to-rose-600',
    gradientHover: 'hover:from-red-500 hover:to-rose-500',
    text: 'text-white',
  },

  // Toggle switches (e.g. Show Forks)
  toggle: {
    track: 'bg-slate-700',
    knobBorder: 'after:border-white',
    knobBg: 'after:bg-white',
    checkedBg: 'peer-checked:bg-red-600',
  },

  footer: {
    border: 'border-slate-800',
    iconDefault: 'text-gray-400',
    iconHover: 'hover:text-white',
    youtubeHover: 'hover:text-red-500', // YouTube's own brand red
  },

  tooltip: {
    bg: 'bg-red-950',
    border: 'border-red-700/50',
    text: 'text-gray-300',
    arrow: 'border-t-slate-800',
  },

  // GitHub language-dot colors - these mirror GitHub's own Linguist colors so
  // each language stays recognizable; `default` is our fallback for unlisted
  // languages and does follow the page accent.
  languageColors: {
    JavaScript: '#f1e05a',
    TypeScript: '#3178c6',
    Python: '#3572A5',
    Java: '#b07219',
    C: '#555555',
    'C++': '#f34b7d',
    'C#': '#178600',
    Ruby: '#701516',
    Go: '#00ADD8',
    Rust: '#dea584',
    PHP: '#4F5D95',
    Swift: '#ffac45',
    Kotlin: '#A97BFF',
    Dart: '#00B4AB',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Shell: '#89e051',
    Vue: '#41b883',
    React: '#61dafb',
    Svelte: '#ff3e00',
    Lua: '#000080',
    R: '#198CE7',
    Scala: '#c22d40',
    Haskell: '#5e5086',
    Elixir: '#6e4a7e',
    Clojure: '#db5855',
    'Objective-C': '#438eff',
    Perl: '#0298c3',
    Markdown: '#083fa1',
    default: '#ef4444',
  },
};

export default portfolioColors;

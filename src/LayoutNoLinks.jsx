import React, { useState, useEffect } from 'react';
import colors from './colors';

export default function LayoutNoLinks({ title, gifSrc, children }) {
  const [messageIndex, setMessageIndex] = useState(0);

  const messages = [
    'welcome to ts',
    'Check out this new project im working on: https://arkide.site',
    'wow this is NOT an anchent website',
    'average linux user',
    'WAAAHH WAAAHH WAHHH WAAAAHHH',
    'Powered by duct tape and code that works somehow',
    'This website is open source!',
    "i also run a minecraft server, check out the website at https://arkmc.arc360hub.com",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Build background class based on gradient settings
  const backgroundClass = colors.gradient.enabled
    ? `min-h-screen ${colors.gradient.direction} ${colors.gradient.animation}`
    : `min-h-screen ${colors.bg.primary}`;

  // Inline style for gradient colors if enabled
  const backgroundStyle = colors.gradient.enabled
    ? {
        backgroundImage: `linear-gradient(to bottom right, ${colors.gradient.colors.join(', ')})`,
        backgroundSize: '400% 400%',
      }
    : {};

  return (
    <>
      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          animation: gradient 10s ease infinite;
        }
      `}</style>
      
      <div 
        className={`${backgroundClass} ${colors.text.primary} ${colors.font.family}`}
        style={backgroundStyle}
      >
        {/* Banner */}
        <div className={`border-b ${colors.border.primary} ${colors.bg.secondary} py-3 px-4 w-full`}>
          <div className="text-center">
            <div className="h-6 flex items-center justify-center">
              <span className={`${colors.text.accent} text-sm md:text-base ${colors.transition.all}`}>
                {messages[messageIndex]}
              </span>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="max-w-5xl mx-auto px-4 py-8">
          {/* Title */}
          <div className="text-center mb-8">
            <p className={`${colors.text.secondary} text-sm md:text-base`}>{title}</p>
          </div>

          {/* GIF / Image */}
          <div className={`w-full h-64 md:h-80 ${colors.bg.card} rounded flex items-center justify-center mb-8`}>
            <img src={gifSrc} alt="Header GIF" className="w-full h-full object-cover rounded" />
          </div>

          {/* Custom content */}
          <div>{children}</div>

          {/* Footer */}
          <div className={`text-center border-t ${colors.border.primary} pt-6 mt-8`}>
            <p className={`${colors.text.muted} text-xs md:text-sm mb-2`}>
              I love coding and tech & stuff :D
            </p>
            <p className={`${colors.text.subtle} text-xs md:text-sm mb-2`}>
              Website coded by me and Claude
            </p>
            <a
              href="https://github.com/arc360alt/arcswebsite"
              className={`${colors.text.accent} ${colors.text.accentHover} ${colors.transition.colors} text-xs md:text-sm`}
            >
              View source
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
import React, { useState, useEffect } from 'react';

export default function Layout({ title, gifSrc, leftLinks, middleLinks, rightLinks, children }) {
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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-mono">
      {/* Banner */}
      <div className="border-b border-slate-700 bg-slate-900/50 py-3 px-4 w-full">
        <div className="text-center">
          <div className="h-6 flex items-center justify-center">
            <span className="text-cyan-400 text-sm md:text-base transition-all duration-500">
              {messages[messageIndex]}
            </span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Title */}
        <div className="text-center mb-8">
          <p className="text-slate-300 text-sm md:text-base">{title}</p>
        </div>

        {/* GIF / Image */}
        <div className="w-full h-64 md:h-80 bg-slate-900/20 rounded flex items-center justify-center mb-8">
          <img src={gifSrc} alt="Header GIF" className="w-full h-full object-cover rounded" />
        </div>

        {/* Links box (optional, can be empty arrays) */}
        { (leftLinks || middleLinks || rightLinks) && (
          <div className="border border-slate-700 bg-slate-900/30 p-4 mb-8 rounded w-full max-w-full">
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              {/* Left column */}
              <div className="space-y-1 flex-1 sm:border-r border-slate-700 pr-4">
                {leftLinks?.map((link, i) => (
                  <a
                    key={i}
                    href={link.href}
                    className="block text-slate-400 hover:text-cyan-400 transition-colors text-sm md:text-base"
                  >
                    <span className="text-cyan-600">→</span> {link.label}
                  </a>
                ))}
              </div>

              {/* Middle column */}
              <div className="space-y-1 flex-1 sm:border-r border-slate-700 px-4">
                {middleLinks?.map((link, i) => (
                  <a
                    key={i}
                    href={link.href}
                    className="block text-slate-400 hover:text-cyan-400 transition-colors text-sm md:text-base"
                  >
                    <span className="text-cyan-600">→</span> {link.label}
                  </a>
                ))}
              </div>

              {/* Right column */}
              <div className="space-y-1 flex-1 pl-4">
                {rightLinks?.map((link, i) => (
                  <a
                    key={i}
                    href={link.href}
                    className="block text-slate-400 hover:text-cyan-400 transition-colors text-sm md:text-base"
                  >
                    <span className="text-cyan-600">→</span> {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Custom content */}
        {children}

        {/* Footer */}
        <div className="text-center border-t border-slate-700 pt-6">
          <p className="text-slate-500 text-xs md:text-sm mb-2">
            I love coding and tech & stuff :D
          </p>
          <p className="text-slate-600 text-xs md:text-sm mb-2">
            Website coded by me and Claude
          </p>
          <a
            href="https://github.com/arc360alt/arcswebsite"
            className="text-cyan-400 hover:text-cyan-300 transition-colors text-xs md:text-sm"
          >
            View source
          </a>
        </div>
      </div>
    </div>
  );
}

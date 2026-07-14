import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, Home } from 'lucide-react';
import colors from './colors';

export function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}

export function RotatingBanner() {
  const [index, setIndex] = useState(0);
  const messages = [
    'welcome to ts',
    'check out my project Pronouns.sbs to express yourself',
    'wow this is NOT an anchent website',
    'average linux user',
    'WAAAHH WAAAHH WAHHH WAAAAHHH',
    'Powered by duct tape and code that works somehow',
    'This website is open source!',
    "i also run a minecraft modpack website, check it out here: https://optiark.arc360hub.com",
    'i am feeling chrismasy'
  ];

  useEffect(() => {
    const id = setInterval(() => setIndex(i => (i + 1) % messages.length), 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 border-b ${colors.border.primary} ${colors.bg.banner} backdrop-blur-sm py-2`}>
      <p className={`text-center ${colors.text.accent} text-xs md:text-sm px-4 truncate`}>
        {messages[index]}
      </p>
    </div>
  );
}

export function LinkCard({ title, icon: Icon, links, delay = 0, gradient = '' }) {
  const [ref, inView] = useInView();

  return (
    <div
      ref={ref}
      className={`${colors.bg.card} backdrop-blur-sm border ${colors.border.primary} rounded-xl p-5 ${colors.border.accentHover} ${colors.transition.colors} duration-300 ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-2.5 mb-4">
        <div className={`p-2 rounded-lg ${gradient}`}>
          <Icon className="w-4 h-4 text-white" />
        </div>
        <h3 className={`${colors.text.secondary} font-semibold text-sm`}>{title}</h3>
      </div>
      <div className="space-y-1.5">
        {links.map((link, i) => (
          <a
            key={i}
            href={link.href}
            target={link.href.startsWith('http') ? '_blank' : undefined}
            rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className={`group flex items-center justify-between ${colors.text.tertiary} ${colors.text.accentHover} ${colors.transition.colors} py-1 text-sm`}
          >
            <span>{link.label}</span>
            <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
          </a>
        ))}
      </div>
    </div>
  );
}

export function PageHero({ icon: Icon, title, subtitle }) {
  return (
    <section className="pt-16 pb-6 text-center px-4">
      <div className="animate-fade-in">
        {Icon && (
          <div className={`p-3 ${colors.bg.well} rounded-full w-fit mx-auto mb-4 border ${colors.border.primary}`}>
            <Icon className={`w-6 h-6 ${colors.text.accent}`} />
          </div>
        )}
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          <span className={`${colors.heroGradient} bg-clip-text text-transparent`}>
            {title}
          </span>
        </h1>
        {subtitle && <p className={`${colors.text.tertiary} text-sm md:text-base`}>{subtitle}</p>}
      </div>
    </section>
  );
}

export function BackButton() {
  return (
    <div className="text-center mb-16">
      <a href="/"
        className={`inline-flex items-center gap-2 px-5 py-2.5 ${colors.bg.well} border ${colors.border.primary} rounded-full ${colors.text.tertiary} ${colors.text.accentHover} ${colors.border.accentHover} ${colors.transition.colors} duration-200 text-sm`}>
        <Home className="w-4 h-4" />
        Back to Home
      </a>
    </div>
  );
}

export function PageShell({ children }) {
  return (
    <div
      className={`min-h-screen ${colors.gradient.direction} ${colors.gradient.animation} ${colors.text.primary} ${colors.font.family}`}
      style={{
        backgroundImage: `linear-gradient(to bottom right, ${colors.gradient.colors.join(', ')})`,
        backgroundSize: '400% 400%',
      }}
    >
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute -top-40 -right-40 w-[30rem] h-[30rem] ${colors.blobs.primary} rounded-full blur-[120px]`} />
        <div className={`absolute -bottom-40 -left-40 w-[35rem] h-[35rem] ${colors.blobs.secondary} rounded-full blur-[120px]`} />
      </div>
      <main className="relative z-10 pt-16">
        {children}
      </main>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className={`text-center border-t ${colors.border.primary} pt-8 pb-6 px-4`}>
      <p className={`${colors.text.muted} text-xs mb-1`}>I love coding and tech & stuff :D</p>
      <a href="https://github.com/arc360alt/arcswebsite"
        className={`${colors.text.accent} ${colors.text.accentHover} ${colors.transition.colors} text-xs`}>View source</a>
      <p className={`${colors.text.subtle} text-xs mt-4`}>&copy;2020-2026 Nyx Studios</p>
    </footer>
  );
}

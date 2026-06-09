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
    <div className="fixed top-0 left-0 right-0 z-50 border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-sm py-2">
      <p className="text-center text-cyan-400 text-xs md:text-sm px-4 truncate">
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
      className={`bg-slate-900/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-5 hover:border-cyan-500/30 transition-colors duration-300 ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-2.5 mb-4">
        <div className={`p-2 rounded-lg ${gradient}`}>
          <Icon className="w-4 h-4 text-white" />
        </div>
        <h3 className="text-slate-200 font-semibold text-sm">{title}</h3>
      </div>
      <div className="space-y-1.5">
        {links.map((link, i) => (
          <a
            key={i}
            href={link.href}
            target={link.href.startsWith('http') ? '_blank' : undefined}
            rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="group flex items-center justify-between text-slate-400 hover:text-cyan-300 transition-colors py-1 text-sm"
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
          <div className="p-3 bg-slate-800/50 rounded-full w-fit mx-auto mb-4 border border-slate-700/50">
            <Icon className="w-6 h-6 text-cyan-400" />
          </div>
        )}
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            {title}
          </span>
        </h1>
        {subtitle && <p className="text-slate-400 text-sm md:text-base">{subtitle}</p>}
      </div>
    </section>
  );
}

export function BackButton() {
  return (
    <div className="text-center mb-16">
      <a href="/"
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-full text-slate-400 hover:text-cyan-300 hover:border-cyan-500/30 transition-colors duration-200 text-sm">
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
        <div className="absolute -top-40 -right-40 w-[30rem] h-[30rem] bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 w-[35rem] h-[35rem] bg-purple-500/10 rounded-full blur-[120px]" />
      </div>
      <main className="relative z-10 pt-16">
        {children}
      </main>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="text-center border-t border-slate-800/50 pt-8 pb-6 px-4">
      <p className="text-slate-500 text-xs mb-1">I love coding and tech & stuff :D</p>
      <a href="https://github.com/arc360alt/arcswebsite"
        className="text-cyan-400 hover:text-cyan-300 transition-colors text-xs">View source</a>
      <p className="text-slate-600 text-xs mt-4">&copy;2020-2026 Ark360 Studios</p>
    </footer>
  );
}

import React, { useEffect, useState, useCallback } from 'react';
import { Sparkles, X } from 'lucide-react';
import colors from './colors';
import { RotatingBanner, PageShell, SiteFooter, PageHero, BackButton, useInView } from './shared';

const renderImages = [
  { src: '/renders/choice1.png', alt: 'Render 1' },
  { src: '/renders/choice2.png', alt: 'Render 2' },
  { src: '/renders/kitty.png', alt: 'Kitty render' },
  { src: '/renders/kittydarkandmistirious.png', alt: 'Dark kitty render' },
  { src: '/renders/mc char.png', alt: 'Minecraft character render' },
  { src: '/renders/Untitled.png', alt: 'Untitled render' },
  { src: '/renders/1440render.png', alt: 'Protogen Guy Render' },
];

function Lightbox({ src, alt, onClose }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md cursor-pointer"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 bg-slate-800/80 rounded-full text-slate-400 hover:text-white transition-colors z-10"
      >
        <X className="w-5 h-5" />
      </button>
      <img
        src={src}
        alt={alt}
        className="max-w-[92vw] max-h-[90vh] object-contain rounded-lg"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}

function RenderImage({ src, alt, delay, onClick }) {
  const [ref, inView] = useInView();

  return (
    <div
      ref={ref}
      onClick={onClick}
      className={`${colors.bg.card} backdrop-blur-sm border ${colors.border.primary} rounded-xl overflow-hidden ${colors.border.accentHover} ${colors.transition.colors} duration-300 cursor-pointer group ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-48 md:h-64 object-cover transition-transform duration-500 group-hover:scale-[1.02]"
      />
    </div>
  );
}

export default function Renders() {
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <RotatingBanner />
      <PageShell>
        <PageHero icon={Sparkles} title="Renders" subtitle="Some cool renders I made in blender" />

        <section className="max-w-5xl mx-auto px-4 mb-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {renderImages.map((img, i) => (
              <RenderImage
                key={i}
                src={img.src}
                alt={img.alt}
                delay={i * 100}
                onClick={() => setLightbox({ src: img.src, alt: img.alt })}
              />
            ))}
          </div>
        </section>

        {lightbox && (
          <Lightbox
            src={lightbox.src}
            alt={lightbox.alt}
            onClose={() => setLightbox(null)}
          />
        )}

        <BackButton />
        <SiteFooter />
      </PageShell>
    </>
  );
}

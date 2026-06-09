import React, { useEffect } from 'react';
import { Map, Sparkles } from 'lucide-react';
import { RotatingBanner, PageShell, SiteFooter, PageHero, BackButton } from './shared';

export default function Sitemap() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <RotatingBanner />
      <PageShell>
        <PageHero icon={Sparkles} title="Sitemap" subtitle="all pages on this site" />

        <section className="max-w-lg mx-auto px-4 mb-16">
          <div className="bg-slate-900/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 text-center hover:border-cyan-500/30 transition-all duration-300">
            <Map className="w-8 h-8 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-500 text-sm">Unfinished</p>
          </div>
        </section>

        <BackButton />
        <SiteFooter />
      </PageShell>
    </>
  );
}

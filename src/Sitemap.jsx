import React, { useEffect } from 'react';
import { Map, Sparkles } from 'lucide-react';
import colors from './colors';
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
          <div className={`${colors.bg.card} backdrop-blur-sm border ${colors.border.primary} rounded-xl p-6 text-center ${colors.border.accentHover} ${colors.transition.all} duration-300`}>
            <Map className={`w-8 h-8 ${colors.text.subtle} mx-auto mb-3`} />
            <p className={`${colors.text.muted} text-sm`}>Unfinished</p>
          </div>
        </section>

        <BackButton />
        <SiteFooter />
      </PageShell>
    </>
  );
}

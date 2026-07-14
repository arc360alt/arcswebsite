import React, { useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import colors from './colors';
import { RotatingBanner, PageShell, SiteFooter, PageHero, BackButton, useInView } from './shared';

function LanyardCard() {
  const [ref, inView] = useInView();

  return (
    <div
      ref={ref}
      className={`${colors.bg.card} backdrop-blur-sm border ${colors.border.primary} rounded-xl overflow-hidden ${colors.border.accentHover} ${colors.transition.colors} duration-300 ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}
    >
      <iframe
        src="https://lanyard.cnrad.dev/api/719973177954140210"
        title="Discord Presence"
        width="100%"
        height="240"
        scrolling="no"
        frameBorder="0"
        className="w-full"
      />
    </div>
  );
}

export default function WhatImDoing() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <RotatingBanner />
      <PageShell>
        <PageHero icon={Sparkles} title="What I'm Doing" subtitle="my current activity status" />

        <section className="max-w-lg mx-auto px-4 mb-16">
          <LanyardCard />
        </section>

        <BackButton />
        <SiteFooter />
      </PageShell>
    </>
  );
}

import React, { useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { RotatingBanner, PageShell, SiteFooter, PageHero, BackButton, useInView } from './shared';

function LanyardCard() {
  const [ref, inView] = useInView();

  return (
    <div
      ref={ref}
      className={`bg-slate-900/40 backdrop-blur-sm border border-slate-700/50 rounded-xl overflow-hidden hover:border-cyan-500/30 transition-colors duration-300 ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}
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

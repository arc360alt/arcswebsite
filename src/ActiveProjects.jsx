import React, { useEffect } from 'react';
import { Code, Sparkles } from 'lucide-react';
import { RotatingBanner, PageShell, SiteFooter, LinkCard, PageHero, BackButton } from './shared';

export default function ActiveProjects() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const leftLinks = [
    { label: 'SyntaxAI', href: 'https://github.com/arc360alt/syntaxai-app' },
    { label: 'Pronouns.sbs Source', href: 'https://github.com/arc360alt/pronouns' },
  ];

  const middleLinks = [
    { label: 'Vertex Linux (Orginisation)', href: 'https://github.com/Vertex-Linux' },
    { label: 'OptiArk (Modpack Source)', href: 'https://github.com/arc360alt/OptiArk-New' },
    { label: 'OptiArk (Website)', href: 'https://github.com/arc360alt/oa-web-new' },
    { label: 'ArcsWebsite (This Website)', href: 'https://github.com/arc360alt/arcswebsite' },
  ];

  const rightLinks = [
    { label: 'ArkIDE (Project Archived Indefiniatly)', href: 'https://github.com/arc360alt/arkide-new' },
    { label: 'ArkRinth (Broken)', href: 'https://github.com/arc360alt/ArkRinthTesting' },
  ];

  return (
    <>
      <RotatingBanner />
      <PageShell>
        <PageHero icon={Sparkles} title="Active Projects" subtitle="what I'm currently working on" />

        <section className="max-w-4xl mx-auto px-4 mb-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <LinkCard title="Repos" icon={Code} links={leftLinks} delay={100}
              gradient="bg-gradient-to-br from-cyan-500/20 to-blue-500/20" />
            <LinkCard title="In Development" icon={Code} links={middleLinks} delay={200}
              gradient="bg-gradient-to-br from-purple-500/20 to-pink-500/20" />
            <LinkCard title="Archived" icon={Code} links={rightLinks} delay={300}
              gradient="bg-gradient-to-br from-amber-500/20 to-orange-500/20" />
          </div>
        </section>

        <BackButton />
        <SiteFooter />
      </PageShell>
    </>
  );
}

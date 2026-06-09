import React, { useEffect } from 'react';
import { Puzzle, Code, Globe, Sparkles } from 'lucide-react';
import { RotatingBanner, PageShell, SiteFooter, LinkCard, PageHero, BackButton } from './shared';

export default function MoreLinks() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toolsLinks = [
    { label: 'Custom Search Engine', href: 'https://search.arc360hub.com' },
    { label: 'Video Destroyer', href: 'https://ohgodwhat.arc360hub.com' },
    { label: 'StormView', href: 'https://weather.arc360hub.com' },
  ];

  const projectsLinks = [
    { label: 'Sorting Algorithms', href: 'https://sortingapp.arc360hub.com/' },
    { label: 'WebXash', href: 'https://webhl.arc360hub.com/' },
    { label: 'Cool Gradient Blobs', href: '/blob/index.html' },
  ];

  const browseLinks = [
    { label: 'A Notes App', href: 'https://anotesapp.arc360hub.com/' },
    { label: 'Earth Guesser', href: 'https://earthguesser.arc360hub.com/' },
    { label: 'Vertex Linux', href: 'https://vertex.arc360hub.com/' },
  ];

  return (
    <>
      <RotatingBanner />
      <PageShell>
        <PageHero icon={Sparkles} title="More Links" subtitle="everything else in one place" />

        <section className="max-w-4xl mx-auto px-4 mb-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <LinkCard title="Tools & Fun" icon={Puzzle} links={toolsLinks} delay={100}
              gradient="bg-gradient-to-br from-cyan-500/20 to-blue-500/20" />
            <LinkCard title="Projects" icon={Code} links={projectsLinks} delay={200}
              gradient="bg-gradient-to-br from-purple-500/20 to-pink-500/20" />
            <LinkCard title="Browse" icon={Globe} links={browseLinks} delay={300}
              gradient="bg-gradient-to-br from-amber-500/20 to-orange-500/20" />
          </div>
        </section>

        <BackButton />
        <SiteFooter />
      </PageShell>
    </>
  );
}

import React, { useEffect } from 'react';
import { User, Monitor, Sparkles } from 'lucide-react';
import colors from './colors';
import { RotatingBanner, PageShell, SiteFooter, PageHero, BackButton, useInView } from './shared';

function SpecCard({ label, value, delay = 0 }) {
  const [ref, inView] = useInView();

  return (
    <div
      ref={ref}
      className={`${colors.bg.card} backdrop-blur-sm border ${colors.border.primary} rounded-xl p-4 ${colors.border.accentHover} ${colors.transition.colors} duration-300 ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <p className={`${colors.text.muted} text-xs mb-1`}>{label}</p>
      <p className={`${colors.text.primary} text-sm font-medium`}>{value}</p>
    </div>
  );
}

export default function LearnAboutMe() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const specs = [
    { label: 'Computer', value: 'Ryzen 7 5700G | RX 7600 8GB OC | 32GB DDR4 | 1TB NVMe SSD' },
    { label: 'Monitor', value: 'Samsung oddesy G9 Oled' },
    { label: 'Camera', value: 'Ankerworks powerconf c200' },
    { label: 'Keyboard', value: 'Redragon Antonium Pro 108' },
    { label: 'Mouse', value: 'Logitech G pro' },
    { label: 'Speakers', value: 'Creative Pebble X Plus' },
    { label: 'Headphones', value: 'Skullcandy ANC 2' },
    { label: 'Main OS', value: 'Arch Linux / Vertex Linux' },
  ];

  return (
    <>
      <RotatingBanner />
      <PageShell>
        <PageHero icon={Sparkles} title="About Me" subtitle="get to know me a bit" />

        <section className="max-w-3xl mx-auto px-4 mb-8">
          <div className={`${colors.bg.card} backdrop-blur-sm border ${colors.border.primary} rounded-xl p-6 ${colors.border.accentHover} ${colors.transition.colors} duration-300`}>
            <div className="flex items-center gap-2.5 mb-4">
              <div className={`p-2 rounded-lg ${colors.accents[0]}`}>
                <User className="w-4 h-4 text-white" />
              </div>
              <h2 className={`${colors.text.secondary} font-semibold text-sm`}>Who I am</h2>
            </div>
            <p className={`${colors.text.tertiary} text-sm leading-relaxed`}>
              Hello! My name is ark, or arc, or nyx, whatever you want to call me, i make gaming videos on youtube, and i code things in html, css, js, and python someitmes too and upload that stuff to my github page, I am also currently running a discord server for my firends and fans, so if you wanna join that, check out the link on the homepage, but im just a normal guy that codes stuff and makes cool things for a living, I am currently on a hiatus from youtube due to a burnout of making so much content (as of may 4th 2025) but i am planning to come back soon so you can check that out if I do, but yeah, i am arc. or ark, or nyx. Also, feel free to talk to me on discord if you have any questions or issues whith my many projects and games (or email me if you prefer that). You can also give me game and video ideas, espesaly ideas for my new game food fight that me and a friend are working on right now. I just got a decently normal life so there isnt much to write about here anymore. well anyway heres my setup specs if you want them.
            </p>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 mb-8">
          <div className="flex items-center gap-2.5 mb-4 ml-1">
            <div className={`p-2 rounded-lg ${colors.accents[1]}`}>
              <Monitor className="w-4 h-4 text-white" />
            </div>
            <h2 className={`${colors.text.secondary} font-semibold text-sm`}>My Setup</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {specs.map((spec, i) => (
              <SpecCard key={i} label={spec.label} value={spec.value} delay={i * 50} />
            ))}
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 mb-8">
          <div className={`${colors.bg.card} backdrop-blur-sm border ${colors.border.primary} rounded-xl p-6 ${colors.border.accentHover} ${colors.transition.colors} duration-300`}>
            <p className={`${colors.text.tertiary} text-sm leading-relaxed`}>
              I also own 3 rasbperry pi's, 2 being rpi5's and one being an rpi3b+ if you wanted to know that for some reason, one of them is NOT running an mc server anymore. I also now have a lattepanda 3 delta wich is pretty cool! But yeah thats basicly it, if you want a setup like mine just drop over 4000 dollars to get it ig (i did not need this expensive of a setup for what im doing😭😭)
            </p>
          </div>
        </section>

        <BackButton />
        <SiteFooter />
      </PageShell>
    </>
  );
}

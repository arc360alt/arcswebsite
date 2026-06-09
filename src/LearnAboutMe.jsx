import React, { useEffect } from 'react';
import { User, Monitor, Sparkles } from 'lucide-react';
import { RotatingBanner, PageShell, SiteFooter, PageHero, BackButton, useInView } from './shared';

function SpecCard({ label, value, delay = 0 }) {
  const [ref, inView] = useInView();

  return (
    <div
      ref={ref}
      className={`bg-slate-900/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 hover:border-cyan-500/30 transition-colors duration-300 ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <p className="text-slate-500 text-xs mb-1">{label}</p>
      <p className="text-slate-100 text-sm font-medium">{value}</p>
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
          <div className="bg-slate-900/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:border-cyan-500/30 transition-colors duration-300">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20">
                <User className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-slate-200 font-semibold text-sm">Who I am</h2>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Hello! My name is ark, or arc, or arc360, whatever you want to call me, i make gaming videos on youtube, and i code things in html, css, js, and python someitmes too and upload that stuff to my github page, I am also currently running a discord server for my firends and fans, so if you wanna join that, check out the link on the homepage, but im just a normal guy that codes stuff and makes cool things for a living, I am currently on a hiatus from youtube due to a burnout of making so much content (as of may 4th 2025) but i am planning to come back soon so you can check that out if I do, but yeah, i am arc. or ark, or arc360. Also, feel free to talk to me on discord if you have any questions or issues whith my many projects and games (or email me if you prefer that). You can also give me game and video ideas, espesaly ideas for my new game food fight that me and a friend are working on right now. I just got a decently normal life so there isnt much to write about here anymore. well anyway heres my setup specs if you want them.
            </p>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 mb-8">
          <div className="flex items-center gap-2.5 mb-4 ml-1">
            <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20">
              <Monitor className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-slate-200 font-semibold text-sm">My Setup</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {specs.map((spec, i) => (
              <SpecCard key={i} label={spec.label} value={spec.value} delay={i * 50} />
            ))}
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 mb-8">
          <div className="bg-slate-900/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:border-cyan-500/30 transition-colors duration-300">
            <p className="text-slate-400 text-sm leading-relaxed">
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

import React, { useState, useEffect, useRef } from 'react';
import {
  Github, Youtube, MessageCircle, ExternalLink,
  Code, User, Map, Link2, Gamepad2
} from 'lucide-react';
import colors from './colors';

function useInView(threshold = 0.1) {
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

function RotatingBanner() {
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
    'new new website'
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

function StatCard({ icon: Icon, label, value, delay = 0, href }) {
  const [ref, inView] = useInView();
  const Wrapper = href ? 'a' : 'div';

  return (
    <Wrapper
      ref={ref}
      href={href}
      target={href ? '_blank' : undefined}
      rel={href ? 'noopener noreferrer' : undefined}
      className={`bg-slate-900/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 hover:border-cyan-500/30 hover:bg-slate-900/60 transition-colors duration-300 opacity-0 ${inView ? 'animate-fade-in-up' : ''}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-3">
        <div className="p-2 bg-cyan-500/10 rounded-lg flex-shrink-0">
          <Icon className="w-4 h-4 text-cyan-400" />
        </div>
        <div className="min-w-0">
          <p className="text-slate-500 text-xs">{label}</p>
          <p className="text-slate-100 text-sm font-semibold truncate">{value ?? '...'}</p>
        </div>
      </div>
    </Wrapper>
  );
}

function LinkCard({ title, icon: Icon, links, delay = 0, gradient = '' }) {
  const [ref, inView] = useInView();

  return (
    <div
      ref={ref}
      className={`bg-slate-900/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-5 hover:border-cyan-500/30 transition-colors duration-300 opacity-0 ${inView ? 'animate-fade-in-up' : ''}`}
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

function PresenceCard({ data, bannerSrc }) {
  const [ref, inView] = useInView();

  const statusColor = !data ? 'bg-gray-500' :
    data.discord_status === 'online' ? 'bg-green-500' :
    data.discord_status === 'idle' ? 'bg-yellow-500' :
    data.discord_status === 'dnd' ? 'bg-red-500' : 'bg-gray-500';

  const customStatus = data?.activities?.find(a => a.type === 4)?.state;
  const activities = data?.activities?.filter(a => a.type !== 4) || [];

  return (
    <div
      ref={ref}
      className={`bg-slate-900/40 backdrop-blur-sm border border-slate-700/50 rounded-xl overflow-hidden hover:border-cyan-500/30 transition-colors duration-300 opacity-0 ${inView ? 'animate-fade-in-up' : ''}`}
    >
      {bannerSrc ? (
        <div className="h-15 overflow-hidden">
          <img src={bannerSrc} alt="" className="w-full h-full object-cover" />
        </div>
      ) : (
        <div className="h-14 bg-gradient-to-r from-cyan-600/20 via-blue-600/20 to-purple-600/20" />
      )}
      <div className="p-4 -mt-7">
        <div className="flex items-end gap-3 mb-3">
          <div className="relative flex-shrink-0">
            <img
              src={data?.discord_user?.avatar
                ? `https://cdn.discordapp.com/avatars/${data.discord_user.id}/${data.discord_user.avatar}.${data.discord_user.avatar.startsWith('a_') ? 'gif' : 'png'}?size=64`
                : 'https://cdn.discordapp.com/embed/avatars/0.png'
              }
              alt="" className="w-12 h-12 rounded-full border-2 border-slate-800" />
            <div className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-slate-800 ${statusColor}`} />
          </div>
          <div className="pb-0.5 min-w-0">
            <p className="text-slate-100 font-semibold text-sm truncate">
              {data?.discord_user?.global_name || data?.discord_user?.username || 'Ark'}
            </p>
            <p className="text-slate-500 text-xs">@{data?.discord_user?.username || 'arc360'}</p>
          </div>
        </div>

        {customStatus && (
          <div className="mb-2 bg-slate-800/50 rounded-lg p-2.5">
            <p className="text-slate-400 text-xs italic">{customStatus}</p>
          </div>
        )}

        {activities.slice(0, 1).map((a, i) => (
          <div key={i} className="bg-slate-800/30 rounded-lg p-2.5 flex items-start gap-2.5">
            {(a.type === 2 && a.assets?.large_image) ? (
              <img src={`https://i.scdn.co/image/${a.assets.large_image.replace('spotify:', '')}`}
                alt="" className="w-9 h-9 rounded flex-shrink-0" />
            ) : (a.type === 0 && a.assets?.large_image) ? (
              <img src={`https://cdn.discordapp.com/app-assets/${a.application_id}/${a.assets.large_image}.png`}
                alt="" className="w-9 h-9 rounded flex-shrink-0" />
            ) : null}
            <div className="min-w-0">
              <p className="text-slate-500 text-xs">
                {a.type === 0 ? 'Playing' : a.type === 2 ? 'Listening' : a.type === 1 ? 'Streaming' : 'Watching'}
              </p>
              <p className="text-slate-200 text-sm font-medium truncate">{a.name}</p>
              {a.details && <p className="text-slate-400 text-xs truncate">{a.details}</p>}
            </div>
          </div>
        ))}

        {!data && (
          <div className="text-center py-4">
            <div className="w-5 h-5 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin mx-auto" />
          </div>
        )}
      </div>
    </div>
  );
}

const discordBanner = 'https://cdn.discordapp.com/banners/719973177954140210/7f73a8f4ea069e555dcb77aa748b62a8.png?size=300';

export default function Homepage() {
  const [discord, setDiscord] = useState(null);
  const [github, setGitHub] = useState(null);

  useEffect(() => {
    fetch('https://api.lanyard.rest/v1/users/719973177954140210')
      .then(r => r.json())
      .then(d => setDiscord(d.data))
      .catch(() => {});

    fetch('https://api.github.com/users/arc360alt')
      .then(r => r.json())
      .then(d => setGitHub(d))
      .catch(() => {});
  }, []);

  const socialLinks = [
    { label: 'YouTube', href: 'https://youtube.com/@arc360' },
    { label: 'GitHub', href: 'https://github.com/arc360alt' },
    { label: 'TikTok', href: 'https://www.tiktok.com/@arc360yt' },
    { label: 'Discord Server', href: 'https://discord.gg/TRMPdA8acF' },
  ];

  const projectLinks = [
    { label: 'OptiArk', href: 'https://optiark.arc360hub.com/' },
    { label: 'Pronouns', href: 'https://pronouns.sbs/@ark' },
    { label: 'Fastfetch Generator', href: 'https://arc360hub.com/fastfetch.html' },
    { label: 'Modrinth', href: 'https://modrinth.com/user/arc360' },
  ];

  const exploreLinks = [
    { label: 'About Me', href: '/#/aboutme' },
    { label: 'Active Projects', href: '/#/active' },
    { label: 'Steam', href: 'https://steamcommunity.com/id/Arc360/' },
    { label: 'More Links', href: '/#/more-links' },
  ];

  const otherLinks = [
    { label: 'Blender Renders', href: '/#/renders' },
    { label: 'Ark360 Studios', href: '/#/studio' },
    { label: 'Sitemap', href: '/#/sitemap' },
    { label: 'View Source', href: 'https://github.com/arc360alt/arcswebsite' },
  ];

  return (
    <>
      <RotatingBanner />
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
          <section className="pt-20 pb-6 text-center px-4">
            <div className="animate-fade-in">
              <div className="w-20 h-20 mx-auto mb-5 rounded-full overflow-hidden border-2 border-cyan-400/30 shadow-lg shadow-cyan-500/10">
                <img src="/pfp.png" alt="Ark" className="w-full h-full object-cover" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Hi, I'm Ark
                </span>
              </h1>
              <p className="text-slate-400 text-base md:text-lg">a protogen that codes stuff</p>
            </div>

            <div className="flex items-center justify-center gap-3 mt-8">
              {[
                { icon: Github, href: 'https://github.com/arc360alt', hover: 'hover:text-cyan-300 hover:border-cyan-500/30' },
                { icon: Youtube, href: 'https://youtube.com/@arc360', hover: 'hover:text-red-400 hover:border-red-500/30' },
                { icon: MessageCircle, href: 'https://discord.gg/TRMPdA8acF', hover: 'hover:text-indigo-400 hover:border-indigo-500/30' },
                { icon: Gamepad2, href: 'https://modrinth.com/user/arc360', hover: 'hover:text-green-400 hover:border-green-500/30' },
              ].map((item, i) => (
                <a key={i} href={item.href} target="_blank" rel="noopener noreferrer"
                  className={`p-2.5 bg-slate-800/50 rounded-full border border-slate-700/50 text-slate-400 transition-colors duration-200 ${item.hover}`}>
                  <item.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </section>

          <section className="max-w-2xl mx-auto px-4 mb-10">
            <div className="grid grid-cols-3 gap-3">
              <StatCard icon={Code} label="GitHub Repos" value={github?.public_repos} delay={100} />
              <StatCard icon={User} label="Followers" value={github?.followers} delay={200} />
              <StatCard icon={MessageCircle} label="Discord"
                value={discord?.discord_status ? discord.discord_status.charAt(0).toUpperCase() + discord.discord_status.slice(1) : '...'}
                delay={300}
                href="https://discord.gg/TRMPdA8acF"
              />
            </div>
          </section>

          <section className="max-w-md mx-auto px-4 mb-12">
            <PresenceCard data={discord} bannerSrc={discordBanner} />
          </section>

          <section className="max-w-5xl mx-auto px-4 mb-16">
            <div className="text-center mb-8">
              <p className="text-slate-500 text-xs uppercase tracking-[0.2em] font-semibold">Explore</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <LinkCard title="Social" icon={MessageCircle} links={socialLinks} delay={100}
                gradient="bg-gradient-to-br from-cyan-500/20 to-blue-500/20" />
              <LinkCard title="Projects" icon={Code} links={projectLinks} delay={200}
                gradient="bg-gradient-to-br from-purple-500/20 to-pink-500/20" />
              <LinkCard title="Explore" icon={Map} links={exploreLinks} delay={300}
                gradient="bg-gradient-to-br from-amber-500/20 to-orange-500/20" />
              <LinkCard title="Other" icon={Link2} links={otherLinks} delay={400}
                gradient="bg-gradient-to-br from-green-500/20 to-emerald-500/20" />
            </div>
          </section>

          <footer className="text-center border-t border-slate-800/50 pt-8 pb-6 px-4">
            <p className="text-slate-500 text-xs mb-1">I love coding and tech & stuff :D</p>
            <a href="https://github.com/arc360alt/arcswebsite"
              className="text-cyan-400 hover:text-cyan-300 transition-colors text-xs">View source</a>
            <p className="text-slate-600 text-xs mt-4">&copy;2020-2026 Ark360 Studios</p>
          </footer>
        </main>
      </div>
    </>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import { Github, MessageCircle, Youtube } from 'lucide-react';

const Portfolio = () => {
  const [repos, setRepos] = useState([]);
  const [showForks, setShowForks] = useState(false);
  const [discordData, setDiscordData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('about');
  const [showArkIDE, setShowArkIDE] = useState(false);
  const [arkIDERepos, setArkIDERepos] = useState([]);
  const [showYouTubeTooltip, setShowYouTubeTooltip] = useState(false);
  
  const aboutRef = useRef(null);
  const workRef = useRef(null);

const [isScrolling, setIsScrolling] = useState(false);

useEffect(() => {
    fetchGitHubRepos();
    fetchArkIDERepos();
    fetchDiscordUser();
    
    // Scroll event handler to track active section
    const handleScroll = () => {
      const aboutElement = aboutRef.current;
      const workElement = workRef.current;
      
      if (!aboutElement || !workElement) return;
      
      const scrollPosition = window.scrollY + 150;
      
      const aboutTop = aboutElement.offsetTop;
      const workTop = workElement.offsetTop;
      
      if (scrollPosition >= workTop) {
        setActiveSection('work');
      } else if (scrollPosition >= aboutTop) {
        setActiveSection('about');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Set page title
    document.title = "Ark - Portfolio";
    
    // Set meta tags for embeds
    const setMetaTag = (property, content) => {
      let element = document.querySelector(`meta[property="${property}"]`) || 
                    document.querySelector(`meta[name="${property}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        if (property.startsWith('og:') || property.startsWith('twitter:')) {
          element.setAttribute('property', property);
        } else {
          element.setAttribute('name', property);
        }
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Open Graph / Discord embeds
    setMetaTag('og:title', 'Ark - Portfolio');
    setMetaTag('og:description', "i'm a self-taught developer that just makes random things");
    setMetaTag('og:image', 'https://arc360hub.com/favicon.ico');
    setMetaTag('og:url', 'https://arc360hub.com/#/portfolio');
    setMetaTag('og:type', 'website');
    
    // Twitter Card
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', 'Ark - Portfolio');
    setMetaTag('twitter:description', "i'm a self-taught developer that just makes random things");
    setMetaTag('twitter:image', 'https://arc360hub.com/favicon.ico');
    
    // Theme color
    setMetaTag('theme-color', '#3b82f6');
  }, []);

  const fetchGitHubRepos = async () => {
    try {
      const response = await fetch('https://api.github.com/users/arc360alt/repos?sort=updated&per_page=100');
      const data = await response.json();
      setRepos(data);
    } catch (error) {
      console.error('Error fetching repos:', error);
    }
  };

  const fetchArkIDERepos = async () => {
    try {
      const response = await fetch('https://api.github.com/users/The-ArkIDE-Project/repos?sort=updated&per_page=100');
      const data = await response.json();
      setArkIDERepos(data);
    } catch (error) {
      console.error('Error fetching ArkIDE repos:', error);
    }
  };

  const fetchDiscordUser = async () => {
    try {
      const response = await fetch('https://api.lanyard.rest/v1/users/719973177954140210');
      const data = await response.json();
      setDiscordData(data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching Discord data:', error);
      setLoading(false);
    }
  };

const scrollToSection = (sectionRef, sectionName) => {
    if (sectionRef.current) {
      const offset = 100;
      const elementPosition = sectionRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const currentRepos = showArkIDE ? arkIDERepos : repos;
  const filteredRepos = showForks ? currentRepos : currentRepos.filter(repo => !repo.fork);

  return (
    
      <div className="min-h-screen text-gray-100" style={{ background: 'linear-gradient(to bottom right, #331e00ff, #2d1100ff, #2c1900ff)' }}>
    <style>
      {`
        .arkide-logo-container {
          position: relative;
          width: 20px;
          height: 20px;
        }
        .arkide-logo-base, .arkide-logo-hover {
          position: absolute;
          top: 0;
          left: 0;
          width: 20px;
          height: 20px;
        }
        .arkide-logo-hover {
          clip-path: circle(0% at center);
          transition: clip-path 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .arkide-logo-container:hover .arkide-logo-hover {
          clip-path: circle(100% at center);
        }
      `}
    </style>
      {/* Navigation Bar with Glassmorphism */}
      <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="backdrop-blur-xl bg-orange-900/40 border border-amber-700/50 rounded-full px-2 py-2 shadow-2xl relative">
          {/* White glowing indicator bar OUTSIDE at top - rounded only on top */}
          <div 
            className={`absolute -top-1 h-1 w-8 bg-white transition-all duration-300 ease-out`}
            style={{
              left: activeSection === 'about' ? '28px' : '118px',
              borderTopLeftRadius: '4px',
              borderTopRightRadius: '4px',
              borderBottomLeftRadius: '0',
              borderBottomRightRadius: '0',
              boxShadow: '0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(255,255,255,0.4)'
            }}
          />
          
          <div className="flex items-center gap-2 relative">
            <button 
              onClick={() => scrollToSection(aboutRef, 'about')}
              className={`relative z-10 px-4 py-2 text-sm font-medium transition-all rounded-full text-white ${
                activeSection === 'about' ? 'bg-white/20' : ''
              }`}
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection(workRef, 'work')}
              className={`relative z-10 px-4 py-2 text-sm font-medium transition-all rounded-full text-white ${
                activeSection === 'work' ? 'bg-white/20' : ''
              }`}
            >
              Stuff
            </button>
            <a 
              href="https://github.com/arc360alt" 
              target="_blank" 
              rel="noopener noreferrer"
              className="relative z-10 px-3 py-2 text-white hover:text-gray-300 transition-colors rounded-full flex items-center"
            >
              <Github size={18} />
            </a>
            <a 
              href="https://arkide.site" 
              target="_blank" 
              rel="noopener noreferrer"
              className="relative z-10 px-3 py-2 text-white transition-colors rounded-full flex items-center"
            >
              <div className="arkide-logo-container">
                <img src="/arkide.png" alt="ArkIDE" className="arkide-logo-base" />
                <img src="/arkide-normal.png" alt="ArkIDE" className="arkide-logo-hover" />
              </div>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div ref={aboutRef} id="about" className="pt-32 pb-16 px-8 text-center scroll-mt-24">
        <h1 className="text-5xl font-bold mb-3">
          hi! i'm <span className="bg-gradient-to-r from-orange-600 via-yellow-600 to-yellow-500 bg-clip-text text-transparent">Ark</span>
        </h1>
        <p className="text-gray-400 text-lg">a protogen that codes stuff</p>
      </div>

      {/* About Section */}
      <div className="max-w-4xl mx-auto px-8 mb-20">
        <h2 className="text-3xl font-bold mb-4">About me</h2>
        <p className="text-gray-400 leading-relaxed">
          i'm a self-taught developer that just makes random things when I'm not doing school work.
          I also work on a Penguinmod fork called ArkIDE that is basicly just my vison on a modern scratch that I have always wanted to make.
        </p>
      </div>

      {/* Tech Skills */}
      <div className="max-w-6xl mx-auto px-8 mb-20">
        <h2 className="text-3xl font-bold text-center mb-4">My Tech Skills</h2>
        <p className="text-gray-400 text-center mb-12">I probably left a few out but heres most of the languages I know</p>
        
        <div className="grid md:grid-cols-3 gap-6">
          {/* Programming Languages */}
          <div className="bg-yellow-950/40 backdrop-blur border border-amber-700/50 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4">Programming Languages</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>JavaScript</span>
                <span className="text-xs bg-orange-500/20 text-orange-300 px-3 py-1 rounded-full">Intermediate</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Python</span>
                <span className="text-xs bg-orange-500/20 text-orange-300 px-3 py-1 rounded-full">Intermediate</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Java</span>
                <span className="text-xs bg-green-500/20 text-green-300 px-3 py-1 rounded-full">Beginner</span>
              </div>
            </div>
          </div>

          {/* Frontend Technologies */}
          <div className="bg-yellow-950/40 backdrop-blur border border-amber-700/50 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4">Frontend Technologies</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>Tailwind CSS</span>
                <span className="text-xs bg-orange-500/20 text-orange-300 px-3 py-1 rounded-full">Intermediate</span>
              </div>
              <div className="flex items-center justify-between">
                <span>HTML5</span>
                <span className="text-xs bg-orange-500/20 text-orange-300 px-3 py-1 rounded-full">Intermediate</span>
              </div>
              <div className="flex items-center justify-between">
                <span>CSS3</span>
                <span className="text-xs bg-orange-500/20 text-orange-300 px-3 py-1 rounded-full">Intermediate</span>
              </div>
            </div>
          </div>

          {/* Backend Technologies */}
          <div className="bg-yellow-950/40 backdrop-blur border border-amber-700/50 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4">Backend Technologies</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>Node.js</span>
                <span className="text-xs bg-orange-500/20 text-orange-300 px-3 py-1 rounded-full">Intermediate</span>
              </div>
              <div className="flex items-center justify-between">
                <span>MongoDB</span>
                <span className="text-xs bg-green-500/20 text-green-300 px-3 py-1 rounded-full">Beginner</span>
              </div>
              <div className="flex items-center justify-between">
                <span>MySQL</span>
                <span className="text-xs bg-green-500/20 text-green-300 px-3 py-1 rounded-full">Beginner</span>
              </div>
            </div>
          </div>
        </div>
      </div>

{/* Discord Card */}
      <div className="mx-auto px-8 mb-20" style={{ maxWidth: '620px' }}>
        <div className="bg-yellow-950/60 backdrop-blur border border-slate-700/50 rounded-2xl overflow-hidden">
          {/* Discord Banner */}
          <div 
            className="h-24"
            style={{
              backgroundImage: `url(https://cdn.discordapp.com/banners/719973177954140210/${discordData?.discord_user?.banner || '71cef92b319cfba28a7c251a63653ebe'}.${discordData?.discord_user?.banner?.startsWith('a_') ? 'gif' : 'png'}?size=600)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundColor: '#5865F2'
            }}
          />
          <div className="px-6 pb-6 -mt-12">
            <div className="relative inline-block">
              <img 
                src={discordData?.discord_user?.avatar 
                  ? `https://cdn.discordapp.com/avatars/${discordData.discord_user.id}/${discordData.discord_user.avatar}.${discordData.discord_user.avatar.startsWith('a_') ? 'gif' : 'png'}?size=128`
                  : "https://cdn.discordapp.com/embed/avatars/0.png"
                }
                alt="Discord Avatar"
                className="w-24 h-24 rounded-full border-4 border-amber-800"
              />
              <div className={`absolute bottom-1 right-1 w-6 h-6 rounded-full border-4 border-amber-800 ${
                discordData?.discord_status === 'online' ? 'bg-green-500' :
                discordData?.discord_status === 'idle' ? 'bg-yellow-500' :
                discordData?.discord_status === 'dnd' ? 'bg-red-500' : 'bg-gray-500'
              }`}></div>
            </div>
            <div className="mt-4">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-xl font-bold">{discordData?.discord_user?.global_name || discordData?.discord_user?.username || 'Ark'}</h3>
                {/* Discord Badges */}
                <div className="flex gap-1">
                  {/* Nitro Badge - Manually added */}
                  <img 
                    src="https://cdn.discordapp.com/badge-icons/2ba85e8026a8614b640c2837bcdfe21b.png" 
                    alt="Nitro" 
                    className="w-5 h-5" 
                    title="Nitro Subscriber" 
                  />
                  
                  {discordData?.discord_user?.public_flags && (
                    <>
                      {/* Discord Staff */}
                      {(discordData.discord_user.public_flags & (1 << 0)) !== 0 && (
                        <img src="https://cdn.discordapp.com/badge-icons/5e74e9b61934fc1f67c65515d1f7e60d.png" alt="Discord Staff" className="w-5 h-5" title="Discord Staff" />
                      )}
                      {/* Partnered Server Owner */}
                      {(discordData.discord_user.public_flags & (1 << 1)) !== 0 && (
                        <img src="https://cdn.discordapp.com/badge-icons/3f9748e53446a137a052f3454e2de41e.png" alt="Partner" className="w-5 h-5" title="Partnered Server Owner" />
                      )}
                      {/* HypeSquad Events */}
                      {(discordData.discord_user.public_flags & (1 << 2)) !== 0 && (
                        <img src="https://cdn.discordapp.com/badge-icons/bf01d1073931f921909045f3a39fd264.png" alt="HypeSquad Events" className="w-5 h-5" title="HypeSquad Events" />
                      )}
                      {/* Bug Hunter Level 1 */}
                      {(discordData.discord_user.public_flags & (1 << 3)) !== 0 && (
                        <img src="https://cdn.discordapp.com/badge-icons/2717692c7dca7289b35297368a940dd0.png" alt="Bug Hunter" className="w-5 h-5" title="Bug Hunter Level 1" />
                      )}
                      {/* HypeSquad Bravery */}
                      {(discordData.discord_user.public_flags & (1 << 6)) !== 0 && (
                        <img src="https://cdn.discordapp.com/badge-icons/8a88d63823d8a71cd5e390baa45efa02.png" alt="HypeSquad Bravery" className="w-5 h-5" title="HypeSquad Bravery" />
                      )}
                      {/* HypeSquad Brilliance */}
                      {(discordData.discord_user.public_flags & (1 << 7)) !== 0 && (
                        <img src="https://cdn.discordapp.com/badge-icons/011940fd013da3f7fb926e4a1cd2e618.png" alt="HypeSquad Brilliance" className="w-5 h-5" title="HypeSquad Brilliance" />
                      )}
                      {/* HypeSquad Balance */}
                      {(discordData.discord_user.public_flags & (1 << 8)) !== 0 && (
                        <img src="https://cdn.discordapp.com/badge-icons/3aa41de486fa12454c3761e8e223442e.png" alt="HypeSquad Balance" className="w-5 h-5" title="HypeSquad Balance" />
                      )}
                      {/* Early Supporter */}
                      {(discordData.discord_user.public_flags & (1 << 9)) !== 0 && (
                        <img src="https://cdn.discordapp.com/badge-icons/7060786766c9c840eb3019e725d2b358.png" alt="Early Supporter" className="w-5 h-5" title="Early Supporter" />
                      )}
                      {/* Bug Hunter Level 2 */}
                      {(discordData.discord_user.public_flags & (1 << 14)) !== 0 && (
                        <img src="https://cdn.discordapp.com/badge-icons/848f79194d4be5ff5f81505cbd0ce1e6.png" alt="Bug Hunter Level 2" className="w-5 h-5" title="Bug Hunter Level 2" />
                      )}
                      {/* Verified Bot Developer */}
                      {(discordData.discord_user.public_flags & (1 << 17)) !== 0 && (
                        <img src="https://cdn.discordapp.com/badge-icons/6bdc42827a38498929a4920da12695d9.png" alt="Verified Bot Developer" className="w-5 h-5" title="Early Verified Bot Developer" />
                      )}
                      {/* Active Developer */}
                      {(discordData.discord_user.public_flags & (1 << 22)) !== 0 && (
                        <img src="https://cdn.discordapp.com/badge-icons/6df5892e0f35b051f8b61eace34f4967.png" alt="Active Developer" className="w-5 h-5" title="Active Developer" />
                      )}
                    </>
                  )}
                </div>
              </div>
              <p className="text-gray-400 text-sm">@{discordData?.discord_user?.username || 'ark'}</p>
            </div>
            
{/* Status - Only show if there's a custom status */}
            {discordData?.activities?.find(a => a.type === 4)?.state && (
              <div className="mt-4 bg-yellow-900/50 rounded-lg p-3">
                <p className="text-sm text-gray-400">Status</p>
                <p className="text-sm mt-1">
                  {discordData.activities.find(a => a.type === 4).state}
                </p>
              </div>
            )}

            {/* Current Activity - Only show if there are non-custom-status activities */}
            {discordData?.activities && discordData.activities.filter(activity => activity.type !== 4).length > 0 && (
              <div className="mt-3 bg-slate-900/50 rounded-lg p-3">
                {discordData.activities
                  .filter(activity => activity.type !== 4) // Filter out custom status
                  .map((activity, index) => (
                    <div key={index} className="mb-2 last:mb-0">
                      {activity.type === 2 && (
                        // Spotify
                        <div className="flex items-start gap-3">
                          {activity.assets?.large_image && (
                            <img 
                              src={`https://i.scdn.co/image/${activity.assets.large_image.replace('spotify:', '')}`}
                              alt="Album Art"
                              className="w-12 h-12 rounded"
                            />
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-gray-400">Listening to Spotify</p>
                            <p className="text-sm font-semibold truncate">{activity.details}</p>
                            <p className="text-xs text-gray-400 truncate">{activity.state}</p>
                          </div>
                        </div>
                      )}
                      {activity.type === 0 && (
                        // Playing a game
                        <div className="flex items-start gap-3">
                          {activity.assets?.large_image && (
                            <img 
                              src={activity.assets.large_image.startsWith('mp:') 
                                ? `https://media.discordapp.net/${activity.assets.large_image.replace('mp:', '')}`
                                : `https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.large_image}.png`
                              }
                              alt="Game Icon"
                              className="w-12 h-12 rounded"
                            />
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-gray-400">Playing a game</p>
                            <p className="text-sm font-semibold truncate">{activity.name}</p>
                            {activity.details && <p className="text-xs text-gray-400 truncate">{activity.details}</p>}
                            {activity.state && <p className="text-xs text-gray-400 truncate">{activity.state}</p>}
                          </div>
                        </div>
                      )}
                      {activity.type === 1 && (
                        // Streaming
                        <div>
                          <p className="text-xs text-gray-400">Streaming</p>
                          <p className="text-sm font-semibold">{activity.name}</p>
                          {activity.details && <p className="text-xs text-gray-400">{activity.details}</p>}
                        </div>
                      )}
                      {activity.type === 3 && (
                        // Watching
                        <div>
                          <p className="text-xs text-gray-400">Watching</p>
                          <p className="text-sm font-semibold">{activity.name}</p>
                          {activity.details && <p className="text-xs text-gray-400">{activity.details}</p>}
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>

{/* My Stuff Section */}
      <div ref={workRef} id="work" className="max-w-6xl mx-auto px-8 mb-20 scroll-mt-24">
        <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
          <h2 className="text-3xl font-bold">My Stuff</h2>
          <div className="flex gap-6">
            <label className="flex items-center gap-3 cursor-pointer">
              <span className="text-gray-400">Show Forks</span>
              <div className="relative">
                <input
                  type="checkbox"
                  checked={showForks}
                  onChange={(e) => setShowForks(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
              </div>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <span className="text-gray-400">Show ArkIDE Repos</span>
              <div className="relative">
                <input
                  type="checkbox"
                  checked={showArkIDE}
                  onChange={(e) => setShowArkIDE(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </div>
            </label>
          </div>
        </div>

<div className="grid md:grid-cols-2 gap-4">
          {filteredRepos.map((repo) => {
            // Language color mapping
            const languageColors = {
              'JavaScript': '#f1e05a',
              'TypeScript': '#3178c6',
              'Python': '#3572A5',
              'Java': '#b07219',
              'C': '#555555',
              'C++': '#f34b7d',
              'C#': '#178600',
              'Ruby': '#701516',
              'Go': '#00ADD8',
              'Rust': '#dea584',
              'PHP': '#4F5D95',
              'Swift': '#ffac45',
              'Kotlin': '#A97BFF',
              'Dart': '#00B4AB',
              'HTML': '#e34c26',
              'CSS': '#563d7c',
              'Shell': '#89e051',
              'Vue': '#41b883',
              'React': '#61dafb',
              'Svelte': '#ff3e00',
              'Lua': '#000080',
              'R': '#198CE7',
              'Scala': '#c22d40',
              'Haskell': '#5e5086',
              'Elixir': '#6e4a7e',
              'Clojure': '#db5855',
              'Objective-C': '#438eff',
              'Perl': '#0298c3',
              'Markdown': '#083fa1',
            };
            
            const languageColor = repo.language ? (languageColors[repo.language] || '#3b82f6') : '#3b82f6';
            const isCurrentSite = repo.name.toLowerCase() === 'arcswebsite';
            
            return (
              <a 
                key={repo.id} 
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className={`bg-yellow-950/40 backdrop-blur border rounded-xl p-6 hover:scale-[1.02] transition-all duration-300 block ${
                  isCurrentSite 
                    ? 'border-orange-500/60 shadow-[0_0_30px_rgba(249,115,22,0.35)] hover:shadow-[0_0_40px_rgba(249,115,22,0.55)]' 
                    : 'border-amber-700/50 hover:border-orange-500/60 hover:shadow-[0_0_30px_rgba(249,115,22,0.35)]'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Github size={20} />
                    {repo.name}
                    {isCurrentSite && (
                      <span className="text-xs bg-orange-500/20 text-orange-300 px-2 py-1 rounded-full">Current Site</span>
                    )}
                  </h3>
                  {repo.fork && (
                    <span className="text-xs bg-slate-600/50 px-2 py-1 rounded">Fork</span>
                  )}
                </div>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {repo.description || 'No description available'}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    ⭐ {repo.stargazers_count}
                  </span>
                  <span className="flex items-center gap-1">
                    🔀 {repo.forks_count}
                  </span>
                  {repo.language && (
                    <span className="flex items-center gap-1">
                      <span 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: languageColor }}
                      ></span>
                      {repo.language}
                    </span>
                  )}
                </div>
              </a>
            );
          })}
        </div>
      </div>

      {/* Minecraft Packs Section */}
      <div className="max-w-6xl mx-auto px-8 mb-20">
        <h2 className="text-3xl font-bold mb-4 text-center">Personal Minecraft Packs</h2>
        <p className="text-gray-400 text-center mb-12">some random modpacks ive made for minecraft that i am sharing becuase i can</p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Modpack 1 */}
          <div className="bg-yellow-950/40 backdrop-blur border border-amber-700/50 rounded-xl p-6 hover:border-orange-500/60 transition-all duration-300">
            <div className="mb-4">
              <h3 className="text-xl font-bold mb-2">Old Gaming</h3>
              <div className="flex gap-2 mb-3">
                <span className="text-xs bg-red-500/20 text-red-300 px-2 py-1 rounded-full">Forge</span>
                <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full">1.7.10</span>
              </div>
              <p className="text-gray-400 text-sm">
                A modpack based on 1.7.10 with a bunch of classic mods.
              </p>
            </div>
            <button 
              onClick={() => {
                window.open('https://drive.google.com/file/d/1kimB7Rg0O8lHekDSJiZQMpqXWWxWoK4r/view?usp=sharing', '_blank');
              }}
              className="w-full bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-500 hover:to-yellow-500 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download Pack
            </button>
          </div>

          {/* Modpack 2 */}
          <div className="bg-yellow-950/40 backdrop-blur border border-amber-700/50 rounded-xl p-6 hover:border-orange-500/60 transition-all duration-300">
            <div className="mb-4">
              <h3 className="text-xl font-bold mb-2">Create Pack</h3>
              <div className="flex gap-2 mb-3">
                <span className="text-xs bg-red-500/20 text-red-300 px-2 py-1 rounded-full">Forge</span>
                <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full">1.20.1</span>
              </div>
              <p className="text-gray-400 text-sm">
                Just a normal create pack that I made for survival fun I guess.
              </p>
            </div>
            <button 
              onClick={() => {
                window.open('https://drive.google.com/file/d/1u7lTEJmbwpGQo_0xvlmkO6nBQbNQ8Cjv/view?usp=sharing', '_blank');
              }}
              className="w-full bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-500 hover:to-yellow-500 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download Pack
            </button>
          </div>

          {/* Modpack 3 */}
          <div className="bg-yellow-950/40 backdrop-blur border border-amber-700/50 rounded-xl p-6 hover:border-orange-500/60 transition-all duration-300">
            <div className="mb-4">
              <h3 className="text-xl font-bold mb-2">Person-al modpack</h3>
              <div className="flex gap-2 mb-3">
                <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded-full">Fabric</span>
                <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full">1.21.11</span>
              </div>
              <p className="text-gray-400 text-sm">
                My main personal modpack with an insane amount of mods (72)
              </p>
            </div>
            <button 
              onClick={() => {
                window.open('https://drive.google.com/file/d/11zxYdA_lQ8rFgTWezVDqQOoPfPcl2D0a/view?usp=sharing', '_blank');
              }}
              className="w-full bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-500 hover:to-yellow-500 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download Pack
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8">
        <div className="max-w-6xl mx-auto px-8">
          <div className="flex justify-center items-center gap-6 mb-4">
            <a href="https://github.com/arc360alt" target="_blank" rel="noopener noreferrer" 
               className="text-gray-400 hover:text-white transition-colors">
              <Github size={24} />
            </a>
            <a href="https://discord.gg/YtZwYTBMDH" target="_blank" rel="noopener noreferrer"
               className="text-gray-400 hover:text-white transition-colors">
              <MessageCircle size={24} />
            </a>
            <div className="relative">
            <a 
                href="https://youtube.com/@arc360"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-500 transition-colors block"
                onMouseEnter={() => setShowYouTubeTooltip(true)}
                onMouseLeave={() => setShowYouTubeTooltip(false)}
            >
                <Youtube size={24} />
            </a>
            {showYouTubeTooltip && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-orange-950 border border-amber-700/50 rounded-lg text-sm text-gray-300 whitespace-nowrap">
                This channel is abandoned, I may come back to it at some point
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-800"></div>
                </div>
            )}
            </div>
          </div>
          <p className="text-center text-gray-400 text-sm">
            &copy;2020-2026 Ark360 Studios
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
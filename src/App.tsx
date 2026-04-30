/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  Gamepad2, 
  Target, 
  Trophy, 
  Clock, 
  Zap, 
  LayoutGrid,
  Search,
  Filter,
  ArrowRight,
  Maximize2,
  ExternalLink,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, useMemo } from 'react';

// Types
interface Game {
  id: string;
  title: string;
  category: 'Action' | 'Sports' | 'Casual' | 'Racing' | 'Strategy' | 'Retro';
  thumbnail: string;
  url: string;
  description: string;
  rating: number;
}

const GAMES: Game[] = [
  {
    id: 'slope',
    title: 'Slope',
    category: 'Action',
    thumbnail: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=800&auto=format&fit=crop',
    url: 'https://kbhgames.com/slope-game/embed/',
    description: 'A fast-paced 3D ball rolling game through futuristic slopes.',
    rating: 4.8
  },
  {
    id: '1v1-lol',
    title: '1v1.lol',
    category: 'Action',
    thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop',
    url: 'https://1v1.lol/',
    description: 'Competitive building and shooting game.',
    rating: 4.9
  },
  {
    id: 'tunnel-rush',
    title: 'Tunnel Rush',
    category: 'Racing',
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop',
    url: 'https://kbhgames.com/tunnel-rush/embed/',
    description: 'Navigate through a colorful 3D tunnel at high speeds.',
    rating: 4.7
  },
  {
    id: 'retro-bowl',
    title: 'Retro Bowl',
    category: 'Sports',
    thumbnail: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=800&auto=format&fit=crop',
    url: 'https://kbhgames.com/retro-bowl/embed/',
    description: 'Classic arcade-style American football management.',
    rating: 4.9
  },
  {
    id: 'cookie-clicker',
    title: 'Cookie Clicker',
    category: 'Casual',
    thumbnail: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=800&auto=format&fit=crop',
    url: 'https://orteil.dashnet.org/cookieclicker/',
    description: 'The ultimate incremental game about baking cookies.',
    rating: 4.6
  },
  {
    id: 'run-3',
    title: 'Run 3',
    category: 'Action',
    thumbnail: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=800&auto=format&fit=crop',
    url: 'https://kbhgames.com/run-3/embed/',
    description: 'Run through tunnels in outer space. Defy gravity!',
    rating: 4.8
  },
  {
    id: 'bitlife',
    title: 'BitLife',
    category: 'Casual',
    thumbnail: 'https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?q=80&w=800&auto=format&fit=crop',
    url: 'https://kbhgames.com/bitlife-life-simulator/embed/',
    description: 'How will you live your BitLife?',
    rating: 4.5
  },
  {
    id: 'ovo',
    title: 'OvO',
    category: 'Action',
    thumbnail: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?q=80&w=800&auto=format&fit=crop',
    url: 'https://kbhgames.com/ovo/embed/',
    description: 'A fast-paced platformer about parkour and speed.',
    rating: 4.7
  },
  {
    id: 'minecraft',
    title: 'Minecraft Classic',
    category: 'Casual',
    thumbnail: 'https://images.unsplash.com/photo-1587573089734-09cb69c0f2b4?q=80&w=800&auto=format&fit=crop',
    url: 'https://classic.minecraft.net/',
    description: 'The legendary block-building game in your browser.',
    rating: 4.9
  },
  {
    id: 'geometry-dash',
    title: 'Geometry Dash',
    category: 'Action',
    thumbnail: 'https://images.unsplash.com/photo-1614850523459-c2f4c699952e?q=80&w=800&auto=format&fit=crop',
    url: 'https://kbhgames.com/geometry-dash/embed/',
    description: 'Jump and fly your way through danger in this rhythm-based platformer!',
    rating: 4.8
  },
  {
    id: 'subway-surfers',
    title: 'Subway Surfers',
    category: 'Casual',
    thumbnail: 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?q=80&w=800&auto=format&fit=crop',
    url: 'https://kbhgames.com/subway-surfers/embed/',
    description: 'The world-famous endless runner is here.',
    rating: 4.7
  },
  {
    id: 'basketball-stars',
    title: 'Basketball Stars',
    category: 'Sports',
    thumbnail: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=800&auto=format&fit=crop',
    url: 'https://kbhgames.com/basketball-stars/embed/',
    description: 'Show off your skills in this competitive basketball game.',
    rating: 4.8
  },
  {
    id: 'moto-x3m',
    title: 'Moto X3M',
    category: 'Racing',
    thumbnail: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=800&auto=format&fit=crop',
    url: 'https://kbhgames.com/moto-x3m/embed/',
    description: 'Breathtaking levels with dangerous obstacles and stunts.',
    rating: 4.9
  },
  {
    id: 'paper-io-2',
    title: 'Paper.io 2',
    category: 'Strategy',
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop',
    url: 'https://paper-io.com/',
    description: 'Conquer as much territory as possible.',
    rating: 4.6
  },
  {
    id: 'friday-night-funkin',
    title: 'Friday Night Funkin',
    category: 'Retro',
    thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop',
    url: 'https://kbhgames.com/friday-night-funkin/embed/',
    description: 'A rhythm game where you battle for your girlfriends heart.',
    rating: 4.8
  },
  {
    id: 'tiny-fishing',
    title: 'Tiny Fishing',
    category: 'Casual',
    thumbnail: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=800&auto=format&fit=crop',
    url: 'https://kbhgames.com/tiny-fishing/embed/',
    description: 'Cast your line and catch as many fish as possible!',
    rating: 4.9
  },
  {
    id: 'drive-mad',
    title: 'Drive Mad',
    category: 'Racing',
    thumbnail: 'https://images.unsplash.com/photo-1594781242392-80077873831f?q=80&w=800&auto=format&fit=crop',
    url: 'https://kbhgames.com/drive-mad/embed/',
    description: 'Drive your car to the finish line without breaking it.',
    rating: 4.7
  },
  {
    id: 'monkey-mart',
    title: 'Monkey Mart',
    category: 'Casual',
    thumbnail: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=800&auto=format&fit=crop',
    url: 'https://kbhgames.com/monkey-mart/embed/',
    description: 'Run your own supermarket as a monkey!',
    rating: 4.6
  },
  {
    id: 'stickman-hook',
    title: 'Stickman Hook',
    category: 'Action',
    thumbnail: 'https://images.unsplash.com/photo-1614850523459-c2f4c699952e?q=80&w=800&auto=format&fit=crop',
    url: 'https://kbhgames.com/stickman-hook/embed/',
    description: 'Swing like a spider and reach the finish line!',
    rating: 4.7
  },
  {
    id: 'coreball',
    title: 'Coreball',
    category: 'Strategy',
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop',
    url: 'https://coreball.io/',
    description: 'The addictive ball-throwing strategy game.',
    rating: 4.8
  },
  {
    id: 'soccer-skills',
    title: 'Soccer Skills World Cup',
    category: 'Sports',
    thumbnail: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=800&auto=format&fit=crop',
    url: 'https://kbhgames.com/soccer-skills-world-cup/embed/',
    description: 'Fast-paced soccer action with your favorite teams.',
    rating: 4.7
  },
  {
    id: 'eggy-car',
    title: 'Eggy Car',
    category: 'Racing',
    thumbnail: 'https://images.unsplash.com/photo-1530906358829-e84b2769270f?q=80&w=800&auto=format&fit=crop',
    url: 'https://kbhgames.com/eggy-car/embed/',
    description: 'Drive carefully and dont break the egg!',
    rating: 4.6
  },
  {
    id: 'idle-breakout',
    title: 'Idle Breakout',
    category: 'Casual',
    thumbnail: 'https://images.unsplash.com/photo-1614850523459-c2f4c699952e?q=80&w=800&auto=format&fit=crop',
    url: 'https://kbhgames.com/idle-breakout/embed/',
    description: 'The classic breakout game with an idle twist.',
    rating: 4.6
  },
  {
    id: 'temple-run-2',
    title: 'Temple Run 2',
    category: 'Casual',
    thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop',
    url: 'https://kbhgames.com/temple-run-2/embed/',
    description: 'Navigate perilous cliffs, zip lines, and mines.',
    rating: 4.7
  },
  {
    id: 'crossy-road',
    title: 'Crossy Road',
    category: 'Casual',
    thumbnail: 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?q=80&w=800&auto=format&fit=crop',
    url: 'https://kbhgames.com/crossy-road/embed/',
    description: 'Why did the chicken cross the road?',
    rating: 4.8
  },
  {
    id: 'getting-over-it',
    title: 'Getting Over It',
    category: 'Action',
    thumbnail: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?q=80&w=800&auto=format&fit=crop',
    url: 'https://kbhgames.com/getting-over-it/embed/',
    description: 'Climb a mountain with nothing but a hammer.',
    rating: 4.2
  },
  {
    id: 'a-small-world-cup',
    title: 'A Small World Cup',
    category: 'Sports',
    thumbnail: 'https://images.unsplash.com/photo-1552667466-07770ae110d0?q=80&w=800&auto=format&fit=crop',
    url: 'https://kbhgames.com/a-small-world-cup/embed/',
    description: 'Simple soccer game with ragdoll physics.',
    rating: 4.7
  },
  {
    id: 'shell-shockers',
    title: 'Shell Shockers',
    category: 'Action',
    thumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800&auto=format&fit=crop',
    url: 'https://shellshock.io/',
    description: 'The worlds first egg-based multiplayer shooter!',
    rating: 4.9
  },
  {
    id: 'krunker',
    title: 'Krunker.io',
    category: 'Action',
    thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop',
    url: 'https://krunker.io/',
    description: 'Fast-paced pixelated first-person shooter.',
    rating: 4.8
  },
  {
    id: 'pacman',
    title: 'Pac-Man',
    category: 'Retro',
    thumbnail: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?q=80&w=800&auto=format&fit=crop',
    url: 'https://madsandov.github.io/pacman/',
    description: 'The definitive retro arcade experience.',
    rating: 4.9
  },
  {
    id: 'flappy-bird',
    title: 'Flappy Bird',
    category: 'Retro',
    thumbnail: 'https://images.unsplash.com/photo-1614850523459-c2f4c699952e?q=80&w=800&auto=format&fit=crop',
    url: 'https://kbhgames.com/flappy-bird/embed/',
    description: 'Tap to flap and avoid the pipes.',
    rating: 4.5
  },
  {
    id: 'angry-birds',
    title: 'Angry Birds',
    category: 'Casual',
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop',
    url: 'https://kbhgames.com/angry-birds-hd/embed/',
    description: 'Launch birds at the pigs to save the eggs!',
    rating: 4.8
  },
  {
    id: 'paper-io-3d',
    title: 'Paper.io 3D',
    category: 'Strategy',
    thumbnail: 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?q=80&w=800&auto=format&fit=crop',
    url: 'https://paper-io.com/3d/',
    description: 'Conquer the 3D surface in this IO sequel.',
    rating: 4.6
  },
  {
    id: 'voxel-world',
    title: 'Voxel World',
    category: 'Casual',
    thumbnail: 'https://images.unsplash.com/photo-1587573089734-09cb69c0f2b4?q=80&w=800&auto=format&fit=crop',
    url: 'https://kbhgames.com/voxel-world/embed/',
    description: 'Build and explore in this blocky open world.',
    rating: 4.7
  }
];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeGame, setActiveGame] = useState<Game | null>(null);

  const filteredGames = useMemo(() => {
    return GAMES.filter(game => {
      const matchesCategory = selectedCategory === 'All' || game.category === selectedCategory;
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const categories = ['All', 'Action', 'Sports', 'Casual', 'Racing', 'Strategy', 'Retro'];

  return (
    <div className="min-h-screen bg-[#09090b] text-white font-sans selection:bg-accent/30 flex flex-col">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-8 py-6 border-b border-zinc-800 bg-black/50 backdrop-blur-md">
        <div className="flex items-center gap-3 group cursor-pointer" onClick={() => setActiveGame(null)}>
          <div className="w-8 h-8 bg-accent rounded-sm shadow-[4px_4px_0px_0px_#14532d] group-hover:translate-x-1 group-hover:translate-y-1 group-hover:shadow-none transition-all"></div>
          <span className="text-xl font-black tracking-tighter uppercase italic">
            IWillMakeANewOneEveryTimeItGetsBlocked<span className="text-accent">_REDUX</span>
          </span>
        </div>

        <div className="hidden md:flex gap-10 text-xs font-black uppercase tracking-[0.2em] text-zinc-500">
          <button 
            onClick={() => { setActiveGame(null); setSelectedCategory('All'); }}
            className={`hover:text-white transition-colors ${selectedCategory === 'All' && !activeGame ? 'text-accent' : ''}`}
          >
            Library
          </button>
          <button className="hover:text-white transition-colors">Mirrors</button>
          <button className="hover:text-white transition-colors">Discord</button>
          <button className="hover:text-white transition-colors">Proxies</button>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-sm flex items-center gap-3">
          <div className="w-2 h-2 bg-accent rounded-full animate-pulse shadow-[0_0_8px_#22c55e]"></div>
          <span className="text-[10px] font-mono font-bold text-zinc-400">SERVER_STABLE // 01</span>
        </div>
      </nav>

      <div className="flex flex-1">
        {/* Sidebar Label */}
        <div className="w-20 border-r border-zinc-900 hidden lg:flex items-center justify-center bg-black/20">
          <span className="rotate-[-90deg] text-[10px] font-mono tracking-[0.6em] text-zinc-700 uppercase whitespace-nowrap">
            UNBLOCKED_COLLECTION_v2.0_2024
          </span>
        </div>

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-[1400px] mx-auto px-10 py-12">
            {!activeGame ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {/* Hero Header */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">
                  <h1 className="text-7xl md:text-9xl font-black uppercase tracking-tighter leading-[0.85] italic">
                    PLAY<br /><span className="text-accent underline decoration-zinc-800 underline-offset-8">ANYWHERE.</span>
                  </h1>
                  <div className="text-right border-l-4 border-accent pl-6 py-2 bg-accent/5">
                    <p className="text-zinc-500 text-[10px] font-mono uppercase mb-2 tracking-widest">Global Statistics</p>
                    <p className="text-5xl font-black tabular-nums tracking-tighter">2.4M+</p>
                    <p className="text-zinc-500 text-[10px] font-mono uppercase tracking-widest mt-1">Active Bypasses</p>
                  </div>
                </div>

                {/* Sub Header & Search */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 border-b border-zinc-800 pb-8">
                  <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0">
                    <Filter className="w-4 h-4 text-zinc-600 mr-2" />
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`text-[10px] font-black uppercase tracking-widest px-4 py-2 transition-all ${
                          selectedCategory === category 
                            ? 'bg-accent text-black italic' 
                            : 'text-zinc-500 hover:text-white'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>

                  <div className="w-full md:w-80 relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-accent transition-colors" />
                    <input 
                      type="text" 
                      placeholder="SEARCH_DB_..." 
                      className="w-full bg-zinc-900/50 border border-zinc-800 px-12 py-3 text-[10px] font-mono font-bold uppercase tracking-widest transition-all focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/20 placeholder:text-zinc-700"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                {/* Game Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  <AnimatePresence mode="popLayout">
                    {filteredGames.map((game, index) => (
                      <motion.div
                        key={game.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.02 }}
                        onClick={() => setActiveGame(game)}
                        className="group relative h-64 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all cursor-pointer flex flex-col"
                      >
                        <div className="absolute top-4 left-4 z-10 flex gap-2">
                          <span className="bg-accent text-black text-[8px] font-black px-1.5 py-0.5 uppercase tracking-tighter">Ready</span>
                          <span className="bg-black/80 backdrop-blur-sm text-zinc-500 text-[8px] font-mono px-1.5 py-0.5">{game.rating} ★</span>
                        </div>
                        
                        <div className="relative flex-1 overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
                          <img 
                            src={game.thumbnail} 
                            alt={game.title} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-6 flex flex-col justify-end">
                            <h3 className="text-3xl font-black uppercase italic leading-none translate-y-2 group-hover:translate-y-0 transition-transform">{game.title}</h3>
                            <p className="text-[9px] font-mono text-zinc-500 uppercase tracking-[0.3em] mt-1 group-hover:text-accent transition-colors">{game.category}</p>
                          </div>
                        </div>

                        <div className="h-0 group-hover:h-12 overflow-hidden transition-all duration-300 bg-accent flex items-center justify-between px-4">
                          <span className="text-black font-black uppercase text-xs italic">Execute Application</span>
                          <ArrowRight className="w-4 h-4 text-black" />
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Empty State */}
                {filteredGames.length === 0 && (
                  <div className="py-32 flex flex-col items-center justify-center border-2 border-dashed border-zinc-900">
                    <p className="text-[10px] font-mono text-zinc-700 uppercase tracking-[0.5em]">0_MATCHES_FOUND_IN_DATA_STREAM</p>
                    <button 
                      onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                      className="mt-6 text-accent font-black uppercase text-xs hover:underline decoration-2"
                    >
                      Reset_Filters.exe
                    </button>
                  </div>
                )}
              </motion.div>
            ) : (
              /* Game Player View */
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col h-[calc(100vh-230px)]"
              >
                <div className="flex items-center justify-between mb-8 border-b-2 border-zinc-800 pb-6">
                  <div className="flex items-center gap-6">
                    <button 
                      onClick={() => setActiveGame(null)}
                      className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-accent transition-colors"
                    >
                      <ArrowRight className="w-4 h-4 rotate-180" />
                      Return_to_Library
                    </button>
                    <div>
                      <h2 className="text-5xl font-black italic uppercase tracking-tighter leading-none">{activeGame.title}</h2>
                      <div className="flex items-center gap-3 mt-2 text-[10px] font-mono text-zinc-500">
                        <span className="text-accent uppercase tracking-widest">{activeGame.category}</span>
                        <span className="text-zinc-800">/</span>
                        <span>{activeGame.rating} Rating</span>
                        <span className="text-zinc-800">/</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Latency: 12ms</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="bg-zinc-900 border border-zinc-800 p-4 hover:border-accent transition-colors">
                      <ExternalLink className="w-4 h-4 text-zinc-500" />
                    </button>
                    <button className="bg-accent text-black px-8 py-4 font-black uppercase italic tracking-tighter flex items-center gap-3 hover:translate-x-1 hover:translate-y-1 transition-all shadow-[4px_4px_0px_0px_#14532d]">
                      <Maximize2 className="w-4 h-4" />
                      Fullscreen
                    </button>
                  </div>
                </div>

                <div className="flex-1 bg-zinc-950 border-4 border-zinc-800 relative">
                  <div className="absolute -top-4 left-4 bg-zinc-800 px-3 py-1 text-[8px] font-mono text-zinc-400 uppercase tracking-widest">Secure_Layer_v4</div>
                  <iframe 
                    src={activeGame.url} 
                    className="w-full h-full border-none"
                    title={activeGame.title}
                    allowFullScreen
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
                  <div className="lg:col-span-2">
                    <h4 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-500 mb-4 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                      Intelligence_Report
                    </h4>
                    <p className="text-zinc-400 text-sm font-medium leading-relaxed border-l-2 border-zinc-800 pl-6 py-2 italic uppercase">
                      {activeGame.description} This application has been verified for educational bypass protocols. Distributed mirrors ensure 99.9% uptime across restricted networks.
                    </p>
                  </div>
                  <div className="bg-zinc-900/40 p-8 border border-zinc-900">
                    <h4 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-500 mb-6 font-mono">Status_Check</h4>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center text-[10px] font-mono border-b border-zinc-800 pb-2">
                        <span className="text-zinc-500 uppercase">Uptime</span>
                        <span className="text-accent">99.9%_STABLE</span>
                      </div>
                      <div className="flex justify-between items-center text-[10px] font-mono border-b border-zinc-800 pb-2">
                        <span className="text-zinc-500 uppercase">Users_Play</span>
                        <span className="text-white">42,812_TODAY</span>
                      </div>
                      <div className="flex justify-between items-center text-[10px] font-mono border-b border-zinc-800 pb-2">
                        <span className="text-zinc-500 uppercase">Engine</span>
                        <span className="text-accent underline">HTML5_X86</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </main>
      </div>

      {/* Bottom Status Bar */}
      <footer className="px-8 py-4 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center bg-black gap-4">
        <div className="flex gap-8 text-[9px] font-mono text-zinc-600 tracking-widest uppercase">
          <span className="flex items-center gap-2"><div className="w-1 h-1 bg-accent rounded-full"></div> ENCRYPTION: AES_256_ACTIVE</span>
          <span className="hidden sm:block">PROTOCOL: PORT_8080 // BYPASS_READY</span>
          <span className="hidden lg:block">BUILD: 9410A-BKT // UPDATED: {new Date().toLocaleDateString()}</span>
        </div>
        <div className="text-[9px] font-mono text-zinc-700 tracking-[0.2em]">
          © IWillMakeANewOneEveryTimeItGetsBlocked // RESILIENCE_GAMING_NETWORK
        </div>
      </footer>

      {/* Mobile Nav Overlay */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 md:hidden z-50">
        <div className="flex items-center gap-2 bg-black/80 border border-zinc-800 backdrop-blur-xl p-2 rounded-sm shadow-2xl">
          <button className="p-3 bg-accent text-black font-black uppercase text-[10px] italic">
            Menu
          </button>
          <div className="w-px h-4 bg-zinc-800 mx-1"></div>
          <button className="p-3 text-zinc-500 hover:text-white transition-colors">
            <Search className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}


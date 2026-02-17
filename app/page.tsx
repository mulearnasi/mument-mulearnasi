"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import * as Tabs from '@radix-ui/react-tabs';
import { MessageSquare, Send, Filter, CheckCircle2 } from 'lucide-react';

// Floating Particles Component
const FloatingParticles = ({ variant = 'light' }) => {
  const [mounted, setMounted] = useState(false);
  const [particleData] = useState(() => {
    const count = variant === 'splash' ? 40 : 60; // Increased for full screen
    return Array.from({ length: count }, () => ({
      size: Math.random() * 20 + 5,
      left: Math.random() * 100,
      top: Math.random() * 100,
      opacity: Math.random() * 0.3 + 0.1,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
    }));
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particleData.map((particle, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: particle.size + 'px',
            height: particle.size + 'px',
            left: particle.left + '%',
            top: particle.top + '%',
            background: variant === 'splash' 
              ? `radial-gradient(circle, rgba(255,255,255,${particle.opacity}) 0%, transparent 70%)`
              : `radial-gradient(circle, rgba(37, 99, 235, ${particle.opacity}) 0%, transparent 70%)`,
            animation: `float ${particle.duration}s linear infinite`,
            animationDelay: `${particle.delay}s`,
            boxShadow: variant === 'splash' 
              ? '0 0 20px rgba(255,255,255,0.3)'
              : '0 0 20px rgba(37, 99, 235, 0.2)',
          }}
        />
      ))}
    </div>
  );
};

const TOPICS = [
  'All Topics', 'Figma', 'Git and GitHub', 'Startup Building', 
  'Web Development', 'App Development', 'Cybersecurity', 'AI/ML'
];

export default function MuLearnQueryHub() {
  const [showSplash, setShowSplash] = useState(true);
  const [isSplashFading, setIsSplashFading] = useState(false);
  const [doubts, setDoubts] = useState<any[]>([]);
  const [filter, setFilter] = useState('All Topics');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('post');
  const [newDoubt, setNewDoubt] = useState({ topic: '', question: '' });

  useEffect(() => {
    const fadeTimer = setTimeout(() => setIsSplashFading(true), 2100);
    const hideTimer = setTimeout(() => setShowSplash(false), 2800);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  const fetchDoubts = async () => {
    let query = supabase.from('doubts').select('*').order('created_at', { ascending: false });
    if (filter !== 'All Topics') query = query.eq('topic', filter);
    const { data } = await query;
    if (data) setDoubts(data);
  };

  useEffect(() => { fetchDoubts(); }, [filter]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDoubt.question.trim()) return;
    setLoading(true);
    const { error } = await supabase.from('doubts').insert([newDoubt]);
    if (!error) {
      setNewDoubt({ ...newDoubt, question: '' });
      fetchDoubts();
      setActiveTab('view'); 
    }
    setLoading(false);
  };

  const splashOverlayClasses = `fixed inset-0 z-[100] flex flex-col items-center justify-between bg-[#4A90FF] overflow-hidden py-24 transition-all duration-1000 ${isSplashFading ? 'opacity-0 scale-[1.02]' : 'opacity-100 scale-100'}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 text-gray-900 font-sans selection:bg-blue-200 relative overflow-hidden">
      <FloatingParticles variant="light" />
      
      <div className="relative w-full max-w-[1600px] mx-auto px-6 md:px-12 py-8 md:py-12">
        
        {/* TOP NAVIGATION: Mument (Left) | µLearn (Right) */}
        <nav className="flex items-center justify-between mb-16 w-full">
          {/* Left: Mument Logo */}
          <div className="flex items-center gap-4 scale-75 md:scale-110 origin-left group cursor-pointer">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-400/20 blur-xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-500"></div>
              <Image 
                src="/mument_logo.png" 
                alt="Mument" 
                width={150} 
                height={150} 
                className="relative z-10 drop-shadow-md group-hover:rotate-12 transition-transform"
              />
            </div>
          </div>

          {/* Right: µLearn ASI */}
          <div className="flex flex-col items-end scale-50 md:scale-64 origin-right">
            <svg width="180" height="42" viewBox="0 0 153 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M24.1383 20.3296C25.1491 20.3296 25.9685 21.149 25.9685 22.1598V22.8523C25.9685 24.2455 24.839 25.3749 23.4458 25.3749H23.1985C20.6923 25.3749 18.9281 24.4186 17.9059 22.506C16.2571 24.8473 13.7674 26.018 10.4368 26.018C8.14779 26.018 5.34208 27.6679 5.34208 29.9569V32.5966C5.34208 34.0718 4.14622 35.2677 2.67104 35.2677C1.19587 35.2677 0 34.0718 0 32.5966V3.31407C0 1.83889 1.19587 0.643029 2.67104 0.643029C4.14622 0.643029 5.34208 1.83889 5.34208 3.31407V15.2843C5.34208 17.098 5.83672 18.5159 6.82599 19.5382C7.81527 20.5275 9.15079 21.0221 10.8326 21.0221C12.7452 21.0221 14.2785 20.445 15.4327 19.2909C16.5868 18.1037 17.1639 16.2901 17.1639 13.8499V3.31407C17.1639 1.8389 18.3598 0.643029 19.835 0.643029C21.3101 0.643029 22.506 1.83889 22.506 3.31407V18.6973C22.506 19.1919 22.6544 19.5877 22.9512 19.8844C23.248 20.1812 23.6437 20.3296 24.1383 20.3296Z" fill="#2563eb"/>
              <path d="M36.3698 14.8516C36.3698 17.6585 38.6452 19.9339 41.4521 19.9339H47.7464C49.2489 19.9339 50.4669 21.1519 50.4669 22.6544C50.4669 24.1569 49.2489 25.3749 47.7464 25.3749H40.5742C35.1106 25.3749 30.6814 20.9458 30.6814 15.4822V3.48713C30.6814 1.91634 31.9548 0.642962 33.5256 0.642962C35.0964 0.642962 36.3698 1.91634 36.3698 3.48713V14.8516Z" fill="#2563eb"/>
              <path d="M59.8129 15.2843C58.7621 15.2843 57.9617 16.2684 58.4303 17.2089C58.9174 18.1868 59.6055 18.9962 60.4945 19.6371C61.9125 20.6264 63.6437 21.121 65.6882 21.121C67.5877 21.121 69.1691 20.6624 70.4325 19.7452C71.5123 18.9612 72.9583 18.5738 74.1105 19.247C75.3877 19.9933 75.7849 21.6941 74.7145 22.7151C72.4064 24.917 69.3812 26.018 65.6388 26.018C61.6157 26.018 58.3676 24.7978 55.8944 22.3576C53.4212 19.8844 52.1846 16.7682 52.1846 13.009C52.1846 9.31568 53.4047 6.23244 55.8449 3.75925C58.2851 1.25308 61.4179 0 65.243 0C68.8704 0 71.8382 1.26957 74.1465 3.80871C76.4878 6.34785 77.6584 9.43109 77.6584 13.0584C77.6584 14.3417 76.5074 15.2843 75.2242 15.2843H59.8129ZM57.7246 10.9315H72.2669C71.9042 8.91997 71.0633 7.40308 69.7442 6.38083C68.4582 5.35858 66.9413 4.84745 65.1936 4.84745C63.215 4.84745 61.5662 5.39155 60.2472 6.47975C58.9282 7.56796 58.0873 9.05187 57.7246 10.9315Z" fill="#2563eb"/>
              <path d="M101.802 3.31408C101.802 1.8389 102.998 0.643029 104.473 0.643029C105.948 0.643029 107.144 1.8389 107.144 3.31407V22.7039C107.144 24.179 105.948 25.3749 104.473 25.3749C102.998 25.3749 101.802 24.1791 101.802 22.7039V21.8135C99.7902 24.6165 96.9049 26.018 93.1456 26.018C89.7491 26.018 86.8472 24.7649 84.44 22.2587C82.0328 19.7196 80.8291 16.6363 80.8291 13.009C80.8291 9.34865 82.0328 6.26541 84.44 3.75925C86.8472 1.25308 89.7491 0 93.1456 0C96.9049 0 99.7902 1.38499 101.802 4.15496V3.31408ZM88.3971 18.6973C89.881 20.1812 91.7441 20.9232 93.9865 20.9232C96.2288 20.9232 98.092 20.1812 99.5759 18.6973C101.06 17.1804 101.802 15.2843 101.802 13.009C101.802 10.7336 101.06 8.85402 99.5759 7.3701C98.092 5.85321 96.2288 5.09477 93.9865 5.09477C91.7441 5.09477 89.881 5.85321 88.3971 7.3701C86.9132 8.85402 86.1712 10.7336 86.1712 13.009C86.1712 15.2843 86.9132 17.1804 88.3971 18.6973Z" fill="#2563eb"/>
              <path d="M118.713 4.79799C119.698 2.56375 121.313 1.14337 123.558 0.536855C125.051 0.133504 126.33 1.45163 126.33 2.99824C126.33 4.61579 124.926 5.83049 123.373 6.28221C122.516 6.53136 121.721 6.92697 120.988 7.46903C119.471 8.55723 118.713 10.3709 118.713 12.91V22.7039C118.713 24.1791 117.517 25.3749 116.042 25.3749C114.566 25.3749 113.37 24.1791 113.37 22.7039V3.31407C113.37 1.8389 114.566 0.643029 116.042 0.643029C117.517 0.643029 118.713 3.31407V4.79799Z" fill="#2563eb"/>
              <path d="M143.286 0C146.122 0 148.414 0.906835 150.161 2.72051C151.909 4.53418 152.783 7.02386 152.783 10.1895V22.7039C152.783 24.1791 151.587 25.3749 150.112 25.3749C148.637 25.3749 147.441 24.1791 147.441 22.7039V10.7336C147.441 8.88699 146.946 7.46903 145.957 6.47975C144.968 5.49048 143.616 4.99584 141.901 4.99584C140.021 4.99584 138.505 5.58941 137.35 6.77654C136.196 7.93069 135.619 9.71139 135.619 12.1186V22.7039C135.619 24.1791 134.423 25.3749 132.948 25.3749C131.473 25.3749 130.277 24.1791 130.277 22.7039V3.31407C130.277 1.8389 131.473 0.643029 132.948 0.643029C134.423 0.643029 135.619 1.83889 135.619 3.31407V3.80871C137.235 1.26957 139.791 0 143.286 0Z" fill="#2563eb"/>
            </svg>
            <span className="text-[12px] font-black text-blue-600 tracking-[0.3em] mr-0 -mt-2 uppercase">
              ASI
            </span>
          </div>
        </nav>

        {/* HEADER AREA */}
        <header className="mb-16 text-center animate-in fade-in slide-in-from-top-5 duration-700">
          <p className="text-blue-500 font-bold text-4xl tracking-wide">Ask Your Doubt</p>
        </header>

        {/* MAIN TABS/CONTENT SECTION */}
        <Tabs.Root value={activeTab} onValueChange={setActiveTab} className="w-full">
          <Tabs.List className="flex p-2 mb-14 bg-white/80 backdrop-blur-xl rounded-2xl border border-blue-100 shadow-xl max-w-md mx-auto animate-in fade-in zoom-in duration-500 delay-300">
            <Tabs.Trigger value="post" className={`flex-1 flex items-center justify-center gap-3 py-3 text-sm font-bold rounded-xl transition-all duration-300 ${activeTab === 'post' ? 'bg-[#2563eb] text-white shadow-lg scale-105' : 'text-blue-600 hover:bg-blue-50'}`}>
              <Send size={20} /> Ask
            </Tabs.Trigger>
            <Tabs.Trigger value="view" className={`flex-1 flex items-center justify-center gap-3 py-3 text-sm font-bold rounded-xl transition-all duration-300 ${activeTab === 'view' ? 'bg-[#2563eb] text-white shadow-lg scale-105' : 'text-blue-600 hover:bg-blue-50'}`}>
              <MessageSquare size={20} /> Explore
            </Tabs.Trigger>
          </Tabs.List>

          {/* ASKING SECTION (2-Column Grid for Full Screen) */}
          <Tabs.Content value="post" className="outline-none animate-in fade-in slide-in-from-bottom-5 duration-500 w-full max-w-6xl mx-auto">
            <div className="bg-white/70 backdrop-blur-2xl p-7 md:p-12 rounded-[3rem] shadow-2xl shadow-blue-500/10 border border-white/50 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-blue-600" />
              
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <div>
                    <label className="text-xs font-black text-blue-600 uppercase tracking-[0.2em] mb-3 block">Select Domain</label>
                    <select 
                      value={newDoubt.topic} 
                      onChange={(e) => setNewDoubt({...newDoubt, topic: e.target.value})}
                      className="w-full p-5 bg-blue-50/50 border-2 border-blue-100/60 rounded-2xl text-base font-bold transition-all focus:ring-4 focus:ring-blue-400/20 focus:border-blue-400 outline-none text-blue-900"
                      required
                    >
                      <option value="" disabled>Choose a domain...</option>
                      {TOPICS.filter(t => t !== 'All Topics').map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  
                </div>

                <div className="space-y-6">
                  <label className="text-xs font-black text-blue-600 uppercase tracking-[0.2em] mb-3 block">Your Question</label>
                  <textarea 
                    className="w-full p-6 bg-blue-50/50 border-2 border-blue-100/60 rounded-[2rem] h-64 text-lg focus:ring-4 focus:ring-blue-400/20 focus:border-blue-400 transition-all outline-none text-blue-900 leading-relaxed placeholder:text-blue-300" 
                    placeholder={newDoubt.topic ? "What's on your mind?" : "Please select a domain first..."} 
                    value={newDoubt.question} 
                    onChange={(e) => setNewDoubt({...newDoubt, question: e.target.value})} 
                    disabled={!newDoubt.topic}
                    required 
                  />
                  <button 
                    disabled={loading || !newDoubt.topic} 
                    className="w-full py-5 bg-blue-600 text-white rounded-[1.5rem] font-black text-xl hover:shadow-2xl hover:scale-[1.02] transition-all flex items-center justify-center gap-4 disabled:opacity-50 tracking-tight"
                  >
                    {loading ? 'Posting...' : 'Post '}
                  </button>
                </div>
              </form>
            </div>
          </Tabs.Content>

          {/* EXPLORING SECTION */}
          <Tabs.Content value="view" className="outline-none animate-in fade-in slide-in-from-bottom-5 duration-500 w-full max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-5">
              <div className="w-full md:w-auto">
                <label className="text-xs font-black text-blue-600 uppercase tracking-widest mb-4 block">Filter Stream</label>
                <select 
                  value={filter} 
                  onChange={(e) => setFilter(e.target.value)}
                  className="w-full md:min-w-[280px] p-4 bg-white border-2 border-blue-100 rounded-2xl text-base font-bold shadow-lg focus:border-blue-400 outline-none"
                >
                  {TOPICS.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <p className="text-blue-400 font-bold uppercase tracking-widest text-xs">{doubts.length} Queries Found</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {doubts.map((d, i) => (
                <div key={d.id} className="p-6 bg-white/80 backdrop-blur-xl border border-blue-100 rounded-[2rem] shadow-xl hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 relative overflow-hidden group">
                  <div className="flex items-start justify-between mb-6">
                    <span className="px-5 py-1.5 bg-blue-50 text-blue-600 text-[10px] font-black uppercase rounded-full border border-blue-100">{d.topic}</span>
                    <span className="text-[10px] font-bold text-blue-300">{new Date(d.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <p className="text-blue-900 text-lg font-semibold leading-relaxed mb-6">{d.question}</p>
                  <div className="flex items-center gap-3 pt-5 border-t border-blue-50">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400" />
                    <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Anon Contributor</span>
                  </div>
                </div>
              ))}
            </div>

            {doubts.length === 0 && (
              <div className="py-24 text-center bg-white/30 backdrop-blur rounded-[3rem] border-4 border-dashed border-blue-100 text-blue-300 text-xl font-bold">
                No active queries in {filter} right now.
              </div>
            )}
          </Tabs.Content>
        </Tabs.Root>

        <footer className="mt-32 pb-12 text-center opacity-40">
          <p className="text-[12px] font-black uppercase tracking-[0.5em] text-blue-600">µLearn ASI • Mument 2.0 • 2026</p>
        </footer>
      </div>

      {showSplash && (
        <div className={splashOverlayClasses}>
          <FloatingParticles variant="splash" />

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="absolute w-[140vw] h-[140vw] bg-[#64A1FF] rounded-full opacity-30 animate-pulse-slow"></div>
            <div className="absolute w-[100vw] h-[100vw] bg-[#7EB2FF] rounded-full opacity-50"></div>
            <div className="absolute w-[60vw] h-[60vw] bg-[#97C3FF] rounded-full opacity-70"></div>
          </div>

          <div />

          <div className="relative z-10 flex flex-col items-center animate-in fade-in zoom-in duration-1000">
            <Image
              src="/mument_logo.png"
              alt="Mument 2.0"
              width={400}
              height={400}
              className="drop-shadow-2xl"
            />
          </div>

          <div className="relative z-10 flex flex-col items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            <div className="flex flex-col items-end scale-50 md:scale-110 origin-right">
              <svg width="180" height="42" viewBox="0 0 153 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M24.1383 20.3296C25.1491 20.3296 25.9685 21.149 25.9685 22.1598V22.8523C25.9685 24.2455 24.839 25.3749 23.4458 25.3749H23.1985C20.6923 25.3749 18.9281 24.4186 17.9059 22.506C16.2571 24.8473 13.7674 26.018 10.4368 26.018C8.14779 26.018 5.34208 27.6679 5.34208 29.9569V32.5966C5.34208 34.0718 4.14622 35.2677 2.67104 35.2677C1.19587 35.2677 0 34.0718 0 32.5966V3.31407C0 1.83889 1.19587 0.643029 2.67104 0.643029C4.14622 0.643029 5.34208 1.83889 5.34208 3.31407V15.2843C5.34208 17.098 5.83672 18.5159 6.82599 19.5382C7.81527 20.5275 9.15079 21.0221 10.8326 21.0221C12.7452 21.0221 14.2785 20.445 15.4327 19.2909C16.5868 18.1037 17.1639 16.2901 17.1639 13.8499V3.31407C17.1639 1.8389 18.3598 0.643029 19.835 0.643029C21.3101 0.643029 22.506 1.83889 22.506 3.31407V18.6973C22.506 19.1919 22.6544 19.5877 22.9512 19.8844C23.248 20.1812 23.6437 20.3296 24.1383 20.3296Z" fill="#2563eb"/>
                <path d="M36.3698 14.8516C36.3698 17.6585 38.6452 19.9339 41.4521 19.9339H47.7464C49.2489 19.9339 50.4669 21.1519 50.4669 22.6544C50.4669 24.1569 49.2489 25.3749 47.7464 25.3749H40.5742C35.1106 25.3749 30.6814 20.9458 30.6814 15.4822V3.48713C30.6814 1.91634 31.9548 0.642962 33.5256 0.642962C35.0964 0.642962 36.3698 1.91634 36.3698 3.48713V14.8516Z" fill="#2563eb"/>
                <path d="M59.8129 15.2843C58.7621 15.2843 57.9617 16.2684 58.4303 17.2089C58.9174 18.1868 59.6055 18.9962 60.4945 19.6371C61.9125 20.6264 63.6437 21.121 65.6882 21.121C67.5877 21.121 69.1691 20.6624 70.4325 19.7452C71.5123 18.9612 72.9583 18.5738 74.1105 19.247C75.3877 19.9933 75.7849 21.6941 74.7145 22.7151C72.4064 24.917 69.3812 26.018 65.6388 26.018C61.6157 26.018 58.3676 24.7978 55.8944 22.3576C53.4212 19.8844 52.1846 16.7682 52.1846 13.009C52.1846 9.31568 53.4047 6.23244 55.8449 3.75925C58.2851 1.25308 61.4179 0 65.243 0C68.8704 0 71.8382 1.26957 74.1465 3.80871C76.4878 6.34785 77.6584 9.43109 77.6584 13.0584C77.6584 14.3417 76.5074 15.2843 75.2242 15.2843H59.8129ZM57.7246 10.9315H72.2669C71.9042 8.91997 71.0633 7.40308 69.7442 6.38083C68.4582 5.35858 66.9413 4.84745 65.1936 4.84745C63.215 4.84745 61.5662 5.39155 60.2472 6.47975C58.9282 7.56796 58.0873 9.05187 57.7246 10.9315Z" fill="#2563eb"/>
                <path d="M101.802 3.31408C101.802 1.8389 102.998 0.643029 104.473 0.643029C105.948 0.643029 107.144 1.8389 107.144 3.31407V22.7039C107.144 24.179 105.948 25.3749 104.473 25.3749C102.998 25.3749 101.802 24.1791 101.802 22.7039V21.8135C99.7902 24.6165 96.9049 26.018 93.1456 26.018C89.7491 26.018 86.8472 24.7649 84.44 22.2587C82.0328 19.7196 80.8291 16.6363 80.8291 13.009C80.8291 9.34865 82.0328 6.26541 84.44 3.75925C86.8472 1.25308 89.7491 0 93.1456 0C96.9049 0 99.7902 1.38499 101.802 4.15496V3.31408ZM88.3971 18.6973C89.881 20.1812 91.7441 20.9232 93.9865 20.9232C96.2288 20.9232 98.092 20.1812 99.5759 18.6973C101.06 17.1804 101.802 15.2843 101.802 13.009C101.802 10.7336 101.06 8.85402 99.5759 7.3701C98.092 5.85321 96.2288 5.09477 93.9865 5.09477C91.7441 5.09477 89.881 5.85321 88.3971 7.3701C86.9132 8.85402 86.1712 10.7336 86.1712 13.009C86.1712 15.2843 86.9132 17.1804 88.3971 18.6973Z" fill="#2563eb"/>
                <path d="M118.713 4.79799C119.698 2.56375 121.313 1.14337 123.558 0.536855C125.051 0.133504 126.33 1.45163 126.33 2.99824C126.33 4.61579 124.926 5.83049 123.373 6.28221C122.516 6.53136 121.721 6.92697 120.988 7.46903C119.471 8.55723 118.713 10.3709 118.713 12.91V22.7039C118.713 24.1791 117.517 25.3749 116.042 25.3749C114.566 25.3749 113.37 24.1791 113.37 22.7039V3.31407C113.37 1.8389 114.566 0.643029 116.042 0.643029C117.517 0.643029 118.713 3.31407V4.79799Z" fill="#2563eb"/>
                <path d="M143.286 0C146.122 0 148.414 0.906835 150.161 2.72051C151.909 4.53418 152.783 7.02386 152.783 10.1895V22.7039C152.783 24.1791 151.587 25.3749 150.112 25.3749C148.637 25.3749 147.441 24.1791 147.441 22.7039V10.7336C147.441 8.88699 146.946 7.46903 145.957 6.47975C144.968 5.49048 143.616 4.99584 141.901 4.99584C140.021 4.99584 138.505 5.58941 137.35 6.77654C136.196 7.93069 135.619 9.71139 135.619 12.1186V22.7039C135.619 24.1791 134.423 25.3749 132.948 25.3749C131.473 25.3749 130.277 24.1791 130.277 22.7039V3.31407C130.277 1.8389 131.473 0.643029 132.948 0.643029C134.423 0.643029 135.619 1.83889 135.619 3.31407V3.80871C137.235 1.26957 139.791 0 143.286 0Z" fill="#2563eb"/>
              </svg>
              <span className="text-[12px] font-black text-blue-600 tracking-[0.3em] mr-0 -mt-2 uppercase">
                ASI
              </span>
            </div>
            <div className="flex items-center gap-2 text-white/90 text-xs uppercase tracking-[0.24em] font-bold">
              <span>Loading</span>
              <span className="w-1.5 h-1.5 rounded-full bg-white loading-dot" style={{ animationDelay: '0s' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-white loading-dot" style={{ animationDelay: '0.15s' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-white loading-dot" style={{ animationDelay: '0.3s' }} />
            </div>
            <div className="w-36 h-[3px] rounded-full bg-white/25 overflow-hidden">
              <div className="h-full w-10 rounded-full bg-white/90 loading-progress" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
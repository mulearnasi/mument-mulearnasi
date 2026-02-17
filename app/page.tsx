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
    const count = variant === 'splash' ? 30 : 50;
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

// --- Official µLearn SVG Component with precise ASI and Mument 2.0 alignment ---
const ULearnLogo = ({ isLarge = false }) => (
  <div className="flex flex-col items-center">
    <div className="flex flex-col items-end">
      <svg 
        width={isLarge ? "220" : "153"} 
        height={isLarge ? "52" : "36"} 
        viewBox="0 0 153 36" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M24.1383 20.3296C25.1491 20.3296 25.9685 21.149 25.9685 22.1598V22.8523C25.9685 24.2455 24.839 25.3749 23.4458 25.3749H23.1985C20.6923 25.3749 18.9281 24.4186 17.9059 22.506C16.2571 24.8473 13.7674 26.018 10.4368 26.018C8.14779 26.018 5.34208 27.6679 5.34208 29.9569V32.5966C5.34208 34.0718 4.14622 35.2677 2.67104 35.2677C1.19587 35.2677 0 34.0718 0 32.5966V3.31407C0 1.83889 1.19587 0.643029 2.67104 0.643029C4.14622 0.643029 5.34208 1.83889 5.34208 3.31407V15.2843C5.34208 17.098 5.83672 18.5159 6.82599 19.5382C7.81527 20.5275 9.15079 21.0221 10.8326 21.0221C12.7452 21.0221 14.2785 20.445 15.4327 19.2909C16.5868 18.1037 17.1639 16.2901 17.1639 13.8499V3.31407C17.1639 1.8389 18.3598 0.643029 19.835 0.643029C21.3101 0.643029 22.506 1.83889 22.506 3.31407V18.6973C22.506 19.1919 22.6544 19.5877 22.9512 19.8844C23.248 20.1812 23.6437 20.3296 24.1383 20.3296Z" fill="url(#paint0_linear_2454_303)"/>
        <path d="M36.3698 14.8516C36.3698 17.6585 38.6452 19.9339 41.4521 19.9339H47.7464C49.2489 19.9339 50.4669 21.1519 50.4669 22.6544C50.4669 24.1569 49.2489 25.3749 47.7464 25.3749H40.5742C35.1106 25.3749 30.6814 20.9458 30.6814 15.4822V3.48713C30.6814 1.91634 31.9548 0.642962 33.5256 0.642962C35.0964 0.642962 36.3698 1.91634 36.3698 3.48713V14.8516Z" fill="url(#paint1_linear_2454_303)"/>
        <path d="M59.8129 15.2843C58.7621 15.2843 57.9617 16.2684 58.4303 17.2089C58.9174 18.1868 59.6055 18.9962 60.4945 19.6371C61.9125 20.6264 63.6437 21.121 65.6882 21.121C67.5877 21.121 69.1691 20.6624 70.4325 19.7452C71.5123 18.9612 72.9583 18.5738 74.1105 19.247C75.3877 19.9933 75.7849 21.6941 74.7145 22.7151C72.4064 24.917 69.3812 26.018 65.6388 26.018C61.6157 26.018 58.3676 24.7978 55.8944 22.3576C53.4212 19.8844 52.1846 16.7682 52.1846 13.009C52.1846 9.31568 53.4047 6.23244 55.8449 3.75925C58.2851 1.25308 61.4179 0 65.243 0C68.8704 0 71.8382 1.26957 74.1465 3.80871C76.4878 6.34785 77.6584 9.43109 77.6584 13.0584C77.6584 14.3417 76.5074 15.2843 75.2242 15.2843H59.8129ZM57.7246 10.9315H72.2669C71.9042 8.91997 71.0633 7.40308 69.7442 6.38083C68.4582 5.35858 66.9413 4.84745 65.1936 4.84745C63.215 4.84745 61.5662 5.39155 60.2472 6.47975C58.9282 7.56796 58.0873 9.05187 57.7246 10.9315Z" fill="url(#paint2_linear_2454_303)"/>
        <path d="M101.802 3.31408C101.802 1.8389 102.998 0.643029 104.473 0.643029C105.948 0.643029 107.144 1.8389 107.144 3.31407V22.7039C107.144 24.179 105.948 25.3749 104.473 25.3749C102.998 25.3749 101.802 24.1791 101.802 22.7039V21.8135C99.7902 24.6165 96.9049 26.018 93.1456 26.018C89.7491 26.018 86.8472 24.7649 84.44 22.2587C82.0328 19.7196 80.8291 16.6363 80.8291 13.009C80.8291 9.34865 82.0328 6.26541 84.44 3.75925C86.8472 1.25308 89.7491 0 93.1456 0C96.9049 0 99.7902 1.38499 101.802 4.15496V3.31408ZM88.3971 18.6973C89.881 20.1812 91.7441 20.9232 93.9865 20.9232C96.2288 20.9232 98.092 20.1812 99.5759 18.6973C101.06 17.1804 101.802 15.2843 101.802 13.009C101.802 10.7336 101.06 8.85402 99.5759 7.3701C98.092 5.85321 96.2288 5.09477 93.9865 5.09477C91.7441 5.09477 89.881 5.85321 88.3971 7.3701C86.9132 8.85402 86.1712 10.7336 86.1712 13.009C86.1712 15.2843 86.9132 17.1804 88.3971 18.6973Z" fill="url(#paint3_linear_2454_303)"/>
        <path d="M118.713 4.79799C119.698 2.56375 121.313 1.14337 123.558 0.536855C125.051 0.133504 126.33 1.45163 126.33 2.99824C126.33 4.61579 124.926 5.83049 123.373 6.28221C122.516 6.53136 121.721 6.92697 120.988 7.46903C119.471 8.55723 118.713 10.3709 118.713 12.91V22.7039C118.713 24.1791 117.517 25.3749 116.042 25.3749C114.566 25.3749 113.37 24.1791 113.37 22.7039V3.31407C113.37 1.8389 114.566 0.643029 116.042 0.643029C117.517 0.643029 118.713 3.31407V4.79799Z" fill="url(#paint4_linear_2454_303)"/>
        <path d="M143.286 0C146.122 0 148.414 0.906835 150.161 2.72051C151.909 4.53418 152.783 7.02386 152.783 10.1895V22.7039C152.783 24.1791 151.587 25.3749 150.112 25.3749C148.637 25.3749 147.441 24.1791 147.441 22.7039V10.7336C147.441 8.88699 146.946 7.46903 145.957 6.47975C144.968 5.49048 143.616 4.99584 141.901 4.99584C140.021 4.99584 138.505 5.58941 137.35 6.77654C136.196 7.93069 135.619 9.71139 135.619 12.1186V22.7039C135.619 24.1791 134.423 25.3749 132.948 25.3749C131.473 25.3749 130.277 24.1791 130.277 22.7039V3.31407C130.277 1.8389 131.473 0.643029 132.948 0.643029C134.423 0.643029 135.619 1.83889 135.619 3.31407V3.80871C137.235 1.26957 139.791 0 143.286 0Z" fill="url(#paint5_linear_2454_303)"/>
        <defs>
          <linearGradient id="paint0_linear_2454_303" x1="-15.2216" y1="-2.79974" x2="2.28484" y2="69.9222" gradientUnits="userSpaceOnUse"><stop stopColor="#2E85FE" /><stop offset="0.940047" stopColor="#AF2EE6" /></linearGradient>
          <linearGradient id="paint1_linear_2454_303" x1="-15.2216" y1="-2.79974" x2="2.28484" y2="69.9222" gradientUnits="userSpaceOnUse"><stop stopColor="#2E85FE" /><stop offset="0.940047" stopColor="#AF2EE6" /></linearGradient>
          <linearGradient id="paint2_linear_2454_303" x1="-15.2216" y1="-2.79974" x2="2.28484" y2="69.9222" gradientUnits="userSpaceOnUse"><stop stopColor="#2E85FE" /><stop offset="0.940047" stopColor="#AF2EE6" /></linearGradient>
          <linearGradient id="paint3_linear_2454_303" x1="-15.2216" y1="-2.79974" x2="2.28484" y2="69.9222" gradientUnits="userSpaceOnUse"><stop stopColor="#2E85FE" /><stop offset="0.940047" stopColor="#AF2EE6" /></linearGradient>
          <linearGradient id="paint4_linear_2454_303" x1="-15.2216" y1="-2.79974" x2="2.28484" y2="69.9222" gradientUnits="userSpaceOnUse"><stop stopColor="#2E85FE" /><stop offset="0.940047" stopColor="#AF2EE6" /></linearGradient>
          <linearGradient id="paint5_linear_2454_303" x1="-15.2216" y1="-2.79974" x2="2.28484" y2="69.9222" gradientUnits="userSpaceOnUse"><stop stopColor="#2E85FE" /><stop offset="0.940047" stopColor="#AF2EE6" /></linearGradient>
        </defs>
      </svg>
      <span 
        className={`font-black text-[#6d28d9] tracking-[0.1em] uppercase ${isLarge ? 'text-2xl -mt-2.5' : 'text-[13px] -mt-1.5'} leading-none`}
      >
        ASI
      </span>
    </div>
    {/* Mument 2.0 Text Subtitle */}
    <span className={`font-semibold text-gray-400 tracking-[0.2em] uppercase ${isLarge ? 'text-xs mt-3' : 'text-[8px] mt-1'}`}>
      Mument 2.0
    </span>
  </div>
);

const TOPICS = [
  'All Topics', 'Figma', 'Git and GitHub', 'Startup Building', 
  'Web Development', 'App Development', 'Cybersecurity', 'AI/ML'
];

export default function MuLearnQueryHub() {
  const [showSplash, setShowSplash] = useState(true);
  const [doubts, setDoubts] = useState<any[]>([]);
  const [filter, setFilter] = useState('All Topics');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('post');
  const [newDoubt, setNewDoubt] = useState({ topic: '', question: '' });

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2500);
    return () => clearTimeout(timer);
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

  if (showSplash) {
    return (
      <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-br from-[#2563eb] via-[#3b82f6] to-[#60a5fa] overflow-hidden">
        <FloatingParticles variant="splash" />
        
        {/* Animated Rings */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute w-[300px] h-[300px] border-4 border-white/20 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
          <div className="absolute w-[400px] h-[400px] border-4 border-white/10 rounded-full animate-ping" style={{ animationDuration: '3.5s', animationDelay: '0.5s' }}></div>
          <div className="absolute w-[500px] h-[500px] border-4 border-white/5 rounded-full animate-ping" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
        </div>

        {/* Glowing orbs */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-cyan-400/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-blue-300/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-32 w-24 h-24 bg-purple-400/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        
        <div className="animate-in fade-in zoom-in duration-1000 flex flex-col items-center relative z-10">
          <div className="relative">
            {/* Glow effect behind logo */}
            <div className="absolute inset-0 bg-white/40 blur-3xl scale-150 animate-pulse-slow"></div>
            
            <div className="relative animate-in zoom-in duration-1000">
              <Image 
                src="/mument_logo.png" 
                alt="Mument Logo" 
                width={380}
                height={380}
                className="h-auto mb-6 drop-shadow-2xl animate-float"
                priority
              />
            </div>
          </div>
          <span className="font-black text-white tracking-[0.2em] uppercase text-3xl drop-shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 [text-shadow:_0_0_30px_rgb(255_255_255_/_50%)]">
            µLearn ASI
          </span>
          <div className="h-1 w-32 bg-gradient-to-r from-transparent via-white to-transparent mt-4 animate-in fade-in duration-1000 delay-500"></div>
        </div>
        
        <div className="mt-20 flex space-x-4 relative z-10">
          <div className="w-4 h-4 bg-white rounded-full animate-bounce [animation-delay:-0.3s] shadow-2xl shadow-white/50"></div>
          <div className="w-4 h-4 bg-white/90 rounded-full animate-bounce [animation-delay:-0.15s] shadow-2xl shadow-white/50"></div>
          <div className="w-4 h-4 bg-white/80 rounded-full animate-bounce shadow-2xl shadow-white/50"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 text-gray-900 font-sans selection:bg-blue-200 relative overflow-hidden">
      <FloatingParticles variant="light" />
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute top-1/2 -right-24 w-[400px] h-[400px] bg-cyan-400/10 rounded-full blur-[100px] animate-pulse-slow [animation-delay:2s]" />
        <div className="absolute bottom-0 left-1/3 w-[350px] h-[350px] bg-blue-300/10 rounded-full blur-[100px] animate-pulse-slow [animation-delay:4s]" />
        <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-purple-400/5 rounded-full blur-[100px] animate-pulse-slow [animation-delay:6s]" />
        <div className="absolute bottom-1/4 left-1/4 w-[280px] h-[280px] bg-indigo-400/8 rounded-full blur-[100px] animate-pulse-slow [animation-delay:3s]" />
      </div>
      
      {/* Decorative animated shapes */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400/40 rounded-full animate-ping" style={{ animationDuration: '4s' }}></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-cyan-400/40 rounded-full animate-ping" style={{ animationDuration: '5s', animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-24 w-2 h-2 bg-blue-500/40 rounded-full animate-ping" style={{ animationDuration: '4.5s', animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/3 right-16 w-3 h-3 bg-indigo-400/40 rounded-full animate-ping" style={{ animationDuration: '4s', animationDelay: '0.5s' }}></div>
        <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-purple-400/30 rounded-full animate-ping" style={{ animationDuration: '5s', animationDelay: '1.5s' }}></div>
        <div className="absolute top-2/3 right-1/3 w-2 h-2 bg-blue-300/40 rounded-full animate-ping" style={{ animationDuration: '4.5s', animationDelay: '2.5s' }}></div>
        
        {/* Floating geometric shapes */}
        <div className="absolute top-1/4 left-[15%] w-16 h-16 border-2 border-blue-300/20 rounded-lg rotate-45 animate-float" style={{ animationDuration: '6s' }}></div>
        <div className="absolute bottom-1/4 right-[20%] w-20 h-20 border-2 border-cyan-300/20 rounded-full animate-float" style={{ animationDuration: '8s', animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-[10%] w-12 h-12 border-2 border-indigo-300/20 rotate-12 animate-float" style={{ animationDuration: '7s', animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/3 left-[25%] w-14 h-14 border-2 border-blue-400/20 rounded-full animate-float" style={{ animationDuration: '9s', animationDelay: '0.5s' }}></div>
      </div>

      <div className="relative max-w-3xl mx-auto px-4 py-8 md:py-16">
        <nav className="flex justify-center mb-16">
          <ULearnLogo />
        </nav>

        <header className="mb-12 text-center animate-in fade-in slide-in-from-top-5 duration-700 relative">
          {/* Decorative elements around header */}
          <div className="absolute -top-8 left-1/4 w-3 h-3 bg-blue-400/40 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
          <div className="absolute -top-4 right-1/3 w-2 h-2 bg-cyan-400/40 rounded-full animate-ping" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
          <div className="absolute top-4 left-[15%] w-8 h-8 border border-blue-300/20 rounded-full animate-float" style={{ animationDuration: '5s' }}></div>
          <div className="absolute top-8 right-[18%] w-6 h-6 border border-indigo-300/20 rotate-45 animate-float" style={{ animationDuration: '6s', animationDelay: '1s' }}></div>
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-[11px] font-black tracking-[0.2em] text-blue-600 uppercase bg-white/80 backdrop-blur-sm border border-blue-200 rounded-full shadow-md">
            µLearn ASI 
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-[#2563eb] tracking-tight mb-4 leading-tight">
            Query <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500">Hub</span>
          </h1>
          <p className="text-blue-600 font-medium text-lg italic">where curiosity meets action</p>
        </header>

        <Tabs.Root value={activeTab} onValueChange={setActiveTab} className="w-full">
          <Tabs.List className="flex p-1.5 mb-10 bg-white/70 backdrop-blur-md rounded-2xl border border-blue-200 shadow-lg max-w-xs mx-auto animate-in fade-in zoom-in duration-500 delay-300">
            <Tabs.Trigger value="post" className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold rounded-xl transition-all duration-300 ${activeTab === 'post' ? 'bg-[#2563eb]/90 text-white shadow-md scale-105' : 'text-blue-600 hover:bg-blue-50/50'}`}>
              <Send size={16} /> Ask
            </Tabs.Trigger>
            <Tabs.Trigger value="view" className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold rounded-xl transition-all duration-300 ${activeTab === 'view' ? 'bg-[#2563eb]/90 text-white shadow-md scale-105' : 'text-blue-600 hover:bg-blue-50/50'}`}>
              <MessageSquare size={16} /> Explore
            </Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="post" className="outline-none animate-in fade-in slide-in-from-bottom-5 duration-500">
            <div className="bg-white/70 backdrop-blur-lg p-6 md:p-10 rounded-[2.5rem] shadow-xl shadow-blue-500/10 border border-blue-200/50 relative overflow-hidden hover:shadow-blue-500/20 transition-shadow duration-300">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-cyan-400/70 via-blue-500/70 to-blue-600/70 animate-gradient-x" />
              
              {/* Decorative corner elements */}
              <div className="absolute top-4 right-4 w-20 h-20 border-2 border-blue-200/30 rounded-full animate-ping" style={{ animationDuration: '4s' }}></div>
              <div className="absolute bottom-4 left-4 w-16 h-16 border-2 border-cyan-200/30 rounded-lg rotate-45 animate-pulse-slow"></div>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest ml-1">Select Domain</label>
                  <select 
                    value={newDoubt.topic} 
                    onChange={(e) => setNewDoubt({...newDoubt, topic: e.target.value})}
                    className="w-full p-4 bg-blue-50/50 border-2 border-blue-200/60 rounded-xl text-sm font-bold transition-all focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 outline-none text-blue-900 hover:border-blue-300"
                    required
                  >
                    <option value="" disabled>Choose a domain...</option>
                    {TOPICS.filter(t => t !== 'All Topics').map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest ml-1">Your Question</label>
                  <textarea 
                    className="w-full p-6 bg-blue-50/50 border-2 border-blue-100/60 rounded-[1.5rem] h-44 focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 transition-all outline-none text-blue-900 leading-relaxed disabled:opacity-50 disabled:cursor-not-allowed hover:border-blue-300" 
                    placeholder={newDoubt.topic ? "Post your query anonymously..." : "Please select a domain first..."} 
                    value={newDoubt.question} 
                    onChange={(e) => setNewDoubt({...newDoubt, question: e.target.value})} 
                    disabled={!newDoubt.topic}
                    required 
                  />
                </div>
                <button disabled={loading || !newDoubt.topic} className="w-full py-5 bg-[#2563eb]/90 text-white rounded-2xl font-black text-lg hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:hover:scale-100 tracking-tight">{loading ? 'Submitting...' : 'Submit Post'}</button>
              </form>
            </div>
          </Tabs.Content>

          <Tabs.Content value="view" className="outline-none animate-in fade-in slide-in-from-bottom-5 duration-500">
            <div className="mb-10">
              <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest ml-1 mb-3 block">Filter by Domain</label>
              <select 
                value={filter} 
                onChange={(e) => setFilter(e.target.value)}
                className="w-full md:w-auto md:min-w-[250px] p-4 bg-white/70 backdrop-blur-md border-2 border-blue-200/60 rounded-xl text-sm font-bold transition-all focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 outline-none text-blue-900 shadow-md hover:border-blue-300"
              >
                {TOPICS.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div className="space-y-6">
              {doubts.map((d, i) => (
                <div key={d.id} className="p-6 md:p-8 bg-white/70 backdrop-blur-lg border border-blue-200/50 rounded-[2rem] shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 relative overflow-hidden group" style={{ animationDelay: `${i * 100}ms` }}>
                  {/* Decorative hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-blue-400/5 to-blue-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-2 right-2 w-12 h-12 border border-blue-300/20 rounded-full animate-ping opacity-0 group-hover:opacity-100" style={{ animationDuration: '2s' }}></div>
                  
                  <div className="flex items-start justify-between mb-6 relative z-10">
                    <span className="px-4 py-1 bg-gradient-to-r from-blue-100/70 to-cyan-100/70 text-blue-700 text-[10px] font-black uppercase rounded-full border border-blue-200/60 shadow-sm">{d.topic}</span>
                    <span className="text-[10px] font-bold text-blue-500 tabular-nums">{new Date(d.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <p className="text-blue-900 text-lg font-medium leading-relaxed relative z-10">{d.question}</p>
                  <div className="mt-6 pt-6 border-t border-blue-100/60 text-[10px] font-black text-blue-400 uppercase tracking-tighter italic relative z-10">Anonymous Contributor</div>
                </div>
              ))}
              {doubts.length === 0 && (
                <div className="py-24 text-center bg-white/50 backdrop-blur rounded-[3rem] border-2 border-dashed border-blue-300/60 text-blue-400 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center opacity-10">
                    <div className="w-32 h-32 border-4 border-blue-400 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
                  </div>
                  <span className="relative z-10">No doubts found for {filter}.</span>
                </div>
              )}
            </div>
          </Tabs.Content>
        </Tabs.Root>

        <footer className="mt-24 pb-12 text-center opacity-50 relative">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-16 border border-blue-300/20 rounded-full animate-ping" style={{ animationDuration: '4s' }}></div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">µLearn ASI • 2026</p>
        </footer>
      </div>
    </div>
  );
}
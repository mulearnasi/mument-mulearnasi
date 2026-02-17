"use client";
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import * as Tabs from '@radix-ui/react-tabs';
import { MessageSquare, Send, Filter, CheckCircle2, Search } from 'lucide-react';

const TOPICS = [
  'All Topics', 'Figma', 'Git and GitHub', 'Startup Building', 
  'Web Development', 'App Development', 'Cybersecurity', 'AI/ML'
];

export default function MuLearnQueryHub() {
  const [doubts, setDoubts] = useState<any[]>([]);
  const [filter, setFilter] = useState('All Topics');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('view');
  const [newDoubt, setNewDoubt] = useState({ topic: 'Figma', question: '' });

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

  return (
    <div className="min-h-screen bg-[#f8f7ff] text-[#1a1a1a] font-sans selection:bg-purple-200">
      {/* Background Aesthetic Gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-[500px] h-[500px] bg-purple-200/40 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 -right-24 w-[400px] h-[400px] bg-indigo-100/40 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-3xl mx-auto px-4 py-12 md:py-20">
        {/* Branding Header */}
        <header className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-[11px] font-black tracking-[0.2em] text-purple-600 uppercase bg-white border border-purple-100 rounded-full shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
            µLearn ASI Movement
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-[#2d1b69] tracking-tight mb-4">
            Query <span className="text-purple-500">Hub</span>
          </h1>
          <p className="text-gray-500 font-medium text-lg">
            Got a doubt? Drop it here and learn together.
          </p>
        </header>

        <Tabs.Root value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Custom Modern Tabs */}
          <Tabs.List className="flex p-1.5 mb-10 bg-white/60 backdrop-blur-md rounded-2xl border border-white shadow-sm max-w-sm mx-auto">
            <Tabs.Trigger 
              value="post"
              className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold rounded-xl transition-all ${activeTab === 'post' ? 'bg-[#2d1b69] text-white shadow-lg shadow-purple-200' : 'text-gray-500 hover:bg-purple-50'}`}
            >
              <Send size={16} /> Ask
            </Tabs.Trigger>
            <Tabs.Trigger 
              value="view"
              className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold rounded-xl transition-all ${activeTab === 'view' ? 'bg-[#2d1b69] text-white shadow-lg shadow-purple-200' : 'text-gray-500 hover:bg-purple-50'}`}
            >
              <MessageSquare size={16} /> Explore
            </Tabs.Trigger>
          </Tabs.List>

          {/* ASKING TAB */}
          <Tabs.Content value="post" className="outline-none animate-in fade-in zoom-in-95 duration-300">
            <div className="bg-white border border-white p-6 md:p-10 rounded-[2.5rem] shadow-2xl shadow-purple-100/50 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-400 to-indigo-500" />
              
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-3">
                  <label className="text-sm font-black text-[#2d1b69] uppercase tracking-widest ml-1">Topic</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {TOPICS.filter(t => t !== 'All Topics').map(t => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setNewDoubt({...newDoubt, topic: t})}
                        className={`py-3 px-2 rounded-xl text-[11px] font-bold transition-all border-2 ${newDoubt.topic === t ? 'bg-purple-50 border-purple-500 text-purple-700' : 'bg-gray-50 border-transparent text-gray-400 hover:bg-gray-100'}`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-black text-[#2d1b69] uppercase tracking-widest ml-1">Your Query</label>
                  <textarea 
                    className="w-full p-6 bg-gray-50 border-none rounded-[1.5rem] h-44 focus:ring-2 focus:ring-purple-400 transition-all outline-none text-gray-700 leading-relaxed placeholder:text-gray-300"
                    placeholder="Type your question here..."
                    value={newDoubt.question}
                    onChange={(e) => setNewDoubt({...newDoubt, question: e.target.value})}
                    required
                  />
                </div>

                <button 
                  disabled={loading}
                  className="group w-full py-5 bg-[#2d1b69] text-white rounded-2xl font-black text-lg hover:bg-[#1e124a] transition-all shadow-xl shadow-purple-200 flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {loading ? 'Processing...' : (
                    <>Submit Anonymously <CheckCircle2 size={20} className="group-hover:translate-x-1 transition-transform" /></>
                  )}
                </button>
              </form>
            </div>
          </Tabs.Content>

          {/* VIEWING TAB */}
          <Tabs.Content value="view" className="outline-none animate-in fade-in zoom-in-95 duration-300">
            {/* Grid Filter */}
            <div className="mb-10 space-y-4">
              <div className="flex items-center gap-2 text-gray-400 px-2">
                <Filter size={14} />
                <span className="text-[10px] font-black uppercase tracking-widest">Filter Sessions</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {TOPICS.map(t => (
                  <button
                    key={t}
                    onClick={() => setFilter(t)}
                    className={`py-2.5 px-4 rounded-xl text-[11px] font-black transition-all border-2 ${filter === t ? 'bg-[#2d1b69] border-[#2d1b69] text-white' : 'bg-white border-white text-gray-500 hover:border-purple-100 hover:bg-purple-50'}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Questions Feed */}
            <div className="space-y-6">
              {doubts.map((d) => (
                <div key={d.id} className="group relative p-6 md:p-8 bg-white/80 backdrop-blur-sm border border-white rounded-[2rem] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-start justify-between mb-6">
                    <div className="px-4 py-1 bg-purple-50 text-purple-600 text-[10px] font-black uppercase rounded-full border border-purple-100">
                      {d.topic}
                    </div>
                    <time className="text-[10px] font-bold text-gray-300 tabular-nums">
                      {new Date(d.created_at).toLocaleDateString()}
                    </time>
                  </div>
                  <p className="text-[#2d1b69] text-lg font-medium leading-relaxed">
                    {d.question}
                  </p>
                  <div className="mt-6 pt-6 border-t border-gray-50 flex justify-between items-center">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter italic">Posted Anonymously</span>
                    <button className="text-purple-400 hover:text-purple-600 transition-colors">
                      <Search size={14} />
                    </button>
                  </div>
                </div>
              ))}

              {doubts.length === 0 && (
                <div className="py-24 text-center bg-white/40 rounded-[3rem] border-2 border-dashed border-purple-200">
                  <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <MessageSquare className="text-purple-500" />
                  </div>
                  <h3 className="text-purple-900 font-black text-xl mb-2">Silence is Golden?</h3>
                  <p className="text-purple-400 font-medium">No queries for {filter} yet.</p>
                  <button onClick={() => setActiveTab('post')} className="mt-6 font-black text-[#2d1b69] underline decoration-2 underline-offset-4">Ask the first question</button>
                </div>
              )}
            </div>
          </Tabs.Content>
        </Tabs.Root>

        <footer className="mt-24 pb-12 text-center opacity-40">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#2d1b69]">
            Powered by µLearn ASI • 2026
          </p>
        </footer>
      </div>
    </div>
  );
}
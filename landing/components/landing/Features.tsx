
import React from 'react';
import { CheckCircle2, StickyNote, Zap, Layers, MousePointer2, Shield } from 'lucide-react';
import { useTheme } from '../../themeContext';

const Features: React.FC = () => {
  const { theme } = useTheme();

  const coreFeatures = [
    {
      title: 'Smart Task Management',
      desc: 'Organize your daily workflow with intuitive priorities, subtasks, and deadline tracking.',
      icon: CheckCircle2,
      color: theme.primary,
      bg: `${theme.primary}10`
    },
    {
      title: 'Deep Notes Workspace',
      desc: 'Capture ideas the moment they strike. A distraction-free environment for your knowledge base.',
      icon: StickyNote,
      color: theme.accent,
      bg: `${theme.accent}10`
    },
    {
      title: 'Real-time Sync',
      desc: 'Your data stays consistent across all your devices. Never lose a thought again.',
      icon: Zap,
      color: '#10B981',
      bg: '#ECFDF5'
    }
  ];

  return (
    <section id="features" className="py-32 px-6 md:px-12 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight mb-6">Built for clarity.</h2>
          <p className="max-w-xl mx-auto text-slate-500 font-medium">Everything you need to stay productive, nothing you don't. We focus on the interface so you can focus on the work.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {coreFeatures.map((f, i) => (
            <div key={i} className="group p-10 bg-white rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/50 hover:-translate-y-2 transition-all duration-300">
              <div 
                className="w-16 h-16 rounded-3xl flex items-center justify-center mb-8 shadow-inner"
                style={{ backgroundColor: f.bg, color: f.color }}
              >
                <f.icon size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">{f.title}</h3>
              <p className="text-slate-500 leading-relaxed font-medium">
                {f.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-40 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-lg" style={{ color: theme.primary, backgroundColor: `${theme.primary}10` }}>The Experience</span>
            <h3 className="text-4xl md:text-5xl font-bold text-slate-900 mt-6 leading-tight">It’s not just about tasks. <br /> It’s about how it feels.</h3>
            <p className="text-slate-500 mt-8 text-lg font-medium leading-relaxed">
              We spent months perfecting the padding, the shadows, and the typography. The result is a workspace that feels airy and professional, reducing cognitive load and helping you maintain focus for hours.
            </p>
            
            <ul className="mt-10 space-y-6">
              {[
                { icon: Layers, text: 'Customizable visual themes' },
                { icon: MousePointer2, text: 'Ultra-fast interactions' },
                { icon: Shield, text: 'Privacy by design' }
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">
                    <item.icon size={20} />
                  </div>
                  <span className="font-bold text-slate-700">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
             <div className="absolute inset-0 bg-indigo-500/5 blur-[100px] rounded-full"></div>
             <div className="relative bg-white p-4 rounded-[48px] shadow-2xl border border-slate-50 overflow-hidden group">
               <img 
                 src="https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?auto=format&fit=crop&q=80&w=1200" 
                 alt="Workspace" 
                 className="rounded-[36px] grayscale hover:grayscale-0 transition-all duration-700 hover:scale-[1.02]" 
               />
               <div className="absolute bottom-10 left-10 bg-white/90 backdrop-blur-xl p-6 rounded-3xl shadow-xl border border-white/50 max-w-xs animate-pulse">
                 <p className="text-sm font-bold text-slate-800 italic">"Lumina completely changed my workflow. I finally feel organized without the bloat."</p>
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-4">— Alex Rivera, Senior Designer</p>
               </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;

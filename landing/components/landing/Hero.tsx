
import React from 'react';
import { ChevronRight, MousePointer2 } from 'lucide-react';
import { useTheme } from '../../themeContext';

const Hero: React.FC = () => {
  const { theme } = useTheme();

  return (
    <section className="pt-48 pb-32 px-6 md:px-12 bg-gradient-to-b from-white via-violet-50/20 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto text-center">
        {/* Enhanced badge with glow effect */}
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-100 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 shadow-lg shadow-violet-100/50">
          <span className="flex h-2 w-2 rounded-full bg-violet-500 animate-pulse shadow-lg shadow-violet-400"></span>
          <span className="text-[11px] font-black text-violet-600 uppercase tracking-[0.15em]">Next-Gen Productivity</span>
        </div>

        {/* Fixed heading with proper line height and gradient text */}
        <h1 className="text-6xl md:text-[100px] font-black tracking-tighter leading-[1.1] mb-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
          <span className="text-slate-900">Clarity for your</span>
          <br />
          <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-violet-600 bg-clip-text text-transparent drop-shadow-sm">
            daily workflow.
          </span>
        </h1>

        {/* Enhanced description with better contrast */}
        <p className="max-w-2xl mx-auto text-slate-500 text-xl md:text-2xl font-medium leading-relaxed mb-16 animate-in fade-in slide-in-from-bottom-12 duration-700 delay-200">
          The professional workspace where tasks meet deep thinking. <br className="hidden md:block" />
          Capture ideas and conquer your goals in <span className="text-slate-700 font-semibold">total silence</span>.
        </p>

        {/* Enhanced CTAs with better visual hierarchy */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-32 animate-in fade-in slide-in-from-bottom-16 duration-700 delay-300">
          <a
            href="http://localhost:3000"
            className="group relative w-full sm:w-auto px-12 py-6 text-xl font-bold text-white rounded-[24px] shadow-2xl shadow-violet-300/50 hover:shadow-violet-400/60 hover:scale-[1.05] active:scale-95 transition-all flex items-center justify-center gap-3 overflow-hidden"
            style={{ backgroundColor: '#7C3AED' }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-violet-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"></span>
            <span className="relative">Try for free</span>
            <ChevronRight size={22} className="relative group-hover:translate-x-1 transition-transform" />
          </a>
          <button className="w-full sm:w-auto px-12 py-6 text-xl font-bold text-slate-700 bg-white rounded-[24px] border-2 border-slate-200 hover:bg-slate-50 hover:border-violet-200 hover:text-violet-700 transition-all flex items-center justify-center gap-3 shadow-lg shadow-slate-100">
            Watch demo
          </button>
        </div>

        {/* Visual representation of the dashboard app with enhanced hover animations */}
        <div className="group relative max-w-6xl mx-auto perspective-1000 animate-in fade-in zoom-in duration-1000 delay-500">
          <div className="absolute -inset-4 bg-gradient-to-tr from-violet-500/10 via-transparent to-pink-500/10 blur-[120px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

          {/* Main Mockup Container */}
          <div className="relative z-10 rounded-[50px] border-[12px] border-slate-50 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.08)] overflow-hidden bg-white aspect-video flex transform transition-all duration-700 ease-out group-hover:scale-[1.02] group-hover:rotate-x-2 group-hover:-rotate-y-1">

            {/* Minimal Sidebar Mockup */}
            <div className="w-64 bg-slate-50/50 border-r border-slate-100 p-8 hidden md:block transition-all duration-500 group-hover:bg-white">
              <div className="w-10 h-10 rounded-2xl bg-violet-100 mb-12 flex items-center justify-center">
                <div className="w-4 h-4 bg-violet-600 rounded-md"></div>
              </div>
              <div className="space-y-6">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-lg bg-slate-200/50"></div>
                    <div className="h-2 bg-slate-200/50 rounded-full w-2/3"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Main Mockup Content */}
            <div className="flex-1 p-12 flex flex-col gap-10 text-left bg-white">
              <div className="flex gap-6">
                <div className="w-44 h-28 rounded-[32px] bg-violet-50 flex items-end p-6 transition-transform duration-700 group-hover:translate-y-[-8px]">
                  <div className="h-2 bg-violet-200 rounded-full w-full"></div>
                </div>
                <div className="w-44 h-28 rounded-[32px] bg-slate-50 flex items-end p-6 transition-transform duration-700 delay-75 group-hover:translate-y-[-12px]">
                  <div className="h-2 bg-slate-200 rounded-full w-3/4"></div>
                </div>
              </div>

              <div className="flex-1 bg-white rounded-[40px] p-10 shadow-[0_0_50px_rgba(0,0,0,0.02)] border border-slate-100 transition-all duration-700 group-hover:shadow-xl group-hover:border-violet-100">
                <div className="flex items-center gap-5 mb-8">
                  <div className="w-8 h-8 rounded-xl border-2 border-slate-100 transition-colors group-hover:border-slate-200"></div>
                  <div className="h-3 bg-slate-100 rounded-full w-2/3"></div>
                </div>

                {/* Active Task with Color */}
                <div className="flex items-center gap-5 mb-8 translate-x-4 transition-transform duration-700 group-hover:translate-x-6">
                  <div className="w-8 h-8 rounded-xl bg-violet-600 shadow-lg shadow-violet-200 flex items-center justify-center">
                    <div className="w-2 h-4 border-r-2 border-b-2 border-white rotate-45 mb-1"></div>
                  </div>
                  <div className="h-3 bg-slate-100 rounded-full w-1/2"></div>
                </div>

                <div className="flex items-center gap-5">
                  <div className="w-8 h-8 rounded-xl border-2 border-slate-100"></div>
                  <div className="h-3 bg-slate-100 rounded-full w-3/4"></div>
                </div>
              </div>
            </div>

            {/* Floating Element 1 - Decorative cursor */}
            <div className="absolute top-1/2 right-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-1000 delay-300 translate-y-10 group-hover:translate-y-0">
              <div className="bg-white p-3 rounded-2xl shadow-2xl border border-slate-100 flex items-center gap-3">
                <MousePointer2 size={16} className="text-violet-600 fill-violet-600" />
                <span className="text-[10px] font-black text-slate-800 uppercase tracking-wider">Drag to reorder</span>
              </div>
            </div>
          </div>

          {/* Background Decorative Shapes */}
          <div className="absolute -top-12 -left-12 w-48 h-48 bg-violet-100/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-pink-100/30 rounded-full blur-3xl animate-pulse delay-700"></div>
        </div>
      </div>

      <style>{`
        .perspective-1000 {
          perspective: 1500px;
        }
        .rotate-x-2 {
          transform: rotateX(4deg);
        }
        .-rotate-y-1 {
          transform: rotateY(-2deg);
        }
      `}</style>
    </section>
  );
};

export default Hero;

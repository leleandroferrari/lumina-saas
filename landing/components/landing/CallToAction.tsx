
import React from 'react';
import { useTheme } from '../../themeContext';

const CallToAction: React.FC = () => {
  const { theme } = useTheme();

  return (
    <section className="py-32 px-6 md:px-12 bg-white">
      <div
        className="max-w-5xl mx-auto rounded-[60px] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-2xl shadow-indigo-200"
        style={{ background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.accent} 100%)` }}
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full -ml-48 -mb-48 blur-3xl"></div>

        <div className="relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">Ready to clear the clutter?</h2>
          <p className="text-white/80 text-lg md:text-xl font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
            Join 10,000+ professionals who have found their focus with Lumina. No credit card required, set up in seconds.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a href="http://localhost:3000" className="w-full sm:w-auto px-12 py-5 bg-white text-slate-900 text-lg font-bold rounded-[24px] hover:scale-[1.05] active:scale-95 transition-all shadow-xl">
              Try for free
            </a>
            <button className="w-full sm:w-auto px-12 py-5 bg-black/10 text-white border border-white/20 text-lg font-bold rounded-[24px] hover:bg-black/20 transition-all backdrop-blur-md">
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;


import React from 'react';
import { Palette, User, ChevronRight } from 'lucide-react';
import { useTheme } from '../themeContext';

const Settings: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const presets = [
    { name: 'Indigo Dream', primary: '#4F46E5', accent: '#F472B6', gradientStart: '#818CF8', gradientEnd: '#C084FC' },
    { name: 'Teal Ocean', primary: '#0D9488', accent: '#3B82F6', gradientStart: '#5EEAD4', gradientEnd: '#60A5FA' },
    { name: 'Sunset Rose', primary: '#E11D48', accent: '#F59E0B', gradientStart: '#FB7185', gradientEnd: '#FCD34D' },
    { name: 'Forest Green', primary: '#166534', accent: '#FACC15', gradientStart: '#4ADE80', gradientEnd: '#FDE047' },
    { name: 'Deep Purple', primary: '#7C3AED', accent: '#10B981', gradientStart: '#A78BFA', gradientEnd: '#34D399' },
    { name: 'Midnight Black', primary: '#18181B', accent: '#6366F1', gradientStart: '#3F3F46', gradientEnd: '#818CF8' },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Visual Theme Section */}
      <div className="bg-white rounded-[40px] shadow-xl shadow-slate-100 border border-slate-50 overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-800">Visual Theme</h3>
            <p className="text-sm text-slate-400 font-medium">Customize the look and feel of your workspace</p>
          </div>
          <Palette className="text-indigo-400" size={24} style={{ color: theme.primary }} />
        </div>
        
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {presets.map((preset) => (
            <button
              key={preset.name}
              onClick={() => setTheme(preset)}
              className={`p-6 rounded-[32px] border-2 text-left transition-all group ${
                theme.primary === preset.primary 
                  ? 'border-indigo-500 bg-indigo-50/20' 
                  : 'border-slate-100 hover:border-slate-200 bg-white'
              }`}
            >
              <div className="flex gap-2 mb-4">
                <div className="w-8 h-8 rounded-xl shadow-sm" style={{ backgroundColor: preset.primary }} />
                <div className="w-8 h-8 rounded-xl shadow-sm" style={{ backgroundColor: preset.accent }} />
                <div className="w-12 h-8 rounded-xl ml-auto opacity-40 group-hover:opacity-100 transition-opacity" 
                     style={{ background: `linear-gradient(135deg, ${preset.gradientStart}, ${preset.gradientEnd})` }} />
              </div>
              <h4 className="font-bold text-slate-800">{preset.name}</h4>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                {theme.primary === preset.primary ? 'Currently Active' : 'Apply Theme'}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Account Information Section */}
      <div className="bg-white rounded-[40px] shadow-xl shadow-slate-100 border border-slate-50 p-8">
        <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
          <User size={20} className="text-slate-400" />
          Account Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl cursor-pointer hover:bg-slate-100 transition-colors">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Address</p>
              <p className="text-sm font-semibold text-slate-700">kristin.watson@lumina.io</p>
            </div>
            <ChevronRight size={18} className="text-slate-300" />
          </div>
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl cursor-pointer hover:bg-slate-100 transition-colors">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Membership</p>
              <p className="text-sm font-semibold text-slate-700">Pro (Annual Billing)</p>
            </div>
            <ChevronRight size={18} className="text-slate-300" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

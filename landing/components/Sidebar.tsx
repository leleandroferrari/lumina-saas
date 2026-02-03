
import React from 'react';
import { LayoutDashboard, CheckSquare, StickyNote, Settings as SettingsIcon, Zap } from 'lucide-react';
import { NavigationItem } from '../types';
import { useTheme } from '../themeContext';

interface SidebarProps {
  activeTab: NavigationItem;
  setActiveTab: (tab: NavigationItem) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const { theme } = useTheme();

  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Overview' },
    { id: 'tasks', icon: CheckSquare, label: 'Tasks' },
    { id: 'notes', icon: StickyNote, label: 'Notes' },
    { id: 'settings', icon: SettingsIcon, label: 'Settings' },
  ];

  return (
    <aside className="w-20 md:w-64 bg-white border-r border-slate-100 flex flex-col">
      <div className="p-6 flex items-center gap-3">
        <div 
          className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-100"
          style={{ backgroundColor: theme.primary }}
        >
          <Zap size={20} className="text-white" />
        </div>
        <span className="hidden md:block font-bold text-xl text-slate-800">Lumina</span>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id as NavigationItem)}
            className={`w-full flex items-center gap-4 p-3 rounded-2xl transition-all duration-200 ${
              activeTab === item.id 
                ? 'bg-slate-50 text-slate-900 shadow-sm' 
                : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
            }`}
          >
            <item.icon 
              size={22} 
              className={activeTab === item.id ? '' : 'text-slate-300'} 
              style={activeTab === item.id ? { color: theme.primary } : {}}
            />
            <span className="hidden md:block font-medium text-sm">{item.label}</span>
            {activeTab === item.id && (
              <div 
                className="hidden md:block ml-auto w-1.5 h-1.5 rounded-full" 
                style={{ backgroundColor: theme.primary }}
              />
            )}
          </button>
        ))}
      </nav>

      <div className="p-4 mt-auto">
        <div className="bg-slate-50 rounded-2xl p-4 hidden md:block">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Plan</p>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm font-bold text-slate-800">Pro Member</span>
            <div className="px-1.5 py-0.5 rounded text-[10px] bg-indigo-100 text-indigo-600 font-bold">VIP</div>
          </div>
          <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
            <div className="bg-indigo-500 h-full w-[75%]" />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

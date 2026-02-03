
import React from 'react';
import { Search, Bell, User } from 'lucide-react';
import { NavigationItem } from '../types';

interface HeaderProps {
  activeTab: NavigationItem;
}

const Header: React.FC<HeaderProps> = ({ activeTab }) => {
  const getTitle = () => {
    switch (activeTab) {
      case 'dashboard': return 'Welcome, Kristin';
      case 'tasks': return 'Focus on your daily tasks';
      case 'notes': return 'Your Knowledge Base';
      case 'settings': return 'System Settings';
    }
  };

  const getSubtitle = () => {
    switch (activeTab) {
      case 'dashboard': return 'Your personal dashboard overview';
      case 'tasks': return 'Track progress and stay organized';
      case 'notes': return 'Capture ideas and documentation';
      case 'settings': return 'Manage preferences and visual themes';
    }
  };

  return (
    <header className="h-20 bg-white/50 backdrop-blur-md px-4 md:px-8 flex items-center justify-between border-b border-slate-100 sticky top-0 z-10">
      <div className="flex flex-col">
        <h1 className="text-xl md:text-2xl font-bold text-slate-800 leading-none mb-1">{getTitle()}</h1>
        <p className="text-xs md:text-sm text-slate-400 font-medium">{getSubtitle()}</p>
      </div>

      <div className="flex items-center gap-2 md:gap-6">
        <div className="hidden lg:flex items-center bg-slate-100 rounded-2xl px-4 py-2 w-72 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
          <Search size={18} className="text-slate-400 mr-3" />
          <input 
            type="text" 
            placeholder="Search everything..." 
            className="bg-transparent border-none outline-none text-sm w-full text-slate-600 placeholder:text-slate-400"
          />
        </div>

        <button className="p-2.5 bg-white border border-slate-100 text-slate-500 rounded-xl hover:bg-slate-50 transition-colors shadow-sm relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <button className="flex items-center gap-3 p-1 pl-4 bg-white border border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors shadow-sm">
          <div className="hidden md:block text-right">
            <p className="text-xs font-bold text-slate-800">Kristin Watson</p>
            <p className="text-[10px] font-medium text-slate-400">Design Manager</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-slate-200 overflow-hidden">
            <img src="https://picsum.photos/seed/kristin/100/100" alt="Avatar" className="w-full h-full object-cover" />
          </div>
        </button>
      </div>
    </header>
  );
};

export default Header;

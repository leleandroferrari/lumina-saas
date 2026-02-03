
import React from 'react';
import { Zap, Twitter, Github, Linkedin } from 'lucide-react';
import { useTheme } from '../../themeContext';

const Footer: React.FC = () => {
  const { theme } = useTheme();

  return (
    <footer className="py-20 px-6 md:px-12 border-t border-slate-50 bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 mb-6">
            <div 
              className="w-6 h-6 rounded-md flex items-center justify-center"
              style={{ backgroundColor: theme.primary }}
            >
              <Zap size={12} className="text-white" />
            </div>
            <span className="font-bold text-lg text-slate-800">Lumina</span>
          </div>
          <p className="text-sm text-slate-400 font-medium leading-relaxed">
            Beautifully designed productivity tools for the modern creator. Built with passion for clarity.
          </p>
          <div className="flex gap-4 mt-8">
            {[Twitter, Github, Linkedin].map((Icon, i) => (
              <a key={i} href="#" className="p-2 bg-slate-50 rounded-lg text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 transition-all">
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-bold text-slate-800 mb-6">Product</h4>
          <ul className="space-y-4 text-sm font-semibold text-slate-400">
            <li><a href="#" className="hover:text-slate-900 transition-colors">Features</a></li>
            <li><a href="#" className="hover:text-slate-900 transition-colors">Tasks</a></li>
            <li><a href="#" className="hover:text-slate-900 transition-colors">Notes</a></li>
            <li><a href="#" className="hover:text-slate-900 transition-colors">Pricing</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-slate-800 mb-6">Company</h4>
          <ul className="space-y-4 text-sm font-semibold text-slate-400">
            <li><a href="#" className="hover:text-slate-900 transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-slate-900 transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-slate-900 transition-colors">Blog</a></li>
            <li><a href="#" className="hover:text-slate-900 transition-colors">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-slate-800 mb-6">Stay Updated</h4>
          <p className="text-sm text-slate-400 font-medium mb-4">Subscribe to our monthly newsletter for tips on focus.</p>
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="Your email" 
              className="flex-1 bg-slate-50 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-100 outline-none"
            />
            <button className="bg-slate-900 text-white p-2 rounded-xl hover:bg-black transition-colors">
              Go
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs font-bold text-slate-300 uppercase tracking-widest">© 2024 Lumina Systems Inc. All rights reserved.</p>
        <div className="flex gap-8 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          <a href="#" className="hover:text-slate-600">Privacy Policy</a>
          <a href="#" className="hover:text-slate-600">Terms of Service</a>
          <a href="#" className="hover:text-slate-600">Cookies</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

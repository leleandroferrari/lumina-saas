
import React from 'react';
import { Clock, CheckCircle2, StickyNote, ListTodo, ArrowUpRight, Plus } from 'lucide-react';
import { useTheme } from '../themeContext';

// Mock data for the dashboard preview
const taskPreview = [
  { id: '1', title: 'Complete visual research', completed: true, priority: 'high' },
  { id: '2', title: 'Schedule meeting with backend', completed: false, priority: 'medium' },
  { id: '3', title: 'Review design system tokens', completed: false, priority: 'low' },
  { id: '4', title: 'Update project documentation', completed: false, priority: 'medium' },
  { id: '5', title: 'Prepare for Friday demo', completed: false, priority: 'high' },
];

const notePreview = [
  { id: '1', title: 'Product Roadmap', date: 'Oct 12', color: '#FCD34D', snippet: 'Q4 planning involves scaling...' },
  { id: '2', title: 'Design Inspiration', date: 'Oct 15', color: '#6EE7B7', snippet: 'Modern aesthetics use glassmorphism...' },
  { id: '3', title: 'Meeting with Sarah', date: 'Oct 16', color: '#93C5FD', snippet: 'Sarah mentioned that the new dashboard...' },
  { id: '4', title: 'System Architecture', date: 'Oct 18', color: '#F9A8D4', snippet: 'Switching to Micro-frontends...' },
];

const Dashboard: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className="space-y-8">
      {/* Top Section: Quick Stats - Adjusted to 2 columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile Card */}
        <div className="bg-white rounded-[32px] p-6 shadow-xl shadow-slate-100 border border-slate-50 flex items-center gap-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl border-2 border-slate-100 p-0.5">
              <img src="https://picsum.photos/seed/kristin/100/100" alt="Kristin" className="w-full h-full rounded-[14px] object-cover" />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-white p-1 rounded-full shadow-md">
              <div className="w-3 h-3 rounded-full bg-green-500 border-2 border-white"></div>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-lg">Kristin Watson</h3>
            <p className="text-xs text-slate-400 font-medium mb-2">Design Manager</p>
            <div className="flex gap-3">
              <div className="flex flex-col">
                <span className="text-slate-800 font-bold text-sm">56</span>
                <span className="text-[8px] text-slate-400 font-bold uppercase tracking-wider">Tasks</span>
              </div>
              <div className="w-px h-6 bg-slate-100 self-center" />
              <div className="flex flex-col">
                <span className="text-slate-800 font-bold text-sm">12</span>
                <span className="text-[8px] text-slate-400 font-bold uppercase tracking-wider">Goals</span>
              </div>
            </div>
          </div>
        </div>

        {/* Task Stat Card: Task Completion */}
        <div className="relative rounded-[32px] p-6 text-white overflow-hidden group shadow-lg shadow-orange-100" 
             style={{ background: 'linear-gradient(135deg, #FF9B9B 0%, #FFB09C 100%)' }}>
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="flex justify-between items-start">
              <span className="font-bold text-sm text-white/90">Task Completion</span>
              <div className="p-1.5 bg-white/20 rounded-lg">
                <Clock size={16} />
              </div>
            </div>
            <div>
              <span className="text-4xl font-bold">83%</span>
              <p className="text-[10px] text-white/80 font-bold uppercase tracking-wider mt-1">Daily Average</p>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12 blur-2xl group-hover:scale-110 transition-transform duration-500"></div>
        </div>
      </div>

      {/* Main Content: Tasks & Notes Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Tasks Overview */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-[40px] p-8 shadow-xl shadow-slate-100 border border-slate-50">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-indigo-50 text-indigo-500 rounded-2xl" style={{ backgroundColor: `${theme.primary}10`, color: theme.primary }}>
                  <ListTodo size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800">Recent Tasks</h3>
                  <p className="text-xs text-slate-400 font-medium">Prioritize your workflow</p>
                </div>
              </div>
              <button className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-widest">
                View All <ArrowUpRight size={14} />
              </button>
            </div>

            <div className="space-y-4">
              {taskPreview.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-4 bg-slate-50/50 hover:bg-white hover:shadow-md border border-transparent hover:border-slate-100 rounded-2xl transition-all group">
                  <div className="flex items-center gap-4">
                    <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors ${
                      task.completed ? 'bg-indigo-500 border-indigo-500' : 'border-slate-200'
                    }`} style={task.completed ? { backgroundColor: theme.primary, borderColor: theme.primary } : {}}>
                      {task.completed && <CheckCircle2 size={14} className="text-white" />}
                    </div>
                    <span className={`text-sm font-bold ${task.completed ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
                      {task.title}
                    </span>
                  </div>
                  <div className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase ${
                    task.priority === 'high' ? 'bg-red-50 text-red-500' : 
                    task.priority === 'medium' ? 'bg-blue-50 text-blue-500' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {task.priority}
                  </div>
                </div>
              ))}
              <button className="w-full py-4 border-2 border-dashed border-slate-100 rounded-2xl text-slate-300 text-sm font-bold flex items-center justify-center gap-2 hover:border-slate-200 hover:text-slate-400 transition-all">
                <Plus size={18} /> Add Quick Task
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Notes Preview */}
        <div className="space-y-8">
          <div className="bg-white rounded-[40px] p-8 shadow-xl shadow-slate-100 border border-slate-50 h-full">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-amber-50 text-amber-500 rounded-2xl">
                  <StickyNote size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">Latest Notes</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Recent thoughts</p>
                </div>
              </div>
              <button className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-widest">
                <ArrowUpRight size={14} />
              </button>
            </div>

            <div className="space-y-4">
              {notePreview.map((note) => (
                <div key={note.id} className="p-4 rounded-2xl border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all group cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-6 h-1 rounded-full" style={{ backgroundColor: note.color }}></div>
                    <span className="text-[10px] font-bold text-slate-300 uppercase">{note.date}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-800 mb-1">{note.title}</h4>
                  <p className="text-[10px] text-slate-400 font-medium line-clamp-2 leading-relaxed">{note.snippet}</p>
                </div>
              ))}
              <button className="w-full py-4 border-2 border-dashed border-slate-100 rounded-2xl text-slate-300 text-xs font-bold uppercase tracking-widest hover:border-slate-200 hover:text-slate-400 transition-all mt-4">
                View All Notes
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;

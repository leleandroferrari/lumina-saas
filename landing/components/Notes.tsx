
import React, { useState } from 'react';
import { Plus, Search, MoreVertical, Edit3, Trash2 } from 'lucide-react';
import { Note } from '../types';
import { useTheme } from '../themeContext';

const Notes: React.FC = () => {
  const { theme } = useTheme();
  const [notes, setNotes] = useState<Note[]>([
    { id: '1', title: 'Product Launch Roadmap', content: 'Q4 planning involves scaling the user base to 100k and improving latency by 20%.', date: 'Oct 12, 2023', color: '#FCD34D' },
    { id: '2', title: 'Design Inspiration', content: 'Modern aesthetics use glassmorphism, soft gradients, and airy layouts with ample white space.', date: 'Oct 15, 2023', color: '#6EE7B7' },
    { id: '3', title: 'Meeting with Sarah', content: 'Sarah mentioned that the new dashboard should feel more "fresh" and "minimalistic".', date: 'Oct 16, 2023', color: '#93C5FD' },
    { id: '4', title: 'System Architecture', content: 'Switching to Micro-frontends for the main dashboard to allow teams to deploy independently.', date: 'Oct 18, 2023', color: '#F9A8D4' },
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [newNote, setNewNote] = useState({ title: '', content: '' });

  const addNote = () => {
    if (!newNote.title || !newNote.content) return;
    const colors = ['#FCD34D', '#6EE7B7', '#93C5FD', '#F9A8D4', '#C4B5FD', '#FDBA74'];
    const note: Note = {
      id: Date.now().toString(),
      title: newNote.title,
      content: newNote.content,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      color: colors[Math.floor(Math.random() * colors.length)]
    };
    setNotes([note, ...notes]);
    setNewNote({ title: '', content: '' });
    setIsAdding(false);
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter(n => n.id !== id));
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="bg-white px-4 py-2 rounded-2xl flex items-center gap-3 border border-slate-100 shadow-sm w-full md:w-96 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
          <Search size={18} className="text-slate-400" />
          <input type="text" placeholder="Search notes..." className="bg-transparent border-none outline-none text-sm w-full" />
        </div>
        
        <button 
          onClick={() => setIsAdding(true)}
          className="flex items-center justify-center gap-2 bg-indigo-600 text-white font-bold px-6 py-3 rounded-2xl shadow-lg shadow-indigo-100 transition-all hover:scale-[1.02] active:scale-95"
          style={{ backgroundColor: theme.primary }}
        >
          <Plus size={20} />
          Create New Note
        </button>
      </div>

      {isAdding && (
        <div className="bg-white rounded-[40px] p-8 shadow-xl border border-slate-50 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="space-y-4">
            <input 
              type="text" 
              placeholder="Note Title" 
              value={newNote.title}
              onChange={e => setNewNote({...newNote, title: e.target.value})}
              className="w-full text-2xl font-bold text-slate-800 placeholder:text-slate-200 border-none outline-none" 
            />
            <textarea 
              placeholder="Start typing your thoughts..." 
              value={newNote.content}
              onChange={e => setNewNote({...newNote, content: e.target.value})}
              className="w-full h-40 text-slate-600 placeholder:text-slate-200 border-none outline-none resize-none leading-relaxed"
            />
            <div className="flex justify-end gap-3 pt-4 border-t border-slate-50">
              <button 
                onClick={() => setIsAdding(false)}
                className="px-6 py-2 rounded-xl text-slate-400 font-bold hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={addNote}
                className="px-8 py-2 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-100"
                style={{ backgroundColor: theme.primary }}
              >
                Save Note
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {notes.map(note => (
          <div key={note.id} className="group bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col min-h-[240px]">
            <div className="flex items-start justify-between mb-4">
              <div className="w-8 h-8 rounded-xl" style={{ backgroundColor: note.color }}></div>
              <button className="text-slate-200 hover:text-slate-400 transition-colors">
                <MoreVertical size={20} />
              </button>
            </div>
            <h4 className="text-lg font-bold text-slate-800 mb-2">{note.title}</h4>
            <p className="text-sm text-slate-500 line-clamp-4 leading-relaxed flex-1">{note.content}</p>
            <div className="flex items-center justify-between pt-6 mt-4 border-t border-slate-50">
              <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">{note.date}</span>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 text-slate-300 hover:text-indigo-500 hover:bg-indigo-50 rounded-lg transition-colors">
                  <Edit3 size={16} />
                </button>
                <button 
                  onClick={() => deleteNote(note.id)}
                  className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notes;

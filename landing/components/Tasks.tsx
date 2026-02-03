
import React, { useState } from 'react';
import { Plus, Trash2, CheckCircle, Circle, AlertCircle } from 'lucide-react';
import { Task } from '../types';
import { useTheme } from '../themeContext';

const Tasks: React.FC = () => {
  const { theme } = useTheme();
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Complete visual research for Lumina project', completed: true, priority: 'high' },
    { id: '2', title: 'Schedule meeting with backend team', completed: false, priority: 'medium' },
    { id: '3', title: 'Review design system tokens', completed: false, priority: 'low' },
    { id: '4', title: 'Update project documentation', completed: false, priority: 'medium' },
  ]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    
    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      completed: false,
      priority: 'medium'
    };
    setTasks([newTask, ...tasks]);
    setNewTaskTitle('');
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-[40px] shadow-xl shadow-slate-100 border border-slate-50 p-8">
        <form onSubmit={addTask} className="flex gap-4 mb-8">
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="What needs to be done?"
            className="flex-1 bg-slate-50 border-none rounded-2xl px-6 py-4 text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
          />
          <button
            type="submit"
            className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl shadow-lg shadow-indigo-100 hover:shadow-indigo-200 transition-all active:scale-95 flex items-center gap-2"
            style={{ backgroundColor: theme.primary }}
          >
            <Plus size={20} />
            Add Task
          </button>
        </form>

        <div className="space-y-4">
          <div className="flex items-center justify-between px-4 mb-2">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active Tasks</h4>
            <span className="text-[10px] font-bold text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-full">{tasks.filter(t => !t.completed).length} items</span>
          </div>

          {tasks.filter(t => !t.completed).length === 0 && (
            <div className="text-center py-12 text-slate-300">
              <CheckCircle size={48} className="mx-auto mb-4 opacity-20" />
              <p className="text-sm font-medium">All caught up! You're clear for now.</p>
            </div>
          )}

          {tasks.filter(t => !t.completed).map(task => (
            <div key={task.id} className="group flex items-center gap-4 bg-white border border-slate-100 p-4 rounded-3xl hover:shadow-md transition-all">
              <button 
                onClick={() => toggleTask(task.id)}
                className="text-slate-300 hover:text-indigo-500 transition-colors"
              >
                <Circle size={24} />
              </button>
              <span className="flex-1 text-slate-700 font-medium">{task.title}</span>
              <div className="flex items-center gap-4">
                <div className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase ${
                  task.priority === 'high' ? 'bg-orange-50 text-orange-500' : 
                  task.priority === 'medium' ? 'bg-blue-50 text-blue-500' : 'bg-slate-50 text-slate-500'
                }`}>
                  {task.priority}
                </div>
                <button 
                  onClick={() => deleteTask(task.id)}
                  className="opacity-0 group-hover:opacity-100 p-2 text-slate-300 hover:text-red-500 transition-all"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}

          {tasks.some(t => t.completed) && (
            <>
              <div className="flex items-center justify-between px-4 mb-2 pt-8">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Completed</h4>
              </div>
              {tasks.filter(t => t.completed).map(task => (
                <div key={task.id} className="flex items-center gap-4 bg-slate-50/50 border border-slate-100 p-4 rounded-3xl">
                  <button 
                    onClick={() => toggleTask(task.id)}
                    className="text-indigo-500"
                    style={{ color: theme.primary }}
                  >
                    <CheckCircle size={24} />
                  </button>
                  <span className="flex-1 text-slate-400 font-medium line-through decoration-slate-300">{task.title}</span>
                  <button 
                    onClick={() => deleteTask(task.id)}
                    className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tasks;

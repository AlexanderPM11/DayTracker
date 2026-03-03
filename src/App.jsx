import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Circle, 
  Sparkles, 
  Calendar as CalendarIcon,
  RefreshCcw,
  LayoutGrid,
  Edit3,
  ArrowRight,
  Zap
} from 'lucide-react';

const STORAGE_KEY = 'challenge_tracker_v2';

function App() {
  const [days, setDays] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [genCount, setGenCount] = useState(30);
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(days));
  }, [days]);

  const addDay = () => {
    const newDay = {
      id: Date.now(),
      label: `DAY ${String(days.length + 1).padStart(3, '0')}`,
      content: '',
      completed: false
    };
    setDays([...days, newDay]);
  };

  const generateDays = (count) => {
    const newDays = Array.from({ length: count }, (_, i) => ({
      id: Date.now() + i,
      label: `DAY ${String(i + 1).padStart(3, '0')}`,
      content: '',
      completed: false
    }));
    setDays(newDays);
    setIsGenerating(false);
  };

  const deleteDay = (id) => {
    setDays(days.filter(day => day.id !== id));
  };

  const toggleComplete = (id) => {
    setDays(days.map(day => 
      day.id === id ? { ...day, completed: !day.completed } : day
    ));
  };

  const startEditing = (day) => {
    setEditingId(day.id);
    setEditValue(day.content);
  };

  const saveEdit = (id) => {
    setDays(days.map(day => 
      day.id === id ? { ...day, content: editValue } : day
    ));
    setEditingId(null);
  };

  const resetAll = () => {
    if (window.confirm('¿Deseas resetear el progreso?')) {
      setDays([]);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 lg:p-16 max-w-[1600px] mx-auto selection:bg-accent-primary selection:text-black">
      {/* Decorative Elements */}
      <div className="fixed top-0 right-0 w-[40vw] h-[40vw] bg-accent-secondary/5 blur-[120px] rounded-full -z-10 translate-x-1/2 -translate-y-1/2" />
      <div className="fixed bottom-0 left-0 w-[30vw] h-[30vw] bg-accent-primary/5 blur-[100px] rounded-full -z-10 -translate-x-1/2 translate-y-1/2" />

      {/* Navigation / Actions Bar */}
      <nav className="flex flex-wrap items-center justify-between mb-20 gap-8 animate-reveal">
        <div className="group cursor-default">
          <h1 className="text-5xl md:text-7xl font-black leading-none mb-2 tracking-tighter">
            CHALLENGE<br />
            <span className="text-gradient">STREAK.</span>
          </h1>
          <div className="h-1 w-24 bg-accent-primary group-hover:w-full transition-all duration-700 ease-out" />
        </div>

        <div className="flex flex-wrap gap-3 items-center">
          <button 
            onClick={addDay}
            className="group flex items-center gap-3 px-8 py-4 glass text-sm font-bold tracking-widest hover:border-accent-primary"
          >
            <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" /> 
            ADD STEP
          </button>
          
          <button 
            onClick={() => setIsGenerating(!isGenerating)}
            className="group flex items-center gap-3 px-8 py-4 glass text-sm font-bold tracking-widest hover:border-accent-secondary"
          >
            <Sparkles className="w-4 h-4 group-hover:scale-125 transition-transform" /> 
            INITIATE
          </button>

          <button 
            onClick={resetAll}
            className="flex items-center gap-3 px-6 py-4 text-xs font-bold tracking-widest text-text-secondary hover:text-danger hover:bg-danger/10 rounded-full"
          >
            <RefreshCcw className="w-4 h-4" /> RESET
          </button>
        </div>
      </nav>

      {/* Generator Overlay */}
      <AnimatePresence>
        {isGenerating && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            className="mb-16 glass bg-white/[0.01] p-12 relative overflow-hidden group"
          >
             <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Zap className="w-32 h-32 text-accent-secondary" />
             </div>
             
             <div className="relative z-10">
               <h2 className="text-3xl font-black mb-8 flex items-center gap-4">
                 <ArrowRight className="text-accent-primary" /> 
                 STREAK GENERATOR
               </h2>
               
               <div className="flex flex-wrap items-center gap-6">
                 <div className="flex gap-2">
                   {[30, 100, 365].map(n => (
                     <button 
                       key={n}
                       onClick={() => generateDays(n)}
                       className="px-6 py-3 border border-glass-border font-bold text-xs tracking-tighter hover:bg-white/5 hover:border-accent-primary transition-all"
                     >
                       {n} DAYS
                     </button>
                   ))}
                 </div>
                 
                 <div className="h-10 w-px bg-glass-border hidden md:block" />
                 
                 <div className="flex items-center gap-4">
                   <input 
                     type="number" 
                     value={genCount}
                     onChange={(e) => setGenCount(parseInt(e.target.value) || 0)}
                     className="w-24 px-4 py-3 glass text-xl font-black text-center border-none"
                     placeholder="QTY"
                   />
                   <button 
                     onClick={() => generateDays(genCount)}
                     className="px-10 py-4 bg-accent-secondary hover:bg-accent-secondary/80 text-white font-black tracking-widest hover:scale-105"
                   >
                     GENERATE
                   </button>
                 </div>
               </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Grid Interface */}
      <div className="relative">
        {days.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-48 text-center"
          >
            <div className="w-32 h-32 glass rounded-full flex items-center justify-center mb-10 animate-pulse border-accent-primary/20">
              <LayoutGrid className="w-12 h-12 text-accent-primary" />
            </div>
            <h2 className="text-4xl font-black opacity-20 mb-4 tracking-tighter">GRID_EMPTY_SYSTEM_READY</h2>
            <p className="text-text-secondary max-w-sm font-medium">Inicia tu secuencia de retos para comenzar el tracking visual de tu progreso.</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 gap-1">
            <AnimatePresence mode="popLayout">
              {days.map((day, index) => (
                <motion.div
                  key={day.id}
                  layout
                  initial={{ opacity: 0, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: (index % 100) * 0.005,
                    ease: [0.16, 1, 0.3, 1] 
                  }}
                  className={`group relative p-6 aspect-square flex flex-col justify-between border border-glass-border transition-all duration-500 overflow-hidden ${
                    day.completed 
                      ? 'bg-accent-primary/20 border-accent-primary/40' 
                      : 'hover:bg-white/[0.03] hover:border-white/20'
                  }`}
                >
                  {/* Backdrop Number for impact */}
                  <span className="absolute -bottom-4 -right-2 text-7xl font-black italic opacity-[0.03] select-none group-hover:opacity-[0.08] transition-opacity">
                    {index + 1}
                  </span>

                  <div className="relative z-10 flex justify-between items-start">
                    <span className={`text-[10px] font-black tracking-[0.2em] uppercase ${day.completed ? 'text-accent-primary' : 'text-text-secondary'}`}>
                      {day.label}
                    </span>
                    <button 
                      onClick={() => deleteDay(day.id)}
                      className="opacity-0 group-hover:opacity-100 transition-all text-text-secondary hover:text-danger scale-75"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="relative z-10 flex-1 pt-4">
                    {editingId === day.id ? (
                      <textarea
                        autoFocus
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onBlur={() => saveEdit(day.id)}
                        onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && saveEdit(day.id)}
                        className="w-full text-xs font-semibold leading-relaxed tracking-tight bg-transparent resize-none h-full outline-none"
                      />
                    ) : (
                      <p 
                        onClick={() => startEditing(day)}
                        className={`text-[13px] font-semibold leading-tight cursor-text transition-all duration-300 ${
                          day.completed ? 'text-white/90' : 'text-white/70'
                        } ${!day.content && 'opacity-20 italic'}`}
                      >
                        {day.content || 'Notes...'}
                      </p>
                    )}
                  </div>

                  <div className="relative z-10 mt-4 flex items-center justify-between">
                    <button 
                      onClick={() => toggleComplete(day.id)}
                      className={`flex items-center gap-2 text-[10px] font-black tracking-tighter ${
                        day.completed ? 'text-accent-primary' : 'text-text-secondary hover:text-white'
                      }`}
                    >
                      {day.completed ? (
                        <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }} className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4" /> 
                          <span className="hidden group-hover:inline">COMPLETE</span>
                        </motion.div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Circle className="w-4 h-4 opacity-40" />
                          <span className="hidden group-hover:inline">MARK</span>
                        </div>
                      )}
                    </button>
                    
                    {editingId !== day.id && (
                      <Edit3 
                        className="w-3 h-3 text-text-secondary opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                        onClick={() => startEditing(day)}
                      />
                    )}
                  </div>

                  {/* Aesthetic Highlight */}
                  <div className={`absolute inset-0 bg-gradient-to-tr from-accent-primary/0 to-accent-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Footer Branding */}
      <footer className="mt-32 pb-16 flex flex-col md:flex-row justify-between items-center gap-8 border-t border-glass-border pt-12 animate-reveal" style={{ animationDelay: '0.4s' }}>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 glass flex items-center justify-center font-black text-xl text-accent-primary">S</div>
          <div>
            <p className="text-xs font-black tracking-widest text-white">STREAK.CORE</p>
            <p className="text-[10px] text-text-secondary tracking-widest font-bold">SYSTEM_OPERATIONAL_2026</p>
          </div>
        </div>
        
        <div className="flex gap-8 text-[10px] font-black tracking-widest text-text-secondary">
          <span className="hover:text-accent-primary cursor-pointer transition-colors">V 2.0.4 - PREMIUM EDITION</span>
          <span className="hidden md:block">OPTIMIZED FOR PERFORMANCE</span>
        </div>
      </footer>
    </div>
  );
}

export default App;

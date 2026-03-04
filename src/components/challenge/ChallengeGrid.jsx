import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DayCard } from './DayCard';
import { LayoutGrid, Zap, ArrowRight } from 'lucide-react';

export const ChallengeGrid = ({ 
  days, 
  onToggle, 
  onDelete, 
  onGenerate 
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [genCount, setGenCount] = useState(30);

  const handleGenerate = (count) => {
    onGenerate(count);
    setIsGenerating(false);
  };

  return (
    <div className="w-full relative z-10 my-12">
      {/* Action Bar */}
      <div className="flex justify-between items-end mb-8 border-b-4 border-black pb-4">
        <div>
          <h2 className="font-display font-black text-3xl uppercase tracking-tighter">Matriz de Días</h2>
          <p className="font-mono text-xs font-bold bg-black text-white inline-block px-2 py-1 mt-1">Nodos Totales: {days.length}</p>
        </div>
        <button 
          onClick={() => setIsGenerating(!isGenerating)}
          className="bg-[#e0ff00] border-2 border-black px-4 py-2 font-display font-black text-base uppercase shadow-[4px_4px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#000] transition-all flex items-center gap-2"
        >
          <Zap className="w-4 h-4" />
          <span>Lote Rápido</span>
        </button>
      </div>

      {/* Generator Overlay */}
      <AnimatePresence>
        {isGenerating && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mb-12"
          >
            <div className="bg-white border-4 border-black p-6 relative">
               <div className="absolute top-0 right-0 p-6 opacity-20 pointer-events-none">
                  <Zap className="w-32 h-32" />
               </div>
               
               <h3 className="font-display text-xl font-black mb-6 flex items-center gap-3 uppercase">
                 <ArrowRight className="w-5 h-5" />
                 Definir Parámetros de Secuencia
               </h3>
               
               <div className="flex flex-wrap items-center gap-4 relative z-10">
                 {[30, 100, 365].map(n => (
                   <button 
                     key={n}
                     onClick={() => handleGenerate(n)}
                     className="px-5 py-2 border-2 border-black font-mono font-bold hover:bg-black hover:text-white transition-colors uppercase text-sm"
                   >
                     {n} Unidades
                   </button>
                 ))}
                 
                 <span className="font-display font-black text-xl mx-2">O</span>
                 
                 <div className="flex items-stretch border-2 border-black bg-white">
                   <input 
                     type="number" 
                     value={genCount}
                     onChange={(e) => setGenCount(parseInt(e.target.value) || 0)}
                     className="w-20 px-3 py-2 font-mono text-lg font-bold border-r-2 border-black outline-none"
                   />
                   <button 
                     onClick={() => handleGenerate(genCount)}
                     className="px-6 bg-black text-white font-display font-black uppercase hover:bg-[#e0ff00] hover:text-black transition-colors text-sm"
                   >
                     Ejecutar
                   </button>
                 </div>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid */}
      {days.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 border-4 border-dashed border-black bg-white">
          <LayoutGrid className="w-16 h-16 mb-4 opacity-20" />
          <h3 className="font-display font-black text-2xl uppercase tracking-tighter mb-2">Matriz Fuera de Línea</h3>
          <p className="font-mono bg-black text-white px-4 py-1 text-sm">Inicializa la secuencia para comenzar.</p>
        </div>
      ) : (
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 2xl:grid-cols-16 gap-2 sm:gap-3">
          <AnimatePresence>
            {days.map((day, index) => (
              <motion.div
                key={day.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <DayCard 
                  day={day} 
                  index={index}
                  onToggle={() => onToggle(day.id)}
                  onDelete={() => onDelete(day.id)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

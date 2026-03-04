import React from 'react';
import { Plus, RefreshCcw } from 'lucide-react';

export const Header = ({ onAdd, onReset }) => {
  return (
    <header className="flex flex-col md:flex-row justify-between items-center bg-black text-white p-6 border-b-8 border-brand-primary">
      {/* Brand */}
      <div className="flex items-center gap-4 mb-6 md:mb-0">
        <div className="w-16 h-16 bg-brand-primary text-black font-display font-black text-4xl flex items-center justify-center transform -rotate-3 hover:rotate-3 transition-transform">
          S
        </div>
        <div>
          <h1 className="font-display font-black text-5xl md:text-6xl tracking-tighter uppercase leading-none">
            Streak<br/>
            <span className="text-brand-primary">Core.</span>
          </h1>
          <p className="font-mono text-xs font-bold tracking-[0.2em] mt-2 opacity-50">SISTEMA_OPERATIVO</p>
        </div>
      </div>

      {/* Primary Actions */}
      <div className="flex gap-4">
        <button 
          onClick={onAdd}
          className="group relative px-6 py-4 bg-white text-black font-display font-black text-xl uppercase overflow-hidden"
        >
          <div className="absolute inset-0 bg-brand-primary transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
          <span className="relative z-10 flex items-center gap-2">
            <Plus className="w-6 h-6" /> Añadir Nodo
          </span>
        </button>
        
        <button 
          onClick={onReset}
          className="p-4 border-2 border-white hover:bg-white hover:text-black transition-colors"
          title="Reinicio de Sistema"
        >
          <RefreshCcw className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
};

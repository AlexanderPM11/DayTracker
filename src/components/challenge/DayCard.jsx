import React from 'react';
import { Trash2, CheckSquare, Square } from 'lucide-react';

export const DayCard = ({ day, index, onToggle, onDelete }) => {
  return (
    <div 
      className={`group relative flex flex-col justify-between border-2 border-black bg-white transition-all duration-200 aspect-square
      ${day.completed ? 'opacity-50 grayscale' : 'hover:-translate-y-1 hover:shadow-[4px_4px_0px_#000]'}`}
    >
      {/* Header Bar */}
      <div className={`p-2 border-b-2 border-black flex justify-between items-center ${day.completed ? 'bg-black text-white' : 'bg-brand-primary'}`}>
        <span className="font-display font-black text-xs uppercase tracking-wider">
          {day.label}
        </span>
        <button 
          onClick={onDelete}
          className="opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-600 focus:opacity-100"
          aria-label="Eliminar Día"
        >
          <Trash2 className="w-3 h-3" />
        </button>
      </div>

      {/* Content Area - Now purely visual */}
      <div className="flex-1 flex items-center justify-center p-2 relative overflow-hidden bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[16px_16px]">
        {/* Index Number */}
        <span className={`font-display font-black text-6xl md:text-8xl select-none transition-transform duration-300 ${day.completed ? 'text-black' : 'text-gray-200 group-hover:scale-110 group-hover:text-gray-300'}`}>
          {index + 1}
        </span>
      </div>

      {/* Footer Bar */}
      <div className="p-2 border-t-2 border-black flex justify-center items-center bg-gray-50 cursor-pointer hover:bg-black hover:text-white transition-colors" onClick={onToggle}>
        <div className="flex items-center gap-1 font-display font-black text-[10px] uppercase">
          {day.completed ? (
            <>
              <CheckSquare className="w-4 h-4" />
              <span>Verificado</span>
            </>
          ) : (
            <>
              <Square className="w-4 h-4" />
              <span>Completar</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Trash2, CheckSquare, Square, Edit3 } from 'lucide-react';

export const DayCard = ({ day, index, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(day.content);

  const startEditing = () => {
    setIsEditing(true);
    setEditValue(day.content);
  };

  const handleSave = () => {
    onEdit(day.id, editValue);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    }
    if (e.key === 'Escape') {
      setIsEditing(false);
      setEditValue(day.content);
    }
  };

  return (
    <div 
      className={`group relative flex flex-col justify-between border-2 border-black bg-white transition-all duration-200 
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

      {/* Content Area */}
      <div className="flex-1 p-3 min-h-[80px] font-mono text-xs leading-tight relative">
        {isEditing ? (
          <textarea
            autoFocus
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            className="w-full h-full min-h-[60px] bg-transparent resize-none border-none outline-none"
            placeholder="Registrar datos..."
          />
        ) : (
          <p 
            onClick={startEditing}
            className="cursor-text h-full whitespace-pre-wrap break-word"
          >
            {day.content || <span className="opacity-30 italic">Ingresar datos...</span>}
          </p>
        )}
        
        {/* Index Watermark */}
        <span className="absolute bottom-1 right-2 font-display font-black text-4xl opacity-5 pointer-events-none select-none">
          {index + 1}
        </span>
      </div>

      {/* Footer Bar */}
      <div className="p-2 border-t-2 border-black flex justify-between items-center bg-gray-50">
        <button 
          onClick={onToggle}
          className="flex items-center gap-1 font-display font-black text-[10px] uppercase hover:underline"
        >
          {day.completed ? (
            <>
              <CheckSquare className="w-4 h-4 text-black" />
              <span>Verificado</span>
            </>
          ) : (
            <>
              <Square className="w-4 h-4" />
              <span>Marcar</span>
            </>
          )}
        </button>
        
        {!isEditing && (
          <button onClick={startEditing} className="opacity-0 group-hover:opacity-100 transition-opacity hover:text-brand-secondary focus:opacity-100">
             <Edit3 className="w-3 h-3" />
          </button>
        )}
      </div>
    </div>
  );
};

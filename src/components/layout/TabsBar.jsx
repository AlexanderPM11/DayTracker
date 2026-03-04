import React from 'react';
import { Plus, X, Edit2 } from 'lucide-react';

export const TabsBar = ({ 
  tabs, 
  activeTabId, 
  onAddTab, 
  onSwitchTab, 
  onDeleteTab, 
  onRenameTab 
}) => {
  return (
    <div className="w-full bg-white border-b-4 border-black flex items-end px-4 pt-4 overflow-x-auto">
      <div className="flex gap-2">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTabId;
          return (
            <div 
              key={tab.id}
              className={`group flex items-center border-t-2 border-l-2 border-r-2 border-black px-4 py-2 cursor-pointer transition-colors
                ${isActive ? 'bg-black text-white' : 'bg-gray-100 text-black hover:bg-gray-200'}
              `}
              style={{ marginBottom: isActive ? '-4px' : '0' }}
            >
              <span 
                onClick={() => onSwitchTab(tab.id)}
                className="font-display font-black text-sm uppercase mr-4 whitespace-nowrap"
              >
                {tab.name}
              </span>
              
              {/* Tab Actions */}
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={(e) => { e.stopPropagation(); onRenameTab(tab.id); }}
                  className={`hover:text-brand-primary ${isActive ? 'text-gray-400' : 'text-gray-500'}`}
                  title="Renombrar"
                >
                  <Edit2 className="w-3 h-3" />
                </button>
                {tabs.length > 1 && (
                  <button 
                    onClick={(e) => { e.stopPropagation(); onDeleteTab(tab.id); }}
                    className={`hover:text-red-500 ${isActive ? 'text-gray-400' : 'text-gray-500'}`}
                    title="Eliminar"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
        
        <button 
          onClick={onAddTab}
          className="flex items-center gap-1 font-display font-black text-xs uppercase px-4 py-2 border-2 border-black bg-brand-primary hover:bg-black hover:text-white transition-colors mb-2 ml-2 shadow-[2px_2px_0px_#000]"
        >
          <Plus className="w-4 h-4" /> Nuevo
        </button>
      </div>
    </div>
  );
};

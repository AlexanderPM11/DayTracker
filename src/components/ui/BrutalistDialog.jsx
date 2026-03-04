import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const BrutalistDialog = ({ 
  isOpen, 
  title, 
  message, 
  type = 'alert', // 'alert', 'confirm', 'prompt'
  defaultValue = '',
  onClose, 
  onConfirm 
}) => {
  const [inputValue, setInputValue] = useState(defaultValue);

  useEffect(() => {
    if (isOpen) {
      setInputValue(defaultValue);
    }
  }, [isOpen, defaultValue]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (type === 'prompt') {
      onConfirm(inputValue);
    } else {
      onConfirm(true);
    }
    onClose();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleConfirm();
    if (e.key === 'Escape') onClose();
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      >
        <motion.div 
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          className="bg-white border-4 border-black w-full max-w-md shadow-[8px_8px_0px_#000] flex flex-col"
        >
          {/* Header */}
          <div className="bg-brand-primary border-b-4 border-black p-4 flex justify-between items-center">
            <h2 className="font-display font-black text-xl uppercase tracking-widest">{title}</h2>
          </div>

          {/* Body */}
          <div className="p-6 font-mono text-sm leading-relaxed">
            <p className="mb-4">{message}</p>
            
            {type === 'prompt' && (
              <input 
                type="text"
                autoFocus
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full border-2 border-black p-3 font-mono text-base outline-none focus:bg-brand-primary/10 transition-colors"
              />
            )}
          </div>

          {/* Footer Actions */}
          <div className="p-4 border-t-4 border-black bg-gray-50 flex justify-end gap-4">
            {type !== 'alert' && (
              <button 
                onClick={onClose}
                className="px-6 py-2 border-2 border-black font-display font-black uppercase hover:bg-black hover:text-white transition-colors"
              >
                Cancelar
              </button>
            )}
            <button 
              onClick={handleConfirm}
              className="px-6 py-2 border-2 border-black bg-brand-primary font-display font-black uppercase shadow-[4px_4px_0px_#000] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0px_#000] transition-all"
            >
              {type === 'alert' ? 'Entendido' : 'Confirmar'}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

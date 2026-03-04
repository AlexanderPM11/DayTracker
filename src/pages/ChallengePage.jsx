import React, { useState } from 'react';
import { useChallengeTabs } from '../hooks/useChallenge';
import { Header } from '../components/layout/Header';
import { TabsBar } from '../components/layout/TabsBar';
import { ChallengeGrid } from '../components/challenge/ChallengeGrid';
import { BrutalistDialog } from '../components/ui/BrutalistDialog';

export const ChallengePage = () => {
  const { 
    tabs,
    activeTabId,
    days, 
    addDay, 
    generateDays, 
    deleteDay, 
    toggleComplete, 
    editDayContent,
    resetAll,
    addTab,
    switchTab,
    deleteTab,
    renameTab
  } = useChallengeTabs();

  // Dialog State
  const [dialogConfig, setDialogConfig] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'alert',
    defaultValue: '',
    onConfirm: () => {}
  });

  const closeDialog = () => setDialogConfig(prev => ({ ...prev, isOpen: false }));

  const openAlert = (title, message) => {
    setDialogConfig({
      isOpen: true,
      title,
      message,
      type: 'alert',
      onConfirm: closeDialog
    });
  };

  const openConfirm = (title, message, onConfirm) => {
    setDialogConfig({
      isOpen: true,
      title,
      message,
      type: 'confirm',
      onConfirm: (val) => {
        onConfirm(val);
        closeDialog();
      }
    });
  };

  const openPrompt = (title, message, defaultValue, onConfirm) => {
    setDialogConfig({
      isOpen: true,
      title,
      message,
      defaultValue,
      type: 'prompt',
      onConfirm: (val) => {
        onConfirm(val);
        closeDialog();
      }
    });
  };

  return (
    <div className="min-h-screen bg-brand-gray flex flex-col font-mono text-black selection:bg-black selection:text-brand-primary">
      <BrutalistDialog 
        {...dialogConfig}
        onClose={closeDialog}
      />

      {/* Background Grid Pattern */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />
      
      <div className="relative z-10 flex flex-col flex-1">
        <Header 
          onAdd={addDay} 
          onReset={() => resetAll(openConfirm)} 
        />
        
        <TabsBar 
          tabs={tabs}
          activeTabId={activeTabId}
          onAddTab={() => addTab(openPrompt)}
          onSwitchTab={switchTab}
          onDeleteTab={(id) => deleteTab(id, openConfirm, openAlert)}
          onRenameTab={(id) => renameTab(id, openPrompt)}
        />
        
        <main className="flex-1 w-full max-w-[1800px] mx-auto p-4 md:p-8">
          <ChallengeGrid 
            days={days} 
            onToggle={toggleComplete} 
            onDelete={deleteDay} 
            onEdit={editDayContent}
            onGenerate={generateDays}
          />
        </main>

        <footer className="border-t-4 border-black bg-white p-6 mt-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
               <span className="w-4 h-4 rounded-full bg-green-500 animate-pulse" />
               <span className="font-display font-black uppercase tracking-widest text-sm">Sistemas Nominales</span>
            </div>
            <p className="font-mono text-xs font-bold opacity-50 uppercase tracking-[0.2em]">
               V3.0.0 // EDICIÓN BRUTALISTA
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

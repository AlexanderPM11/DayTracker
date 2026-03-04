import { useState, useEffect } from 'react';

const MULTI_STORAGE_KEY = 'challenge_tracker_multi_v1';
const OLD_STORAGE_KEY = 'challenge_tracker_brutalist';

export const useChallengeTabs = () => {
  const [data, setData] = useState(() => {
    const multiSaved = localStorage.getItem(MULTI_STORAGE_KEY);
    if (multiSaved) {
      return JSON.parse(multiSaved);
    }
    
    const oldSaved = localStorage.getItem(OLD_STORAGE_KEY);
    const oldDays = oldSaved ? JSON.parse(oldSaved) : [];
    
    return {
      activeTabId: 'default',
      tabs: [
        { id: 'default', name: 'Reto Principal', days: oldDays }
      ]
    };
  });

  useEffect(() => {
    localStorage.setItem(MULTI_STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const activeTab = data.tabs.find(t => t.id === data.activeTabId) || data.tabs[0];
  const days = activeTab.days;

  const updateActiveTabDays = (newDays) => {
    setData(prev => ({
      ...prev,
      tabs: prev.tabs.map(tab => 
        tab.id === prev.activeTabId ? { ...tab, days: newDays } : tab
      )
    }));
  };

  const addDay = () => {
    const newDay = {
      id: Date.now(),
      label: `DÍA ${String(days.length + 1).padStart(3, '0')}`,
      content: '',
      completed: false
    };
    updateActiveTabDays([...days, newDay]);
  };

  const generateDays = (count) => {
    const newDays = Array.from({ length: count }, (_, i) => ({
      id: Date.now() + i,
      label: `DÍA ${String(i + 1).padStart(3, '0')}`,
      content: '',
      completed: false
    }));
    updateActiveTabDays(newDays);
  };

  const deleteDay = (id) => {
    updateActiveTabDays(days.filter(day => day.id !== id));
  };

  const toggleComplete = (id) => {
    updateActiveTabDays(days.map(day => 
      day.id === id ? { ...day, completed: !day.completed } : day
    ));
  };

  const resetAll = (onConfirmReq) => {
    onConfirmReq(
      "ADVERTENCIA DE VACIADO",
      "¿Proceder con la purga del progreso en esta plantilla?",
      () => updateActiveTabDays([])
    );
  };

  const addTab = (onPromptReq) => {
    onPromptReq(
      "NUEVO RETO",
      "Ingresa el nombre de la nueva plantilla/reto:",
      `Reto ${data.tabs.length + 1}`,
      (name) => {
        if (!name) return;
        const newTab = {
          id: Date.now().toString(),
          name,
          days: []
        };
        setData(prev => ({
          activeTabId: newTab.id,
          tabs: [...prev.tabs, newTab]
        }));
      }
    );
  };

  const switchTab = (id) => {
    setData(prev => ({ ...prev, activeTabId: id }));
  };

  const deleteTab = (id, onConfirmReq, onAlertReq) => {
    if (data.tabs.length <= 1) {
      if (onAlertReq) onAlertReq("OPERACIÓN INVÁLIDA", "No puedes eliminar la única pestaña existente.");
      return;
    }
    
    onConfirmReq(
      "ELIMINAR PLANTILLA",
      "¿Seguro que deseas eliminar esta plantilla y TODO su progreso de forma permanente?",
      () => {
        setData(prev => {
          const newTabs = prev.tabs.filter(t => t.id !== id);
          return {
            activeTabId: prev.activeTabId === id ? newTabs[0].id : prev.activeTabId,
            tabs: newTabs
          };
        });
      }
    );
  };

  const renameTab = (id, onPromptReq) => {
    const tabToRename = data.tabs.find(t => t.id === id);
    onPromptReq(
      "RENOMBRAR RETO",
      "Ingresa el nuevo nombre:",
      tabToRename.name,
      (newName) => {
        if (!newName) return;
        setData(prev => ({
          ...prev,
          tabs: prev.tabs.map(tab => 
            tab.id === id ? { ...tab, name: newName } : tab
          )
        }));
      }
    );
  };

  return { 
    tabs: data.tabs,
    activeTabId: data.activeTabId,
    activeTabName: activeTab.name,
    days, 
    addDay, 
    generateDays, 
    deleteDay, 
    toggleComplete, 
    resetAll,
    addTab,
    switchTab,
    deleteTab,
    renameTab
  };
};

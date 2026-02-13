
import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import DocumentGenerator from './components/DocumentGenerator';
import Dashboard from './components/Dashboard';
import Auth from './components/Auth';
import Toast from './components/Toast';
import { LegalDocument, ToastMessage, User } from './types';
import { api } from './services/api';

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'generator' | 'dashboard' | 'login' | 'signup'>('landing');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [user, setUser] = useState<User | null>(null);
  const [documents, setDocuments] = useState<LegalDocument[]>([]);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const loadDocuments = useCallback(async () => {
    try {
      const docs = await api.fetchDocuments();
      setDocuments(docs);
    } catch (e) {
      console.error("Critical error fetching documents:", e);
      // Final safety net: try localStorage directly
      const saved = localStorage.getItem('legal_docs');
      if (saved) setDocuments(JSON.parse(saved));
    }
  }, []);

  // Initializations
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    const savedUser = localStorage.getItem('user');

    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }
    if (savedUser) setUser(JSON.parse(savedUser));
    
    loadDocuments();
  }, [loadDocuments]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const addToast = (text: string, type: 'success' | 'error' | 'info' | 'warning' = 'info') => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, text, type }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleAuth = (name: string, email: string) => {
    const newUser = { id: Date.now().toString(), name, email };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    addToast(`Logged in as ${name}`, 'success');
    setView('landing');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    addToast('Logged out successfully', 'info');
    setView('landing');
  };

  const onDocumentSave = (newDoc: any) => {
    // Refresh list from the source of truth (api might have saved locally or to server)
    setDocuments(prev => {
      // Avoid duplicates if save returned a doc already in list
      const exists = prev.find(d => d.id === newDoc.id);
      if (exists) return prev;
      return [newDoc, ...prev];
    });
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this document?")) {
      const updated = documents.filter(d => d.id !== id);
      setDocuments(updated);
      localStorage.setItem('legal_docs', JSON.stringify(updated));
      addToast("Document removed from local archive.", "info");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <Navbar 
        activeView={view} 
        setView={setView} 
        user={user} 
        onLogout={handleLogout}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      
      <main className="flex-1">
        {view === 'landing' && <LandingPage onStart={() => setView('generator')} />}
        {view === 'generator' && <DocumentGenerator onSave={onDocumentSave} addToast={addToast} />}
        {view === 'dashboard' && (
          <Dashboard 
            documents={documents} 
            onView={() => setView('generator')} 
            onDelete={handleDelete} 
          />
        )}
        {(view === 'login' || view === 'signup') && (
          <Auth 
            type={view} 
            onAuth={handleAuth} 
            onToggle={() => setView(view === 'login' ? 'signup' : 'login')} 
          />
        )}
      </main>

      <Toast toasts={toasts} removeToast={removeToast} />
      
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-left {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fade-in-right {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slide-in-down {
          from { transform: translateY(-100%); }
          to { transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.5s ease-out forwards; }
        .animate-fade-in-left { animation: fade-in-left 0.5s ease-out forwards; }
        .animate-fade-in-right { animation: fade-in-right 0.5s ease-out forwards; }
        .animate-slide-in-down { animation: slide-in-down 0.3s ease-out forwards; }
        .animate-slide-in-up { animation: fade-in-up 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default App;

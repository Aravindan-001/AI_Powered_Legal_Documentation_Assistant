
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import DocumentGenerator from './components/DocumentGenerator';
import Dashboard from './components/Dashboard';
import Auth from './components/Auth';
import Toast from './components/Toast';
import { LegalDocument, ToastMessage, DocStatus, User, RiskLevel } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'generator' | 'dashboard' | 'login' | 'signup'>('landing');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [user, setUser] = useState<User | null>(null);
  const [documents, setDocuments] = useState<LegalDocument[]>([]);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Initializations
  useEffect(() => {
    const savedDocs = localStorage.getItem('legal_docs');
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    const savedUser = localStorage.getItem('user');

    if (savedDocs) setDocuments(JSON.parse(savedDocs));
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  useEffect(() => {
    localStorage.setItem('legal_docs', JSON.stringify(documents));
  }, [documents]);

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

  const saveDocument = (docData: any) => {
    const newDoc: LegalDocument = {
      id: docData.id || Math.random().toString(36).substr(2, 9),
      type: docData.type,
      title: `${docData.type} - ${docData.fullName}`,
      content: docData.content,
      createdAt: docData.createdAt || new Date().toISOString(),
      status: DocStatus.DRAFT,
      riskLevel: docData.riskLevel || RiskLevel.LOW,
      relevantActs: docData.relevantActs || ['Indian Contract Act, 1872'],
      versionHistory: [{
        id: '1',
        timestamp: new Date().toISOString(),
        content: docData.content,
        author: user?.name || 'System'
      }],
      metadata: {
        fullName: docData.fullName,
        address: docData.address,
        city: docData.city,
        duration: docData.duration,
        amount: docData.amount,
      }
    };
    setDocuments(prev => [newDoc, ...prev]);
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
        {view === 'generator' && <DocumentGenerator onSave={saveDocument} addToast={addToast} />}
        {view === 'dashboard' && <Dashboard documents={documents} onView={() => setView('generator')} onDelete={(id) => setDocuments(prev => prev.filter(d => d.id !== id))} />}
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

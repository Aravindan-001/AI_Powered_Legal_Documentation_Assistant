
import React, { useState } from 'react';
import { User } from '../types';

interface NavbarProps {
  activeView: string;
  setView: (view: any) => void;
  user: User | null;
  onLogout: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeView, setView, user, onLogout, theme, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 z-40 no-print transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center cursor-pointer" onClick={() => setView('landing')}>
            <div className="w-10 h-10 bg-blue-900 dark:bg-blue-600 rounded-lg flex items-center justify-center mr-3 shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
              </svg>
            </div>
            <span className="text-xl font-bold text-blue-900 dark:text-blue-100">Legalis<span className="text-blue-500">AI</span></span>
          </div>

          <div className="hidden md:flex space-x-8 items-center">
            {['landing', 'generator', 'dashboard'].map((v) => (
              <button 
                key={v}
                onClick={() => setView(v as any)}
                className={`text-sm font-medium capitalize transition-colors ${activeView === v ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400'}`}
              >
                {v === 'landing' ? 'Home' : v}
              </button>
            ))}

            <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-2"></div>

            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors">
              {theme === 'light' ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 9H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              )}
            </button>

            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center space-x-2 p-1 pl-3 rounded-full border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                >
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{user.name}</span>
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 font-bold text-xs overflow-hidden">
                    {user.avatar ? <img src={user.avatar} className="w-full h-full object-cover" /> : user.name.charAt(0)}
                  </div>
                </button>
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl py-2 z-50 animate-slide-in-up">
                    <button className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800">Profile Settings</button>
                    <button className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800">My Subscriptions</button>
                    <div className="border-t border-slate-100 dark:border-slate-800 my-1"></div>
                    <button onClick={onLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 font-medium">Log Out</button>
                  </div>
                )}
              </div>
            ) : (
              <button 
                onClick={() => setView('login')}
                className="px-5 py-2 bg-blue-900 dark:bg-blue-600 text-white rounded-full text-sm font-bold hover:bg-blue-800 transition-all"
              >
                Sign In
              </button>
            )}
          </div>

          <div className="md:hidden flex items-center space-x-4">
            <button onClick={toggleTheme} className="text-slate-500 dark:text-slate-400">
              {theme === 'light' ? <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg> : <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 9H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 dark:text-slate-400 p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 animate-slide-in-down">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {['landing', 'generator', 'dashboard'].map((v) => (
              <button 
                key={v}
                onClick={() => { setView(v as any); setIsOpen(false); }}
                className="block w-full text-left px-3 py-2 text-base font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600"
              >
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </button>
            ))}
            {!user && (
              <button onClick={() => { setView('login'); setIsOpen(false); }} className="w-full mt-4 py-3 bg-blue-900 text-white rounded-lg font-bold">Sign In</button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

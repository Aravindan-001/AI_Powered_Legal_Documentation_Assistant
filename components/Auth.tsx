
import React, { useState } from 'react';

interface AuthProps {
  type: 'login' | 'signup';
  onAuth: (name: string, email: string) => void;
  onToggle: () => void;
}

const Auth: React.FC<AuthProps> = ({ type, onAuth, onToggle }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAuth(formData.name || formData.email.split('@')[0], formData.email);
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 flex items-center justify-center bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 p-10 animate-fade-in-up">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-blue-900 dark:bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A10.003 10.003 0 0014 2.05V1c0-1.1.9-2 2-2h4a2 2 0 012 2v1c0 1.1-.9 2-2 2h-4c-1.1 0-2-.9-2-2V2.05a10.003 10.003 0 00-6.613 18.481l.054.09" />
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold text-blue-900 dark:text-blue-100">{type === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2">{type === 'login' ? 'Enter your details to access your documents.' : 'Join LegalisAI for smarter legal drafting.'}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {type === 'signup' && (
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Full Name</label>
              <input 
                type="text" 
                required 
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white"
                placeholder="John Doe"
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Email Address</label>
            <input 
              type="email" 
              required 
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white"
              placeholder="john@example.com"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Password</label>
            <input 
              type="password" 
              required 
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white"
              placeholder="••••••••"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button className="w-full py-4 bg-blue-900 dark:bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-800 dark:hover:bg-blue-700 transition-all shadow-lg active:scale-95">
            {type === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="mt-8 text-center text-sm">
          <span className="text-slate-500 dark:text-slate-400">{type === 'login' ? "Don't have an account?" : "Already have an account?"}</span>
          <button onClick={onToggle} className="ml-2 font-bold text-blue-900 dark:text-blue-400 hover:underline">{type === 'login' ? 'Sign Up' : 'Log In'}</button>
        </div>
      </div>
    </div>
  );
};

export default Auth;

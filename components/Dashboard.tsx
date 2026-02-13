
import React, { useState } from 'react';
import { LegalDocument, DocStatus, RiskLevel } from '../types';

interface DashboardProps {
  documents: LegalDocument[];
  onView: (doc: LegalDocument) => void;
  onDelete: (id: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ documents, onView, onDelete }) => {
  const [selectedHistory, setSelectedHistory] = useState<LegalDocument | null>(null);

  return (
    <div className="pt-24 pb-20 px-4 max-w-7xl mx-auto min-h-screen">
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-extrabold text-blue-900 dark:text-blue-100">Archive Vault</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Historical oversight and version control for your legal assets.</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="bg-white dark:bg-slate-900 px-6 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <span className="text-2xl font-bold text-blue-900 dark:text-blue-100 mr-2">{documents.length}</span>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Assets</span>
          </div>
        </div>
      </div>

      {documents.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-24 text-center border border-slate-200 dark:border-slate-800 shadow-xl transition-colors animate-fade-in-up">
          <div className="w-24 h-24 bg-blue-50 dark:bg-blue-900/30 text-blue-900 dark:text-blue-400 rounded-full flex items-center justify-center mx-auto mb-8">
             <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
          </div>
          <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-100 mb-3">No Archived Records</h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto">Your vault is currently empty. Start drafting documents to build your secure legal repository.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {documents.map((doc) => (
            <div key={doc.id} className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg border border-slate-200 dark:border-slate-800 p-8 hover:shadow-2xl transition-all group flex flex-col h-full animate-fade-in-up">
              <div className="flex justify-between items-start mb-6">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{doc.type}</span>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 truncate group-hover:text-blue-600 transition-colors">{doc.metadata.fullName}</h3>
                </div>
                <div className={`p-1 rounded-full ${
                  doc.riskLevel === RiskLevel.LOW ? 'text-green-500' : doc.riskLevel === RiskLevel.MEDIUM ? 'text-amber-500' : 'text-red-500'
                }`}>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8" /></svg>
                </div>
              </div>
              
              <div className="flex-1 space-y-3 mb-8">
                <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  {doc.metadata.city}
                </div>
                <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  {new Date(doc.createdAt).toLocaleDateString()}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-6 border-t border-slate-100 dark:border-slate-800">
                <button 
                  onClick={() => onView(doc)}
                  className="bg-blue-900 dark:bg-blue-600 text-white py-3 rounded-xl text-xs font-bold hover:shadow-lg transition-all active:scale-95"
                >
                  View Detail
                </button>
                <button 
                  onClick={() => setSelectedHistory(doc)}
                  className="bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 py-3 rounded-xl text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 transition-all active:scale-95"
                >
                  Histories
                </button>
              </div>
              
              <button 
                onClick={() => onDelete(doc.id)}
                className="mt-4 text-[10px] font-bold text-slate-300 hover:text-red-500 uppercase tracking-tighter self-center transition-colors"
              >
                Delete Record
              </button>
            </div>
          ))}
        </div>
      )}

      {/* History Modal */}
      {selectedHistory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl animate-slide-in-up">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <h3 className="font-bold text-blue-900 dark:text-blue-100">Version Management</h3>
              <button onClick={() => setSelectedHistory(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="p-8 space-y-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center text-blue-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-slate-100">{selectedHistory.title}</p>
                  <p className="text-xs text-slate-500">ID: {selectedHistory.id.toUpperCase()}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="relative pl-6 border-l-2 border-blue-900 dark:border-blue-600">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-900 dark:bg-blue-600 shadow-md"></div>
                  <p className="text-xs font-bold text-blue-900 dark:text-blue-400 uppercase tracking-widest">v1.0 - Origin</p>
                  <p className="text-xs text-slate-500 mt-1">{new Date(selectedHistory.createdAt).toLocaleString()}</p>
                  <p className="text-xs text-slate-400 mt-1">Status: Initial Generation</p>
                </div>
                <div className="relative pl-6 border-l-2 border-slate-100 dark:border-slate-800 opacity-40">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Next Version</p>
                  <p className="text-xs text-slate-400 mt-1">Awaiting modifications...</p>
                </div>
              </div>
            </div>
            <div className="p-6 bg-slate-50 dark:bg-slate-800/50 flex justify-end">
              <button onClick={() => setSelectedHistory(null)} className="px-6 py-2 bg-blue-900 dark:bg-blue-600 text-white text-xs font-bold rounded-xl">Dismiss</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

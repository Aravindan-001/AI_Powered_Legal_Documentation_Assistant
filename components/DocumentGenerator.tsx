
import React, { useState } from 'react';
import { DocumentType, RiskLevel } from '../types';
import { api } from '../services/api';

interface DocumentGeneratorProps {
  onSave: (doc: any) => void;
  addToast: (msg: string, type: 'success' | 'error' | 'info' | 'warning') => void;
}

const DocumentGenerator: React.FC<DocumentGeneratorProps> = ({ onSave, addToast }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: DocumentType.RENTAL,
    fullName: '',
    address: '',
    city: '',
    duration: '',
    amount: '',
    customClauses: ''
  });
  const [generatedData, setGeneratedData] = useState<{content: string, riskLevel: RiskLevel, relevantActs: string[]} | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.address) {
      addToast('Please fill in required fields.', 'error');
      return;
    }

    setLoading(true);
    setGeneratedData(null);
    try {
      const data = await api.generateDocument({
        documentType: formData.type,
        fullName: formData.fullName,
        address: formData.address,
        cityState: formData.city,
        duration: formData.duration,
        amount: formData.amount,
        additionalClauses: formData.customClauses
      });
      
      setGeneratedData(data);
      addToast('Draft generated with AI analysis.', 'success');
      if (data.riskLevel === RiskLevel.HIGH) {
        addToast('Warning: High risk clauses detected. Professional review recommended.', 'warning');
      }
    } catch (err) {
      addToast('Failed to generate document. Ensure the server is running.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveToBackend = async () => {
    if (!generatedData) return;
    try {
      const savedDoc = await api.saveDocument({
        documentType: formData.type,
        content: generatedData.content,
        riskLevel: generatedData.riskLevel,
        relevantActs: generatedData.relevantActs,
        metadata: {
          fullName: formData.fullName,
          address: formData.address,
          cityState: formData.city,
          duration: formData.duration,
          amount: formData.amount,
          additionalClauses: formData.customClauses
        }
      });
      onSave(savedDoc);
      addToast('Document archived securely in database.', 'success');
    } catch (err) {
      addToast('Failed to save document to server.', 'error');
    }
  };

  return (
    <div className="pt-24 pb-20 px-4 max-w-7xl mx-auto min-h-screen">
      <div className="grid lg:grid-cols-2 gap-10">
        
        {/* Form Column */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 no-print transition-colors animate-fade-in-left">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-1.5 h-8 bg-blue-900 dark:bg-blue-600 rounded-full"></div>
            <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-100">Draft Parameters</h2>
          </div>
          <form onSubmit={handleGenerate} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Document Type</label>
              <select 
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value as DocumentType})}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white"
              >
                {Object.values(DocumentType).map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Primary Party Name *</label>
                <input 
                  type="text" required
                  placeholder="e.g. Acme Corp"
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Jurisdiction/City *</label>
                <input 
                  type="text" required
                  placeholder="Mumbai, IN"
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Duration</label>
                <input 
                  type="text" placeholder="12 Months"
                  value={formData.duration}
                  onChange={(e) => setFormData({...formData, duration: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Consideration (₹)</label>
                <input 
                  type="text" placeholder="50,000"
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Contextual Clauses</label>
              <textarea 
                rows={3} placeholder="Describe specific needs or special conditions..."
                value={formData.customClauses}
                onChange={(e) => setFormData({...formData, customClauses: e.target.value})}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none dark:text-white resize-none"
              />
            </div>

            <button 
              type="submit" disabled={loading}
              className="w-full py-4 bg-blue-900 dark:bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-800 transition-all disabled:opacity-50 flex items-center justify-center shadow-xl group"
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 mr-3 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>
              ) : (
                <>
                  Generate Professional Draft
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Preview Column */}
        <div className="relative animate-fade-in-right">
          <div className={`bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 h-full flex flex-col transition-colors ${!generatedData && !loading ? 'p-12 items-center justify-center text-slate-400' : 'p-0'}`}>
            {!generatedData && !loading && (
              <div className="text-center">
                <div className="w-24 h-24 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-8 border border-slate-100 dark:border-slate-700 shadow-inner">
                  <svg className="w-10 h-10 text-slate-300 dark:text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                </div>
                <h3 className="text-xl font-bold text-slate-600 dark:text-slate-400">Ready for Analysis</h3>
                <p className="max-w-xs mt-3 text-sm leading-relaxed">Enter document parameters to generate an AI-powered legal draft with risk assessment.</p>
              </div>
            )}

            {loading && (
              <div className="absolute inset-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md z-10 flex flex-col items-center justify-center p-12 text-center rounded-3xl">
                <div className="relative mb-8">
                  <div className="w-20 h-20 border-4 border-blue-900/10 dark:border-blue-600/10 border-t-blue-900 dark:border-t-blue-600 rounded-full animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-8 h-8 text-blue-900 dark:text-blue-600 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-blue-900 dark:text-blue-100">AI Counselor Thinking...</h3>
                <p className="mt-2 text-slate-500 dark:text-slate-400 text-sm italic">Synthesizing relevant acts and drafting clauses...</p>
              </div>
            )}

            {generatedData && (
              <div className="h-full flex flex-col">
                <div className="p-6 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 rounded-t-3xl no-print flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      generatedData.riskLevel === RiskLevel.LOW ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300' : 
                      generatedData.riskLevel === RiskLevel.MEDIUM ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300' :
                      'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300'
                    }`}>
                      Risk: {generatedData.riskLevel}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button onClick={() => window.print()} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-slate-600 dark:text-slate-300"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg></button>
                    <button onClick={handleSaveToBackend} className="px-5 py-2 bg-blue-900 dark:bg-blue-600 text-white text-xs font-bold rounded-lg hover:shadow-lg transition-all">Save Draft</button>
                  </div>
                </div>
                
                <div className="flex-1 overflow-y-auto p-10 bg-white dark:bg-slate-900 scrollbar-hide">
                  <div className="a4-container font-serif text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-wrap transition-colors">
                    {generatedData.content}
                  </div>

                  <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800 no-print">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Legal Act References</h4>
                    <div className="flex flex-wrap gap-2">
                      {generatedData.relevantActs.map((act, i) => (
                        <span key={i} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs rounded-md border border-slate-200 dark:border-slate-700">
                          {act}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentGenerator;

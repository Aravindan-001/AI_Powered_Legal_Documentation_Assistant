
import React from 'react';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="pt-16 bg-slate-50 dark:bg-slate-950 transition-colors">
      
      {/* Hero Feature Card Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute top-0 right-0 -z-10 opacity-20 pointer-events-none">
          <svg className="w-[800px] h-[800px] text-blue-900/10 dark:text-blue-500/10" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" d="M47.5,-59.2C60.7,-48.5,69.9,-32.8,74.1,-15.5C78.3,1.8,77.5,20.8,69.4,36.5C61.3,52.2,46,64.6,29.1,70.5C12.1,76.4,-6.5,75.8,-24.1,69.1C-41.6,62.4,-58,49.6,-66.9,32.8C-75.7,16,-77,0.8,-73.4,-16.2C-69.8,-33.2,-61.2,-52,-46.8,-62.4C-32.4,-72.8,-12.2,-74.8,3.9,-79.5C20,-84.2,34.3,-70,47.5,-59.2Z" transform="translate(100 100)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 rounded-[2.5rem] p-8 md:p-16 text-center shadow-2xl relative overflow-hidden animate-fade-in-up">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-widest mb-6 border border-blue-400/20 backdrop-blur-sm">
                <span className="flex h-2 w-2 rounded-full bg-blue-400 mr-2 animate-pulse"></span>
                AI Legal Documentation Agent
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
                Generate Professional <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">Legal Documents</span> in Minutes.
              </h1>
              <p className="text-lg md:text-xl text-blue-100/70 mb-10 max-w-2xl mx-auto leading-relaxed">
                LegalisAI automates the drafting process with absolute precision. Our AI agent ensures every clause is compliant, protective, and tailored to your specific jurisdiction.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button 
                  onClick={onStart}
                  className="px-10 py-5 bg-white text-blue-950 rounded-2xl font-bold text-lg hover:bg-blue-50 transition-all shadow-xl hover:shadow-white/10 active:scale-95 flex items-center justify-center gap-2"
                >
                  Generate Document
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Contract Generator',
                desc: 'Draft comprehensive service, sales, or partnership agreements effortlessly.',
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              },
              {
                title: 'NDA Builder',
                desc: 'Protect your intellectual property with ironclad Non-Disclosure Agreements.',
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              },
              {
                title: 'Rental Agreements',
                desc: 'Generate residential or commercial lease agreements with local compliance.',
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              },
              {
                title: 'Legal Notices',
                desc: 'Draft formal legal notices for recovery, breach of contract, or defamation.',
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              }
            ].map((feature, i) => (
              <div 
                key={i} 
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl hover:border-blue-500 dark:hover:border-blue-400 transition-all shadow-sm hover:shadow-xl group hover:-translate-y-2 cursor-pointer"
                onClick={onStart}
              >
                <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/30 text-blue-900 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-900 group-hover:text-white transition-all">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {feature.icon}
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-3">{feature.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-blue-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-blue-900 dark:text-blue-100 mb-4">How It Works</h2>
            <p className="text-slate-500 dark:text-slate-400">Professional documentation in three simple steps.</p>
          </div>
          
          <div className="relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-blue-200 dark:bg-slate-800 -translate-y-1/2"></div>
            
            <div className="grid lg:grid-cols-3 gap-12 relative z-10">
              {[
                { step: '01', title: 'Select Type', desc: 'Choose from our extensive library of legal templates.' },
                { step: '02', title: 'Enter Details', desc: 'Provide the specific terms, parties, and context required.' },
                { step: '03', title: 'Download PDF', desc: 'Get your AI-verified, legally sound document instantly.' }
              ].map((step, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-blue-900 text-white rounded-full flex items-center justify-center text-xl font-black mb-6 border-4 border-white dark:border-slate-900 shadow-lg">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-2">{step.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm max-w-[200px]">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { title: 'Secure & Confidential', desc: 'Your data is encrypted and handled with bank-grade security protocols.', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /> },
              { title: 'AI Legal Accuracy', desc: 'Trained on thousands of case laws and statutes to ensure high compliance.', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /> },
              { title: 'Instant Generation', desc: 'No more waiting for lawyers. Get your first draft in less than 30 seconds.', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /> }
            ].map((trust, i) => (
              <div key={i} className="flex items-start space-x-6 p-6 rounded-3xl bg-slate-50 dark:bg-slate-900/30 border border-slate-100 dark:border-slate-800">
                <div className="flex-shrink-0 w-12 h-12 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center text-blue-600 shadow-sm">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {trust.icon}
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-blue-900 dark:text-blue-100 mb-1">{trust.title}</h4>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">{trust.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-blue-900 dark:text-blue-100 mb-6">Start Creating Legal Documents Today</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-10 max-w-2xl mx-auto text-lg">
            Join thousands of professionals who save time and money by using LegalisAI for their documentation needs.
          </p>
          <button 
            onClick={onStart}
            className="px-12 py-5 bg-blue-900 dark:bg-blue-600 text-white rounded-2xl font-bold text-xl hover:bg-blue-800 shadow-2xl hover:shadow-blue-500/20 active:scale-95 transition-all"
          >
            Try Now
          </button>
        </div>
      </section>

      {/* Site Footer */}
      <footer className="bg-slate-900 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center mr-3">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
              </svg>
            </div>
            <span className="text-2xl font-bold tracking-tight">LegalisAI</span>
          </div>
          <div className="flex gap-8 text-sm font-medium text-slate-400">
            <a href="#" className="hover:text-white transition-colors">Documentation</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
          <div className="text-slate-500 text-xs">
            © 2024 LegalisAI. SIH Demo Platform.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

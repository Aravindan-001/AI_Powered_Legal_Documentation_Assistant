
import React from 'react';
import { FEATURES } from '../constants';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute top-0 right-0 -z-10 opacity-10">
          <svg className="w-[600px] h-[600px]" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="#1e3a8a" d="M47.5,-59.2C60.7,-48.5,69.9,-32.8,74.1,-15.5C78.3,1.8,77.5,20.8,69.4,36.5C61.3,52.2,46,64.6,29.1,70.5C12.1,76.4,-6.5,75.8,-24.1,69.1C-41.6,62.4,-58,49.6,-66.9,32.8C-75.7,16,-77,0.8,-73.4,-16.2C-69.8,-33.2,-61.2,-52,-46.8,-62.4C-32.4,-72.8,-12.2,-74.8,3.9,-79.5C20,-84.2,34.3,-70,47.5,-59.2Z" transform="translate(100 100)" />
          </svg>
        </div>
        
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold text-blue-900 mb-6 leading-tight">
            Legal Drafting <br />
            <span className="text-blue-600">Perfected by AI.</span>
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
            Create professional, legally compliant documents in minutes. Smart drafting, 
            risk analysis, and jurisdictional intelligence at your fingertips.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={onStart}
              className="px-8 py-4 bg-blue-900 text-white rounded-full font-semibold text-lg hover:bg-blue-800 transition-all shadow-lg hover:shadow-xl active:scale-95"
            >
              Generate Document
            </button>
            <button className="px-8 py-4 bg-white text-blue-900 border border-blue-900 rounded-full font-semibold text-lg hover:bg-slate-50 transition-all">
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">Powerful Features for Modern Law</h2>
            <p className="text-slate-600">Built for individuals, lawyers, and startups.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURES.map((feature, idx) => (
              <div key={idx} className="p-8 border border-slate-100 rounded-2xl hover:border-blue-200 hover:shadow-lg transition-all group">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-900 mb-6 group-hover:bg-blue-900 group-hover:text-white transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof / Footer */}
      <footer className="bg-slate-900 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center mr-2">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              </div>
              <span className="text-2xl font-bold">LegalisAI</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Empowering legal access through artificial intelligence. We simplify complex documentation so you can focus on what matters.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-lg">Product</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Enterprise</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-lg">Legal</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
          © 2024 LegalisAI. Developed for Smart India Hackathon Demo.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

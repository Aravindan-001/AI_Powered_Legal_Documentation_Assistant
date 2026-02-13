
import React, { useState, useRef, useEffect } from 'react';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DemoModal: React.FC<DemoModalProps> = ({ isOpen, onClose }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<'english' | 'tamil' | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSelectedLanguage(null);
      setError(null);
      setIsLoading(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLanguageSelect = (lang: 'english' | 'tamil') => {
    setError(null);
    setSelectedLanguage(lang);
    setIsLoading(true);
  };

  const videoSrc = selectedLanguage === 'english' ? '/demo-english.mp4' : '/demo-tamil.mp4';

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl animate-fade-in no-print"
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-[2.5rem] shadow-2xl relative overflow-hidden animate-slide-in-up border border-white/20 dark:border-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-[110] p-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-full hover:bg-red-500 hover:text-white transition-all shadow-lg"
          aria-label="Close modal"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {!selectedLanguage ? (
          /* Language Selection Screen */
          <div className="p-12 md:p-20 text-center">
            <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/30 text-blue-900 dark:text-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-inner">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-blue-900 dark:text-blue-100 mb-4">Select Demo Language</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-10 max-w-md mx-auto">Choose your preferred language to watch the AI assistant in action.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-lg mx-auto">
              <button 
                onClick={() => handleLanguageSelect('english')}
                className="flex flex-col items-center p-8 bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent hover:border-blue-600 dark:hover:border-blue-500 rounded-[2rem] transition-all group shadow-sm hover:shadow-xl hover:-translate-y-1"
              >
                <span className="text-5xl mb-4 group-hover:scale-110 transition-transform">🇬🇧</span>
                <span className="text-xl font-bold text-blue-900 dark:text-blue-100">English Demo</span>
                <span className="text-xs text-slate-400 mt-2 font-medium uppercase tracking-widest">Global Standard</span>
              </button>
              <button 
                onClick={() => handleLanguageSelect('tamil')}
                className="flex flex-col items-center p-8 bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent hover:border-blue-600 dark:hover:border-blue-500 rounded-[2rem] transition-all group shadow-sm hover:shadow-xl hover:-translate-y-1"
              >
                <span className="text-5xl mb-4 group-hover:scale-110 transition-transform">🇮🇳</span>
                <span className="text-xl font-bold text-blue-900 dark:text-blue-100">Tamil Demo</span>
                <span className="text-xs text-slate-400 mt-2 font-medium uppercase tracking-widest">Regional Insight</span>
              </button>
            </div>
          </div>
        ) : (
          /* Video Player View */
          <div className="bg-black aspect-video relative flex items-center justify-center">
            {isLoading && !error && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-900/60 backdrop-blur-md">
                <div className="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mb-4"></div>
                <p className="text-white font-bold tracking-widest uppercase text-[10px] animate-pulse">Buffering Demo...</p>
              </div>
            )}
            
            {error ? (
              <div className="p-12 text-center bg-slate-900 w-full h-full flex flex-col items-center justify-center animate-fade-in">
                <div className="w-16 h-16 bg-red-900/30 text-red-500 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Video Unreachable</h3>
                <p className="text-slate-400 text-sm mb-8 max-w-xs">Please ensure the video file is present in the public directory.</p>
                <button 
                  onClick={() => setSelectedLanguage(null)}
                  className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-500 transition-all shadow-lg active:scale-95"
                >
                  Choose Another Language
                </button>
              </div>
            ) : (
              <video 
                ref={videoRef}
                key={videoSrc}
                src={videoSrc}
                controls
                autoPlay
                playsInline
                className="w-full h-full object-contain"
                onLoadedData={() => setIsLoading(false)}
                onWaiting={() => setIsLoading(true)}
                onPlaying={() => setIsLoading(false)}
                onError={() => {
                  setIsLoading(false);
                  setError("The video file could not be found or loaded.");
                }}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DemoModal;

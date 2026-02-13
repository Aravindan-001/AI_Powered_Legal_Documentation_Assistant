
import React, { useEffect } from 'react';
import { ToastMessage } from '../types';

interface ToastProps {
  toasts: ToastMessage[];
  removeToast: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({ toasts, removeToast }) => {
  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col gap-3 pointer-events-none">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
      ))}
    </div>
  );
};

const ToastItem: React.FC<{ toast: ToastMessage; onClose: () => void }> = ({ toast, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 6000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgStyles = {
    success: 'bg-green-600 shadow-green-900/20',
    error: 'bg-red-600 shadow-red-900/20',
    info: 'bg-blue-600 shadow-blue-900/20',
    warning: 'bg-amber-500 shadow-amber-900/20',
  }[toast.type];

  return (
    <div className={`${bgStyles} text-white px-6 py-4 rounded-2xl shadow-2xl pointer-events-auto flex items-center justify-between min-w-[320px] max-w-md animate-slide-in-right border border-white/10 backdrop-blur-md`}>
      <div className="flex items-center space-x-3">
        {toast.type === 'warning' && <svg className="w-5 h-5 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>}
        <span className="text-sm font-semibold tracking-wide leading-snug">{toast.text}</span>
      </div>
      <button onClick={onClose} className="ml-4 p-1 hover:bg-white/20 rounded-lg transition-colors">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

export default Toast;

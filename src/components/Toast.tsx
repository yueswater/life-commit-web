import React, { useEffect } from 'react';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

export type ToastType = 'success' | 'error';

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
}

const Toast = ({ message, type, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-24 right-6 z-[100] animate-in slide-in-from-right duration-300">
      <div className={`flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border ${
        type === 'success' 
          ? 'bg-[#1d232a] border-primary/50 text-white' 
          : 'bg-[#1d232a] border-red-500/50 text-white'
      }`}>
        {type === 'success' ? (
          <CheckCircle className="text-primary" size={20} />
        ) : (
          <AlertCircle className="text-red-500" size={20} />
        )}
        <span className="font-bold tracking-tight">{message}</span>
        <button onClick={onClose} className="ml-2 opacity-50 hover:opacity-100 transition-opacity">
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default Toast;
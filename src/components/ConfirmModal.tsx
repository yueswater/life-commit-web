import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  isDanger?: boolean;
}

const ConfirmModal = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText,
  cancelText,
  isDanger = true
}: ConfirmModalProps) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div className="modal modal-open z-[110]">
      <div className="modal-box bg-[#1d232a] border border-gray-800 rounded-[2.5rem] p-8 max-w-md shadow-2xl">
        <div className="flex flex-col items-center text-center gap-4">
          <div className={`p-4 rounded-full ${isDanger ? 'bg-red-500/10 text-red-500' : 'bg-primary/10 text-primary'}`}>
            <AlertTriangle size={32} />
          </div>
          
          <div className="flex flex-col gap-2">
            <h3 className="text-2xl font-black italic uppercase tracking-tighter text-white">
              {title}
            </h3>
            <p className="text-gray-400 font-medium leading-relaxed">
              {message}
            </p>
          </div>

          <div className="flex gap-3 w-full mt-4">
            <button 
              onClick={onCancel}
              className="btn flex-1 bg-gray-800 hover:bg-gray-700 border-none text-white rounded-2xl font-bold uppercase tracking-widest"
            >
              {cancelText || t('common.cancel')}
            </button>
            <button 
              onClick={onConfirm}
              className={`btn flex-1 border-none text-white rounded-2xl font-black uppercase tracking-widest shadow-lg ${
                isDanger 
                  ? 'bg-red-600 hover:bg-red-500 shadow-red-500/20' 
                  : 'bg-primary hover:bg-primary/80 shadow-primary/20'
              }`}
            >
              {confirmText || t('common.confirm')}
            </button>
          </div>
        </div>
      </div>
      <div className="modal-backdrop bg-black/80 backdrop-blur-md" onClick={onCancel}></div>
    </div>
  );
};

export default ConfirmModal;
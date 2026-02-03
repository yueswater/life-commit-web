import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sun, Moon, Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  theme: string;
  toggleTheme: () => void;
}

const MobileMenu = ({ isOpen, onClose, theme, toggleTheme }: MobileMenuProps) => {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const nextLng = i18n.language === 'zh-TW' ? 'en' : 'zh-TW';
    i18n.changeLanguage(nextLng);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: '-100%' }}
          animate={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed inset-0 z-[200] bg-base-100/60 backdrop-blur-2xl flex flex-col"
        >
          <div className="h-20 px-6 flex items-center justify-end border-b border-base-content/5">
            <button onClick={onClose} className="btn btn-ghost btn-circle">
              <X size={28} />
            </button>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center gap-12">
            <Link 
              to="/" 
              onClick={onClose} 
              className="text-4xl font-black tracking-tighter hover:text-primary transition-colors uppercase"
            >
              {t('common.home')}
            </Link>

            <div className="flex flex-col gap-6 w-full px-12">
              <button 
                onClick={toggleLanguage}
                className="btn btn-outline btn-lg rounded-2xl flex items-center gap-4 font-bold tracking-tight"
              >
                <Languages size={24} />
                {i18n.language === 'zh-TW' ? 'ENGLISH' : '中文 (台灣)'}
              </button>

              <button 
                onClick={toggleTheme}
                className="btn btn-neutral btn-lg rounded-2xl flex items-center gap-4 font-bold tracking-tight"
              >
                {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
                {theme === 'light' ? t('theme.dark') : t('theme.light')}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
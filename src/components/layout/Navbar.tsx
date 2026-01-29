import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect, useState } from 'react';
import { Sun, Moon, User as UserIcon, Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import UserSidebar from './UserSidebar';

const Navbar = () => {
  const { user, profile } = useAuth();
  const { t, i18n } = useTranslation();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const toggleLanguage = () => {
    const nextLng = i18n.language === 'zh-TW' ? 'en' : 'zh-TW';
    i18n.changeLanguage(nextLng);
  };

  return (
    <>
      <div 
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 px-6 sm:px-12 h-20 flex flex-row items-center border-b ${
          isScrolled 
            ? 'bg-base-100/70 backdrop-blur-xl border-base-300/20 shadow-lg' 
            : 'bg-base-100 border-transparent'
        }`}
      >
        <div className="flex-1">
          <Link
            to="/"
            className="btn btn-ghost text-4xl font-black italic tracking-tighter text-primary normal-case hover:bg-transparent px-0"
          >
            LifeCommit
          </Link>
        </div>

        <div className="flex flex-row items-center gap-2 sm:gap-4">
          <button
            onClick={toggleLanguage}
            className="btn btn-ghost btn-circle hover:bg-base-200"
          >
            <Languages size={24} />
          </button>

          <button
            onClick={toggleTheme}
            className="btn btn-ghost btn-circle hover:bg-base-200"
          >
            {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
          </button>

          {user ? (
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="btn btn-ghost btn-circle avatar ml-2 ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden"
            >
              <div className="w-10 rounded-full bg-neutral text-neutral-content flex items-center justify-center">
                {profile?.avatar ? (
                  <img src={profile.avatar} alt="avatar" />
                ) : (
                  <UserIcon size={20} />
                )}
              </div>
            </button>
          ) : (
            <div className="flex flex-row items-center gap-3 ml-2">
              <Link
                to="/login"
                className="btn btn-ghost px-4 min-h-0 h-10 font-bold hover:bg-base-200 rounded-xl text-base font-huninn"
              >
                {t('common.login')}
              </Link>
              <Link
                to="/register"
                className="btn btn-primary px-6 min-h-0 h-10 font-black rounded-xl shadow-lg shadow-primary/20 uppercase tracking-tighter text-base-200 font-huninn"
              >
                {t('common.register')}
              </Link>
            </div>
          )}
        </div>
      </div>

      <UserSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <div className="h-20" />
    </>
  );
};

export default Navbar;
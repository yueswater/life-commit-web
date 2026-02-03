import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Github, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="w-full py-10 bg-base-100 text-base-content border-t border-base-300 flex flex-col items-center">
      <nav className="flex flex-row flex-wrap justify-center gap-x-8 gap-y-4 mb-8">
        <Link to="/" className="text-sm font-bold opacity-70 hover:opacity-100 transition-opacity">
          {t('common.home')}
        </Link>
        <Link to="/about" className="text-sm font-bold opacity-70 hover:opacity-100 transition-opacity">
          {t('common.about')}
        </Link>
        <Link to="/contact" className="text-sm font-bold opacity-70 hover:opacity-100 transition-opacity">
          {t('common.contact')}
        </Link>
      </nav>

      <div className="flex flex-row gap-6 mb-8">
        <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
          <Github size={22} />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
          <Twitter size={22} />
        </a>
        <a href="mailto:contact@lifecommit.com" className="hover:text-primary transition-colors">
          <Mail size={22} />
        </a>
      </div>

      <div className="text-center px-4">
        <p className="font-black text-2xl italic tracking-tighter text-primary mb-2">
          LifeCommit
        </p>
        <p className="text-[10px] uppercase tracking-widest opacity-40 font-bold">
          Copyright © 2026 - All right reserved by Aircraft
        </p>
      </div>
    </footer>
  );
};

export default Footer;
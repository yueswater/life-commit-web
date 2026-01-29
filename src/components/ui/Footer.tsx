import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Github, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer footer-center p-10 bg-base-100 text-base-content rounded border-t border-base-300">
      <nav className="grid grid-flow-col gap-4">
        <Link to="/" className="link link-hover">
          {t('common.home') || 'Home'}
        </Link>
        <Link to="/about" className="link link-hover">
          {t('common.about') || 'About'}
        </Link>
        <Link to="/contact" className="link link-hover">
          {t('common.contact') || 'Contact'}
        </Link>
      </nav>
      <nav>
        <div className="grid grid-flow-col gap-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="btn btn-ghost btn-circle"
          >
            <Github size={24} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className="btn btn-ghost btn-circle"
          >
            <Twitter size={24} />
          </a>
          <a
            href="mailto:contact@lifecommit.com"
            className="btn btn-ghost btn-circle"
          >
            <Mail size={24} />
          </a>
        </div>
      </nav>
      <aside>
        <p className="font-bold text-lg italic tracking-tighter">LifeCommit</p>
        <p>Copyright © 2026 - All right reserved by Anthony Sung</p>
      </aside>
    </footer>
  );
};

export default Footer;

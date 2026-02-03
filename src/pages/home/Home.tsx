import { Link } from 'react-router-dom';
import { ArrowRight, Flame } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import HeroPreview from './HeroPreview';

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-base-100 flex flex-col items-center pt-12 md:pt-20 px-4 md:px-6 pb-20 md:pb-32">
      <div className="text-center max-w-4xl flex flex-col items-center gap-6 md:gap-8">
        <div className="badge badge-primary badge-outline py-4 px-5 md:px-6 gap-2 font-black italic uppercase tracking-widest animate-bounce text-xs md:text-sm">
          <Flame size={16} /> {t('home.badge')}
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black italic tracking-tighter uppercase leading-[0.9] font-huninn">
          {t('home.titlePart1')} <br />
          <span className="text-primary">{t('home.titlePart2')}</span>
        </h1>

        <p className="text-base md:text-xl text-gray-400 font-medium max-w-lg md:max-w-2xl mx-auto px-2">
          {t('home.description')}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-6 w-full sm:w-auto px-6 sm:px-0">
          <Link
            to="/register"
            className="btn btn-primary btn-lg rounded-3xl sm:rounded-[2rem] px-8 font-black italic uppercase tracking-tighter gap-3 shadow-2xl text-base-100 border-none font-huninn w-full sm:w-auto"
          >
            {t('home.getStarted')} <ArrowRight size={20} />
          </Link>
          <Link
            to="/login"
            className="btn btn-ghost btn-lg rounded-3xl px-8 font-black italic uppercase tracking-tighter w-full sm:w-auto"
          >
            {t('home.login')}
          </Link>
        </div>
      </div>

      <div className="w-full mt-12 md:mt-20 overflow-hidden">
        <HeroPreview />
      </div>
    </div>
  );
};

export default Home;
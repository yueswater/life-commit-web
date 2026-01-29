import { Link } from 'react-router-dom';
import { ArrowRight, Flame } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import HeroPreview from './HeroPreview';

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-base-100 flex flex-col items-center pt-20 px-6 pb-32">
      <div className="text-center max-w-3xl flex flex-col items-center gap-6">
        <div className="badge badge-primary badge-outline py-4 px-6 gap-2 font-black italic uppercase tracking-widest animate-bounce">
          <Flame size={16} /> {t('home.badge')}
        </div>

        <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase leading-none font-huninn">
          {t('home.titlePart1')} <br />
          <span className="text-primary">{t('home.titlePart2')}</span>
        </h1>

        <p className="text-lg text-gray-400 font-medium max-w-xl mx-auto">
          {t('home.description')}
        </p>

        <div className="flex gap-4 mt-4">
          <Link
            to="/register"
            className="btn btn-lg rounded-3xl px-8 font-black italic uppercase tracking-tighter gap-3 shadow-xl bg-primary backdrop-blur-md text-base-100 border-none font-huninn"
          >
            {t('home.getStarted')} <ArrowRight size={20} />
          </Link>
          <Link
            to="/login"
            className="btn btn-ghost btn-lg rounded-3xl px-8 font-black italic uppercase tracking-tighter"
          >
            {t('home.login')}
          </Link>
        </div>
      </div>

      <HeroPreview />
    </div>
  );
};

export default Home;
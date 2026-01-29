import { Book, Target, Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const HeroPreview = () => {
  const { t } = useTranslation();

  return (
    <div className="relative w-full max-w-5xl mx-auto mt-16 group select-none transition-colors duration-300">
      <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-[2.5rem] blur-2xl opacity-50 group-hover:opacity-75 transition duration-1000"></div>

      <div className="relative bg-white dark:bg-[#0d1117]/80 backdrop-blur-xl border border-gray-200 dark:border-gray-800 rounded-[1.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-1000">
        <div className="flex items-center h-12 px-4 bg-gray-50 dark:bg-[#161b22] border-b border-gray-200 dark:border-gray-800">
          <div className="flex gap-2 mr-6">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56] shadow-inner"></div>
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e] shadow-inner"></div>
            <div className="w-3 h-3 rounded-full bg-[#27c93f] shadow-inner"></div>
          </div>

          <div className="flex gap-1 h-full pt-2">
            <div className="px-4 py-1 bg-white dark:bg-[#0d1117] rounded-t-lg border-t border-x border-gray-200 dark:border-gray-800 text-[10px] font-bold text-gray-600 dark:text-gray-300 flex items-center gap-2">
              <div className="w-2 h-2 rounded-sm bg-primary animate-pulse"></div>
              {t('common.appName')}
            </div>
            <div className="px-4 py-1 text-[10px] font-bold text-gray-400 dark:text-gray-600 flex items-center">
              {t('hero.newTab')}
            </div>
          </div>
        </div>

        <div className="p-8 md:p-12">
          <div className="flex flex-col lg:flex-row gap-8 mb-12">
            <div className="w-full lg:w-[320px] bg-gray-50 dark:bg-[#161b22] border border-gray-200 dark:border-gray-800 rounded-3xl p-8 flex flex-col justify-between min-h-[220px] shadow-sm">
              <div className="flex flex-col gap-1">
                <h2 className="text-3xl font-black italic tracking-tighter text-gray-900 dark:text-white uppercase">
                  YUESWATER
                </h2>
                <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">
                  {t('stats.plan')}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 border-t border-gray-200 dark:border-gray-800/50 pt-8 mt-4">
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">
                    {t('stats.habits')}
                  </span>
                  <span className="text-3xl font-black text-gray-900 dark:text-white italic">
                    2
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1 text-primary">
                    {t('stats.commits')}
                  </span>
                  <span className="text-3xl font-black text-gray-900 dark:text-white italic">
                    9
                  </span>
                </div>
              </div>
            </div>

            <div className="flex-grow flex flex-col gap-4">
              <div className="flex justify-between items-center px-2">
                <h3 className="text-lg font-black tracking-tighter text-[#eeba2c] uppercase">
                  {t('habit.myHabits')}
                </h3>
                <div className="w-8 h-8 rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/20 dark:border-primary/30 flex items-center justify-center text-primary">
                  <Plus size={16} />
                </div>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                <div className="aspect-square rounded-2xl bg-[#eeba2c] flex flex-col items-center justify-center p-2 shadow-lg shadow-[#eeba2c]/20">
                  <Book size={32} className="text-black mb-1" />
                  <span className="text-[10px] font-black text-black uppercase tracking-tighter text-center leading-none">
                    {t('icons.book')}
                  </span>
                </div>
                <div className="aspect-square rounded-2xl bg-gray-50 dark:bg-[#161b22] border border-gray-200 dark:border-gray-800 flex flex-col items-center justify-center p-2 text-gray-400 dark:text-gray-500 shadow-sm">
                  <Target size={32} className="mb-1" />
                  <span className="text-[10px] font-black uppercase tracking-tighter text-center leading-none">
                    {t('hero.demoHabit')}
                  </span>
                </div>
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-800/30 flex items-center justify-center opacity-40 dark:opacity-20"
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="w-full bg-gray-50/50 dark:bg-[#161b22]/40 border border-gray-200 dark:border-gray-800/50 rounded-[2rem] p-6 flex flex-col items-center gap-6 shadow-inner">
            <div className="w-full grid grid-flow-col grid-rows-7 gap-1.5 overflow-hidden opacity-60 dark:opacity-40">
              {[...Array(350)].map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-sm transition-colors ${
                    i > 340 ? 'bg-[#eeba2c]' : 'bg-gray-200 dark:bg-gray-800'
                  }`}
                />
              ))}
            </div>
            <div className="w-full flex justify-end items-center gap-2 text-[10px] font-bold text-gray-400 dark:text-gray-600 uppercase tracking-widest">
              <span>{t('common.less')}</span>
              <div className="flex gap-1">
                <div className="w-3 h-3 rounded-sm bg-gray-200 dark:bg-gray-800" />
                <div className="w-3 h-3 rounded-sm bg-[#eeba2c]/30" />
                <div className="w-3 h-3 rounded-sm bg-[#eeba2c]/60" />
                <div className="w-3 h-3 rounded-sm bg-[#eeba2c]" />
              </div>
              <span>{t('common.more')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroPreview;

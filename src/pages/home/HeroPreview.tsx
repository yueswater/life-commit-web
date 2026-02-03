import { Book, Target, Plus, Smartphone } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const HeroPreview = () => {
  const { t } = useTranslation();

  return (
    <div className="relative w-full max-w-5xl mx-auto mt-12 md:mt-16 group select-none transition-all duration-300">
      <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-[2.5rem] blur-2xl opacity-50 group-hover:opacity-75 transition duration-1000"></div>

      <div className="hidden md:block relative bg-white dark:bg-[#0d1117]/80 backdrop-blur-xl border border-gray-200 dark:border-gray-800 rounded-[1.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-1000">
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

        <div className="p-12">
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

              <div className="grid grid-cols-5 gap-3">
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

      <div className="md:hidden flex flex-col items-center animate-in slide-in-from-bottom duration-1000">
        <div className="relative w-[280px] h-[580px] bg-[#1a1a1a] rounded-[3rem] border-[8px] border-[#333] shadow-2xl overflow-hidden flex flex-col">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#333] rounded-b-2xl z-20 flex items-center justify-center gap-2">
            <div className="w-8 h-1 bg-[#222] rounded-full"></div>
            <div className="w-2 h-2 bg-[#222] rounded-full"></div>
          </div>

          <div className="flex-1 bg-white dark:bg-[#0d1117] p-6 pt-12 flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <h2 className="text-2xl font-black italic tracking-tighter dark:text-white uppercase leading-none">
                YUESWATER
              </h2>
              <span className="text-[8px] font-bold text-primary uppercase tracking-widest">
                {t('stats.plan')}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 bg-gray-50 dark:bg-[#161b22] p-4 rounded-2xl border border-gray-100 dark:border-gray-800">
              <div className="flex flex-col">
                <span className="text-[8px] font-bold text-gray-400 uppercase">{t('stats.habits')}</span>
                <span className="text-xl font-black dark:text-white italic">2</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[8px] font-bold text-primary uppercase">{t('stats.commits')}</span>
                <span className="text-xl font-black dark:text-white italic">9</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-black text-[#eeba2c] uppercase">{t('habit.myHabits')}</h3>
                <Plus size={14} className="text-primary" />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="aspect-square rounded-xl bg-[#eeba2c] flex flex-col items-center justify-center p-1 shadow-md shadow-[#eeba2c]/20">
                  <Book size={24} className="text-black" />
                  <span className="text-[8px] font-black text-black uppercase mt-1">{t('icons.book')}</span>
                </div>
                <div className="aspect-square rounded-xl bg-gray-50 dark:bg-[#161b22] border border-gray-100 dark:border-gray-800 flex flex-col items-center justify-center p-1 text-gray-400">
                  <Target size={24} />
                </div>
                <div className="aspect-square rounded-xl border border-dashed border-gray-200 dark:border-gray-800/50 flex items-center justify-center opacity-40">
                  <Plus size={16} className="text-gray-300" />
                </div>
              </div>
            </div>

            <div className="mt-auto bg-gray-50 dark:bg-[#161b22] p-3 rounded-2xl border border-gray-100 dark:border-gray-800 flex flex-col gap-3">
              <div className="grid grid-cols-12 gap-1 opacity-60">
                {[...Array(60)].map((_, i) => (
                  <div key={i} className={`aspect-square rounded-[1px] ${i > 50 ? 'bg-[#eeba2c]' : 'bg-gray-200 dark:bg-gray-700'}`} />
                ))}
              </div>
              <div className="flex justify-between items-center text-[7px] font-bold text-gray-400 uppercase">
                <span>{t('common.less')}</span>
                <div className="flex gap-0.5">
                  {[0.1, 0.3, 0.6, 1].map(o => (
                    <div key={o} className="w-2 h-2 rounded-[1px] bg-[#eeba2c]" style={{ opacity: o }} />
                  ))}
                </div>
                <span>{t('common.more')}</span>
              </div>
            </div>
          </div>

          <div className="h-1.5 w-24 bg-[#333] mx-auto mb-2 rounded-full mt-auto"></div>
        </div>
      </div>
    </div>
  );
};

export default HeroPreview;
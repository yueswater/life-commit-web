import { useTranslation } from 'react-i18next';

type FreqType = 'daily' | 'weekly_count' | 'weekly_days' | 'custom';

interface FrequencySelectorProps {
  freqType: FreqType;
  setFreqType: (type: FreqType) => void;
  weeklyCount: number;
  setWeeklyCount: (count: number) => void;
  selectedDays: number[];
  toggleDay: (day: number) => void;
  customUnit: 'day' | 'week' | 'month' | 'year';
  setCustomUnit: (unit: 'day' | 'week' | 'month' | 'year') => void;
  customValue: number;
  setCustomValue: (val: number) => void;
  customCount: number;
  setCustomCount: (val: number) => void;
}

const FrequencySelector = ({
  freqType,
  setFreqType,
  weeklyCount,
  setWeeklyCount,
  selectedDays,
  toggleDay,
  customUnit,
  setCustomUnit,
  customValue,
  setCustomValue,
  customCount,
  setCustomCount,
}: FrequencySelectorProps) => {
  const { t } = useTranslation();
  const weekdays = t('common.weekdays', { returnObjects: true }) as string[];

  return (
    <div className="form-control md:col-span-2 w-full">
      <label className="label py-1 px-0">
        <span className="label-text text-base-content/60 font-bold uppercase text-[10px] tracking-widest">
          {t('habit.frequency.title')}
        </span>
      </label>
      
      <div className="flex flex-wrap gap-1 p-1 bg-base-200 rounded-2xl md:rounded-full mb-4">
        {(['daily', 'weekly_count', 'weekly_days', 'custom'] as const).map(
          (type) => (
            <button
              key={type}
              type="button"
              className={`flex-1 min-w-[calc(50%-4px)] md:min-w-[80px] py-2 md:py-2.5 rounded-xl md:rounded-full font-bold text-xs md:text-sm transition-all ${
                freqType === type
                  ? 'bg-primary text-primary-content shadow-lg'
                  : 'hover:bg-base-100/50 text-base-content/40'
              }`}
              onClick={() => setFreqType(type)}
            >
              {t(`habit.frequency.${type}`)}
            </button>
          )
        )}
      </div>

      <div className="min-h-[4.5rem] flex items-center w-full">
        {freqType === 'daily' && (
          <div className="w-full flex items-center justify-center">
            <span className="text-base-content/20 text-xs font-black italic uppercase tracking-widest">
              {t('habit.frequency.dailyDesc')}
            </span>
          </div>
        )}

        {freqType === 'weekly_count' && (
          <div className="flex items-center gap-4 animate-in fade-in slide-in-from-top-2 duration-300 w-full">
            <input
              type="range"
              min="1"
              max="7"
              value={weeklyCount}
              onChange={(e) => setWeeklyCount(parseInt(e.target.value))}
              className="range range-primary range-sm grow"
            />
            <span className="text-lg md:text-xl font-black text-primary w-16 md:w-20 text-center italic shrink-0">
              {weeklyCount}{t('habit.frequency.times')}
            </span>
          </div>
        )}

        {freqType === 'weekly_days' && (
          <div className="flex justify-between w-full gap-1 animate-in fade-in slide-in-from-top-2 duration-300">
            {weekdays.map((label, i) => (
              <button
                key={i}
                type="button"
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full font-bold text-xs md:text-sm transition-all border-2 flex items-center justify-center shrink-0 ${
                  selectedDays.includes(i)
                    ? 'bg-primary border-primary text-primary-content shadow-md scale-105'
                    : 'border-base-300 text-base-content/40 hover:border-primary/50'
                }`}
                onClick={() => toggleDay(i)}
              >
                {label.charAt(0)}
              </button>
            ))}
          </div>
        )}

        {freqType === 'custom' && (
          <div className="flex flex-wrap items-center gap-x-3 gap-y-3 animate-in fade-in slide-in-from-top-2 duration-300 w-full">
            <div className="flex items-center gap-2">
              <span className="font-bold text-base-content/60 text-[10px] md:text-xs uppercase tracking-wider shrink-0">
                {t('habit.frequency.every')}
              </span>
              <input
                type="number"
                min="1"
                className="input bg-base-200 border-none w-14 md:w-16 text-base-content font-bold h-9 md:h-10 rounded-full px-1 text-center focus:ring-2 focus:ring-primary outline-none"
                value={customValue}
                onChange={(e) => setCustomValue(parseInt(e.target.value) || 1)}
              />
              <select
                className="select bg-base-200 border-none text-base-content font-bold h-9 md:h-10 rounded-full min-h-0 w-20 md:w-24 px-2 md:px-3 focus:ring-2 focus:ring-primary outline-none text-xs md:text-sm"
                value={customUnit}
                onChange={(e) => setCustomUnit(e.target.value as any)}
              >
                <option value="day">{t('habit.frequency.day')}</option>
                <option value="week">{t('habit.frequency.week')}</option>
                <option value="month">{t('habit.frequency.month')}</option>
                <option value="year">{t('habit.frequency.year')}</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-bold text-base-content/60 text-[10px] md:text-xs uppercase tracking-wider shrink-0">
                {t('habit.frequency.execute')}
              </span>
              <input
                type="number"
                min="1"
                className="input bg-base-200 border-none w-14 md:w-16 text-base-content font-bold h-9 md:h-10 rounded-full px-1 text-center focus:ring-2 focus:ring-primary outline-none"
                value={customCount}
                onChange={(e) => setCustomCount(parseInt(e.target.value) || 1)}
              />
              <span className="font-bold text-base-content/60 text-[10px] md:text-xs uppercase tracking-wider shrink-0">
                {t('habit.frequency.times')}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FrequencySelector;
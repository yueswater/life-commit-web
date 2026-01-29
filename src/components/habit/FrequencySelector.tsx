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
    <div className="form-control md:col-span-2">
      <label className="label py-1">
        <span className="label-text text-base-content/60 font-bold uppercase text-[10px] tracking-widest">
          {t('habit.frequency.title')}
        </span>
      </label>
      <div className="flex flex-wrap gap-2 p-1 bg-base-200 border border-base-300 rounded-full mb-4">
        {(['daily', 'weekly_count', 'weekly_days', 'custom'] as const).map(
          (type) => (
            <button
              key={type}
              type="button"
              className={`flex-1 min-w-[80px] py-2 rounded-full font-bold text-sm transition-all ${
                freqType === type
                  ? 'bg-primary text-primary-content shadow-lg'
                  : 'hover:bg-base-100 text-base-content/40'
              }`}
              onClick={() => setFreqType(type)}
            >
              {t(`habit.frequency.${type}`)}
            </button>
          )
        )}
      </div>

      {freqType === 'weekly_count' && (
        <div className="flex items-center gap-4 animate-in slide-in-from-top-2 h-12">
          <input
            type="range"
            min="1"
            max="7"
            value={weeklyCount}
            onChange={(e) => setWeeklyCount(parseInt(e.target.value))}
            className="range range-primary grow"
          />
          <span className="text-xl font-black text-primary w-20 text-center italic">
            {weeklyCount}
            {t('habit.frequency.times')}
          </span>
        </div>
      )}

      {freqType === 'weekly_days' && (
        <div className="flex justify-between gap-1 animate-in slide-in-from-top-2 h-12">
          {weekdays.map((label, i) => (
            <button
              key={i}
              type="button"
              className={`w-10 h-10 rounded-full font-bold transition-all border-2 ${
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
        <div className="flex items-center gap-x-3 gap-y-2 animate-in slide-in-from-top-2 h-12">
          <div className="flex items-center gap-2 shrink-0">
            <span className="font-bold text-base-content/60 text-xs uppercase tracking-wider">
              {t('habit.frequency.every')}
            </span>
            <input
              type="number"
              min="1"
              className="input input-bordered w-16 bg-base-200 border-base-300 text-base-content font-bold h-10 rounded-full px-1 text-center focus:border-primary"
              value={customValue}
              onChange={(e) => setCustomValue(parseInt(e.target.value) || 1)}
            />
            <select
              className="select select-bordered bg-base-200 border-base-300 text-base-content font-bold h-10 rounded-full min-h-0 w-24 px-3 focus:border-primary"
              value={customUnit}
              onChange={(e) => setCustomUnit(e.target.value as any)}
            >
              <option value="day">{t('habit.frequency.day')}</option>
              <option value="week">{t('habit.frequency.week')}</option>
              <option value="month">{t('habit.frequency.month')}</option>
              <option value="year">{t('habit.frequency.year')}</option>
            </select>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="font-bold text-base-content/60 text-xs uppercase tracking-wider">
              {t('habit.frequency.execute')}
            </span>
            <input
              type="number"
              min="1"
              className="input input-bordered w-16 bg-base-200 border-base-300 text-base-content font-bold h-10 rounded-full px-1 text-center focus:border-primary"
              value={customCount}
              onChange={(e) => setCustomCount(parseInt(e.target.value) || 1)}
            />
            <span className="font-bold text-base-content/60 text-xs uppercase tracking-wider">
              {t('habit.frequency.times')}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default FrequencySelector;

import { useEffect, useState, useMemo } from 'react';
import { supabase } from '@/services/supabase';
import {
  format,
  subDays,
  isSameDay,
  startOfToday,
  eachMonthOfInterval,
  isSameMonth,
} from 'date-fns';
import { useTranslation } from 'react-i18next';

interface HabitGridProps {
  habitId: string;
}

const HabitGrid = ({ habitId }: HabitGridProps) => {
  const { t } = useTranslation();
  const [commits, setCommits] = useState<any[]>([]);

  const totalDays = 365;
  const today = startOfToday();

  const days = useMemo(() => {
    return Array.from({ length: totalDays }, (_, i) =>
      subDays(today, totalDays - 1 - i)
    );
  }, [today]);

  const weekLabels = t('common.weekdays', { returnObjects: true }) as string[];
  const monthLabels = t('common.months', { returnObjects: true }) as string[];
  const displayWeekdays = [1, 3, 5];

  const months = useMemo(() => {
    const interval = eachMonthOfInterval({
      start: days[0],
      end: days[days.length - 1],
    });

    return interval
      .map((monthDate) => {
        const firstDayOfMonthIndex = days.findIndex((d) =>
          isSameMonth(d, monthDate)
        );
        const colIndex = Math.floor(firstDayOfMonthIndex / 7);

        return {
          label: monthLabels[monthDate.getMonth()],
          colIndex: colIndex,
        };
      })
      .filter((m, i, arr) => {
        if (i === 0) return true;
        return m.colIndex !== arr[i - 1].colIndex;
      });
  }, [days, monthLabels]);

  const fetchCommits = async () => {
    const startDate = format(days[0], 'yyyy-MM-dd');
    const { data } = await supabase
      .from('habit_commits')
      .select('execution_date, count')
      .eq('habit_id', habitId)
      .gte('execution_date', startDate);

    if (data) setCommits(data);
  };

  useEffect(() => {
    if (habitId) fetchCommits();
  }, [habitId, days]);

  const getLevel = (date: Date) => {
    const log = commits.find((l) =>
      isSameDay(new Date(l.execution_date), date)
    );
    if (!log) return 0;
    return Math.min(log.count || 1, 4);
  };

  return (
    <div className="w-full flex flex-col items-center p-8 bg-white dark:bg-[#161b22]/40 rounded-[2.5rem] border border-gray-200 dark:border-gray-700 shadow-xl dark:shadow-2xl overflow-x-auto transition-all duration-300">
      {!habitId ? (
        <div className="py-20 flex flex-col items-center gap-4">
          <div className="w-full max-w-2xl h-32 rounded-3xl border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center">
            <span className="text-gray-400 dark:text-gray-500 font-black italic uppercase tracking-[0.2em] animate-pulse">
              {t('habit.selectToView')}
            </span>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2 min-w-max">
          <div className="flex gap-4">
            <div className="w-6 shrink-0" />
            <div className="relative h-5 w-full">
              {months.map((m, i) => (
                <div
                  key={i}
                  className="absolute text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase whitespace-nowrap italic"
                  style={{
                    left: `${m.colIndex * 19.5}px`,
                    display: m.colIndex > 51 ? 'none' : 'block',
                  }}
                >
                  {m.label}
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <div className="grid grid-rows-7 gap-1.5 text-[10px] font-black text-gray-400 dark:text-gray-500 py-1 uppercase shrink-0 italic">
              {weekLabels.map((label, i) => (
                <div key={i} className="h-3.5 flex items-center justify-end pr-1">
                  {displayWeekdays.includes(i) ? label.charAt(0) : ''}
                </div>
              ))}
            </div>

            <div className="grid grid-flow-col grid-rows-7 gap-1.5 p-4 rounded-2xl bg-gray-50/50 dark:bg-black/20 border border-gray-100 dark:border-gray-800/50">
              {days.map((date, i) => {
                const level = getLevel(date);
                return (
                  <div
                    key={i}
                    className={`w-3.5 h-3.5 rounded-sm transition-all duration-500 ${
                      level === 0
                        ? 'bg-gray-200/50 dark:bg-gray-800 border border-gray-300/50 dark:border-gray-700'
                        : level === 1
                          ? 'bg-primary/20 shadow-[0_0_8px_rgba(var(--primary-rgb),0.2)]'
                          : level === 2
                            ? 'bg-primary/45 shadow-[0_0_10px_rgba(var(--primary-rgb),0.3)]'
                            : level === 3
                              ? 'bg-primary/70 shadow-[0_0_12px_rgba(var(--primary-rgb),0.4)]'
                              : 'bg-primary shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)]'
                    }`}
                    title={`${format(date, 'yyyy-MM-dd')}`}
                  />
                );
              })}
            </div>
          </div>

          <div className="w-full mt-6 flex justify-end items-center gap-3 shrink-0 px-2">
            <span className="text-[10px] font-black text-gray-400 dark:text-gray-600 uppercase tracking-widest italic">
              {t('common.less')}
            </span>
            <div className="flex gap-1.5">
              {[0, 1, 2, 3, 4].map((level) => (
                <div
                  key={level}
                  className={`w-3.5 h-3.5 rounded-sm border ${
                    level === 0
                      ? 'bg-gray-200/50 dark:bg-gray-800 border-gray-300/50 dark:border-gray-700'
                      : level === 1
                        ? 'bg-primary/20 border-transparent'
                        : level === 2
                          ? 'bg-primary/45 border-transparent'
                          : level === 3
                            ? 'bg-primary/70 border-transparent'
                            : 'bg-primary border-transparent'
                  }`}
                />
              ))}
            </div>
            <span className="text-[10px] font-black text-gray-400 dark:text-gray-600 uppercase tracking-widest italic">
              {t('common.more')}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default HabitGrid;
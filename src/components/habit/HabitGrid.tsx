import { useEffect, useState, useMemo, useCallback } from 'react';
import { supabase } from '@/services/supabase';
import {
  format,
  subDays,
  isSameDay,
  startOfToday,
  eachMonthOfInterval,
  isSameMonth,
  startOfWeek,
  startOfMonth,
} from 'date-fns';
import { useTranslation } from 'react-i18next';

interface HabitGridProps {
  habitId: string | null;
}

const HabitGrid = ({ habitId }: HabitGridProps) => {
  const { t } = useTranslation();
  const [commits, setCommits] = useState<any[]>([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const today = useMemo(() => startOfToday(), []);

  const days = useMemo(() => {
    const dayCount = isMobile ? 90 : 365;
    const startDate = startOfWeek(subDays(today, dayCount), { weekStartsOn: 0 });
    const totalDaysNeeded = Math.ceil((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    const remainingDaysInWeek = (7 - (totalDaysNeeded % 7)) % 7;
    const totalGridDays = totalDaysNeeded + remainingDaysInWeek;

    return Array.from({ length: totalGridDays }, (_, i) => {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      return date;
    });
  }, [today, isMobile]);

  const weekLabels = t('common.weekdays', { returnObjects: true }) as string[];
  const monthLabels = t('common.months', { returnObjects: true }) as string[];
  const displayWeekdays = [1, 3, 5];

  const months = useMemo(() => {
    const interval = eachMonthOfInterval({
      start: days[0],
      end: days[days.length - 1],
    });

    return interval.map((monthDate) => {
      const firstDayDate = startOfMonth(monthDate);
      const firstDayIndex = days.findIndex((d) => isSameDay(d, firstDayDate));
      const actualIndex = firstDayIndex === -1 
        ? days.findIndex(d => isSameMonth(d, monthDate))
        : firstDayIndex;

      return {
        label: monthLabels[monthDate.getMonth()],
        colIndex: Math.floor(actualIndex / 7),
      };
    }).filter(m => m.colIndex >= 0);
  }, [days, monthLabels]);

  const fetchCommits = useCallback(async () => {
    const startDate = format(days[0], 'yyyy-MM-dd');
    let query = supabase
      .from('habit_commits')
      .select('execution_date, count')
      .gte('execution_date', startDate);

    if (habitId) query = query.eq('habit_id', habitId);

    const { data } = await query;

    if (data) {
      const aggregated = data.reduce((acc: any, curr: any) => {
        acc[curr.execution_date] = (acc[curr.execution_date] || 0) + curr.count;
        return acc;
      }, {});
      setCommits(Object.keys(aggregated).map(date => ({ execution_date: date, count: aggregated[date] })));
    }
  }, [habitId, days]);

  useEffect(() => {
    fetchCommits();
  }, [fetchCommits]);

  const getLevel = (date: Date) => {
    if (date > today) return -1;
    const dateStr = format(date, 'yyyy-MM-dd');
    const log = commits.find((l) => l.execution_date === dateStr);
    if (!log) return 0;
    return Math.min(log.count || 1, 4);
  };

  const CELL_SIZE = isMobile ? 12 : 14;
  const GAP = 4;
  const COL_WIDTH = CELL_SIZE + GAP;

  return (
    <div className="w-full flex flex-col items-center p-4 md:p-8 bg-base-100 rounded-3xl md:rounded-[2.5rem] border border-base-300 shadow-xl overflow-hidden">
      <div className="w-full overflow-x-auto no-scrollbar pb-2 flex justify-center">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <div className="w-6 shrink-0" />
            <div className="relative h-5 w-full">
              {months.map((m, i) => (
                <div
                  key={i}
                  className="absolute text-[10px] font-black text-base-content/50 uppercase italic whitespace-nowrap"
                  style={{ left: `${m.colIndex * COL_WIDTH}px` }}
                >
                  {m.label}
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <div className="grid grid-rows-7 gap-[4px] text-[10px] font-black text-base-content/40 py-1 uppercase shrink-0 italic">
              {weekLabels.map((label, i) => (
                <div key={i} className="h-[14px] flex items-center justify-end pr-1">
                  {displayWeekdays.includes(i) ? label.charAt(0) : ''}
                </div>
              ))}
            </div>

            <div 
              className="grid grid-flow-col grid-rows-7 gap-[4px] p-4 rounded-2xl bg-base-200/50 border border-base-300/50"
              style={{ 
                gridTemplateColumns: `repeat(${Math.ceil(days.length / 7)}, ${CELL_SIZE}px)`,
                gridTemplateRows: `repeat(7, ${CELL_SIZE}px)`
              }}
            >
              {days.map((date, i) => {
                const level = getLevel(date);
                return (
                  <div
                    key={i}
                    className={`rounded-[2px] transition-all duration-500 ${
                      level === -1
                        ? 'bg-transparent'
                        : level === 0
                          ? 'bg-base-300/30 border border-base-300/10'
                          : level === 1
                            ? 'bg-primary/20'
                            : level === 2
                              ? 'bg-primary/40'
                              : level === 3
                                ? 'bg-primary/70'
                                : 'bg-primary shadow-[0_0_8px_rgba(var(--p),0.4)]'
                    }`}
                    style={{ width: CELL_SIZE, height: CELL_SIZE }}
                    title={format(date, 'yyyy-MM-dd')}
                  />
                );
              })}
            </div>
          </div>

          <div className="w-full mt-4 flex justify-end items-center gap-3 px-1">
            <span className="text-[10px] font-black text-base-content/40 uppercase italic">{t('common.less')}</span>
            <div className="flex gap-1">
              {[0, 1, 2, 3, 4].map((l) => (
                <div
                  key={l}
                  className={`rounded-[2px] ${l === 0 ? 'bg-base-300/30 border border-base-300/10' : 'bg-primary'}`}
                  style={{ 
                    width: CELL_SIZE, 
                    height: CELL_SIZE, 
                    opacity: l === 0 ? 1 : (l * 0.25)
                  }}
                />
              ))}
            </div>
            <span className="text-[10px] font-black text-base-content/40 uppercase italic">{t('common.more')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HabitGrid;
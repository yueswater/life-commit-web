import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../services/supabase';
import { useTranslation } from 'react-i18next';

interface UserStatsProps {
  habitCount: number;
  refreshKey?: number;
}

const UserStats = ({ habitCount, refreshKey }: UserStatsProps) => {
  const { profile, user } = useAuth();
  const { t } = useTranslation();
  const [totalCommits, setTotalCommits] = useState<number>(0);

  const fetchTotalCommits = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('habit_commits')
      .select('count')
      .eq('user_id', user.id);

    if (!error && data) {
      const sum = data.reduce((acc, curr) => acc + (curr.count || 0), 0);
      setTotalCommits(sum);
    }
  };

  useEffect(() => {
    fetchTotalCommits();
  }, [user, habitCount, refreshKey]);

  return (
    <div className="bg-base-200/50 border border-gray-800 rounded-3xl p-8 w-full h-full flex flex-col justify-between min-h-[220px]">
      <div className="flex flex-col gap-1">
        <h2 className="text-4xl font-black italic tracking-tighter text-white uppercase">
          {profile?.username}
        </h2>
        <span className="text-xs font-bold text-primary uppercase tracking-[0.2em]">
          {t('stats.plan')}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 border-t border-gray-800 pt-8 mt-4">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">
            {t('stats.habits')}
          </span>
          <span className="text-3xl font-black text-white italic">
            {habitCount}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1 text-primary">
            {t('stats.commits')}
          </span>
          <span className="text-3xl font-black text-white italic">
            {totalCommits}
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserStats;

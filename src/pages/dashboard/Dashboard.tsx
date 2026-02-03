import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/services/supabase';
import { useAuth } from '@/contexts/AuthContext';
import HabitGrid from '@/components/habit/HabitGrid';
import UserStats from '@/components/habit/UserStats';
import AddHabitModal from '@/components/habit/AddHabitModal';
import HabitListSection from '@/components/habit/HabitListSection';
import Toast, { type ToastType } from '@/components/ui/Toast';
import ConfirmModal from '@/components/ui/ConfirmModal';
import { Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';

const Dashboard = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState<any>(null);
  const [habits, setHabits] = useState<any[]>([]);
  const [activeHabitId, setActiveHabitId] = useState<string | null>(null);
  const [refreshGridKey, setRefreshGridKey] = useState(0);

  const [toast, setToast] = useState<{
    message: string;
    type: ToastType;
  } | null>(null);
  const [confirmConfig, setConfirmConfig] = useState<{
    id: string;
    title: string;
    message: string;
  } | null>(null);

  const showToast = useCallback(
    (message: string, type: ToastType = 'success') => {
      setToast({ message, type });
    },
    []
  );

  const fetchHabits = useCallback(async () => {
    const { data } = await supabase
      .from('habits')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) {
      setHabits(data);
    }
  }, []);

  useEffect(() => {
    fetchHabits();
  }, [fetchHabits]);

  const handleCommit = useCallback(
    async (habitId: string) => {
      if (!user) return;
      const today = format(new Date(), 'yyyy-MM-dd');

      const { data: existing } = await supabase
        .from('habit_commits')
        .select('id, count')
        .eq('habit_id', habitId)
        .eq('execution_date', today)
        .maybeSingle();

      try {
        if (existing) {
          await supabase
            .from('habit_commits')
            .update({ count: (existing.count || 0) + 1 })
            .eq('id', existing.id);
        } else {
          await supabase.from('habit_commits').insert({
            habit_id: habitId,
            user_id: user.id,
            execution_date: today,
            count: 1,
          });
        }
        showToast(t('common.saveSuccess'));
        setRefreshGridKey((prev) => prev + 1);
      } catch {
        showToast(t('common.error'), 'error');
      }
    },
    [user, t, showToast]
  );

  const handleDeleteClick = (id: string) => {
    setConfirmConfig({
      id,
      title: t('habit.deleteConfirmTitle'),
      message: t('habit.deleteConfirmMessage'),
    });
  };

  const executeDelete = async () => {
    if (!confirmConfig) return;
    const { error } = await supabase
      .from('habits')
      .delete()
      .eq('id', confirmConfig.id);

    if (!error) {
      if (activeHabitId === confirmConfig.id) setActiveHabitId(null);
      showToast(t('common.deleteSuccess'));
      fetchHabits();
      setRefreshGridKey((prev) => prev + 1);
    } else {
      showToast(t('common.error'), 'error');
    }
    setConfirmConfig(null);
  };

  const handleEditHabit = (habit: any) => {
    setEditingHabit(habit);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen w-full py-6 md:py-10 px-4 md:px-6 flex flex-col items-center overflow-x-hidden bg-base-100">
      <div className="w-full max-w-6xl flex flex-col gap-8 md:gap-10">
        <div className="flex flex-col lg:flex-row gap-8 items-start w-full">
          <div className="w-full lg:w-[380px] shrink-0">
            <UserStats habitCount={habits.length} refreshKey={refreshGridKey} />
          </div>

          <div className="flex-grow flex flex-col gap-4 w-full min-w-0">
            <div className="flex justify-between items-center px-1">
              <h2 className="text-xl md:text-2xl font-black italic tracking-tighter text-primary uppercase">
                {t('habit.myHabits')}
              </h2>
              <button
                onClick={() => {
                  setEditingHabit(null);
                  setIsModalOpen(true);
                }}
                className="btn btn-primary btn-sm md:btn-md btn-circle shadow-xl shadow-primary/20 hover:scale-110 active:scale-95 transition-all"
              >
                <Plus size={20} />
              </button>
            </div>

            <div className="w-full overflow-hidden">
              <HabitListSection
                habits={habits}
                activeHabitId={activeHabitId}
                onSelectHabit={setActiveHabitId}
                onCommitHabit={handleCommit}
                onEditHabit={handleEditHabit}
                onDeleteHabit={handleDeleteClick}
              />
            </div>
          </div>
        </div>

        <div className="w-full pt-6 md:pt-10 border-t border-base-200 dark:border-base-800 flex justify-center">
          <div className="w-full overflow-x-auto no-scrollbar">
            <div className="w-full min-w-[300px] animate-in fade-in slide-in-from-bottom-6 duration-700 flex justify-center">
              <HabitGrid
                key={`${activeHabitId || 'all'}-${refreshGridKey}`}
                habitId={activeHabitId}
              />
            </div>
          </div>
        </div>
      </div>

      <AddHabitModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingHabit(null);
        }}
        onSuccess={() => {
          fetchHabits();
          setRefreshGridKey((prev) => prev + 1);
          showToast(
            editingHabit ? t('common.updateSuccess') : t('common.createSuccess')
          );
        }}
        editData={editingHabit}
      />

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <ConfirmModal
        isOpen={!!confirmConfig}
        title={confirmConfig?.title || ''}
        message={confirmConfig?.message || ''}
        onConfirm={executeDelete}
        onCancel={() => setConfirmConfig(null)}
      />
    </div>
  );
};

export default Dashboard;
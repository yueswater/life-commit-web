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

  const showToast = (message: string, type: ToastType = 'success') => {
    setToast({ message, type });
  };

  const fetchHabits = async () => {
    const { data } = await supabase
      .from('habits')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) {
      setHabits(data);
      if (data.length > 0 && !activeHabitId) {
        setActiveHabitId(data[0].id);
      }
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);

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
      } catch (error) {
        showToast(t('common.error'), 'error');
      }
    },
    [user, t]
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
    <div className="min-h-[calc(100vh-64px)] w-full py-10 px-6 flex flex-col items-center overflow-x-hidden">
      <div className="w-full max-w-6xl flex flex-col gap-10">
        <div className="flex flex-col lg:flex-row gap-8 items-stretch w-full">
          <div className="w-full lg:w-[400px] shrink-0">
            <UserStats habitCount={habits.length} />
          </div>

          <div className="flex-grow flex flex-col gap-4 min-w-0">
            <div className="flex justify-between items-center px-2">
              <h2 className="text-xl font-black tracking-tighter text-primary uppercase">
                {t('habit.myHabits')}
              </h2>
              <button
                onClick={() => {
                  setEditingHabit(null);
                  setIsModalOpen(true);
                }}
                className="btn btn-primary btn-sm btn-circle shadow-lg shadow-primary/20 hover:scale-110 transition-transform"
              >
                <Plus size={18} />
              </button>
            </div>

            <div className="flex-grow">
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

        <div className="w-full pt-8 border-t border-gray-800/50 flex justify-center">
          <div className="w-full">
            {activeHabitId ? (
              <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-700 flex justify-center">
                <HabitGrid
                  key={`${activeHabitId}-${refreshGridKey}`}
                  habitId={activeHabitId}
                />
              </div>
            ) : (
              <div className="w-full h-[300px] bg-base-200/20 rounded-[2.5rem] border-2 border-neutral-content/80 border-dashed flex items-center justify-center">
                <span className="text-gray-600 font-black uppercase tracking-widest opacity-40">
                  {t('habit.selectPrompt')}
                </span>
              </div>
            )}
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

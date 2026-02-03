import React, { useState, useEffect } from 'react';
import { supabase } from '@/services/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { X, Type, FileText, Loader2, Calendar, Hash } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import FrequencySelector from './FrequencySelector';
import TagSearch from './TagSearch';
import IconPicker from './IconPicker';

interface AddHabitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  editData?: any;
}

const AddHabitModal = ({
  isOpen,
  onClose,
  onSuccess,
  editData,
}: AddHabitModalProps) => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState('');
  const [goalCount, setGoalCount] = useState(1);
  const [memo, setMemo] = useState('');
  const [selectedTagId, setSelectedTagId] = useState<string | null>(null);
  const [icon, setIcon] = useState('Target');

  const [freqType, setFreqType] = useState<
    'daily' | 'weekly_count' | 'weekly_days' | 'custom'
  >('daily');
  const [weeklyCount, setWeeklyCount] = useState(3);
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const [customUnit, setCustomUnit] = useState<
    'day' | 'week' | 'month' | 'year'
  >('month');
  const [customValue, setCustomValue] = useState(1);
  const [customCount, setCustomCount] = useState(1);

  const resetForm = () => {
    setName('');
    setGoalCount(1);
    setMemo('');
    setSelectedTagId(null);
    setFreqType('daily');
    setWeeklyCount(3);
    setSelectedDays([]);
    setCustomValue(1);
    setCustomCount(1);
    setCustomUnit('month');
    setIcon('Target');
  };

  const parseFrequency = (freq: string) => {
    if (!freq) return;
    if (freq === 'daily') {
      setFreqType('daily');
    } else if (freq.startsWith('weekly_count:')) {
      setFreqType('weekly_count');
      setWeeklyCount(parseInt(freq.split(':')[1]));
    } else if (freq.startsWith('weekly_days:')) {
      setFreqType('weekly_days');
      setSelectedDays(freq.split(':')[1].split(',').map(Number));
    } else if (freq.startsWith('custom:')) {
      setFreqType('custom');
      const parts = freq.split(':')[1].split('_');
      setCustomValue(parseInt(parts[0]));
      setCustomUnit(parts[1] as any);
      setCustomCount(parseInt(parts[2]));
    }
  };

  useEffect(() => {
    if (editData && isOpen) {
      setName(editData.name || '');
      setGoalCount(editData.goal_count || 1);
      setMemo(editData.memo || '');
      setSelectedTagId(editData.tag_id || null);
      setIcon(editData.icon || 'Target');
      parseFrequency(editData.frequency);
    } else if (isOpen) {
      resetForm();
    }
  }, [editData, isOpen]);

  const toggleDay = (day: number) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);

    let freqString = freqType as string;
    if (freqType === 'weekly_count') freqString = `weekly_count:${weeklyCount}`;
    if (freqType === 'weekly_days')
      freqString = `weekly_days:${selectedDays.sort().join(',')}`;
    if (freqType === 'custom')
      freqString = `custom:${customValue}_${customUnit}_${customCount}`;

    const habitPayload = {
      user_id: user.id,
      name,
      goal_count: goalCount,
      memo,
      tag_id: selectedTagId,
      frequency: freqString,
      icon: icon,
    };

    const request = editData
      ? supabase.from('habits').update(habitPayload).eq('id', editData.id)
      : supabase.from('habits').insert(habitPayload);

    const { error } = await request;

    setLoading(false);
    if (error) {
      alert(error.message);
    } else {
      onSuccess();
      onClose();
      resetForm();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open items-center justify-center p-4 z-[200]">
      <div className="modal-box max-w-5xl w-full bg-base-100 p-0 overflow-y-auto md:overflow-visible rounded-3xl shadow-2xl transition-all duration-300 max-h-[90vh] md:max-h-none border-none">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/4 bg-primary p-6 md:p-8 flex flex-row md:flex-col justify-center items-center gap-4 text-primary-content md:rounded-l-3xl md:min-h-[600px] shrink-0">
            <Calendar size={32} className="md:w-16 md:h-16 opacity-90" />
            <h3 className="text-xl md:text-2xl font-black tracking-tighter text-center uppercase leading-none font-huninn">
              {editData ? t('common.edit') : t('habit.newHabit')}
            </h3>
          </div>

          <div className="w-full md:w-3/4 p-6 md:p-10 relative bg-base-100 text-left text-base-content md:rounded-r-3xl flex flex-col justify-center">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 md:right-4 md:top-4 text-base-content/40 hover:text-base-content transition-colors z-10"
            >
              <X size={24} />
            </button>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:gap-6 mt-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full">
                <div className="form-control w-full">
                  <label className="label py-1">
                    <span className="label-text text-base-content/60 font-bold uppercase text-[10px] tracking-widest">
                      {t('habit.name')}
                    </span>
                  </label>
                  <label className="input input-bordered flex items-center gap-3 bg-base-200 border-none h-12 md:h-14 rounded-2xl focus-within:ring-2 focus-within:ring-primary w-full transition-all">
                    <Type size={18} className="text-base-content/40 shrink-0" />
                    <input
                      type="text"
                      className="grow font-bold bg-transparent border-none outline-none focus:ring-0 text-base-content min-w-0"
                      placeholder={t('habit.namePlaceholder')}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </label>
                </div>
                <IconPicker selectedIcon={icon} onSelect={setIcon} />
              </div>

              <div className="w-full">
                <FrequencySelector
                  freqType={freqType}
                  setFreqType={setFreqType}
                  weeklyCount={weeklyCount}
                  setWeeklyCount={setWeeklyCount}
                  selectedDays={selectedDays}
                  toggleDay={toggleDay}
                  customUnit={customUnit}
                  setCustomUnit={setCustomUnit}
                  customValue={customValue}
                  setCustomValue={setCustomValue}
                  customCount={customCount}
                  setCustomCount={setCustomCount}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full">
                <div className="form-control">
                  <label className="label py-1">
                    <span className="label-text text-base-content/60 font-bold uppercase text-[10px] tracking-widest">
                      {t('habit.dailyGoal')}
                    </span>
                  </label>
                  <label className="input input-bordered flex items-center gap-3 bg-base-200 border-none h-12 md:h-14 rounded-2xl focus-within:ring-2 focus-within:ring-primary w-full transition-all">
                    <Hash size={18} className="text-base-content/40 shrink-0" />
                    <input
                      type="number"
                      className="grow font-bold bg-transparent border-none outline-none focus:ring-0 text-base-content min-w-0"
                      min="1"
                      value={goalCount}
                      onChange={(e) => setGoalCount(parseInt(e.target.value))}
                      required
                    />
                  </label>
                </div>
                <TagSearch
                  selectedTagId={selectedTagId}
                  onSelect={(id) => setSelectedTagId(id)}
                />
              </div>

              <div className="form-control w-full">
                <label className="label py-1">
                  <span className="label-text text-base-content/60 font-bold uppercase text-[10px] tracking-widest">
                    {t('habit.memo')}
                  </span>
                </label>
                <label className="input input-bordered flex items-center gap-3 bg-base-200 border-none h-12 md:h-14 rounded-2xl focus-within:ring-2 focus-within:ring-primary w-full transition-all">
                  <FileText size={18} className="text-base-content/40 shrink-0" />
                  <input
                    type="text"
                    className="grow font-medium bg-transparent border-none outline-none focus:ring-0 text-base-content min-w-0"
                    placeholder={t('habit.memoPlaceholder')}
                    value={memo}
                    onChange={(e) => setMemo(e.target.value)}
                  />
                </label>
              </div>

              <div className="mt-2 md:mt-4">
                <button
                  className="btn btn-primary w-full h-12 md:h-14 rounded-2xl font-black text-lg shadow-xl shadow-primary/20 transition-all hover:scale-[1.01] active:scale-[0.98] font-huninn uppercase tracking-tighter border-none"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className="animate-spin" />
                  ) : editData ? (
                    t('common.save')
                  ) : (
                    t('habit.create')
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div
        className="modal-backdrop bg-transparent"
        onClick={onClose}
      ></div>
    </div>
  );
};

export default AddHabitModal;
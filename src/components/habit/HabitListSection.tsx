import { useState } from 'react';
import HabitTile from './HabitTile';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Habit {
  id: string;
  name: string;
  icon: string;
}

interface HabitListSectionProps {
  habits: Habit[];
  activeHabitId: string | null;
  onSelectHabit: (id: string) => void;
  onCommitHabit: (id: string) => void;
  onEditHabit: (habit: Habit) => void;
  onDeleteHabit: (id: string) => void;
}

const HabitListSection = ({
  habits,
  activeHabitId,
  onSelectHabit,
  onCommitHabit,
  onEditHabit,
  onDeleteHabit,
}: HabitListSectionProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const totalPages = Math.max(1, Math.ceil(habits.length / itemsPerPage));

  const paginatedHabits = habits.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const displayTiles = [...paginatedHabits];
  while (displayTiles.length < itemsPerPage) {
    displayTiles.push({
      id: `placeholder-${displayTiles.length}`,
      name: '',
      icon: '',
    });
  }

  return (
    <div className="flex flex-col h-full justify-between select-none">
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {displayTiles.map((habit) => (
          <HabitTile
            key={habit.id}
            name={habit.name}
            iconName={habit.icon}
            isActive={activeHabitId === habit.id}
            isPlaceholder={!habit.name}
            onClick={() =>
              habit.id.includes('placeholder') ? null : onSelectHabit(habit.id)
            }
            onCommit={() =>
              habit.id.includes('placeholder') ? null : onCommitHabit(habit.id)
            }
            onEdit={(e) => {
              e.stopPropagation();
              onEditHabit(habit);
            }}
            onDelete={(e) => {
              e.stopPropagation();
              onDeleteHabit(habit.id);
            }}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-end items-center gap-4 mt-6">
          <button
            disabled={currentPage === 0}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="btn btn-xs btn-circle bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-500 hover:bg-primary hover:text-white transition-all disabled:opacity-20"
          >
            <ChevronLeft size={14} />
          </button>
          <span className="text-[10px] font-black text-gray-400 dark:text-gray-500 tracking-tighter uppercase italic">
            {currentPage + 1} <span className="mx-1 text-gray-300 dark:text-gray-700">/</span> {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages - 1}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="btn btn-xs btn-circle bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-500 hover:bg-primary hover:text-white transition-all disabled:opacity-20"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      )}
    </div>
  );
};

export default HabitListSection;
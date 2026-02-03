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
  onSelectHabit: (id: string | null) => void;
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
    <div className="flex flex-col h-full justify-between select-none w-full !overflow-visible">
      <div className="grid grid-cols-5 grid-rows-2 gap-3 md:gap-8 !overflow-visible p-4">
        {displayTiles.map((habit) => (
          <HabitTile
            key={habit.id}
            name={habit.name}
            iconName={habit.icon}
            isActive={activeHabitId === habit.id}
            isPlaceholder={!habit.name}
            onClick={() => {
              if (habit.id.includes('placeholder')) return;
              onSelectHabit(activeHabitId === habit.id ? null : habit.id);
            }}
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
        <div className="flex justify-center md:justify-end items-center gap-4 mt-8 md:mt-10">
          <button
            disabled={currentPage === 0}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="btn btn-xs md:btn-sm btn-circle bg-base-200 border-base-300 text-base-content/60 hover:bg-primary hover:text-white transition-all disabled:opacity-20"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="text-[10px] md:text-xs font-black text-base-content/40 tracking-widest uppercase italic">
            {currentPage + 1} <span className="mx-1 opacity-30">/</span> {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages - 1}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="btn btn-xs md:btn-sm btn-circle bg-base-200 border-base-300 text-base-content/60 hover:bg-primary hover:text-white transition-all disabled:opacity-20"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default HabitListSection;
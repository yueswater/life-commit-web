import React, { useState, useRef } from 'react';
import * as Icons from 'lucide-react';
import { Pencil, Trash2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface HabitTileProps {
  name?: string;
  iconName?: string;
  isActive?: boolean;
  onClick?: () => void;
  onCommit?: () => void;
  onEdit?: (e: React.MouseEvent) => void;
  onDelete?: (e: React.MouseEvent) => void;
  isPlaceholder?: boolean;
}

const HabitTile = ({
  name,
  iconName,
  isActive,
  onClick,
  onCommit,
  onEdit,
  onDelete,
  isPlaceholder,
}: HabitTileProps) => {
  const IconComponent = iconName
    ? (Icons as any)[iconName] || Icons.Target
    : null;
  const [progress, setProgress] = useState(0);
  const [isPressing, setIsPressing] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const DURATION = 2000;

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (isPlaceholder) return;
    setIsPressing(true);
    startTimeRef.current = Date.now();

    timerRef.current = setInterval(() => {
      if (startTimeRef.current) {
        const elapsed = Date.now() - startTimeRef.current;
        const currentProgress = Math.min((elapsed / DURATION) * 100, 100);
        setProgress(currentProgress);

        if (currentProgress >= 100) {
          if (timerRef.current) clearInterval(timerRef.current);
          triggerSuccess();
          handleEnd();
        }
      }
    }, 30);
  };

  const handleEnd = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsPressing(false);
    setProgress(0);
    startTimeRef.current = null;
  };

  const triggerSuccess = () => {
    if (onCommit) onCommit();
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;

      confetti({
        particleCount: 80,
        spread: 60,
        origin: { x, y },
        colors: ['#eeba2c', '#ffffff', '#22c55e'],
      });
    }
  };

  if (isPlaceholder) {
    return (
      <div className="aspect-square rounded-3xl border-2 border-dashed border-gray-300 dark:border-gray-700 bg-transparent dark:bg-transparent flex items-center justify-center transition-all duration-300" />
    );
  }

  return (
    <div ref={containerRef} className="relative group/tile w-full select-none">
      <button
        onClick={() => !isPressing && progress === 0 && onClick?.()}
        onMouseDown={handleStart}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={handleStart}
        onTouchEnd={handleEnd}
        className={`aspect-square flex flex-col items-center justify-center p-4 rounded-3xl border-2 transition-all duration-300 w-full relative overflow-hidden ${
          isActive
            ? 'bg-primary border-primary text-black shadow-xl shadow-primary/30 scale-[1.05]'
            : 'bg-white dark:bg-[#161b22] border-gray-200 dark:border-gray-800 text-gray-400 dark:text-gray-500 hover:border-primary/50 hover:shadow-lg dark:hover:shadow-primary/5 hover:text-gray-900 dark:hover:text-white'
        }`}
      >
        {isPressing && (
          <div
            className="absolute bottom-0 left-0 w-full transition-all duration-75 pointer-events-none flex items-center justify-center overflow-hidden z-20"
            style={{
              height: `${progress}%`,
              backgroundColor: '#eeba2c',
            }}
          >
            <span className="text-[14px] font-black text-black absolute top-1/2 -translate-y-1/2 italic">
              {Math.floor(progress)}%
            </span>
          </div>
        )}

        <div
          className={`relative z-10 flex flex-col items-center gap-3 transition-all duration-500 ${isPressing ? 'opacity-0 scale-50' : 'opacity-100 scale-100'}`}
        >
          {IconComponent && (
            <IconComponent
              size={32}
              strokeWidth={2.5}
              className={`transition-transform duration-500 ${isActive ? 'scale-110' : 'group-hover/tile:scale-110'}`}
            />
          )}
          <span className="text-[10px] font-black italic uppercase truncate w-full text-center tracking-widest leading-none px-1">
            {name}
          </span>
        </div>
      </button>

      <div className="absolute -top-1 -left-1 flex gap-1 opacity-0 group-hover/tile:opacity-100 transition-all duration-300 z-30 scale-75 group-hover/tile:scale-100">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit?.(e);
          }}
          className="p-2 rounded-xl bg-gray-900/90 dark:bg-black/80 hover:bg-black text-white shadow-xl transition-all"
        >
          <Pencil size={12} />
        </button>
      </div>

      <div className="absolute -top-1 -right-1 flex gap-1 opacity-0 group-hover/tile:opacity-100 transition-all duration-300 z-30 scale-75 group-hover/tile:scale-100">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.(e);
          }}
          className="p-2 rounded-xl bg-red-500/90 hover:bg-red-600 text-white shadow-xl transition-all"
        >
          <Trash2 size={12} />
        </button>
      </div>
    </div>
  );
};

export default HabitTile;
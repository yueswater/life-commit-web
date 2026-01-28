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
  const DURATION = 3000;

  const handleStart = () => {
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
        particleCount: 100,
        spread: 70,
        origin: { x, y },
        colors: ['#eeba2c', '#ffffff', '#22c55e'],
      });
    }
  };

  if (isPlaceholder) {
    return (
      <div className="aspect-square rounded-2xl border-2 border-dashed border-gray-800 flex items-center justify-center opacity-20" />
    );
  }

  return (
    <div ref={containerRef} className="relative group/tile w-full">
      <button
        onClick={() => !isPressing && progress === 0 && onClick?.()}
        onMouseDown={handleStart}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={handleStart}
        onTouchEnd={handleEnd}
        className={`aspect-square flex flex-col items-center justify-center p-2 rounded-2xl border-2 transition-all select-none w-full relative overflow-hidden ${
          isActive
            ? 'bg-primary border-primary text-primary-content shadow-lg shadow-primary/20 scale-[1.02]'
            : 'bg-base-200 border-gray-800 text-gray-500 hover:border-primary/50 hover:text-white'
        }`}
      >
        {isPressing && (
          <div
            className="absolute bottom-0 left-0 w-full transition-all duration-75 pointer-events-none flex items-center justify-center overflow-hidden"
            style={{
              height: `${progress}%`,
              backgroundColor: '#eeba2c',
            }}
          >
            <span className="text-[16px] font-black text-black absolute top-1/2 -translate-y-1/2">
              {Math.floor(progress)}%
            </span>
          </div>
        )}

        <div
          className={`relative z-10 flex flex-col items-center transition-transform ${isPressing ? 'opacity-20 scale-90' : 'opacity-100'}`}
        >
          {IconComponent && (
            <IconComponent
              size={36}
              className={`mb-2 transition-transform ${isActive ? 'scale-110' : 'group-hover/tile:scale-110'}`}
            />
          )}
          <span className="text-[11px] font-black uppercase truncate w-full text-center tracking-tighter leading-none px-1">
            {name}
          </span>
        </div>
      </button>

      <div className="absolute top-1.5 left-1.5 flex gap-1 opacity-0 group-hover/tile:opacity-100 transition-opacity z-20">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit?.(e);
          }}
          className="p-1.5 rounded-lg bg-black/60 hover:bg-black text-white transition-colors"
        >
          <Pencil size={12} />
        </button>
      </div>

      <div className="absolute top-1.5 right-1.5 flex gap-1 opacity-0 group-hover/tile:opacity-100 transition-opacity z-20">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.(e);
          }}
          className="p-1.5 rounded-lg bg-error hover:bg-error/80 text-white transition-colors"
        >
          <Trash2 size={12} />
        </button>
      </div>
    </div>
  );
};

export default HabitTile;

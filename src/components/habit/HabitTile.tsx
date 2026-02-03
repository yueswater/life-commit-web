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
  const IconComponent = iconName ? (Icons as any)[iconName] || Icons.Target : null;
  const [progress, setProgress] = useState(0);
  const [isPressing, setIsPressing] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const DURATION = 1500;

  const handleStart = () => {
    if (isPlaceholder || isActive) return;
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
    }, 20);
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
        particleCount: 60,
        spread: 50,
        origin: { x, y },
        colors: ['#eeba2c', '#ffffff', '#22c55e'],
      });
    }
  };

  return (
    <>
      {isActive && (
        <div 
          className="fixed inset-0 z-[100] bg-transparent"
          onClick={(e) => {
            e.stopPropagation();
            onClick?.();
          }}
        />
      )}

      <div 
        ref={containerRef} 
        className={`relative w-full select-none transition-all duration-300 ${isActive ? 'z-[110]' : 'z-10'}`}
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
            if (!isPressing && progress === 0) onClick?.();
          }}
          onMouseDown={handleStart}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
          onTouchStart={handleStart}
          onTouchEnd={handleEnd}
          className={`aspect-square flex flex-col items-center justify-center p-3 md:p-4 rounded-2xl md:rounded-3xl border-2 transition-all duration-300 w-full relative cursor-pointer active:scale-95 ${
            isActive
              ? 'bg-primary border-primary text-black scale-110'
              : 'bg-white dark:bg-[#0d1117] border-base-300 text-base-content/40 hover:border-primary/50'
          }`}
        >
          {isPressing && (
            <div
              className="absolute bottom-0 left-0 w-full transition-all duration-75 pointer-events-none flex items-center justify-center overflow-hidden z-20 rounded-[inherit]"
              style={{ height: `${progress}%`, backgroundColor: '#eeba2c' }}
            >
              <span className="text-[12px] md:text-[14px] font-black text-black absolute top-1/2 -translate-y-1/2 italic">
                {Math.floor(progress)}%
              </span>
            </div>
          )}

          <div className={`relative z-10 flex flex-col items-center gap-1 md:gap-3 transition-all duration-500 ${isPressing ? 'opacity-0 scale-50' : 'opacity-100 scale-100'}`}>
            {IconComponent && (
              <IconComponent
                className={`w-6 h-6 md:w-8 md:h-8 transition-transform duration-500 ${isActive ? 'scale-110' : ''}`}
                strokeWidth={2.5}
              />
            )}
            <span className="text-[8px] md:text-[10px] font-black italic uppercase truncate w-full text-center tracking-tighter md:tracking-widest leading-none px-0.5">
              {name}
            </span>
          </div>
        </div>

        {isActive && (
          <div className="absolute inset-0 pointer-events-none overflow-visible">
            <button
              onClick={(e) => { 
                e.preventDefault();
                e.stopPropagation(); 
                onEdit?.(e); 
              }}
              className="pointer-events-auto absolute -top-4 -left-4 z-[120] btn btn-circle btn-xs sm:btn-sm md:btn-md bg-gray-900 text-white border-none shadow-xl hover:scale-110 flex items-center justify-center transition-transform animate-in zoom-in"
            >
              <Pencil size={14} />
            </button>

            <button
              onClick={(e) => { 
                e.preventDefault();
                e.stopPropagation(); 
                onDelete?.(e); 
              }}
              className="pointer-events-auto absolute -top-4 -right-4 z-[120] btn btn-circle btn-xs sm:btn-sm md:btn-md bg-error text-white border-none shadow-xl hover:scale-110 flex items-center justify-center transition-transform animate-in zoom-in"
            >
              <Trash2 size={14} />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default HabitTile;
"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Lock, Frown } from "lucide-react";
import { cn } from "@/lib/utils";

const DAYS = Array.from({ length: 31 }, (_, i) => i + 1);
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const YEARS = Array.from({ length: 15 }, (_, i) => 2020 + i);

const TARGET_DAY = 23;
const TARGET_MONTH = "April";
const TARGET_YEAR = 2023;

interface WheelProps {
  items: (string | number)[];
  value: string | number;
  onChange: (val: string | number) => void;
  label: string;
}

function ThreeDWheel({ items, value, onChange, label }: WheelProps) {
  const currentIndex = items.indexOf(value);
  const touchStartY = useRef<number | null>(null);
  const wheelAccumulator = useRef<number>(0);

  const moveSteps = useCallback((steps: number) => {
    let newIndex = currentIndex + steps;
    // Handle looping
    while (newIndex < 0) newIndex += items.length;
    while (newIndex >= items.length) newIndex -= items.length;
    onChange(items[newIndex]);
  }, [currentIndex, items, onChange]);

  const onWheel = (e: React.WheelEvent) => {
    const stepThreshold = 50;
    wheelAccumulator.current += e.deltaY;

    if (Math.abs(wheelAccumulator.current) >= stepThreshold) {
      const steps = Math.sign(wheelAccumulator.current) * Math.floor(Math.abs(wheelAccumulator.current) / stepThreshold);
      // Flipped direction for opposite side interaction
      moveSteps(steps); 
      wheelAccumulator.current = 0;
    }
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStartY.current === null) return;
    
    const currentY = e.touches[0].clientY;
    const deltaY = touchStartY.current - currentY;
    
    const stepThreshold = 40;
    
    if (Math.abs(deltaY) >= stepThreshold) {
      const steps = Math.sign(deltaY) * Math.floor(Math.abs(deltaY) / stepThreshold);
      // Flipped direction for opposite side interaction
      moveSteps(-steps); 
      touchStartY.current = currentY;
    }
  };

  const onTouchEnd = () => {
    touchStartY.current = null;
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-black">{label}</span>
      <div 
        onWheel={onWheel}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        className="relative h-48 w-24 sm:w-32 perspective-1000 group touch-none select-none"
      >
        <div 
          className="absolute inset-0 flex flex-col justify-between py-2 z-20 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, hsl(var(--background)) 0%, transparent 40%, transparent 60%, hsl(var(--background)) 100%)' }}
        />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
          <div className="w-full h-12 border-y border-secondary/30" />
        </div>

        <div className="relative w-full h-full preserve-3d transition-transform duration-500">
          {items.map((item, i) => {
            const diff = i - currentIndex;
            let normalizedDiff = diff;
            if (diff > items.length / 2) normalizedDiff -= items.length;
            if (diff < -items.length / 2) normalizedDiff += items.length;

            const rotateX = normalizedDiff * 30;
            const opacity = Math.max(0, 1 - Math.abs(normalizedDiff) * 0.3);
            const isSelected = i === currentIndex;

            return (
              <div
                key={i}
                className={cn(
                  "absolute inset-0 flex items-center justify-center transition-all duration-500 backface-hidden",
                  isSelected ? "text-secondary-foreground font-bold text-2xl" : "text-muted-foreground/40 text-lg"
                )}
                style={{
                  transform: `rotateX(${rotateX}deg) translateZ(120px)`,
                  opacity: opacity,
                  pointerEvents: 'none'
                }}
              >
                {item}
              </div>
            );
          })}
        </div>

        <button 
          onClick={() => moveSteps(-1)}
          className="absolute top-0 left-0 right-0 h-1/4 z-30 cursor-n-resize outline-none"
          aria-label="Previous"
        />
        <button 
          onClick={() => moveSteps(1)}
          className="absolute bottom-0 left-0 right-0 h-1/4 z-30 cursor-s-resize outline-none"
          aria-label="Next"
        />
      </div>
    </div>
  );
}

export default function EntryGate({ onUnlock }: { onUnlock: () => void }) {
  const [day, setDay] = useState<number>(1);
  const [month, setMonth] = useState<string>("January");
  const [year, setYear] = useState<number>(2023);
  
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const now = new Date();
    setDay(now.getDate());
    setMonth(MONTHS[now.getMonth()]);
    const currentYear = now.getFullYear();
    if (YEARS.includes(currentYear)) {
      setYear(currentYear);
    }
  }, []);

  const handleUnlock = useCallback(() => {
    if (day === TARGET_DAY && month === TARGET_MONTH && year === TARGET_YEAR) {
      setIsSuccess(true);
      setTimeout(() => {
        onUnlock();
      }, 1000);
    } else {
      setIsError(true);
      setTimeout(() => setIsError(false), 2000);
    }
  }, [day, month, year, onUnlock]);

  return (
    <div className={cn(
      "fixed inset-0 z-[100] flex flex-col items-center justify-center transition-all duration-700 px-4",
      isSuccess ? "opacity-0" : "opacity-100",
      isError ? "bg-slate-950" : "bg-background"
    )}>
      <div className={cn(
        "max-w-md w-full text-center space-y-12 transition-all duration-700",
        isError ? "animate-shake grayscale" : "animate-fade-up"
      )}>
        <div className="space-y-4">
          <div className="relative inline-block">
            <div className={cn(
              "absolute -inset-4 rounded-full blur-2xl transition-all duration-700",
              isError ? "bg-blue-900/40" : "bg-secondary/20 animate-pulse"
            )} />
            <div className={cn(
              "relative p-6 rounded-3xl shadow-2xl border transition-all duration-700",
              isError ? "bg-slate-900 border-slate-700" : "bg-white/80 border-white/60"
            )}>
              {isError ? (
                <Frown className="size-10 text-slate-500" />
              ) : (
                <Lock className="size-10 text-secondary" />
              )}
            </div>
          </div>
          
          <p className={cn(
            "font-arabic text-2xl transition-colors duration-700 font-bold",
            isError ? "text-slate-600" : "text-muted-foreground"
          )} dir="rtl">
            ايه هو اول يوم اعترفنا فيه لبعض؟!
          </p>
        </div>

        <div className={cn(
          "flex justify-center gap-4 sm:gap-8 py-8 rounded-[3rem] border transition-all duration-700",
          isError ? "bg-slate-900/50 border-slate-800" : "bg-white/30 border-white/40"
        )}>
          <ThreeDWheel 
            items={DAYS} 
            value={day} 
            onChange={(v) => setDay(v as number)} 
            label="Day" 
          />
          <ThreeDWheel 
            items={MONTHS} 
            value={month} 
            onChange={(v) => setMonth(v as string)} 
            label="Month" 
          />
          <ThreeDWheel 
            items={YEARS} 
            value={year} 
            onChange={(v) => setYear(v as number)} 
            label="Year" 
          />
        </div>

        <button
          onClick={handleUnlock}
          disabled={isSuccess}
          className={cn(
            "w-full h-16 rounded-full font-bold text-lg tracking-[0.2em] uppercase transition-all duration-500 shadow-lg flex items-center justify-center gap-3 group overflow-hidden relative",
            isSuccess ? "bg-green-100 text-green-600" : 
            isError ? "bg-slate-800 text-slate-500" : "bg-secondary text-secondary-foreground hover:scale-105 active:scale-95"
          )}
        >
          <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          <span className="relative font-black">Unlock</span>
        </button>
      </div>
    </div>
  );
}

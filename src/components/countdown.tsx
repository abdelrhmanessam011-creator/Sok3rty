"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";

export default function CountdownTimer({ 
  targetDate, 
  isElapsed = false 
}: { 
  targetDate: Date, 
  isElapsed?: boolean 
}) {
  const [timeLeft, setTimeLeft] = useState<{
    years: number;
    months: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const target = new Date(targetDate);
      
      if (isElapsed) {
        // Calculate age/elapsed time including months
        let years = now.getFullYear() - target.getFullYear();
        let months = now.getMonth() - target.getMonth();
        let days = now.getDate() - target.getDate();

        if (days < 0) {
          months--;
          const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
          days += prevMonth.getDate();
        }

        if (months < 0) {
          years--;
          months += 12;
        }

        // Calculate precise H/M/S since the last daily anniversary
        const lastDailyAnniversary = new Date(now);
        lastDailyAnniversary.setHours(target.getHours(), target.getMinutes(), target.getSeconds(), target.getMilliseconds());
        if (lastDailyAnniversary > now) {
          lastDailyAnniversary.setDate(lastDailyAnniversary.getDate() - 1);
        }
        const distance = now.getTime() - lastDailyAnniversary.getTime();
        
        setTimeLeft({
          years,
          months,
          days,
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else {
        const distance = target.getTime() - now.getTime();
        if (distance < 0) {
          setTimeLeft({ years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });
        } else {
          // Future countdown logic
          let years = target.getFullYear() - now.getFullYear();
          let months = target.getMonth() - now.getMonth();
          let days = target.getDate() - now.getDate();
          
          if (days < 0) {
            months--;
            const prevMonth = new Date(target.getFullYear(), target.getMonth(), 0);
            days += prevMonth.getDate();
          }
          if (months < 0) {
            years--;
            months += 12;
          }

          setTimeLeft({
            years: Math.max(0, years),
            months: Math.max(0, months),
            days: Math.max(0, days),
            hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((distance % (1000 * 60)) / 1000),
          });
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, isElapsed]);

  if (!timeLeft) return <div className="h-32 flex items-center justify-center font-body italic text-muted-foreground">Calculating the magic...</div>;

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center px-2 sm:px-4 min-w-[80px]">
      <div className="text-3xl sm:text-4xl md:text-6xl font-bold text-secondary-foreground">
        {value.toLocaleString()}
      </div>
      <div className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-muted-foreground/80 mt-1 font-bold">
        {label}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center space-y-8 w-full max-w-5xl mx-auto">
      <div className="flex flex-wrap justify-center gap-y-8 gap-x-2 sm:gap-x-4 md:gap-8">
        {timeLeft.years > 0 && <TimeUnit value={timeLeft.years} label="Years" />}
        {(timeLeft.years > 0 || timeLeft.months > 0) && <TimeUnit value={timeLeft.months} label="Months" />}
        <TimeUnit value={timeLeft.days} label="Days" />
        <TimeUnit value={timeLeft.hours} label="Hours" />
        <TimeUnit value={timeLeft.minutes} label="Minutes" />
        <TimeUnit value={timeLeft.seconds} label="Seconds" />
      </div>
      
      <div className="flex items-center gap-3 px-6 py-2 bg-secondary/10 rounded-full text-secondary-foreground/70 text-sm italic animate-pulse">
        <Heart className="size-4 fill-current text-secondary" />
        <span>{isElapsed ? "Time the world has been brighter" : "Until the magic begins"}</span>
        <Heart className="size-4 fill-current text-secondary" />
      </div>
    </div>
  );
}


"use client";

import { useCallback, useEffect, useState } from "react";
import { Heart, Stars, Sparkles } from "lucide-react";
import { CELEBRANT_NAME } from "@/lib/constants";
import EntryGate from "./entry-gate";
import { cn } from "@/lib/utils";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    setMounted(true);
    const status = sessionStorage.getItem("roaa_celebration_unlocked");
    if (status === "true") {
      setIsUnlocked(true);
    }
  }, []);

  const handleUnlock = () => {
    setIsUnlocked(true);
    setShowSplash(true);
    sessionStorage.setItem("roaa_celebration_unlocked", "true");
    
    // Show the "Made with love" splash for 3 seconds
    setTimeout(() => {
      setShowSplash(false);
    }, 3000);
  };

  const createHeartBurst = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!isUnlocked || showSplash) return;
    
    const x = 'clientX' in e ? e.clientX : e.touches[0].clientX;
    const y = 'clientY' in e ? e.clientY : e.touches[0].clientY;

    const heart = document.createElement('div');
    heart.className = 'heart-particle';
    heart.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none" class="text-secondary"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`;
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 2000);
  }, [isUnlocked, showSplash]);

  if (!mounted) return <div className="min-h-screen bg-background" />;

  return (
    <div 
      className="min-h-screen selection:bg-secondary/30 selection:text-secondary-foreground flex flex-col cursor-heart overflow-x-hidden"
      onClick={createHeartBurst}
    >
      {!isUnlocked && <EntryGate onUnlock={handleUnlock} />}

      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <Heart className="absolute top-10 left-[10%] text-primary/20 size-24 rotate-12 animate-float" />
        <Heart className="absolute top-[60%] left-[5%] text-secondary/10 size-12 -rotate-12 animate-float" style={{ animationDelay: '2s' }} />
        <Stars className="absolute bottom-20 right-[5%] text-secondary/20 size-32 -rotate-12 animate-float" style={{ animationDelay: '1s' }} />
        <Sparkles className="absolute top-[40%] right-[15%] text-primary/10 size-16 animate-pulse" />
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-secondary/20 rounded-full blur-[120px]" />
      </div>

      {/* Splash Transition Screen */}
      {isUnlocked && showSplash && (
        <div className="fixed inset-0 z-[110] bg-background flex flex-col items-center justify-center animate-fade-up">
          <div className="text-center space-y-12 px-8 max-w-5xl mx-auto py-12">
            <Heart className="size-16 text-secondary fill-secondary mx-auto animate-pulse" />
            <h1 className="font-arabic text-4xl md:text-6xl font-bold text-secondary-foreground leading-loose" dir="rtl">
              صُنِع بِحُب مِن عبدو إلى سُكّرَتِه
            </h1>
            <div className="flex justify-center gap-4">
              <Sparkles className="size-6 text-primary animate-bounce stagger-1" />
              <Sparkles className="size-6 text-secondary animate-bounce stagger-2" />
              <Sparkles className="size-6 text-primary animate-bounce stagger-3" />
            </div>
          </div>
        </div>
      )}

      <main className={cn(
        "flex-1 flex flex-col transition-opacity duration-1000", 
        (isUnlocked && !showSplash) ? "opacity-100" : "opacity-0"
      )}>
        {(isUnlocked && !showSplash) && children}
      </main>

      {(isUnlocked && !showSplash) && (
        <footer className="py-8 text-center bg-white/20 mt-auto border-t border-white/10 relative z-[60]">
          <div className="flex justify-center gap-3 mb-3">
            <Heart className="text-secondary fill-current size-2 animate-pulse" />
            <Heart className="text-secondary fill-current size-3 animate-pulse" style={{ animationDelay: '0.5s' }} />
            <Heart className="text-secondary fill-current size-2 animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
          <p className="text-muted-foreground italic font-body text-base animate-fade-up stagger-4">"To my {CELEBRANT_NAME}, today and forever."</p>
        </footer>
      )}
    </div>
  );
}

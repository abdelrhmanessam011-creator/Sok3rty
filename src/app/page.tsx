"use client";

import CountdownTimer from "@/components/countdown";
import { Heart, Sparkles, Gift } from "lucide-react";
import Link from "next/link";
import { CELEBRANT_NAME, BIRTH_DATE } from "@/lib/constants";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center px-4 animate-fade-up">
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="flex justify-center gap-4 mb-4">
          <Sparkles className="text-secondary size-10 animate-pulse" />
        </div>
        <h1 className="text-6xl md:text-9xl font-headline font-bold text-secondary-foreground drop-shadow-sm leading-tight tracking-tight">
          For {CELEBRANT_NAME}
        </h1>
        <p className="text-xl md:text-2xl font-body italic text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          The world has been a brighter place for...
        </p>
        <div className="pt-12">
          <CountdownTimer targetDate={BIRTH_DATE} isElapsed={true} />
        </div>

        {/* Navigation Icons on Home Screen */}
        <div className="relative mt-24 sm:mt-20">
          <div className="flex justify-center gap-12 md:gap-24 animate-fade-up stagger-5">
            <Link 
              href="/reasons"
              className="group flex flex-col items-center gap-6 transition-all duration-500 hover:scale-110 active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded-[3rem] p-4"
            >
              <div className="relative">
                {/* Magic Glow Background */}
                <div className="absolute -inset-4 bg-secondary/30 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative bg-white/90 backdrop-blur-md p-6 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl border border-white/60 group-hover:bg-secondary group-hover:text-secondary-foreground group-hover:border-transparent transition-all duration-500 transform group-hover:-translate-y-4 group-hover:rotate-6">
                  <Heart className="size-10 sm:size-12 group-hover:fill-current transition-all duration-500" />
                </div>
              </div>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.4em] font-black text-muted-foreground group-hover:text-secondary group-hover:tracking-[0.5em] transition-all duration-500">Reasons</span>
            </Link>
            
            <Link 
              href="/letter"
              className="group flex flex-col items-center gap-6 transition-all duration-500 hover:scale-110 active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded-[3rem] p-4"
            >
              <div className="relative">
                {/* Magic Glow Background */}
                <div className="absolute -inset-4 bg-primary/30 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative bg-white/90 backdrop-blur-md p-6 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl border border-white/60 group-hover:bg-secondary group-hover:text-secondary-foreground group-hover:border-transparent transition-all duration-500 transform group-hover:-translate-y-4 group-hover:-rotate-6">
                  <Gift className="size-10 sm:size-12 group-hover:scale-110 transition-all duration-500" />
                </div>
              </div>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.4em] font-black text-muted-foreground group-hover:text-secondary group-hover:tracking-[0.5em] transition-all duration-500">Letter</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Play, Pause, SkipBack, SkipForward, Music, Volume2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function MusicPlayer({ celebrantName }: { celebrantName: string }) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <Card className="bg-white/40 backdrop-blur-xl border-white/40 shadow-xl p-4 w-full max-w-sm mx-auto overflow-hidden relative group">
      <div className="flex items-center gap-4">
        <div className="size-16 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg relative overflow-hidden">
          <Music className={cn("text-white size-8 transition-all", isPlaying ? "animate-bounce" : "opacity-50")} />
          <div className="absolute inset-0 bg-white/10" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-sm text-secondary-foreground truncate">Our Special Song</h4>
          <p className="text-xs text-muted-foreground truncate">Dedicated to {celebrantName}</p>
          <div className="flex items-center gap-2 mt-2">
            <Volume2 className="size-3 text-muted-foreground" />
            <Progress value={isPlaying ? 45 : 0} className="h-1 flex-1" />
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center gap-6 mt-4">
        <SkipBack className="size-4 text-muted-foreground cursor-not-allowed" />
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          className="size-10 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-md"
        >
          {isPlaying ? <Pause className="size-5 fill-current" /> : <Play className="size-5 fill-current ml-1" />}
        </button>
        <SkipForward className="size-4 text-muted-foreground cursor-not-allowed" />
      </div>
      <p className="text-[10px] text-center mt-3 text-muted-foreground/60 uppercase tracking-tighter">
        {isPlaying ? "Playing your heart out..." : "Tap to feel the rhythm"}
      </p>
    </Card>
  );
}

import { cn } from "@/lib/utils";

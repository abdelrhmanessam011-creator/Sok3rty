"use client";

import { useState } from "react";
import { Heart, Sparkles, Gift, Star, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

const REASONS = [
  {
    id: 1,
    title: "ابتسامتُكِ",
    message: "ابتسامتُكِ فجرٌ يتبدّدُ بهِ ظلامُ أيّامي، وشمسٌ تُشرقُ في قلبي لتمنحَهُ الدفءَ والحياة في كلِّ حين.",
    icon: <Sun className="size-8 text-orange-400" />,
  },
  {
    id: 2,
    title: "رِقّتُكِ",
    message: "في رِقّةِ قلبكِ وجدتُ مَلاذي الآمن، وحنانُكِ هو الغيثُ الذي يروي عُمري بفيضٍ من السكينة والطمأنينة.",
    icon: <Heart className="size-8 text-red-400" />,
  },
  {
    id: 3,
    title: "ضحكتُكِ",
    message: "ضحكتُكِ لحنٌ سماويٌّ يعزفُ على أوتارِ روحي، نَغمٌ يُعيدُ ترتيبَ العالمِ حولي ليكونَ أكثرَ روعةً وبهاءً.",
    icon: <Star className="size-8 text-yellow-400" />,
  },
  {
    id: 4,
    title: "كُلّكِ أنتِ",
    message: "أنتِ لستِ مجرّدَ اختيار، بل أنتِ كُلِّي وكفايتي؛ أنتِ المبتدأُ في كُلِّ فرحٍ والمنتهى في كُلِّ سكون.",
    icon: <Gift className="size-8 text-pink-400" />,
  },
];

export default function InteractiveSurprises() {
  const [revealed, setRevealed] = useState<number[]>([]);

  const toggleReveal = (id: number) => {
    if (revealed.includes(id)) {
      setRevealed(revealed.filter((r) => r !== id));
    } else {
      setRevealed([...revealed, id]);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {REASONS.map((reason, index) => {
        const isRevealed = revealed.includes(reason.id);
        return (
          <div
            key={reason.id}
            className={cn(
              "group perspective-1000 cursor-pointer h-80 animate-fade-up",
              `stagger-${index + 1}`
            )}
            onClick={(e) => {
              e.stopPropagation();
              toggleReveal(reason.id);
            }}
          >
            <div
              className={cn(
                "relative w-full h-full transition-all duration-700 preserve-3d shadow-xl rounded-[2.5rem]",
                isRevealed ? "rotate-y-180" : ""
              )}
            >
              {/* Front side */}
              <div className="absolute inset-0 backface-hidden bg-white/90 backdrop-blur-md border-2 border-primary/30 rounded-[2.5rem] flex flex-col items-center justify-center p-8 text-center space-y-6 hover:border-secondary/50 transition-colors">
                <div className="bg-primary/20 p-6 rounded-full group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                  {reason.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="font-headline text-2xl font-bold text-secondary-foreground">
                    Reason #{reason.id}
                  </h3>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-black group-hover:text-secondary transition-colors">
                    Click to reveal
                  </p>
                </div>
              </div>

              {/* Back side */}
              <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br from-primary/40 to-secondary/40 backdrop-blur-xl border-2 border-white/50 rounded-[2.5rem] flex flex-col items-center justify-center p-10 text-center shadow-inner" dir="rtl">
                <Heart className="size-8 text-secondary fill-secondary mb-6 animate-pulse" />
                <h3 className="font-arabic text-3xl font-bold text-secondary-foreground mb-4">
                  {reason.title}
                </h3>
                <p className="font-arabic text-xl text-secondary-foreground/90 leading-relaxed">
                  "{reason.message}"
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  )
}

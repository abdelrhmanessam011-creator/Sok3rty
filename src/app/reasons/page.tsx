"use client";

import InteractiveSurprises from "@/components/interactive-surprises";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function ReasonsPage() {
  return (
    <div className="min-h-[calc(100vh-80px)] py-20 px-6 animate-fade-up">
      <div className="max-w-7xl mx-auto">
        <Link 
          href="/"
          className="mb-12 inline-flex items-center gap-2 text-muted-foreground hover:text-secondary-foreground transition-colors group outline-none focus-visible:underline"
        >
          <ChevronLeft className="size-5 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm uppercase tracking-widest font-bold">Back to Home</span>
        </Link>
        
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-6xl font-headline font-bold text-secondary-foreground">Why You're My Everything</h2>
          <div className="w-24 h-1 bg-secondary/30 mx-auto rounded-full" />
          <p className="text-muted-foreground font-body italic text-lg">Just a few of the million reasons why...</p>
        </div>
        <InteractiveSurprises />
      </div>
    </div>
  );
}

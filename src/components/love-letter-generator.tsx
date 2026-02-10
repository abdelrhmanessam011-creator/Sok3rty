"use client";

import { useState } from "react";
import { generateLoveLetter } from "@/ai/flows/generate-love-letter";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, Heart, RefreshCw } from "lucide-react";

export default function LoveLetterGenerator({ celebrantName = "Roaa" }: { celebrantName?: string }) {
  const [tone, setTone] = useState("romantic");
  const [details, setDetails] = useState("");
  const [letter, setLetter] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const response = await generateLoveLetter({
        tone,
        additionalDetails: details || `For my beautiful ${celebrantName}, celebrating our amazing journey together.`,
      });
      setLetter(response.loveLetter);
    } catch (error) {
      console.error("Failed to generate letter:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Card className="border-secondary/30 bg-white/50 backdrop-blur-sm overflow-hidden">
        <CardHeader className="text-center bg-primary/20 pb-10">
          <CardTitle className="text-3xl font-headline flex items-center justify-center gap-2">
            <Heart className="size-6 text-secondary fill-current" />
            Love Letter for {celebrantName}
            <Heart className="size-6 text-secondary fill-current" />
          </CardTitle>
          <p className="text-muted-foreground mt-2">Let&apos;s find the perfect way to say I love you.</p>
        </CardHeader>
        <CardContent className="p-8 -mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="tone">The Tone of My Heart</Label>
                <Select value={tone} onValueChange={setTone}>
                  <SelectTrigger id="tone" className="bg-white">
                    <SelectValue placeholder="Select a tone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="romantic">Deeply Romantic</SelectItem>
                    <SelectItem value="funny">Playful & Funny</SelectItem>
                    <SelectItem value="sweet">Sweet & Tender</SelectItem>
                    <SelectItem value="poetic">Poetic & Dreamy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="details">Memories to Include</Label>
                <Textarea
                  id="details"
                  placeholder={`E.g., That time we got lost in the city, the way ${celebrantName} laughs at my bad jokes...`}
                  className="h-32 bg-white resize-none"
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                />
              </div>
              <Button 
                onClick={handleGenerate} 
                disabled={isLoading}
                className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold h-12 rounded-full shadow-lg transition-all hover:scale-[1.02]"
              >
                {isLoading ? (
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-4 w-4" />
                )}
                Generate Love Letter
              </Button>
            </div>

            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-white border border-secondary/20 rounded-xl p-6 h-full min-h-[300px] flex flex-col">
                <div className="flex items-center justify-between mb-4 border-b border-muted pb-2">
                  <span className="text-xs uppercase tracking-widest text-muted-foreground font-bold">To: {celebrantName}</span>
                  <Heart className="size-4 text-secondary/40" />
                </div>
                {letter ? (
                  <div className="prose prose-sm italic text-secondary-foreground overflow-y-auto whitespace-pre-wrap leading-relaxed font-body text-lg">
                    {letter}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center flex-1 text-muted-foreground text-center">
                    <Sparkles className="size-12 mb-4 opacity-20" />
                    <p>My magic words for you will appear here...</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

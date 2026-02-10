"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { MessageSquareHeart, User, Send, Star } from "lucide-react";

interface Wish {
  id: string;
  name: string;
  message: string;
  timestamp: Date;
}

export default function GuestBook({ celebrantName = "Roaa" }: { celebrantName?: string }) {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const savedWishes = localStorage.getItem("birthday-wishes");
    if (savedWishes) {
      setWishes(JSON.parse(savedWishes).map((w: any) => ({ ...w, timestamp: new Date(w.timestamp) })));
    } else {
      // Sample data
      const samples = [
        { id: '1', name: 'Mom', message: `Happy Birthday my dear ${celebrantName}! We love you so much!`, timestamp: new Date() },
        { id: '2', name: 'Sarah', message: 'Have the best day ever! You deserve it, sweetie.', timestamp: new Date() }
      ];
      setWishes(samples);
    }
  }, [celebrantName]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) {
      toast({ title: "Please fill in all fields", variant: "destructive" });
      return;
    }

    const newWish: Wish = {
      id: Date.now().toString(),
      name,
      message,
      timestamp: new Date(),
    };

    const updatedWishes = [newWish, ...wishes];
    setWishes(updatedWishes);
    localStorage.setItem("birthday-wishes", JSON.stringify(updatedWishes));
    
    setName("");
    setMessage("");
    toast({ title: "Wish sent with love!" });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
      <div className="lg:col-span-1">
        <Card className="sticky top-24 border-none shadow-2xl bg-white/80 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-2xl font-headline flex items-center gap-2">
              <MessageSquareHeart className="text-secondary" />
              Send a Wish
            </CardTitle>
            <p className="text-muted-foreground">Leave a magical note for {celebrantName}.</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <User className="absolute left-3 top-3 size-4 text-muted-foreground" />
                  <Input 
                    placeholder="Your Name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10 h-12 bg-white rounded-xl"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Textarea 
                  placeholder={`Write your heartfelt wish for ${celebrantName}...`} 
                  className="min-h-[150px] bg-white rounded-xl resize-none"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold h-12 rounded-full">
                <Send className="mr-2 size-4" />
                Submit Wish
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-2 space-y-6">
        <h3 className="text-2xl font-headline mb-8 flex items-center gap-3">
          <Star className="text-secondary animate-pulse" />
          The Guest Book
        </h3>
        {wishes.length === 0 ? (
          <div className="text-center py-20 bg-white/20 rounded-3xl border-2 border-dashed border-secondary/20">
            <p className="text-muted-foreground italic">No wishes yet. Be the first to brighten {celebrantName}&apos;s day!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {wishes.map((wish) => (
              <Card key={wish.id} className="bg-white/90 border-none shadow-lg hover:shadow-xl transition-shadow rounded-2xl overflow-hidden group">
                <div className="h-1 bg-gradient-to-r from-primary to-secondary" />
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="font-headline text-xl text-secondary-foreground">{wish.name}</div>
                    <span className="text-xs text-muted-foreground">{new Date(wish.timestamp).toLocaleDateString()}</span>
                  </div>
                  <p className="text-muted-foreground italic leading-relaxed">"{wish.message}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

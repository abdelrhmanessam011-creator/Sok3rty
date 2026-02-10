
"use client";

import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

export default function PhotoGallery() {
  if (!PlaceHolderImages || PlaceHolderImages.length === 0) {
    return (
      <div className="text-center py-10 text-muted-foreground italic">
        The gallery is being prepared with our memories...
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {PlaceHolderImages.map((img) => (
        <Card key={img.id} className="overflow-hidden group relative border-none bg-transparent shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
          <div className="aspect-[4/3] relative overflow-hidden rounded-2xl">
            <Image
              src={img.imageUrl}
              alt={img.description}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              data-ai-hint={img.imageHint}
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
            <div className="absolute top-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <Star className="size-6 fill-secondary" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500">
              <p className="text-white font-medium italic text-lg">"{img.description}"</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

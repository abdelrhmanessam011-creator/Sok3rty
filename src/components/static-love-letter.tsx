"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Heart, Sparkles } from "lucide-react";

export default function StaticLoveLetter({ celebrantName }: { celebrantName: string }) {
  return (
    <div className="max-w-5xl mx-auto px-4">
      <Card className="border-none shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] bg-white/90 backdrop-blur-xl overflow-hidden relative group animate-fade-up">
        <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-primary via-secondary to-primary" />
        <CardContent className="p-8 md:py-16 md:px-20 relative overflow-hidden" dir="rtl">
          {/* Decorative subtle icons */}
          <Sparkles className="absolute top-8 left-8 text-primary/20 size-12 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          <Heart className="absolute bottom-8 right-8 text-secondary/20 size-12 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 delay-300" />

          <div className="flex justify-between items-center mb-12 border-b border-muted/50 pb-6">
            <span className="text-2xl md:text-3xl font-arabic font-bold text-secondary-foreground">إلى حبيبتي رؤى،</span>
            <Heart className="text-secondary fill-secondary size-6 animate-pulse" />
          </div>
          
          <div className="max-w-none text-secondary-foreground font-arabic leading-loose space-y-4 text-xl md:text-2xl selection:bg-secondary/20">
            <div className="grid grid-cols-1 gap-4">
              <p className="animate-fade-up stagger-1">
                كلُّ عامٍ وأنتِ القصيدة التي لم يُحسن الزمانُ ختمها، والمعنى الذي كلّما حاولتُ الإحاطة به اتّسع.
              </p>
              <p className="animate-fade-up stagger-2">
                كلُّ عامٍ وأنتِ الحكاية التي كلّما ظننتُ أنني بلغتُ آخر سطورها، فتحت لي المعنى على اتساعه.
              </p>
              <p className="animate-fade-up stagger-2">
                يا من لا يُشبه حضورُها العابرين، ولا تمرّ في القلب كما تمرّ الذكريات بل تمكث…
              </p>
              <p className="animate-fade-up stagger-3">
                في يوم ميلادكِ لا أحتفي بيومٍ مضى، بل أحتفي بوجودٍ جديرٍ بأن يُحَبّ.
              </p>
              <p className="animate-fade-up stagger-3">
                عيدُ ميلادكِ ليس مناسبةً تُنهيها الشموع، بل عهدٌ يتجدّد بأن للحبّ عمرًا، وبأن العُمر حين يُجاوركِ يتعلّم كيف يكون أجمل، وأصدق، وأبقى.
              </p>
              <p className="animate-fade-up stagger-4">
                وأمّا أنا، فإن كان لي أن أرجو شيئًا من الغد، فأرجو أن أبقى حاضرًا في تفاصيلكِ الصغيرة، في ضحكتكِ العابرة، وفي صمتكِ حين يثقل الكلام.
              </p>
              <p className="animate-fade-up stagger-4">
                أن أكون اختيارًا لا يبهت، وثباتًا لا تهزّه الأيّام.
              </p>
              <p className="animate-fade-up stagger-5">
                وإن كان لي في هذا الوجود موضع، فليكن قريبًا منكِ، أشارككِ البدايات قبل النهايات، وأنتبه لتفاصيلكِ التي لا يراها غير من أحبّ حقًّا.
              </p>
              <p className="animate-fade-up stagger-5">
                أكون لكِ سَعةً حين يضيق العالم، وصوتَ ثباتٍ حين يتردّد كلُّ شيء.
              </p>
              <p className="animate-fade-up stagger-6">
                كلُّ عامٍ وأنتِ المعنى الذي أُحسنُ السكوت عنه، والنعمة التي كلّما شكرتُ الله عليها شعرتُ أن الشكر قليل.
              </p>
              <p className="animate-fade-up stagger-6">
                كلُّ عامٍ وأنتِ… أنتِ، وكفى بذلك بهجةً لا تُجارى.
              </p>
              <p className="animate-fade-up stagger-7">
                كلُّ عامٍ وأنتِ النعمة التي كلّما ظننتُ أنني أدركتُ فضلها، اكتشفتُ أنني ما زلتُ في أوّل الامتنان، وكلُّ عامٍ وأنتِ أمانُ القلب، وهدوءُ الروح، وجمالُ الدعاء حين يُستجاب.
              </p>
            </div>

            <p className="text-3xl font-bold text-secondary mt-10 animate-fade-up stagger-7 text-center md:text-right">
              كل سنة وانتي طيبة ياسكرتي
            </p>

            <div className="pt-10 italic text-left animate-fade-up stagger-7" dir="ltr">
              <span className="text-muted-foreground/60 text-lg font-bold block mb-2 font-arabic" dir="rtl">منّي ومن قلبِي،</span>
              <span className="text-secondary font-arabic font-bold text-5xl md:text-6xl block mt-2 hover:scale-110 transition-transform cursor-pointer">عبدو</span>
            </div>
          </div>
          
          <div className="mt-12 flex justify-center">
            <Heart className="text-primary size-10 animate-bounce" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

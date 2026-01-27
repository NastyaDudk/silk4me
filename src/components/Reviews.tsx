import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Олена К.",
    role: "Дизайнерка інтер'єрів",
    text: "Шовковий тюрбан — це реальна інвестиція в якість мого волосся. Волосся помітно менше ламається і не таке зневоднене, як після махрових рушників",
    rating: 4.8,
  },
  {
    name: "Марія В.",
    role: "Бізнес-консультантка",
    text: "Після переходу на шовкові наволочки забула про зім'яте обличчя вранці. Шкіра та волосся виглядають набагато краще!",
    rating: 4.6,
  },
  {
    name: "Анна Л.",
    role: "Лікар-дерматолог",
    text: "Як спеціаліст рекомендую шовк своїм пацієнтам. Гіпоалергенний, не дратує шкіру, зберігає вологу.",
    rating: 5,
  },
];

const trustItems = [
  { title: "Висока якість", text: "100% натуральний шовк, Mulberry 6A Grade, добірна сировина" },
  { title: "Швидка доставка", text: "Швидка доставка. Відправка по Україні та Європі. Фірмове пакування кожного замовлення" },
  { title: "Дбайлива підтримка", text: "Дбайлива підтримка. Ми поруч, щоб допомогти зробити найкращий вибір для Вас" },
];

function Stars({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.4 && rating - full < 0.9; // “половинка”
  const empty = 5 - full - (hasHalf ? 1 : 0);

  return (
    <div className="flex items-center gap-1" aria-label={`Рейтинг ${rating} з 5`}>
      {Array.from({ length: full }).map((_, i) => (
        <Star key={`f-${i}`} className="h-4 w-4 fill-primary text-primary" />
      ))}

      {hasHalf && (
        <span className="relative inline-block h-4 w-4">
          <Star className="absolute inset-0 h-4 w-4 text-primary" />
          <span className="absolute inset-0 overflow-hidden" style={{ width: "50%" }}>
            <Star className="h-4 w-4 fill-primary text-primary" />
          </span>
        </span>
      )}

      {Array.from({ length: empty }).map((_, i) => (
        <Star key={`e-${i}`} className="h-4 w-4 text-primary/40" />
      ))}
    </div>
  );
}

const Reviews = () => {
  return (
    <section id="reviews" className="py-20 bg-foreground text-background">
      <div className="container mx-auto px-6">
        {/* Reviews */}
        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((r) => (
            <div
              key={r.name}
              className="bg-background text-foreground p-8 border border-border/50"
            >
              <Stars rating={r.rating} />

              <p className="mt-4 text-sm md:text-base text-muted-foreground leading-relaxed">
                “{r.text}”
              </p>

              <div className="mt-6">
                <p className="font-serif text-lg">{r.name}</p>
                <p className="text-sm text-muted-foreground">{r.role}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Вместо сомнительных цифр */}
        <div className="mt-14 grid md:grid-cols-3 gap-8 text-center">
          {trustItems.map((it) => (
            <div key={it.title} className="px-4">
              <p className="text-lg font-serif text-background">{it.title}</p>
              <p className="mt-2 text-sm text-background/70">{it.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;

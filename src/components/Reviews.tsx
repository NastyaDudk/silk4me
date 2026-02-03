import { Star } from "lucide-react";

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
  {
    title: "Висока якість",
    text: "100% натуральний шовк, Mulberry 6A Grade, добірна сировина",
  },
  {
    title: "Швидка доставка",
    text: "Відправка по Україні та Європі. Фірмове пакування кожного замовлення",
  },
  {
    title: "Дбайлива підтримка",
    text: "Ми поруч, щоб допомогти зробити найкращий вибір для Вас",
  },
];

function Stars({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.4 && rating - full < 0.9;
  const empty = 5 - full - (hasHalf ? 1 : 0);

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: full }).map((_, i) => (
        <Star key={`f-${i}`} className="h-5 w-5 fill-primary text-primary" />
      ))}

      {hasHalf && (
        <span className="relative inline-block h-5 w-5">
          <Star className="absolute inset-0 h-5 w-5 text-primary" />
          <span className="absolute inset-0 overflow-hidden" style={{ width: "50%" }}>
            <Star className="h-5 w-5 fill-primary text-primary" />
          </span>
        </span>
      )}

      {Array.from({ length: empty }).map((_, i) => (
        <Star key={`e-${i}`} className="h-5 w-5 text-primary/40" />
      ))}
    </div>
  );
}

const Reviews = () => {
  return (
    <section id="reviews" className="py-20 bg-foreground text-background">
      <div className="container mx-auto px-6">

        {/* Header */}
        <div className="mb-16 text-center">
          <p className="text-gold uppercase tracking-[0.3em] text-sm mb-3">
            Відгуки
          </p>

          <h2 className="text-4xl md:text-5xl font-serif font-light text-background">
            Що кажуть наші клієнти
          </h2>
        </div>

        {/* Reviews */}
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((r) => (
            <div
              key={r.name}
              className="bg-background text-foreground p-8 md:p-10 border border-border/50"
            >
              <Stars rating={r.rating} />

              <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed">
                “{r.text}”
              </p>

              <div className="mt-6">
                <p className="font-serif text-xl">{r.name}</p>
                <p className="text-base text-muted-foreground">{r.role}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Trust items */}
        <div className="mt-16 grid md:grid-cols-3 gap-10 text-center">
          {trustItems.map((it) => (
            <div key={it.title} className="px-4">
              <p className="text-xl font-serif text-background">
                {it.title}
              </p>
              <p className="mt-3 text-base md:text-lg text-background/70 leading-relaxed">
                {it.text}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Reviews;
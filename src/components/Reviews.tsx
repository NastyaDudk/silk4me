import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Олена К.",
    role: "Дизайнерка інтер'єрів",
    text: "Шовкова постіль від Silk4me — це найкраща інвестиція в якість сну. Відчуття неймовірної розкоші кожного ранку.",
    rating: 5,
  },
  {
    name: "Марія В.",
    role: "Бізнес-консультантка",
    text: "Після переходу на шовкові наволочки забула про зім'яте обличчя вранці. Шкіра та волосся виглядають набагато краще!",
    rating: 5,
  },
  {
    name: "Анна Л.",
    role: "Лікар-дерматолог",
    text: "Як спеціаліст рекомендую шовк своїм пацієнтам. Гіпоалергенний, не дратує шкіру, зберігає вологу.",
    rating: 5,
  },
];

const stats = [
  { value: "98%", label: "Задоволених клієнтів" },
  { value: "5000+", label: "Щасливих покупців" },
  { value: "4.9", label: "Середня оцінка" },
];

const Reviews = () => {
  return (
    <section id="reviews" className="py-24 bg-silk-charcoal">
      <div className="container mx-auto px-6">
        <div className="text-center space-y-4 mb-16">
          <p className="text-primary uppercase tracking-[0.3em] text-sm">Відгуки</p>
          <h2 className="text-3xl md:text-4xl font-serif font-light text-foreground">
            Що кажуть наші <span className="text-primary">клієнти</span>
          </h2>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="relative p-8 bg-background border border-border/50 hover:border-primary/30 transition-all duration-300"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/20" />
              
              <div className="flex gap-1 mb-4">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                "{review.text}"
              </p>
              
              <div>
                <p className="font-serif text-foreground">{review.name}</p>
                <p className="text-sm text-muted-foreground">{review.role}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-4xl md:text-5xl font-serif text-primary mb-2">{stat.value}</p>
              <p className="text-sm text-muted-foreground uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;

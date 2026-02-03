import { Sparkles, Wind, Crown, Shield } from "lucide-react";

const benefits = [
  {
    icon: Sparkles,
    title: "Неймовірна м'якість",
    description:
      "Шовк ніжно огортає шкіру, забезпечуючи відчуття преміальності та комфорту протягом усієї ночі.",
  },
  {
    icon: Wind,
    title: "Дихаюча тканина",
    description:
      "Натуральні волокна забезпечують ідеальну терморегуляцію — прохолодно влітку, тепло взимку.",
  },
  {
    icon: Crown,
    title: "Преміальний вигляд",
    description:
      "Благородний блиск та елегантні складки чорного шовку створюють атмосферу справжньої вишуканості.",
  },
  {
    icon: Shield,
    title: "Довговічність",
    description:
      "При правильному догляді шовкові вироби зберігають свою красу та властивості роками.",
  },
];

const Benefits = () => {
  return (
    <section id="collection" className="py-14 sm:py-16 lg:py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center space-y-3 mb-10 sm:mb-12">
          <p className="text-primary uppercase tracking-[0.3em] text-sm">
            Переваги
          </p>
          <h2 className="text-3xl md:text-4xl font-serif font-light text-foreground">
            Чому обирають <span className="text-primary">натуральний шовк</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group p-6 bg-card border border-border/50 hover:border-gold/50 transition-all duration-500"
            >
              <div className="mb-4">
                <benefit.icon
                  className="w-10 h-10 text-primary group-hover:text-gold group-hover:scale-110 transition-all duration-300"
                  strokeWidth={1.5}
                />
              </div>

              <h3 className="text-lg font-serif text-foreground mb-3">
                {benefit.title}
              </h3>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
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
    <section
      id="collection"
      className="py-16 sm:py-18 lg:py-20 bg-background"
    >
      <div className="container mx-auto px-6">

        {/* Headings */}
        <div className="text-center space-y-4 mb-12 sm:mb-14">
          <p className="text-primary uppercase tracking-[0.3em] text-sm">
            Переваги
          </p>

          <h2 className="text-4xl md:text-5xl font-serif font-light text-foreground leading-tight">
            Чому обирають{" "}
            <span className="text-primary">натуральний шовк</span>
          </h2>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="
                group
                p-8
                bg-card
                border
                border-border/50
                hover:border-gold/50
                transition-all
                duration-500
              "
            >
              <div className="mb-6">
                <benefit.icon
                  className="
                    w-11 h-11
                    text-primary
                    group-hover:text-gold
                    group-hover:scale-110
                    transition-all
                    duration-300
                  "
                  strokeWidth={1.5}
                />
              </div>

              <h3 className="text-xl font-serif text-foreground mb-4">
                {benefit.title}
              </h3>

              <p className="text-base text-muted-foreground leading-relaxed">
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
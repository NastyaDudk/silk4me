import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import silkPillow from "@/assets/SILK4ME (362).jpg";

const features = [
  "100% натуральний шовк Mulberry",
  "Щільність 22 momme — преміум клас",
  "Гіпоалергенний та антибактеріальний",
  "Терморегуляція для комфортного сну",
  "Зберігає вологу шкіри та волосся",
  "Елегантна подарункова упаковка",
];

const Pricing = () => {
  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="pricing"
      className="bg-background pt-8 sm:pt-10 lg:pt-12 pb-16"
    >
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* LEFT — TEXT */}
          <div className="text-center lg:text-left space-y-8">

            {/* HEAD */}
            <div className="space-y-3">
              <p className="text-primary uppercase tracking-[0.3em] text-sm">
                Ціни
              </p>

              <h2 className="text-4xl md:text-5xl font-serif font-light text-foreground">
                Інвестиція в{" "}
                <span className="text-primary">якість та преміум</span>
              </h2>
            </div>

            {/* DESCRIPTION */}
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0">
              Ми не пропонуємо дешевих товарів. Silk4me — це преміум-бренд для тих,
              хто цінує справжню якість та готовий інвестувати в свій комфорт і красу.
            </p>

            {/* FEATURES */}
            <ul className="space-y-4 max-w-xl mx-auto lg:mx-0">
              {features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 justify-center lg:justify-start"
                >
                  <div className="mt-1 w-5 h-5 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-primary" />
                  </div>

                  <span className="text-base md:text-lg text-foreground">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            {/* NOTE + BUTTON */}
            <div className="pt-6 space-y-6 text-center lg:text-left">
              <p className="text-base text-muted-foreground max-w-xl mx-auto lg:mx-0">
                Ціни залежать від розміру та комплектації. Отримайте персональну
                консультацію для підбору ідеального варіанту.
              </p>

              <Button
                variant="luxury"
                size="lg"
                onClick={scrollToContact}
                className="mx-auto lg:mx-0"
              >
                Дізнатися ціну
              </Button>
            </div>
          </div>

         {/* RIGHT — IMAGE CARD */}
<div className="relative">
  <div className="bg-card border border-border/50 p-6">
    <div className="w-full aspect-[4/3] overflow-hidden flex items-center justify-center">
      <img
        src={silkPillow}
        alt="Silk4me silk pillow"
        className="w-full h-full object-contain lg:object-cover"
      />
    </div>

    <div className="text-center space-y-5 mt-6">
      <p className="text-xs text-muted-foreground uppercase tracking-[0.25em]">
        Популярний вибір
      </p>

      <h3 className="text-2xl font-serif font-medium text-foreground leading-snug">
        Шовкова наволочка
      </h3>

      <p className="text-muted-foreground text-base leading-[1.75] max-w-md mx-auto">
        Бестселер бренду. Аксесуар, що дозволяє відчути користь шовку
        <span className="text-foreground/80">
          {" "}для шкіри та волосся
        </span>{" "}
        без жодних зусиль.
      </p>

      <div className="pt-5 border-t border-border/50">
        <p className="text-primary font-serif text-lg tracking-wide">
          Преміум ціновий сегмент
        </p>
      </div>
    </div>
  </div>
</div>

        </div>
      </div>
    </section>
  );
};

export default Pricing;
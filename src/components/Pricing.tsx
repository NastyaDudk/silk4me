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
      className="bg-background pb-14 sm:pb-16 lg:pb-20"
    >
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* LEFT — CONTENT */}
          <div className="pt-6 lg:pt-10 space-y-7 text-center lg:text-left">

            {/* Заголовок */}
            <div className="space-y-2">
              <p className="text-primary uppercase tracking-[0.3em] text-sm">
                Ціни
              </p>

              <h2 className="text-3xl md:text-4xl font-serif font-light text-foreground">
                Інвестиція в{" "}
                <span className="text-primary">якість та преміум</span>
              </h2>
            </div>

            {/* Опис */}
            <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0">
              Ми не пропонуємо дешевих товарів. Silk4me — це преміум-бренд для тих,
              хто цінує справжню якість та готовий інвестувати в свій комфорт і красу.
            </p>

            {/* Список */}
            <ul className="space-y-3 max-w-xl mx-auto lg:mx-0">
              {features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 justify-center lg:justify-start"
                >
                  <div className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            {/* Текст + кнопка */}
            <div className="mt-12 lg:mt-16 text-center lg:text-left">
  <p className="text-sm text-muted-foreground max-w-xl mx-auto lg:mx-0">
    Ціни залежать від розміру та комплектації. Отримайте персональну
    консультацію для підбору ідеального варіанту.
  </p>

  <Button
    variant="luxury"
    size="lg"
    onClick={scrollToContact}
 className="mx-auto lg:mx-0 mt-20"
  >
    Дізнатися ціну
  </Button>
</div>
          </div>

          {/* RIGHT — IMAGE CARD */}
          <div className="pt-6 lg:pt-10 relative">
            <div className="bg-card border border-border/50 p-6">
              <div className="w-full h-[420px] overflow-hidden">
                <img
                  src={silkPillow}
                  alt="Silk4me silk pillow"
                  className="
                    w-full h-full
                    object-contain
                    lg:object-cover lg:scale-110
                  "
                />
              </div>

              <div className="text-center space-y-4 mt-6">
                <p className="text-sm text-muted-foreground uppercase tracking-wider">
                  Популярний вибір
                </p>

                <h3 className="text-2xl font-serif text-foreground">
                  Шовкова наволочка
                </h3>

                <p className="text-muted-foreground text-sm">
                  Бестселер бренду. Аксесуар, що дозволяє відчути користь шовку як
                  для шкіри, так і для волосся без зусиль.
                </p>

                <div className="pt-4 border-t border-border/50">
                  <p className="text-primary font-serif text-xl">
                    Преміум ціновий сегмент
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* /IMAGE CARD */}

        </div>
      </div>
    </section>
  );
};

export default Pricing;
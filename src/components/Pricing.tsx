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
    <section id="pricing" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-primary uppercase tracking-[0.3em] text-sm">Ціни</p>
              <h2 className="text-3xl md:text-4xl font-serif font-light text-foreground">
                Інвестиція в <span className="text-primary">якість та преміум</span>
              </h2>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              Ми не пропонуємо дешевих товарів. Silk4me — це преміум-бренд для тих, 
              хто цінує справжню якість та готовий інвестувати в свій комфорт і красу.
            </p>

            <ul className="space-y-4">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4">
              <p className="text-sm text-muted-foreground mb-4">
                Ціни залежать від розміру та комплектації. Отримайте персональну консультацію 
                для підбору ідеального варіанту.
              </p>
              <Button variant="luxury" size="lg" onClick={scrollToContact}>
                Дізнатися ціну
              </Button>
            </div>
          </div>

          {/* Image Card */}
<div className="relative">
  <div className="bg-card p-4">
    <div className="relative w-full overflow-hidden">
      <img
  src={silkPillow}
  alt="Silk4me silk pillow"
  className="
    w-full
    max-w-none
    h-auto
    object-cover
    scale-[1.18]
    translate-x-[0%]
    mx-auto
  "
/>
    </div>


    {/* Text */}
    <div className="text-center space-y-4 mt-6">
      <p className="text-sm text-muted-foreground uppercase tracking-wider">
        Популярний вибір
      </p>

      <h3 className="text-2xl font-serif text-foreground">
        Шовкова наволочка
      </h3>

      <p className="text-muted-foreground text-sm">
        Бестселер бренду. Аксесуар, що дозволяє відчути користь шовку як для
        шкіри, так і для волосся без зусиль. Ідеальний подарунок для себе чи
        близьких.
      </p>

      <div className="pt-4 border-t border-border/50">
        <p className="text-primary font-serif text-xl">
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

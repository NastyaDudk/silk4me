import { Button } from "@/components/ui/button";
import silkModel from "@/assets/silk-model.jpg";

const COLLECTION_URL = "https://silk4.me/product-category/blck_collection/";
const PAJAMA_URL = "https://silk4.me/shop_ua/silk_set_blck_ua/";
const PROMO_CODE = "BLCK-15";

const Hero = () => {
  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    element?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const goToCollection = () => {
    window.open(COLLECTION_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="relative min-h-screen flex items-center pt-12 lg:pt-14 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/30" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-7 animate-fade-in relative z-10">
            <div className="space-y-3">
              <p className="text-primary uppercase tracking-[0.3em] text-sm font-light">
                Ексклюзивна колекція
              </p>

              {/* Заголовок в одну строку (и кликабельный на коллекцию) */}
              <button
                type="button"
                onClick={goToCollection}
                className="text-left group"
                aria-label="Перейти до Black Collection"
              >
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-medium leading-tight text-foreground">
                  BLCK Collection
                </h1>
              </button>
            </div>

            {/* Текст — крупнее и читабельнее */}
            <p className="text-muted-foreground text-xl leading-relaxed max-w-xl">
            Основа твоєї молодості і краси без зусиль.
            Основа здорового сну.
            Основа моменту «нарешті для себе».

            Коли чорний заспокоює, а шовк піклується.
            </p>

            {/* Промокод — премиум акцент */}
           <div className="mt-4 flex flex-wrap items-center gap-3">
          <span className="text-sm tracking-[0.22em] uppercase text-foreground/80">
           Знижка за промокодом
             </span>

            <span className="
            rounded-md
            border border-accent/60
            bg-accent/15
            px-5 py-2
            text-sm font-medium
            tracking-[0.28em] uppercase
            text-foreground
             ">
    {PROMO_CODE}
  </span>
</div>

            {/* Buttons — ещё чуть меньше по ширине */}
            <div className="flex flex-col sm:flex-row gap-4 relative z-10 pt-2">
              <Button
                variant="luxury"
                size="lg"
                onClick={scrollToContact}
                className="w-fit px-5 text-sm"
              >
                Отримати консультацію
              </Button>

              <Button
                variant="luxuryOutline"
                size="lg"
                onClick={goToCollection}
                className="w-fit px-5 text-sm"
              >
                Переглянути колекцію
              </Button>
            </div>

            {/* Stats (крупнее/читабельнее) */}
            <div className="grid grid-cols-3 gap-8 pt-10 border-t border-border/50 max-w-xl">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-medium tracking-tight text-foreground">
                  100%
                </div>
                <p className="mt-1 text-sm md:text-base text-muted-foreground uppercase tracking-wide">
                  натуральний шовк
                </p>
              </div>

              <div className="text-center">
                <div className="text-3xl md:text-4xl font-medium tracking-tight text-foreground">
                  6A
                </div>
                <p className="mt-1 text-sm md:text-base text-muted-foreground uppercase tracking-wide">
                  найвища якість
                </p>
              </div>

              <div className="text-center">
                <div className="text-3xl md:text-4xl font-medium tracking-tight text-foreground">
                  22
                </div>
                <p className="mt-1 text-sm md:text-base text-muted-foreground uppercase tracking-wide">
                  momme
                </p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative hidden lg:block z-0">
            <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-transparent rounded-sm pointer-events-none" />

            {/* Обёртка = границы анимации */}
            <div className="relative overflow-hidden">
              <img
                src={silkModel}
                alt="Silk4me Black Collection"
                className="relative w-full h-[600px] object-cover object-top block select-none"
                draggable={false}
              />

              {/* Плавающий кликабельный бейдж (НЕ вылазит за картинку) */}
              <a
                href={PAJAMA_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Відкрити Шовкову піжаму Black Edition"
                className="
                  absolute
                  bg-background/90 backdrop-blur-sm
                  border border-border/50
                  px-6 py-4
                  max-w-[360px]
                  cursor-pointer
                  shadow-sm
                  hover:shadow-md
                  transition-shadow
                "
                style={{
                  // Стартовая позиция (нижняя часть картинки)
                  left: "8%",
                  top: "72%",
                  // Двигаем только translate — он считается от этой точки
                  animation: "badge-float-in-bounds 3.6s ease-in-out infinite",
                  // Чуть приятнее “ловить”
                  willChange: "transform",
                }}
              >
                <p className="text-xs text-muted-foreground uppercase tracking-[0.25em] text-center mb-2">
                  Хіт продажу
                </p>
                <p className="text-lg font-serif text-foreground">
                  Шовкова піжама Black Edition
                </p>
                <p className="mt-2 text-xs text-muted-foreground underline underline-offset-4">
                  Перейти до товару
                </p>
              </a>
            </div>

            {/* keyframes: ограничиваем движение (не вылазит за края) */}
            <style>{`
              @keyframes badge-float-in-bounds {
                0%   { transform: translate(0px, 0px) rotate(-1deg); }
                25%  { transform: translate(40px, -12px) rotate(1.2deg); }
                50%  { transform: translate(90px, 10px) rotate(-0.8deg); }
                75%  { transform: translate(35px, 22px) rotate(1deg); }
                100% { transform: translate(0px, 0px) rotate(-1deg); }
              }
            `}</style>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce z-10">
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-primary" />
      </div>
    </section>
  );
};

export default Hero;